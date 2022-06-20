export function createStartRoundController(io, game) {
    function run() {
        if (game.isFull()) {
            const letter = game.startRound()
            io.to(game.id).emit('round_started', { letter })
        }
    }

    return {
        run
    }
}