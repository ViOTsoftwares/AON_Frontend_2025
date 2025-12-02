import { BlinkBlur } from "react-loading-indicators";
import { Dialog, DialogContent, Stack } from "@mui/material";

export default function PageLoading({ load }) {
  if(!load) return null 
  return (
   <Stack
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
      display="flex"
      sx={{ position: "fixed", top: 0, left: 0, background: "#fff", zIndex: 9999 }}
    >
      <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
         <BlinkBlur color="#03A6A1" size="medium" text="Loading..."/>
      </h2>
    </Stack>
  );
}
