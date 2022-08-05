import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./pages/Home";

export const history = createBrowserHistory();

const Navigation = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </Router>
  );
};

export default Navigation;
