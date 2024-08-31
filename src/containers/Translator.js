import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardHeader, CardContent, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, CircularProgress, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const Translator = () => {
    const [text, setText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get('http://localhost:8081/languages');
                setLanguages(response.data);
            } catch (err) {
                setError('Failed to fetch languages');
            } finally {
                setLoading(false);
            }
        };

        fetchLanguages().catch(err => {
            console.error('Error fetching languages:', err);
        });
    }, []);

    const handleTranslate = async (event) => {
        event.preventDefault();
        if (!text || !targetLanguage) {
            setAlertMessage('Text and target language are required');
            setOpenAlert(true);
            return;
        }

        try {
            await axios.post('http://localhost:8081/textToTranslate', {
                textToTranslate: text,
                targetLanguageCode: targetLanguage
            });
            // Adicione a lógica de sucesso aqui, como uma mensagem de sucesso ou redirecionamento
        } catch (err) {
            setAlertMessage('An error occurred while translating');
            setOpenAlert(true);
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
                    sx={{ textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}
                />
                <CardContent>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
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
                            <FormControl fullWidth variant="outlined" margin="normal" required>
                                <InputLabel>Choose the language</InputLabel>
                                <Select
                                    value={targetLanguage}
                                    onChange={(e) => setTargetLanguage(e.target.value)}
                                    label="Choose the language"
                                >
                                    {languages.map((language, index) => (
                                        <MenuItem key={index} value={language}>
                                            {language}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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

            {/* Modal de Alerta */}
            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: 3,
                        minWidth: 300,
                    },
                }}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ErrorIcon color="error" sx={{ mr: 1 }} />
                        Error
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography>{alertMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAlert} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Translator;
