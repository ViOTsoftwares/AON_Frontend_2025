import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageApi } from "../ImageApi";

function BlogCard({ blog, width = 320, valueOfDisplay = "block" }) {
  const [show, setShow] = useState(false);
  console.log(blog);
  const date = new Date(blog?.createdAt);
  const navigate = useNavigate();
  const options = { day: "numeric", month: "short", year: "numeric" };

  return (
    <Card
      sx={{
        minWidth: width,
        maxHeight: 445,
        display: valueOfDisplay,

        borderRadius: 3,
        "&:hover": { cursor: "pointer" },
      }}
      raised={show}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() =>
        navigate(`/blog/${blog?.slug.replace(/ /g, "-")}`, {
          state: { id: blog._id },
        })
      }
    >
      <Grid
        sx={{
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          src={`${ImageApi}/blogs/${blog?.coverImage}`}
          sx={{
            transition: "transform .900s",
            height: { xs: 157, md: 230 },

            "&:hover": {
              transform: "scale(1.022)",
            },
          }}
        />
        <Grid
          sx={{
            position: "absolute",
            top: "10px",
            left: "16px",

            width: 112.45,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            color="textPrimary"
            textAlign="center"
            lineHeight={2}
            sx={{ backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 2 }}
          >
            {date.toLocaleDateString("en-GB", options)}
          </Typography>
        </Grid>
      </Grid>
      <CardContent>
        <Typography
          sx={{ "&:hover": { color: "#1976D2" } }}
          lineHeight="2.6rem"
          variant="h5"
          fontStyle={600}
        >
          {blog?.slug}
        </Typography>
        <CardContent>
          <Stack
            flexDirection="row"
            justifyContent=" space-between"
            alignItems="center"
            p={1}
            sx={{ lineHeight: "3.4rem" }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Avatar />
              <Typography textAlign="center"> {blog?.writtenBy} </Typography>
            </Stack>

            <Typography textAlign="center">
              {date.toLocaleDateString("en-GB", options)}
            </Typography>
          </Stack>
        </CardContent>
      </CardContent>
      <Divider />
    </Card>
  );
}

export default BlogCard;
