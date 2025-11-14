import { BlinkBlur } from "react-loading-indicators";
import { Dialog, DialogContent } from "@mui/material";

export default function PageLoading({ load }) {
  return (
    <Dialog
      open={load}
      PaperProps={{
        style: {
          padding: 20,
          background: "white",
          borderRadius: 12,
          textAlign: "center",
        },
      }}
    >
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
        }}
      >
        <BlinkBlur
          text="Loading..."
          color={["#650f55", "#91167b", "#bd1da0", "#df2ebf"]}
        />
      </DialogContent>
    </Dialog>
  );
}
