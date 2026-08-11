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
            <Grid key={subcategory.name} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Paper
                component={Link}
                to={`/category?q=${encodeURIComponent(category)}&sub=${encodeURIComponent(subcategory.name)}`}
                elevation={0}
                sx={{
                  display: "block",
                  p: 3,
                  textDecoration: "none",
                  border: "1px solid var(--color-border-soft)",
                  borderRadius: 3,
                  color: "text.primary",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": { transform: "translateY(-3px)", boxShadow: "var(--shadow-card)" },
                }}
              >
                {subcategory.image && <Box component="img" src={`${ImageApi}/category-image/${subcategory.image}`} alt={subcategory.name} sx={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: 2, mb: 2 }} />}
                <Typography fontSize="1.1rem" fontWeight={650}>{subcategory.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>View products</Typography>
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
