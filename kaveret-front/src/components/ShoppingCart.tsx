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
  username:string
}

type CartItem = {
  id: number
  quantity: number
  username: string
}

async function buy(cartItems: CartItem[], username: string) {
    try {
      const response = await fetch('http://localhost:3002/BuyItems', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          cartItems
       }),
      });

      if (response.ok) {
        const responseBody = await response.text();
        alert("ההזמנה נשלחה!");
        window.location.reload();
      }
      else if (!response.ok) {
        alert("ההזמנה לא בוצעה :(");
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
}


export function ShoppingCart({ isOpen, items, username}: ShoppingCartProps) {
    let { closeCart, cartItems } = useShoppingCart(username)

  
  return (
    <Drawer open={isOpen} dir="rtl" onBackdropClick={closeCart}
        PaperProps={{
            sx: {
                alignItems:"center",
                width:350,
                borderRadius:0
            }
        }}>
          <div  onClick={() => {closeCart();}} 
          style={{ width:"100%", height:"7rem", objectFit:"fill"}}>
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

        <Button variant="contained" style={{marginTop:"2rem", marginBottom:"2rem", backgroundColor:"#f8c40c", color:"black", fontSize:"1rem", fontWeight:"bold"}}  onClick={() => buy(cartItems, username)}>הזמן</Button>
    </Drawer>
  )
}