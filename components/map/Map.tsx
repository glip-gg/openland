import { scaleLinear } from 'd3-scale';

type LandSelectCallback = (selectedIndex: number, x: number, y: number) => void

let onLandClickedCallback: LandSelectCallback

export default function Map(props: any) {
    console.log('loading map component')
    onLandClickedCallback = props.onLandClicked
    loadMap()

    return (
    <div id="canvas-wrapper" style={{width: "100vw", height: "100vh"}}>
      <canvas id='chart-container' width="100vw" height="100vh"></canvas>
      <h3 id='map-land-label' style={{color: 'white', position: 'absolute', cursor: 'pointer'}}></h3>
    </div>
    )
}

let data: any = []
let filteredIds: any = [];
let selectedId = -1;
let hoveredId = -1;
var mapLoaded = false

function loadMap() {
    (async () => {
        const createScatterplot = 
        (await import('regl-scatterplot')).default;


        // create a web worker that streams the chart data
        const streamingLoaderWorker = new Worker("./api/streaming-tsv-parser");
        streamingLoaderWorker.onmessage = ({
        data: { items, totalBytes, finished }
        }) => {

        function normalize(val: number, max: number, min: number) { return (val - min) / (max - min); }

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
                A: Number(d.A),
                R: -1
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
const pointSizes = [80, 100, 85, 70, 55, 80, 60]

const highlightColorsZoomCutoff = 30
const highlightHoverZoomCutoff = 10

var currentSteppedZoom = 1
var currentZoomLevel = 1

function setupMap(createScatterplot) {
    
    const canvas = document.getElementById('chart-container')!
    const textLabel = document.getElementById('map-land-label')!

    const { width, height } = canvas.getBoundingClientRect();
    
    let xScale =  scaleLinear().domain([-1, 1])
    let yScale =  scaleLinear().domain([-1, 1])

    scatterplot = createScatterplot({
      canvas,
      width: 'auto',
      height: 'auto',
      aspectRatio: 1.0,
      cameraTarget: [0, 0],
      cameraDistance: 70,
      pointColor: pointColors,
      pointSize: pointSizes.map((p: number) => p / 1.5),
      colorBy: 'valueA',
      sizeBy: 'valueB',
      xScale: xScale,
      yScale: yScale,
      pointOutlineWidth: 8
    });

    let camera = scatterplot.get('camera')
    camera.setScaleBounds([[0.01, 1], [0.01, 1]])

    setScoreData(data.map((d:any) =>  Math.floor(Math.random() * 99999) + 1))
    
    drawMap()
    mapLoaded = true

    scatterplot.subscribe('view', (camera, view, xScale, yScale) => {
       updateZoomState(camera.camera.distance[0])
       if (currentZoomLevel < highlightHoverZoomCutoff) {
          textLabel.style['visibility'] = 'hidden'
       }
    })

    scatterplot.subscribe('pointOver', (index) => {
      if (hoveredId == data[index].A) return
      hoveredId = data[index].A

      if (currentZoomLevel < highlightHoverZoomCutoff) {
        canvas.style["cursor"] =  "pointer"; 

        let x = xScale(data[index].x)
        let y = yScale(data[index].y)

        textLabel.style['left'] = x.toString() + "px"
        textLabel.style['top'] = y.toString() + "px"

        textLabel.innerHTML = data[index].A
        textLabel.style['visibility'] = 'visible'
      }
   })

   scatterplot.subscribe('pointOut', (index) => {
     if (data[index].A == hoveredId) return
      hoveredId = -1
      canvas.style["cursor"] =  "default"; 
      textLabel.style['visibility'] = 'hidden'
   })

   scatterplot.subscribe('select', ({ points }) => {
    let selectedPoint = data[points[0]].A
    let x = xScale(data[points[0]].x)
    let y = yScale(data[points[0]].y)
    
    onLandClickedCallback(selectedPoint, x, y)
 })
}

function drawMap() {
  const points = data.map((d: any) =>  [d.x, d.y, 0, rankingIndex(d)])
    scatterplot.draw(points);
}

const rankingIndex = (d: any) => {

    if (filteredIds.length != 0 && !filteredIds.includes(d.A)) return 5

    let currentZoom = scatterplot.get('cameraDistance')
    if (filteredIds.length != 0 && currentZoom < highlightColorsZoomCutoff) return 0

    if (d.R == -1) {
        return 0
    }

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
    if (filteredIds.length != 0) return

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
  
    if (newZoomLevel >= currentSteppedZoom + 5) {
      newSteppedZoom = currentSteppedZoom + 5
    }
    if (newZoomLevel <= currentSteppedZoom - 5) {
      newSteppedZoom = currentSteppedZoom - 5
    }
  
    if (newSteppedZoom != currentSteppedZoom) {
      steppedZoomChanged(currentSteppedZoom, newSteppedZoom)
      currentSteppedZoom = newSteppedZoom
    }
  }

// ids of lands to filter
function setFilteredIds(ids: number[]) {
    filteredIds = ids
    if (filteredIds.length == 0) {
      const points = data.map((d: any) =>  [d.x, d.y, 0, rankingIndex(d)])
      let currentZoom = scatterplot.get('cameraDistance')

      if (currentZoom > highlightColorsZoomCutoff) {
        scatterplot.set({
         colorBy: 'valueA'
        })
      } else {
        scatterplot.set({
          colorBy: 'valueB'
         })
      }
      scatterplot.draw(points);
    } else {
      const points = data.map((d: any) =>  [d.x, d.y, rankingIndex(d)])
      scatterplot.set({
        colorBy: 'valueA'
       })
      scatterplot.draw(points);
    }
}

// array of scores (0-99999)
function setScoreData(scores: number[]) {
    data = data.map((d: any) => ({
    ...d,
    R: scores[d.A]
    }))
    if (mapLoaded) {
      drawMap()
    }
}
