let childs = [
  {
    "p3": {
"identity": 10,
"labels": [
        "Person",
        "Female"
      ],
"properties": {
"lastName": "Adiya",
"firstName": "Bolorchuluun",
"dob": "1980-04-07"
      }
    }
  },
  {
    "p3": {
"identity": 11,
"labels": [
        "Person",
        "Female"
      ],
"properties": {
"lastName": "Adiya",
"firstName": "Iderchuluun",
"dob": "1984-02-20"
      }
    }
  },
  {
    "p3": {
"identity": 9,
"labels": [
        "Person",
        "Female"
      ],
"properties": {
"lastName": "Adiya",
"firstName": "Chuluunchimeg",
"dob": "1977-07-17"
      }
    }
  },
  {
    "p3": {
"identity": 1,
"labels": [
        "Person",
        "Male"
      ],
"properties": {
"lastName": "Adiya",
"firstName": "Lkhagvasuren",
"dob": "1988-03-21"
      }
    }
  },
  {
    "p3": {
"identity": 0,
"labels": [
        "Person",
        "Male"
      ],
"properties": {
"lastName": "Adiya",
"firstName": "Baasannyam",
"dob": "2001-03-02"
      }
    }
  }
]
  let parentz = [
    {
      "d": {
        "identity": 7,
        "labels": [
          "Male",
          "Person"
        ],
        "properties": {
          "lastName": "Nyamjav",
          "firstName": "Adiya",
          "dob": "1960-02-25"
        }
      },
      "relation": {
        "identity": 13,
        "start": 7,
        "end": 8,
        "type": "Married",
        "properties": {

        }
      },
      "s": {
        "identity": 8,
        "labels": [
          "Female",
          "Person"
        ],
        "properties": {
          "lastName": "Bataa",
          "firstName": "Enkhtaiwan",
          "dob": "1960-08-20"
        }
      }
    }
  ]
  let nodes =[];
  let links = [];
  if(parentz[0].s) {
      nodes = [...nodes, {"name":parentz[0].s.properties.firstName,"label":parentz[0].s.labels[0],"id": parentz[0].s.properties.firstName}]
      }
  if(parentz[0].d) {
    nodes = [...nodes, {"name":parentz[0].d.properties.firstName,"label":parentz[0].d.labels[0],"id": parentz[0].d.properties.firstName}]
  }
    links = [...links, {"source": parentz[0].d.properties.firstName, "target": parentz[0].s.properties.firstName, "type": "Married"}]
    links = [...links, {"source": parentz[0].s.properties.firstName, "target": parentz[0].d.properties.firstName}]

  childs.forEach( (item, index)=> {
      if(item.p3.labels[1]=="Male") {

          nodes = [...nodes, {"name": item.p3.properties.firstName, "label": item.p3.labels[1], "id": item.p3.properties.firstName}]
      links = [...links, {"source": parentz[0].s.properties.firstName, "target": item.p3.properties.firstName, "type": "Boys"}]
      links = [...links, {"source": parentz[0].d.properties.firstName, "target": item.p3.properties.firstName, "type": "Boys"}]
      }
  })

  childs.forEach((item, index) => {
      if(item.p3.labels[1]=="Female") {

          nodes = [...nodes, {"name": item.p3.properties.firstName, "label": item.p3.labels[1], "id": item.p3.properties.firstName}]
      links = [...links, {"source": parentz[0].s.properties.firstName, "target": item.p3.properties.firstName, "type": "Girl"}]
      links = [...links, {"source": parentz[0].d.properties.firstName, "target": item.p3.properties.firstName, "type": "Girl"}]
  }
  });
  var naruto = {nodes:[],links:[]};
  naruto.nodes = nodes;
  naruto.links = links;
