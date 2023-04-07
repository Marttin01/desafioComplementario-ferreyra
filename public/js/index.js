const serverSocket = io('http://localhost:8080')

const btnEnviar = document.querySelector("#btnEnviar")

if(btnEnviar) {
    btnEnviar.addEventListener(
        'click',
        evento => {
            const inputUser = document.querySelector("#inputUser")
            const inputMensaje = document.querySelector("#inputMensaje")

            if(inputUser && inputMensaje) {
                const user = inputUser.value
                const mensaje = inputMensaje.value

                serverSocket.emit('nuevoMensaje', {user,mensaje})
            }
        }
    )
}


serverSocket.on('actualizarMensajes', mensajes => {
    const mensajesHtml = mensajes.map(mensaje => `<li>(${mensaje.fecha}) ${mensaje.user}: ${mensaje.mensaje}</li>`)
    const divMensajes = document.querySelector('#mensajes')
    const listaMensajesHtml = mensajesHtml.join('')
    if(divMensajes) {
        divMensajes.innerHTML = `<ul> ${listaMensajesHtml}</ul>`
    }
})