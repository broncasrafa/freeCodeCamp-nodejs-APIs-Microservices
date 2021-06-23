require('dotenv').config();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env['MONGO_URI'], {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});


let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var person = new Person({name: "Rafael Francisco", age: 37, favoriteFoods: ['pizza', 'hotdog', 'ppk']});

  person.save(function(err, data) {
    if (err) 
      return console.error(err);

    done(null, data)
  });
};

var arrayOfPeople = [
    {name: "Mirella Mansur", age: 26, favoriteFoods: ['pizza', 'hamburger', 'hotdog', 'miojo']},
    {name: "Mia Khalifa", age: 20, favoriteFoods: ['apple', 'hamburger', 'strawberry']},
    {name: "Piper Perri", age: 22, favoriteFoods: ['beringela', 'baguete', 'sausage']},
    {name: "Lana Rhoades", age: 28, favoriteFoods: ['fastfood', 'chocolate']},
  ];
const createManyPeople = (arrayOfPeople, done) => {  
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};


const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, docs) {
    if (err) return console.log(err);
    done(null, docs);
  });  
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, docs) {
    if (err) return console.log(err);
    done(null, docs);
  }); 
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, doc) {
    if (err) return console.log(err);
    done(null, doc);
  })
};


const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);
    person.save((err, doc) => {
      if (err) return console.log(err);
      done(null, doc);
    })
  })  
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const conditions = { name: personName};
  const updateTo = { age: ageToSet };
  const options = { new: true};

  Person.findOneAndUpdate(conditions, updateTo, options, function(err, person) {
    if (err) return console.log(err);
    done(null, person);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, function(err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  const conditions = { name: nameToRemove };
  Person.deleteOne(conditions, function(err, person) {
    if (err) return console.log(err);
    done(null, person);
  }); 
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
        .sort({ favoriteFoods: -1 })
        .limit(2)
        .select({ name: 1, favoriteFoods: 1 })
        .exec(function(err, data) {
          if (err) return console.log(err);
          done(null, data);
        })
};

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
