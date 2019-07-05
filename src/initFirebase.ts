import * as Firebase from 'firebase/app';
import firebaseConfig from './config/firebase';

export default async () => {
  await Firebase.initializeApp(firebaseConfig);
  return Promise.resolve();
};
