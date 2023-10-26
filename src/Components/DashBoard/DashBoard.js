import React, { useEffect, useState } from "react";
import moneymanager from "./money-manager-logo.png";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import gif from "./Gif.gif";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";
// import { Toast } from "react-toastify/dist/components";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
//For print----
const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];
// -----------------
const DashBoard = () => {
  const history = useHistory();
  const [transData, setTransData] = useState([]);
  const [type, setType] = useState("");
  const [account, setAccounts] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [datas, setDatas] = useState({});
  // getting user name
  const userName = localStorage.getItem("user");
  // For  nav add new------
  const [anchorE, setAnchorE] = React.useState();
  const opens = Boolean(anchorE);
  const handleClicks = (event) => {
    setAnchorE(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorE();
  };
  // --------------------
  // for alert----------
  //  alert Function
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  // For menu nav------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // --------------------
  // for Categories---
  // const [acc, setAcc] = React.useState("");

  const handleChange = (event) => {
    var x = event.target.value; // Store the selected value in variable x
    // console.log(x);
    setType(x); // Update the acc state variable with the selected value
    handleFilterChange(x); // Call the function with the selected value
  };

  //  -----------
  // for getting the transData from specificUser
  const getTransData = async () => {
    try {
      let y = window.localStorage.getItem("id");
      // console.log(y);
      let req = await axios.get(
        `https://money-manager-backend-smd.vercel.app/transdata/specificUser/${y}`,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      const { message, statusCode, TransactionsData } = data;
      // console.log(data);
      if (statusCode === 200) {
        setTransData(TransactionsData);
        // console.log(TransactionsData);
      } else {
        setDatas({ message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTransData();
  }, []);
  // for delete TransData
  const delTransData = async (id) => {
    // console.log(id)
    try {
      let req = await axios.delete(
        `https://money-manager-backend-smd.vercel.app/transdata/deleteTransData/${id}`,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      const { message, statusCode } = data.data;
      if (statusCode === 200) {
        getTransData();
        Toast.fire({ icon: "success", title: message });
      } else {
        Toast.fire({ icon: "error", title: "Can't delete Transaction Data" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // to add the transaction data
  const addTransaction = async (e) => {
    // console.log(window.localStorage.getItem("id"));
    e.preventDefault();
    try {
      let req = await axios.post(
        `https://money-manager-backend-smd.vercel.app/transdata/`,
        {
          userid: window.localStorage.getItem("id"),
          type,
          account,
          category,
          date,
          amount,
        },
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      //console.log(data);
      const { message, statusCode } = data;
      // console.log(data);
      if (statusCode === 200) {
        setType("");
        setAccounts("");
        setCategory("");
        getTransData();
        Toast.fire({ icon: "success", title: message });
      } else {
        Toast.fire({
          icon: "error",
          title: "Error in adding Transaction Data",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilterChange = async (selectedAccount) => {
    // console.log(selectedAccount);
    try {
      const userId = window.localStorage.getItem("id");
      // console.log(userId);
      const response = await axios.post(
        `https://money-manager-backend-smd.vercel.app/transdata/categoryForSpecificUser/${userId}`,
        // Request body data should be passed as the second argument
        { types: selectedAccount },
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      // console.log(response);

      const { TransactionsData } = response.data;
      // console.log(response.data);
      // console.log(TransactionsData);

      const lowercaseTypeData = TransactionsData.map((transaction) => ({
        ...transaction,
        type: transaction.type.toLowerCase(),
      }));
      // console.log(lowercaseTypeData);

      const selectedAccountLowercase = selectedAccount.toLowerCase();
      // console.log(selectedAccountLowercase);

      const filteredData = lowercaseTypeData.filter(
        (transaction) => transaction.type === selectedAccountLowercase
      );
      // console.log(filteredData);

      if (filteredData.length > 0) {
        setTransData(filteredData.reverse());
        Toast.fire({ icon: "success", title: "Transactions Found!" });
      } else {
        setTransData([]);
        Toast.fire({
          icon: "info",
          title: "No Transactions Found For This Account",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: "Error occurred while fetching transactions.",
      });
    }
  };

  return (
    <div>
      <body className="mainBg">
        <div className="Dheading">
          <img
            className="moneymangerLogo"
            srcSet={`${moneymanager}}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${moneymanager}`}
            alt="money manager Logo"
            loading="lazy"
          />
          <div>
            <h1 className="moneymanagerHaeding">Money Manager</h1>
            <h4 className="subDhead">GIVING LIFE TO YOUR FINANCES!</h4>
          </div>
        </div>

        <Box
          className="box"
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            mt: "20px",
            ml: "25px",
          }}
        >
          <Typography sx={{ minWidth: 100 }}>Home</Typography>
          <Typography sx={{ minWidth: 100 }}>Transactions</Typography>
          {/* for categories */}
          <div>
            <Box sx={{ minWidth: 140, ml: 3, mr: 101, mb: 0 }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Account</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Account"
                  onChange={handleChange}
                  sx={{ width: 100 }}
                >
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Office">Office</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          {/* ----------------------- */}
          {/* for add new section */}
          <div>
            <Box sx={{ mr: 1 }}>
              <Tooltip title="ADD NEW TRANSACTION">
                <IconButton
                  onClick={handleClicks}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={opens ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={opens ? "true" : undefined}
                >
                  <AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon>
                </IconButton>
              </Tooltip>
            </Box>
            {/* for pop-up add new  */}
            <Menu
              anchorEl={anchorE}
              id="account-menu"
              open={opens}
              onClose={handleCloses}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 2,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: 2,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 15,
                    height: 15,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <div>
                <form  onSubmit={addTransaction}>
                  <MenuItem>
                    <Typography>Transactions Type : </Typography>{" "}
                    <TextField
                      className="fields"
                      id="standard-basic"
                      label="Eg:Personal/Office"
                      variant="standard"
                      // name="type"
                      value={type}
                      type="text"
                      required
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    />
                  </MenuItem>

                  <MenuItem>
                    <Typography>Date : </Typography>{" "}
                    <TextField
                      className="fields"
                      id="standard-basic"
                      variant="standard"
                      value={date}
                      type="Date"
                      name="date"
                      required
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </MenuItem>
                  <MenuItem>
                    <Typography>Category : </Typography>{" "}
                    <TextField
                      className="fields"
                      id="standard-basic"
                      variant="standard"
                      value={category}
                      type="text"
                      name="category"
                      required
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                  </MenuItem>
                  <MenuItem>
                    <Typography>Account : </Typography>{" "}
                    <TextField
                      className="fields"
                      id="standard-basic"
                      variant="standard"
                      value={account}
                      type="text"
                      name="account"
                      required
                      onChange={(e) => {
                        setAccounts(e.target.value);
                      }}
                      label="Eg:Income/Expens"
                    />
                  </MenuItem>
                  <MenuItem>
                    <Typography>Amount : </Typography>{" "}
                    <TextField
                      className="fields"
                      id="standard-basic"
                      variant="standard"
                      type="Number"
                      value={amount}
                      label="$"
                      required
                      name="amount"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </MenuItem>
                  <Button
                    className="fields"
                    variant="text"
                    type="submit"
                   
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </Menu>
            {/* ---------------------- */}
          </div>
          {/* ---------------------------- */}
          <Typography sx={{ minWidth: 100 }}>{userName}</Typography>
          {/* for Logout */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: "#2a9df4" }}
              ></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        {/* for logout pop-up */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 2,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar sx={{ bgcolor: "#2a9df4" }} /> My account
          </MenuItem>
          <Divider />

          <MenuItem onClick={handleClose}>
            <ListItemIcon sx={{ color: "#2a9df4" }}>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={() => history.push("/")}>
            <ListItemIcon sx={{ color: "#2a9df4" }}>
              <Logout fontSize="small" onClick={() => history.push("/")} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        {/* -------------------------------------- */}
        {/* For Table Transactions */}
        <div className="Table">
          <Card className="user-table">
            <Typography
              sx={{ minWidth: 100, mt: 2, ml: 2, mb: 1, color: "#6a329f" }}
            >
              Recent Transactions
            </Typography>
            <div>
              <TableContainer component={Paper} className="Tablecontainer">
                <Table sx={{ width: 850 }} aria-label="simple table">
                  <TableHead sx={{ mr: 20 }}>
                    <TableRow>
                      <TableCell sx={{ color: "#6a329f" }}>Date</TableCell>
                      <TableCell sx={{ color: "#6a329f" }}>Category</TableCell>
                      <TableCell sx={{ color: "#6a329f" }}>Type</TableCell>
                      <TableCell sx={{ color: "#6a329f" }}>Account</TableCell>
                      <TableCell sx={{ color: "#6a329f" }}>Amount</TableCell>
                      <TableCell sx={{ color: "#6a329f" }}>Edit</TableCell>
                      <TableCell sx={{ color: "#6a329f" }}>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transData.length > 0 && transData ? (
                      transData.length > 0 &&
                      transData.map((item, index, _id) => {
                        // console.log(item._id)
                        return (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{item.date}</TableCell>

                            <TableCell>
                              <Typography>{item.category}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{item.type}</Typography>
                            </TableCell>
                            <TableCell
                              style={{
                                color:
                                  item.account === "Expens" ? "red" : "inherit",
                              }}
                            >
                              {item.account}
                            </TableCell>
                            <TableCell
                              style={{
                                color:
                                  item.account === "Expens" ? "red" : "inherit",
                              }}
                            >
                              {item.amount}
                            </TableCell>
                            <TableCell>
                              <ListItemIcon
                                sx={{ color: "#2a9df4" }}
                                onClick={() =>
                                  history.push(`/edit/${item._id}`)
                                }
                              >
                                <EditNoteIcon />
                              </ListItemIcon>
                            </TableCell>
                            <TableCell>
                              <ListItemIcon
                                sx={{ color: "#2a9df4" }}
                                onClick={() => delTransData(item._id)}
                              >
                                <DeleteOutlineIcon />
                              </ListItemIcon>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <div>
                        {" "}
                        <h4 className="message">
                          {" "}
                          No Trasaction Data To BE shown
                        </h4>{" "}
                      </div>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Card>
          <img className="imggif" src={gif} alt="Money_Management_vedio..." />
        </div>
        {/* For print */}
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </body>
    </div>
  );
};

export default DashBoard;
