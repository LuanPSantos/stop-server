import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { createGame } from './src/entity/game.js'
import { createSetPlayerController } from './src/controller/setPlayerController.js'
import { createRemovePlayerController } from './src/controller/removePlayerController.js'
import { createSendMessageController } from './src/controller/sendMessageController.js'
import { createStartRoundController } from './src/controller/startRoundController.js'
import { createStopRoundController } from './src/controller/stopRoundController.js'
import { createSendAnswersController } from './src/controller/sendAnswersController.js'
import { createVoteController } from './src/controller/voteController.js'

export function lengthOf(map) {
    return Object.getOwnPropertyNames(map).length
}

const app = express()
const game = createGame()
export const waitInterval = 5000

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: "*"
    }
})

io.on('connection', (socket) => {

    socket.on('set_player', createSetPlayerController(socket, game).run)

    socket.on('disconnect', createRemovePlayerController(socket, game).run)

    socket.on('send_message', createSendMessageController(io, game).run)

    socket.on('start_round', createStartRoundController(io, game).run)

    socket.on('stop_round', createStopRoundController(io, game).run)

    socket.on('send_answers', createSendAnswersController(io, game).run)

    socket.on('vote', createVoteController(io, game).run)
});

server.listen(3001, () => {
    console.log('started on port 3001')
})