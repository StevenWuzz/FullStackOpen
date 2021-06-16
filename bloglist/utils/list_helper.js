const totalLikes = (blogs) => {
    var sum = 0
    for(var ind in blogs){
        sum += blogs[ind].likes
    }
    return sum
}

const favoriteBlog = (blogs) => {

    if(blogs.length === 0){
        return {}
    }

    var maxNumOfLikes = blogs[0].likes
    var favInd = 0
    for(var ind in blogs){
        if(blogs[ind].likes > maxNumOfLikes){
            maxNumOfLikes = blogs[ind].likes
            favInd = ind
        }
    }
    const favBlog = 
    {
        title: blogs[favInd].title,
        author: blogs[favInd].author,
        likes: blogs[favInd].likes,
    }
    return favBlog
}

module.exports = {totalLikes, favoriteBlog}