const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const port = 3000; //porta padrão

const mysql = require('mysql');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//Rotas
const router = express.Router();
router.get('/', (req,res) => res.json({message: 'Funcionando!'}));
app.use('/', router);

//Inicia servidor
app.listen(port);
console.log('API Funcionando');

//Faz já na rota clientes/:id?
// router.get('/clientes', (req,res)=>{
//     execSQLQuery('SELECT * FROM clientes', res);
// })

//Select clientes e cliente específico (/clientes ou /clientes/id)
router.get('/clientes/:id?', (req,res)=>{
    let filter = '';
    if(req.params.id) filter = 'WHERE id = ' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM clientes ' + filter, res);
})

//Atualiza Clientes
router.patch('/clientes/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cidade = req.body.cidade.substring(0,150);
    const bairro = req.body.bairro.substring(0,150);
    const nome_loja = req.body.nome_loja.substring(0,150);

    execSQLQuery(`UPDATE clientes SET nome ='${nome}',cidade='${cidade}',bairro='${bairro}',nome_loja='${nome_loja}' WHERE id =${id}`, res);
})

//Adicionando clientes
router.post('/clientes', (req,res)=>{
    const nome = req.body.nome.substring(0,150);
    const cidade = req.body.cidade.substring(0,150);
    const bairro = req.body.bairro.substring(0,150);
    const nome_loja = req.body.nome_loja.substring(0,150);

    execSQLQuery(`INSERT INTO clientes (nome, cidade, bairro, nome_loja) VALUES ('${nome}','${cidade}','${bairro}','${nome_loja}')`, res);
});

//Delete
router.delete('/clientes/:id', (req,res)=>{
    let filter = '';
    if(req.params.id) filter = 'WHERE id = ' + parseInt(req.params.id);
    execSQLQuery('DELETE FROM clientes ' + filter, res);
})

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'empresakf'
    });

    connection.query(sqlQry, function(error, results, fields){
        if(error) res.json(error);
        else res.json(results);
        connection.end();
        console.log('Executou!');
    });
}