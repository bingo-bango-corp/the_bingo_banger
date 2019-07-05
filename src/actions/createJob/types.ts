export interface NewJob {
  state: 'unassigned';
  owner: {
    uid: string,
  };
  description: string;
  id?: string;
  point: {
    geohash: string,
    geopoint: any,
  };
  thing: string;
  timestamp: any;
  tip: {
    cents: number,
    currency: string,
  };
  terminal: boolean;
}
