<template>
  <div class="top-menu">
    <el-menu :default-active="activeIndex"
             mode="horizontal"
             text-color="#333">
      <template v-for="(item,index) in items">
        <el-menu-item :index="item.parentId+''"
                      @click.native="openMenu(item)"
                      :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name||generateTitle(item)}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "top-menu",
  data() {
    return {
      activeIndex: "0",
      items: []
    };
  },
  created() {
    this.getMenu();
  },
  computed: {
    ...mapGetters(["tagCurrent", "menu","menuAll"])
  },
  methods: {
    getMenu() {
      this.$store.dispatch("GetTopMenu").then(res => {
        this.items = res;
        console.log(res)
        if(this.items.length>0){
          this.openMenu(this.items[0])
        }
      });
    },
    generateTitle(item) {
      return this.$router.$avueRouter.generateTitle(
        item.label,
        (item.meta || {}).i18n
      );
    },
    openMenu(item) {
      this.$store.dispatch("GetMenu", item.parentId).then(data => {
        console.log(data)
        let childMenu=[]
        for(let el of this.menuAll){
          if(el.parentId==item.id){
            childMenu.push(el)
          }
        }
        console.log(childMenu)
        // if (data.length !== 0) {
          this.$router.$avueRouter.formatRoutes(childMenu, true);
        // }
        this.$store.commit('SET_MENU',childMenu)
        // let itemActive,
        //   childItemActive = 0;
        // if (item.path) {
        //   itemActive = item;
        // } else {
        //   if (this.menuAll[childItemActive].length == 0) {
        //     itemActive = this.menuAll[childItemActive];
        //   } else {
        //     itemActive = this.menuAll[childItemActive].children[childItemActive];
        //   }
        // }

        // this.$router.push({
        //   path: this.$router.$avueRouter.getPath({
        //     name: itemActive.label,
        //     src: itemActive.path,
        //     i18n: itemActive.meta?itemActive.meta.i18n:''
        //   })
        // });
        
      });
    }
  }
};
</script>