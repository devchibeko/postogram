const prisma = require("../config/database")

function createUser(username, password, fristName, lastName, age, token) {
    return prisma.user.create({
        data: {
            username,
            password,
            fristName,
            lastName,
            age,
            token
        }
    })
}


function findUserByToken(token) {
    return prisma.user.findUnique({
        where: {
            token
        }
    })
}




// check username
function findUser(username) {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}

module.exports = {
    createUser,
    findUser,
    findUserByToken
}