import { waitInterval } from "../../index.js"

export function createVoteController(io, game) {
    function run(payload) {

        if (game.vote(payload.playerId, payload.votes) == false) return

        if (game.hasNextToVote()) {
            io.to(game.id).emit('start_voting', game.getNextPlayerAnswers())
        } else if (game.hasNextRound()) {
            io.to(game.id).emit('round_finished', game.getCurrentScore())
            setTimeout(() => {

                const letter = game.startRound()
                io.to(game.id).emit('round_started', { letter })

            }, waitInterval)
        } else {
            io.to(game.id).emit('last_round_finished', game.getCurrentScore())
            setTimeout(() => {

                io.to(game.id).emit('game_finished')

            }, waitInterval)
        }
    }

    return {
        run
    }
}