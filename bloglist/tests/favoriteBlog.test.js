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

    test("When the list has multiple blogs, the most favorite blog is the blog with biggest number of likes", () => {
        const actualResult = favoriteBlog(listWithMultipleBlogs)
        const expectedResult = 
        {
            "title": "I Am Finally Employed!",
            "author": "Felix Johnson",
            "likes": 1000
        }
        expect(actualResult).toEqual(expectedResult)
    })
    
    const listWithNoBlog = []
    test("When the list has no blog, the most favorite blog is an empty object", () => {
        const actualResult = favoriteBlog(listWithNoBlog)
        const expectedResult = {}
        expect(actualResult).toEqual(expectedResult)
    })
})