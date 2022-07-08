const Router = require('express')
const authentification = require('../middlewares/autentification.js')

const router = Router()

router.get('/verify', authentification, async (req, res) => {
   
  const { username, fristName, lastName, age, avatar } = res.locals.user

  res.json({
    message: 'Successfuly authentificated',
    user: {
      username,
      fristName,
      lastName,
      avatar,
      age
    }
  })

})


module.exports = router