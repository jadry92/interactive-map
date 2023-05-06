import './map.css'
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Props {
  dataJson: DataJson[];
}

const Map: React.FC<Props> = ({dataJson}) => {
  const center: [number, number] = [4.5709, -74.2973]; // the center position of the map
 

  return (
    <MapContainer center={center} zoom={5} scrollWheelZoom={false} style={{ height: '400px' }}>
      <TileLayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png" bounds={[[-5.1191, -82.9658], [13.6659, -66.8745]]} />

      {dataJson.map((row) => (
        <Marker key={row.name} position={row.coordinates} >
          <Popup>{row.name} - {row.count}</Popup>
        </Marker>
      ))}
			

    </MapContainer>
  );
};

export default Map;
