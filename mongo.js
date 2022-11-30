const mongoose = require('mongoose')

/*
if(process.argv.length < 3) {

    console.log('give password as argument');
    process.exit(1)
}
*/

//const password = process.argv[2]

const url = `mongodb+srv://phonebook:pupsinen31@cluster0.buh4i9t.mongodb.net/phonebook?retryWrites=true&w=majority`

//mongoose.connect(url)



  console.log('connecting to', url)


  mongoose.connect(url)
    .then(result => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    })
  
    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
        id: Number,
      })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Person', personSchema)
