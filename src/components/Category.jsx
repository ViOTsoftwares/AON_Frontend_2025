import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";

function Circle({ title, image }) {
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        width: { xs: 70, sm: 150, md: 217 },
        height: { xs: 70, sm: 150, md: 180 },
        borderRadius: { xs: 1, sm: 2, md: 7 },
        cursor: "pointer",
        position: "relative",
        m: { xs: "2px", md: "12px" },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: { xs: 120, sm: 292 },
          width: "100%",
          backgroundColor: "transparent",
          objectFit: "contain",
          objectPosition: "center",
          transition: "0.4s cubic-bezier(0.68, 0.46, 0.45, 0.68)",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      />

      {/* <Typography
        sx={{
          position: "absolute",
          top: { xs: "70%", md: "80%" },
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
        fontWeight={600}
        fontSize={{ xs: "0.9rem", sm: "1.4rem" }}
        color="rgba(255, 255, 255, 1)"
      >
        {title}
      </Typography> */}
    </Card>
  );
}


export default Circle;
