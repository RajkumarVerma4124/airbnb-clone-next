import { useState } from 'react'
import ReactMapGL,{Marker,Popup} from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'
function Map({searchResults}) {

    const [selectedLocation,setSelectedLocation] = useState({})
    //Transform the search result object into {latitude:'',longitude:''} object

    const coordinates = searchResults.map(({long,lat}) => ({
        longitude:long,latitude:lat
    }))

    const center = getCenter(coordinates);

    const [viewport,setViewport] = useState({
        width:'100%',
        height:'100%',
        latitude:center.latitude,
        longitude:center.longitude,
        zoom:11
    });

    return (
        <ReactMapGL mapStyle={process.env.mapbox_style_url}
        mapboxApiAccessToken = {process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result=>(
                <div key={result.long}>
                    <Marker longitude={result.long} latitude={result.lat} offsetLeft={-20} offsetTop={-10}>
                        <p onClick={()=>setSelectedLocation(result)} className='cursor-pointer text-2xl animate-bounce' aria-label="flag">
                          📌
                        </p>
                    </Marker>

                    {selectedLocation.long === result.long ? (
                        <Popup onClose={()=>setSelectedLocation({})} closeOnClick={true} latitude={result.lat} longitude={result.long}>{result.title}</Popup>
                    ):false}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
