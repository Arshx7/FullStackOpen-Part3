let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
function getCurrentTime() {
  const date = new Date();
  return `<p>Phonebook has info for ${
    persons.length
  } people</p> ${date.toString()}`;
}

const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hellllooooo</<h1>");
});
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(getCurrentTime());
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => id === person.id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => id !== person.id);
  console.log(persons);
  res.status(204).end();
});

app.post("/api/persons/", (req, res) => {
  const person = req.body;

  if (!person.name) {
    return res.status(400).json({ error: "Name is missing" });
  }

  if (!person.number) {
    return res.status(400).json({ error: "Number is missing" });
  }

  const nameExists = persons.find((p) => p.name === person.name);
  if (nameExists) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  let id = Math.floor(Math.random() * 1000000);
  const newPerson = { ...person, id: String(id) };
  persons = persons.concat(newPerson);

  res.status(201).json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
