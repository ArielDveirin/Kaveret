import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InputBase from '@mui/material/InputBase';
import { Menu, MenuItem } from '@mui/material';
import { useShoppingCart } from './ShoppingCartContext';

import BannerImg from '../images/Banner.png';
import YoterImg from '../images/yoter.png';


const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  outline:'10px',
  outlineColor:'black',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#f8f4f4',
  '&:hover': {
    backgroundColor: '#f8f4f4',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));



const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

interface Item {
  ID?: number;
  name: string;
  Price: string;
  Quantity: string;
  ItemId: number;
  ImageUrl: string;
}

interface ResponsiveDrawerProps {
  onSearchFilterChange: (newSearchFilter: string) => void; // Define the prop
  name: string;
  setName: (name: string) => void;
}

export default function ResponsiveDrawer({
  onSearchFilterChange, // Receive the prop
  name,
  setName,
}: ResponsiveDrawerProps)  {
  const navigate = useNavigate();

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const {openCart} = useShoppingCart()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchFilter = event.target.value;
    onSearchFilterChange(newSearchFilter);
  };

  const [items, setItems] = useState({});

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('http://localhost:3002/getItems', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const responseBody = await response.text();
         
          setItems(responseBody);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, []);

  const redirectPage = (prop: any) => {
    navigate('/' + prop);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(true);
  };


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const opened = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setAnchorEl(null);
    navigate('/כניסה');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3002/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
    } 
    catch(error)
    {
        setErr('Error');
    }
    window.location.reload();
    alert('התנתקות בוצעה בהצלחה!');
    navigate('/');

  };

  const handleRegister = () => {
    setAnchorEl(null);
    navigate('/הרשמה');

  };
  const [isAdmin, setIsAdmin] = useState(false);
  const [err, setErr] = useState('');

  async function checkAdmin() {
    try {
      const response = await fetch('http://localhost:3002/isAdmin', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.ok) {
        setIsAdmin(true)
      }
    } 
    catch(error)
    {
        setErr('Error');
    }
  }

  checkAdmin();
  return (
    <Box sx={{ display: 'flex' }} >
      
      <img src=".../images/Banner.png" alt="banner"/>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        
        <Toolbar dir="rtl" sx={{ backgroundColor: 'white' }}>
        

        <Search>
          <StyledInputBase
              placeholder="חיפוש..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}

              />
            
          

        </Search>
        
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, paddingRight:'75%', minHeight:"100%",width:"100%",}}>

          <div>
          <Button onClick={openCart}>
            <ShoppingCartOutlinedIcon sx={{color:"#f8c40c", outlineColor:"black", position:"relative", fontSize:"40px", paddingLeft:"0%", outline:"10px"}}/>
          </Button>

           <Button
           sx={{ color:'black', backgroundColor: 'white', fontSize:'20px' }}
             id="basic-button"
             
             onClick={handleClick}
             
           >
            
            <PersonOutlineTwoToneIcon sx={{color:"#f8c40c", outlineColor:"black", position:"relative", fontSize:"40px", paddingLeft:"10%", outline:"10px"}}/>
               
           </Button>


           <Menu 
              dir='rtl'
             id="basic-menu"
             anchorEl={anchorEl}
             open={opened}
             onClose={handleClose}
             MenuListProps={{
               'aria-labelledby': 'basic-button',
             }}
           >
            {name == "" && <><MenuItem onClick={handleLogin}>כניסה</MenuItem><MenuItem onClick={handleRegister}>הרשמה</MenuItem></>}
            {name != "" && <><MenuItem onClick={handleLogout}>התנתקות</MenuItem></>}

             
           </Menu>
         </div>

         
         </Box>
          


          

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >

            <MenuIcon />
          </IconButton>
             


        </Toolbar>
        <img src={BannerImg} />

      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
        <Link to="/">
            <img src={require('../images/kaveretLogo.png')} width={'100%'}/>
        </Link>
        </DrawerHeader>
        <Divider />
        <List dir="rtl">
          {['מבצעים', 'מוצרים'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => redirectPage(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {isAdmin &&
        <><Divider /><List dir="rtl">
            {['ניהול מוצרים', 'ניהול משתמשים'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => redirectPage(text)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>  
          <a href="https://www.yoter.co.il/" style={{marginTop:"178%"}}>
                  <img src={YoterImg} style={{width:"100%"}}/>
          </a>
            </>
        }
      </Drawer>
    </Box>
  );
}

function setAnchorElNav(arg0: null) {
  throw new Error('Function not implemented.');
}

