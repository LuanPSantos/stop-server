import { lengthOf } from "../../index.js"
import { createRound } from "./round.js"

export function createGame() {
    const id = '1'
    let players = {}
    let rounds = []
    let roundIndex = -1
    const maxPlayers = 2
    const maxRounds = 1

    function addPlayer(player) {
        if (lengthOf(players) < maxPlayers) {
            players[player.id] = player

            return true
        }

        return false
    }

    function removePlayerById(id) {
        delete players[id]
    }

    function isFull() {

        const amountOfPlayersWithName = Object.getOwnPropertyNames(players)
            .map(key => players[key])
            .map(player => player.name)
            .filter(name => !!name)
            .length

        return amountOfPlayersWithName === maxPlayers
    }

    function startRound() {
        roundIndex++ //TODO parar de usar index!

        const round = createRound()

        rounds.push(round)

        return round.letter
    }

    function setAnswersForPlayer(playerId, playerAnswers) {
        rounds[roundIndex]
            .setAnswersForPlayer(playerId, playerAnswers)

        const everyoneHasAnswered = rounds[roundIndex].countTotalAnswers() === lengthOf(players)

        return everyoneHasAnswered
    }

    function getNextPlayerAnswers() {
        const nextAnswers = rounds[roundIndex].getNextPlayerAnswers()
        return {
            player: players[nextAnswers.playerId],
            answers: nextAnswers.answers
        }
    }

    function vote(playerId, votes) {
        rounds[roundIndex].votePlayerAnswers(playerId, votes)

        const everyoneHasVoted = rounds[roundIndex].countTotalVotesForPlayerAnswers(playerId) == lengthOf(players)

        return everyoneHasVoted
    }

    function getCurrentScore() {
        return rounds[roundIndex].getAllScores().map((playerScore) => {
            return {
                score: playerScore.score,
                player: players[playerScore.playerId]
            }
        })
    }

    function hasNextRound() {
        const hasNextRound = rounds.length < maxRounds

        return hasNextRound
    }

    function hasNextToVote() {
        return rounds[roundIndex].hasNextToVote()
    }

    return {
        id,
        addPlayer,
        removePlayerById,
        isFull,
        startRound,
        setAnswersForPlayer,
        getNextPlayerAnswers,
        vote,
        hasNextRound,
        hasNextToVote,
        getCurrentScore
    }
}
