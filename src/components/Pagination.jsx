import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function PaginationOutlined({ handlePageChange, page }) {
  return (
     <Paper elevation={0} sx={{ mt: 1, width: { xs: "100%" }, boxShadow: "none", border: "1px solid rgba(0,0,0,0.06)" }}>
      <Toolbar>
        <Typography
          flexGrow={{ xs: 0.2, sm: 0.5 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Page {page} of 10
        </Typography>

        <Stack spacing={2}>
          <Pagination
            count={10}
            color="primary"
            page={page}
            onChange={handlePageChange}
           
            sx={{
              "& .MuiPaginationItem-root": {
                boxShadow: "none",
              },
              "& .MuiPaginationItem-page.Mui-selected": {
                boxShadow: "none",
              },
             
              "& .MuiPaginationItem-root:focus": {
                boxShadow: "none",
              },
            }}
          />
        </Stack>
      </Toolbar>
    </Paper>
  );
}
