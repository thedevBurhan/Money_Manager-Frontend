import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import moneymanager from "../MainDashboard/money-manager-logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import "./UpdateTransactionData.css";
import {
  Button,
  IconButton,
  ListItemIcon,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";

const UpdateTransactionData = () => {
  // Menu----------------
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const user = window.localStorage.getItem("user");
  const [prevTransData, setprevTransData] = useState({
    type: "",
    category: "",
    account: "",
    date: "",
    amount: "",
  });
  const [open, setOpen] = useState(false);
  const params = useParams();
  const id = params.id;
  // console.log(id);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(
        `https://money-manager-backend-smd.vercel.app/transdata/specificUser/${window.localStorage.getItem(
          "id"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        const data = response.data.TransactionsData;
        // console.log(data);

        setprevTransData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params._id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://money-manager-backend-smd.vercel.app/transdata/edit/${id}`,
        prevTransData,
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: localStorage.getItem("token"),
          },
        }
      );

      // Assuming the response.data is the updated transaction data
      const updatedData = response.data;
      setprevTransData(updatedData);

      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    history.push("/Dashboard");
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        close
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <body className="mainBg">
        {/* Application heading */}
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
        {/* Application heading ends */}
        {/* Hamburger Menu Start */}
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
        {/* Hamburger Menu Ends */}
        <div>
          <form onSubmit={handleUpdate} className="cards">
            <TextField
              label="Personal/Office"
              id="outlined-size-small"
              name="type"
              size="small"
              type="text"
              value={prevTransData.type}
              required
              onChange={(e) =>
                setprevTransData({
                  ...prevTransData,
                  type: e.target.value,
                })
              }
            />

            <TextField
              label="Salary/Fuel....."
              id="outlined-size-small"
              name="category"
              size="small"
              type="text"
              value={prevTransData.category}
              required
              onChange={(e) =>
                setprevTransData({
                  ...prevTransData,
                  category: e.target.value,
                })
              }
            />

            <TextField
              label="Income/Expens"
              id="outlined-size-small"
              name="account"
              type="account"
              size="small"
              value={prevTransData.account}
              required
              onChange={(e) =>
                setprevTransData({
                  ...prevTransData,
                  account: e.target.value,
                })
              }
            />

            <TextField
              id="outlined-size-small"
              name="date"
              type="date"
              size="small"
              value={prevTransData.date}
              required
              onChange={(e) =>
                setprevTransData({ ...prevTransData, date: e.target.value })
              }
            />

            <TextField
              label="$"
              id="outlined-size-small"
              name="amount"
              type="amount"
              value={prevTransData.amount}
              required
              size="small"
              onChange={(e) =>
                setprevTransData({
                  ...prevTransData,
                  amount: e.target.value,
                })
              }
            />

            <Button
              sx={{ color: "#8a98d5c5", mt: 0 }}
              variant="text"
              onClick={() => history.push("/DashBoard")}
            >
              Cancel
            </Button>
            <Button
              sx={{ color: "#8a98d5c5", mt: 0 }}
              variant="text"
              type="submit"
            >
              Update Transaction Data
            </Button>
          </form>
        </div>
        {/* pop-up message */}
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message="Updated Successfully"
          action={action}
        />
      </body>
    </div>
  );
};

export default UpdateTransactionData;
