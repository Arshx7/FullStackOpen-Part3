const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
console.log(process.argv);
const url = `mongodb+srv://Arsh:${password}@phonebook.8nivo.mongodb.net/?retryWrites=true&w=majority&appName=phonebook`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personScheme = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personScheme);
if (name && number) {
  const person = new Person({
    name,
    number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
