const ws = new WebSocket("ws://localhost:4000")
const mensagens = document.getElementById("messages")
const campo = document.getElementById("msgInput")

console.log("iniciou...")

function envia(){
    let mensagem = JSON.stringify({conteudo: campo.value})
    ws.send(mensagem)
    campo.value = ""
}

ws.onopen = () => {
    console.log("conectou");
};

ws.onmessage = (event) => {
    console.log(event.data)

    let mensagemRecebida = JSON.parse(event.data)
    
    const p = document.createElement("p")
    p.innerText = mensagemRecebida.ident
    mensagens.appendChild(p)

    const p2 = document.createElement("p")
    p2.innerText = mensagemRecebida.conteudo
    mensagens.appendChild(p2)
};
