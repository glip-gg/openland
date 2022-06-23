import { useEffect } from 'react';
import { scaleLinear } from 'd3-scale';


type LandSelectCallback = (selectedIndex: number, x: number, y: number) => void
type LandUnselectCallback = () => void

let onLandSelectedCallback: LandSelectCallback
let onLandUnselectedCallback: LandUnselectCallback

export default function Map(props: any) {
    console.log('loading map component')
    onLandSelectedCallback = props.onLandSelected
    onLandUnselectedCallback = props.onLandUnselected

    useEffect(()=>{
        loadMap()
    },[])
    

    return (
        <div id="canvas-wrapper" style={{width: "100vw", height: "100vh", marginLeft: "300px"}}>
          <canvas id='chart-container' width="100vw" height="100vh"></canvas>
          <h4 id='map-land-label' style={{color: 'white', position: 'absolute', cursor: 'pointer', pointerEvents: 'none'}}></h4>
        </div>
    )
}

let data: any = []
let filteredIds: any = [];
let selectedId = -1;
let hoveredId = -1;
var mapLoaded = false
let points: any = []

const CLUB_HOUSE_ID = -1000
data.push( {
  x: 0,
  y: 0,
  A: CLUB_HOUSE_ID,
  R: -1,
  T: -1
})

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
                R: -1,
                T: -1
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

const pointColors = ['#6380FC', '#E0BE46', '#7625C2', '#2D71E6', '#2BD73D', '#242424', '#818181', '#FFA500']
const pointSizes = [80, 100, 85, 70, 55, 80, 60, 140]

const highlightColorsZoomCutoff = 20
const highlightHoverZoomCutoff = 7

var currentSteppedZoom = 1
var currentZoomLevel = 1

function setupMap(createScatterplot: any) {
    
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
    camera.setScaleBounds([[0.013, 1], [0.013, 1]])

    // first rank data
    // environment tier
    /* setLandData(
     *   data.map((d:any) =>  Math.floor(Math.random() * 99999) + 1),
     *   data.map((d:any) =>  Math.floor(Math.random() * 4) + 1)
     * ) */
    
    drawMap()
    mapLoaded = true

    scatterplot.subscribe('view', (camera: any, view: any, xScale: any, yScale: any) => {
       updateZoomState(camera.camera.distance[0])
       if (currentZoomLevel < highlightHoverZoomCutoff) {
          textLabel.style['visibility'] = 'hidden'
       }
    })

    scatterplot.subscribe('pointOver', (index: any) => {
      if (hoveredId == data[index].A) return
      hoveredId = data[index].A

      if (currentZoomLevel < highlightHoverZoomCutoff) {
        canvas.style["cursor"] =  "pointer"; 

        let x = xScale(data[index].x)
        let y = yScale(data[index].y)

        textLabel.style['left'] = x.toString() + "px"
        textLabel.style['top'] = y.toString() + "px"

        if (data[index].A == CLUB_HOUSE_ID) {
          textLabel.innerHTML = 'Clubhouse'
        } else {
          textLabel.innerHTML = data[index].A
        }
        textLabel.style['visibility'] = 'visible'
      }
   })

   scatterplot.subscribe('pointOut', (index: any) => {
     if (data[index].A == hoveredId) {
       hoveredId = -1
       return
     }
      hoveredId = -1
      canvas.style["cursor"] =  "default"; 
      textLabel.style['visibility'] = 'hidden'
   })

   scatterplot.subscribe('select', ({ points }: any) => {
    let selectedPoint = data[points[0]].A
    let x = xScale(data[points[0]].x)
    let y = yScale(data[points[0]].y)
    
    let enoughSpaceOnRight = x + 270 < window.innerWidth
    let infoX = enoughSpaceOnRight ? x + 40 : x - 350
    let infoY = 80

    if (selectedPoint == CLUB_HOUSE_ID) return
    onLandSelectedCallback(selectedPoint, infoX, infoY)
 })

  scatterplot.subscribe('deselect', () => {
      onLandUnselectedCallback()
  })

}

function drawMap() {
  points = data.map((d: any) =>  [d.x, d.y, rankingIndex(d), sizeIndex(d)])
  scatterplot.clear()
  scatterplot.draw(points);
}

const rankingIndex = (d: any) => {

    // let currentZoom = scatterplot.get('cameraDistance')
    // if (filteredIds.length != 0 && currentZoom < highlightColorsZoomCutoff) return 0

    //clubhouse at 0,0
    if (d.A == CLUB_HOUSE_ID) {
      return 7
    }

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

const sizeIndex = (d: any) => {

  // let currentZoom = scatterplot.get('cameraDistance')
  // if (filteredIds.length != 0 && currentZoom < highlightColorsZoomCutoff) return 0

  //clubhouse at 0,0
  if (d.A == CLUB_HOUSE_ID) {
    return 7
  }

  if (d.T == -1) {
      return 0
  }

  if (d.T == 1) {
      return 5
  }
  if (d.T == 2) {
      return 4
  }
  if (d.T == 3) {
      return 3
  }
  if (d.T == 4) {
      return 2
  }
  if (d.T == 5) {
    return 1
  }
  return 6

}

const steppedZoomChanged = (previousZoom: number, newZoom: number) => {
    if (filteredIds.length != 0) return

    // if (newZoom >= highlightColorsZoomCutoff && previousZoom < highlightColorsZoomCutoff) {
    //    scatterplot.set({
    //     colorBy: 'valueB'
    //    })
    // }
    // if (newZoom <= highlightColorsZoomCutoff && previousZoom > highlightColorsZoomCutoff) {
    //     scatterplot.set({
    //      colorBy: 'valueB'
    //     })
    // }
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
export function setFilteredIds(ids: number[]) {
  console.log('filteredIds: ' + ids.length)
    filteredIds = ids
    let targetCameraDistance = 70
    if (filteredIds.length == 0) {
      scatterplot.set({
        cameraDistance: targetCameraDistance
      })
      for (let i=0; i< data.length; i++) {
        if (data[i] != undefined) {
          points[i][2] = rankingIndex(data[i])
        }
      }
    } else {
      let distances: number[] = []
      filteredIds.sort().slice(-10).forEach((element: number) => {
        if (data[element] != undefined) {
          var dist = Math.sqrt( Math.pow((data[element].x), 2) + Math.pow((data[element].y), 2));
          distances.push(dist)
        }
      });
      if (distances.length > 0) {
        targetCameraDistance = distances.sort().reverse()[0] + 2
      }
      scatterplot.set({
        cameraDistance: targetCameraDistance,
        cameraTarget: [0, 0]
      })
      // set greyed out colors on all points first
      for (let i=0; i< data.length; i++) {
        points[i][2] = 5
      }
      // set actual rank colors on filtered points now
      filteredIds.forEach((id: number) => {
        if (data[id] != undefined) {
          points[id][2] = rankingIndex(data[id])
        }
      })
    }
  scatterplot.draw(points);
}

//Onclick on therdeed
export function setFocusedIds(ids: number[]) {
  console.log('focused ids', ids.length);
  scatterplot.select(ids, {
    preventEvent: true
  })
}

// array of scores (0-99999)
// array of land tiers (1-5) for 0-99999
export function setLandData(scores: number[], landTiers: number[]) {
    data = data.map((d: any) => ({
    ...d,
    R: scores[d.A],
    T: landTiers[d.A]
    }))
    if (mapLoaded) {
      drawMap()
    }
}
