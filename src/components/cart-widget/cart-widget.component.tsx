import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiService } from "../../shared/api.service";
import { History } from "history";

export class CartWidgetComponent extends React.Component<{ history?: History }> {
  constructor(props) {
    super(props);
  }

  public state = {
    total: 0,
  };

  public componentDidMount(): void {
    addEventListener("signin", (e: CustomEvent) => {
      apiService
        .checkShoppingCart(e.detail.userId)
        .then((resp: { data: { [key: string]: any } }) => {
          localStorage.setItem("shopping-cart", resp.data._id);
          this.setState({ total: resp.data.totalItems });
        });
    });

    addEventListener("signout", () => {
      localStorage.removeItem("shopping-cart");
      this.setState({ total: 0 });
    });

    addEventListener("update-cart", (e: CustomEvent) => {
      apiService
        .addProductToCart(e.detail.product._id)
        .then((resp: { data: { [key: string]: any } }) => {
          this.setState({ total: resp.data.totalItems });
        });
    });

    addEventListener('empty-cart', (e: CustomEvent) => {
      this.setState({ total: 0 });
    });
  }

  public render(): JSX.Element {
    return (
      <div className="cart-widget" onClick={() => this.widgetClicked()}>
        <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
        <span>{this.state.total}</span>
      </div>
    );
  }

  private widgetClicked(): void {
    if (localStorage.getItem("user-token")) {
      window.location.assign(window.location.origin + "/cart");
    } else {
      dispatchEvent(new CustomEvent("unauthorized"));
    }
  }
}
