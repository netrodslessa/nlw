// importar a dependência do SQlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

// utilizar o objeto de banco de dados, para nossas operações

// db.serialize(() => {
//     // Com comandos SQL: 
//     // 1 => Criar uma tabela 
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             item TEXT
//         );
//     `) // Crase deixa ter quebra de linhas
//     //Chama tamplate Literals 


//     //2 => Inserir dados na tabela
//     const query =
//         `INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         item
//     ) values(?, ?, ?, ?, ?, ?, ?);`
//     // Usa-se os "?" para preencher os valores de maneira dinâmica

//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         "Papersider",
//         "Guilherme Gembala, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e papelão"
//     ]

//     // function afterInsertData(err) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("cadastrado com sucesso")
//     //     console.log(this)
//     //     // O "this" está referenciando a resposta do run
//     //     // quando usa o "this", não usa a arrow function: ()=>{}
//     // }

//     // o 3º parâmetro abaixo é uma função de call back(chame de volta)
//     //db.run(query, values, afterInsertData)
//     // se o terceiro parâmetro vier com parenteses, ele executa imediatamente

//     //3 => Consultar os dados da tabela
    // db.all(`SELECT * FROM places`, function (err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log('aqui estão seus registros: ')
    //     console.log(rows)


    // })

//    //4 => Deletar um dado da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [7], function (err) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log('Registro deletado com sucesso')
//     })
//     // o segundo parâmetro é um array com o valor do "?"


// })

module.exports = db