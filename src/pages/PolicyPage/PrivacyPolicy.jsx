import React, { useEffect, useState } from "react";
import { getOnePolicyApi } from "../../Api_Action";
import PageLoading from "../../components/PageLoading";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const id = "68f5333ce882645fe4a6fbac"; // Privacy Policy ID

  const fetchOnePolicy = async () => {
    try {
      const data = await getOnePolicyApi(id);
      setPolicy(data);
    } catch (error) {
      console.error("Error fetching policy:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // ensure top scroll
    fetchOnePolicy();
  }, []);

  if (isLoading) return <PageLoading load={isLoading} />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Card
        sx={{
          maxWidth: 1100, // increased from 800 → 1100 for wider content
          width: "100%",
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Privacy Policy
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box
            sx={{
              "& p": { mb: 2, fontSize: "1rem", lineHeight: 1.8 },
              "& strong": { fontWeight: 600 },
              "& h2, & h3": { mt: 3, mb: 1 },
              "& ul, & ol": { pl: 3, mb: 2 },
              "& li": { mb: 1 },
            }}
            dangerouslySetInnerHTML={{ __html: policy?.content }}
          />
          {policy?.updatedAt && (
            <Typography
              variant="caption"
              display="block"
              align="right"
              sx={{ mt: 3, color: "text.secondary" }}
            >
              Last updated: {new Date(policy.updatedAt).toLocaleDateString()}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PrivacyPolicy;
