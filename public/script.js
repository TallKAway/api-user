const notify = document.querySelector("#notification")
const message = document.querySelector("#message")
const button = document.querySelector("button")
const header = document.querySelector("#header")

const socket = io("http://localhost:3016")

function printMessage(e) {
    e.preventDefault()
    socket.emit("message", message.value)
    console.log('Message envoyer')
}

socket.on("hotel-created",function(data){
    console.log(data)
})


button.addEventListener("click", printMessage)