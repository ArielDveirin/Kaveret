import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, CardMedia, Box, Divider } from '@mui/material';
import { shadows } from '@mui/system';
import { useShoppingCart } from '../components/ShoppingCartContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

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
       
       <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
       style={{
        borderColor:'black',
        'height': '25rem',
        'width':'50%',
        justifyContent: 'center',
        display:'flex',
      }}
        
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            height={"100%"}
            src="https://www.caveret.org/media/wysiwyg/file_23.png"
            loading="lazy"
          />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            height={"100%"}
            src="https://www.caveret.org/media/wysiwyg/file_29.png"
            loading="lazy"
          />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.caveret.org/media/wysiwyg/file_22.png"
            height={"100%"}
            loading="lazy"
          />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide>

      </Swiper>
      <Swiper
       style={{
        
        'height': '25rem',
        'width':'50%',
        justifyContent: 'center',
        display:'flex',
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            height={"100%"}
            src="https://www.caveret.org/media/wysiwyg/file_44.png"
            loading="lazy"
          />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            height={"100%"}
            src="https://www.caveret.org/media/wysiwyg/file_45.png"
            loading="lazy"
          />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.caveret.org/media/wysiwyg/file_46.png"
            height={"100%"}
            loading="lazy"
          />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide>

      </Swiper>
      <Divider />


      <Divider />

      
<Grid item xs={22} md={26} textAlign={"right"}>
      <Typography fontSize={"1.5rem"} color={"#737373"}> מומלצים <ExploreOutlinedIcon  sx={{outlineColor:"black", paddingTop:"3rem", outline:"10px", height:"100%"}}/> </Typography>

      </Grid>

      <Grid item xs={16}>

      </Grid>

      <Swiper
              navigation={true}
        slidesPerView={4}
        spaceBetween={30}
        
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {items.filter(item => item.name.includes(props.searchWord)).map((item, index) => (
        
      <SwiperSlide>
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
          </SwiperSlide>
      ))}
      </Swiper>
      <Divider />
      <Divider />


      <Grid item xs={22} md={26} textAlign={"right"}>
      <Typography fontSize={"1.5rem"} color={"#737373"}> מבצעים <ShoppingBagOutlinedIcon  sx={{outlineColor:"black", paddingTop:"3rem", outline:"10px", height:"100%"}}/> </Typography>

      </Grid>

      <Grid item xs={16}>

      </Grid>

      <Swiper
              navigation={true}
        
        slidesPerView={4}
        spaceBetween={30}
        
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {items.filter(item => item.name.includes(props.searchWord)).map((item, index) => (
        
      <SwiperSlide>
      <Box sx={{ boxShadow: 12}}>
      <Card style={{ height: '100%',width:"100%", display: 'flex', flexDirection: 'column', marginBottom:"1Rem"}}>
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
          </SwiperSlide>
      ))}
      </Swiper>
      <Divider />
      <Divider />

    </Grid>
  );
};

export default Home;