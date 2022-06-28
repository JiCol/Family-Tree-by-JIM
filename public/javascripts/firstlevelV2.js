try{
let nodes = [];
var links = [];

  const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }


if(parentz[0]) {
  nodes = [...nodes, {"name":parentz[0].firstName,"lname": parentz[0].lastName, "register":parentz[0].register, "dob": parentz[0].dob, "label":parentz[0].labels[1],"id": parentz[0].firstName, "group": 1}]
}
if(parentz[1]) {
  nodes = [...nodes, {"name":parentz[1].firstName,"lname": parentz[1].lastName, "register":parentz[1].register, "dob": parentz[1].dob, "label":parentz[1].labels[1],"id": parentz[1].firstName, "group": 2}]
}
  
  // if(childs.length>0){
  // links = [...links, {"source": parentz[0].firstName, "target": parentz[1].firstName, "type": "Гэрлэсэн"}]
  // links = [...links, {"source": parentz[1].firstName, "target": parentz[0].firstName}]

childs.forEach( (item, index)=> {
    if(item.labels[1]==="Эрэгтэй" && new Date(item.dob)>new Date(parentz[0].dob)) {

        nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register,"dob": item.dob, "label": item.labels[1], "id": item.firstName, "group": 1}]
    links = [...links, {"source": item.firstName, "target": parentz[0].firstName, "type": "Аав"}]
    links = [...links, {"source": item.firstName, "target": parentz[1].firstName, "type": "Ээж"}]
    }
})

childs.forEach((item, index) => {
    if(item.labels[1]==="Эмэгтэй" && new Date(item.dob)>new Date(parentz[1].dob)) {

        nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register, "dob": item.dob, "label": item.labels[1], "id": item.firstName, "group": 2}]
        links = [...links, {"source": item.firstName, "target": parentz[0].firstName, "type": "Аав"}]
        links = [...links, {"source": item.firstName, "target": parentz[1].firstName, "type": "Ээж"}]
}
})

// if(brothers.length>0){
//   brothers.forEach( (item, index)=> {
//     if(item.labels[1]==="Эрэгтэй"&&calculateAge(item.dob)<calculateAge(parentz[0].dob)) {
  
//         nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register,"dob": calculateAge(item.dob), "label": item.labels[1], "id": item.firstName}]
//     links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Дүү"}]
//     }
//   })
//   brothers.forEach( (item, index)=> {
//   if(item.labels[1]==="Эрэгтэй"&&calculateAge(item.dob)>calculateAge(parentz[0].dob)) {
  
//       nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register,"dob": calculateAge(item.dob), "label": item.labels[1], "id": item.firstName}]
//   links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Ах"}]
//   }
//   })
  
//   brothers.forEach((item, index) => {
//     if(item.labels[1]==="Эмэгтэй"&&calculateAge(item.dob)<calculateAge(parentz[0].dob)) {
  
//         nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register, "dob": calculateAge(item.dob), "label": item.labels[1], "id": item.firstName}]
//     links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Дүү"}]
//   }
//   })
//   brothers.forEach((item, index) => {
//   if(item.labels[1]==="Эмэгтэй"&&calculateAge(item.dob)>calculateAge(parentz[0].dob)) {
  
//       nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register, "dob": calculateAge(item.dob), "label": item.labels[1], "id": item.firstName}]
//   links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Эгч"}]
//   }
//   })
// }

if(brothers.length>0){
  brothers.forEach( (item, index)=> {
    if(item.labels[1]==="Эрэгтэй" && new Date(item.dob)>new Date(parentz[0].dob)) {
  
        nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register,"dob": item.dob, "label": item.labels[1], "id": item.firstName, "group": 1}]
    links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Дүү"}]
    console.log("1");
    }
    
    else if(item.labels[1]==="Эрэгтэй" && new Date(item.dob)<new Date(parentz[0].dob)) {
  
      nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register,"dob": item.dob, "label": item.labels[1], "id": item.firstName, "group": 1}]
  links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Ах"}]
  console.log("2");
  }
  else if(item.labels[1]==="Эмэгтэй" && new Date(item.dob)>new Date(parentz[0].dob)) {
  
        nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register, "dob": item.dob, "label": item.labels[1], "id": item.firstName, "group": 2}]
    links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Дүү"}]
    console.log("3");
  }
    else if(item.labels[1]==="Эмэгтэй" && new Date(item.dob)<new Date(parentz[0].dob)) {
  
      nodes = [...nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register, "dob": item.dob, "label": item.labels[1], "id": item.firstName, "group": 2}]
  links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Эгч"}]
  console.log("4");
  }
  })

} 
// var naruto = {};
// if(r && r.links && r.nodes && r.links.length > 0 && r.nodes.length > 0){
//   naruto = {links: [...links, ...r.links], nodes: [...nodes, ...r.nodes], nodess: []};
//   for(let i = 0; i < naruto.links.length; i ++) naruto.links[i].index = i;
//   let k = 0;
//   for(let i = 0; i < naruto.nodes.length; i ++){
//     let j;
//     for(j = 0; j < i; j ++){
//         if(naruto.nodes[i].register != naruto.nodes[j].register) continue;
//         else break;
//     }
//     if(j == i){
//       naruto.nodess[k] = naruto.nodes[i];
//         k++;
//     }
//   }
//   naruto.nodes = naruto.nodess;
//   delete naruto.nodess;
// } else {
//   naruto.links = links;
//   naruto.nodes = nodes;
// }
if(r && r.links && r.nodes && r.links.length > 0 && r.nodes.length > 0) {
  r.links = r.links.map((x) => ({source: x.source.id, target: x.target.id, type: x.type}))
  parentz.forEach((item,index)=>{
    r.nodes = [...r.nodes, {"name": item.firstName,"lname": item.lastName,"register": item.register,"dob": item.dob, "label": item.labels[1], "id": item.firstName}]
    if(item.labels[1]==="Эмэгтэй"){
      childs.forEach((childss,index)=>{
        r.links = [...r.links, {"source": childss.firstName, "target": item.firstName, "type": "Ээж"}]
      })
    }else if(item.labels[1]==="Эрэгтэй"){
      childs.forEach((childss,index)=>{
        r.links = [...r.links, {"source": childss.firstName, "target": item.firstName, "type": "Аав"}]
      })
    }
})
  links = r.links;
  nodes = r.nodes;
}
var naruto = {nodes:[],links:[]};
naruto.nodes = nodes;
naruto.links = links;
}
catch(e){
  console.log(e);
} 