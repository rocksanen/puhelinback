
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

const cors = require('cors')

app.use(cors())

app.use(express.static('build'))
 


morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(
':method :url :status :res[content-length]' + 
' :response-time ms - :body - :req[content-length]'));





    let persons = [
      {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
      },
      {
        name: "Nalle Nallersson",
        number: "358-4545454545",
        id: 5
      },]




    
    app.get('/api/persons',(req,res) => { 
        
        res.json(persons)
        
    })

     

    app.get('/api/info', (req,res) => {

        res.send(`
        <p>Phone book has info for ${persons.length} people </p>
        <p>${new Date()}</p>
        `)
    })

    app.get('/api/persons/:id', (req,res) => {
        
        const id = Number(req.params.id)
        const person = persons.find(person => person.id === id)

        person ? res.json(person) : res.status(404).end()

    })
 

    app.delete('/api/persons/:id', (req,res) => {

      
        const id = Number(req.params.id)
        persons = persons.filter(note => note.id !== id)

        res.status(204).end()
    })

    app.post('/api/persons', (req,res) => {

        const body = req.body

        if(!body.name) {
            return res.status(400).json({
                error:'Name missing'
            })
        }

        console.log(body.number, body.name);

        const person = {

            name: body.name,
            number: body.number,
            id: generateId()
        }

        let personExists = false
        persons.map(person => {if(person.name.toLowerCase() === (body.name.toLowerCase())){personExists = true}return personExists})

        const numberIsEmpty = Object.keys(person.number).length < 7

        if(!personExists && !numberIsEmpty) {

            persons = persons.concat(person)
            res.json(person)
               
        }else{

            return res.status(400).json({error:'Name must be unique or number is missing'})
        }
    })

    const phoneNumberGenerator = () => {

        const number = Math.floor(Math.random() * (10000000 - 1000000) + 1000000).toString()
        const area = '358'
        return `${area}-${number}`

    }

    const generateId = () => {
        const maxId = persons.length > 0
          ? Math.max(...persons.map(n => n.id))
          : 0
        return maxId + 1
      }



    const PORT = process.env.PORT || 3001;
    console.log(process.env.PORT);
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`)