<template>
  <div class="basic-container" :style="styleObj">
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "basicContainer",
  data(){
    return {
      styleObj:{}
    }
  },
  computed: {
    layoutType(){
      return this.$store.getters.website.layoutType
    }
  },
  created(){
    this.setStyleObj(this.layoutType)
  },
  watch:{
    layoutType(val){
      this.setStyleObj(val)
    }
  },
  methods:{
    // 设置样式结构
    setStyleObj(val){
      console.log(val)
      if(val==='nav'){
        this.styleObj={}
      }else{
        this.styleObj={
          paddingLeft:'0',
          paddingRight:'0'
        }
      }
    }
  }
};
</script>

<style lang="scss">
.basic-container {
  padding: 10px 6px;
  border-radius: 10px;
  box-sizing: border-box;
  .el-card {
    width: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>
