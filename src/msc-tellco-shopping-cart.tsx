import "./set-public-path";
import "./msc-tellco-shopping-cart.scss";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { AddCartButtonComponent } from "./components/add-cart-button/add-cart-button.component";
import { ShoppingCartPageComponent } from "./pages/shopping-cart.page";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: ShoppingCartPageComponent,
  // errorBoundary: (err, info, props) => {
  //   // Customize the root error boundary for your microfrontend here.
  //   return <div>Shopping Cart Unavailable</div>;
  // },
});

export const { bootstrap, mount, unmount } = lifecycles;

export { AddCartButtonComponent } from "./components/add-cart-button/add-cart-button.component";
export { CartWidgetComponent } from "./components/cart-widget/cart-widget.component";
