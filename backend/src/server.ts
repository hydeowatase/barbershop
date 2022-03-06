import express, { response } from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'Upa Upa --- Hello GoStack' });
});

app.listen(3333, () => {
  console.log('Listen on port 3333');
});
