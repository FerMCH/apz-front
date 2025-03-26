export const ROUTE_CONFIG = {
  register: 'auth',
  app: 'apz',
  home: 'home',
  historial: 'historial',
  login: 'login',
  loan: 'loan'
} as const;

export type RouteKey = keyof typeof ROUTE_CONFIG;
export type Route = (typeof ROUTE_CONFIG)[RouteKey];
