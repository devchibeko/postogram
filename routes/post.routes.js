const Router = require('express')
const { findPostByAuthor, createPost, deletePost, userHasPost } = require('../services/post.service.js')
const authentificationMiddlewars = require('../middlewares/autentification.js')
const multer = require('multer')
const multerUpload = require('../middlewares/multer-upload.js')

const router = Router()

router.get('/posts/:username', authentificationMiddlewars, async (req, res) => {
  try {
    let posts = await findPostByAuthor(req.params.username)
    res.jaon({
      message: `User @${req.params.username} posts`,
      posts
    })
  }
  catch {
    res.status(500).json({
      message: err
    })
  }
})

router.post('/posts', authentificationMiddlewars, multerUpload.single('media'), async (req, res) => {
  try {
    const { title, description, mediaType } = req.body
    const media = req.file.filename
    const authorId = res.locals.user.id

    const newPost = await createPost(authorId, title, description, media, mediaType)

    res.json({
      message: 'Post created.',
      post: newPost
    })
  }
  catch {
    res.status(500).json({
      message: err
    })
  }
})

router.delete('/posts/:id', authentificationMiddlewars, async (req, res) => {
  try {
    
    const postId = req.params.id
    const userId = res.locals.user.id

    if (await userHasPost(userId, postId)) {
      const post = await deletePost(postId)

      res.json({
        message: 'Post deleted.',
        post
      })
    }
    else {
      res.status(400).json({
        message: 'You connot delete this post =)'
      })
    }

  }
  catch(err) {
    res.status(500).json({
      message: err
    })
  }
})




module.exports = router