<template>
  <div class="frame">
    <iframe class="iframe" :src="this.$route.query.url" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'Frame',
  data () {
    return {
    }
  }
}
</script>

<style lang="sass">
  .frame
    overflow: hidden
    height: calc(100vh - 62px)
    .iframe
      margin: 0
      width: 100%
      height: calc(100vh - 62px)
</style>
