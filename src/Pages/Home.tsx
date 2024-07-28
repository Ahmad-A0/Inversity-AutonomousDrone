import Header from '../Components/Header';
import MapC from '../Components/Map';

// https://github.com/shishkin/solid-maplibre
// https://github.com/maplibre/maplibre-gl-js
// https://gis-hub.gitbook.io/solid-map-gl

let Home = () => {
    return (
        <div class="w-screen h-screen">
            <Header />
            <div class='flex flex-col h-screen'>
                <MapC class="h-screen" />
                <div class="w-1/4"></div>
            </div>
        </div>
    );
};

export default Home;
