import { NewJob } from './types';
import firebase from 'firebase/app';
import Geohash from 'latlon-geohash';

import getRandomPlaceholderUser from '../shared/getRandomPlaceholderUser';
import getRandomGeohash from './getRandomGeohash';

export const templates = [
  {
    thing: 'A Chai Latte from Starbucks',
    description: 'Andreasstr. 46, 4th floor',
  },
  {
    thing: 'Two sternis',
    description: 'Scharnweberstr. 46, the big red door',
  },
  {
    thing: 'Pack of Cool Ranch Doritos',
    description: 'Will write to you',
  },
  {
    thing: 'A Burgermeister Chicken Chili Cheese',
    description: 'Rigaer Str. 18',
  },
  {
    thing: 'A plunger…',
    description: 'Dessauer Str. 4',
  },
  {
    thing: 'A Club Mate',
    description: 'Middle of Görlitzer Park',
  },
  {
    thing: 'Mio Mate Banane',
    description: 'Grill area at Tempelhofer',
  },
  {
    thing: '2 ounces of butter',
    description: 'Lukasstr. 5',
  },
  {
    thing: 'Some hand soap',
    description: 'Frankfurter Alle 36',
  },
  {
    thing: 'A frozen salami pizza',
    description: 'Petersburger Str. 19',
  },
  {
    thing: 'A hug…',
    description: 'Warschauer Str. 85',
  },
  {
    thing: 'Pack of American Spirit Orange',
    description: 'Tempelhofer Damm 45',
  },
  {
    thing: 'OCB Blau blättchen',
    description: 'Top of the hill in Hasenheide',
  },
  {
    thing: 'OCB slim filters',
    description: 'Tempelhofer Feld by the dog area',
  },
  {
    thing: '5l grill coal',
    description: 'Rungestraße 5',
  },
  {
    thing: '5 big red onions',
    description: 'Kantstr. 8',
  },
  {
    thing: 'pack of aspirin',
    description: 'Eliasstr. 3',
  },
  {
    thing: '1 can Pringles Paprika',
    description: 'Schlosstr. 7',
  },
] as NewJob[];

export default () => {
  const die = Math.floor(Math.random() * templates.length);
  const randomGeohash = getRandomGeohash();
  const randomGeopoint = Geohash.decode(randomGeohash);
  let template = templates[die];

  template = {
    ...template,
    owner: {
      uid: getRandomPlaceholderUser(),
    },
    point: {
      geohash: randomGeohash,
      geopoint: new firebase.firestore.GeoPoint(randomGeopoint.lat, randomGeopoint.lon),
    },
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    tip: {
      cents: (Math.floor(Math.random() * 5) + 1) * 100,
      currency: 'EUR',
    },
    state: 'unassigned',
    terminal: false,
  };

  return template;
};
