import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  Container,
  Button,
  Input,
  Spacer,
  Text,
  Link
} from '@nextui-org/react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Drawer, Popover, Whisper } from 'rsuite'
import styled from 'styled-components';
import FilterBody from '../components/filterTab/filterBody';
import land from '../assets/filter/land.svg';
import SortingDropDown from '../components/filterTab/sortingDropDown';
import { DefaultPopover } from '../components/filterModals/parent_popover';
import Script from 'next/script'


// import * as d3 from 'd3';
// import * as d3 from 'https://unpkg.com/d3?module'
// import * as fc from 'https://unpkg.com/d3fc@14.2.3/build/d3fc.js';
// import * as fc from 'd3fc';
import {
    distance,
    trunc,
    hashCode,
    webglColor,
    iterateElements
  } from "../utils/util";
  import { seriesSvgAnnotation } from "../utils/annotation-series.js";


const FilterHeaderItem = styled.div`
    padding: 12px 14px;
    background:  ${props => props.active ? 'rgba(255, 255, 255, 0.06)': 'transparent'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FilterHeaderItemLabel = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */
    display: flex;
    align-items: center;
    color: #FFFFFF;
`;



const FilterHeaderItemImage = (active: any, imageType: any) => {
    if(imageType == 'land')
        return (<Image alt='land' src={land} style={{color: active ? 'white': 'rgba(68, 68, 68, 1)', marginBottom: 0}} />);
    return (<Image alt='land' src={land} style={{color: active ? 'white': 'rgba(68, 68, 68, 1)', marginBottom: 0}} />);
}

export default function Home() {
    const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
    const [filterTypes, setFilterTypes] = useState([
        {type: 'land', label: 'Land type'},
        {type: 'artifact', label: 'Atifact'},
        {type: 'koda', label: 'Koda'},
        {type: 'resource', label: 'Resource'},
        {type: 'rank', label: 'Rank'},
        {type: 'price', label: 'Price'},         
    ]);
    const [activeFilterHeaderItem, setActiveFilterHeaderItem] = useState('');

    const handleOpenFilterDrawer = () => {
        setOpenFilterDrawer(true);
      };

    const selectFilterHeadItem = (filterType: any) => {
        // setActiveFilterHeaderItem(filterType);
        //TODO add other stuff to handle filter selection
    }

    useEffect(() => {
        setTimeout(() => {

        let data = [];
        let quadtree;

        const createAnnotationData = datapoint => ({
        note: {
            label: datapoint.A,
            bgPadding: 5,
            title: trunc(datapoint.A, 100)
        },
        x: datapoint.x,
        y: datapoint.y,
        dx: 20,
        dy: 20
        });

        // create a web worker that streams the chart data
        const streamingLoaderWorker = new Worker("api/streaming-tsv-parser");
        streamingLoaderWorker.onmessage = ({
        data: { items, totalBytes, finished }
        }) => {
        const rows = items
            .map(d => ({
            ...d,
            x: Number(d.x),
            y: Number(d.y),
            R: Math.floor(Math.random() * 99999) + 1
            }))
        data = data.concat(rows);

        if (finished) {
            document.getElementById("loading").style.display = "none";
            document.getElementById("chart").style.display = "block";

            recolor()

            // wire up the fill color selector
            iterateElements(".controls a", el => {
            el.addEventListener("click", () => {
                iterateElements(".controls a", el2 => el2.classList.remove("active"));
                el.classList.add("active");
                // fillColor.value(hoverColor);
                redraw();
            });
            });

            // create a spatial index for rapidly finding the closest datapoint
            quadtree = d3
            .quadtree()
            .x(d => d.x)
            .y(d => d.y)
            .addAll(data);
        }

        redraw();
        };
        streamingLoaderWorker.postMessage("coordinates.tsv");

        const xScale = d3.scaleLinear().domain([-70, 70]);
        const yScale = d3.scaleLinear().domain([-70, 70]);

        const xScaleOriginal = xScale.copy();
        const yScaleOriginal = yScale.copy();

        let pointSize = () => {
        if (currentSteppedZoom >= maxZoomExtent - 4) {
            return currentZoomLevel * 4
        }
        if (currentSteppedZoom >= maxZoomExtent - 8) {
            return currentZoomLevel * 2
        }
        return currentZoomLevel * 1
        }

        var pointSizeChangePending = false

        console.log(fc, 'logging fc')
        var pointSeries = fc
        .seriesWebglPoint()
        .equals((a, b) => a === b && !pointSizeChangePending)
        .size(pointSize)
        .crossValue(d => d.x)
        .mainValue(d => d.y);

        const minZoomExtent = 1
        const maxZoomExtent = 12
        const highlightColorsZoomCutoff = maxZoomExtent / 3

        var currentSteppedZoom = 1
        var currentZoomLevel = 1

        const steppedZoomChanged = (previousZoom, newZoom) => {
        // if (pointSizeChangePending) {
        //   pointSizeChangePending = false
        // } else {
        //   pointSizeChangePending = true
        // }

        if (newZoom >= highlightColorsZoomCutoff && previousZoom < highlightColorsZoomCutoff) {
            recolor()
        }
        if (newZoom <= highlightColorsZoomCutoff && previousZoom > highlightColorsZoomCutoff) {
            recolor()
        }
        }

        const color0 = webglColor('#6380FC')
        const color1 =  webglColor('#E0BE46')
        const color2 = webglColor('#7625C2')
        const color3 = webglColor('#2D71E6')
        const color4 = webglColor('#2BD73D')

        const defaultColor = d => {
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
        return color0
        };


        function recolor() {
        const fillColor = fc.webglFillColor().value(defaultColor).data(data);
        pointSeries.decorate(program => fillColor(program));
        }

        const zoom = d3
        .zoom()
        .scaleExtent([minZoomExtent, maxZoomExtent])
        .on("zoom", () => {
            // update the scales based on current zoom
            xScale.domain(d3.event.transform.rescaleX(xScaleOriginal).domain());
            yScale.domain(d3.event.transform.rescaleY(yScaleOriginal).domain());

            let newZoomLevel = d3.event.transform.k
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

            redraw();
        });

        const annotations = [];

        const pointer = fc.pointer().on("point", ([coord]) => {
        annotations.pop();

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
            annotations[0] = createAnnotationData(closestDatum);
        }

        redraw();
        });

        const annotationSeries = seriesSvgAnnotation()
        .notePadding(15)
        .type(d3.annotationCallout);

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

            sel
            .enter()
            .select("d3fc-svg.plot-area")
            .on("measure.range", () => {
                xScaleOriginal.range([0, d3.event.detail.width]);
                yScaleOriginal.range([d3.event.detail.height, 0]);

                drawLines()
                // drawCircles()
            })
            .call(zoom)
            .call(pointer)

            sel.select('.x-axis').style('visibility', 'hidden');
            sel.select('.y-axis').style('visibility', 'hidden');
            }
        );

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
            .attr('r', scaledRadius);
        })

        }

        // render the chart with the required data
        // Enqueues a redraw to occur on the next animation frame
        const redraw = () => {
        d3.select("#chart").datum({ annotations, data }).call(chart);
        }; 
    }, 10000)


    }, []);

   

    const filterHeader: any = filterTypes.map((item, index) => {
        let placement: string = 'bottomStart';
        if(item.type == 'land') placement = 'bottomStart';
        if(item.type == 'artifact') placement = 'bottomStart';
        if(item.type == 'koda') placement = 'bottomStart';
        if(item.type == 'resource') placement = 'bottomStart';
        if(item.type == 'price') placement = 'bottomEnd';
        if(item.type == 'rank') placement = 'bottomEnd';
        return (
            <Whisper
                key={`filter-header-item-${index}`}
                trigger="click"
                placement={placement}
                controlId={`control-id-${placement}`}
                enterable
                speaker={(                
                    <DefaultPopover type={item.type} title={item.label}/>
                )}
            >
                <FilterHeaderItem
                        onClick={() => selectFilterHeadItem(item.type)}
                        className='hover filter-header-item'                        
                        active={activeFilterHeaderItem == item.type}
                        style={{minWidth: 104}}
                        // onMouseEnter={() => console.log('asdff')}
                        // onMouseLeave={() => console.log('laeve')}
                        >
                        <FilterHeaderItemImage active={activeFilterHeaderItem == item.type} type={item.type} />
                        <FilterHeaderItemLabel style={{color: '#fff', marginTop: 10}}>{item.label}</FilterHeaderItemLabel>
                    </FilterHeaderItem>
            </Whisper>
            
        );
    });


    return (
        <div className={styles.container}>
            <Head>
                <title>Openland | Suped-up search for Otherside</title>
                <meta
                name="description"
                content="Navigate the otherside in a blazing fast experience"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Script strategy="afterInteractive" src="//unpkg.com/d3@5.15.0/dist/d3.min.js" />
            <Script strategy="afterInteractive" src="//unpkg.com/d3fc@14.2.3/build/d3fc.js" />
            <Script strategy="afterInteractive" src="//unpkg.com/d3-svg-annotation@2.5.1/indexRollup.js" />


            <Navbar />

           
            <Container
                as="main"
                display="flex"
                direction="column"
                justify="center"
                alignItems="center"
                style={{ height: '100vh' }}
            >                
                <div id="chart-container">
                    <div id="chart"></div>
                    <div id="loading"><span>loading...</span></div>
                </div>
                {/* <Button shadow onClick={() => handleOpenFilterDrawer()}>Open Drawer</Button> */}
            </Container>

            <Drawer size={'sm'} placement={'left'} open={openFilterDrawer} onClose={() => setOpenFilterDrawer(false)}>
                <Drawer.Header style={{background: '#000', borderBottomWidth: 1, borderColor: 'rgba(44, 44, 44, 1)'}}>
                    {filterHeader}                    
                </Drawer.Header>
                <Drawer.Body style={{background: 'rgba(0, 0, 0, 1)'}}>
                    <div style={{background: 'black', padding: 32}}>
                        <FilterBody  floor={2.14} lands={4500} filters={['Buy Now', 'Anus Reaper']} />
                    </div>
                </Drawer.Body>
            </Drawer>
        </div>
    );
}
