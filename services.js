//This class has the detailed code that returns the data we want

const fs = require('fs');
const path = require('path');

let gamesData = "Error: no games data available";
const games = fs.readFileSync(path.join(__dirname, './games.json'));
if (games.length !== 0) {
    gamesData = JSON.parse(games);
}

const getReport = () => {
    if (gamesData === "Error: no games data available") {
        return gamesData;
    }
    //included in final body
    var highestRatedGame = "";
    var mostLikes = 0;
    //included in final body
    var averageLikesPerGame = [];
    var commentUser = [];
    gamesData.forEach(game => {
        var title = game.title;
        var averageLikes = 0;
        var totalLikes = 0;
        var likesCount = 0;
        these_comments = game.comments;
        these_comments.forEach(comment => {
            commentUser.push(comment.user);

            likesCount++;
            totalLikes += comment.like;
        });

        if (highestRatedGame === "") {
            highestRatedGame = game.title;
            mostLikes = game.likes;
        } else {
            if (game.likes > mostLikes) {
                highestRatedGame = game.title;
                mostLikes = game.likes;
            }
        }

        averageLikes = Math.round(totalLikes / likesCount);
        var titleLikesBody = { "title": title, "average_likes": averageLikes };
        averageLikesPerGame.push(titleLikesBody);

    });
    //included in final body
    var mostCommentUser = commentUser.sort((a, b) =>
        commentUser.filter(v => v === a).length - commentUser.filter(v => v === b).length).pop();


    var finalReport = {
        "user_with_most_comments": mostCommentUser,
        "highest_rated_game": highestRatedGame,
        "average_likes_per_game": averageLikesPerGame
    }

    return finalReport;
}

const getGame = (id) => {
    if (gamesData === "Error: no games data available") {
        return gamesData;
    }

    var this_game = gamesData.find(game => game.id === Number(id));
    if (this_game) {
        return this_game;
    } else {
        return "This game doesn't exist";
    }
}

module.exports = {
    gamesData, getReport, getGame
};