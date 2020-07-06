<template>
<basic-container>
  <div id="app-mass-message">
    <el-row style="margin-bottom: 12px;" :gutter="16">
        <el-col :span="4">
            <el-select v-model="queryData.way" placeholder="请选择是否全部用户">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
            <el-select v-model="queryData.msgType" placeholder="请选择消息类型">
                <el-option label="文本" value="text"></el-option>
                <el-option label="图片" value="image"></el-option>
                <el-option label="语音" value="voice"></el-option>
                <el-option label="视频" value="video"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
            <el-select v-model="queryData.flag" placeholder="请选择消息状态">
                <el-option label="发送失败" value="0"></el-option>
                <el-option label="发送成功" value="1"></el-option>
                <el-option label="已删除" value="2"></el-option>
            </el-select>
        </el-col>
        <el-col :span="8">
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button type="primary" @click="openAddDialog">新增</el-button>
        </el-col>
    </el-row>
    <el-table border :data="tableData" v-loading="loadingTableData">
        <el-table-column label="创建时间" align="center" width="180px">
            <template slot-scope="scope">
                <span>{{scope.row.createTime|formatDate}}</span>
            </template>
        </el-table-column>
        <el-table-column label="是否全部用户" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.isAll=='0'?'否':'是'}}</span>
            </template>
        </el-table-column>
        <el-table-column label="消息类型" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.msgType|formatMsgType}}</span>
            </template>
        </el-table-column>
        <el-table-column label="内容" align="center" prop="content"></el-table-column>
        <el-table-column label="消息发送状态" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.flag|formatMsgStauts}}</span>
            </template>
        </el-table-column>
        <el-table-column label="发送的总数" align="center" prop="totalCount"></el-table-column>
        <el-table-column label="过滤后总数" align="center" prop="filterCount"></el-table-column>
        <el-table-column label="发送成功数" align="center" prop="sentCount"></el-table-column>
        <el-table-column label="发送失败数" align="center" prop="errorCount"></el-table-column>
        <el-table-column label="操作" fixed="right" width="66px" align="center">
            <template slot-scope="scope">
                <el-button type="text" @click="deleteMassMassge(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row>
        <el-col :span="24">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-col>
    </el-row>
    <el-dialog title="新增群发消息" :visible.sync="showAddMassMessageDialog">
        <el-form label-width="120px" :model="addFormData" ref="massMessageFormRef">
            <el-form-item label="全部用户发送" prop="way">
                <el-select v-model="addFormData.way">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发送类型" prop="sendType" v-if="addFormData.way==='2'">
                <div>
                    <el-select v-model="addFormData.sendType">
                        <el-option label="指定标签" value="1"></el-option>
                        <el-option label="指定用户" value="0"></el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="用户标签" prop="tagIds" v-if="addFormData.way==='2'&&addFormData.sendType==='1'">
                <el-checkbox-group v-model="addFormData.tagIds">
                    <el-checkbox v-for="tag in tagList" :label="tag.id" :key="tag.id">{{tag.name||tag.tagName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="用户" v-if="addFormData.way==='2'&&addFormData.sendType==='0'">
                <div>
                    <el-row>
                        <el-button type="primary" @click="openChooseUser">选择用户</el-button>
                    </el-row>
                    <el-row>
                        <el-tag v-for="(item,index) in selectedUsers" :key="index">{{item.nickname}}</el-tag>
                    </el-row>
                </div>
            </el-form-item>
            <el-form-item label="回复消息">
                <message-tabs ref="messageTabsRef"></message-tabs>
            </el-form-item>
        </el-form>
        <choose-user ref="chooseUerRef"></choose-user>
        <div slot="footer">
            <el-button @click="showAddMassMessageDialog=false">取消</el-button>
            <el-button type="primary" @click="addMassMessage">提交并发送</el-button>
        </div>
    </el-dialog>
</div>
</basic-container>
</template>

<script>
import {getMassRecord,deleteRecord,sendMassMessage} from  '@/api/wxManageApi/wx-mass-message'
import ChooseUser from '@/components/wxManage/choose-user'
import MessageTabs from '@/components/wxManage/message-tabs'
import {getTags} from  '@/api/wxManageApi/wx-user-list'
import {paddZero} from '@/util/util'
export default {
    components:{
        ChooseUser,
        MessageTabs
    },
    data(){
        return {
            tableData: [],
            showAddMassMessageDialog: false,
            queryData: {
                way: '',
                flag: '',
                msgType: ''
            },
            pageSize: 10,
            currentPage: 1,
            loadingTableData: false,
            total: 0,
            tagList: [],
            checkTagList: [],
            addFormData: {
                way: '',
                sendType: '',
                tagIds: [],
                openIds: []
            },
            selectedUsers: []
        }
                
    },
    created() {
        this.getList();
    },
    methods: {
        // 获取列表
        getList: function() {
            var params = Object.assign(this.queryData, {
                size: this.pageSize,
                current: this.currentPage
            });
            var self = this;
            self.loadingTableData = true;
            getMassRecord(params).then(function(res) {
                self.tableData = res.data.list;
                self.total = res.data.totalCount;
                self.loadingTableData = false;
            }).catch(function(err) {
                console.log(err)
                self.loadingTableData = false;
            });
        },
        // 删除
        deleteMassMassge: function(row) {
            var self = this;
            deleteRecord({
                id: row.id
            }).then(function(res) {
                console.log(res)
                self.getList();
                self.$message({
                    type: 'success',
                    message: '删除成功'
                })
            })
        },
        // 新增群发消息
        addMassMessage: function() {
            var self = this;
            var params = {
                way: this.addFormData.way
            };
            // 指定用户发送
            if (params.way === '2' && this.addFormData.sendType === '0') {
                params.way = '2';
                params.openIds = this.addFormData.openIds;
                if (params.openIds.length === 1) {
                    this.$message({
                        type: 'warning',
                        message: '指定用户需两人以上'
                    });
                    return;
                }
            } else if (params.way === '2' && this.addFormData.sendType === '1') {
                // 指定标签发送
                params.way = '3';
                params.tagIds = this.addFormData.tagIds;
            }
            var materialParams = this.$refs.messageTabsRef.buildParams();
            params = Object.assign(params, materialParams);
            sendMassMessage(params).then(function(res) {
                console.log(res)
                window.setTimeout(function() {
                    self.getList();
                }, 2000);
                self.$message({
                    type: 'success',
                    message: '新增成功'
                });
                self.showAddMassMessageDialog = false;
            })
        },
        // 获取所有标签
        getTagData: function() {
            var self = this;
            getTags().then(function(res) {
                self.tagList = res.data;
            })
        },
        // 显示新增弹框
        openAddDialog: function() {
            this.showAddMassMessageDialog = true;
            this.selectedUsers = [];
            this.getTagData();
            this.addFormData = {
                way: '',
                sendType: '',
                tagIds: [],
                openIds: []
            };
            if (this.$refs.messageTabsRef) {
                this.$refs.messageTabsRef.resetData();
            }
        },
        // 获取选择的用户
        getSelectedUser: function(val) {
            this.selectedUsers = val;
            this.addFormData.openIds = val.map(el => el.openId);
        },
        // 选择用户
        openChooseUser: function() {
            this.$refs.chooseUerRef.showUserChooseDialog = true;
            this.$refs.chooseUerRef.setChooseUser = this.getSelectedUser;
            if (this.selectedUsers.length > 0) {
                this.$refs.chooseUerRef.parentUserData = this.selectedUsers;
            }
            this.$refs.chooseUerRef.getList();
        },
        // 分页大小改变
        handleSizeChange: function(val) {
            this.pageSize = val;
            this.getList();
        },
        // 当前页改变
        handleCurrentChange: function(val) {
            this.pageSize = val;
            this.getList();
        }
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
        },
        // 获取回复类型
        formatMsgType: function(val) {
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
        // 发送状态
        formatMsgStauts: function(val) {
            var result = '';
            switch (val) {
                case '0':
                    result = '发送失败';
                    break;
                case '1':
                    result = '发送成功';
                    break;
                case '2':
                    result = '已删除';
                    break;
            }
            return result;
        }
    }
}
</script>

<style>

</style>