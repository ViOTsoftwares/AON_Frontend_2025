import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ImageApi } from "../ImageApi";

import {
  DecreaseCartQty,
  IncreaseCartQty,
  RemoveCart,
} from "../slice/CartSlice";


export default function Cart() {
  const navigate = useNavigate();
  const { cart, iscart } = useSelector((state) => state.CartState);
  const { isUser } = useSelector((state) => state.UserState);
  const [showNotif, setShowNotif] = useState(false);
  const dispatch = useDispatch();

  const total = cart?.reduce(
    (sum, item) => sum + item.SellingPrice * item.Qty,
    0
  );
  const totalMRP = cart?.reduce((sum, item) => sum + item.MRP * item.Qty, 0);
  const discount = cart?.reduce(
    (sum, item) => sum + (item.MRP - item.SellingPrice) * item.Qty,
    0
  );
  // State to trigger animation

  const handleCheckout = () => {
    if (!isUser) {
      // Show animated notification
      setShowNotif(true);

      // Hide notification after 2 seconds
      setTimeout(() => setShowNotif(false), 2000);
      return;
    }
    navigate("/checkout");
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        <ShoppingCartIcon sx={{ mr: 1, color: "primary.main" }} /> Your Cart
      </Typography>
      {!iscart && (
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty 🛒
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: 2 }}
            onClick={() => {
              navigate("/");
            }}
          >
            Continue Shopping
          </Button>
        </Card>
      )}
      {iscart && (
        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, sm: 8, xl: 8, md: 8, lg: 8 }}>
            {cart.map((item) => (
                 <Card
                            key={item?._id}
                            sx={{
                              display: "flex",
                              mb: 2,
                              borderRadius: 3,
                              boxShadow: 3,
        
                              // 🔑 FIX: remove hard centering
                              alignItems: "flex-start",
                              gap: 2,
                              p: 1.5,
                            }}
                          >
                            <CardMedia
                              component="img"
                              sx={{
                                width: 120,          // 🔑 smaller = more room
                                height: 120,
                                borderRadius: 2,
                                objectFit: "contain",
                                flexShrink: 0,       // 🔑 prevents squeezing
                              }}
                              image={`${ImageApi}/product/${item?.ImageArray?.[0] || ""}`}
                              alt={item?.Title}
                            />
        
                            <CardContent
                              sx={{
                                flex: 1,
                                display: "flex",     // 🔑 was missing
                                flexDirection: "column",
                                justifyContent: "space-between",
                                p: 0,
                                gap: 0.8,
                              }}
                            >
                              {/* TITLE */}
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{
                                  fontSize: "1rem",   // 🔑 controlled size
                                  lineHeight: 1.2,
                                }}
                              >
                                {item?.Title}
                              </Typography>
        
                              {/* PRICE ROW */}
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  alignItems: "center",
                                  flexWrap: "wrap",
                                }}
                              >
                                <Typography
                                  color="text.secondary"
                                  sx={{ textDecoration: "line-through", fontSize: "0.85rem" }}
                                >
                                  ₹{item.MRP}
                                </Typography>
        
                                <Typography fontWeight="bold" sx={{ fontSize: "1rem" }}>
                                  ₹{item.SellingPrice}
                                </Typography>
        
                                <Typography color="success.main" sx={{ fontSize: "0.8rem" }}>
                                  {item.Discount}% Off
                                </Typography>
                              </Box>
        
                              {/* QTY CONTROLS */}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  mt: 0.5,
                                }}
                              >
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{ minWidth: 32 }}
                                    onClick={() => dispatch(DecreaseCartQty(item._id))}
                                  >
                                    −
                                  </Button>
        
                                  <Typography fontWeight={600}>{item?.Qty}</Typography>
        
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{ minWidth: 32 }}
                                    onClick={() => dispatch(IncreaseCartQty(item._id))}
                                  >
                                    +
                                  </Button>
                                </Box>

                    {/* Delete */} <Button color="error" variant="text" size="small"
                      onClick={() => dispatch(RemoveCart(item._id))}
                      sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }} >
                      Remove </Button>
                              </Box>
                            </CardContent>
                          </Card>

            ))}
          </Grid>

          {/* Summary */}
          <Grid size={{ xs: 12, sm: 4, xl: 4, md: 4, lg: 4 }}>
            {!isUser && (
              <Box
                sx={{
                  backgroundColor: "rgba(255, 152, 0, 0.12)",
                  border: "1px solid rgba(255, 152, 0, 0.65)",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 500 }}
                >
                  ⚠️ Please log in to continue.
                </Typography>
              </Box>
            )}

            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 4,
                position: "sticky",
                top: "100px",
                m: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {cart.map((item) => (
                <Box
                  key={item.id}
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography>
                    {item?.Title} (x{item.Qty})
                  </Typography>
                  <Typography fontWeight="bold">
                    ₹{(item.MRP * item.Qty).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Discount</Typography>
                <Typography fontWeight="bold" color="success">
                  -{discount.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" fontWeight="bold">
                  ₹{total.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, borderRadius: 2, py: 1.5 }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
