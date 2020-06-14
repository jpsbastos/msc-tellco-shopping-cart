import * as React from "react";
import { apiService } from "../shared/api.service";
import { IShoppingCart } from "../interfaces/shopping-cart.interface";

export class ShoppingCartPageComponent extends React.Component {
  public state: { cart: IShoppingCart } = {
    cart: null,
  };

  public componentDidMount() {
    const userId = localStorage.getItem("user-id");

    apiService
      .checkShoppingCart(userId, true)
      .then((response: { data: IShoppingCart }) => {
        this.setState({ cart: response.data });
      });
  }

  public render(): JSX.Element {
    return (
      <div className="page shopping-cart-page">
        <h1>My Shopping Cart</h1>
        {this.renderShoppingCartList()}
      </div>
    );
  }

  private renderShoppingCartList(): JSX.Element {
    if (!this.state.cart) {
      return null;
    }

    if (!this.state.cart.cartEntries.length) {
      return (
        <div className="shopping-cart-container total">
          <h3>Currently it's empty!</h3>{" "}
        </div>
      );
    }

    const entries = this.state.cart.cartEntries.map((e) => {
      return (
        <div className="cart-entry" key={e._id}>
          <img
            className="entry-image"
            src={e.product.imagePath}
            alt={"image"}
          />
          <span className="entry-name">
            {e.product.brandName} {e.product.modelNumber}
          </span>
          <span className="entry-product-price">
            €{e.product.originalPrice.toFixed(2)}
          </span>
          <input
            className="entry-quantity"
            readOnly={true}
            type="number"
            value={e.quantity}
          />
          <span className="entry-total-price red">
            €{e.entryTotalPrice.toFixed(2)}
          </span>
        </div>
      );
    });

    return (
      <React.Fragment>
        <div className="shopping-cart-container">{entries}</div>
        <div className="shopping-cart-container total">
          <h3>
            Total:{" "}
            <span className="cart-total red">
              €{this.state.cart.cartTotalPrice.toFixed(2)}
            </span>
          </h3>
        </div>
        <button className="clear-btn" onClick={() => this.clearShoppingCart()}>
          Clear Cart
        </button>
      </React.Fragment>
    );
  }

  private clearShoppingCart(): void {
    if (confirm("Are you sure you want to delete?")) {
      apiService
        .emptyShoppingCart(this.state.cart._id)
        .then((response: { data: IShoppingCart }) => {
          this.setState({ cart: response.data });
          dispatchEvent(new CustomEvent("empty-cart"));
        });
    }
  }
}
