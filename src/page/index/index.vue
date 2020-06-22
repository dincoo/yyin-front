<template>
  <div class="avue-contail" 
       :class="{'avue--collapse':isCollapse}">
    <div class="avue-header" :style="styleHeaderObj">
      <!-- 顶部导航栏 -->
      <top />
    </div>

    <div class="avue-layout">
      <div class="avue-left" v-if="website.layoutType==='nav'">
        <!-- 左侧导航栏 -->
        <sidebar />
      </div>
      <div class="avue-main" :style="styleMainObj">
        <!-- 顶部标签卡 -->
        <tags v-if="website.layoutType==='nav'"/>
        <breadcrumb v-else></breadcrumb>
        <!-- 主体视图层 -->
        <el-scrollbar style="height:100%">
          <keep-alive>
            <router-view class="avue-view" :include="tabCache"
                         v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view class="avue-view"
                       v-if="!$route.meta.keepAlive" />
        </el-scrollbar>

      </div>
    </div>
    <!-- <el-footer class="avue-footer">
      <img src="/svg/logo.svg"
           alt=""
           class="logo">
      <p class="copyright">© 2018 Avue designed by smallwei</p>
    </el-footer> -->
    <div class="avue-shade"
         @click="showCollapse"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tags from "./tags";
import top from "./top/";
import sidebar from "./sidebar/";
import admin from "@/util/admin";
import breadcrumb from './breadcrumb'

export default {
  components: {
    top,
    tags,
    sidebar,
    breadcrumb
  },
  name: "index",
  data() {
    return {
      // layoutType:'nav',
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: "",
      styleMainObj:{},
      styleHeaderObj:{}
    };
  },
  created() {
    //实时检测刷新token
    this.refreshToken();
  },
  mounted() {
    this.init();
    this.setLayoutType(this.website.layoutType)
  },
  computed: {
    ...mapGetters(["isLock", "isCollapse", "website","tabCache"])
  },
  watch:{
    'website.layoutType':function(val){
      this.setLayoutType(val)
    }
  },
  props: [],
  methods: {
    setLayoutType(val){
      if(val==='top'){
        this.styleMainObj={
          left:'5%',
          width:'90%'
        }
        this.styleHeaderObj={
          paddingLeft:'0',
          margin:'0 auto'
        }
      }else{
        this.styleMainObj={}
        this.styleHeaderObj={}
      }
    },
    showCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    // 屏幕检测
    init() {
      this.$store.commit("SET_SCREEN", admin.getScreen());
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit("SET_SCREEN", admin.getScreen());
        }, 0);
      };
    },
    // 10分钟检测一次token
    refreshToken() {
      /*this.refreshTime = setInterval(() => {
        const token = getStore({
          name: "token",
          debug: true
        });
        const date = calcDate(token.datetime, new Date().getTime());
        if (validatenull(date)) return;
        if (!(date.seconds >= this.website.tokenTime) && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch("RefeshToken")
            .then(() => {
              this.refreshLock = false;
            })
            .catch(() => {
              this.refreshLock = false;
            });
        }
      }, 10000);*/
    }
  }
};
</script>
