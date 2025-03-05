import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import AlertDialog from "../components/AlertDialog";
import LanguageSelect from "../components/LanguageSelect";

const Translator = () => {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getLanguages = async () => {
    try {
      const response = await axios.get("http://localhost:8081/languages");
      setLanguages(response.data);
    } catch (err) {
      setError("Failed to fetch languages");
    } finally {
      setLoading(false);
    }
  };

  const translateText = async (textToTranslate, targetLanguageCode) => {
    try {
      await axios.post("http://localhost:8081/textToTranslate", {
        textToTranslate,
        targetLanguageCode,
      });
      // Adicione a lógica de sucesso aqui, como uma mensagem de sucesso ou redirecionamento
    } catch (err) {
      setAlertMessage("An error occurred while translating");
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    getLanguages().catch((err) => {
      console.error("Error fetching languages:", err);
    });
  }, []);

  const handleTranslate = async (event) => {
    event.preventDefault();
    if (!text || !targetLanguage) {
      setAlertMessage("Text and target language are required");
      setOpenAlert(true);
      return;
    }

    try {
      await translateText(text, targetLanguage);
    } catch (err) {
      // Error is already handled in translateText function
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardHeader
          title="Translator"
          sx={{ textAlign: "center", bgcolor: "#1976d2", color: "white" }}
        />
        <CardContent>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 200,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleTranslate}>
              <TextField
                fullWidth
                multiline
                rows={5}
                variant="outlined"
                label="Your text to translate"
                value={text}
                onChange={(e) => setText(e.target.value)}
                margin="normal"
                required
                sx={{ mb: 2 }}
              />
              <LanguageSelect
                languages={languages}
                targetLanguage={targetLanguage}
                setTargetLanguage={setTargetLanguage}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Translate
              </Button>
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </form>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={openAlert}
        onClose={handleCloseAlert}
        message={alertMessage}
      />
    </Container>
  );
};

export default Translator;
