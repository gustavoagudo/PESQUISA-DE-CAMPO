import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { addFormToSheet, type FormData } from './services/googleSheets.js';

dotenv.config();

const app = express();

// Para usar __dirname com ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Rotas da API
app.get('/health', (_, res) => {
    return res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.get('/ping', (_, res) => {
    return res.send('pong');
});

app.post('/api/submit', async (req, res) => {
    try {
        const formData: FormData = req.body;

        if (!formData.email) {
            return res.status(400).json({
                error: 'Email é obrigatório'
            });
        }

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

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Fallback para React Router - usando regex puro para Express v5
app.get(/^\/.*/, (_, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

export { app };