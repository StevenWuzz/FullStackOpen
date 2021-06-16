const favoriteBlog = require("../utils/list_helper").favoriteBlog

describe("Favorite Blog", () => {
    const listWithSingleBlog = [{
        "title": "A Day in a Life of a CS Student",
        "author": "Sergio Vieri",
        "url": "http://sergiovieri.diary.com",
        "likes": 150
    }]

    test("When the list has only one blog, the most favorite blog is that blog itself", () => {
        const actualResult = favoriteBlog(listWithSingleBlog)
        const expectedResult = 
        {
            "title": "A Day in a Life of a CS Student",
            "author": "Sergio Vieri",
            "likes": 150
        }
        expect(actualResult).toEqual(expectedResult)
    })
})