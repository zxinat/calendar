<template>
  <div id="app">
    <NavBar v-if="$route.meta.showTab"/>
    <router-view />
  </div>
</template>
<script>
  import NavBar from './components/NavBar.vue'
  export default {
    components: {
      NavBar
    },
    methods: {
    }
  }
</script>
<style lang="less">
  body {
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>