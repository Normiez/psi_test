const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid')

const privateKey = 'HGALSDHGOIAHWEKACoihashdgaslb'

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/auth', urlencodedParser, (req,res) => {
    // Cookies.set('username', 'hello', { expires: 1 })
    const username = 'Sangkuriang'
    const data = jwt.sign({
        id: uuidv4(),
        username
      }, privateKey, { expiresIn: '3h' })
      
    //   const cokie = Cookies.set('use rname', username, { expires: 365 })

      res.send({
        key: 'Bearer ' + data
      })
})

app.post('/checkout',urlencodedParser, (req, res) => {
    if(req.body.discount != null && Number(req.body.total_item) >= 5000000){
        let data = Number(req.body.total_item) / Number(req.body.discount)
        res.send('Point ' + Math.round(data * 2/100))
    }else{
        res.send('Hasil ' + req.body.total_item + ', anda tidak mendapat poin')
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})