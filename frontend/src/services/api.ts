// src/services/api.ts (ou lib/api.ts)

export interface FormSubmitData {
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

const API_URL = import.meta.env.VITE_API_URL || 'https://pesquisa-de-campo.onrender.com';

export async function submitForm(data: FormSubmitData) {
  const response = await fetch(`${API_URL}/api/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao enviar formulário');
  }

  return response.json();
}