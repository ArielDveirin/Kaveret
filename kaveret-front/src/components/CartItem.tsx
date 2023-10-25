import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "./ShoppingCartContext"
import { useEffect, useState } from "react"

type CartItemProps = {
  id: number
  quantity: number
}

interface Item {
    ID?: number;
    name: string;
    Price: string;
    Quantity: string;
  }


export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  const [items, setItems] = useState<Item[]>([]);
  const item = items.find(i => i.ID === id)
  if (item == null) return null

 

  if (!items)
  {
    return null
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.name}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {item.Price}
        </div>
      </div>
      <div> {Number(item.Price) * quantity}</div>
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