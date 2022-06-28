let nodes =[];
let links = [];

const calculateAge = (birthday) => {
  const ageDifMs = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

//   if(parentz[0]) {
//     nodes = [...nodes, {"name":parentz[0].firstName,"lname": parentz[0].lastName, "register":parentz[0].register, "dob": calculateAge(parentz[0].dob), "label":parentz[0].labels[1],"id": parentz[0].firstName}]
//     }
// if(parentz[1]) {
//   nodes = [...nodes, {"name":parentz[1].firstName,"lname": parentz[1].lastName, "register":parentz[1].register, "dob": calculateAge(parentz[1].dob),"label":parentz[1].labels[1],"id": parentz[1].firstName}]
// }
//   links = [...links, {"source": parentz[0].firstName, "target": parentz[1].firstName, "type": "Гэрлэсэн"}]
//   links = [...links, {"source": parentz[1].firstName, "target": parentz[0].firstName}]

// childs.forEach( (item, index)=> {
//     if(item.labels[1]=="Эрэгтэй") {

//         nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register,"dob": calculateAge(item.dob), "label": item.labels[1], "id": item.firstName}]
//     links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Хүү"}]
//     links = [...links, {"source": parentz[1].firstName, "target": item.firstName, "type": "Хүү"}]
//     }
// })

// childs.forEach((item, index) => {
//     if(item.labels[1]=="Эмэгтэй") {

//         nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register, "dob": calculateAge(item.dob), "label": item.labels[1], "id": item.firstName}]
//     links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Охин"}]
//     links = [...links, {"source": parentz[1].firstName, "target": item.firstName, "type": "Охин"}]
// }
// });
if(parentz[0]) {
nodes = [...nodes, {"name":parentz[0].firstName,"lname": parentz[0].lastName, "register":parentz[0].register, "dob": parentz[0].dob, "label":parentz[0].labels[1],"id": parentz[0].firstName,"group": 1}]
}
if(parentz[1]) {
nodes = [...nodes, {"name":parentz[1].firstName,"lname": parentz[1].lastName, "register":parentz[1].register, "dob": parentz[1].dob,"label":parentz[1].labels[1],"id": parentz[1].firstName,"group": 2}]
}
links = [...links, {"source": parentz[0].firstName, "target": parentz[1].firstName, "type": "Гэрлэсэн"}]
links = [...links, {"source": parentz[1].firstName, "target": parentz[0].firstName}]

childs.forEach( (item, index)=> {
if(item.labels[1]=="Эрэгтэй") {

    nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register,"dob": item.dob, "label": item.labels[1], "id": item.firstName,"group": 1}]
links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Хүү"}]
links = [...links, {"source": parentz[1].firstName, "target": item.firstName, "type": "Хүү"}]
}
})

childs.forEach((item, index) => {
if(item.labels[1]=="Эмэгтэй") {

    nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register, "dob": item.dob, "label": item.labels[1], "id": item.firstName,"group": 2}]
links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Охин"}]
links = [...links, {"source": parentz[1].firstName, "target": item.firstName, "type": "Охин"}]
}
});
var naruto = {nodes:[],links:[]};
naruto.nodes = nodes;
naruto.links = links;