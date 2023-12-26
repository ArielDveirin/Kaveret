import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, CardMedia, Box, Divider } from '@mui/material';
import { useShoppingCart } from '../components/ShoppingCartContext';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

interface Item {
  ID: number;
  Name: string;
  Price: string;
  Quantity: string;
  ItemId: number;
  ImageUrl: string;
  Category: string;
}

const Dairy = () => {
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
          const responseBody = await response.json();
          setItems(responseBody.items);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, []);

  return (
    <Grid container spacing={2} paddingLeft={'5%'} paddingRight={'20%'} marginTop={'5rem'}>
      <Grid item xs={22} md={26} textAlign={'right'}>
        <Typography fontSize={'1.5rem'} color={'#737373'}>
          {' '}
          מומלצים <ExploreOutlinedIcon sx={{ outlineColor: 'black', paddingTop: '3rem', outline: '10px', height: '100%' }} />{' '}
        </Typography>
      </Grid>

      <Grid item xs={16}>
        <Divider textAlign="left" style={{ width: '100%', height: '0.01rem', backgroundColor: '#f2c30c', marginTop: '1rem' }} />
      </Grid>

      <Grid item container xs={22} md={26}>
        {items
          .filter((item) => item.Category === 'Sweets')
          .map((item, index) => (
            <Grid item key={index} xs={12} md={6} lg={4}>
              <Box sx={{ boxShadow: 12 }}>
                <Card style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                  <CardMedia
                    component="img"
                    alt={item.Name}
                    height="140"
                    style={{ height: '10rem', width: '10rem', alignSelf: 'center' }}
                    image={item.ImageUrl}
                  />
                  <CardContent style={{ flexGrow: 1 }} dir="rtl">
                    <Typography variant="h6">------------●------------</Typography>
                    <Typography variant="body1">{item.Name} </Typography>
                    <Typography variant="body2" color={'#f8b904'} fontWeight={'bold'}>
                      מחיר: ₪{item.Price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: '50%', backgroundColor: '#fcbc06', color: 'black', fontWeight: 'bold' }}
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

      <Grid item xs={16}>
        <Divider textAlign="left" style={{ width: '100%', height: '0.01rem', backgroundColor: '#f2c30c', marginTop: '5rem' }} />
      </Grid>

      <Grid item xs={22} md={26} textAlign={'right'}>
        <Typography fontSize={'1.5rem'} color={'#737373'}>
          {' '}
          מבצעים <ShoppingBagOutlinedIcon sx={{ outlineColor: 'black', paddingTop: '3rem', outline: '10px', height: '100%' }} />{' '}
        </Typography>
      </Grid>

      <Grid item xs={16}>
        <Divider textAlign="left" style={{ width: '100%', height: '0.01rem', backgroundColor: '#f2c30c', marginTop: '1rem' }} />
      </Grid>

      <Grid item container xs={22} md={26}>
        {items
          .filter((item) => item.Category === 'Sweets')
          .map((item, index) => (
            <Grid item key={index} xs={12} md={6} lg={4}>
              <Box sx={{ boxShadow: 12 }}>
                <Card style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                  <CardMedia
                    component="img"
                    alt={item.Name}
                    height="140"
                    style={{ height: '10rem', width: '10rem', alignSelf: 'center' }}
                    image={item.ImageUrl}
                  />
                  <CardContent style={{ flexGrow: 1 }} dir="rtl">
                    <Typography variant="h6">------------●------------</Typography>
                    <Typography variant="body1">{item.Name} </Typography>
                    <Typography variant="body2" color={'#f8b904'} fontWeight={'bold'}>
                      מחיר: ₪{item.Price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: '50%', backgroundColor: '#fcbc06', color: 'black', fontWeight: 'bold' }}
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
    </Grid>
  );
};

export default Dairy;
