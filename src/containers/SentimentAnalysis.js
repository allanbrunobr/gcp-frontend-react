import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from "@mui/material";
import SentimentAlertDialog from "../components/SentimentAlertDialog";
import SentimentResult from "../components/SentimentResult";

const SentimentAnalysis = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setAlertMessage("Text cannot be empty.");
      setOpenAlert(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/sentimentAnalysis",
        { textToAnalyze: text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("An error occurred while analyzing the sentiment.");
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader
            title="Sentiment Analysis"
            sx={{ textAlign: "center", bgcolor: "#1976d2", color: "white" }}
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Enter text for sentiment analysis"
                value={text}
                onChange={(e) => setText(e.target.value)}
                margin="normal"
                sx={{ mb: 2, borderColor: "#d3d3d3" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Analyze Sentiment"
                )}
              </Button>
            </form>
            <SentimentResult result={result} />
          </CardContent>
        </Card>
      </Box>

      <SentimentAlertDialog
        open={openAlert}
        onClose={handleCloseAlert}
        message={alertMessage}
      />
    </Container>
  );
};

export default SentimentAnalysis;
