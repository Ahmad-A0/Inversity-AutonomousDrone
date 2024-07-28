import { number } from 'mapbox-gl/src/style-spec/util/interpolate';
import { Layer, Source } from 'solid-map-gl';

interface LineProps {
    class?: string;
}

interface PolygonProps {
    topleft: number[]; // [lng, Lat]
    bottomright: number[];
}
let Polygon = (props: PolygonProps) => {
    let coords = [
        [
            [-5.714722, 50.066111], // Land's End, Cornwall
            [-4.142, 50.3755], // Plymouth
            [-3.536, 50.7186], // Exeter
            [-3.363, 51.124], // Bridgwater
            [-5.714722, 50.066111], // Land's End, Cornwall
        ],
    ];

    let geojsonPolygon = {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: coords,
        },
        properties: {},
    };
    return (
        <Source
            source={{
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        coordinates: [
                            [
                                [props.topleft[0], props.topleft[1]],
                                [props.topleft[0], props.bottomright[1]],
                                [props.bottomright[0], props.bottomright[1]],
                                [props.bottomright[0], props.topleft[1]],
                                [props.topleft[0], props.topleft[1]],
                            ],
                        ],
                        type: 'Polygon',
                    },
                },
            }}
        >
            <Layer
                style={{
                    type: 'fill',
                    paint: {
                        'fill-opacity': 0.5,
                        color: 'red',
                    },
                }}
            />
        </Source>
    );
};

export default Polygon;
