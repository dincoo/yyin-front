<template>
  <div>
    <el-dialog title="用户消息" :visible.sync="showMessageDialog">
        <div class="message-contain" v-loading="">
            <div class="no-more" @click="goNextPage" v-if="total!==messageList.length">没有更多了</div>
            <div v-for="(item,index) in messageList" :key="index">
                <div class="message-item" v-if="item.flag=='0'">
                    <img :src="selfHeadImg" class="user-img">
                    <div class="message-content">
                        <p class="text-head your-head">{{item.createTime|formatDate}}</p>
                        <div class="text-body">
                            <span v-if="item.msgType==='text'">{{item.content}}</span>
                        </div>
                    </div>
                </div>
                <div class="message-item me" v-else>

                    <div class="message-content">
                        <p class="text-head me-head">{{item.createTime|formatDate}}</p>
                        <div class="text-body me-body">
                            <span v-if="item.msgType==='text'">{{item.content}}</span>
                        </div>
                    </div>
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" class="user-img">

                </div>
            </div>
        </div>
        <message-tabs ref="messageTabsRef"></message-tabs>
        <div slot="footer">
            <el-button type="success" @click="sendMessage">发送</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {getUserMessage,sendMessage} from '@/api/wxManageApi/wx-user-list'
import {paddZero} from '@/util/util'
import MessageTabs from './message-tabs'
export default {
    data: function() {
        return {
            showMessageDialog: false,
            messageList: [],
            openId: '',
            currentPage: 1,
            total: 0,
            loadingMessage: false,
            selfHeadImg: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
        }
    },
    components:{
        MessageTabs
    },
    methods: {
        handleRemove: function(file, fileList) {
            console.log(file, fileList);
        },
        beforeRemove(file, fileList) {
            console.log(file, fileList)
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 获取消息记录
        getMessageData: function() {
            var params = {
                openId: this.openId,
                size: 20,
                current: this.currentPage
            }
            var self = this;
            self.loadingMessage = true;
            getUserMessage(params).then(function(res) {
                self.messageList = res.data.list.reverse();
                self.total = res.data.totalCount;
                self.loadingMessage = false;
            }).catch(function(err) {
                console.log(err)
                self.loadingMessage = false;
            })
        },
        // 获取下一页聊天记录
        goNextPage: function() {
            if (this.total > this.messageList.length) {
                this.currentPage++;
                var params = {
                    openId: this.openId,
                    pageSize: 20,
                    currentPage: this.currentPage
                }
                var self = this;
                getUserMessage(params).then(function(res) {
                    self.messageList = self.messageList.concat(res.data.list);
                    self.loadingMessage = false;
                }).catch(function(err) {
                    console.log(err)
                    self.loadingMessage = false;
                })
            }
        },
        // 发送消息
        sendMessage: function() {
            var self = this;
            var params = {
                openId: this.openId,
            }
            var materialParams = this.$refs.messageTabsRef.buildParams();
            params = Object.assign(params, materialParams);
            sendMessage(params).then(function(res) {
                console.log(res)
                self.$refs.messageTabsRef.resetData();
                self.getMessageData();
            })
        },
    },
    filters: {
        // 时间戳转日期
        formatDate: function(val) {
            var now = new Date(val);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            return year + "-" + paddZero(month) + "-" + paddZero(date) + " " + paddZero(hour) + ":" + paddZero(minute) + ":" + paddZero(second);
        }
    }
}
</script>

<style>

</style>