const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para calcular total de pontos e classificação
function calcularClassificacao(expPontos, formPontos, ingPontos) {
  const total = expPontos + formPontos + ingPontos;
  if (total >= 9) return { total, classificacao: 'Sênior' };
  if (total >= 6) return { total, classificacao: 'Pleno' };
  return { total, classificacao: 'Júnior' };
}

// Rota POST /funcionarios
router.post('/', async (req, res) => {
  try {
    const {
      nome,
      dataContratacao,
      cargoId,
      experienciaPontos,
      formacaoPontos,
      inglesPontos
    } = req.body;

    if (!nome || !dataContratacao || !cargoId || experienciaPontos == null || formacaoPontos == null || inglesPontos == null) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    const { total, classificacao } = calcularClassificacao(experienciaPontos, formacaoPontos, inglesPontos);

    const funcionario = await prisma.funcionario.create({
      data: {
        nome,
        dataContratacao: new Date(dataContratacao),
        cargoId,
        experienciaPontos,
        formacaoPontos,
        inglesPontos,
        pontosTotais: total,
        classificacao
      }
    });

    res.status(201).json(funcionario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar funcionário' });
  }
});



// GET /funcionarios/:id — buscar por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const funcionario = await prisma.funcionario.findUnique({
      where: { id },
      include: { cargo: true, folhasPagamento: true }
    });
    if (!funcionario) return res.status(404).json({ error: 'Funcionário não encontrado.' });
    res.json(funcionario);
  } catch (error) {
    console.error('Erro ao buscar funcionário:', error);
    res.status(500).json({ error: 'Erro ao buscar funcionário.' });
  }
});

// PUT /funcionarios/:id — atualizar funcionário
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nome, dataContratacao, cargoId, experienciaPontos, formacaoPontos, inglesPontos } = req.body;

  if (!nome || !dataContratacao || !cargoId || experienciaPontos == null || formacaoPontos == null || inglesPontos == null) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const { total, classificacao } = calcularClassificacao(experienciaPontos, formacaoPontos, inglesPontos);

  try {
    const atualizado = await prisma.funcionario.update({
      where: { id },
      data: {
        nome,
        dataContratacao: new Date(dataContratacao),
        cargoId,
        experienciaPontos,
        formacaoPontos,
        inglesPontos,
        pontosTotais: total,
        classificacao
      }
    });
    res.json(atualizado);
  } catch (error) {
    console.error('Erro ao atualizar funcionário:', error);
    res.status(500).json({ error: 'Erro ao atualizar funcionário.' });
  }
});

// DELETE /funcionarios/:id — remover funcionário
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.funcionario.delete({ where: { id } });
    res.json({ message: 'Funcionário removido.' });
  } catch (error) {
    console.error('Erro ao remover funcionário:', error);
    res.status(500).json({ error: 'Erro ao remover funcionário.' });
  }
});


module.exports = router;
