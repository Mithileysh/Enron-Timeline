//PARTICLES JS

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 300,
      "density": {
        "enable": true,
        "value_area": 500
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "star",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 100,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}           
);

//LABELLA JS

var data = [
  {date: new Date(1985, 3,24), name: 'Houston Natural Gas merges with InterNorth to form Enron, HNG CEO Kenneth Lay becomes CEO of combined company the following year.'},
  {date: new Date(1989, 4,12), name: 'Enron begins trading natural gas commodities.'},
  {date: new Date(1990, 3,12), name: 'Lay hires Jeffrey Skilling to lead the companys effort to focus on commodities trading in the deregulated markets.'},
  {date: new Date(1990, 4,12), name: 'Andrew S. Fastow is one of Skilling first hires later that year.'},
  {date: new Date(1991, 4,12), name: 'Richard Causey leaves Arthur Andersen LLP to join Enron as assistant controller.'},
  {date: new Date(1997, 5,31), name: 'Skilling named president and chief operating officer of Enron.'},
  {date: new Date(1998,11,18), name: 'Fastow named finance chief.'},
  {date: new Date(1999, 3,28), name: 'Causey named chief accounting officer. '},
  {date: new Date(2000, 8,24), name: 'Enron shares reach high of $90'},
  {date: new Date(2000, 9,5), name: 'Enron announces that Skilling, then president and chief operating officer, will succeed Kenneth Lay as CEO in February 2001.'},
  {date: new Date(2000, 10,5), name: 'Lay will remain as chairman. Stock hits 52-week high of $84.87.'},
  {date: new Date(2001, 10,16), name: 'Enron announces $638 million in third-quarter losses and a $1.2 billion reduction in shareholder equity'},
  {date: new Date(2001, 10,19), name: 'Securities and Exchange Commission launches inquiry into Enron finances. Enron sacks Fastow.'},
  {date: new Date(2001,11,8), name: 'Enron files documents with SEC revising its financial statements for previous five years to account for $586 million in losses'},
  {date: new Date(2001,11,19), name: 'Enron restates its third-quarter earnings and discloses a $690 million debt is due Nov. 27'},
  {date: new Date(2001,12,02), name: 'Enron files for bankruptcy, the biggest in US history, thousands of workers laid off'},
  {date: new Date(2002,1,9), name: 'Justice Department confirms it has begun a criminal investigation of Enron'},
  {date: new Date(2002,1,23), name: 'Lay resigns as chairman and CEO'},
  {date: new Date(2002,10,31), name: 'Fastow indicted on 78 charges of conspiracy, fraud, money laundering and other counts.'},
  {date: new Date(2004, 7,8), name: 'Lay surrenders to FBI'},
  {date: new Date(2004, 11,3), name: 'Enron first criminal trial ends'},
];

var options =   {
  margin: {left: 20, right: 20, top: 20, bottom: 20},
  initialWidth: 1000,
  initialHeight: 900,
};

var innerWidth =  options.initialWidth - options.margin.left - options.margin.right;
var innerHeight = options.initialHeight - options.margin.top - options.margin.bottom;
var colorScale = d3.scale.category10();

var vis = d3.select('#timeline')
  .append('svg')
  .attr('width',  options.initialWidth)
  .attr('height', options.initialHeight)
  .append('g')
  .attr('transform', 'translate('+(options.margin.left)+','+(options.margin.top)+')');

function labelText(d){
  return d.date.getFullYear() + ' - ' + d.name;
}

var dummyText = vis.append('text');

var timeScale = d3.time.scale()
  .domain(d3.extent(data, function(d){return d.date;}))
  .range([0, innerHeight])
  .nice();

var nodes = data.map(function(movie){
  var bbox = dummyText.text(labelText(movie))[0][0].getBBox();
  movie.h = bbox.height;
  movie.w = bbox.width;
  return new labella.Node(timeScale(movie.date), movie.h + 4, movie);
});

dummyText.remove();

vis.append('line')
  .classed('timeline', true)
  .attr('y2', innerHeight);

var linkLayer = vis.append('g');
var labelLayer = vis.append('g');
var dotLayer = vis.append('g');

dotLayer.selectAll('circle.dot')
  .data(nodes)
  .enter().append('circle')
  .classed('dot', true)
  .attr('r', 3)
  .attr('cy', function(d){return d.getRoot().idealPos;});

function color(d,i){
  return '#888';
}

var renderer = new labella.Renderer({
  layerGap: 60,
  nodeHeight: nodes[0].width,
  direction: 'right'
});

function draw(nodes){
  renderer.layout(nodes);

  var sEnter = labelLayer.selectAll('rect.flag')
    .data(nodes)
    .enter().append('g')
    .attr('transform', function(d){return 'translate('+(d.x)+','+(d.y-d.dy/2)+')';});

  sEnter
    .append('rect')
    .classed('flag', true)
    .attr('width', function(d){ return d.data.w + 9; })
    .attr('height', function(d){ return d.dy; })
    .attr('rx', 2)
    .attr('ry', 2)
    .style('fill', color);

  sEnter
    .append('text')
    .attr('x', 4)
    .attr('y', 15)
    .style('fill', '#fff')
    .text(function(d){return labelText(d.data);});

  linkLayer.selectAll('path.link')
    .data(nodes)
    .enter().append('path')
    .classed('link', true)
    .attr('d', function(d){return renderer.generatePath(d);})
    .style('stroke', color)
    .style('stroke-width',2)
    .style('opacity', 0.6)
    .style('fill', 'none');
}

var force = new labella.Force({
  minPos: -10
})
  .nodes(nodes)
  .compute();

draw(force.nodes());