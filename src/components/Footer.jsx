import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import EmailIcon from "@mui/icons-material/Email";
import { IoMdMail } from "react-icons/io";
import InputAdornment from "@mui/material/InputAdornment";
import logo from "../assets/logo.png";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ImageApi } from "../ImageApi";
import { CreateSubscribeEmailApi } from "../Api_Action";
import { toastMessage } from "../toastMessage";
function Footer() {
  const { cmsDate } = useSelector((state) => state.CmsState);
  const { isUser } = useSelector((state) => state.UserState);
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    if (email.trim() === "") {
      return alert("Email is required");
    }

    // Proper email format regex
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailFormat.test(email)) {
      return alert("Invalid email format");
    }
    console.log(email);
    try {
      const data = await CreateSubscribeEmailApi(email);
      if (data.success) {
        toastMessage(data.message, "success");
        setEmail("");
      } else {
        setEmail("");
        toastMessage(data.message, "error");
      }
    } catch (error) {
      toastMessage("Something went wrong", "error");
      console.error(error);
    }
  };

  const Pages = [
    { pageName: "Products", pageUrl: "products" },
    // { pageName: "Contacts", pageUrl: "contact-us" },
    { pageName: "Clients", pageUrl: "/" },
    { pageName: "About US", pageUrl: "about-us" },
    { pageName: "Blogs", pageUrl: "blogs" },
    { pageName: "Catalog", pageUrl: "catalog" },
  ];

  const Policy = [
    { pageName: "Privacy Policy", pageUrl: "/privacy-policy" },
    { pageName: "Shipping Policy", pageUrl: "/shipping-policy" },
    { pageName: "Refund Policy", pageUrl: "/refund-policy" },
    { pageName: "Terms and Condition", pageUrl: "/terms-condition" },
    // { pageName: "My Account", pageUrl: "blogs" },
  ];

  const ICONS = [
    {
      component: FacebookIcon,
      color: "info",
      label: "Facebook",
      link: cmsDate?.facebookURL,
    },
    {
      component: InstagramIcon,
      color: "error",
      label: "Instagram",
      link: cmsDate?.instraURL,
    },
    {
      component: YouTubeIcon,
      color: "error",
      label: "YouTube",
      link: cmsDate?.youtupeURL,
    },
    {
      component: TwitterIcon,
      color: "info",
      label: "Twitter",
      link: cmsDate?.xURL,
    },
    {
      component: LinkedInIcon,
      color: "info",
      label: "LinkedIn",
      link: cmsDate?.linkedin,
    },
  ];
  const address = [
    {
      component: FaLocationDot,
      label: cmsDate?.address || "",
    },
    { component: FaPhoneAlt, label: cmsDate?.phone || "" },
    { component: MdEmail, label: cmsDate?.email || "" },
  ];
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  console.log(year, "year");

  return (
    <footer
      style={{
        height: "auto",
        backgroundColor: "rgb(245, 245, 245)",
        width: "100%",
      }}
    >
      <Grid container p={2}>
        <Grid
          container
          size={{ xs: 12, sm: 6, md: 6, xl: 3, lg: 3 }}
          direction="column"
        >
          <img
            src={`${ImageApi}/banner/` + cmsDate?.logo}
            alt="logo"
            width={120}
          />

          <Typography p={1} textAlign="center">
            Specialized Store for Modern furniture with Customization, Table,
            Chaire{" "}
          </Typography>
          {address.map(({ component: Icon, label }, i) => (
            <Box
              key={i}
              display="flex"
              alignItems="center"
              gap={1}
              maxWidth="100%"
              p={1}
            >
              <IconButton>
                <Icon /> {/* ✅ Use the component variable directly */}
              </IconButton>
              <Typography variant="body2">{label}</Typography>
            </Box>
          ))}
        </Grid>
        <Grid
          container
          size={{ xs: 12, sm: 6, md: 6, xl: 2, lg: 2 }}
          direction="column"
          sx={{ gap: 3, p: 1 }}
        >
          <Typography variant="h6" textAlign="center">
            Pages
          </Typography>
          {Pages.map((p, i) => {
            return (
              <Link
                key={i}
                to={p.pageUrl}
                style={{
                  textDecoration: "none",
                  color: "black",
                  textAlign: "center",
                  fontWeight: 500,
                  fontSize: "1.1rem",
                }}
              >
                {p.pageName}
              </Link>
            );
          })}
        </Grid>
        <Grid
          container
          size={{ xs: 12, sm: 6, md: 6, xl: 2.5, lg: 2.5 }}
          direction="column"
          sx={{ gap: 3, p: 1 }}
        >
          <Typography variant="h6" textAlign="center">
            Main Menu
          </Typography>
          {Policy.map((p, i) => {
            return (
              <Link
                to={p.pageUrl}
                style={{
                  textDecoration: "none",
                  color: "black",
                  textAlign: "center",
                  fontWeight: 500,
                  fontSize: "1.1rem",
                }}
              >
                {p.pageName}
              </Link>
            );
          })}
          {isUser ?<Link
            to={"/account"}
            style={{
              textDecoration: "none",
              color: "black",
              textAlign: "center",
              fontWeight: 500,
              fontSize: "1.1rem",
            }}
          >
            My Account
          </Link>:""}
        </Grid>
        <Grid
          container
          size={{ xs: 12, sm: 6, md: 6, xl: 4.5, lg: 4.5 }}
          justifyContent="start"
          p={1}
        >
          <Grid size={12} container justifyContent="center">
            <Stack>
              <Typography variant="h6">Newsletter</Typography>
              <Typography variant="body1">
                Sign up for exclusive offers, original stories, events and more.
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <TextField
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="large" color="primary" />
                      </InputAdornment>
                    ),
                  },
                }}
                fullWidth
              />
              <Button
                variant="contained"
                sx={{ height: "3.4rem", fontSize: "1.2rem" }}
                onClick={handleSubmit}
                fullWidth
              >
                Subscribe
              </Button>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Typography variant="h6" textAlign="center">
              Follow us
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              {ICONS.map(({ component: Icon, color, label, link }, i) => (
                <Link to={link} target="_blank">
                  <IconButton key={i} aria-label={label}>
                    <Icon color={color} fontSize="large" />
                  </IconButton>
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
