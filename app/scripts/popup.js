import Vue from 'vue';
import App from '../component/app.vue';
import VueMaterial from 'vue-material'

Vue.use(VueMaterial);
var app= new Vue({
  el:'#app',
  data:{
    name:'vue-chrome-extension'
  },
  render: h =>h(App)
})