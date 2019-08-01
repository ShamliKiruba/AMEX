<template>
  <div id="app">
    <Header-Container></Header-Container>
    <Feature/>
  </div>
</template>

<script>
import Feature from './components/Feature.vue'
import HeaderContainer from './components/HeaderContainer.vue'
import WebStorage from './common/WebStorage.js'

export default {
  name: 'app',
  components: {
    Feature,
    HeaderContainer
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

<style lang="scss">
@import './assets/scss/global.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
