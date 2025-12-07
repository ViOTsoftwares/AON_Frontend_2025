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
  Menu,
  MenuItem,
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
  const [timer, setTimer] = useState(300);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState({ username: "", email: "" });
  const [Varify, setVarify] = useState({ username: "", email: "", otp: "" });
  const InnitialValues = { username: "", email: "" };
  const [isResend, setIsResend] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [resentBtn, setResentBtn] = useState(false);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const formik = useFormik({
    initialValues: InnitialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        setVarify((pre) => ({
          ...pre,
          username: values.username,
          email: values.email,
        }));
        await BaseApi.post("/user/send-otp", values, {
          withCredentials: true,
        });
        setShowOTP(true);
        setIsResend(false);
        setTimer(300);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to send OTP");
      }
    },
  });

  const { User, isUser } = useSelector((state) => state.UserState);
  const { username, picture } = User || {};

  useEffect(() => {
    if (timer === 0) {
      setIsResend(true);
    }
    if (!showOTP || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [showOTP, timer]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleLogout = () => {
    dispatch(UserLogout());
    navigate("/");
    toastMessage("Logout successfully", "success");
  };

  const handleVerifyOTP = async () => {
    try {
      const { data } = await BaseApi.post(`/user/verify-otp`, Varify);

      if (data.success) {
        const decode = jwtDecode(data.token);
        dispatch(UserLogin(decode));
        toastMessage("Login Successful", "success");
        setOpen(false);
        setShowOTP(false);
        setVarify({ username: "", email: "", otp: "" });
        formik.resetForm();
      }
    } catch (err) {
      toastMessage(err.response?.data?.message || "Invalid OTP", "error");
    }
  };

  const handleResend = async () => {
    try {
      setResentBtn(true);
      await BaseApi.post("/user/send-otp", Varify);
      setTimer(300);
      toastMessage("OTP resent successfully", "success");
    } catch (err) {
      toastMessage("Failed to resend OTP", "error");
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_OAUTH}/auth/google`;
  };

  const loginWithFacebook = () => {
    window.location.href = `${import.meta.env.VITE_API_OAUTH}/auth/facebook`;
  };

  const handleProfile = () => {
    if (isUser && username) {
      navigate("/account");
    }
    handleMenuClose();
  };

  return (
    <>
      {/* Avatar (when logged in) OR Login / Sign-Up button (when not logged in) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {isUser ? (
          // Logged in: show avatar which opens the menu
          <Tooltip title={username ? username : "User"} arrow>
            <Avatar
              onClick={handleMenuOpen}
              src={
                User?.picture?.startsWith?.("https")
                  ? User.picture
                  : `${ImageApi}/profile/${User?.picture}`
              }
              alt={username || "User"}
              sx={{
                bgcolor: "primary.main",
                width: 45,
                height: 45,
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 4,
                  transform: "scale(1.03)",
                  transition: "0.15s ease-in-out",
                },
              }}
              imgProps={{
                onError: (e) => {
                  e.currentTarget.style.display = "none";
                },
              }}
            >
              {username?.[0]?.toUpperCase() || <PersonSharpIcon />}
            </Avatar>
          </Tooltip>
        ) : (
          // Not logged in: show only a Login / Sign-Up button (no avatar)
          <Button
            variant="text"
            onClick={() => setOpen(true)}
            sx={{
              fontSize: "0.875rem",
              padding: "6px 10px",
              borderRadius: "8px",
              color: "rgba(82, 55, 40, 1)",
              fontWeight: 600,
            }}
          >
            Login / Sign-Up
          </Button>
        )}

        {/* Menu only for logged-in users (avatar menu) */}
        {isUser && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <MenuItem
              onClick={() => {
                handleLogout();
                handleMenuClose();
              }}
            >
              Logout
            </MenuItem>

            <MenuItem
              onClick={() => {
                navigate("/account");
                handleMenuClose();
              }}
            >
              My account
            </MenuItem>
          </Menu>
        )}
      </Box>

      {/* The login dialog (unchanged) */}
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
              onClick={() => setOpen(false)}
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
                Welcome to AON's Premium Space
              </Typography>
              <Typography variant="body1" gutterBottom>
                Login to explore sleek, stylish, and customizable pieces from
                AON—crafted for comfort, quality, and modern workspaces. From
                elegant sofas to modern workspaces, we have everything to match
                your taste, style and comfort.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography>
                  Premiumly crafted & customizable collections
                </Typography>
                <Typography>Prices, offers & real-time availability</Typography>
                <Typography>
                  Private, secure, and seamless AON experience
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
                          formik.touched.email ? formik.errors.email : "   "
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
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="body2"
                        color="error"
                        textAlign="center"
                        mt={1}
                      >
                        Time left: {formatTime(timer)}
                      </Typography>
                      {isResend ? (
                        <Button
                          disabled={timer !== 0 || resentBtn}
                          onClick={handleResend}
                        >
                          resend
                        </Button>
                      ) : null}
                    </Box>
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
