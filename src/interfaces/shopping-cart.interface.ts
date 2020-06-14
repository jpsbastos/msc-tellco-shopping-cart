export interface IShoppingCart {
  _id: string;
  userId: string;
  cartEntries?: IShoppingCartEntry[];
  totalItems: number;
  cartTotalPrice: number;
  creationDate: Date;
}

interface IShoppingCartEntry {
  _id: string;
  quantity: number;
  entryTotalPrice: number;
  product: IShoppingCartProduct;
  shoppingCartId: string;
  creationDate: Date;
}

interface IShoppingCartProduct {
  _id: string;
  brandName: string;
  modelNumber: string;
  imagePath: string;
  originalPrice: number;
}
