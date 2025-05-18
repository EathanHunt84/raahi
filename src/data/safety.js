export const safetyAlerts = [
  {
    id: 1,
    type: 'warning',
    message: 'High Pedestrian Traffic Expected',
    severity: 'medium',
    icon: 'crowd',
    routes: [1, 3],
    expiration: '2025-05-17T20:00:00Z'
  },
  {
    id: 2,
    type: 'danger',
    message: 'Low Lighting Conditions Reported',
    severity: 'high',
    icon: 'lightbulb',
    routes: [2],
    expiration: null
  },
  {
    id: 3,
    type: 'info',
    message: 'Construction Work Ahead - Detour Suggested',
    severity: 'low',
    icon: 'construction',
    routes: [1, 2, 3],
    expiration: '2025-05-20T08:00:00Z'
  }
];
