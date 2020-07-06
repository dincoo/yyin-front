<template>
<basic-container>
  <div id="app-attentionReply">
    <el-row style="margin-bottom: 12px">
        <el-col :span="24">
            <el-button type="primary" @click="openAddReply">新增</el-button>
        </el-col>
    </el-row>
    <el-table border highlight-current-row :data="tableData">
        <el-table-column type="index" label="序号" width="66px" align="center"></el-table-column>
        <el-table-column label="回复消息类型" align="center">
            <template slot-scope="scope">
                <span>{{getReplyType(scope.row.replyType)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="是否可用" align="center">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.enable"  active-value="1"
                    inactive-value="0" @change="updateStatus(scope.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="text" @click="openEditReply(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteAttentionReply(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row>
        <el-col :span="24">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-col>
    </el-row>
    <el-dialog title="修改回复消息" :visible.sync="showAttentionReplyDialog">
        <el-form label-width="80px">
            <el-form-item label="回复消息">
                <message-tabs ref="messageTabsRef"></message-tabs>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="showAttentionReplyDialog=false">取消</el-button>
            <el-button type="primary" @click="submitReply">确定</el-button>
        </div>
    </el-dialog>
    
</div>
</basic-container>
</template>

<script>
import {getFollowReply,deleteReply,addFollowReply,updateFollowReply,updateEnable} from '@/api/wxManageApi/wx-reply'
import MessageTabs from '@/components/wxManage/message-tabs'
export default {
    components:{
        MessageTabs
    },
    data(){
        return {
                tableData: [],
                dialogTitle: '修改回复消息',
                showAttentionReplyDialog: false,
                selectedRow: null,
                currentPage: 1,
                pageSize: 10,
                total: 0
        }
    },
    created() {
        this.getList();
    },
    methods: {

        // 新增关注回复
        openAddReply: function() {
            this.dialogTitle = '新增回复消息';
            this.showAttentionReplyDialog = true;
        },
        // 修改关注回复
        openEditReply: function(row) {
            this.dialogTitle = '修改回复消息';
            this.showAttentionReplyDialog = true;
            this.selectedRow = row;
            var self = this;
            this.$nextTick(function() {
                self.$refs.messageTabsRef.initData({
                    msgType: row.eventReply.msgType,
                    content: row.eventReply.content,
                    title: row.eventReply.title,
                    description: row.eventReply.description
                });
            });

        },
        // 获取数据
        getList: function() {
            var self = this;
            var params = {
                size: this.pageSize,
                current: this.currentPage
            }
            getFollowReply(params).then(function(res) {
                self.tableData = res.data.data;
                self.total = res.data.totalCount
            })
        },
        // 删除
        deleteAttentionReply: function(row) {
            var self = this;
            var params = {
                id: row.id
            }
            this.$confirm('确定要删除该数据吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function() {
                deleteReply(params).then(function(res) {
                    console.log(res)
                    self.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    self.getList();
                })
            }).catch();
        },
        // 新增/修改回复
        submitReply: function() {
            var self = this;
            var params = this.$refs.messageTabsRef.buildParams();
            if (this.dialogTitle === '新增回复消息') {
                addFollowReply(params).then(function(res) {
                    console.log(res)
                    self.$message({
                        type: 'success',
                        message: '新增成功'
                    });
                    self.getList();
                    self.showAttentionReplyDialog = false;
                })
            } else {
                params.id = self.selectedRow.id;
                updateFollowReply(params).then(function(res) {
                    console.log(res)
                    self.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    self.getList();
                    self.showAttentionReplyDialog = false;
                })
            }

        },
        // 获取回复类型
        getReplyType(val) {
            var result = '';
            switch (val) {
                case 'text':
                    result = '文本';
                    break;
                case 'image':
                    result = '图片';
                    break;
                case 'video':
                    result = '视频';
                    break;
                case 'voice':
                    result = '语音';
                    break;
            }
            return result;
        },
        // 修改可用状态
        updateStatus: function(row) {
            var self = this;
            var params = {
                id: row.id,
                enable: row.enable
            }
            updateEnable(params).then(function(res) {
                console.log(res)
                self.$message({
                    type: 'success',
                    message: '状态修改成功'
                });
                self.getList();
            })
        },
        handleSizeChange: function(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.getList();
        }
    }
}
</script>

<style>
.bottom {
        margin: 8px auto;
        line-height: 12px;
        text-align: center;
    }
</style>