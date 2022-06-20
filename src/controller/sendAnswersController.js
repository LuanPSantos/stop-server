import { waitInterval } from "../../index.js"

export function createSendAnswersController(io, game) {
    function run(payload) {
        if (game.setAnswersForPlayer(payload.playerId, payload.answers)) {
            setTimeout(() => {
                io.to(game.id).emit('start_voting', game.getNextPlayerAnswers())
            }, waitInterval)
        }
    }

    return {
        run
    }
}