const express = require('express')
const app = express()
const cors = require('cors')
const knex = require('./knex')
const bodyParser = require('body-parser');
//const { DatabaseError } = require('pg')
const PORT = process.env.PORT || 8080

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.set('port', PORT)


app.get('/', (request, response) => {
  response.status(200).json({
    smoke: "test"
  })
})

app.get('/api/v1/romcom-data', async (request, response) => {
  const romcomData = await knex.select().from('romcomData')
  response.status(200).json(romcomData)
})

app.post('/api/v1/romcom-data', async (request, response) => {
  for (let requiredParameter of ['title', 'descriptor1', 'descriptor2', 'url']) {
    if (!request.body[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: {title: <String>, descriptor1: <String>, descriptor2: <String>, url: <String>. You're missing a "${requiredParameter}" property.` });
    }
  }
  try {
    const romcom = await knex('romcomData').insert(request.body, ['title', 'descriptor1', 'descriptor2', 'url'])
    response.status(201).json(romcom[0])
  } catch (error) {
    console.error(error)
    response.status(500).json(error)
  }
})

app.delete('/api/v1/romcom-data/:id', async (request, response) => {
  try {
    await knex('romcomData').where('id', Number(request.params.id)).del()
    response.status(200).json({ response: `Romcom with id:${request.params.id} was deleted` })
  } catch (error) {
    response.status(500).json(error)
  }
})

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})