const { v4: uuidv4 } = require('uuid')
const app = require("./app")

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
