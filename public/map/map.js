import { seriesSvgAnnotation } from "./annotation-series.js";
import {
  distance,
  trunc,
  hashCode,
  webglColor,
  iterateElements
} from "./util.js";

import { fcClickPointer } from "./d3fc-clicker.js";

export default function mapLoad(){
  
console.log('loading map')

let data = [];
let filteredIds = [];
let selectedId = -1;
let quadtree;

let landSelectListener = undefined

const createAnnotationData = datapoint => ({
  note: {
    bgPadding: 3,
    title: datapoint.A
  },
  disable: ["connector"],
  x: datapoint.x,
  y: datapoint.y,
  dx: 20,
  dy: 20
});

// create a web worker that streams the chart data
const streamingLoaderWorker = new Worker("./api/streaming-tsv-parser");
streamingLoaderWorker.onmessage = ({
  data: { items, totalBytes, finished }
}) => {
  
  function rotatePoint(x, y, centerx, centery, degrees) {
    var newx = (x - centerx) * Math.cos(degrees * Math.PI / 180) - (y - centery) * Math.sin(degrees * Math.PI / 180) + centerx;
    var newy = (x - centerx) * Math.sin(degrees * Math.PI / 180) + (y - centery) * Math.cos(degrees * Math.PI / 180) + centery;
    return {x: newx, y: newy};
}
  const rows = items
    .map(d => {
      let adjustedCoorddinate = rotatePoint(d.y, d.x, 0, 0, -90)
      return {
        ...d,
        x: Number(adjustedCoorddinate.x),
        y: Number(adjustedCoorddinate.y),
        A: Number(d.A)
    }})
  
  data = data.concat(rows);

  if (finished) {

    document.getElementById("loading").style.display = "none";

    recolor()

    // create a spatial index for rapidly finding the closest datapoint
    quadtree = d3
      .quadtree()
      .x(d => d.x)
      .y(d => d.y)
      .addAll(data);

      // setFilteredIds([0, 10, 20, 30, 40, 50, 60, 70, 700, 21000, 35000, 37000, 29000])

      setScoreData(data.map((d) =>  Math.floor(Math.random() * 99999) + 1))

  }

  redraw();
};
streamingLoaderWorker.postMessage("/api/coordinates");

const xScale = d3.scaleLinear().domain([-70, 70]);
const yScale = d3.scaleLinear().domain([-70, 70]);

const xScaleOriginal = xScale.copy();
const yScaleOriginal = yScale.copy();

let pointSize = (d) => {

  let pointSize = 1
  if (currentSteppedZoom >= maxZoomExtent - 8) {
    pointSize =  currentZoomLevel * 25
  }
  if (currentSteppedZoom >= maxZoomExtent - 12) {
    pointSize =  currentZoomLevel * 16
  }
  pointSize = currentZoomLevel * 2

  if (selectedId == d.A) pointSize = pointSize * 3

  if (currentZoomLevel < highlightColorsZoomCutoff) return pointSize

  if (d.R < 1000) {
    return pointSize * 30
  }
  if (d.R < 10000) {
    return pointSize * 20
  }
  if (d.R < 25000) {
    return pointSize * 15
  }
  if (d.R < 50000) {
    return pointSize * 10
  }
  return pointSize * 5
}

var pointSizeChangePending = false

var pointSeries = fc
  .seriesWebglPoint()
  .type(d3.symbolCircle)
  .defined(() => true)
  .equals((a, b) => a === b && !pointSizeChangePending)
  .size(pointSize)
  .crossValue(d => d.x)
  .mainValue(d => d.y)
  .decorate(program => {

});

const minZoomExtent = 0.8
const maxZoomExtent = 16
const highlightColorsZoomCutoff = maxZoomExtent / 3

var currentSteppedZoom = 1
var currentZoomLevel = 1

const steppedZoomChanged = (previousZoom, newZoom) => {
  // if (pointSizeChangePending) {
  //   pointSizeChangePending = false
  // } else {
  //   pointSizeChangePending = true
  // }
  pointSizeChangePending = false

  if (newZoom % 4 == 0 || newZoom ==  highlightColorsZoomCutoff) {
    pointSizeChangePending = true
    // resize()
  }

  if (newZoom >= highlightColorsZoomCutoff && previousZoom < highlightColorsZoomCutoff) {
     recolor()
  }
  if (newZoom <= highlightColorsZoomCutoff && previousZoom > highlightColorsZoomCutoff) {
     recolor()
  }
}

const color0 = webglColor('#6380FC')
const color1 = webglColor('#E0BE46')
const color2 = webglColor('#7625C2')
const color3 = webglColor('#2D71E6')
const color4 = webglColor('#2BD73D')
const color5 = webglColor('#242424')
const color6 = webglColor('#818181')

const defaultColor = d => {

  if (filteredIds.length != 0 && !filteredIds.includes(d.A)) return color5

  if (currentZoomLevel < highlightColorsZoomCutoff) return color0

  if (d.R < 1000) {
    return color1
  }
  if (d.R < 10000) {
    return color2
  }
  if (d.R < 25000) {
    return color3
  }
  if (d.R < 50000) {
    return color4
  }
  return color6
};


function recolor() {
  const fillColor = fc.webglFillColor().value(defaultColor).data(data);
  pointSeries.decorate(program => fillColor(program));
}

function resize() {
  const resize = fc.webglAttribute().size(1).value(pointSize).data(data)
  pointSeries.decorate(program => {
    program.buffers().attribute('aSize', resize);
  });
}

// ids of lands to filter
function setFilteredIds(ids) {
  filteredIds = ids
  recolor()
  zoomTo(maxZoomExtent - 1)
}

// array of scores (0-99999)
function setScoreData(scores) {
  data = data.map(d => ({
    ...d,
    R: scores[d.A]
  }))
  recolor()
}

function setLandSelectListener(listener) {
  landSelectListener = listener
}

function zoomTo(zoomLevel) {
  zoom.scaleTo(svgSelection(), zoomLevel)
  currentZoomLevel = zoomLevel
  currentSteppedZoom = zoomLevel
  pointSizeChangePending = true
  recolor()
}

const zoom = d3
  .zoom()
  .scaleExtent([minZoomExtent, maxZoomExtent])
  .on("zoom", (e) => {
    // update the scales based on current zoom
    xScale.domain(e.transform.rescaleX(xScaleOriginal).domain());
    yScale.domain(e.transform.rescaleY(yScaleOriginal).domain());

    let newZoomLevel = e.transform.k
    updateZoomState(newZoomLevel)

    redraw();
  });

function updateZoomState(newZoomLevel) {
  currentZoomLevel = newZoomLevel

  let newSteppedZoom = currentSteppedZoom

  if (newZoomLevel >= currentSteppedZoom + 1) {
    newSteppedZoom = currentSteppedZoom + 1
  }
  if (newZoomLevel <= currentSteppedZoom - 1) {
    newSteppedZoom = currentSteppedZoom - 1
  }

  if (newSteppedZoom != currentSteppedZoom) {
    steppedZoomChanged(currentSteppedZoom, newSteppedZoom)
    currentSteppedZoom = newSteppedZoom
  }
}

const annotations = [];

const pointer = fc.pointer().on("point", ([coord]) => {
  annotations.pop();

  svgSelection().style("cursor", "default"); 

  if (!coord || !quadtree) {
    return;
  }

  if (currentSteppedZoom < maxZoomExtent / 3) {
    return
  }

  // find the closes datapoint to the pointer
  const x = xScale.invert(coord.x);
  const y = yScale.invert(coord.y);
  const radius = Math.abs(xScale.invert(coord.x) - xScale.invert(coord.x - 20));
  const closestDatum = quadtree.find(x, y, radius);

  // if the closest point is within 20 pixels, show the annotation
  if (closestDatum) {
    svgSelection().style("cursor", "pointer"); 
    annotations[0] = createAnnotationData(closestDatum);
    selectedId = closestDatum.A
  }

  redraw();
});

const clicker = fcClickPointer().on("click", ([coord]) => {

  if (!coord || !quadtree) {
    return;
  }

  if (currentSteppedZoom < maxZoomExtent / 3) {
    return
  }

  // find the closes datapoint to the pointer
  const x = xScale.invert(coord.x);
  const y = yScale.invert(coord.y);
  const radius = Math.abs(xScale.invert(coord.x) - xScale.invert(coord.x - 20));
  const closestDatum = quadtree.find(x, y, radius);

  if (closestDatum) {
    selectedId = closestDatum.A

    let coordInfo = {
      ...coord,
      maxX: xScaleOriginal.range()[1],
      maxY: yScaleOriginal.range()[0]
    }
    if (landSelectListener) {
      landSelectListener(selectedId, coordInfo)
    }
  }
});

const annotationSeries = seriesSvgAnnotation()
  .type(d3.annotationCalloutCircle);

const chart = fc
  .chartCartesian(xScale, yScale)
  .webglPlotArea(
    // only render the point series on the WebGL layer
    fc
      .seriesWebglMulti()
      .series([pointSeries])
      .mapping(d => d.data)
  )
  .svgPlotArea(
    // only render the annotations series on the SVG layer
    fc
      .seriesSvgMulti()
      .series([annotationSeries])
      .mapping(d => d.annotations)
  )
  .decorate(sel => {

    svgSelection()
      .on("measure.range", (e) => {
        xScaleOriginal.range([0, e.detail.width]);
        yScaleOriginal.range([e.detail.height, 0]);

        // drawLines()
        // drawCircles()
      })
      .call(zoom)
      .call(pointer)
      .call(clicker)

      sel.select('.x-axis').style('visibility', 'hidden');
      sel.select('.y-axis').style('visibility', 'hidden');
    }
  );

const svgSelection = () => d3.select("d3fc-svg.plot-area")

let linesData = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360]

function drawLines() {

  let svg = d3.select("d3fc-svg.plot-area")
      .select("svg")

  linesData.forEach((angle) => {
    let line = svg.select('#line' + angle)

    if (line.empty()) {
      line =  svg.append('line')
    }

    line
      .style('stroke', '#253451')
      .style('stroke-width', '2px')
      .attr('id', 'line' + angle)
      .attr('x1', xScale(0))
      .attr('y1', yScale(0))
      .attr('x2', xScale(75 * Math.cos(Math.PI * 2 * angle / 360)))
      .attr('y2', yScale(75 * Math.sin(Math.PI * 2 * angle / 360)));
  })

}

let circles = [12, 24, 36, 48, 60, 72]

function drawCircles() {

  let svg = d3.select("d3fc-svg.plot-area")
      .select("svg")

  circles.forEach((radius) => {
    let circle = svg.select('#circle' + radius)

    if (circle.empty()) {
      circle =  svg.append('circle')
    }

    let scaledRadius = xScale(radius);

    circle
      .style('stroke', '#253451')
      .style('stroke-width', '2px')
      .attr('id', 'circle' + radius)
      .attr('fill', 'transparent')
      .attr('cx', xScale(0))
      .attr('cy', yScale(0))
      .attr('r', scaledRadius / 3);
  })

}

// render the chart with the required data
// Enqueues a redraw to occur on the next animation frame
const redraw = () => {
  d3.select("#chart").datum({ annotations, data }).call(chart);
};

}
