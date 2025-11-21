import { Paper, Toolbar, Typography, Stack, Pagination } from "@mui/material";

export default function PaginationOutlined({ handlePageChange, page, totalPages }) {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        px: { xs: 1.5, sm: 3 },
        py: 2,
        borderRadius: 4,
        backgroundColor: "#ffffff",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 3px 12px rgba(0,0,0,0.04)",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" }, // 🔥 MOBILE CENTER
          alignItems: "center",
          minHeight: "48px",
        }}
      >
        {/* Page Info Only for Desktop */}
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 600,
            color: "#4f4f4f",
            display: { xs: "none", md: "block" }, // 🔥 HIDE ON MOBILE
          }}
        >
          Page {page} of {totalPages}
        </Typography>

        {/* Pagination Buttons */}
        <Stack>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            siblingCount={0}
            boundaryCount={1}
            sx={{
              display: "flex",
              justifyContent: "center", // 🔥 CENTER BUTTONS ON MOBILE

              "& .MuiPaginationItem-root": {
                borderRadius: "12px",
                fontSize: 14,
                fontWeight: 500,
                minWidth: 36,
                height: 36,
                mx: 0.3,
                transition: "all 0.25s ease",
              },

              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
              },

              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "#fff",
                fontWeight: 700,
                boxShadow: "0 4px 10px rgba(25,118,210,0.35)",
              },
            }}
          />
        </Stack>
      </Toolbar>
    </Paper>
  );
}
