import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  IconButton,
  Snackbar,
  TextField,
 
} from "@mui/material";
import axios from "axios";
import Base from "../../Base/Base";

const UpdateTransactionData = () => {
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
        <Base title={"Edit The Transactions Data"}>
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

              <Button variant="text" onClick={() => history.push("/DashBoard")}>
                Cancel
              </Button>
              <Button variant="text" type="submit">
                Update Transaction Data
              </Button>
              {/* pop-up message */}
              <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                message="Updated Successfully"
                action={action}
              />
            </form>
          </div>
        </Base>
      </body>
    </div>
  );
};

export default UpdateTransactionData;
