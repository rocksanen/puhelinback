const mongoose = require('mongoose')

if(process.argv.length < 3) {

    console.log('give password as argument');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://phonebook:${password}@cluster0.buh4i9t.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Date,
    id: Number,
  })

const Person = mongoose.model('Person', personSchema)
/*
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
    */

    const person = new Person({

        name: "Arto Hellas",
        number: "040-123456",
        id: 1

    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
      })


    export  default function getPersons() {
        Person.find({}).then(result => {
            result.forEach(person => {
                return person
            })
        
            mongoose.connection.close()
        })



    }


  /*
  const persons = [

    new Person({
        content: 'Ville Virtanen',
        date: new Date(),
        important: true,
      }),
    
      new Person({
        content: 'Nalle Markkunen',
        date: new Date(),
        important: true,
      }),
    
      new Person({
        content: 'Pelle Hermanni',
        date: new Date(),
        important: true,
      })
  ]

  //persons.map(person => person.save())

  */
  

  
  

 /*
  person1.save().then(result => {
    console.log('person saved')
    mongoose.connection.close()
  })

  person2.save().then(result => {
    console.log('person saved')
    mongoose.connection.close()
  })
  person3.save().then(result => {
    console.log('person saved')
    mongoose.connection.close()
  })

  */





//export {//getPersons}
