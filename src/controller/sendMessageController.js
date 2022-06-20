export function createSendMessageController(io, game) {
    function run(payload) {
        io.to(game.id).emit('message_sent', payload)
    }

    return {
        run
    }
}