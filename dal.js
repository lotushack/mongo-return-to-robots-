const MongoClient = require('mongodb').MongoClient
, assert =  require('assert');
const url = 'mongodb://localhost:27017/return-to-robots';
// MongoClient.connect(url, function(err, db){
//   assert.equal(null, err);
//   console.log("Connect successfully to the server.");
//   console.log("Current database", db.databaseName);
//   // db.close();
// })
let users = []
let employed = []
let unemployed = []


function getAllBots(err, db){
  const collection = db.collection('users')
  collection.find({}).toArray(function(err, bots){
    users = bots

  })
}


function getUnemployedRobots(err, db){
  const collection = db.collection('users')
  collection.find({job: null}).toArray(function(err, bots){
    unemployed = bots
    // console.log(unemployed);
  })
}
function getEmployedRobots(err, db){
  const collection = db.collection('users')
  collection.find({job: {$ne: null}}).toArray(function(err, bots){
    employed = bots
    // console.log(employed);
  })
}
function connectMongodb(urlStr, cb){
  MongoClient.connect(urlStr, cb)
}

function getRobos(){
  MongoClient.connect(url, getAllBots)
}

function getAllUnemployed(){
  MongoClient.connect(url, getUnemployedRobots)
}

function getAllEmployed(){
  MongoClient.connect(url, getEmployedRobots)
}

bots = connectMongodb(url, getAllBots)
unemployed = connectMongodb(url, getUnemployedRobots)
employed = connectMongodb(url, getEmployedRobots)

function getRobots(cb){
  return bots
}


function getUnemployed(){
  return unemployed
}

function getEmployed(){
  // console.log(employed);
  return employed
}

function getUsers () {
  return users
}

module.exports ={
  getUnemployed,
  getEmployed,
  getUsers,
  getRobos,
  getAllUnemployed,
  getAllEmployed,
}
