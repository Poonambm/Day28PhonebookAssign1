const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny'))

//step 3.8
morgan.token('ob', function (req, res) { 
  if (req.method === 'POST'){
  console.log("ob", req.body)
  return `${JSON.stringify(req.body)}` }})

app.use(morgan(':method :url :status :response-time :req[header] :ob'))
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

  //step 1 & 3.7
app.get('/api/persons', morgan('tiny'), (request, response) => {
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
  if(request.body.name === undefined || request.body.name ==''){
    response.status(500).json({ 
    error: 'name is missing' 
    }).end()
    return false;
}

if(request.body.number === undefined || request.body.number ==''){
    response.status(500).json({ 
    error: 'number is missing' 
    }).end()
    return false;
}

const person = persons.find(obj => obj.name === request.body.name)

if (person) {
    response.status(500).json({ 
        error: ' The name already exists in the phonebook ! ' 
    }).end()
    return false;
} else {
    let newPerson = { 
        id : Math.random(),
        name:request.body.name ,
        number : request.body.number
    }

    persons = persons.concat(newPerson)
} 
});
  
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})