import { ImageApi } from "../ImageApi";
import { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BlogCard from "../components/BlogCard";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { FetchBlogApi } from "../Api_Action";
import PageLoading from "../components/PageLoading";

function Blogs() {
  const [blogPoster, setBlogPoster] = useState([]);
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("All");
  const [blogNavs, setBlogNavs] = useState(["All"]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const rowPerPage = 5;
  const [isLoading, setIsLoading] = useState(true);
  // Fetch blogs
  const initialized = useRef(false);

  const handleFetchBanner = async () => {
    const data = await FetchBlogApi(page, rowPerPage, title);
    if (!data) return;

    setTotalCount(data.count); // total blogs
    // const list = data?.blogs?.map((item) => item.title) || [];
    setBlogNavs((prev) => [...new Set(["All", ...data?.titleNav])]); // remove duplicates
    setBlogPoster(data.blogs);
    setIsLoading(false);
    if (!initialized.current) {
      setBlogNavs((prev) => [...new Set(["All", ...data?.titleNav])]);
      initialized.current = true;
    }
  };

  useEffect(() => {
    handleFetchBanner();
  }, [title, page]);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
    setIsLoading(true);
    setTitle(blogNavs[newValue]);
    console.log("Tabs", newValue);
    setPage(1); // reset page when changing filter
  };

  const totalPages = Math.ceil(totalCount / rowPerPage);
  console.log(blogPoster);
  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ py: { xs: 5, sm: 4 } }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontSize={{ xs: "3rem", sm: "4rem" }}
          fontWeight={700}
        >
          Blog
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          lineHeight="2rem"
          fontSize="1.3rem"
          sx={{ width: { xs: "auto", sm: 800 } }}
        >
          Discover the latest news, tips and user research insights from Arun
          Office Needs. Read our blog to buy the best furniture.
        </Typography>
      </Stack>

      {/* Tabs */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleTabChange}
          aria-label="blog categories"
        >
          {blogNavs.map((blogNav, index) => (
            <Tab
              key={index}
              label={blogNav}
              sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
            />
          ))}
        </Tabs>

        {/* Blog Grid */}
        <Grid container spacing={4}>
          {isLoading ? (
            <PageLoading load={isLoading} />
          ) : (
            blogPoster.map((blog, idx) => (
              <Grid
                item
                xs={12}
                md={6}
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <BlogCard blog={blog} width="90%" valueOfDisplay="flex" />
              </Grid>
            ))
          )}
        </Grid>

        {/* Pagination */}
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Blogs;
