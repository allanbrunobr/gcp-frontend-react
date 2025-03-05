import React from "react";
import { Typography, Box } from "@mui/material";

const SentimentResult = ({ result }) => {
  return (
    result && (
      <Box
        sx={{
          mt: 2,
          p: 2,
          border: "1px solid #ddd",
          borderRadius: 1,
          bgcolor: "#f9f9f9",
        }}
      >
        <Typography variant="h6">Result:</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {result}
        </Typography>
      </Box>
    )
  );
};

export default SentimentResult;
