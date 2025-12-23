import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { UserLogin, UserLogout } from "../slice/UserSlice";
import { useNavigate, Link } from "react-router-dom";
import { ImageApi } from "../ImageApi";
import { toastMessage } from "../toastMessage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login() {
  const [open, setOpen] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [timer, setTimer] = useState(300);
  const [isResend, setIsResend] = useState(false);
  const [resentBtn, setResentBtn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Varify, setVarify] = useState({
    username: "",
    email: "",
    otp: "",
  });

  const formik = useFormik({
    initialValues: { username: "", email: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        setVarify({ ...values, otp: "" });
        await BaseApi.post("/user/send-otp", values, {
          withCredentials: true,
        });
        setShowOTP(true);
        setTimer(300);
        setIsResend(false);
      } catch (err) {
        toastMessage(
          err.response?.data?.message || "Failed to send OTP",
          "error"
        );
      }
    },
  });

  const { User, isUser } = useSelector((state) => state.UserState);
  const { username } = User || {};

  useEffect(() => {
    if (!showOTP || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    if (timer === 0) setIsResend(true);
    return () => clearInterval(interval);
  }, [showOTP, timer]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleVerifyOTP = async () => {
    try {
      const { data } = await BaseApi.post("/user/verify-otp", Varify);
      const decode = jwtDecode(data.token);
      dispatch(UserLogin(decode));
      localStorage.setItem("authToken", data.token);
      toastMessage("Login Successful", "success");
      setOpen(false);
      setShowOTP(false);
      setVarify({ username: "", email: "", otp: "" });
      formik.resetForm();
    } catch {
      toastMessage("Invalid OTP", "error");
    }
  };

  const handleResend = async () => {
    try {
      setResentBtn(true);
      await BaseApi.post("/user/send-otp", Varify);
      setTimer(300);
      toastMessage("OTP resent successfully", "success");
    } catch {
      toastMessage("Failed to resend OTP", "error");
    }
  };

  return (
    <>
      {/* LOGIN ICON */}
      <Tooltip title="Login / Sign-Up">
        <Avatar
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: "grey.400",
            width: 45,
            height: 45,
            cursor: "pointer",
          }}
        >
          <PersonSharpIcon />
        </Avatar>
      </Tooltip>

      {/* LOGIN DIALOG */}
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
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
            transition: transform 0.5s ease, opacity 0.5s ease;
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
            height: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.6)",
            }}
          />

          <Grid
            container
            sx={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              alignItems: "center",
              p: { xs: 1, md: 3 }, // mobile spacing fix
            }}
          >
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* LEFT CONTENT (SIMPLIFIED FOR MOBILE) */}
            <Grid
              container
              size={{ xs: 12, md: 6 }}
              sx={{
                color: "white",
                p: { xs: 1, md: 2 },
                justifyContent: "center",
                textAlign: { xs: "center", md: "left" },
                mb: { xs: -3, md: 0 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.3rem", md: "2.1rem" },
                  fontWeight: 600,
                  mb: { xs: 1, md: 2 },
                }}
              >
                Welcome to AON&apos;s Premium Space
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  lineHeight: 1.4,
                  mb: { xs: 1.5, md: 2 },
                }}
              >
                Login to explore sleek, stylish, and customizable furniture from
                AON—crafted for comfort, quality, and modern workspaces. Enjoy
                premium collections with real-time pricing, offers, and a secure,
                seamless experience.
              </Typography>

              <Box sx={{ display: { xs: "none", md: "block" }, mt: 2 }}>
                <Typography variant="body2">
                  Premiumly crafted & customizable collections
                </Typography>
                <Typography variant="body2">
                  Prices, offers & real-time availability
                </Typography>
                <Typography variant="body2">
                  Private, secure, and seamless AON experience
                </Typography>
              </Box>
            </Grid>

            {/* RIGHT LOGIN CARD */}
            <Grid
              container
              size={{ xs: 12, md: 6 }}
              sx={{ justifyContent: "center", mt: { xs: 0, md: 0 } }}
            >
              <Card
                elevation={12}
                sx={{
                  maxWidth: 400,
                  width: 350,
                  borderRadius: 4,
                  p: { xs: 2, md: 3 },
                }}
              >
                <Typography textAlign="center" variant="h6" mb={2}>
                  Login
                </Typography>

                <div className="form-wrapper">
                  <form onSubmit={formik.handleSubmit}>
                    <div
                      className={`form-slide email ${showOTP ? "exit" : ""
                        }`}
                    >
                      <TextField
                        label="Username"
                        fullWidth
                        {...formik.getFieldProps("username")}
                        sx={{ mb: 1 }}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username
                            ? formik.errors.username
                            : " "
                        }
                      />

                      <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        {...formik.getFieldProps("email")}
                        sx={{ mb: 1 }}
                        error={
                          formik.touched.email &&
                          Boolean(formik.errors.email)
                        }
                        helperText={
                          formik.touched.email ? formik.errors.email : " "
                        }
                      />

                      <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        sx={{ mb: 2 }}   // ✅ clean bottom gap
                      >
                        Send OTP
                      </Button>
                    </div>
                  </form>

                  <div className={`form-slide otp ${showOTP ? "enter" : ""}`}>
                    <TextField
                      label="Enter OTP"
                      fullWidth
                      sx={{ mb: 1 }}
                      onChange={(e) =>
                        setVarify((p) => ({ ...p, otp: e.target.value }))
                      }
                    />

                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography color="error">
                        {formatTime(timer)}
                      </Typography>
                      {isResend && (
                        <Button
                          disabled={resentBtn}
                          onClick={handleResend}
                        >
                          Resend
                        </Button>
                      )}
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

                {/* SOCIAL LOGIN */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    mt: { xs: 3.9, md: 7 },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box flex={1} height="1px" bgcolor="gray" />
                    <Typography variant="body2">
                      Or Continue with
                    </Typography>
                    <Box flex={1} height="1px" bgcolor="gray" />
                  </Box>

                  <Button
                    variant="outlined"
                    startIcon={<FcGoogle />}
                    fullWidth
                  >
                    With Google
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<FaFacebookSquare />}
                    fullWidth
                  >
                    With Facebook
                  </Button>
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1.5,
                      textAlign: "center",
                      color: "text.secondary",
                      fontSize: { xs: "0.7rem", md: "0.75rem" },
                      lineHeight: 1.4,
                    }}
                  >
                    By continuing, you agree to AON&apos;s{" "}
                    <Link
                      to="/terms-condition"
                      onClick={(e) => {
                        e.preventDefault();          // ⛔ stop default Link
                        setOpen(false);              // ✅ close dialog
                        setTimeout(() => {
                          navigate("/terms-condition");
                        }, 150);
                      }}
                      style={{
                        color: "#1976d2",
                        textDecoration: "underline",
                        fontWeight: 500,
                      }}
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy-policy"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        setTimeout(() => {
                          navigate("/privacy-policy");
                        }, 150);
                      }}
                      style={{
                        color: "#1976d2",
                        textDecoration: "underline",
                        fontWeight: 500,
                      }}
                    >
                      Privacy Policy
                    </Link>
                    .
                  </Typography>


                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
