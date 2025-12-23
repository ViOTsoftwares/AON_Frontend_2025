import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Stack,
} from "@mui/material";
import SofaBg from "../assets/CoLive.jpeg";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import { ImageApi } from "../ImageApi";
import { FetchAllCatalogueApi } from "../Api_Action";
import PageLoading from "../components/PageLoading";

const Catelog = () => {
  const [isDiableButton, setIsDisableButton] = React.useState({});
  const [downloadProgress, setDownloadProgress] = useState({}); // % per file
  const [isDownloading, setIsDownloading] = useState({}); // disable per file
  const [calalogueData, setCatalogueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetchCatalogue = async () => {
    setLoading(true);
    const data = await FetchAllCatalogueApi();
    setLoading(false);

    setCatalogueData(data);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
    handleFetchCatalogue();
  }, []);

  // Download Function

  const handleExport = async (fileUrl, fileName, index) => {
    setIsDownloading((prev) => ({ ...prev, [index]: true }));
    setDownloadProgress((prev) => ({ ...prev, [index]: 0 }));

    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setDownloadProgress((prev) => ({ ...prev, [index]: percent }));
          }
        },
      });

      // detect content type
      const contentType = response.headers["content-type"];
      let extension = "";

      if (contentType.includes("pdf")) extension = ".pdf";
      else if (contentType.includes("csv")) extension = ".csv";
      else if (contentType.includes("json")) extension = ".json";

      // if backend sends wrong filename, override extension
      const finalFileName = fileName.endsWith(extension)
        ? fileName
        : fileName.replace(/\.[^/.]+$/, "") + extension;

      const blob = new Blob([response.data], { type: contentType });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = finalFileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setIsDownloading((prev) => ({ ...prev, [index]: false }));
      setDownloadProgress((prev) => ({ ...prev, [index]: 0 }));
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        color: "white",
        pb: 8,
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${SofaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          animation: "zoomInOut 20s ease-in-out infinite",
          filter: "brightness(0.6)",
        }}
      />

      {/* Header Content */}
      <Box
        sx={{
          pt: 10,
          textAlign: "center",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Modern Furniture Catalogue
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
          Browse our best pieces of 2025 – stylish, sustainable, and made for
          modern living.
        </Typography>
      </Box>

      {/* Cards */}
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 6, px: 4 }}>
        {loading ? (
          <PageLoading load={loading}/>
        ) : (
          calalogueData.length > 0 &&
          calalogueData?.map((item, index) => (
            <Grid
              container
              size={{ xs: 12, md: 4, sm: 6, lg: 3, xl: 3 }}
              key={index}
            >
              <Card
                elevation={20}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  color: "#333",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                  width: 300,
                  borderRadius: 4,
                }}
              >
                <CardMedia
                  component="img"
                  image={`${ImageApi}/catalogue/` + item.imageUri}
                  alt={item.title}
                  height="180"
                />

                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                    textAlign="left"
                    paddingBottom={2}
                    paddingLeft={1}
                  >
                    {item.title}
                  </Typography>
                  <Stack justifyContent="center" alignItems="center">
                    <Button sx={{
                      background: "linear-gradient(129deg, rgba(87,3,0,0.925), rgba(148,10,0,0.822), rgba(78,5,0,0.897))",
                      color: "white",
                    }}
                      fullWidth
                      startIcon={
                        isDownloading[index] ? (
                          <CircularProgress size={20} />
                        ) : (
                          <FileDownloadIcon />
                        )
                      }
                      variant="contained"
                      disabled={isDownloading[index]}
                      onClick={() =>
                        handleExport(
                          `${ImageApi}/catalogue/${item.catalogueFile}`,
                          item.title,
                          index
                        )
                      }
                    >
                      {isDownloading[index]
                        ? `Downloading ${downloadProgress[index] || 0}%`
                        : "Download"}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes zoomInOut {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default Catelog;
