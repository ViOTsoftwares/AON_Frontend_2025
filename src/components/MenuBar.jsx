import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ChairIcon from "@mui/icons-material/Chair";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditNoteIcon from "@mui/icons-material/EditNote";
import GroupsIcon from "@mui/icons-material/Groups";
import CallIcon from "@mui/icons-material/Call";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Avatar from "@mui/material/Avatar";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomIcon from "./CustomIcon";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
function MenuBar({ show, handleClose }) {
  const navLinks = [
    { title: "Products", link: "products" },
    {
      title: "Cart",

      link: "cart",
    },
    {
      title: "Customization",

      link: "customization",
    },

    { title: "Catalog", link: "catalog" },
    { title: "Blogs", link: "blogs" },
    { title: "About Us", link: "about-us" },
    { title: "Privacy Policy", link: "privacy-policy" },
    { title: "Refund Policy", link: "refund-policy" },
    {
      title: "Shipping Policy",

      link: "shipping-policy",
    },
    {
      title: "Terms & Condition",
      link: "terms-condition",
    },
  ];
  const navigate = useNavigate();
  const { User, isUser } = useSelector((state) => state.UserState);
  const { username, picture } = User;
  return (
    <Drawer
      open={show}
      onClose={handleClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "75%", sm: "25%" },
          background: "rgba(255, 255, 255, 0.8)",
        },
      }}
      anchor="right"
    >
      <Box sx={{ position: "sticky", top: "0px", height: "16%" }}>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          height="100%"
        >
          <Box sx={{ ml: 2 }}>
            <Tooltip title={username ? username : "Guest"} arrow>
              <Avatar
                src={isUser && picture ? picture : undefined}
                alt={username || "Guest"}
                sx={{
                  bgcolor: username ? "primary.main" : "grey.500",
                  width: 56, // slightly larger so inner padding looks nice
                  height: 56,
                  p: 0, // no invalid negative padding
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                  style: { objectFit: "cover" },
                }}
              >
                {isUser ? (
                  <Box
                    sx={{
                      px: 0.6,
                      py: 0.4,
                      fontSize: "1.25rem",
                      fontWeight: "700",
                    }}
                  >
                    {username?.[0]?.toUpperCase()}
                  </Box>
                ) : (
                  <PersonSharpIcon sx={{ fontSize: 26 }} />
                )}
              </Avatar>
            </Tooltip>
          </Box>
          <Button
            variant="h6"
            sx={{
             

              px: "0px",
            }}
            onClick={() => {
              navigate("login");
              handleClose();
            }}
          >
            <span style={{ fontSize: "16px" }}>
              <b>Welcome</b> {username}
            </span>
          </Button>
          <IconButton onClick={handleClose}>
            <CloseSharpIcon />
          </IconButton>
        </Stack>
      </Box>
      <List
        sx={{
          overflowY: "scroll",
          scrollbarColor: "#1976d2 rgba(255, 255, 255, 0.8) ",
        }}
      >
        {navLinks.map((navLink, index) => {
          return (
            <ListItem key={index}>
              <ListItemButton
                onClick={() => {
                  navigate(navLink?.link), handleClose();
                }}
              >
                <ListItemText>{navLink.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ position: "sticky", bottom: "0px", height: "35%" }}>
        <Divider />
        <Stack
          spacing={{ xs: 5, sm: 0.5, height: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Typography>Follow Us</Typography>
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="stretch"
        >
          <Box sx={{ p: 0.5, borderRadius: 2 }}>
            <IconButton>
              <FacebookIcon color="info" fontSize="large" />
            </IconButton>
          </Box>

          <Box sx={{ p: 0.5, borderRadius: 2 }}>
            <IconButton>
              <InstagramIcon color="error" fontSize="large" />
            </IconButton>
          </Box>

          <Box sx={{ p: 0.5, borderRadius: 2 }}>
            <IconButton>
              <YouTubeIcon color="error" fontSize="large" />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}

export default MenuBar;
