import axios from 'axios';

const BASE_PATH="https://msc-tellco-shopping-cart-api.herokuapp.com";
const ENDPOINT = 'shopping-cart';

class ApiService {

    /**
     *
     * @param userId
     * @param full shoppingCartInfo mode (full or widget - default)
     */
    public checkShoppingCart(userId: string, full = false): Promise<{}> {
        return axios.post(`${BASE_PATH}/${ENDPOINT}${ full ? '?full=true' : ''}`, { userId }, { headers: { 'x-access-token' : ''} });
    }

    /**
     *
     * @param product id
     */
    public addProductToCart(product: string): Promise<{}> {
        const shoppingCartId = localStorage.getItem('shopping-cart');
        return axios.post(BASE_PATH + '/' + ENDPOINT + '/entries', { product, shoppingCartId}, { headers: { 'x-access-token' : '' } });
    }

    /**
     *
     * @param shoppingCartId
     */
    public emptyShoppingCart(shoppingCartId: string):  Promise<{}> {
        console.log(shoppingCartId)
        return axios.delete(`${BASE_PATH}/${ENDPOINT}/${shoppingCartId}`, { headers: { 'x-access-token' : ''} });
    }
}

export const apiService = new ApiService();
