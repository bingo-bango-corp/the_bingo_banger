import store from '@/store';

import createJob from './createJob';
import assignJob from './assignJob';
import deliverJob from './deliverJob';
import confirmDelivery from './confirmDelivery';

interface Action {
  chance: number;
  function: () => void;
  condition?: (currentJobs: any) => boolean;
}

const actions: Action[] = [
  {
    chance: .1,
    function: createJob,
    condition: (currentJobs: any) => {
      return (currentJobs.length < 10);
    },
  },
  {
    chance: .1,
    function: assignJob,
  },
  {
    chance: .1,
    function: deliverJob,
  },
  {
    chance: .1,
    function: confirmDelivery,
  },
];

export default () => {
  actions.forEach((action) => {
    const die = Math.random();

    if (
      die <= action.chance
      && checkCondition(action, store.getters['jobs/allJobs'])
    ) {
      action.function();
    }
  });
};

const checkCondition = (action: Action, currentJobs: any) => {
  return (action.condition) ? action.condition(currentJobs) : true;
};
