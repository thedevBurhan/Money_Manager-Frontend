import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import moneymanager from "./money-manager-logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { ListItemIcon, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import "./MainDashBoard.css";

const MainDashBoard = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const user = window.localStorage.getItem("user");
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
            <MenuItem disabled className="menu-item">
              <ListItemIcon sx={{ color: "#8a98d5c5" }}>
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
        <div className="Essay">
          <p className="paragraph">
            Money management is a crucial skill that plays a significant role in
            individuals' lives, influencing their financial stability and
            overall well-being. Whether one is navigating personal finances,
            running a household, or managing a business, the ability to
            effectively handle money is essential. This essay explores the
            importance of money management, discussing key principles, benefits,
            and practical tips for successful financial stewardship.
          </p>
          <h4 className="Essay_heading">Financial Stability:</h4>
          <p className="paragraph">
            Money management is the cornerstone of financial stability. By
            creating and adhering to a budget, individuals can ensure that they
            allocate their resources wisely, covering essential expenses while
            saving for future goals. This stability acts as a safeguard against
            unexpected financial shocks, providing a sense of security and peace
            of mind.
          </p>
          <h4 className="Essay_heading">Debt Reduction and Avoidance:</h4>
          <p className="paragraph">
            Effective money management involves a strategic approach to debt.
            Understanding the difference between good and bad debt, as well as
            employing strategies for debt reduction, empowers individuals to
            maintain a healthy financial profile. This, in turn, opens doors to
            better opportunities for investments and future financial growth.
          </p>
          <h4 className="Essay_heading">Emergency Preparedness:</h4>
          <p className="paragraph">
            Life is unpredictable, and unforeseen emergencies can arise at any
            time. A well-managed financial plan includes provisions for
            emergencies, such as a medical crisis or unexpected home repairs.
            Having an emergency fund acts as a financial safety net, preventing
            individuals from resorting to high-interest loans or dipping into
            savings earmarked for other purposes.
          </p>
          <h4 className="Essay_heading">Investment Opportunities:</h4>
          <p className="paragraph">
            Money management extends beyond budgeting and saving; it also
            involves strategic investing. Understanding investment options, risk
            tolerance, and potential returns allows individuals to grow their
            wealth over time. Diversifying investments and staying informed
            about market trends are integral parts of effective money
            management.
          </p>
          <h4 className="Essay_heading">Financial Education:</h4>
          <p className="paragraph">
            Continuous learning about personal finance is key to successful
            money management. Staying informed about financial markets, tax
            laws, and investment strategies empowers individuals to make
            informed decisions. Educational resources, workshops, and
            professional advice contribute to a well-rounded financial
            education.
          </p>
        </div>
      </body>
    </div>
  );
};

export default MainDashBoard;
