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
      sx={{
        height: { xs: 120, sm: 292 },
        borderRadius: { xs: 1, sm: 2 },
        cursor: "pointer",
        position: "relative",
      }}
    >
      <CardMedia
        sx={{
          height: { xs: 120, sm: 292 },
          objectFit: "cover",
          objectPosition: "center",
          "&:hover": {
            transition: "0.4s cubic-bezier(0.68, 0.46, 0.45, 0.68)",
            transform: "scale(1.1)",
          },
          transition: "0.4s cubic-bezier(0.68, 0.46, 0.45, 0.68)",
          transform: "scale(1)",
        }}
        image={image}
      />

      <Typography
        sx={{
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
        fontWeight={500}
        fontSize={{ xs: "0.90rem", sm: "1.4rem" }}
        variant="body1"
        color="white"
      >
        {title}
      </Typography>
    </Card>
  );
}

export default Circle;
