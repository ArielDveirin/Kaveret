import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "./ShoppingCartContext"
import { useEffect, useState } from "react";
import { CartItem } from "./CartItem";
import { Button, Drawer } from "@mui/material";

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
                width:350,
                borderRadius:0
            }
        }}>

        המוצרים שלי
        <Button variant="outlined" color="error" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} onClick={() => {closeCart();}} >
            X
        </Button>


        <Stack gap={3}>
          {cartItems.map(item => ( 
            <CartItem items={items} key={item.id} {...item}  />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
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