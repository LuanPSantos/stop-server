export function createStopRoundController(io, game) {
    function run() {
        io.to(game.id).emit('round_stopped')
    }

    return {
        run
    }
}