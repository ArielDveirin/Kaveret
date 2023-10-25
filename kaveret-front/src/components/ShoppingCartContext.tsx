import { useContext, useState } from "react";
import { createContext } from "react";
import { ReactNode } from "react";
import { ShoppingCart } from "./ShoppingCart";


type ShoppingCartProviderProps = {
    children: ReactNode
}
type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {

    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    addToCart: (id: number) => void
    removeFromCart: (id: number) => void

    cartItems: CartItem[]
}


const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}


export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function getItemQuantity(id: number)
    {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const openCart = ()  => setIsOpen(true)
    const closeCart = () =>  setIsOpen(false)

    function addToCart(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                    return currItems.map(item => {
                        if (item.id === id) {
                            return {...item, quantity: item.quantity + 1}
                        } else {
                            return item
                        }
                    })
                }
            })
    }
    
    function removeFromCart(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity ===1) {
                return currItems.filter(item => item.id !== id)
            } else {
                    return currItems.map(item => {
                        if (item.id === id) {
                            return {...item, quantity: item.quantity - 1}
                        } else {
                            return item
                        }
                    })
                }
            })
        }  
            
        
    


    return (
        <ShoppingCartContext.Provider value={{openCart, closeCart, getItemQuantity, addToCart, removeFromCart, cartItems}}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}