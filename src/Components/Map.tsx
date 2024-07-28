import 'mapbox-gl/dist/mapbox-gl.css';
import { createEffect, createSignal, Show } from 'solid-js';
import MapGL, { Viewport, Source, Layer, Control, Marker } from 'solid-map-gl';
import Line from './Line';
import Polygon from './SurveyedArea';
import UI from './UI';
import { setAttribute } from 'solid-js/web';
import pathfind from './Path';
import { create } from 'mapbox-gl/src/util/dom';

interface MapCProps {
    class?: string;
}

let NationalGridLines = [
    [1.4194, 51.3355],
    [1.1275, 51.3723],
    [0.84, 51.37],
    [1.1339, 51.7794],
    [1.1846, 51.8092],
    [1.419, 51.9856],
    [1.619, 52.216],
    [1.7305, 52.6083],
    [1.5168, 52.8427],
    [1.1447, 52.9412],
    [0.1755, 52.8006],
    [0.3365, 53.1437],
    [0.3314, 53.2748],
    [0.098, 53.463],
    [0.1328, 53.6344],
    [0.0433, 53.7357],
    [0.178, 54.014],
];
let fishing = [
    [-4.4783, 49.9106],
    [0.6594, 50.2957],
    [-6.1288, 51.361],
    [-5.4077, 53.9255],
];

let geojson = {
    type: 'FeatureCollection',
    features: Array.from({ length: NationalGridLines.length - 1 }, (_, i) => ({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: [NationalGridLines[i], NationalGridLines[i + 1]],
        },
        properties: {},
    })),
};

let geojsonf = {
    type: 'FeatureCollection',
    features: Array.from({ length: fishing.length - 1 }, (_, i) => ({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: [fishing[i], fishing[i + 1]],
        },
        properties: {},
    })),
};

function interpolateCurve(start, end, steps = 100) {
    const path = [];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const lat = start[0] * (1 - t) + end[0] * t;
        const lon = start[1] * (1 - t) + end[1] * t;
        path.push([lat, lon]);
    }
    return path;
}

let MapC = (props: MapCProps) => {
    const [viewport, setViewport] = createSignal({
        center: [54.702354, -3.276575].reverse(),
        zoom: 5,
    } as Viewport);

    let [path, setPath] = createSignal<number[][]>([]);
    let [coastStart, setCoastStart] = createSignal([
        -0.5877734242305905, 54.36940499418432,
    ]);
    let [coastEnd, setCoastEnd] = createSignal([
        1.3841551447440565, 52.022782137005436,
    ]);
    let [topLeft, setTopLeft] = createSignal([
        2.2336328102157097, 53.71904138579592,
    ]);
    let [bottomRight, setBottomRight] = createSignal([
        3.104613282129833, 52.455830650809304,
    ]);
    let [hidden, setHidden] = createSignal(true);
    let [routeOne, setr1] = createSignal(pathfind(coastStart(), topLeft()));
    let [routeTwo, setr2] = createSignal(pathfind(bottomRight(), coastEnd()));
    createEffect(() => {
        setr1(pathfind(coastStart(), topLeft()));
        setr2(pathfind(bottomRight(), coastEnd()));
    });

    let calculatePath = () => {
        setInterval(() => {
            setHidden(false);
        }, 1000);
    };

    return (
        <>
            <MapGL
                options={{
                    style: 'mb:dark',
                    accessToken:
                        'pk.eyJ1IjoiODgxcmQ3d2MiLCJhIjoiY2x6NWczOTc1M3cxczJqcjRseWdtZGNxayJ9.Q7rT9130fic6rc8dNV9kNg',
                }}
                viewport={viewport()}
                onViewportChange={(evt: Viewport) => setViewport(evt)}
            >
                {/* <Line /> */}
                <Control type="scale" position="bottom-left" />
                <Control type="fullscreen" position="bottom-right" />
                <UI
                    setBottomRight={setBottomRight}
                    setCoastalEnd={setCoastEnd}
                    coastalEnd={coastEnd}
                    coastalStart={coastStart}
                    bottomRight={bottomRight}
                    setCoastalStart={setCoastStart}
                    setTopLeft={setTopLeft}
                    topLeft={topLeft}
                    r1={routeOne}
                    r2={routeTwo}
                    calculatePath={() => calculatePath()}
                />
                <Marker
                    lngLat={coastStart()}
                    draggable
                    options={{ color: 'purple' }}
                    onDrag={(lngLat) => setCoastStart(lngLat)}
                >
                    RC Start
                </Marker>
                <Marker
                    lngLat={topLeft()}
                    draggable
                    options={{ color: 'green' }}
                    onDrag={(lngLat) => setTopLeft(lngLat)}
                >
                    Zone Top Left
                </Marker>
                <Marker
                    lngLat={bottomRight()}
                    draggable
                    options={{ color: 'green' }}
                    onDrag={(lngLat) => setBottomRight(lngLat)}
                >
                    Zone Bottom Right
                </Marker>
                <Marker
                    lngLat={coastEnd()}
                    draggable
                    options={{ color: 'purple' }}
                    onDrag={(lngLat) => setCoastEnd(lngLat)}
                >
                    RC End
                </Marker>

                <Show when={!hidden()}>
                    <Line coords={routeOne()} />
                    <Line coords={routeTwo()} />
                    <Polygon bottomright={bottomRight()} topleft={topLeft()} />
                </Show>
                <Source
                    source={{
                        type: 'geojson',
                        data: geojsonf,
                    }}
                >
                    <Layer
                        style={{
                            type: 'circle',
                            paint: {
                                'circle-radius': 8,
                                'circle-color': 'purple',
                            },
                        }}
                    />
                </Source>
                <Source
                    id="raster-array-source"
                    source={{
                        type: 'raster-array',
                        url: 'mapbox://rasterarrayexamples.gfs-winds',
                        tileSize: 512 * 10,
                    }}
                >
                    <Layer
                        id="wind-layer"
                        style={{
                            type: 'raster-particle',
                            source: 'raster-array-source',
                            'source-layer': '10winds',
                            paint: {
                                'raster-particle-speed-factor': 0.4,
                                'raster-particle-fade-opacity-factor': 0.9,
                                'raster-particle-reset-rate-factor': 0.4,
                                'raster-particle-count': 4000,
                                'raster-particle-max-speed': 40,
                                'raster-particle-color': [
                                    'interpolate',
                                    ['linear'],
                                    ['raster-particle-speed'],
                                    1.5,
                                    'rgba(134,163,171,256)',
                                    2.5,
                                    'rgba(126,152,188,256)',
                                    4.12,
                                    'rgba(110,143,208,256)',
                                    4.63,
                                    'rgba(110,143,208,256)',
                                    6.17,
                                    'rgba(15,147,167,256)',
                                    7.72,
                                    'rgba(15,147,167,256)',
                                    9.26,
                                    'rgba(57,163,57,256)',
                                    10.29,
                                    'rgba(57,163,57,256)',
                                    11.83,
                                    'rgba(194,134,62,256)',
                                    13.37,
                                    'rgba(194,134,63,256)',
                                    14.92,
                                    'rgba(200,66,13,256)',
                                    16.46,
                                    'rgba(200,66,13,256)',
                                    18.0,
                                    'rgba(210,0,50,256)',
                                    20.06,
                                    'rgba(215,0,50,256)',
                                    21.6,
                                    'rgba(175,80,136,256)',
                                    23.66,
                                    'rgba(175,80,136,256)',
                                    25.21,
                                    'rgba(117,74,147,256)',
                                    27.78,
                                    'rgba(117,74,147,256)',
                                    29.32,
                                    'rgba(68,105,141,256)',
                                    31.89,
                                    'rgba(68,105,141,256)',
                                    33.44,
                                    'rgba(194,251,119,256)',
                                    42.18,
                                    'rgba(194,251,119,256)',
                                    43.72,
                                    'rgba(241,255,109,256)',
                                    48.87,
                                    'rgba(241,255,109,256)',
                                    50.41,
                                    'rgba(256,256,256,256)',
                                    57.61,
                                    'rgba(256,256,256,256)',
                                    59.16,
                                    'rgba(0,256,256,256)',
                                    68.93,
                                    'rgba(0,256,256,256)',
                                    69.44,
                                    'rgba(256,37,256,256)',
                                ],
                            },
                        }}
                    />
                </Source>

                <Source
                    source={{
                        type: 'geojson',
                        data: geojson,
                    }}
                >
                    <Layer
                        style={{
                            type: 'circle',
                            paint: {
                                'circle-radius': 8,
                                'circle-color': 'blue',
                            },
                        }}
                    />
                </Source>

                {/* <Source
                                    id="wildlife-trusts"
                                    source={{
                                        type: 'vector',
                                        url: 'mapbox://wildlifetrusts.7a5jh9w3',
                                    }}
                                >
                                    <Layer
                                        id="existing-mcz"
                                        style={{
                                            type: 'fill',
                                            source: 'wildlife-trusts',
                                            'source-layer': 'existing-mcz',
                                            paint: {
                                                'fill-color': '#888888',
                                                'fill-opacity': 0.5,
                                            },
                                            layout: {},
                                        }}
                                    />
                                </Source> */}
            </MapGL>
        </>
    );
};

export default MapC;
