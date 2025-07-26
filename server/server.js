const WebSocket = require("ws")
const wss = new WebSocket.Server({port: 4000})

const clientes = []

function recebeMensagem(mensagem){
    console.log(mensagem.toString())
        
    clientes.forEach((item) => {
        item.send(mensagem.toString())
    })
}

wss.on("connection", (ws) => {
    console.log("conectou")

    clientes.push(ws)
    console.log(clientes.length);

    ws.on("message", recebeMensagem);
});
