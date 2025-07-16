const express = require('express');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// ⚙️ Configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // salvar os arquivos na pasta uploads/
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

// 📥 Rota de criação do aluno com upload de documentos
router.post(
  '/aluno-com-documentos',
  upload.fields([
    { name: 'docRg', maxCount: 1 },
    { name: 'docCertidao', maxCount: 1 },
    { name: 'docContrato', maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      name,
      emailMae,
      emailPai,
      telefoneMae,
      telefonePai,
      endereco,
      observacoes,
    } = req.body;

    const files = req.files;

    try {
      const aluno = await prisma.aluno.create({
        data: {
          name,
          emailMae,
          emailPai,
          telefoneMae,
          telefonePai,
          endereco,
          observacoes,
          docRg: files.docRg ? files.docRg[0].path : null,
          docCertidao: files.docCertidao ? files.docCertidao[0].path : null,
          docContrato: files.docContrato ? files.docContrato[0].path : null,
        }
      });

      res.status(201).json({ message: 'Aluno criado com sucesso!', aluno });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar aluno com documentos' });
    }
  }
);

module.exports = router;
