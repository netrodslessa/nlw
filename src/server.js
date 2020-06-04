const express = require('express')

const server = express()

// configurar pasta public
server.use(express.static("public"))// configurações específicas do servidor


// Utilizando Tamplate engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})// primeior argumento é a pasta onde estão os HTMLs
//  segundo arqumento é um objeto
// as propriedades desse objeto são as configurações do express




// configurar caminhos da minha aplicação
// página inicial
//  req: Requisição(pedido)
// res: Resposta
server.get("/", (req, res) => {
    return res.render('index.html', { title: "Um título"})// essa linha envia o arquivo para o servidor
})// o render, vai renderizar o arquivo, ou seja, vai passar pelo engine

server.get("/create-point", (req, res)=>{
    return res.render("create-point.html")
})

server.get("/search-results", (req, res)=>{
    return res.render("search-results.html")
})

//  get é um verbo http, 
// http trabalha com regras e as regras são verbos
// O get, via barras vai responder uma função
// O get vai pedir a barra

//  Ligar o serbidor
server.listen(3500)//listen = ouvir
