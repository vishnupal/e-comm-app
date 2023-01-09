import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {
  Button,
  CardContent,
  CardMedia,
  Rating,
  TextField,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import { getSubtotal } from '../utils';
import { addToCart, removeFromCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const cart = useSelector((state) => state.cart?.value);
  const theme = useTheme();
  const navigate = useNavigate();
  const subtotal = getSubtotal(cart)?.toFixed(2);
  const dispatch = useDispatch();
  function handleQuantityUpdate(e, { product, quantity }) {
    const updatedQuantity = e.target.valueAsNumber;
    if (updatedQuantity < quantity) {
      //remove from cart
      dispatch(removeFromCart({ product }));
    } else {
      dispatch(addToCart({ product }));
    }
  }
  function goToHome() {
    navigate('/');
  }
  function checkoutItems() {
    navigate('/checkout');
  }

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cart?.map(({ product, quantity }) => {
            const { title, id, price, description, rating, image } = product;

            return (
              <Grid item key={id} xs={12}>
                <Card
                  sx={{
                    display: 'flex',
                    py: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: 'contain',
                      pt: theme.spacing(),
                    }}
                    alt={title}
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flex: '1',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                      <Typography variant="h5">{title}</Typography>
                      <Rating value={rating.rate} precision={0.5} readOnly />
                      <form>
                        <TextField
                          sx={{
                            width: theme.spacing(8),
                          }}
                          inputProps={{
                            min: 0,
                            max: 10,
                          }}
                          id={`${id}-product-id`}
                          type="number"
                          variant="standard"
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityUpdate(e, { product, quantity })
                          }
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        {getSubtotal([{ product, quantity }])?.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          md={4}
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Card
              sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h4">Subtotal</Typography>
              <Typography variant="h5">{subtotal}</Typography>
              {subtotal > 0 ? (
                <Button variant="contained" onClick={checkoutItems}>
                  Buy Now
                </Button>
              ) : (
                <Button variant="contained" onClick={goToHome}>
                  Shop products
                </Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
