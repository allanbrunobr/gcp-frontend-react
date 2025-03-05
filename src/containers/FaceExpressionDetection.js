import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardHeader,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Upload as UploadIcon } from "@mui/icons-material";
import FaceData from "../components/FaceData";

const FaceExpressionDetection = () => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [faceData, setFaceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  const uploadImage = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/uploadFileToVisionFace",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageSrc(`data:image/jpeg;base64,${response.data.imageUrl}`);
      setFaceData(response.data.facesData);
    } catch (err) {
      setError("Failed to upload the image. Please try again.");
      console.error(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadImage(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title="Cloud Vision"
          sx={{ textAlign: "center", bgcolor: "#6a1b9a", color: "white" }} // Roxo mais escuro
        />
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Upload and Analyze Image
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Button
                variant="contained"
                component="label"
                color="secondary" // Melhor contraste com o fundo
                sx={{ bgcolor: "#6a1b9a" }} // Roxo mais escuro
                disabled={loading}
                startIcon={<UploadIcon />}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Choose File"
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                />
              </Button>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="secondary" // Melhor contraste com o fundo
              fullWidth
              sx={{ mb: 2, bgcolor: "#6a1b9a" }} // Roxo mais escuro
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Upload Image"
              )}
            </Button>
          </form>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Card>

      {imageSrc && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Card sx={{ flex: 1 }}>
            <CardHeader
              title="Uploaded Image"
              sx={{ textAlign: "center", bgcolor: "#6a1b9a", color: "white" }} // Roxo mais escuro
            />
            <Box sx={{ p: 2 }}>
              <img
                src={imageSrc}
                alt="Uploaded"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardHeader
              title="Analysis Results"
              sx={{ textAlign: "center", bgcolor: "#6a1b9a", color: "white" }} // Roxo mais escuro
            />
            <Box sx={{ p: 2 }}>
              {faceData && faceData.length > 0 ? (
                faceData.map((face, index) => (
                  <Box
                    key={index}
                    sx={{
                      mt: 2,
                      bgcolor: "#f3e5f5",
                      p: 2,
                      borderRadius: "4px",
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      Face {index + 1}
                    </Typography>
                    <FaceData face={face} />
                  </Box>
                ))
              ) : (
                <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                  No faces detected
                </Typography>
              )}
            </Box>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default FaceExpressionDetection;
