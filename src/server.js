//importando bibliotecas

const express = require('express');
const cors = require('cors');
require('dotenv').config();

//criando aplicação
const app = express();

//defiindo porta
const PORT = process.env.PORT || 3000; 

//middleware
app.use(express.json());
app.use(cors());


//definindo rota
app.get('/', (req, res) => {
    res.send('API rodando!');
});

//iniciando servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});