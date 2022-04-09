import {useState, createContext, useContext} from 'react';

import { initiateCheckout } from '../lib/payments';

import products from '../products.json'

let defaultCart = {
    products: {}
}
export const CartContext = createContext();

export function useCartState() {
    const [cart, updateCart] = useState(defaultCart);

    const cartItems = Object.keys(cart.products).map(key => {
        const product = products.find(({ id }) => `${id}` === `${key}`);
        return {
          ...cart.products[key],
          pricePerItem: product.price
        }
      })
    
      const subTotal = cartItems.reduce((acc, {pricePerItem, quantity}) => {
        return acc + (pricePerItem * quantity)
      }, 0)
    
      const totalItems = cartItems.reduce((acc, { quantity}) => {
        return acc + quantity
      }, 0)
      console.log("subtotal:", subTotal)
    
      function addToCart({ id } = {}){
        updateCart(prev => {
          let cartState = {...prev}
    
          if(cartState.products[id]){
            cartState.products[id].quantity = cartState.products[id].quantity + 1
          }else{
            cartState.products[id] = {
              id, 
              quantity: 1
            }
          }
          return cartState
        })
      }
      function checkOut(){
        initiateCheckout({
          lineItems: cartItems.map(item => {
            return {
              price: item.id,
              quantity: item.quantity
            }
          })
        })
      }
    return {
        cart,
        updateCart,
        subTotal,
        totalItems,
        addToCart,
        checkOut
    }
}

export function useCart(){
    const cart = useContext(CartContext);
    return cart;
}