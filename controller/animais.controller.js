const { query } = require('express');
const conexao = require('../config/bd.config');


const atualizar = (req, res) => {

    let animal = req.body;
    let idAnimal = req.params.id;

    let nome = animal.nome;
    let tipo = animal.tipo;
    let habitat = animal.habitat;
    let dieta = animal.dieta;


    let query = `UPDATE animais AS a SET a.nome = "${nome}", a.tipo = "${tipo}",  a.habitat = "${habitat}", a.dieta = "${dieta}" WHERE a.id = ${idAnimal}`

    console.log(query)

    conexao.query(query, function (errors, result) {
        if (errors){
            console.log(errors)
            res.status(500).json(
                { "msg": "Internal error server" }
            );
        }else{
            res.status(200).json(
                { "msg": "Atualizado com sucesso" }
            );
        }
    })
}

const inserir = (req, res) => {
    let animal = req.body;

    conexao.query(`INSERT INTO animais (nome, tipo, habitat, dieta) VALUES (?, ?, ?, ?)`,
        [animal.nome, animal.tipo, animal.habitat, animal.dieta], (erros, result, fields) => {
            if (erros) {
                res.status(500).json(
                    { "msg": "Internal error server" }
                );
            } else {
                res.status(200).json(
                    { "msg": "Inserido com sucesso" }
                );
            }
        });


}

const buscarTodos = (req, res) => {
    const query = "select * from animais";
    conexao.query(query, (erros, result, fields) => {
        if (erros) {
            res.status(500).json({ "msg": "Internal error server"});
        }else{
            res.status(200).json(result)
        }
    })
}

const buscarPorId = (req, res) => {
    let idAnimal = req.params.id;

    let query = `select * from animais where id = ${idAnimal};`

    conexao.query(query, (erros, result, fields) => {

        if (erros) {
            res.status(500).json({ "msg": "Internal error server"});
        }else{
            res.status(200).json(result)
        }
    })

}

const excluir = (req, res) => {
        const id = req.params.id;
        const query = `delete from animais where id = ${id}`

        conexao.query(query, (erros, result)=>{
            if (erros) {
                res.status(500).json({ "msg": "Internal error server"});
            }else{
                let linhasAfetadas = result.affectedRows;

                if (linhasAfetadas <= 0){
                    res.status(404).json({
                        "msg": "animal nao foi encontrado no banco de dados",
                       
                    })
                }else{
                    res.status(200).json({
                        "msg": "excluido com sucesso",
                       
                    })
                }

               
            }
        })
}

module.exports = {
    atualizar, inserir, buscarTodos, buscarPorId, excluir
}