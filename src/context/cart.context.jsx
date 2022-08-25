import { createContext, useState, useEffect } from 'react';

const addCardItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id)

    if(existingCartItem) {
        return cartItems.map(item => item.id === productToAdd.id ? {...item, quantity: item.quantity + 1} : item)
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartItemCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartItemCount(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCardItem(cartItems, productToAdd))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemCount }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
} 