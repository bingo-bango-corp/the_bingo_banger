import firebase from 'firebase/app';
import 'firebase/functions';

import eventBus from '@/eventBus';

import store from '@/store';
import { placeholderUsers } from '../shared/getRandomPlaceholderUser';

export default async () => {
  const jobs: any[] = store.getters['jobs/deliveredJobs'];
  const filteredJobs = jobs.filter((j) => {
    return placeholderUsers.includes(j.owner.uid);
  });
  const die = Math.floor(Math.random() * jobs.length);
  const job = filteredJobs[die];

  if (!job) { return; }
  if (job.state !== 'delivered') { return; }

  const toBeDeliveredBy = job.owner.uid;

  await confirmDelivery(job.id, toBeDeliveredBy);

  eventBus.$emit('event', {
    code: 'confirmDelivery',
    job,
  });
};

export const confirmDelivery = async (
  jobID: string,
  uid: string,
): Promise<void> => {
  await firebase.app().functions('europe-west1').httpsCallable('confirmDelivery')({
    jobID,
    uid,
  });
};
