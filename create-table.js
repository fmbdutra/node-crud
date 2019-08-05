const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  //port     : XXX,
  user     : 'root',
  //password : 'XXX',
  database : 'empresakf'
});

function createTable(conn){
  const sql = "CREATE TABLE IF NOT EXISTS clientes("+
              "id INT NOT NULL AUTO_INCREMENT,"+
              "nome VARCHAR(150) NOT NULL,"+
              "cidade VARCHAR(150) NOT NULL,"+
              "bairro VARCHAR(150) NOT NULL,"+
              "nome_loja VARCHAR(150),"+
              "PRIMARY KEY (id)"+
              ");";

  conn.query(sql, function(error, results, fields){
    if(error) return console.log(error);
    console.log('Criou a tabela!');
  });
}

function addRows(conn){
  const sql = 'INSERT INTO clientes(nome, cidade, bairro) values ?';
  const values = [
    ['Cleber', 'Viamao', 'Centro'],
    ['Germano', 'Porto Alegre', 'Bom Jesus'],
    ['Delmar','Porto Alegre','Passo da Areia']
  ];
  conn.query(sql, [values], function(error, results, fields){
    if(error) return console.log(error);
    console.log('Adicionou registros!');
    conn.end();
  });
}

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('Conectou no banco!');
    createTable(connection);
    addRows(connection);
})



