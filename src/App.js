import "./App.css";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Login from "./Components/Login/login";
import SignIn from "./Components/Login/signIn";
import DashBoard from "./Components/DashBoard/DashBoard";
import UpdateTransactionData from "./Components/UpdateTransactionData/UpdateTransactionData.js";
import MainDashBoard from "./Components/MainDashboard/MainDashBoard.js";
import AddTransaction from "./Components/AddTransaction/AddTransaction.js";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="/MainDashBoard">
          <MainDashBoard />
        </Route>
        <Route path="/DashBoard">
          <DashBoard />
        </Route>
        <Route path="/AddTrasaction">
          <AddTransaction />
        </Route>
        <Route path="/edit/:id">
          <UpdateTransactionData />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
