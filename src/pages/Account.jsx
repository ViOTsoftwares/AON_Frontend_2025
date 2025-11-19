import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  TextField,
  Button,
  Stack,
  Grid,
  CardActions,
} from "@mui/material";
import {
  Person,
  ShoppingBag,
  Favorite,
  LocationOn,
  Edit,
  Delete,
  LocalShipping,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { ImageApi } from "../ImageApi";
import { toastMessage } from "../toastMessage";
import {
  GetAddressApi,
  getOneProfileApi,
  GetOneUserOrderApi,
  UpdateAddressApi,
  UpdateUserProfileApi,
} from "../Api_Action";
import { UserLogin } from "../slice/UserSlice";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AddressTable from "../components/AddressTable";

var Section = "profile";

const Index = () => {
  const { isUser, User } = useSelector((state) => state.UserState);
  const [isaddress, setIsAddress] = useState(false);
  // const [address, setAddress] = useState({
  //   fullName: "",
  //   email: User.email,
  //   address: "",
  //   phone: "",
  //   city: "",
  //   postalCode: "",
  // });
  const [activeSection, setActiveSection] = useState(Section);
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState({
    username: User?.username,
    email: User?.email,
    address: "",
    phone: "",
    city: "",
    postalCode: "",
  });
  const dispatch = useDispatch();
  const [isdisable, setIsDisable] = useState(false);
  const [photo, setPhoto] = useState(
    User?.picture?.startsWith("https")
      ? User.picture
      : `${ImageApi}/profile/${User.picture}`
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // create preview
      setAddress((prev) => ({ ...prev, photoUrl: file })); // store file object if needed
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("hiiii");

    setAddress((pre) => ({ ...pre, [name]: value }));
  };
  const menuItems = [
    { id: "profile", label: "Profile Information", icon: <Person /> },
    { id: "orders", label: "My Orders", icon: <ShoppingBag /> },

    { id: "addresses", label: "My Addresses", icon: <LocationOn /> },
  ];

  const [orders, setOrder] = useState([]);
  const GetOrderList = async () => {
    const data = await GetOneUserOrderApi(User.id);
    if (data.success) {
      setOrder(data.order);
    }
  };
  useEffect(() => {
    GetOrderList();
  }, []);
  const wishlistItems = [
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      price: "₹1,59,900",
      discount: "5% off",
      image: "📱",
    },
    {
      id: "2",
      name: "Dell XPS 15 Laptop",
      price: "₹1,45,990",
      discount: "10% off",
      image: "💻",
    },
    {
      id: "3",
      name: "Canon EOS R6 Camera",
      price: "₹2,15,995",
      discount: "8% off",
      image: "📷",
    },
  ];

  const addresses = [
    {
      id: "1",
      type: "Home",
      name: "Rahul Sharma",
      address: "123, MG Road, Sector 15",
      city: "Bangalore, Karnataka - 560001",
      phone: "+91 98765 43210",
      default: true,
    },
    {
      id: "2",
      type: "Work",
      name: "Rahul Sharma",
      address: "45, Tech Park, Whitefield",
      city: "Bangalore, Karnataka - 560066",
      phone: "+91 98765 43210",
      default: false,
    },
  ];
  const getUserInfo = async () => {
    const data = await getOneProfileApi(User.id);
    console.log("-->", data);
    if (data.success) {
      localStorage.getItem("authToken", data.token);
      const decode = jwtDecode(data.token);
      dispatch(UserLogin(decode));
    }
  };
  console.log("--->", address);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisable(true);
    console.log("hiiii");

    if (!address.username?.trim()) {
      toastMessage("Username is required", "error");
      setIsDisable(false);
      return;
    }
    const fd = new FormData();
    fd.append("username", address.username);
    if (address.photoUrl instanceof File) {
      fd.append("photoUrl", address.photoUrl);
    }
    console.log("hiiii");
    const data = await UpdateUserProfileApi(User.id, fd);
    if (data.success) {
      setIsDisable(false);
      toastMessage(data.message, "success");
      setIsEdit(false);
      getUserInfo();
    } else {
      setIsDisable(false);
      setIsEdit(false);
      toastMessage(data.message, "error");
    }
  };
  // new address submit
  const handleAddressSubmit = async (e) => {
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
  const handleisEdit = () => {
    setIsEdit(true);
    setIsAddress(false);
  };
  const getaddress = async () => {
    const data = await GetAddressApi();
    if (data.success) {
      setAddress(data.address);
      setIsAddress(true);
    } else {
      setIsAddress(false);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
    getaddress();
  }, []);
  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <Box>
            <Typography variant="h5" gutterBottom fontWeight="600">
              Personal Information
            </Typography>
            <Paper sx={{ p: 3, mt: 2 }}>
              <Stack spacing={3}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={
                      User.picture?.startsWith("https")
                        ? User.picture
                        : `${ImageApi}/profile/${User.picture}`
                    }
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: User.picture ? "transparent" : "primary.main",
                      fontSize: "1.5rem",
                    }}
                  >
                    {!User.picture &&
                      `${User.username?.[0] ?? ""}${
                        User.username?.split(" ")[1]?.[0] ?? ""
                      }`}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{User?.username}</Typography>
                    <Typography color="text.secondary">
                      {User?.email}
                    </Typography>
                  </Box>
                </Box>
                {!isEdit && (
                  <Button onClick={() => setIsEdit(true)}>Edit</Button>
                )}
                {isEdit && (
                  <form onSubmit={handleSubmit}>
                    <Box>
                      <Grid container spacing={1}>
                        <Grid container size={{ xs: 12, md: 6 }} pt={3}>
                          <TextField
                            label="User Name"
                            fullWidth
                            name="username"
                            value={address.username}
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
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Typography>Profile image</Typography>
                          <TextField
                            name="photoUrl"
                            type="file"
                            inputProps={{ accept: "image/*" }}
                            onChange={handleFileChange}
                            fullWidth
                          />

                          {photo && (
                            <Box mb={1}>
                              <img
                                src={photo}
                                alt="user profile"
                                style={{
                                  width: 100,
                                  height: 100,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                  padding: 6,
                                  borderRight: "50%",
                                }}
                              />
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          p: 4,
                        }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          type="submit"
                          disabled={isdisable}
                        >
                          {isdisable ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          size="large"
                          onClick={() => {
                            setIsEdit(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </form>
                )}
              </Stack>
            </Paper>
          </Box>
        );

      case "orders":
        return (
          <Box>
            <Typography variant="h5" gutterBottom fontWeight="600">
              My Orders
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <Card key={order._id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box display="flex" flexDirection="column" gap={2}>
                        {/* Top Section — Order Summary */}
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          flexWrap="wrap"
                        >
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Order ID: {order.orderId}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Date:{" "}
                              {new Date(order.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>

                          <Chip
                            label={order.status}
                            color={
                              order.status === "Delivered"
                                ? "success"
                                : order.status === "Pending"
                                ? "warning"
                                : "primary"
                            }
                            icon={<LocalShipping />}
                          />
                        </Box>

                        <Divider />

                        {/* Order Items */}
                        {order.orderItems?.map((item, index) => (
                          <Box
                            key={index}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            gap={2}
                          >
                            <Box display="flex" alignItems="center" gap={2}>
                              <Avatar
                                src={`${ImageApi}/product/${item.product.ImageArray?.[0]}`}
                                variant="rounded"
                                sx={{ width: 60, height: 60 }}
                              />
                              <Box>
                                <Typography variant="subtitle1">
                                  {item?.product?.Title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Qty: {item?.quantity}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="h6" color="primary">
                              ₹{item.price.toLocaleString()}
                            </Typography>
                          </Box>
                        ))}

                        <Divider />

                        {/* Bottom Summary */}
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          flexWrap="wrap"
                          mt={2}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Shipping: ₹{order.shippingPrice}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Discount: ₹{order.discount}
                          </Typography>
                          <Typography variant="h6" fontWeight={600}>
                            Total: ₹{order.totalPrice.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography color="text.secondary">No orders found.</Typography>
              )}
            </Stack>
          </Box>
        );

      case "addresses":
        return (
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              flexWrap="wrap"
              gap={2}
            >
              <Typography variant="h5" fontWeight="600">
                My Addresses
              </Typography>
              {/* <Button variant="contained" startIcon={<LocationOn />}>
                Add New Address
              </Button> */}
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              {!isaddress && (
                <Card
                  component="form"
                  sx={{ borderRadius: 3, boxShadow: 3 }}
                  onSubmit={handleAddressSubmit}
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
              )}
              {address && isaddress && !isEdit && (
                <AddressTable address={address} handleisEdit={handleisEdit} />
              )}
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "300px 1fr" },
            gap: 3,
          }}
        >
          {/* Sidebar */}
          <Paper sx={{ p: 2, height: "fit-content" }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Avatar
                src={
                  User.picture?.startsWith("https")
                    ? User.picture
                    : `${ImageApi}/profile/${User.picture}`
                }
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: User.picture ? "transparent" : "primary.main",
                  fontSize: "1.5rem",
                }}
              >
                {!User.picture &&
                  `${User.username?.[0] ?? ""}${
                    User.username?.split(" ")[1]?.[0] ?? ""
                  }`}
              </Avatar>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Hello,
                </Typography>
                <Typography variant="h6" fontWeight="600">
                  {User?.username}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    selected={activeSection === item.id}
                    onClick={() => setActiveSection(item.id)}
                    sx={{
                      borderRadius: 1,
                      "&.Mui-selected": {
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                        "& .MuiListItemIcon-root": {
                          color: "primary.contrastText",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          activeSection === item.id
                            ? "inherit"
                            : "text.secondary",
                        minWidth: 40,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Main Content */}
          <Paper sx={{ p: 3, position: "sticky", top: "100px" }}>
            {renderContent()}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Index;
