import express,{ Router } from 'express'
import mongoose from 'mongoose'
import { apiRouter } from './routers/apiRouter.js'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'
import { messagesModel } from "./dao/models/messagesModel.js"
import moment from 'moment/moment.js'


const app = express()
app.use(express.json())
app.use('/api', apiRouter)
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.static('./public'))

mongoose.connect('mongodb+srv://martin:12341234@cluster01.8sxswa6.mongodb.net/ecommerce?retryWrites=true&w=majority')


const httpServer = app.listen(8080, () => console.log('Servidor levantado en 8080'))

const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
    console.log(`Nuevo cliente conectado id:# ${clientSocket.id}`)
    clientSocket.on('nuevoMensaje', async mensaje => {
        console.log(`#${clientSocket.id} dice:`)
        console.log(mensaje)
        await messagesModel.create({
            fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
            user:mensaje.user,
            mensaje:mensaje.mensaje
        })
        io.sockets.emit('actualizarMensajes', await messagesModel.find())
    })  
    io.sockets.emit('actualizarMensajes', await messagesModel.find())
})

app.get('/', async (req,res) => {
    const mensajes = await messagesModel.find()
    res.render('chat', {
        pageTitle:'Chat',
        hayMensajes: mensajes.length > 0,
        mensajes: mensajes
    })
})









