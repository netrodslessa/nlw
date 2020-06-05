const express = require('express')
const server = express()

// pegar o banco de dados
const db = require('./database/db')

// configurar pasta public
server.use(express.static("public")) // configurações específicas do servidor
//habilitar o uso do req.body na aplicação
server.use(express.urlencoded({
    extended: true
}))

// Utilizando Tamplate engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
}) // primeior argumento é a pasta onde estão os HTMLs
//  segundo arqumento é um objeto
// as propriedades desse objeto são as configurações do express




// configurar caminhos da minha aplicação
// página inicial
//  req: Requisição(pedido)
// res: Resposta
server.get("/", (req, res) => {
    return res.render('index.html', {
        title: "Um título"
    }) // essa linha envia o arquivo para o servidor
}) // o render, vai renderizar o arquivo, ou seja, vai passar pelo engine

server.get("/create-point", (req, res) => {

    // req.query: Query String da nossa URL

    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {

    //pegar os dados do formulário
    // req.body: O corpo do nosso formulário
    // console.log(req.body)

    // inserir dados do banco de dados

    //2 => Inserir dados na tabela
    const query =
        `INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        item
    ) values(?, ?, ?, ?, ?, ?, ?);`
    // Usa-se os "?" para preencher os valores de maneira dinâmica

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.item
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.render("./partials/point-error.html")
        }
        console.log("cadastrado com sucesso")
        console.log(this)
        // O "this" está referenciando a resposta do run
        // quando usa o "this", não usa a arrow function: ()=>{}
        return res.render("create-point.html", {
            saved: true
        })
    }

    // o 3º parâmetro abaixo é uma função de call back(chame de volta)
    db.run(query, values, afterInsertData)
    // se o terceiro parâmetro vier com parenteses, ele executa imediatamente

})

server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        // pesquisa vazia
        return res.render("search-results.html", {})
    }else

    // pega os dados do banco de dados
    // Consultar os dados da tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        // pegar o total de registros encontrados
        const total = rows.length


        // mostrar a página HTML com os dados do banco de dados
        return res.render("search-results.html", {
            places: rows,
            total
        })
        // quando o nome da propriedade é igual a propriedade pode-se 
        // usar a maneira curta em vez de => total:total
    })

})

//  get é um verbo http, 
// http trabalha com regras e as regras são verbos
// O get, via barras vai responder uma função
// O get vai pedir a barra

//  Ligar o serbidor
server.listen(3500) //listen = ouvir