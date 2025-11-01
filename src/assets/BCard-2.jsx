import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { ImageApi } from "../ImageApi";
import { useNavigate } from "react-router-dom";

function BlogCard({ blog }) {
  const [show, setShow] = useState(false);
  const date = new Date(blog?.createdAt);
  const navigate = useNavigate();
  const options = { day: "numeric", month: "short", year: "numeric" };

  return (
    <Card
      sx={{
        position: "relative",
        width: { xs: "100%", sm: 550, md: 600 },
        height: { xs: 260, sm: 320, md: 340 },
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: show ? 6 : 2,
        transition: "box-shadow 0.3s",
        background: `url(${ImageApi}/blogs/${blog?.coverImage}) center/cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() =>
        navigate(`/blog/${blog?.slug.replace(/ /g, "-")}`, {
          state: { id: blog._id },
        })
      }
    >
      {/* White overlay container */}
      <CardContent
        sx={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: 2,
          boxShadow: 2,
          minWidth: 210,
          maxWidth: 260,
          marginLeft: 3,
          marginY: 2,
          zIndex: 2,
          position: "relative",
        }}
      >
        <Typography
          variant="subtitle2"
          color="textSecondary"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          {date.toLocaleDateString("en-GB", options)}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          {blog?.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {blog?.slug}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{ width: 28, height: 28 }} />
          <Typography variant="body2" color="text.primary">
            {blog?.writtenBy}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
