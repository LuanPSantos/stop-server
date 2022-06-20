import { lengthOf } from "../../index.js"

export function createRound() {

    let answers = {}
    let answersIndex = 0

    function setAnswersForPlayer(playerId, playerAnswers) {
        answers[playerId] = { answer: playerAnswers, allVotes: [] }
    }

    function countTotalAnswers() {
        return lengthOf(answers)
    }

    function getRandomLetter() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        const randomIndex = Math.floor(Math.random() * alphabet.length);

        return alphabet[randomIndex]
    }

    function votePlayerAnswers(playerId, votes) {
        answers[playerId].allVotes.push(votes)
    }

    function countTotalVotesForPlayerAnswers(playerId) {
        return answers[playerId].allVotes.length
    }

    function hasNextToVote() {
        return answersIndex < lengthOf(answers)
    }

    function getNextPlayerAnswers() {
        const playerId = Object.getOwnPropertyNames(answers)[answersIndex]

        answersIndex++

        return {
            playerId,
            answers: answers[playerId].answer
        }
    }

    function getAllScores() {
        const scores = Object.getOwnPropertyNames(answers)
            .map((playerId) => {
                const answer = answers[playerId]

                return answer.allVotes
                    .reduce((acc, vote) => {
                        return {
                            playerId,
                            score: {
                                name: vote.name + acc.score.name,
                                place: vote.place + acc.score.place,
                                sport: vote.sport + acc.score.sport,
                                animal: vote.animal + acc.score.animal,
                                color: vote.color + acc.score.color,
                                fruit: vote.fruit + acc.score.fruit,
                                movie: vote.movie + acc.score.movie
                            }
                        }
                    }, {
                        playerId,
                        score: {
                            name: 0,
                            place: 0,
                            sport: 0,
                            animal: 0,
                            color: 0,
                            fruit: 0,
                            movie: 0
                        }
                    })
            }).map((playerScore) => {
                return {
                    playerId: playerScore.playerId,
                    score: Object.values(playerScore.score).map((scoreValue) => {
                        if(scoreValue <= 0) {
                            return 0
                        }

                        return 1
                    }).reduce((acc, scoreValue) => {
                        return acc + scoreValue
                    }, 0)
                }
            })

        return scores
    }

    return {
        letter: getRandomLetter(),
        answers,
        setAnswersForPlayer,
        countTotalAnswers,
        votePlayerAnswers,
        countTotalVotesForPlayerAnswers,
        hasNextToVote,
        getNextPlayerAnswers,
        getAllScores
    }
}