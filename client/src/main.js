import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyBqLUXaDvnDR2CoBvY94anzYi1P1o19DKs",
  authDomain: "fbauthdemo-2a451.firebaseapp.com",
  databaseURL: "https://fbauthdemo-2a451.firebaseio.com",
  projectId: "fbauthdemo-2a451",
  storageBucket: "",
  messagingSenderId: "839675573680",
  appId: "1:839675573680:web:b7e921f299469934659275"
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
