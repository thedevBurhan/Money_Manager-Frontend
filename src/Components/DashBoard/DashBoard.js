import React, { useEffect, useState } from "react";
import moneymanager from "./money-manager-logo.png";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import "../MainDashboard/MainDashBoard.css";
import {
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";
// import { Toast } from "react-toastify/dist/components";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";

const DashBoard = () => {
  const history = useHistory();
  // HamBurger Menu------------------------------
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const user = window.localStorage.getItem("user");
  // ------------------------------------------------------------
  const [transData, setTransData] = useState([]);
  const [type, setType] = useState("");

  const [datas, setDatas] = useState({});

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

  const handleChange = (event) => {
    var x = event.target.value;
    // console.log(x);
    setType(x);
    handleFilterChange(x);
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
        {/* AppLication Headind */}
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
        {/* ----------------------------------- */}
        {/* HamBurger Menu Start */}
        <div className="hamburger-menu">
          <MenuIcon
            className={`menu-button ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          ></MenuIcon>
          <div className={`menu-items ${menuOpen ? "open" : ""}`}>
            <MenuItem className="menu-item">
              <ListItemIcon sx={{ color: "#8a98d5c5" }}>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              {user}
            </MenuItem>
            <MenuItem
              className="menu-item"
              onClick={() => history.push("/MainDashBoard")}
            >
              <ListItemIcon
                sx={{ color: "#8a98d5c5" }}
                onClick={() => history.push("/MainDashBoard")}
              >
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              Home
            </MenuItem>
            <MenuItem
              disabled
              className="menu-item"
              onClick={() => history.push("/DashBoard")}
            >
              <ListItemIcon
                sx={{ color: "#8a98d5c5" }}
                onClick={() => history.push("/DashBoard")}
              >
                <ReceiptLongIcon fontSize="small" />
              </ListItemIcon>
              Transaction
            </MenuItem>

            <MenuItem className="menu-item" onClick={() => history.push("/")}>
              <ListItemIcon
                sx={{ color: "#8a98d5c5" }}
                onClick={() => history.push("/")}
              >
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        </div>
        {/* HamBurger Menu End */}
        {/* Add New Transactions */}
        <div className="addNew">
          <h5>Add your yearly, Monthly ,Weekly Transaction...&nbsp;&nbsp; </h5>

          <Tooltip title="Add Transaction">
            <AddCircleOutlineOutlinedIcon
              sx={{ color: "#e5eaf5" }}
              onClick={() => history.push("/AddTrasaction")}
            />
          </Tooltip>
        </div>
        {/* Search By Catergory */}
        <div className="addNew">
          <h5>Search By Categories&nbsp;:&nbsp;&nbsp; </h5>

          {/* for categories */}

          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={handleChange}
              sx={{ width: 100, height: 30, mt: 1 }}
            >
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* ----------------------- */}

        {/* For Table Transactions */}
        <div className="Table">
          <div className="user-table">
            <Typography
              sx={{ minWidth: 100, mt: 2, ml: 2, mb: 1, color: "#6a329f" }}
            >
              Recent Transactions
            </Typography>
            <div>
              <TableContainer className="Tablecontainer">
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
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
                  <TableBody className="tablerow">
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
                                sx={{ color: "#8a98d5c5" }}
                                onClick={() =>
                                  history.push(`/edit/${item._id}`)
                                }
                              >
                                <EditNoteIcon />
                              </ListItemIcon>
                            </TableCell>
                            <TableCell>
                              <ListItemIcon
                                sx={{ color: "#8a98d5c5" }}
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
          </div>
          {/* <img className="imggif" src={gif} alt="Money_Management_vedio..." /> */}
        </div>
      </body>
    </div>
  );
};

export default DashBoard;
