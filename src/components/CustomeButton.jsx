import Tooltip from "@mui/material/Tooltip";
import { Box, Typography } from "@mui/material";
import CustomLogo from "../assets/CustomLogo.png"; // ✅ make sure the path is right

function CustomeButton({ navigate }) {
  return (
    <Tooltip placement="bottom" title="Customisation - Tune your furniture " arrow>
      <Box
        onClick={() => navigate("customization")}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          px: 1.1,
          py: 0.2,
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <img
          src={CustomLogo}
          alt="Customization"
          style={{
            width: "60px",
            height: "auto",
            borderRadius: "10px",
            marginTop: "6px",
          }}
        />
        {/* <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: "0.8rem",
            color: "#333",
            mt: "0px", // ✅ reduces space between image & text
          }}
        >
          Customisation
        </Typography> */}
      </Box>
    </Tooltip>
  );
}

export default CustomeButton;
