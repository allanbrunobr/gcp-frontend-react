import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Card, CardHeader, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const SentimentAnalysis = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) {
            setAlertMessage('Text cannot be empty.');
            setOpenAlert(true);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/sentimentAnalysis',
                { textToAnalyze: text },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setResult(response.data);
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('An error occurred while analyzing the sentiment.');
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
                        sx={{ textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}
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
                                sx={{ mb: 2, borderColor: '#d3d3d3' }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Sentiment'}
                            </Button>
                        </form>
                        {result && (
                            <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: 1, bgcolor: '#f9f9f9' }}>
                                <Typography variant="h6">
                                    Result:
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    {result}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>

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

export default SentimentAnalysis;
