<template>
    <div style="padding:16px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(r,index) in records" :key="index">{{r}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    data(){
      return {
        records:[]
      }
    },
    computed:{
      routeComputed(){
        return this.$route
      }
    },
    created(){
      this.findPath()
    },
    watch:{
      routeComputed:function(){
        this.records=[]
        this.findPath()
      }
    },
    methods:{
      // 寻找面包屑路径
      findPath(){
        let path=this.$route.path
        this.records.push(this.$route.name)
        let self=this.$route.matched.find(it=>it.path===path)
        if(self&&self.parent){
          this.records.unshift(self.parent.name)
        }
        let moduleList=this.$store.state.user.menuModule
        for(let m of moduleList){
          let t=m.children.find(it=>it.path==self.parent.path)
          if(t){
            this.records.unshift(m.name)
          }
        }
      }
    }
}
</script>