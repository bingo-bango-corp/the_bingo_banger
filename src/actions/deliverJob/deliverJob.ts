import firebase from 'firebase/app';
import 'firebase/functions';

import eventBus from '@/eventBus';

import store from '@/store';
import { placeholderUsers } from '../shared/getRandomPlaceholderUser';

export default async () => {
  const jobs: any[] = store.getters['jobs/assignedJobs'];
  const filteredJobs = jobs.filter((j) => {
    return placeholderUsers.includes(j.assignee.uid);
  });
  const die = Math.floor(Math.random() * jobs.length);
  const job = filteredJobs[die];

  if (!job) { return; }

  const toBeDelivered = job.assignee.uid;

  await deliverJob(job.id, toBeDelivered);

  eventBus.$emit('event', {
    code: 'deliver',
    job,
  });
};

export const deliverJob = async (
  jobID: string,
  uid: string,
): Promise<void> => {
  await firebase.app().functions('europe-west1').httpsCallable('deliverJob')({
    jobID,
    uid,
  });
};
