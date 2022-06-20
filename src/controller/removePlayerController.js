export function createRemovePlayerController(socket, game) {
    function run() {
        game.removePlayerById(socket.id)
    }
    return {
        run
    }
}