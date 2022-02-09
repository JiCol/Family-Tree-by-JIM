
// const neo4j = require('neo4j-driver');
// const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', '123test'));
// const session = driver.session({
//   database: 'realfamilytree'
// });

const neo4j = require('neo4j-driver');
const uri = 'neo4j+s://14f4bfca.databases.neo4j.io';
 const user = 'neo4j';
 const password = 'CCr7907w5u5G-mw6QicIuEZR86-LKKpjOdNO0iSXJmI';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
const session = driver.session({
  database: 'neo4j'
});

module.exports.addUser = async function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var register = req.body.register;
  var dob = req.body.dob;
  var S1 = req.body.S1;
        const query = 'CREATE(n:Person:input1 {register: $register, firstName: $firstName, lastName: $lastName, dob: $dob}) RETURN n';
        const obj = query.replace('input1', S1);
        // try{}
  await session.writeTransaction((txc) => {
    txc.run(obj,{
      register: register,
      firstName: firstName,
      lastName: lastName,
      dob: dob
    })
      .then(function (result) {
        res.redirect('/success');
      })
      .catch(function (err) {
        res.render('error1');
      });
  })
  .catch((err) => {
    console.log('Register davhtsaad baih shig bn')
  })
};

module.exports.connectParents = function(req,res){
    var register = req.body.register;
    var register1 = req.body.register1;
    var R1 = req.body.R1;
    var R2 = req.body.R2;
        const query = 'MATCH (a:Person {register: $register})\
        MATCH(b:Person {register: $register1})\
          CREATE (a)-[:input1]->(b)\
          CREATE (b)-[:input2]->(a)\
          RETURN a, b';
        const obj = query.replace('input1', R1).replace('input2', R2);
    session.writeTransaction(txc => {
        txc.run(obj,{
          register: register,
          register1: register1
        })
        .then(function(result){
          res.redirect('/success');
        })
        .catch(function(err){
          console.log(err);
        });
      })
  };

  module.exports.connectPartner = function(req,res){
    var register = req.body.register;
    var register1 = req.body.register1;
    var L1 = req.body.L1;
        const query = 'MATCH (a:Person {register: $register})\
        MATCH (b:Person {register: $register1})\
          CREATE (a)-[:input1]->(b)\
          CREATE (b)-[:input1]->(a)\
          RETURN a, b';
        const obj = query.replaceAll('input1', L1);
    session.writeTransaction(txc => {
        txc.run(obj,{
          register: register,
          register1: register1
        })
        .then(function(result){
          res.redirect('/success');
        })
        .catch(function(err){
          console.log(err);
        });
      })
  };

  module.exports.firstLevel = async function (req, res) {
    var S1 = req.query.S1;
    const query1 = "match (p:Person{register:'input'})<-[:Хүү|:Охин]-(p1:Person) return p1";
    const obj1 = query1.replace('input', S1);
    const query2 = "match (p:Person{register:'input'})-[f:Аав]->(p1:Person)<-[m:Гэрлэсэн]-(p2:Person)-[:Хүү|:Охин]->(p3:Person) return p3";
    const obj2 = query2.replace('input', S1);
    // Person
    const execution = await session.readTransaction(async (trun) => {
      const parents = await trun.run(obj1);
      const persons = await trun.run(obj2);
      let personArr = [], guyArr = [];
      for (let i = 0; i < parents.records?.length; i+=1) {
        personArr.push({
                  id: parents.records[i]._fields[0].identity.low,
                  register: parents.records[i]._fields[0].properties.register,
                  firstName: parents.records[i]._fields[0].properties.firstName,
                  lastName: parents.records[i]._fields[0].properties.lastName,
                  dob: parents.records[i]._fields[0].properties.dob,
                  labels: parents.records[i]._fields[0].labels
                });
      }
      for (let j = 0; j < persons.records?.length; j+=1) {
        guyArr.push({
                        id: persons.records[j]._fields[0].identity.low,
                        register: persons.records[j]._fields[0].properties.register,
                        firstName: persons.records[j]._fields[0].properties.firstName,
                        lastName: persons.records[j]._fields[0].properties.lastName,
                        dob: persons.records[j]._fields[0].properties.dob,
                        labels: persons.records[j]._fields[0].labels
                      })
      }
      return {
        persons: personArr, 
        guys: guyArr,
        isDone: true
      };
    });

    return res.render('pages/resultfirstlevel', execution);
  };

  module.exports.shortestPath = async function (req, res) {
    var S1 = req.query.S1;
    var S2 = req.query.S2;
    const query1 = "MATCH shortestCount=shortestPath((firstPerson:Person {register: 'input1'})-[*1..100]-(secondPerson:Person {register: 'input2'}))\
    RETURN shortestCount";
    const obj1 = query1.replace('input1', S1).replace('input2', S2);

    const execution = await session.readTransaction(async (trun) => {
      const parents = await trun.run(obj1);
      let personArr = [];
      for (let i = 0; i < parents.records?.length; i+=1) {
          for(let j = 0; j < parents.records[i]._fields.length; j+=1)
          for(let k = 0; k < parents.records[i]._fields[j].segments.length; k+=1)
        personArr.push({
                  ...parents.records[i]._fields[j].segments[k]
                })      
      }
      return {
        persons: personArr,
        isDone: true
      };
    });
    return res.render('pages/resultshortestpath', execution);
    
  };
    
    