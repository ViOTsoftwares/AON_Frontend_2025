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
import { FRONTEND_URL, ImageApi } from "../ImageApi";
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
  const { cmsDate } = useSelector((state) => state.CmsState);
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
    if ((!cart || cart.length === 0) && (!state?.id || state?.id === "")) {
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
    if (!isaddress) return toastMessage("Please fill address", "error");

    try {
      let message = "🛒 *New Order Request*\n\n";
      let FrontendUrl = "";
      let title = "";

      if (isCartproduct) {
        const order = {
          orderProduct: cart,
          address,
          totalAmount,
          discount,
        };

        const data = await CreateOrderApi(order);
        if (data.success) {
          toastMessage(data.message, "success");
          setOneProduct({});
          let total = 0;

          cart.forEach((item, index) => {
            message += `${index + 1}. *${item.Title}*\nQty: ${
              item.Qty
            }\nPrice: ₹${item.SellingPrice}\n${FRONTEND_URL}/detail/${
              item._id
            }\n\n`;
            title += item.Title;
            // FrontendUrl += `${FRONTEND_URL}/detail/${item._id}`;
            total += item.SellingPrice * item.Qty;
          });

          message += `*Total: ₹${total}*\n\nThank you!`;
          dispatch(ClearCartProduct());
        }
      } else {
        const order = {
          orderProduct: [oneProduct],
          address,
          totalAmount,
          discount,
        };

        const data = await CreateOrderApi(order);
        if (data.success) {
          toastMessage(data.message, "success");

          message += `1. *${oneProduct.Title}*\nQty: ${oneProduct.Qty}\nPrice: ₹${oneProduct.SellingPrice}\n\n`;
          const total = oneProduct.SellingPrice * oneProduct.Qty;
          message += `*Total: ₹${total}*\n\nThank you!`;

          title = oneProduct.Title;
          FrontendUrl = `${FRONTEND_URL}/detail/${oneProduct._id}`;
        }
      }

      // Share final message + image
      shareToWhatsApp(title, FrontendUrl, message);
    } catch (error) {
      toastMessage("Something went wrong", "error");
    }
  };

  const shareToWhatsApp = (title, FrontendUrl, message) => {
    const phoneNumber = cmsDate?.whatsAppNumber; // your WhatsApp number
    // Combine the message with product title and URL
    // const fullMessage = `${message}\nProduct: ${title}\n${FrontendUrl}`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab/window
    window.open(whatsappURL, "_blank");
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
                      disabled={true}
                      // focused={false}
                      value={address.email}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Phone Number"
                      name="phone"
                      value={address.phone}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Allow only digits
                        if (/^\d*$/.test(value)) {
                          handleChange(e);
                          // OR set your state directly here
                          // setAddress({ ...address, phone: value });
                        }
                      }}
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        maxLength: 10, // optional: limit phone digits
                      }}
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
                    alignItems: "flex-start",
                    gap: 2,
                    p: 1.5,
                  }}
                >
                  {/* IMAGE */}
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: 90, sm: 120 },
                      height: { xs: 90, sm: 120 },
                      borderRadius: 2,
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                    image={`${ImageApi}/product/${item?.ImageArray?.[0] || ""}`}
                    alt={item?.Title}
                  />

                  {/* CONTENT */}
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 0,
                      gap: 0.8,
                    }}
                  >
                    {/* TITLE */}
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item?.Title}
                    </Typography>

                    {/* PRICE */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                          fontSize: "0.85rem",
                        }}
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
                    alignItems: "flex-start",
                    gap: 2,
                    p: 1.5,
                  }}
                >
                  {/* IMAGE */}
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: 90, sm: 120 },
                      height: { xs: 90, sm: 120 },
                      borderRadius: 2,
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                    image={`${ImageApi}/product/${oneProduct?.ImageArray?.[0] || ""}`}
                    alt={oneProduct?.Title}
                  />

                  {/* CONTENT */}
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 0,
                      gap: 0.8,
                    }}
                  >
                    {/* TITLE */}
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {oneProduct?.Title}
                    </Typography>

                    {/* PRICE */}
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
                        ₹{oneProduct?.MRP}
                      </Typography>

                      <Typography fontWeight="bold" sx={{ fontSize: "1rem" }}>
                        ₹{oneProduct?.SellingPrice}
                      </Typography>

                      <Typography color="success.main" sx={{ fontSize: "0.8rem" }}>
                        {oneProduct?.Discount}% Off
                      </Typography>
                    </Box>

                    {/* QTY CONTROLS */}
                    <Box sx={{ display: "flex", mt: 0.5 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ minWidth: 32 }}
                          onClick={() =>
                            setOneProduct((pre) => ({
                              ...pre,
                              Qty: pre?.Qty > 1 ? pre?.Qty - 1 : pre?.Qty,
                            }))
                          }
                        >
                          −
                        </Button>

                        <Typography fontWeight={600}>{oneProduct?.Qty}</Typography>

                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ minWidth: 32 }}
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
