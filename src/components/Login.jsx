import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Card,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { FcGoogle } from "react-icons/fc";
import loginBG from "../assets/loginImg.jpg";
import { FaFacebookSquare } from "react-icons/fa";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { useFormik } from "formik";
import LoginSchema from "../schema/LoginSchema";
import BaseApi from "../BasaApi";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UserLogin, UserLogout } from "../slice/UserSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImageApi } from "../ImageApi";
import { toastMessage } from "../toastMessage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login() {
  const [open, setOpen] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [timer, setTimer] = useState(180);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState({ username: "", email: "" });
  const [Varify, setVarify] = useState({ username: "", email: "", otp: "" });
  const InnitialValues = { username: "", email: "" };
  const formik = useFormik({
    initialValues: InnitialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        console.log(Email);
        setVarify((pre) => ({
          username: values.username,
          email: values.email,
        }));
        await BaseApi.post("/user/send-otp", values, {
          withCredentials: true,
        });
        setShowOTP(true);
        setTimer(180);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to send OTP");
      }
    },
  });
  const { User, isUser } = useSelector((state) => state.UserState);
  const { username, picture } = User;
  // useEffect(() => {
  //   setVarify((prev) => ({
  //     ...prev,
  //     email: Email.email,
  //     username: Email.username,
  //   }));
  // }, [Email]);

  useEffect(() => {
    if (!showOTP || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [showOTP, timer]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  // const handleSubmit = async () => {
  //   try {
  //     console.log(Email);
  //     await axios.post("http://localhost:5000/api/auth/user/send-otp", Email, {
  //       withCredentials: true,
  //     });
  //     setShowOTP(true);
  //     setTimer(180);
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Failed to send OTP");
  //   }
  // };
  const handleLogout = () => {
    dispatch(UserLogout());
    setTimeout(() => {
      navigate("/");
    }, 1000);

    toastMessage("Logout successfully", "success");
  };
  const handleVerifyOTP = async () => {
    try {
      await axios.post(`${BaseApi}/user/verify-otp`, Varify, {
        withCredentials: true,
      });
      const token = Cookie.get("authToken");
      const decode = jwtDecode(token);
      dispatch(UserLogin(decode));
      alert("✅ Login Successful!");
      setOpen(false);
      setShowOTP(false);
      setVarify({ username: "", email: "", otp: "" });
      formik.resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };
  console.log(picture);

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };
  const loginWithFacebook = () => {
    window.location.href = "http://localhost:3000/auth/facebook";
  };
  const handleProfile = () => {
    if (isUser && username) {
      navigate("/account");
    }
  };
  return (
    <>
      <Tooltip title={username ? username : "Guest"} arrow>
        <Box
          component={"button"}
          onClick={handleProfile}
          sx={{ border: "none", bgcolor: "white" }}
        >
          <Avatar
            src={
              User.picture?.startsWith("https")
                ? User.picture
                : `${ImageApi}/profile/${User.picture}`
            }
            alt={username || "Guest"}
            sx={{
              bgcolor: username ? "primary.main" : "grey.500",
              width: 48,
              height: 48,
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              "&:hover": {
                boxShadow: 4,
                transform: "scale(1.05)",
                transition: "0.2s ease-in-out",
              },
            }}
            imgProps={{
              onError: (e) => {
                e.currentTarget.style.display = "none"; // hide broken img
              },
            }}
          >
            {isUser ? username?.[0]?.toUpperCase() : <PersonSharpIcon />}
          </Avatar>
        </Box>
        {/* {picture} */}
        {/* <img src={picture} alt={username} /> */}
      </Tooltip>

      {isUser ? (
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button
          variant="text"
          onClick={() => setOpen(!open)}
          sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}
        >
          Login / Sign-Up
        </Button>
      )}

      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        TransitionProps={{
          onExited: () => {
            setShowOTP(false);
            setVarify({ username: "", email: "", otp: "" });
            formik.resetForm();
          },
        }}
      >
        <style>
          {`
          .form-wrapper {
            position: relative;
            height: 160px;
          }
          .form-slide {
            position: absolute;
            width: 100%;
            transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
          }
          .form-slide.email {
            transform: translateX(0);
            opacity: 1;
          }
          .form-slide.email.exit {
            transform: translateX(-100%);
            opacity: 0;
          }
          .form-slide.otp {
            transform: translateX(100%);
            opacity: 0;
          }
          .form-slide.otp.enter {
            transform: translateX(0);
            opacity: 1;
          }
        `}
        </style>

        <Box
          sx={{
            backgroundImage: `url(${loginBG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            position: "relative",
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              bgcolor: "rgba(0,0,0,0.6)",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />

          <Grid
            container
            sx={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              alignItems: "center",
              p: 3,
            }}
          >
            <IconButton
              onClick={() => setOpen(!open)}
              size="large"
              aria-label="close"
              sx={{
                position: "absolute",
                top: 16,
                right: 10,
                color: "white",
                zIndex: 2,
              }}
            >
              <CloseIcon />
            </IconButton>
            {/* Left side content */}
            <Grid
              container
              size={{ xs: 12, md: 6 }}
              sx={{ color: "white", p: 2, justifyContent: "center" }}
            >
              <Typography variant="h4" gutterBottom>
                Discover Premium Furniture & Trusted Sellers
              </Typography>
              <Typography variant="body1" gutterBottom>
                Login to explore our exclusive collection and connect with
                verified furniture sellers. From elegant sofas to modern
                workspaces, we have everything to match your style and comfort.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography>
                  ✅ Browse curated collections from trusted sellers
                </Typography>
                <Typography>
                  ✅ View prices, offers, and availability
                </Typography>
                <Typography>
                  ✅ Your details remain private and secure
                </Typography>
              </Box>
            </Grid>

            {/* Right side login form */}
            <Grid
              container
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                elevation={12}
                sx={{ maxWidth: 400, borderRadius: 4, p: 3, width: 350, mb: 1 }}
              >
                <Typography textAlign="center" variant="h6" mb={2}>
                  Login
                </Typography>

                <div className="form-wrapper">
                  {/* Email step */}
                  <form onSubmit={formik.handleSubmit}>
                    <div
                      className={`form-slide email ${showOTP ? "exit" : ""}`}
                    >
                      <TextField
                        label="Username"
                        fullWidth
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={{ mb: "10px" }}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username
                            ? formik.errors.username
                            : "  "
                        }
                      />

                      <TextField
                        label="Email"
                        fullWidth
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={{ mb: "10px" }}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={
                          formik.touched.email
                            ? formik.errors.email
                            : "   "
                        }
                      />

                      <Button variant="contained" fullWidth type="submit">
                        Send OTP
                      </Button>
                    </div>
                  </form>

                  {/* OTP step */}
                  <div className={`form-slide otp ${showOTP ? "enter" : ""}`}>
                    <TextField
                      label="Enter OTP"
                      fullWidth
                      value={Varify.otp}
                      onChange={(e) =>
                        setVarify((prev) => ({ ...prev, otp: e.target.value }))
                      }
                      inputProps={{ maxLength: 6 }}
                      sx={{ mb: 1 }}
                    />
                    <Typography
                      variant="body2"
                      color="error"
                      textAlign="center"
                      mt={1}
                    >
                      Time left: {formatTime(timer)}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={handleVerifyOTP}
                    >
                      Verify OTP
                    </Button>
                  </div>
                </div>

                {/* Divider */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  mt={7}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box flex={1} height="1px" bgcolor="gray" />
                    <Typography variant="body2" color="textSecondary">
                      Or Continue with
                    </Typography>
                    <Box flex={1} height="1px" bgcolor="gray" />
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<FcGoogle />}
                    fullWidth
                    onClick={loginWithGoogle}
                  >
                    With Google
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FaFacebookSquare />}
                    fullWidth
                    onClick={loginWithFacebook}
                  >
                    With Facebook
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
