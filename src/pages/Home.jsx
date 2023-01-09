import { ShoppingCartSharp } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { fetchAllProducts } from '../features/productsSlice';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
  // const [products, setProducts] = useState([]);
  const [searchParam] = useSearchParams();
  const category = searchParam.get('category');
  const searchTerm = searchParam.get('searchterm');

  const state = useSelector((state) => state.products);
  const { value: products, loading } = state ?? {};
  const dispatch = useDispatch();
  const theme = useTheme();

  if (!products?.length) {
    dispatch(fetchAllProducts());
  }

  function addProductToCart(product) {
    dispatch(addToCart({ product, quantity: 1 }));
  }

  let filteredProducts =
    category && category !== 'all'
      ? products.filter((prod) => prod.category === category)
      : products;

  filteredProducts = searchTerm
    ? filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {filteredProducts?.map(
          ({ title, image, rating, price, id, description }) => (
            <Grid item key={id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: theme.spacing(2, 0),
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    alignSelf: 'center',
                    width: theme.spacing(30),
                    height: theme.spacing(30),
                    objectFit: 'contain',
                    pt: theme.spacing(),
                  }}
                  image={image}
                  alt={title}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    paragraph
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {description}
                  </Typography>
                  <Typography fontSize="large" paragraph>
                    {price}
                  </Typography>
                  <Rating value={rating.rate} precision={0.5} readOnly />
                </CardContent>
                <CardActions sx={{ alignSelf: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      addProductToCart({
                        title,
                        image,
                        rating,
                        price,
                        id,
                        description,
                      })
                    }
                  >
                    <ShoppingCartSharp /> Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
}
