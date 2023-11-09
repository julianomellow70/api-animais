var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'animais'
});
 
connection.connect((erro)=>{
 if (!erro){
    console.log("Banco conectado com sucesso!")
 }else{
    console.log("Erro ao conectar no banco")
 }
})

module.exports = connection;