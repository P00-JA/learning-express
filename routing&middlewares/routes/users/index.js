const express = require('express')
const router = express.Router();
router.use(express.json());

// GET method route 
//query parameter ,it comes after a question mark with = sign
router.get('/', (req, res) => {
    res.send(`<h1>${req.query.id}  ${req.query.login}</h1>`)
  })


router.get('/new-user', (req, res) => {
    res.send('<h1>Yes I am a new user!</h1>')
  })

router.get('/new-user/:username', (req, res) => {
    res.render('profile');
  })
// dynamic routing
router.get('/new-user/:username/:company', (req, res) => {
    res.send(`<h1>Hello ${req.params.username} welcome to ${req.params.company} family.</h1>`)
  })


module.exports = router;