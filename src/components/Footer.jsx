import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImageApi } from "../ImageApi";
import { CreateSubscribeEmailApi } from "../Api_Action";
import { toastMessage } from "../toastMessage";
import FooterBg from "../assets/TestiMonial-1.jpg";
import "./Footer.css";

function Footer() {
  const { cmsDate } = useSelector((state) => state.CmsState);
  const { isUser } = useSelector((state) => state.UserState);

  const [email, setEmail] = useState("");
  const [errorValidation, setErrorValidation] = useState("");
  const [year, setYear] = useState("");

  const Pages = [
    { page: "Products", url: "products" },
    { page: "Catalog", url: "catalog" },
    { page: "About Us", url: "about-us" },
    { page: "Blogs", url: "blogs" },
    
  ];

  const Policies = [
    { page: "Privacy Policy", url: "/privacy-policy" },
    { page: "Shipping Policy", url: "/shipping-policy" },
    { page: "Refund Policy", url: "/refund-policy" },
    { page: "Terms & Conditions", url: "/terms-condition" },
  ];

  const Icons = [
    { icon: FacebookIcon, url: cmsDate?.facebookURL },
    { icon: InstagramIcon, url: cmsDate?.instraURL },
    { icon: YouTubeIcon, url: cmsDate?.youtupeURL },
    { icon: TwitterIcon, url: cmsDate?.xURL },
    { icon: LinkedInIcon, url: cmsDate?.linkedin },
  ];

  const Address = [
    { icon: FaLocationDot, label: cmsDate?.address },
    { icon: FaPhoneAlt, label: cmsDate?.phone },
    { icon: MdEmail, label: cmsDate?.email },
  ];

  const handleSubmit = async () => {
    if (!email.trim()) return setErrorValidation("Email is required");
    const format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!format.test(email)) return setErrorValidation("Invalid email");

    const res = await CreateSubscribeEmailApi(email);
    toastMessage(res.message, res.success ? "success" : "error");
    setEmail("");
  };

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      className="footer-bg"
      style={{
        "--bg-image": `url(${FooterBg})`,
        "--bg-color": "var(--gradient-header-overlay)",
        paddingBottom: "24px",
      }}
    >
      {/* Logo + Tagline */}
      <Box textAlign="center" py={3}>
        <img
          src={`${ImageApi}/testimonial/${cmsDate?.logo}`}
          alt="logo"
          width={300}
        />
        <Typography color="var(--color-text-inverse)" mt={1} fontWeight={500}>
          Specialized Store For Modern Furniture With Customization.
        </Typography>
      </Box>

      {/* Main Content */}
      <Grid
        container
        px={{ xs: 3, md: 6 }}
        py={4}
        rowSpacing={4}
        columnSpacing={5}
        justifyContent="space-between"
      >
        {/* Address */}
        <Grid item xs={12} sm={6} md={3}>
          <Stack spacing={1.5}>
            {Address.map(({ icon: Icon, label }, i) => (
              <Stack direction="row" spacing={1.5} alignItems="center" key={i}>
                <Icon color="var(--color-text-inverse)" />
                <Typography color="var(--color-text-inverse)" fontSize="0.9rem">
                  {label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>

        {/* Map */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              width: "100%",
              height: 170,
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src="https://maps.google.com/maps?hl=en&q=Arun Office Needs&t=&z=12&output=embed"
            ></iframe>
          </Box>
        </Grid>

        {/* Pages */}
        <Grid item xs={6} sm={4} md={2}>
          <Typography color="var(--color-text-inverse)" fontWeight={700} mb={1}>
            Pages
          </Typography>
          {Pages.map((p, i) => (
            <Typography
              key={i}
              component={Link}
              to={p.url}
              fontSize="0.85rem"
              sx={{
                display: "block",
                color: "var(--color-text-inverse)",
                mt: 0.8,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {p.page}
            </Typography>
          ))}
        </Grid>

        {/* Policies */}
        <Grid item xs={6} sm={4} md={2}>
          <Typography color="var(--color-text-inverse)" fontWeight={700} mb={1}>
            Policies
          </Typography>
          {Policies.map((p, i) => (
            <Typography
              key={i}
              component={Link}
              to={p.url}
              fontSize="0.82rem"
              sx={{
                display: "block",
                color: "var(--color-text-inverse)",
                mt: 0.8,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {p.page}
            </Typography>
          ))}
          {isUser && (
            <Link
              to="/account"
              style={{ display: "block", color: "var(--color-text-inverse)", marginTop: "8px" }}
            >
              My Account
            </Link>
          )}
        </Grid>

        {/* Newsletter */}
        <Grid item xs={12} sm={8} md={3}>
          <Typography color="var(--color-text-inverse)" fontWeight={700}>
            Newsletter
          </Typography>
          <Typography color="var(--color-text-inverse)" fontSize="0.8rem" mt={0.8}>
            Sign up for exclusive offers, events & more.
          </Typography>

          <Stack direction="row" spacing={1} mt={1.5}>
            <TextField
              size="small"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorValidation("");
              }}
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  background: "var(--color-surface)",
                  borderRadius: "6px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              sx={{ background: "var(--color-accent-soft)", color: "var(--color-text-inverse)" }}
              onClick={handleSubmit}
            >
              Subscribe
            </Button>
          </Stack>

          {errorValidation && (
            <Typography color="var(--color-danger)" fontSize="0.75rem" mt={0.5}>
              {errorValidation}
            </Typography>
          )}

          <Typography color="var(--color-text-inverse)" mt={2}>
            Follow us
          </Typography>
          <Stack direction="row" spacing={1} mt={0.5}>
            {Icons.map(({ icon: Icon, url }, i) => (
              <Link key={i} to={url} target="_blank">
                <IconButton size="small">
                  <Icon color="var(--color-text-inverse)" />
                </IconButton>
              </Link>
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Typography textAlign="center" color="var(--color-text-inverse)" fontSize="0.8rem">
        © {year} Developed by  ViOT Tech. All Rights Reserved.
      </Typography>
    </footer>
  );
}

export default Footer;
