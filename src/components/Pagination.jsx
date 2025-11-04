import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function PaginationOutlined({ handlePageChange, page }) {
  return (
    <Paper sx={{ mt: 1, width: { xs: "100%" } }}>
      <Toolbar>
        <Typography
          flexGrow={{ xs: 0.2, sm: 0.5 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Page {page} of 10
        </Typography>
        <Stack spacing={2}>
          <Pagination
            count={100}
            variant="outlined"
            color="primary"
            size="large"
            onChange={handlePageChange}
            hideNextButton
            hidePrevButton
          />
        </Stack>
      </Toolbar>
    </Paper>
  );
}
