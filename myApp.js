require('dotenv').config();
let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})



const Person = mongoose.model("Person", personSchema);


// const createAndSavePerson = (done) => {
//   done(null /*, data*/);
// };
const createAndSavePerson = (done) => {
  var peterSmalls = new Person({name: "Peter Smalls", age: 48, favoriteFoods: ["Soup", "Rice"]})
  peterSmalls.save(function(err, data){
    if (err) return console.log(err);
    done(null, data);
  })
  
};

// const createManyPeople = (arrayOfPeople, done) => {
//   done(null /*, data*/);
// };

var arrayOfPeople = [
  {name: "Steve Young", age: 27, favoriteFoods:["potatoes", "rice"]},
  {name: "Ray Stratos", age: 55, favoriteFoods:["eggs", "bannanas"]},
  {name: "Jose Estrada", age: 22, favoriteFoods:["beans", "tacos"]}
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data){
    if (err) return console.log(err);
    done(null, data)
  })
};


// const findPeopleByName = (personName, done) => {
//   done(null /*, data*/);
// };
var personName = "Ray Stratos"
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data){
    if (err) return console.log(err);
    done(null, data)
  })
};

// const findOneByFood = (food, done) => {
//   done(null /*, data*/);
// };
var food = "rice"
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if (err) return console.log(err);
    done(null, data)
  })
  
};

// const findPersonById = (personId, done) => {
//   done(null /*, data*/);
// };

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if (err) return console.log(err);
    done(null, data)
  })
  
};

// const findEditThenSave = (personId, done) => {
//   const foodToAdd = "hamburger";

//   done(null /*, data*/);
// };
  
// };
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};


// const findAndUpdate = (personName, done) => {
//   const ageToSet = 20;

//   done(null /*, data*/);
// };
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  //function findOneAndUpdate(filter, update, options) {}
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updateDoc)=>{
    if (err) return console.log(err);
    done(null, updateDoc)
  })
};


// const removeById = (personId, done) => {
//   done(null /*, data*/);
// };
const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, (err, updateDoc)=>{
    if (err) return console.log(err);
    done(null, updateDoc)
  })
  
};

// const removeManyPeople = (done) => {
//   const nameToRemove = "Mary";

//   done(null /*, data*/);
// };
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removed) => {
    if (err) return console.log(err);
    done(null, removed)
  })

};


// const queryChain = (done) => {
//   const foodToSearch = "burrito";

//   done(null /*, data*/);
// };
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})// Here: 1 for ascending	order and -1 for descending order.
  .limit(2)//Limit results to 2
  .select({age: 0})
  .exec(function (err, data){
    if (err) return console.log(err);
    done(null, data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

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
