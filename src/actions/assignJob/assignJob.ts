import firebase from 'firebase/app';
import 'firebase/functions';

import eventBus from '@/eventBus';

import store from '@/store';
import getRandomPlaceholderUser from '../shared/getRandomPlaceholderUser';

export default async () => {
  const jobs = store.getters['jobs/jobs'];
  const die = Math.floor(Math.random() * jobs.length);
  const job = jobs[die];
  const toBeAssigned = getRandomPlaceholderUser();

  if (!job) { return; }
  if (job.owner.uid === toBeAssigned) { return; }

  await takeJob(toBeAssigned, job.id);

  eventBus.$emit('event', {
    code: 'assign',
    job,
  });
};

const takeJob = async (
  uid: string,
  jobID: string,
): Promise<void> => {
  await firebase.app().functions('europe-west1').httpsCallable('takeJob')({
    jobID,
    uid,
  });
};
