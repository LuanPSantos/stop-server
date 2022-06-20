export function createSetPlayerController(socket, game) {

    function run(payload) {
        const player = { id: socket.id, name: payload.name }
        if (game.addPlayer(player)) {
            socket.join(game.id)

            socket.emit('player_setted', player)
        }
    }

    return {
        run
    }
}