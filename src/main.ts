import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as VueGoogleMaps from 'vue2-google-maps';

import initFirebase from './initFirebase';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCdjHOMn50H04pN--5zuj2OVQchr8mj1ts',
  },
});

(async () => {
  await initFirebase();

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
})();
