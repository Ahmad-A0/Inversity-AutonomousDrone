import { createSignal } from 'solid-js';
import { Layer, Source } from 'solid-map-gl';

interface LineProps {
    class?: string;
    coords: number[][];
}

let Line = (props: LineProps) => {
    let { coords } = props;

    let [geojson] = createSignal({
        type: 'geojson',
        data: {
            type: 'Feature',
            properties: {},
            geometry: {
                coordinates: props.coords,
                type: 'LineString',
            },
        },
    });

    return (
        <Source
            source={{
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        coordinates: props.coords,
                        type: 'LineString',
                    },
                },
            }}
        >
            <Layer
                style={{
                    type: 'line',
                    paint: {
                        'line-color': 'purple',
                        'line-width': 4,
                    },
                }}
            />
        </Source>
    );
};



export default Line;

