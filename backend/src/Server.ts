import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { addFormToSheet, type FormData } from './services/googleSheets.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
    return res.send('API Formulário Pesquisa - OK');
});

app.get('/health', (_, res) => {
    return res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Rota alternativa para o cron (se preferir)
app.get('/ping', (_, res) => {
    return res.send('pong');
});

app.post('/api/submit', async (req, res) => {
    try {
        const formData: FormData = req.body;

        // Validação básica dos campos obrigatórios
        if (!formData.email) {
            return res.status(400).json({
                error: 'Email é obrigatório'
            });
        }

        // Adiciona na planilha
        await addFormToSheet(formData);

        return res.json({
            success: true,
            message: 'Formulário enviado com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao salvar formulário:', error);
        return res.status(500).json({
            error: 'Erro ao salvar dados. Tente novamente.'
        });
    }
});

export { app };