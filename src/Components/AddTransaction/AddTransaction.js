import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import moneymanager from "../MainDashboard/money-manager-logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { ListItemIcon, MenuItem, TextField, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import "./AddTransaction.css";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
const AddTransaction = () => {
  const history = useHistory();
  // Menu----------------
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const user = window.localStorage.getItem("user");
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
  // --------------------------------
  // to add the transaction data
  const [type, setType] = useState("");
  const [account, setAccounts] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

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
        Toast.fire({ icon: "success", title: message });
        history.push("/DashBoard");
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
  //   -----------------------------------
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
        {/* Add New Container */}
        <div className="Addnew-container">
          <div>
            <form onSubmit={addTransaction}>
              <div className="Addnew-container-row">
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
              </div>

              <div className="Addnew-container-row">
                <Typography>Date : </Typography>{" "}
                <TextField
                  className="fields"
                  id="standard-basic"
                  variant="standard"
                  value={date}
                  label="dd/mm/yyyy"
                  name="date"
                  required
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              <div className="Addnew-container-row">
                <Typography>Category : </Typography>{" "}
                <TextField
                  className="fields"
                  id="standard-basic"
                  variant="standard"
                  value={category}
                  type="text"
                  label="Eg:Movie,Food"
                  name="category"
                  required
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>
              <div className="Addnew-container-row">
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
              </div>
              <div className="Addnew-container-row">
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
              </div>
              <Button
                sx={{ color: "#e5eaf5", mt: "4px" }}
                variant="text"
                onClick={() => {
                  history.push("/DashBoard");
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{ color: "#e5eaf5", mt: "4px" }}
                variant="text"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
};

export default AddTransaction;
