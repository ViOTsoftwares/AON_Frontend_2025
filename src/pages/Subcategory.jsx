import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PageLoading from "../components/PageLoading";
import { FetchSubcategoriesApi } from "../Api_Action";
import { ImageApi } from "../ImageApi";

function Subcategory() {
  const { category: encodedCategory } = useParams();
  const category = decodeURIComponent(encodedCategory || "");
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      setLoading(true);
      const data = await FetchSubcategoriesApi(category);
      setSubcategories(data?.subcategories || []);
      setLoading(false);
    };

    fetchSubcategories();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category]);

  if (loading) return <PageLoading load={loading} />;

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 4, md: 6 }, minHeight: "55vh" }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Home / {category}
      </Typography>
      <Typography component="h1" fontSize={{ xs: "2rem", md: "2.7rem" }} fontWeight={700}>
        {category}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        Choose a sub-category to view products.
      </Typography>

      {subcategories.length ? (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {subcategories.map((subcategory) => (
            <Grid key={subcategory.name} size={{ xs: 6, sm: 4, md: 3 }}>
              <Paper
                component={Link}
                to={`/category?q=${encodeURIComponent(category)}&sub=${encodeURIComponent(subcategory.name)}`}
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  p: 2,
                  textDecoration: "none",
                  border: "1px solid var(--color-border-soft)",
                  borderRadius: 3,
                  bgcolor: "#ffffff",
                  color: "text.primary",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 28px rgba(3, 166, 161, 0.15)",
                    borderColor: "rgba(3, 166, 161, 0.4)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    borderRadius: 2,
                    overflow: "hidden",
                    bgcolor: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.5,
                  }}
                >
                  {subcategory.image ? (
                    <Box
                      component="img"
                      src={`${ImageApi}/category-image/${subcategory.image}`}
                      alt={subcategory.name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        p: 1,
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        color: "text.disabled",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {subcategory.name}
                    </Box>
                  )}
                </Box>
                <Typography fontSize="1.05rem" fontWeight={700} noWrap>
                  {subcategory.name}
                </Typography>
                <Typography variant="body2" color="primary.main" fontWeight={600} sx={{ mt: 0.5 }}>
                  View Products →
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography color="text.secondary">No sub-categories have been added yet.</Typography>
          <Button component={Link} to={`/category?q=${encodeURIComponent(category)}`} sx={{ mt: 2 }}>
            View all {category} products
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Subcategory;
