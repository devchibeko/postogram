//-> hi bitch <-//

const Router = require('express')
// const multerUpload = require('../middlewares/multer-upload.js')

const router = Router()


// router.post('/upload', multerUpload.single('avatar'), (req, res) => {
//   console.log('File upload: ' + req.file.filename);
//   res.send(req.file.filename)
// })


router.get('/download/:filename', (req, res) => {
  res.sendFile(req.params.filename, { root: './storage' })
})

module.exports = router