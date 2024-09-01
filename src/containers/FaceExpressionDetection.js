import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Container, Box, Card, CardHeader, CircularProgress, Alert, List, ListItem, ListItemText } from '@mui/material';

const FaceExpressionDetection = () => {
    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const [faceData, setFaceData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8081/uploadFileToVisionFace', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setImageSrc(`data:image/jpeg;base64,${response.data.imageUrl}`);
            setFaceData(response.data.facesData);

        } catch (err) {
            setError('Failed to upload the image. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const renderFaceData = (face) => (
        <List>
            <ListItem>
                <ListItemText primary={`Joy: ${face.joyLikelihood}`} />
            </ListItem>
            <ListItem>
                <ListItemText primary={`Anger: ${face.angerLikelihood}`} />
            </ListItem>
            <ListItem>
                <ListItemText primary={`Sorrow: ${face.sorrowLikelihood}`} />
            </ListItem>
            <ListItem>
                <ListItemText primary={`Surprise: ${face.surpriseLikelihood}`} />
            </ListItem>
            <ListItem>
                <ListItemText primary={`Detection Confidence: ${face.detectionConfidence.toFixed(2)}`} />
            </ListItem>
        </List>
    );

    return (
        <Container maxWidth="sm">
            <Card>
                <CardHeader
                    title="Cloud Vision"
                    sx={{ textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}
                />
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Upload and Analyze Image
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'block', margin: '0 auto 16px' }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Image'}
                        </Button>
                    </form>
                    {error && <Alert severity="error">{error}</Alert>}

                    {imageSrc && (
                        <Card sx={{ mt: 2 }}>
                            <CardHeader
                                title="Uploaded Image"
                                sx={{ textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}
                            />
                            <Box sx={{ p: 2 }}>
                                <img
                                    src={imageSrc}
                                    alt="Uploaded"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                                <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                                    Analysis Results
                                </Typography>
                                {faceData && faceData.length > 0 ? (
                                    faceData.map((face, index) => (
                                        <Box key={index} sx={{ mt: 2 }}>
                                            <Typography variant="subtitle1">Face {index + 1}</Typography>
                                            {renderFaceData(face)}
                                        </Box>
                                    ))
                                ) : (
                                    <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                                        No faces detected
                                    </Typography>
                                )}
                            </Box>
                        </Card>
                    )}
                </Box>
            </Card>
        </Container>
    );
};

export default FaceExpressionDetection;
