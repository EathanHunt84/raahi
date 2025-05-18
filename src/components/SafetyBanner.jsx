import React, { useState, useEffect } from 'react';
import { safetyAlerts } from '../data/safety';
import { FaExclamationTriangle, FaInfoCircle, FaLightbulb, FaTimes } from 'react-icons/fa';

const SafetyBanner = ({ currentRouteId }) => {
  const [visible, setVisible] = useState(true);
  const [currentAlert, setCurrentAlert] = useState(null);

  // Update currentAlert and reset visibility when route or alerts change
  useEffect(() => {
    const activeAlerts = safetyAlerts.filter(alert => 
      (!alert.expiration || new Date(alert.expiration) > new Date()) &&
      (!currentRouteId || alert.routes.includes(currentRouteId))
    );
    setCurrentAlert(activeAlerts[0] || null);
    setVisible(true);
  }, [currentRouteId]);

  // Set a timer to auto-dismiss alert when expiration time is reached
  useEffect(() => {
    if (currentAlert?.expiration) {
      const expirationTime = new Date(currentAlert.expiration).getTime();
      const now = Date.now();
      const timeoutDuration = expirationTime - now;
      if (timeoutDuration > 0) {
        const timer = setTimeout(() => {
          setVisible(false);
        }, timeoutDuration);
        return () => clearTimeout(timer);
      }
    }
  }, [currentAlert]);

  if (!visible || !currentAlert) return null;

  const alertStyles = {
    warning: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      icon: <FaExclamationTriangle className="w-5 h-5" />,
    },
    danger: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: <FaLightbulb className="w-5 h-5" />,
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      icon: <FaInfoCircle className="w-5 h-5" />,
    },
  };

  const { bg, text, border, icon } = alertStyles[currentAlert.type] || alertStyles.info;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${bg} border-b ${border}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`${text}`}>{icon}</span>
          <p className={`text-sm font-medium ${text}`}>
            {currentAlert.message}
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className={`p-1 rounded-md hover:${bg.replace('50', '100')} ${text} hover:text-opacity-75`}
          aria-label="Dismiss alert"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SafetyBanner;
