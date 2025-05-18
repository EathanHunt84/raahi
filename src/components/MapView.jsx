import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { routes } from '../data/routes.js';

// Function to determine route color based on safety score
const getRouteColor = (safetyScore) => {
  if (safetyScore >= 4.0) return '#22c55e'; // Green (safe)
  if (safetyScore >= 3.0) return '#eab308'; // Yellow (moderate)
  return '#ef4444'; // Red (unsafe)
};

// Custom component to fit map to the routes
const MapBounds = ({ coordinates }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!coordinates || coordinates.length === 0) return;
    
    // Create bounds from all route coordinates
    const bounds = L.latLngBounds(coordinates.flat());
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [coordinates, map]);
  
  return null;
};

const MapView = ({ selectedRouteId = null, onSelectRoute = () => {} }) => {
  const [allCoordinates, setAllCoordinates] = useState([]);
  
  useEffect(() => {
    // Collect all coordinates for map bounds
    const coords = routes.map(route => route.coordinates);
    setAllCoordinates(coords);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-600 text-white">
          <h2 className="text-xl font-bold">Sakhi Circle Route Options</h2>
          <p className="text-sm opacity-90">Choose the safest route to your destination</p>
        </div>
        
        <div className="p-4">
          <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200">
            <MapContainer 
              center={[37.7749, -122.4194]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }} 
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Add bounds handler */}
              {allCoordinates.length > 0 && (
                <MapBounds coordinates={allCoordinates} />
              )}
              
              {/* Render all routes */}
              {routes.map((route) => {
                const routeColor = getRouteColor(route.safetyScore);
                const isSelected = selectedRouteId === route.id;
                
                return (
                  <React.Fragment key={route.id}>
                    <Polyline 
                      positions={route.coordinates}
                      pathOptions={{ 
                        color: routeColor,
                        weight: isSelected ? 7 : 5,
                        opacity: isSelected ? 0.9 : 0.7,
                        dashArray: isSelected ? undefined : "5, 5"
                      }}
                      eventHandlers={{
                        click: () => onSelectRoute(route.id)
                      }}
                    >
                      <Tooltip sticky>
                        <div>
                          <strong>{route.name}</strong>
                          <div>Safety Score: {route.safetyScore}/5</div>
                          <div>Foot Traffic: {route.footTraffic}</div>
                          <div>Lighting: {route.lighting}</div>
                          <div className="mt-1 text-xs font-semibold text-blue-600">Click to select this route</div>
                        </div>
                      </Tooltip>
                    </Polyline>
                    
                    {/* Origin marker - shared for all routes */}
                    {route.id === 1 && (
                      <Marker 
                        position={route.coordinates[0]}
                        icon={L.divIcon({
                          className: 'origin-marker',
                          html: `<div class="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full border-2 border-white">S</div>`,
                          iconSize: [24, 24],
                          iconAnchor: [12, 12]
                        })}
                      >
                        <Tooltip permanent>Start</Tooltip>
                      </Marker>
                    )}
                    
                    {/* Destination marker - shared for all routes */}
                    {route.id === 1 && (
                      <Marker 
                        position={route.coordinates[route.coordinates.length - 1]}
                        icon={L.divIcon({
                          className: 'destination-marker',
                          html: `<div class="flex items-center justify-center w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full border-2 border-white">D</div>`,
                          iconSize: [24, 24],
                          iconAnchor: [12, 12]
                        })}
                      >
                        <Tooltip permanent>End</Tooltip>
                      </Marker>
                    )}
                  </React.Fragment>
                );
              })}
            </MapContainer>
          </div>
          
          {/* Route Legend */}
          <div className="mt-4 flex flex-wrap gap-4">
            {routes.map((route) => (
              <div 
                key={route.id} 
                className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition-all hover:bg-gray-50 ${
                  selectedRouteId === route.id 
                    ? 'bg-blue-50 border-blue-500' 
                    : 'border-gray-200'
                }`}
                onClick={() => onSelectRoute(route.id)}
              >
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: getRouteColor(route.safetyScore) }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium">{route.name}</div>
                  <div className="text-xs text-gray-500">
                    Safety: {route.safetyScore}/5 · {route.lighting} lighting
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;

// export default MapView;