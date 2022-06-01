<template>
  <div id="test">{{this.$store.state.user.info}}</div>
</template>

<script>
export default {
  name: "test",
}
</script>

<style lang="scss" scoped>
 #test {
    @include grossGlass;
    @include boxShadow;
    @include animation_cubic-bezier;

    padding: 10px;
    border-radius: 5px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 300px;
    overflow-y: auto;
  }
</style>