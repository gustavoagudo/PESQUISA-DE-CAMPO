import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function getGoogleSheetsClient() {
  const client_email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const private_key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  // Validação das credenciais
  if (!client_email || !private_key) {
    throw new Error('Credenciais do Google Sheets não configuradas');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email,
      private_key,
    },
    scopes: SCOPES,
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client as any });
  
  return sheets;
}

export interface FormData {
  email: string;
  faixaEtaria: string;
  genero: string;
  matriculadoFAI: string;
  curso: string;
  possuiDiabetes: string;
  tipoDiabetes: string;
  insatisfeitoCorpo: string;
  seConsidera: string;
  complicacoes: string;
  descricaoComplicacoes: string;
  metodosEmagrecimento: string;
  metodoDeuCerto: string;
  utilizouAntidiabeticos: string;
  considerariaUtilizar: string;
  motivoNaoUtilizacao: string;
  utilizariaSemReceita: string;
  primeiroContato: string;
  cienciaEfeitosAdversos: string;
  efeitosAdversosSentidos: string;
}

export async function addFormToSheet(data: FormData) {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID não configurado');
  }

  const timestamp = new Date().toLocaleString('pt-BR');

  const row = [
    timestamp,
    data.email,
    data.faixaEtaria,
    data.genero,
    data.matriculadoFAI,
    data.curso,
    data.possuiDiabetes,
    data.tipoDiabetes,
    data.insatisfeitoCorpo,
    data.seConsidera,
    data.complicacoes,
    data.descricaoComplicacoes,
    data.metodosEmagrecimento,
    data.metodoDeuCerto,
    data.utilizouAntidiabeticos,
    data.considerariaUtilizar,
    data.motivoNaoUtilizacao,
    data.utilizariaSemReceita,
    data.primeiroContato,
    data.cienciaEfeitosAdversos,
    data.efeitosAdversosSentidos,
  ];

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Respostas!A:U',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  });

  return response.data;
}