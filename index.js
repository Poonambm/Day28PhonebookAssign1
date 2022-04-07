const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  //step 1
app.get('/api/persons', (request, response) => {
  response.json(persons);
});
//step 3
app.get('/api/persons/:id', (request, response) => {
   const id = Number(request.params.id)
   const person = persons.find(obj => obj.id === id)
    if (person) {
         response.json(person)
    } else {
        response.status(404).end()
    } 
});

//step 2
app.get('/info', (request, response) => {
        response.json("Phonebook has info for "+persons.length+" people "+new Date())
});
//step 4
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    response.json(persons)
    response.status(204).end()
});

// step5
app.post('/api/persons/', (request, response) => {
    
});
  
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})