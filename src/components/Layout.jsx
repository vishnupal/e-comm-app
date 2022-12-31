import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Outlet />
      <footer>Footer</footer>
    </ThemeProvider>
  );
}

export default Layout;
