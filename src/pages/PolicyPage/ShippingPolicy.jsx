import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getOnePolicyApi } from "../../Api_Action";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";


const ShippingPolicy = () => {
  const [policy, setPolicy] = useState({});

  const id = "68f534c0e882645fe4a6fbb3";
  const [isLoading, setIsLoading] = useState(true);
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
    fetchOnePolicy();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 800, width: "100%", boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Shipping Policy
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box
            sx={{
              "& p": { mb: 2, fontSize: "1rem", lineHeight: 1.6 },
              "& strong": { fontWeight: 600 },
              "& h2, & h3": { mt: 3, mb: 1 },
            }}
            dangerouslySetInnerHTML={{ __html: policy?.content }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ShippingPolicy;
