import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "normalize.css";
import "./styles/styles.scss";
const ExpenseDashboardPage = () => {
  return <div>Dashboard page..</div>;
};
const AddExpensePage = () => {
  return <div>Add expense page..</div>;
};
const EditExpensePage = () => {
  return <div>from edit component</div>;
};
const HelpPage = () => {
  return <div>from help component</div>;
};

const NotFoundPage = () => {
  return <div>404</div>;
};
const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={ExpenseDashboardPage} exact={true} />
      <Route path="/create" component={AddExpensePage} />
      <Route path="/edit" component={EditExpensePage} />
      <Route path="/help" component={HelpPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(routes, document.querySelector(".app"));
