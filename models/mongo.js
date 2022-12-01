const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(url);
//const url = 'mongodb+srv://phonebook:pupsinen31@cluster0.buh4i9t.mongodb.net/?retryWrites=true&w=majority'
//const password = process.argv[2]


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
