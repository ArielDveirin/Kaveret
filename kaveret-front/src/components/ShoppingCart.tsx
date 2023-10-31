import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "./ShoppingCartContext"
import { useEffect, useState } from "react";
import { CartItem } from "./CartItem";
import { Button, Drawer, Typography } from "@mui/material";
import { close, url } from "inspector";
import cartImg from '../images/cart.png';

interface Item {
    ID?: number;
    name: string;
    Price: string;
    Quantity: string;
    ImageUrl: string;
}

type ShoppingCartProps = {
  isOpen: boolean
  items: Item[]
}

export function ShoppingCart({ isOpen, items }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart()

  
  return (
    <Drawer open={isOpen} dir="rtl" onBackdropClick={closeCart}
        PaperProps={{
            sx: {
                alignItems:"center",
                width:400,
                borderRadius:0
            }
        }}>
          <div  onClick={() => {closeCart();}} 
          style={{ width:"100%", height:"7rem"}}>
            <img src={cartImg} height={"100%"} width={"100%"}></img>

       
        </div>


        <Stack gap={3}>
          {cartItems.map(item => ( 
            <CartItem items={items} key={item.id} {...item}  />
          ))}
          
          <div className="ms-auto fw-bold fs-5" style={{marginTop:"2rem"}}>
            סה"כ לתשלום: {" "}
            {
              cartItems.reduce((total, cartItem) => {
                const item = items.find(i => i.ID === cartItem.id)
                return total + (Number(item?.Price) || 0) * cartItem.quantity
              }, 0)
            }
          </div>
        </Stack>
    </Drawer>
  )
}