import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.config.productionTip = false;

// Required for side-effects
// require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyCJn41f7pdCk9YhLB4Z00JSRAmSWx4wPUQ",
  authDomain: "face-recognition-44e92.firebaseapp.com",
  projectId: "face-recognition-44e92",
  storageBucket: "face-recognition-44e92.appspot.com",
  messagingSenderId: "267374290749",
  appId: "1:267374290749:web:55c82b53b63c3bdc258754",
  measurementId: "G-LRWHT5X5ND"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({
  timeStampsInSnapshots: true
});

Vue.prototype.$firebase = firebase;
Vue.prototype.$db = db;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
