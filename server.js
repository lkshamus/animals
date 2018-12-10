const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);

app.locals.animals = [
  {type: 'lion', name: 'simba'},
  {type: 'giraffe', name: 'peter'},
  {type: 'tiger', name: 'tina'},
  {type: 'moose', name: 'pasta'}
]

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.get('/api/v1/animals', (request, response) => {
  response.status(200).json(app.locals.animals)
})

app.post('/api/v1/animals', (request, response) => {
  const animal = request.body 

    for(let requiredProperty of ['type', 'name']) {
    if(animal[requiredProperty] === undefined) {
      missingProperties = [...missingProperties, requiredProperty]
    }
  }

  if(missingProperties.length) {
    response.status(422).send({ message: `Missing ${missingProperties} in request` })
  } else {

    app.locals.animals = [...app.locals.animals, animal]
    
    response.status(201).json({
    message: 'animal has been added!!!'
  })
  }
})

app.listen(app.get('port'), () => {
  console.log(`Animal server is running on http://localhost:${app.get('port')}`);
});