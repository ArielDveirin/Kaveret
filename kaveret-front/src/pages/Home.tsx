import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, CardMedia } from '@mui/material';

interface Item {
  ID?: number;
  name: string;
  Price: string;
  Quantity: string;
  ItemId: number;
  ImageUrl: string;
}

const Home = (props: { name: string }) => {

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('http://localhost:3002/getItems', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const responseBody = await response.text();
          const jsonItems = JSON.parse(responseBody.toString());
          setItems(jsonItems.items);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, []);

  const addToCart = (item: Item) => {
    // Implement your cart logic here
    console.log('Added to cart:', item);
  };

  return (
    <Grid container spacing={2} paddingLeft={"5%"} paddingRight={"20%"}>
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} >
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column',   boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)5px 10px"}}>
            <CardMedia
              component="img"
              alt={item.name}
              height="140"
              style={{height:"100%", width:"100%"}} // Adjust image styling as needed
              image={item.ImageUrl} // Update with your image URL field
            />
            <CardContent style={{ flexGrow: 1 }}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2">Price: ₪{item.Price}</Typography>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;