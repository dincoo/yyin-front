<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  watch: {},
  created() {
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  background-color: #f0f2f5;
}
.el-scrollbar{
  padding-bottom: 16px;
}
</style>
