import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Box,
  Button,
} from '@mui/material';
import React from 'react';
import ShoppingCartSharp from '@mui/icons-material/ShoppingCartSharp';
function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          sx={{
            flexGrow: 1,
          }}
        >
          E-comm
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" aria-label="shows cart items count">
            <Badge badgeContent={1} color="error">
              <ShoppingCartSharp />
            </Badge>
          </IconButton>
        </Box>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
