export type Route = 'landing' | 'catalog' | 'order';

export interface RouteState {
  route: Route;
  /** Category id to preselect when landing on the catalog, e.g. "#/catalog?cat=soup_base". */
  category?: string;
}

export const parseHash = (hash: string): RouteState => {
  const clean = hash.replace(/^#\/?/, '');
  const [path, query] = clean.split('?');
  const params = new URLSearchParams(query || '');
  const category = params.get('cat') || undefined;

  if (path === 'catalog') return { route: 'catalog', category };
  if (path === 'order') return { route: 'order', category };
  return { route: 'landing' };
};

export const hrefFor = (route: Route, category?: string): string => {
  if (route === 'landing') return '#/';
  const base = `#/${route}`;
  return category && category !== 'all' ? `${base}?cat=${category}` : base;
};

export const navigate = (route: Route, category?: string) => {
  window.location.hash = hrefFor(route, category);
  window.scrollTo({ top: 0, behavior: 'auto' });
};
