import { ScatterGL } from 'scatter-gl';
import styled from 'styled-components';

export default function Map() {    
    loadMap()

    return (
        <div id="container" style={{width: '100vw', height: '100vh', backgroundColor: 'transparent'}}></div>
    );
}

let data: any = []
let filteredIds: any = [];
let selectedId = -1;

function loadMap() {
    (async () => {
        const { ScatterGL, Point2D, Dataset, PointMetadata } = 
        await import('scatter-gl');


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
            setupMap(ScatterGL, Point2D, Dataset, PointMetadata)
        }

        };
        streamingLoaderWorker.postMessage("/api/coordinates");
    })();
    
}

function setupMap(ScatterGL, Point2D, Dataset, PointMetadata) {

        const dataPoints: Point2D[] = [];
        const metadata: PointMetadata[] = [];
    
        data.forEach((coord: any, index: number) => {
            dataPoints.push([coord.x, coord.y]);
            metadata.push({
            key: index,
            label: coord.A.toString(),
            });
        });
        
        const dataset = new Dataset(dataPoints, metadata);
        
        const containerElement = document.getElementById('container')!;
    
        const scatterGL = new ScatterGL(containerElement, {
            onClick: (point: number | null) => {
                
            },
            onHover: (point: number | null) => {
                
            },
            onSelect: (points: number[]) => {
                
            
            },
            onCameraMove: (cameraPosition: THREE.Vector3, cameraTarget: THREE.Vector3) => {

            },
            camera: {
                zoom: 2,
                position: [0, 0]
            },
            orbitControls: {
                zoomSpeed: 1.7,
            },
            styles: {
                backgroundColor: 'black',
                axesVisible: false
            }
        });
        scatterGL.setDimensions(2);
        scatterGL.render(dataset);
        scatterGL.resize();
    
        const pointColorer = (i, selectedIndices, hoverIndex) => {
    
            const color0 = '#6380FC'
            const color1 = '#E0BE46'
            const color2 = '#7625C2'
            const color3 = '#2D71E6'
            const color4 = '#2BD73D'
            const color5 = '#242424'
            const color6 = '#818181'
    
            if (filteredIds.length != 0 && !filteredIds.includes(i)) return color5
            
            // if (currentZoomLevel < highlightColorsZoomCutoff) return color0
    
            let d = data[i]
            
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
    
        }
        scatterGL.setPointColorer(pointColorer)
        
        window.addEventListener('resize', () => {
            scatterGL.resize();
        });        
        
          // ids of lands to filter
          function setFilteredIds(ids: number[]) {
            filteredIds = ids
            scatterGL.setPointColorer(pointColorer)
        }
        
        // array of scores (0-99999)
        function setScoreData(scores: number[]) {
            data = data.map((d: any) => ({
            ...d,
            R: scores[d.A]
            }))
            scatterGL.setPointColorer(pointColorer)
        }
   
        setScoreData(data.map((d:any) =>  Math.floor(Math.random() * 99999) + 1))

}
