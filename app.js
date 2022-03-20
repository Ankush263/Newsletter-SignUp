const express = require('express')
const bodyParser = require('body-parser') 
const request = require('request')
const https = require('https')
const app = express()
const port = process.env.PORT

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/signup.html')
  
})

app.post('/', (req, res) => {
  const fName = req.body.fName
  const lName = req.body.lName
  const email = req.body.email

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data)

  const url = `https://us14.api.mailchimp.com/3.0/lists/35e6d9154b`

  const options = {
    method: "POST",
    auth: "ankush1:e8dd936f2eeacd9fe085fd3528cbf03c-us14"
  }

  const request = https.request(url, options, (response) => {

    const statusCode = response.statusCode

    if(statusCode === 200) {

      res.sendFile(__dirname + '/success.html')

    } else {

      res.sendFile(__dirname + '/failure.html')

    }

    response.on('data', (data) => {
  
    })

  })

  request.write(jsonData)
  request.end()

  app.post('/failure', (req, res) => {
    res.redirect('/')
  })

})

app.listen(port || 3000, () => {
  console.log(`You are listening to the port ${port}`)
})
