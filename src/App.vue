<template>
  <div id="app">
    <ThemeProvider theme="dark">
      <router-view/>
    </ThemeProvider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ThemeProvider } from 'simsalabim-design';

@Component({
  components: {
    ThemeProvider
  }
})
export default class App extends Vue {
  created() {
    this.$store.dispatch('jobs/openDBChannel').catch(console.error)
  }
}
</script>

<style lang="sass">
body
  margin: 0
  padding: 0
</style>
