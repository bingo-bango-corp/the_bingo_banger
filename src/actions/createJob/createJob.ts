import getRandomTemplate from './getRandomTemplate';
import store from '@/store';

import eventBus from '@/eventBus';

export default async () => {
  const template = getRandomTemplate();

  store.dispatch('jobs/insert', template);

  eventBus.$emit('event', {
    code: 'create',
    job: template,
  });
};
