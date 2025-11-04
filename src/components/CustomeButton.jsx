import Button from "@mui/material/Button";
import CustomIcon from "./CustomIcon";
import  Tooltip from "@mui/material/Tooltip";
function CustomeButton({ navigate }) {
  return (
    <Tooltip placement="bottom" title="tune your furniture" arrow>
    <Button
      color="gradient"
      sx={{
        display: { xs: "none", sm: "flex" },
        justifyContent: "space-between",
        position: "relative",
        borderRadius: "15px",
        height: "44.5px",
        width: "133.6px",
      }}
      onClick={() => navigate("customization")}
    >
      <CustomIcon />
      Customization
    </Button>

      </Tooltip>
  );
}

export default CustomeButton;
