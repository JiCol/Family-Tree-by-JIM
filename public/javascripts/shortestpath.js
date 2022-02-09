// let nodes =[];
// let links = [];

//     childs.forEach( (item, index)=> {
//           nodes = [...nodes, {"name": item.start.properties.firstName, "label": item.start.labels[1], "id": item.start.properties.firstName}]
      
//   })
//     nodes = [...nodes, {"name": childs[childs.length-1].end.properties.firstName, "label": childs[childs.length-1].end.labels[1], "id": childs[childs.length-1].end.properties.firstName}]

// let tmpArr=[];
//     childs.forEach((item, index)=> {
//          tmpArr.push({"source":item.start.properties.firstName, "target":item.end.properties.firstName, "type": item.relationship.type});
//     })
//     links=[...tmpArr];


// var naruto = {nodes:[],links:[]};
// naruto.nodes = nodes;
// naruto.links = links;

let nodes =[];
let links = [];


const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
//huuchin
  //   childs.forEach( (item, index)=> {
  //         nodes = [...nodes, {"name": item.start.properties.firstName,"lname": item.start.properties.lastName,"register": item.star.properties.register, "dob": calculateAge(item.start.properties.dob), "label": item.start.labels[1], "id": item.start.properties.firstName}]
      
  // })
  //   nodes = [...nodes, {"name": childs[childs.length-1].end.properties.firstName,"lname": childs[childs.length-1].end.properties.lastName,"register": childs[childs.length-1].end.properties.register , "dob": calculateAge(childs[childs.length-1].end.properties.dob), "label": childs[childs.length-1].end.labels[1], "id": childs[childs.length-1].end.properties.firstName}]
//test
childs.forEach( (item, index)=> {
  nodes = [...nodes, {"name": item.start.properties.firstName,"lname": item.start.properties.lastName,"register": item.start.properties.register, "dob": calculateAge(item.start.properties.dob), "label": item.start.labels[1], "id": item.start.properties.firstName}]

})
nodes = [...nodes, {"name": childs[childs.length-1].end.properties.firstName,"lname": childs[childs.length-1].end.properties.lastName,"register": childs[childs.length-1].end.properties.register , "dob": calculateAge(childs[childs.length-1].end.properties.dob), "label": childs[childs.length-1].end.labels[1], "id": childs[childs.length-1].end.properties.firstName}]


let tmpArr=[];
    childs.forEach((item, index)=> {
         tmpArr.push({"source":item.start.properties.firstName, "target":item.end.properties.firstName, "type": item.relationship.type});
         tmpArr.push({"source":item.end.properties.firstName, "target":item.start.properties.firstName});
    })
    links=[...tmpArr];


var naruto = {nodes:[],links:[]};
naruto.nodes = nodes;
naruto.links = links;