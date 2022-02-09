let nodes =[];
let links = [];
if(parentz[0]) {
    nodes = [...nodes, {"name":parentz[0].firstName,"label":parentz[0].labels[0],"id": parentz[0].firstName}]
    }
if(parentz[1]) {
  nodes = [...nodes, {"name":parentz[1].firstName,"label":parentz[1].labels[0],"id": parentz[1].firstName}]
}
  links = [...links, {"source": parentz[0].firstName, "target": parentz[1].firstName, "type": "Married"}]
  links = [...links, {"source": parentz[0].firstName, "target": parentz[1].firstName}]

childs.forEach( (item, index)=> {
    if(item.labels[1]=="Male") {

        nodes = [...nodes, {"name": item.firstName, "label": item.labels[1], "id": item.firstName}]
    links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Boys"}]
    links = [...links, {"source": parentz[1].firstName, "target": item.firstName, "type": "Boys"}]
    }
})

childs.forEach((item, index) => {
    if(item.labels[1]=="Female") {

        nodes = [...nodes, {"name": item.firstName, "label": item.labels[1], "id": item.firstName}]
    links = [...links, {"source": parentz[0].firstName, "target": item.firstName, "type": "Girl"}]
    links = [...links, {"source": parentz[1].firstName, "target": item.firstName, "type": "Girl"}]
}
});
var naruto = {nodes:[],links:[]};
naruto.nodes = nodes;
naruto.links = links;
var colors = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    node,
    link;

svg.append('defs').append('marker')
    .attrs({'id':'arrowhead',
        'viewBox':'-0 -5 10 10',
        'refX':13,
        'refY':0,
        'orient':'auto',
        'markerWidth':10,
        'markerHeight':10,
        'xoverflow':'visible'})
    .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#FFFFFF')
    .style('stroke','none');

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) {return d.id;}).distance([150]).strength(1))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide(function(d){
return d.id === "j" ? 150 : 100
}));

// d3.json("graph1.json", function (error, graph) {
//     if (error) throw error;
//     update(graph.links, graph.nodes);
// })

    var graph = naruto;
    update(naruto.links, naruto.nodes);
function update(links, nodes) {
    link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr('marker-end','url(#arrowhead)')

    link.append("title")
        .text(function (d) {return d.type;});

    edgepaths = svg.selectAll(".edgepath")
        .data(links)
        .enter()
        .append('path')
        .attrs({
            'class': 'edgepath',
            'fill-opacity': 0,
            'stroke-opacity': 0,
            'id': function (d, i) {return 'edgepath' + i}
        })
        .style("pointer-events", "none");

    edgelabels = svg.selectAll(".edgelabel")
        .data(links)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attrs({
            'class': 'edgelabel',
            'id': function (d, i) {return 'edgelabel' + i},
            'font-size': 10,
            'fill': '#FFFFFF'
        });

    edgelabels.append('textPath')
        .attr('xlink:href', function (d, i) {return '#edgepath' + i})
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .attr("startOffset", "50%")
        .text(function (d) {return d.type});

    node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                //.on("end", dragended)
        );

    node.append("circle")
        .attr("r", 15)
        .style("fill", function (d, i) {return colors(i);})

    node.append("title")
        .text(function (d) {return d.id;});

    node.append("text")
        .attr("dy", -5)
        .style("fill", "white")
        .style("font-size", "10")
        .text(function (d) {return d.name;});
        // .text(function (d) {return d.name+":"+d.label;});

    simulation
        .nodes(nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(links);
}

function ticked() {
    link
        .attr("x1", function (d) {return d.source.x;})
        .attr("y1", function (d) {return d.source.y;})
        .attr("x2", function (d) {return d.target.x;})
        .attr("y2", function (d) {return d.target.y;});

    node
        .attr("transform", function (d) {return "translate(" + d.x + ", " + d.y + ")";});

    edgepaths.attr('d', function (d) {
        return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
    });

    edgelabels.attr('transform', function (d) {
        if (d.target.x < d.source.x) {
            var bbox = this.getBBox();

            rx = bbox.x + bbox.width / 2;
            ry = bbox.y + bbox.height / 2;
            return 'rotate(180 ' + rx + ' ' + ry + ')';
        }
        else {
            return 'rotate(0)';
        }
    });
}

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
   if (!d3.event.active) simulation.alphaTarget(0);
   d.fx = undefined;
   d.fy = undefined;
}
