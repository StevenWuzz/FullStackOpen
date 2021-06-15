const totalLikes = (blogs) => {
    var sum = 0
    for(var ind in blogs){
        sum += blogs[ind].likes
    }
    return sum
}

module.exports = totalLikes