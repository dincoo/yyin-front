<template>
    <div class="anchor">
        <template v-for="(item,index) in anchorList">
            <div :class="{'anchor-item':true, 'read-item':!!item.read}" :key="index" @click="goAnchor(item.id)">
                <label>{{item.label}}</label>
            </div>
            <div class="line" :key="index" v-if="anchorLen!=index+1"></div>
        </template>
    </div>
</template>
<script>
export default {
    data(){
        return {
            anchorList: []
        }
    },
    computed: {
        anchorLen: function() {
            return this.anchorList.length || 0;
        }
    },
    mounted: function() {
        window.addEventListener('scroll', this.onScroll);
    },
    methods: {
        // 初始化已读节点
        initAnchor: function() {
            for (let i = 0, len = this.anchorList.length; i < len; i++) {
                let el = document.querySelector('#' + this.anchorList[i].id);
                if (this.isInViewPortOfTwo(el)) {
                    let newVal = Object.assign(this.anchorList[i], { read: true });
                    this.anchorList.splice(i, 1, newVal);
                } else {
                    let newVal = Object.assign(this.anchorList[i], { read: false });
                    this.anchorList.splice(i, 1, newVal);
                }
            }
        },
        // 滚动事件
        onScroll: function() {

            for (let i = 0, len = this.anchorList.length; i < len; i++) {
                let el = document.querySelector('#' + this.anchorList[i].id);
                if (this.isInViewPortOfTwo(el)) {
                    let newVal = Object.assign(this.anchorList[i], { read: true });
                    this.anchorList.splice(i, 1, newVal);

                } else {
                    let newVal = Object.assign(this.anchorList[i], { read: false });

                    this.anchorList.splice(i, 1, newVal);
                }
            }
            // console.log(this.anchorList)
        },
        // 判断是否在可视区域内
        isInViewPortOfTwo: function(el) {
            let viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            let top = el.getBoundingClientRect() && el.getBoundingClientRect().top;
            let h = el.getBoundingClientRect() && el.getBoundingClientRect().height;
            h = Math.min(h, Math.floor(viewPortHeight / 2))
                // console.log('top', top)
            return top + h <= viewPortHeight
        },
        // 前往锚点
        goAnchor: function(selector) {
            let anchor = document.querySelector('#' + selector);
            document.documentElement.scrollTop = anchor.offsetTop
        }
    }
}
</script>