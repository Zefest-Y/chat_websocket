const ws = new WebSocket("ws://localhost:4000")
const mensagens = document.getElementById("message_container")
const campo = document.getElementById("msgInput")

console.log("iniciou...")

function envia(){
    let mensagem = JSON.stringify({conteudo: campo.value})
    ws.send(mensagem)
    campo.value = ""
}

function newMessage(message){
    let div_message = document.createElement("div");
    let id_message = document.createElement("h3");
    let content_message = document.createElement("h6");

    id_message.innerText = message.ident;
    content_message.innerText = message.conteudo;

    div_message.appendChild(id_message);
    div_message.appendChild(content_message);

    div_message.classList.add("message");

    return div_message;
}

ws.onopen = () => {
    console.log("conectou");
};

ws.onmessage = (event) => {
    console.log(event.data)

    let mensagemRecebida = JSON.parse(event.data)
    
    mensagens.appendChild(newMessage(mensagemRecebida));
};
