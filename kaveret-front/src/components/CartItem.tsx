import { Button } from "react-bootstrap"
import Stack from '@mui/material/Stack';

import { useShoppingCart } from "./ShoppingCartContext"
import { useEffect, useState } from "react"
import { Divider } from "@mui/material";

type CartItemProps = {
  id: number
  quantity: number
  items:Item[]
}

interface Item {
    ID?: number;
    Name: string;
    Price: string;
    Quantity: string;
    ImageUrl: string;
  }


export function CartItem({ id, quantity, items }: CartItemProps) {
  const { removeFromCart } = useShoppingCart("")
  const item = items.find(i => i.ID === id)
  if (item == null) return null

 

  if (!items)
  {
    return null
  }

  return (
    <Stack direction="column" gap={1}
     className="d-flex align-items-center" 
    justifyContent="center"
    display={"flex"}

    useFlexGap flexWrap="wrap">

      <img
        src={item.ImageUrl}
        style={{ height:"7rem", width:"9rem", alignSelf:"center", marginTop:"2rem"}}
      />
      <div className="me-auto">
        <div>
          {item.Name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          מחיר יחיד: {item.Price}
        </div>
      </div>
      <div style={{ fontSize: ".75rem" }}>
        כמות בעגלה: {quantity}
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(Number(item.ID))}
      >
        &times;
      </Button>
    </Stack>
  )
}