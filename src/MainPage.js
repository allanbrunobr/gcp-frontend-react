import React from 'react';
import {
    AppBar, Toolbar, Typography, Grid, Container, Card, CardContent, CardMedia, Fade
} from '@mui/material';

const cases = [
    { title: "Transfero: ganhos de performance e produtividade com o Google Cloud e o Google Workspace", date: "21 de maio de 2024" },
    { title: "Capemisa Seguradora – Parceria completa com total conexão em todos os processos.", date: "7 de maio de 2024" },
    { title: "Habib’s – Perfeita harmonia entre as equipes com ampla dedicação.", date: "7 de maio de 2024" },
    { title: "UBUS Revoluciona o Transporte com o Google Cloud", date: "2 de maio de 2024" },
    { title: "Omega Energia fornece soluções sustentáveis utilizando a nuvem.", date: "28 de abril de 2024" },
    { title: "Concremat ocupa o primeiro lugar em inovação com a ajuda da nuvem.", date: "15 de abril de 2024" },
];

function MainPage() {
    return (
        <div>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Venha pra Nuvem
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container sx={{ py: 5 }}>
                <Grid container spacing={4}>
                    {cases.map((caseItem, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                                <Card
                                    sx={{
                                        maxHeight: 350,
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://via.placeholder.com/150?text=Case+${index + 1}`}
                                        alt={caseItem.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {caseItem.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {caseItem.date}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default MainPage;
