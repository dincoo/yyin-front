<template>
<basic-container>
    <div id="app-otherReply">
    <el-row style="margin-bottom: 12px" :gutter="16">
        <el-col :span="4">
            <el-select v-model="event" placeholder="请选择事件类型">
                <el-option label="扫描" value="SCAN"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button type="primary" @click="openAddReply">新增</el-button>
        </el-col>
    </el-row>
    <el-table border highlight-current-row :data="tableData" v-loading="loadingTableData">
        <el-table-column label="序号" type="index" width="88px" align="center"></el-table-column>
        <el-table-column label="事件类型" align="center" prop="event"></el-table-column>
        <el-table-column label="事件码" align="center" prop="eventKey"></el-table-column>
        <el-table-column label="处理key" align="center" prop="handlerKey"></el-table-column>
        <el-table-column label="是否回复" align="center" prop="isReply">
            <template slot-scope="scope">
                <span>{{scope.row.isReply=='0'?'不回复':'回复'}}</span>
            </template>
        </el-table-column>
        <el-table-column label="回复id" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.eventReply&&scope.row.eventReply.id}}</span>
            </template>
        </el-table-column>
        <el-table-column label="是否可用" align="center">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.enable"  active-value="1"
                    inactive-value="0" @change="updateStatus(scope.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark"></el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="text" @click="openViewDialog(scope.row)">查看</el-button>
                <el-button type="text" @click="deleteOtherReply(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row>
        <el-col :span="24">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-col>
    </el-row>
    <el-dialog title="新增事件" :visible.sync="showOtherDialog" :close-on-click-modal="false">
        <el-form label-width="100px" ref="addOtherFormRef" :model="addFormData">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="事件类型" style="width:100%" prop="event" :rules="[{ required: true, message: '请选择事件类型', trigger: 'change' }]">
                        <el-select v-model="addFormData.event">
                            <el-option label="扫描" value="SCAN"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="处理key" label-width="80px" prop="handlerKey" :rules="[{ required: true, message: '请输入处理key', trigger: 'blur' }]">
                        <el-input type="text" v-model="addFormData.handlerKey"></el-input>
                        <!-- <el-select v-model="addFormData.handlerKey" style="width:100%">
                            <el-option label="文本"></el-option>
                            <el-option label="图片"></el-option>
                            <el-option label="语音"></el-option>
                            <el-option label="视频"></el-option>
                            <el-option label="小视频"></el-option>
                            <el-option label="地理位置"></el-option>
                            <el-option label="链接消息"></el-option>
                        </el-select> -->
                    </el-form-item>
                </el-col>
            </el-row>


            <el-form-item label="事件码" prop="eventKey" :rules="[{ required: true, message: '请输入事件码', trigger: 'blur' }]">
                <el-input type="text" v-model="addFormData.eventKey"></el-input>
            </el-form-item>
            <el-form-item label="是否添加参数">
                <el-switch v-model="addFormData.isParam" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="事件其他参数" v-if="addFormData.isParam==='1'">
                <div>
                    <el-table border highlight-current-row size="mini" stripe :data="addFormData.paramList">
                        <el-table-column label="序号" type="index" width="66px" align="center"></el-table-column>
                        <el-table-column label="参数名" align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.paramName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="参数值" align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.paramValue"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.remark"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="deleteRowParams(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="text-align: right">
                        <el-button type="text" icon="el-icon-plus" @click="addRowParams">新增一行</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="是否回复" prop="isReply" :rules="[{ required: true, message: '请选择是否回复', trigger: 'change' }]">
                <el-select v-model="addFormData.isReply">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="回复消息" v-if="addFormData.isReply==='1'">
                <div>
                    <message-tabs ref="addMessageTabsRef"></message-tabs>
                </div>

            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="showOtherDialog=false">取消</el-button>
            <el-button type="primary" @click="submitForm('addOtherFormRef')">确定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="查看事件" :visible.sync="showViewDialog" :close-on-click-modal="false">
        <el-form label-width="100px" :model="viewFormData" ref="viewFormRef">
            <el-row :gutter="16">
                <el-col :span="12">
                    <el-form-item label="事件类型" prop="event" :rules="[{ required: true, message: '请选择事件类型', trigger: 'change' }]">
                        <el-select v-model="viewFormData.event" style="width:100%">
                            <el-option label="扫描" value="SCAN"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="事件码" prop="eventKey" :rules="[{ required: true, message: '请输入事件码', trigger: 'blur' }]">
                        <el-input type="text" v-model="viewFormData.eventKey"></el-input>
                    </el-form-item>
                    <el-form-item label="处理key" prop="handlerKey" :rules="[{ required: true, message: '请输入处理key', trigger: 'blur' }]">
                        <!-- <el-select style="width:100%" v-model="viewFormData.handlerKey">
                            <el-option label="文本"></el-option>
                        </el-select> -->
                        <el-input type="text" v-model="viewFormData.handlerKey"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <span>{{viewFormData.createTime|formatDate}}</span>
                    </el-form-item>
                    <el-form-item label="更新时间">
                        <span>{{viewFormData.updateTime|formatDate}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="viewFormData.scanUrl">
                    <el-row>
                        <el-col :span="16">
                            <img :src="viewFormData.scanUrl" style="width:100%">
                            <div style="text-align: center">
                                <el-button size="small" type="primary" style="width:80px" v-clipboard:copy="viewFormData.scanUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</el-button>
                            </div>

                        </el-col>

                    </el-row>
                </el-col>
            </el-row>
            <el-form-item label="是否添加参数">
                <el-switch v-model="viewFormData.isParam" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="事件其他参数" v-if="viewFormData.isParam==='1'">
                <div>
                    <el-table border highlight-current-row size="mini" stripe :data="viewFormData.eventParamList">
                        <el-table-column label="序号" type="index" width="66px" align="center"></el-table-column>
                        <el-table-column label="参数名" align="center">
                            <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.paramName"></el-input>
                                </template>
                        </el-table-column>
                        <el-table-column label="参数值" align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.paramValue"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.remark"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                    <el-button type="text" @click="deleteRowParams(scope.$index)">删除</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
                    <div style="text-align: right">
                        <el-button type="text" icon="el-icon-plus" @click="addRowParams">新增一行</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-row :gutter="16">
                <el-col :span="24">
                    <el-form-item label="是否回复">
                        <el-switch v-model="viewFormData.isReply" active-value="1" inactive-value="0">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="回复消息" v-if="viewFormData.isReply==='1'">
                <div>
                    <message-tabs ref="viewMessageTabsRef"></message-tabs>
                </div>

            </el-form-item>
            <el-form-item label="备注" prop="remark" :rules="[{ required: true, message: '请输入备注', trigger: 'blur' }]">
                <el-input type="textarea" v-model="viewFormData.remark" :rows="4" placeholder="请输入备注"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="showViewDialog=false">取消</el-button>
            <el-button type="primary" @click="submitForm('viewFormRef')">确定</el-button>
        </div>
    </el-dialog>
</div>
</basic-container>
</template>
<script>
import {deleteReply,updateEnable,getEventConfigList,addEventConfig,updateEventConfig} from '@/api/wxManageApi/wx-reply'
import {paddZero} from '@/util/util'
import MessageTabs from '@/components/wxManage/message-tabs'
export default {
    components:{
        MessageTabs
    },
    data(){
        return {
            currentPage: 1,
            pageSize: 10,
            total: 0,
            showOtherDialog: false,
            showViewDialog: false,
            event: '',
            tableData: [],
            loadingTableData: false,
            addFormData: {
                event: '',
                eventKey: '',
                handlerKey: '',
                isReply: '1',
                msgType: '',
                enable: '',
                remark: '',
                isParam: '0',
                paramList: []
            },
            viewFormData: {}
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
                event: this.event,
                size: this.pageSize,
                current: this.currentPage
            }
            this.loadingTableData = true;
            getEventConfigList(params).then(function(res) {
                self.tableData = res.data.data;
                self.total = res.data.totalCount;
                self.loadingTableData = false;
            }).catch(function(err) {
                console.log(err)
                self.loadingTableData = false;
            })
        },
        // 删除
        deleteOtherReply: function(row) {
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
        // 参数列表添加一行参数
        addRowParams: function() {
            if (this.showOtherDialog) {
                this.addFormData.paramList.push({
                    paramName: '',
                    paramValue: ''
                });
            } else {
                this.viewFormData.eventParamList.push({
                    paramName: '',
                    paramValue: ''
                });
            }
        },
        // 删除一行参数
        deleteRowParams: function(idx) {
            if (this.showOtherDialog) {
                this.addFormData.paramList.splice(idx, 1);
            } else {
                this.viewFormData.eventParamList.splice(idx, 1);
            }
        },
        // 提交表单
        submitForm: function(formName) {
            var self = this;
            this.$refs[formName].validate(function(valid) {
                if (valid) {
                    if (formName === 'addOtherFormRef') {
                        self.addOtherReply();
                    } else {
                        self.updateOtherReply();
                    }
                } else {
                    return false;
                }
            });
        },
        // 移除表单验证
        clearFormValid: function(formName) {
            if (this.$refs[formName]) {
                this.$refs[formName].resetFields()
            }
        },
        // 打开新增弹框
        openAddReply: function() {
            this.showOtherDialog = true;
            this.clearFormValid('addOtherFormRef');
            if (this.$refs.addMessageTabsRef) {
                this.$refs.addMessageTabsRef.resetData();
            }
        },
        // 新增其他回复
        addOtherReply: function() {
            var self = this;
            var params = {
                event: this.addFormData.event,
                eventKey: this.addFormData.eventKey,
                handlerKey: this.addFormData.handlerKey,
                isReply: this.addFormData.isReply,
                enable: this.addFormData.enable,
                remark: this.addFormData.remark,
                isParam: this.addFormData.isParam,
                paramList: this.addFormData.paramList
            };
            if (params.isParam === '0') {
                delete params.paramList;
            }
            // 判断是否回复
            if (params.isReply === '1') {
                var materialParams = this.$refs.addMessageTabsRef.buildParams();
                params = Object.assign(params, materialParams);
            }
            addEventConfig(params).then(function(res) {
                console.log(res)
                self.$message({
                    type: 'success',
                    message: '新增成功'
                });
                self.getList();
                self.showOtherDialog = false;
            });
        },
        // 打开查看弹框
        openViewDialog: function(row) {
            this.showViewDialog = true;
            this.viewFormData = row;
            var self = this;
            this.$nextTick(function() {
                if (self.$refs.viewMessageTabsRef) {
                    self.$refs.viewMessageTabsRef.initData({
                        msgType: row.eventReply.msgType,
                        content: row.eventReply.content,
                        title: row.eventReply.title,
                        description: row.eventReply.description
                    });
                }
            });
        },
        // 修改其他事件
        updateOtherReply: function() {
            var self = this;
            var params = {
                id: this.viewFormData.id,
                event: this.viewFormData.event,
                eventKey: this.viewFormData.eventKey,
                handlerKey: this.viewFormData.handlerKey,
                isReply: this.viewFormData.isReply,
                enable: this.viewFormData.enable,
                remark: this.viewFormData.remark,
                isParam: this.viewFormData.isParam,
                paramList: this.viewFormData.eventParamList
            };
            if (params.isParam === '0') {
                delete params.paramList;
            }
            // 判断是否回复
            if (params.isReply === '1') {
                var materialParams = this.$refs.viewMessageTabsRef.buildParams();
                params = Object.assign(params, materialParams);
            }
            updateEventConfig(params).then(function(res) {
                console.log(res)
                self.$message({
                    type: 'success',
                    message: '修改成功'
                });
                self.getList();
                self.showViewDialog = false;
            });
        },
        onCopy: function(e) {
            console.log(e)
            this.$message({
                type: 'success',
                message: '复制成功'
            });
        },
        onError: function(e) {
            console.log(e)
            this.$message({
                type: 'error',
                message: '复制失败'
            });
        },
        handleSizeChange: function(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange: function(val) {
            this.currentPage = val;
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
        // 是和否
        commomYesOrNo: function(val) {
            return val === '0' ? '否' : '是';
        }
    }
}
</script>
