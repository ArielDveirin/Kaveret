import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, CardMedia, Box, Divider } from '@mui/material';
import { useShoppingCart } from '../components/ShoppingCartContext';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CakeIcon from '@mui/icons-material/Cake';
import { useLocation } from 'react-router-dom';
import { QuestionAnswer } from '@mui/icons-material';
interface Item {
  ID: number;
  Name: string;
  Price: string;
  Quantity: string;
  ItemId: number;
  ImageUrl: string;
  Category: string;
}

const Search = () => {
  const { addToCart } = useShoppingCart('');

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

  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '5rem', paddingRight:"15rem"}} dir='rtl'>
        <Typography variant="h5" style={{paddingLeft:"80rem", paddingRight:"5rem"}}>מוצרים שתואמים לחיפוש: '{queryParameters.get("filter")}'</Typography>

      {items
        .filter((item) => item.Name.includes(queryParameters.get("filter") || '{}'))
        .map((item, index) => (
          <Card key={index} style={{ margin: '1rem', padding: '1rem', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s', borderRadius: '4px', height:"20rem", width:"15rem"}}>
            <CardContent>

              <CardMedia component="img" alt={item.Name} height="100" style={{ height: '7rem', width: '100%', alignSelf: 'center' }} image={item.ImageUrl} />
              <Typography variant="h6">------------●------------</Typography>

              <CardContent style={{ flexGrow: 1 }} dir="rtl">
                <Typography variant="body1">{item.Name}</Typography>
                <Typography variant="body2" color={'#f8b904'} fontWeight={'bold'}>
                  מחיר: ₪{item.Price}
                </Typography>
                <Button variant="contained" color="primary" sx={{ width: '100%', backgroundColor: '#fcbc06', color: 'black', fontWeight: 'bold' }} onClick={() => addToCart(item.ID)}>
                  הוסף לסל
                </Button>
              </CardContent>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default Search;
