import createJob from './createJob';
import assignJob from './assignJob';
import deliverJob from './deliverJob';
import confirmDelivery from './confirmDelivery';

const actions = [
  {
    chance: .02,
    function: createJob,
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
  const die = Math.random();

  actions.forEach((action) => {
    if (die <= action.chance) {
      action.function();
    }
  });
};
