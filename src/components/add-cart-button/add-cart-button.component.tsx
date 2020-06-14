import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  product: { [key: string]: string };
}
export class AddCartButtonComponent extends React.Component<IProps> {
  public render(): JSX.Element {
    return (
      <button className="btn-add-to-cart" onClick={() => this.onAddToCart()}>
        <FontAwesomeIcon icon={["fas", "shopping-cart"]} /> Add to Cart
      </button>
    );
  }

  private onAddToCart(): void {
    const { product } = this.props;
    if (localStorage.getItem("user-token")) {
      const event = new CustomEvent("update-cart", {
        detail: { product },
      });
      dispatchEvent(event);
    } else {
      dispatchEvent(new CustomEvent("unauthorized-access-cart"));
    }
  }
}
