const http = require('http');

let alunos = [
    { id: 1, nome: "Ana", idade: 17 },
    { id: 2, nome: "Carlos", idade: 18 }
];

const servidor = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    // ROTA 1 - LISTAR TODOS OS ALUNOS
    // DESAFIO 3: agora retorna a quantidade de alunos cadastrados
    if (req.url === '/alunos' && req.method === 'GET') {

        res.writeHead(200);

        res.end(JSON.stringify({
            quantidade: alunos.length
        }));

    }

    // DESAFIO 5 - CADASTRAR NOVO ALUNO (POST)
    else if (req.url === '/alunos' && req.method === 'POST') {

        let corpo = '';

        req.on('data', parte => {
            corpo += parte;
        });

        req.on('end', () => {
            const novoAluno = JSON.parse(corpo);
            novoAluno.id = alunos.length + 1;
            alunos.push(novoAluno);

            res.writeHead(201);
            res.end(JSON.stringify(novoAluno));
        });

    }

    // ROTA 2 - CONSULTAR UM ALUNO ESPECÍFICO (DESAFIO 2)
    else if (req.url === '/aluno/1' && req.method === 'GET') {

        const aluno = alunos.find(a => a.id === 1);

        if (aluno) {
            res.writeHead(200);
            res.end(JSON.stringify(aluno));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({
                mensagem: 'Aluno não encontrado'
            }));
        }

    }

    // ROTA 3 - INFORMAÇÕES DO SISTEMA (DESAFIO 1)
    else if (req.url === '/sobre' && req.method === 'GET') {

        res.writeHead(200);

        res.end(JSON.stringify({
            mensagem: 'Sistema de Gerenciamento de Alunos'
        }));

    }

    // ROTA 4 - QUANTIDADE DE ALUNOS
    else if (req.url === '/quantidade' && req.method === 'GET') {

        res.writeHead(200);

        res.end(JSON.stringify({
            quantidade: alunos.length
        }));

    }

    // ROTA 5 - ROTA NÃO ENCONTRADA (DESAFIO 4)
    else {

        res.writeHead(404);

        res.end(JSON.stringify({
            mensagem: 'Rota não encontrada'
        }));

    }

});

servidor.listen(4000, () => {
    console.log('Servidor funcionando na porta 4000');
});

