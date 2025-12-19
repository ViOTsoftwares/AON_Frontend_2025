import { BlinkBlur } from "react-loading-indicators";
import { Stack } from "@mui/material";
import "./PageLoading.css";

export default function PageLoading({ load }) {
  if (!load) return null;

  return (
    <Stack
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        background: "#fff",
        zIndex: 9999,
      }}
    >
      <div className="loading-wrapper">
        <BlinkBlur size="medium" color="#8a0707" />
        <span className="gradient-text">Loading...</span>
      </div>
    </Stack>
  );
}
