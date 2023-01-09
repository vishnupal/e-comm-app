import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Box,
  Button,
  Autocomplete,
  TextField,
  Menu,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import React from 'react';
import ShoppingCartSharp from '@mui/icons-material/ShoppingCartSharp';
import { useDispatch, useSelector } from 'react-redux';
import { getItemCount } from '../utils';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { fetchCategories } from '../features/categoriesSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useAuth } from '../firebase/Auth';
const Search = styled('section')(({ theme }) => ({
  position: 'relative',
  paddingRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
}));

const StyleAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: 'inherit',
  width: '100%',

  '& .MulTextField-root': {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-input': {
    color: theme.palette.common.white,
  },
  '& .MuiSvgIcon-root': {
    fill: theme.palette.common.white,
  },
}));

const SearchIconWrapper = styled('section')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: '0',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyleLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
}));

function SearchBar() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.value);
  const categories = useSelector((state) => state.categories?.value);
  console.log(categories);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const searchTerm = searchParam.get('searchterm');
  const category = searchParam.get('category');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setSelectedCategory(category ? category : 'all');
    setSelectedProduct(searchTerm ? searchTerm : '');
  }, [category, searchTerm]);

  if (!categories.length) {
    dispatch(fetchCategories());
  }
  function handleCategoryChange(event) {
    const { value } = event.target;
    setSelectedCategory(value);

    navigate(
      value === 'all' ? '/' : `/?category=${value}`
      // : `/?category=${value}${searchTerm ? '&searchterm=' + searchTerm : ''}`
    );
    setSelectedProduct('');
  }
  function handleSearchChange(searchText) {
    if (searchText) {
      navigate(
        selectedCategory === 'all'
          ? `?searchterm=${searchText}`
          : `/?category=${selectedCategory}&searchterm=${searchText}`
      );
    } else {
      navigate(
        selectedCategory === 'all' ? '/' : `?category=${selectedCategory}`
      );
    }
  }
  return (
    <Search>
      <Select
        value={selectedCategory}
        size="small"
        variant="standard"
        labelId="selected-category"
        id="selected-category-id"
        sx={{
          m: 1,
          textTransform: 'capitalize',
          '&': {
            '::before': {
              ':hover': {
                border: 'none',
              },
            },
            '::before,&::after': {
              border: 'none',
            },
            '.MuiSelect-standard': {
              color: 'common.white',
            },
            '.MuiSelect-icon': {
              color: 'common.white',
            },
          },
        }}
        onChange={handleCategoryChange}
      >
        <MenuItem
          sx={{
            textTransform: 'capitalize',
          }}
          value="all"
        >
          all
        </MenuItem>
        {categories?.map((category) => (
          <MenuItem
            sx={{
              textTransform: 'capitalize',
            }}
            key={category}
            value={category}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
      <StyleAutocomplete
        freeSolo
        id="selected-product"
        value={selectedProduct}
        isOptionEqualToValue={() => true}
        onChange={(e, value) => {
          console.log(value);
          handleSearchChange(value?.label);
        }}
        disablePortal
        options={Array.from(
          selectedCategory === 'all'
            ? products
            : products.filter((prod) => prod.category === selectedCategory),
          (prod) => ({
            id: prod.id,
            label: prod.title,
          })
        )}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}
function Header() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemCount(cartItems);
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState();
  const isMenuOpen = Boolean(anchorEl);
  function navigateToCart() {
    navigate('/cart');
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  async function logout() {
    await signOut();
    navigate('/login');
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="user-profile-menu"
      keepMounted
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          py: 1,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <Typography variant="h6" color="inherit">
            <StyleLink to="/">Ecomm</StyleLink>
          </Typography>
          <SearchBar />
          <Box flexBasis={450} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              onClick={navigateToCart}
              size="large"
              aria-label="shows cart items count"
              color="inherit"
            >
              <Badge badgeContent={count} color="error">
                <ShoppingCartSharp />
              </Badge>
            </IconButton>
            {user ? (
              <Button color="inherit" onClick={handleProfileMenuOpen}>
                Hello, {user?.displayName ?? user.email}
              </Button>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
}

export default Header;
