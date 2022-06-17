export default function Map() {
    loadMap()
    return (<canvas id='chart-container' width="100vw" height="100vw"></canvas>)
}

let data: any = []
let filteredIds: any = [];
let selectedId = -1;

function loadMap() {
    (async () => {
        const createScatterplot = 
        (await import('regl-scatterplot')).default;


        // create a web worker that streams the chart data
        const streamingLoaderWorker = new Worker("./api/streaming-tsv-parser");
        streamingLoaderWorker.onmessage = ({
        data: { items, totalBytes, finished }
        }) => {

        function rotatePoint(x: number, y: number, centerx: number, centery: number, degrees: number) {
            var newx = (x - centerx) * Math.cos(degrees * Math.PI / 180) - (y - centery) * Math.sin(degrees * Math.PI / 180) + centerx;
            var newy = (x - centerx) * Math.sin(degrees * Math.PI / 180) + (y - centery) * Math.cos(degrees * Math.PI / 180) + centery;
            return {x: newx, y: newy};
        }

        const rows = items
            .map((d: any) => {
            let adjustedCoorddinate = rotatePoint(d.y, d.x, 0, 0, -90)
            return {
                ...d,
                x: Number(adjustedCoorddinate.x),
                y: Number(adjustedCoorddinate.y),
                A: Number(d.A)
            }})

        data = data.concat(rows);

        if (finished) {
            setupMap(createScatterplot)
        }

        };
        streamingLoaderWorker.postMessage("/api/coordinates");
    })();

}

let scatterplot: any

const pointColors = ['#6380FC', '#E0BE46', '#7625C2', '#2D71E6', '#2BD73D', '#242424', '#818181']

const minZoomExtent = 0.8
const maxZoomExtent = 16
const highlightColorsZoomCutoff = maxZoomExtent / 2

var currentSteppedZoom = 1
var currentZoomLevel = 1

function setupMap(createScatterplot) {
    
    const canvas = document.getElementById('chart-container')!

    const { width, height } = canvas.getBoundingClientRect();
    
    scatterplot = createScatterplot({
      canvas,
      width,
      height,
      pointSize: 80,
      cameraTarget: [0,0],
      cameraDistance: 70,
      pointColor: pointColors,
      colorBy: 'valueA',
    });

    setScoreData(data.map((d:any) =>  Math.floor(Math.random() * 99999) + 1))
    
    const points = data.map((d: any) =>  [d.x, d.y, 0, pointColorIndex(d)])
    scatterplot.draw(points);

    scatterplot.subscribe('view', (camera, view, xScale, yScale) => {
       updateZoomState(camera.camera.distance[0])
    })
}

const pointColorIndex = (d: any) => {

    if (filteredIds.length != 0 && !filteredIds.includes(d.A)) return 5

    let currentZoom = scatterplot.get('cameraDistance')
    if (currentZoom < highlightColorsZoomCutoff) return 0

    if (d.R < 1000) {
        return 1
    }
    if (d.R < 10000) {
        return 2
    }
    if (d.R < 25000) {
        return 3
    }
    if (d.R < 50000) {
        return 4
    }
    return 6

}

const steppedZoomChanged = (previousZoom: number, newZoom: number) => {
    if (newZoom >= highlightColorsZoomCutoff && previousZoom < highlightColorsZoomCutoff) {
       scatterplot.set({
        colorBy: 'valueA'
       })
    }
    if (newZoom <= highlightColorsZoomCutoff && previousZoom > highlightColorsZoomCutoff) {
        scatterplot.set({
         colorBy: 'valueB'
        })
    }
  }

function updateZoomState(newZoomLevel: number) {
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

// ids of lands to filter
function setFilteredIds(ids: number[]) {
    filteredIds = ids
    recolor()
}

// array of scores (0-99999)
function setScoreData(scores: number[]) {
    data = data.map((d: any) => ({
    ...d,
    R: scores[d.A]
    }))
}

function recolor() {
    const points = data.map((d: any) =>  [d.x, d.y, pointColorIndex(d)])
    scatterplot.draw(points);
}

