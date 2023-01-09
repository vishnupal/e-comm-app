import * as React from 'react';
import { Avatar, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FromControlLabel from '@mui/material/FromControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';
import { useAuth } from '../firebase/Auth';
import { useNavigate } from 'react-router-dom';
function Register() {
  const theme = useTheme();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  async function registerUser(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await signUp(data.get('email'), data.get('password'), data.get('name'));
    navigate('/login');
  }
  return (
    <Container component={'main'} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component={'h1'}>
          Sign Up
        </Typography>
        <Box
          onSubmit={registerUser}
          component={'form'}
          sx={{
            mt: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                id="name"
                autoFocus
                label="Name"
                required
                autoComplete="given-name"
                sx={{
                  mt: 1,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                id="email"
                label="Email"
                required
                autoComplete="email"
                sx={{
                  mt: 1,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                id="password"
                label="Password"
                type="password"
                required
                autoComplete="new-password"
                sx={{
                  mt: 1,
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            Register
          </Button>
          <Grid container justifyContent={'flex-end'}>
            <Grid item>
              <Link variant="body2" href="/login">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
