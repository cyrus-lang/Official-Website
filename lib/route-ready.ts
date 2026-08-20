type Listener = () => void;

let readyPathname: string | null = null;
const listeners = new Set<Listener>();

export function markRouteReady(pathname: string) {
  readyPathname = pathname;
  listeners.forEach((listener) => listener());
}

export function isRouteReady(pathname: string) {
  return readyPathname === pathname;
}

export function subscribeRouteReady(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
