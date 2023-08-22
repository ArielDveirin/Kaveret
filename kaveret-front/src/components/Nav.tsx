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

const pages = ['מוצרים', 'מבצעים', 'כניסה'];


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
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  
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
          {props.name ? 'היי ' + props.name : 'You are not logged in'}          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
