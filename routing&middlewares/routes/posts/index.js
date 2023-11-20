
const express = require('express')
const router = express.Router();

// GET method route
router.get('/', (req, res) => {
    res.send('let see a surprise')
  })

//post
router.get('/surprise', (req, res) => {
    res.send('<h1>Hi.. Hii...Hiii....April Fool!!</h1>')
  })

module.exports = router;