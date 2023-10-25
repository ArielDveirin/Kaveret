import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, CardMedia, Box } from '@mui/material';
import { shadows } from '@mui/system';
import { useShoppingCart } from '../components/ShoppingCartContext';


interface Item {
  ID: number;
  name: string;
  Price: string;
  Quantity: string;
  ItemId: number;
  ImageUrl: string;
}

const Home = (props: {searchWord: string}) => {

  const {getItemQuantity, addToCart, removeFromCart} = useShoppingCart()

  const [items, setItems] = useState<Item[]>([]);
  var quantity = 1

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

  

  return (
    <Grid container spacing={2} paddingLeft={"5%"} paddingRight={"20%"}>
      {items.filter(item => item.name.includes(props.searchWord)).map((item, index) => (
        <Grid item xs={14} sm={10} md={3} key={index} >
      <Box sx={{ boxShadow: 12}}>
      <Card style={{ height: '100%',width:"100%", display: 'flex', flexDirection: 'column'}}>
            <CardMedia
              component="img"
              alt={item.name}
              height="140"
            
              style={{height:"10rem", width:"10rem", alignSelf:"center"}} // Adjust image styling as needed
              
              image={item.ImageUrl} // Update with your image URL field
            />
            <CardContent style={{ flexGrow: 1 }} dir="rtl">
            <Typography variant="h6">------------●------------</Typography>

              <Typography variant="body1">{item.name} </Typography>
              <Typography variant="body2" color={"#f8b904"} fontWeight={"bold"}>מחיר: ₪{item.Price}</Typography>
              

              <Button 
              variant="contained"
              color="primary"
              sx={{width:"50%", backgroundColor:"#fcbc06", color:"black", fontWeight:"bold"}}
              onClick={() => addToCart(item.ID)}
      
            >
              הוסף לסל
            </Button>


            </CardContent>
          </Card>
          </Box>
        </Grid>
      ))}
      
    </Grid>
  );
};

export default Home;