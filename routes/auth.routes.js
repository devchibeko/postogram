const { Router } = require("express")
const { createUser, findUser } = require('../services/user.service.js')
const md5 = require('md5')

const router = Router()

router.post("/login", async (req, res) => {

    const { username, password } = req.body

    const existsUser = await findUser(username)

    if (!existsUser) {
        res.status(400).json({
            message: `User with username ${username} not found.`
        })
    }
    else if (existsUser.password !== password) {
        res.status(400).json({
            message: `Wrong username or password.`
        })
    }
    else {
        res.status(201).json({
            message: "Successful legged in!",
            user: {
                username: existsUser.username,
                token: existsUser.token
            }
        })
    }
})



router.post("/register", async (req, res) => {
    const { username, password, fristName, lastName, age } = req.body
    const existUser = await findUser(username)

    if (existUser) {
        res.status(400).json({
            message: `User with username ${username} already exists.`
        })
    }
    else {
        const token = md5(`${username}':'${password}`)
        const newUser = await createUser(username, password, fristName, lastName, age, token)

        res.status(201).json({
            message: "Create!",
            user: {
                username,
                token
            }
        })
    }
})


module.exports = router