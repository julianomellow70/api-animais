const animais = require('./banco_de_dados/animais.json');
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const animalController = require('./controller/animais.controller');
require('./config/bd.config')

let port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    let valorAleatorio = Math.random();
    let erroNaAplicacao = valorAleatorio > 0.5;
    console.log(valorAleatorio);
    console.log(erroNaAplicacao);

    if (!erroNaAplicacao) {
        res.status(200).json({
            message: "Ola, esse e um sistema backend",
            version: "1.0"
        })
    } else {
        res.status(500).json({
            message: "Erro no servidor, contate o admin do sistema",
            version: "1.0"
        })
    }

})

//buscar todos os animais
app.get('/animais', animalController.buscarTodos)

app.post('/animais', animalController.inserir)

app.delete('/animais/:id', animalController.excluir)

app.put('/animais/:id', animalController.atualizar)

app.get('/animais/:id', animalController.buscarPorId)

app.listen(port, function () {
    console.log(`O servidor esta online na porta ${port}`)
})