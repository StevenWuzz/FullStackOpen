const totalLikes = require("../utils/list_helper")

describe("Total Likes", () => {
    const blogs = [{
        "title": "A Day in a Life of a CS Student",
        "author": "Sergio Vieri",
        "url": "http://sergiovieri.diary.com",
        "likes": 150
    }]

    test("When the list has only one blog, the total likes is equal to the blog's likes", () => {
        const result = totalLikes(blogs)
        expect(result).toBe(150)
    })
})