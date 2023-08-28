import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pages = ['מוצרים', 'מבצעים'];


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'gainsboro',
  '&:hover': {
    backgroundColor: 'lightgrey',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
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

function ResponsiveAppBar(props: { name: string, setName: (name: string) => void }) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [err, setErr] = useState('');
  let check;
  

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemPanel = () => {
    setAnchorEl(null);
    navigate('/ניהול_מוצרים');

  };

  const handleUserPanel = () => {
    setAnchorEl(null);
    navigate('/ניהול_מוצרים');

  };

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
  


  return (
    
    <AppBar position="static" style={{backgroundColor: "white", color:"black", width: '100%'}} dir="rtl">


      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
        <Box sx={{mr:-37, marginLeft:0, width:'-100', paddingLeft:'150px'}}>
          <Link to="/">
            <img src={require('../images/kaveretLogo.png')} />
          </Link>
        </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="right">
                    <Link style={{textDecoration: "none", color:"black"}} to={`/${page}`}>{page}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            
          </Box>
          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', paddingLeft:'50px',paddingRight:"50px", alignItems:"center"}}
              >
                <Link style={{textDecoration: "none", color:"black", fontSize:'30px'}} to={`/${page}`}>
                  {page}
                </Link>
              </Button>
            ))}

            {props.name != "" &&
           <div>
           <Button
           sx={{fontSize:'30px', color:'black', backgroundColor: 'white', paddingTop:'20px',paddingRight:'30px',}}
  
             id="basic-button"
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}
           >
             ניהול
           </Button>
           <Menu 
              dir='rtl'
             id="basic-menu"
             anchorEl={anchorEl}
             open={open}
             onClose={handleClose}
             MenuListProps={{
               'aria-labelledby': 'basic-button',
             }}
           >
             <MenuItem onClick={handleItemPanel}>ניהול מוצרים</MenuItem>
             <MenuItem onClick={handleUserPanel}>ניהול משתמשים</MenuItem>
           </Menu>
         </div>
            }
          </Box>
         
          <Search dir='ltr'>
          <SearchIconWrapper dir='ltr'>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase dir='rtl'
              placeholder="חיפוש..."
              inputProps={{ 'aria-label': 'search' }}
            />
            
          </Search>
          
          <Typography >
            {props.name ? 'היי ' + props.name : 'You are not logged in'}       
          </Typography>

          <Box sx={{paddingRight:"50px"}}>

          {!props.name &&
          <Button variant="contained" sx={{minWidth: '50px', minHeight: '50px', fontSize:'20px', color:'primary', backgroundColor: 'orange', '&:hover': {
            backgroundColor: '#ffcf33',
        } }}
            onClick={async () => {
              window.location.href='/כניסה'
            }}
          >
            התחבר
          </Button>
          }

    {props.name != "" &&
          <Button variant="contained" color="error" sx={{minWidth: '100px', minHeight: '50px', fontSize:'20px', '&:hover': {
            backgroundColor: '#ff4569',
        }}}
            onClick={async () => {
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
            }}
          >
            התנתק
          </Button>
          }   


          </Box>    
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
