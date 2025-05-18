import React, { useState } from "react";
import MapView from "./components/MapView";
import RouteOptions from "./components/RouteOptions";
import SocialFeed from "./components/SocialFeed";
import { routes } from "./data/routes";
import SafetyBanner from './components/SafetyBanner';

export default function App() {
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0].id);

  const handleSelectRoute = (id) => {
    setSelectedRouteId(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-pink-700">Sakhi Circle</h1>

      {/* Add SafetyBanner below the title */}
      <SafetyBanner 
        key={selectedRouteId}
        currentRouteId={selectedRouteId} 
    />


      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Left: Route Options */}
        <div className="md:w-1/3 space-y-6">
          <RouteOptions
            routes={routes}
            selectedRouteId={selectedRouteId}
            onSelectRoute={handleSelectRoute}
          />
          <SocialFeed routeId={selectedRouteId} />
        </div>

        {/* Right: Map View */}
        <div className="md:w-2/3 h-[calc(100vh-150px)]">
          <MapView 
            routes={routes} 
            selectedRouteId={selectedRouteId}
            onSelectRoute={handleSelectRoute}
          />
        </div>
      </div>
    </div>
  );
}
