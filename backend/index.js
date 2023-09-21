const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"test":["one", "two", "three", "four"]})
})

app.listen(5000, () => {console.log("teste3")})