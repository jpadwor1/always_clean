'use client';
import React from 'react';
import {
  GoogleMap,
  DirectionsRenderer,
  useLoadScript,
} from '@react-google-maps/api';

const Map: React.FC = () => {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = React.useState(false);
  const [directionsResponse, setDirectionsResponse] =
    React.useState<google.maps.DirectionsResult | null>(null);

  const libraries = React.useMemo(() => ['places', 'routes'], []);

  const mapCenter = React.useMemo(
    () => ({ lat: 33.1501657, lng: -111.4429494 }),
    []
  );

  const mapOptions = React.useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY2 as string,
    libraries: libraries as any,
  });

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const onLoad = React.useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    fetchDirections(mapInstance);
  }, []);

  const fetchDirections = (mapInstance: google.maps.Map) => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: '2268 Seagull ct San Jacinto, CA 92582',
        destination: '11676 E Sunflower Lane Florence, AZ 85132',
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirectionsResponse(result);
          console.log('Directions Response:', result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

   return isLoaded && (
    <>
      <GoogleMap
        mapContainerStyle={{ width: '800px', height: '800px' }}
        center={mapCenter}
        zoom={10}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>

      {directionsResponse && (
        <div className='directions-details'>
          {directionsResponse.routes[0].legs.map((leg, i) => (
            <div key={i}>
              <h4>Leg {i + 1}</h4>
              {leg.steps.map((step, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: step.instructions }}
                ></p>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Map;
