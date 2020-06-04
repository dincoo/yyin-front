<template>
  <div class="top-menu">
    <el-menu  text-color="#333"
               :default-active="activeIndex"
               mode="horizontal"
               
               >
        <template v-for="item in items">
        <el-menu-item v-if="!item.children||item.children.length===0" :index="item.id"
                      @click.native="openMenu(item)"
                      :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name||generateTitle(item)}}</span>
          </template>
        </el-menu-item>
        <el-submenu v-else  :key="item.id" :index="item.id">
          <template slot="title">
             <i :class="item.icon"></i>
            <span>{{item.name||generateTitle(item)}}</span>
          </template>
          <template v-for="sub in item.children" >
            <el-menu-item v-if="!sub.children||sub.children.length===0" 
                :key="sub.path" 
                @click.native="openMenu(sub)"
                :index="sub.path">{{sub.name}}</el-menu-item>
            <el-submenu  v-else  :key="sub.id" :index="sub.id">
              <template slot="title">
                <i :class="sub.icon"></i>
                <span>{{sub.name}}</span>
              </template>
              <el-menu-item v-for="subChild in sub.children" style="background-color:#fff"
                  :key="subChild.path" 
                  :index="subChild.path"
                  @click.native="openMenu(subChild)">
                {{subChild.name}}
              </el-menu-item>
            </el-submenu>
          </template>
          
        </el-submenu>
      </template>
      </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isURL, validatenull } from '@/util/validate'
import { deepClone } from '@/util/util'
export default {
  name: "top-menu",
  data() {
    return {
      activeIndex: "0",
      items: []
    };
  },
  created() {
    console.log(this.layoutType)
    this.getMenu();
  },
  computed: {
    ...mapGetters(["tagCurrent", "menu","menuAll","website"]),
    layoutType(){
      return this.$store.getters.website.layoutType
    }
  },
  methods: {
      // 添加path路径
      addPath(ele, first) {
        const menu = this.website.menu;
        const propsConfig = menu.props;
        const propsDefault = {
            label: propsConfig.label || 'name',
            path: propsConfig.path || 'path',
            icon: propsConfig.icon || 'icon',
            children: propsConfig.children || 'children'
        };
        const icon = ele[propsDefault.icon];
        ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
        const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
        if (!isChild) ele[propsDefault.children] = [];
        if (!isChild && first && !isURL(ele[propsDefault.path])) {
            ele[propsDefault.path] = ele[propsDefault.path] + '/index'
        } else {
            if (!ele[propsDefault.path]) {
                let parentPath = ''
                if (propsDefault.path) {
                    let pathList = ele[propsDefault.children][0].path.split('/')
                    parentPath = '/' + pathList[1]
                }
                ele[propsDefault.path] = parentPath
            }
            ele[propsDefault.children].forEach(child => {
                this.addPath(child);
            })
        }

    },
    getMenu() {
      this.$store.dispatch("GetTopMenu").then(res => {
        this.items = res.module;
        if(this.layoutType==='top'){
          let menu = deepClone(res.asider);
          menu.forEach(ele => {
                  this.addPath(ele, true);
              })
          this.$router.$avueRouter.formatRoutes(menu, true);
          for(let it of this.items){
            let childMenu=[]
            for(let el of menu){
              if(el.parentId==it.id){
                childMenu.push(el)
              }
            }
            it.children=childMenu
          }
          this.$store.commit('SET_MENU_MODULE',this.items)
          console.log(this.items)
        }else{
          if(this.items.length>0){
            this.openMenu(this.items[0])
          }
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
      if(this.layoutType==='top'){
        console.log(item)
        this.$router.push({
          path: this.$router.$avueRouter.getPath({
            name: item.name,
            src: item.path,
            i18n: item.meta?item.meta.i18n:''
          })
        });
        return 
      }
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
        
      });
    }
  }
};
</script>