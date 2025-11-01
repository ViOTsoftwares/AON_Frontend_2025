import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SingleBlogApi } from "../Api_Action";
import { ImageApi } from "../ImageApi";
import { Box, Typography, Grid, Divider } from "@mui/material";

const BlogDetails = () => {
  const { state } = useLocation();
  const [blog, setBlog] = useState({});

  const fetchBlog = async () => {
    if (!state?.id) return;
    const data = await SingleBlogApi(state?.id);
    setBlog(data);
  };

  useEffect(() => {
    fetchBlog();
  }, [state?.id]);

  return (
    <Box sx={{ bgcolor: "#fafafa", color: "#333", width: "100%" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 350, md: 600 },
          width: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={`${ImageApi}/blogs/${blog.coverImage}`}
          alt={blog?.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.4)",
            transition: "transform 0.5s",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            px: { xs: 2, md: 6 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 2,
              textShadow: "3px 3px 15px rgba(0,0,0,0.7)",
              letterSpacing: "1px",
            }}
          >
            {blog?.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1, maxWidth: 1000 }}>
            {blog?.description}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            By {blog?.writtenBy} |{" "}
            {new Date(blog?.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      {/* Sections */}
      <Box sx={{ width: "100%", py: { xs: 5, md: 10 }, px: { xs: 2, md: 6 } }}>
        {blog?.section?.map((sec, index) => (
          <Grid
            container
            spacing={4}
            key={index}
            direction={index % 2 === 0 ? "row" : "row-reverse"}
            alignItems="center"
            sx={{
              mb: 10,
              opacity: 0,
              transform: "translateY(50px)",
              animation: "fadeInUp 0.8s forwards",
              animationDelay: `${index * 0.2}s`,
              "@keyframes fadeInUp": {
                "0%": { opacity: 0, transform: "translateY(50px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {sec.subImage && (
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={`${ImageApi}/blogs/${sec.subImage}`}
                  alt={sec.subTitle}
                  sx={{
                    width: "100%",
                    height: { xs: 250, md: 400 },
                    objectFit: "cover",
                    borderRadius: 3,
                    boxShadow: 6,
                    transition: "transform 0.5s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
                    },
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#222",
                  textTransform: "capitalize",
                }}
              >
                {sec.subTitle}
              </Typography>

              <Divider sx={{ mb: 3, borderColor: "#ccc" }} />

              <Box
                dangerouslySetInnerHTML={{ __html: sec.subDescription }}
                sx={{
                  "& table": {
                    width: "100%",
                    borderCollapse: "collapse",
                    mb: 3,
                  },
                  "& th, & td": {
                    border: "1px solid #ccc",
                    padding: "10px",
                    textAlign: "left",
                  },
                  "& p": { mb: 2, lineHeight: 1.8 },
                  "& ol, & ul": { mb: 2, pl: 4 },
                  "& strong": { fontWeight: 600 },
                }}
              />
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default BlogDetails;
