import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  CardActions,
  CardMedia,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  AddAddressApi,
  CreateOrderApi,
  GetAddressApi,
  GetSingleProductApi,
  UpdateAddressApi,
} from "../Api_Action";
import { toastMessage } from "../toastMessage";
import AddressTable from "../components/AddressTable";
import { ImageApi } from "../ImageApi";
import { useLocation, useNavigate } from "react-router-dom";
import PageLoading from "../components/PageLoading";
import {
  ClearCartProduct,
  DecreaseCartQty,
  IncreaseCartQty,
  RemoveCart,
} from "../slice/CartSlice";

const Checkout = () => {
  const { cart } = useSelector((state) => state.CartState);
  const { User } = useSelector((state) => state.UserState);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boolenValue = state?.id ? false : true;
  const [isCartproduct, setIsCartProduct] = useState(boolenValue);
  const [oneProduct, setOneProduct] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const totalAmount = isCartproduct
    ? cart?.reduce((sum, item) => sum + item.SellingPrice * item.Qty, 0)
    : oneProduct.SellingPrice * oneProduct.Qty;
  //
  const discount = isCartproduct
    ? cart?.reduce(
        (sum, item) => sum + (item.MRP - item.SellingPrice) * item.Qty,
        0
      )
    : (oneProduct.MRP - oneProduct.SellingPrice) * oneProduct.Qty;
  const [address, setAddress] = useState({
    fullName: "",
    email: User.email,
    address: "",
    phone: "",
    city: "",
    postalCode: "",
  });
  const [isaddress, setIsAddress] = useState(false);
  const getOneProduct = async () => {
    const data = await GetSingleProductApi(state?.id);
    setOneProduct({ ...data, Qty: 1 });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
    getOneProduct();
  }, []);
  useEffect(() => {
    // Check if cart is empty and oneProduct is missing or empty
    if (
      (!cart || cart.length === 0) &&
      (!state?.id || state?.id === "")
    ) {
      navigate("/");
    }
  }, [cart, oneProduct, navigate]);

  const getaddress = async () => {
    console.log("efbefwiefbefnn---->");
    const data = await GetAddressApi();
    if (data.success && data.address) {
      setAddress(data.address);
      setIsLoading(false);
      setIsAddress(true);
    } else {
      setIsLoading(false);
      setIsAddress(false);
    }
  };
  useEffect(() => {
    getaddress();
  }, []);
  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);

    setAddress((pre) => ({ ...pre, [name]: value }));
  };
  const handleisEdit = () => {
    setIsEdit(true);
    setIsAddress(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const data = await UpdateAddressApi(address._id, address);
      console.log("address", address);
      if (data.success) {
        getaddress();
        setIsAddress(true);
        setIsEdit(false);
        toastMessage(data.message, "success");
      } else {
        setIsAddress(false);
        toastMessage(data.message, "error");
      }
    } else {
      const data = await AddAddressApi(address);
      console.log("address", address);
      if (data.success) {
        getaddress();
        setIsAddress(true);
        toastMessage(data.message, "success");
      } else {
        setIsAddress(false);
        toastMessage(data.message, "error");
      }
    }
  };
  const onPlaceOrder = async () => {
    // if (!cart || cart.length === 0) return;
    if (!isaddress) return toastMessage("Please fill address", "error");
    // Construct message text with image URLs

    let message = "Hello, I want to place an order:\n\n";
    if (isCartproduct || oneProduct) {
      const order = {
        orderProduct: cart,
        address: address,
        totalAmount,
        discount,
      };
      const data = await CreateOrderApi(order);
      if (data.success) {
        toastMessage(data.message, "success");
        dispatch(ClearCartProduct());
        setOneProduct({});
        cart.forEach((item, index) => {
          message += `${index + 1}. ${item.Title} (Qty: ${item.Qty}) - ₹${
            item.SellingPrice
          }\n`;
          message += `Image:https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_2560%2Cc_limit/DSC_5903.jpg\n\n`;
        });

        const total = cart.reduce(
          (sum, item) => sum + item.SellingPrice * item.Qty,
          0
        );
        message += `Total: ₹${total}\nThank you!`;
      } else {
        const order = {
          orderProduct: [oneProduct],
          address: address,
          totalAmount,
          discount,
        };
        const data = await CreateOrderApi(order);
        message += `1. ${oneProduct?.Title} (Qty: ${oneProduct?.Qty}) - ₹${oneProduct?.SellingPrice}\n`;
        message += `Image:https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_2560%2Cc_limit/DSC_5903.jpg\n\n`;
        const total = oneProduct?.SellingPrice * oneProduct?.Qty;

        message += `Total: ₹${total}\nThank you!`;
      }

      // Encode message
      const encodedMessage = encodeURIComponent(message);

      // WhatsApp URL (replace with your number, e.g., 911234567890)
      const phoneNumber = "919566908720";
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      // Open WhatsApp
      setTimeout(() => {
        window.open(whatsappURL, "_blank");
      }, 1000);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={2}>
        {/* Shipping Details */}
        <Grid size={{ xs: 12, sm: 8, xl: 8, md: 8, lg: 8 }}>
          {isLoading ? (
            <PageLoading load={isLoading} />
          ) : (
            !isaddress && (
              <Card
                component="form"
                sx={{ borderRadius: 3, boxShadow: 3 }}
                onSubmit={handleSubmit}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Shipping Information
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    <TextField
                      label="Full Name"
                      fullWidth
                      name="fullName"
                      value={address.fullName}
                      onChange={handleChange}
                      required
                    />
                    <TextField
                      label="Email Address"
                      type="email"
                      name="email"
                      // onChange={handleChange}
                      value={address.email}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Phone Number"
                      name="phone"
                      type="number"
                      value={address.phone}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Address"
                      multiline
                      name="address"
                      value={address.address}
                      onChange={handleChange}
                      rows={3}
                      fullWidth
                      required
                    />
                    <TextField
                      label="City"
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Postal Code"
                      name="postalCode"
                      type="number"
                      value={address.postalCode}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: "15px 25px",
                  }}
                >
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => {
                      setIsAddress(true);
                      setIsEdit(false);
                    }}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            )
          )}
          {isLoading ? (
            <PageLoading load={isLoading} />
          ) : (
            address &&
            isaddress &&
            !isEdit && (
              <AddressTable address={address} handleisEdit={handleisEdit} />
            )
          )}
          <Box sx={{ pt: 1 }}>
            {isCartproduct
              ? cart &&
                cart.map((item) => (
                  <Card
                    key={item?._id}
                    sx={{
                      display: "flex",
                      mb: 2,
                      borderRadius: 3,
                      boxShadow: 3,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 150,
                        borderRadius: "12px 0 0 12px",
                        height: 150,
                        objectFit: "contain",
                      }}
                      image={`${ImageApi}/product/${
                        item?.ImageArray?.[0] || ""
                      }`}
                      alt={item?.Title}
                    />
                    <CardContent
                      sx={{
                        flex: 1,
                        flexDirection: "row",
                        justifyItems: "baseline",
                        justifySelf: "baseline",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {item?.Title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: "row",
                          alignItems: "baseline",
                        }}
                      >
                        <Typography
                          color="text.secondary"
                          sx={{ textDecoration: "line-through" }}
                        >
                          ₹{item.MRP}
                        </Typography>
                        <Typography color="" variant="h6" fontWeight="bold">
                          ₹{item.SellingPrice}
                        </Typography>
                        <Typography color="success">
                          {item.Discount} % Off
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-around"
                        width="100%"
                        mt={2}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => dispatch(DecreaseCartQty(item._id))}
                          >
                            −
                          </Button>
                          <Typography>{item?.Qty}</Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => dispatch(IncreaseCartQty(item._id))}
                          >
                            +
                          </Button>
                        </Box>

                        {/* <Button
                      color="error"
                      variant="text"
                      onClick={() => dispatch(RemoveCart(item._id))}
                    >
                      Delete
                    </Button> */}
                      </Box>
                    </CardContent>
                  </Card>
                ))
              : oneProduct && (
                  <Card
                    sx={{
                      display: "flex",
                      mb: 2,
                      borderRadius: 3,
                      boxShadow: 3,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 150,
                        borderRadius: "12px 0 0 12px",
                        height: 150,
                        objectFit: "contain",
                      }}
                      image={`${ImageApi}/product/${
                        oneProduct?.ImageArray?.[0] || ""
                      }`}
                      alt={oneProduct?.Title}
                    />
                    <CardContent
                      sx={{
                        flex: 1,
                        flexDirection: "row",
                        justifyItems: "baseline",
                        justifySelf: "baseline",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {oneProduct?.Title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: "row",
                          alignItems: "baseline",
                        }}
                      >
                        <Typography
                          color="text.secondary"
                          sx={{ textDecoration: "line-through" }}
                        >
                          ₹{oneProduct?.MRP}
                        </Typography>
                        <Typography color="" variant="h6" fontWeight="bold">
                          ₹{oneProduct?.SellingPrice}
                        </Typography>
                        <Typography color="success">
                          {oneProduct?.Discount} % Off
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        // justifyContent="space-around"
                        width="100%"
                        mt={2}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              setOneProduct((pre) => ({
                                ...pre,
                                Qty: pre?.Qty > 1 ? pre?.Qty - 1 : pre?.Qty,
                              }))
                            }
                          >
                            −
                          </Button>
                          <Typography>{oneProduct?.Qty}</Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              setOneProduct((pre) => ({
                                ...pre,
                                Qty:
                                  pre?.Qty >= 1 && pre?.Qty < 10
                                    ? pre?.Qty + 1
                                    : pre?.Qty,
                              }))
                            }
                          >
                            +
                          </Button>
                        </Box>

                        {/* <Button
                      color="error"
                      variant="text"
                      onClick={() => ""}
                    >
                      Delete
                    </Button> */}
                      </Box>
                    </CardContent>
                  </Card>
                )}
          </Box>
        </Grid>
        {/* Order Summary */}
        <Grid size={{ xs: 12, sm: 4, xl: 4, md: 4, lg: 4 }}>
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
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>

              {cart && isCartproduct ? (
                cart.map((item) => (
                  <Box
                    key={item._id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1.5}
                  >
                    <Typography>
                      {item.Title} × {item.Qty}
                    </Typography>
                    <Typography>
                      ₹{(item.SellingPrice * item.Qty).toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                >
                  <Typography>
                    {oneProduct?.Title} × {oneProduct?.Qty}
                  </Typography>
                  <Typography>
                    ₹
                    {(
                      oneProduct?.SellingPrice * oneProduct?.Qty
                    ).toLocaleString("en-IN")}
                  </Typography>
                </Box>
              )}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1.5}
              >
                <Typography>Discount</Typography>
                <Typography color="success">-{discount}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
                onClick={onPlaceOrder}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
