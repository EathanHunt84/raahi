import React from 'react';

/**
 * RouteOptions component displays a list of route options with safety scores
 * and allows users to select a route for the Sakhi Circle project
 * 
 * @param {Object[]} routes - Array of route objects
 * @param {number} selectedRouteId - ID of the currently selected route
 * @param {function} onSelectRoute - Callback when a route is selected
 */
const RouteOptions = ({ routes = [], selectedRouteId = null, onSelectRoute = () => {} }) => {
  // Function to determine safety level badge color and text based on safety score
  const getSafetyInfo = (safetyScore) => {
    // Convert score to a 0-10 scale if it's on a different scale
    const normalizedScore = safetyScore > 5 ? safetyScore : safetyScore * 2;
    
    if (normalizedScore > 7) {
      return {
        color: 'bg-green-100 text-green-800 border-green-200',
        textColor: 'text-green-700',
        icon: '✓',
        label: 'Safe',
        description: 'This route has good lighting and high foot traffic'
      };
    } else if (normalizedScore >= 4) {
      return {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        textColor: 'text-yellow-700',
        icon: '!',
        label: 'Moderate',
        description: 'This route has some safety concerns'
      };
    } else {
      return {
        color: 'bg-red-100 text-red-800 border-red-200',
        textColor: 'text-red-700',
        icon: '⚠',
        label: 'Unsafe',
        description: 'This route has poor lighting and low foot traffic'
      };
    }
  };

  // Calculate estimated walking time based on route length (simplified)
  const getEstimatedTime = (coordinates) => {
    // This is a very simplified calculation
    // In a real app, you would calculate actual distance and use average walking speed
    return Math.floor(5 + coordinates.length * 2) + ' mins';
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-600 text-white">
        <h2 className="text-xl font-bold">Sakhi Circle Routes</h2>
        <p className="text-sm opacity-90">Select the route that works best for you</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {routes.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No routes available
          </div>
        ) : (
          routes.map((route) => {
            const safetyInfo = getSafetyInfo(route.safetyScore);
            const isSelected = selectedRouteId === route.id;
            
            return (
              <div
                key={route.id}
                onClick={() => onSelectRoute(route.id)}
                className={`p-4 cursor-pointer transition-colors duration-200 ${
                  isSelected 
                    ? 'bg-blue-50 border-l-4 border-blue-500' 
                    : 'hover:bg-gray-50 border-l-4 border-transparent'
                }`}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectRoute(route.id);
                    e.preventDefault();
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{route.name}</h3>
                      {isSelected && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Selected
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-1 text-sm text-gray-500">
                      {getEstimatedTime(route.coordinates)} • {route.coordinates.length - 1} turns
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${safetyInfo.color}`}
                      >
                        <span className="mr-1">{safetyInfo.icon}</span>
                        {safetyInfo.label}
                      </span>
                      
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {route.footTraffic} Traffic
                      </span>
                      
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {route.lighting} Lighting
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0 flex flex-col items-end">
                    <div 
                      className={`text-2xl font-bold ${safetyInfo.textColor}`}
                    >
                      {route.safetyScore}
                    </div>
                    <div className="text-xs text-gray-500">Safety Score</div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-sm text-gray-500 flex justify-between">
                    <div>
                      Crime Rate: <span className="font-medium">{route.crimeRate}</span>
                    </div>
                    
                    {isSelected ? (
                      <button 
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        onClick={(e) => {
                          // Handle navigation in a real app
                          e.stopPropagation();
                          alert(`Navigating via ${route.name}`);
                        }}
                      >
                        Start Navigation
                      </button>
                    ) : (
                      <button 
                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRoute(route.id);
                        }}
                      >
                        Select Route
                      </button>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-3 text-sm text-gray-600 bg-blue-50 p-2 rounded">
                    {safetyInfo.description}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Sakhi Circle prioritizes your safety with real-time route assessments
        </p>
      </div>
    </div>
  );
};

export default RouteOptions;