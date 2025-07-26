const WebSocket = require("ws")
const wss = new WebSocket.Server({port: 4000})

const clientes = []
const ids = new Map();

let conexoes = 0;

function recebeMensagem(mensagem, ws){
    console.log(mensagem.toString())

    const conteudoMensagem = JSON.parse(mensagem);

    const mensagemComId = {
        ident: ids.get(ws),
        conteudo: conteudoMensagem.conteudo
    };
        
    clientes.forEach((item) => {
        item.send(JSON.stringify(mensagemComId));
    })
}

wss.on("connection", (ws) => {
    console.log("conectou")

    clientes.push(ws)
    console.log(clientes.length);

    ids.set(ws, conexoes);
    conexoes++;

    ws.on("message", (mensagem) => {
        recebeMensagem(mensagem, ws);
    });
});
