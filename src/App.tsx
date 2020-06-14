import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ShoppingCartPageComponent } from "./pages/shopping-cart.page";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/cart" component={ShoppingCartPageComponent}/>
      </Switch>
    </Router>
  );
};

export default App;
