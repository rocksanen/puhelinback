

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Person = require('./models/mongo')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}



app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static('build'))
 


morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(
':method :url :status :res[content-length]' + 
' :response-time ms - :body - :req[content-length]'));





    
    app.get('/api/persons',(req,res) => { 
      Person.find({}).then(persons => {
        res.json(persons)
        console.log(persons);
      }) 
    })

     

    app.get('/api/info', (req,res) => {

        res.send(`
        <p>Phone book has info for ${persons.length} people </p>
        <p>${new Date()}</p>
        `)
    })

    app.get('/api/persons/:id', (req,res) => {
        
      Person.findById(req.params.id)
        .then(person => {
          if(person) {
            res.json(person)
          }else{
            res.status(404).end()
          }
        })
        .catch(error => next(error))
    })
 
    
    app.delete('/api/persons/:id', (req,res,next) => {

        Person.findOneAndRemove(req.params.id)
          .then(result => {
            res.status(204).end()
          })
          .catch(error => next(error))

    })

    app.put('/api/persons/:id', (req, res, next) => {

      const body = req.body
    
      const person = {
        name: body.name,
        number: body.number,
        id: body.id,
      }
    
      Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
          res.json(updatedPerson)
        })
        .catch(error => next(error))
    })

    

    app.post('/api/persons', (req,res) => {

        const body = req.body

        if (body.name === undefined) {
          return res.status(400).json({ error: 'content missing' })
        }

        console.log(body.number, body.name);

        const person = new Person({

            name: body.name,
            number: body.number
        })

        //let personExists = false
        //persons.map(person => {if(person.name.toLowerCase() === (body.name.toLowerCase())){personExists = true}return personExists})

        //const numberIsEmpty = Object.keys(person.number).length < 7

       /* if(!personExists && !numberIsEmpty) {

            persons = persons.concat(person)
            res.json(person)
               
        }else{

            return res.status(400).json({error:'Name must be unique or number is missing'})
        }
        */
       person.save().then(savedPerson => {
        res.json(savedPerson)
        console.log(savedPerson, "saved person");
       })
    })

    const phoneNumberGenerator = () => {

        const number = Math.floor(Math.random() * (10000000 - 1000000) + 1000000).toString()
        const area = '358'
        return `${area}-${number}`

    }

    const generateId = () => {

      let persons = Person.find({})

      console.log(persons, "tsekkaa tää");
        const maxId = persons.length > 0
          ? Math.max(...persons.map(n => n.id))
          : 0
        return maxId + 1
      }

    const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
    }

    app.use(unknownEndpoint)


    const errorHandler = (error, request, response, next) => {
      console.error(error.message)
    
      if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      }
    
      next(error)
    }
    
    
    app.use(errorHandler)

    const PORT = process.env.PORT || 3001;
    console.log(process.env.PORT);
    app.listen(PORT, () => {

      console.log(`Server running on port ${PORT}`)

    })
    