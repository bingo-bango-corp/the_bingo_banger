import Vue from 'vue';
import Vuex from 'vuex';
import VuexEasyFirestore from 'vuex-easy-firestore';
import firebase from 'firebase/app';

import jobs from '@/store/jobs';

const easyFirestore = VuexEasyFirestore(
  [jobs],
  { FirebaseDependency: firebase },
);

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    easyFirestore,
  ],
});
