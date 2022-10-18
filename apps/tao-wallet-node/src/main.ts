import express = require('express')
import { environment } from './environments/environment'

const app = express()
const port = environment.port

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})