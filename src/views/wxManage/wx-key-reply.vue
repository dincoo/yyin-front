<template>
<basic-container>
  <div id="app-keyReply">
    <el-row :gutter="16" style="margin-bottom: 12px;">
        <el-col :span="4">
            <el-input type="text" v-model="keyword" placeholder="请输入关键词" clearable></el-input>
        </el-col>
        <el-col :span="4">
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button type="primary" @click="openAddReply">新增</el-button>
        </el-col>
    </el-row>

    <el-table border highlight-current-row :data="tableData">
        <el-table-column type="index" label="序号" width="66px" align="center"></el-table-column>
        <el-table-column label="关键词" align="center" prop="keyword"></el-table-column>
        <el-table-column label="匹配类型" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.matchingType=='0'?'全匹配':'半匹配'}}</span>
            </template>
        </el-table-column>
        <el-table-column label="回复消息类型" align="center">
            <template slot-scope="scope">
                <span>{{getReplyType(scope.row.replyType)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                    <el-button type="text" @click="openEditReply(scope.row)">编辑</el-button>
                    <el-button type="text" @click="deleteKeyReply(scope.row)">删除</el-button>
                </template>
        </el-table-column>
    </el-table>
    <el-row>
        <el-col :span="24">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="showKeyDialog">
        <el-form label-width="80px" :model="formData">
            <el-form-item label="匹配类型">
                <el-select v-model="formData.matchingType">
                    <el-option label="全匹配" value="0"></el-option>
                    <el-option label="半匹配" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input type="text" v-model="formData.keyword"></el-input>
            </el-form-item>
            <el-form-item label="回复消息">
                <message-tabs ref="messageTabsRef"></message-tabs>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="showKeyDialog=false">取消</el-button>
            <el-button type="primary" @click="submitReply">确定</el-button>
        </div>
    </el-dialog>
</div>
</basic-container>
</template>

<script>
import {getKeywordReply,deleteReply,addKeywordReply,updateKeywordReply} from '@/api/wxManageApi/wx-reply'
import MessageTabs from '@/components/wxManage/message-tabs'
export default {
    components:{
        MessageTabs
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            total: 0,
            showKeyDialog: false,
            tableData: [],
            keyword: '',
            formData: {
                keyword: '',
                matchingType: '0'
            },
            selectedRow: null,
            dialogTitle: '新增回复消息'
        }
    },
    created() {
        this.getList();
    },
    methods: {
        // 查询列表
        getList: function() {
            var self = this;
            var params = {
                keyword: this.keyword,
                size: this.pageSize,
                current: this.currentPage
            }
            getKeywordReply(params).then(function(res) {
                self.tableData = res.data.data;
                self.total = res.data.totalCount;
            })
        },
        // 删除
        deleteKeyReply: function(row) {
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
        // 新增关键词回复
        openAddReply: function() {
            this.dialogTitle = '新增回复消息';
            this.showKeyDialog = true;
        },
        // 修关键词回复
        openEditReply: function(row) {
            this.dialogTitle = '修改回复消息';
            this.showKeyDialog = true;
            this.selectedRow = row;
            this.formData = {
                keyword: row.keyword,
                matchingType: row.matchingType
            };
            var self = this;
            this.$nextTick(function() {
                self.$refs.messageTabsRef.initData({
                    msgType: row.eventReply.msgType,
                    content: row.eventReply.content,
                    title: row.eventReply.title,
                    description: row.eventReply.description
                });
            })

        },
        // 新增/修改回复
        submitReply: function() {
            var self = this;
            var params = {
                matchingType: this.formData.matchingType,
                keyword: this.formData.keyword
            }
            if (!params.keyword) {
                this.$message({
                    type: 'warning',
                    message: '关键词不能为空'
                });
                return;
            }
            var materialParams = this.$refs.messageTabsRef.buildParams();
            params = Object.assign(params, materialParams);
            if (this.dialogTitle === '新增回复消息') {
                addKeywordReply(params).then(function(res) {
                    console.log(res)
                    self.$message({
                        type: 'success',
                        message: '新增成功'
                    });
                    self.getList();
                    self.showKeyDialog = false;
                })
            } else {
                params.id = self.selectedRow.id;
                updateKeywordReply(params).then(function(res) {
                    console.log(res)
                    self.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    self.getList();
                    self.showKeyDialog = false;
                })
            }

        },
        // 获取回复类型
        getReplyType: function(val) {
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

</style>