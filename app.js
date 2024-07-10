import express from 'express';
import { getNote, getNotes, createNotes } from './sql.js';
const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});
app.get('/notes/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const note = await getNote(id);
  res.send(note);
});

app.post('/notes', async (req, res) => {
  const { branch_id, br_name, addr } = req.body;
  const note = await createNotes(branch_id, br_name, addr);
  res.status(201).send(note);
});

app.listen(8080, () => {
  console.log('server is running on port 8080');
});
