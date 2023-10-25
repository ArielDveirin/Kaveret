import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "./ShoppingCartContext"
import { useEffect, useState } from "react";
import { CartItem } from "./CartItem";

interface Item {
    ID?: number;
    name: string;
    Price: string;
    Quantity: string;
  }

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const [items, setItems] = useState<Item[]>([]);
    const { closeCart, cartItems } = useShoppingCart()

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch('http://localhost:3002/getItems', {
            method: 'GET',
            credentials: 'include',
          });
  
          if (response.ok) {
            const responseBody = await response.text(); // Get the response text
            
            const jsonItems = JSON.parse((responseBody.toString()));

            setItems(jsonItems.items);
            
          } else {
            // Handle the case where the API request is not successful
          }
        } catch (error) {
          // Handle any other errors that may occur during the API request
        }
      }
    )();
  }, []);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => ( 
            <CartItem key={item.id} {...item} />
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
      </Offcanvas.Body>
    </Offcanvas>
  )
}