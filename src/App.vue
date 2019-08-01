<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import WebStorage from './common/WebStorage.js'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('position: ', position);
        let currentLocation = {
          lat : position.coords.latitude,
          lng : position.coords.longitude
        }
        WebStorage.setCollection('currentLocation', currentLocation);
      }, function(error) {
          console.log(error,'geo loc err');
      });
    } else {
        console.log('Sorry. geolocation not supported');
    }
  }
}
</script>

<style>
@import './assets/scss/global.scss'
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
