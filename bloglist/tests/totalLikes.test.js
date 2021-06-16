const totalLikes = require("../utils/list_helper").totalLikes

describe("Total Likes", () => {
    const listWithSingleBlog = [{
        "title": "A Day in a Life of a CS Student",
        "author": "Sergio Vieri",
        "url": "http://sergiovieri.diary.com",
        "likes": 150
    }]

    test("When the list has only one blog, the total likes is equal to the blog's likes", () => {
        const actualResult = totalLikes(listWithSingleBlog)
        expect(actualResult).toBe(150)
    })

    const listWithMultipleBlogs = [
        {
            "title": "A Day in a Life of a CS Student",
            "author": "Sergio Vieri",
            "url": "http://sergiovieri.diary.com",
            "likes": 150
        },
        {
            "title": "Once Upon a Time",
            "author": "Steven Hans Limantoro",
            "url": "http://stevenlimantoro.diary.com",
            "likes": 55
        },
        {
            "title": "I Am Finally Employed!",
            "author": "Felix Johnson",
            "url": "http://johnson.diary.com",
            "likes": 1000
        },
    ]
    test("When the list has multiple blogs, the total likes is the sum of all the blogs' likes", () => {
        const actualResult = totalLikes(listWithMultipleBlogs)
        const expectedResult = 1000 + 150 + 55
        expect(actualResult).toBe(expectedResult)
    })

    const listWithNoBlogs = []
    test("When the list has no blogs, the total likes 0", () => {
        const actualResult = totalLikes(listWithNoBlogs)
        expect(actualResult).toBe(0)
    })
})