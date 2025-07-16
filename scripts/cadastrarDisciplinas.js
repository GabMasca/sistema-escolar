const axios = require('axios');

const API_URL = 'http://localhost:3000/disciplinas';

const disciplinas = [
  { nome: 'Identidade e Autonomia', etapa: 'infantil' },
  { nome: 'Corpo, Gestos e Movimentos', etapa: 'infantil' },
  { nome: 'Traços, Sons, Cores e Formas', etapa: 'infantil' },
  { nome: 'Escuta, Fala, Pensamento e Imaginação', etapa: 'infantil' },
  { nome: 'Espaços, Tempos, Quantidades, Relações e Transformações', etapa: 'infantil' },
  { nome: 'Língua Portuguesa', etapa: 'fund1' },
  { nome: 'Matemática', etapa: 'fund1' },
  { nome: 'Ciências', etapa: 'fund1' },
  { nome: 'História', etapa: 'fund1' },
  { nome: 'Geografia', etapa: 'fund1' },
  { nome: 'Artes', etapa: 'fund1' },
  { nome: 'Música', etapa: 'fund1' },
  { nome: 'Educação Física', etapa: 'fund1' },
  { nome: 'Inglês', etapa: 'fund1' },
  { nome: 'Espanhol', etapa: 'fund1' },
  { nome: 'Science', etapa: 'fund2' },
  { nome: 'Math', etapa: 'fund2' },
  { nome: 'Redação', etapa: 'fund2' },
  { nome: 'Social Studies', etapa: 'fund2' }
];

async function cadastrarDisciplinas() {
  for (const disciplina of disciplinas) {
    try {
      const response = await axios.post(API_URL, disciplina);
      console.log(`✅ ${disciplina.nome} cadastrada com sucesso!`);
    } catch (error) {
      if (error.response) {
        console.error(`❌ Erro ao cadastrar ${disciplina.nome}:`, error.response.data);
      } else if (error.request) {
        console.error(`❌ Erro de rede ao cadastrar ${disciplina.nome}:`, error.request);
      } else {
        console.error(`❌ Erro desconhecido ao cadastrar ${disciplina.nome}:`, error.message);
      }
    }

    // Aguardar 200ms entre as requisições (opcional)
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
}

cadastrarDisciplinas();
