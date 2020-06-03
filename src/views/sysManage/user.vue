<template>
<basic-container>
    <section>
        <div>
            <el-row style="margin-bottom: 10px;">
                <el-col :span="5">
                    <el-input v-model="userName" size="small" placeholder="用户名"></el-input>
                </el-col>
                <el-col :span="17">
                    <el-button style="margin-left:12px;" type="primary" size="small" icon="el-icon-search" @click="searchInfo" :loading="searchLoading">查询</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-button shiro:hasPermission="sys:user:save" type="primary" size="small" icon="el-icon-plus" @click="addInfo">新增</el-button>
                    
                    <el-button shiro:hasPermission="sys:user:delete" type="danger" size="small" icon="el-icon-delete" @click="deleteInfo">删除</el-button>
                </el-col>
            </el-row>
            <el-row class="paddingTop10">
                <el-col>
                    <el-table
                            ref="multipleTable"
                            :data="userList"
                            v-loading="tableLoading"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                label="序号"
                                width="50">
                            <template slot-scope="scope">
                                <span>{{(scope.$index +1)+(currentPage-1)*size}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="username"
                                label="用户名"
                                width="150px">
                        </el-table-column>
                        <!--<el-table-column
                                prop="deptName"
                                label="部门"
                                show-overflow-tooltip>
                        </el-table-column>-->
                        <el-table-column
                                prop="email"
                                label="邮箱"
                                width="250px">
                        </el-table-column>
                        <el-table-column
                                prop="mobile"
                                label="手机号"
                                width="250px"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                label="状态"
                                width="80px">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.status|statesType">
                                    {{ scope.row.status|statesFormat }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="创建时间"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right">
                            <template slot-scope="scope">
                                <el-button shiro:hasPermission="sys:user:update" type="text" size="small" icon="el-icon-edit" @click="modifyInfo(scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页-->
                    <el-row>
                        <el-col :span="24" style="padding-top: 20px;text-align: right;">
                            <el-pagination v-if="total>0" :diabled="requestFlag"
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="size"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total">
                            </el-pagination>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <!--新增 / 编辑-->
        <el-dialog :title="panelTitle" :visible.sync="showHide">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username" placeholder="登录帐号"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="密码" prop="passwd" v-if="addModifyFlag">
                        <el-input v-model="ruleForm.passwd"
                                  type="password"
                                  placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱"  prop="email">
                        <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码"  prop="mobile">
                        <el-input v-model="ruleForm.mobile" placeholder="手机号" :maxlength=11 ></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="roleIdList">
                        <el-checkbox-group v-model="ruleForm.roleIdList">
                            <template  >
                                <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
                                    <span v-text="item.roleName"></span>
                                </el-checkbox>
                            </template>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-radio-group v-model="ruleForm.status">
                            <el-radio label=0 name="status">禁用</el-radio>
                            <el-radio label=1 naem="status">正常</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    
                </el-form>
                <div slot="footer">
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="getBack">返回</el-button>
                </div>
        </el-dialog>
      
    </section>
    </basic-container>
</template>
<script>
import {validateUserName,resetPwd,deleteUser,userDetails,ModifyUser,addUser,userList,roleSelectList} from '@/api/sysManageApi/adminApi'
export default {
    data(){
        var self = this;
            var validateEmail = function(rule, value, callback){
                var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                if (value&&!reg.test(value.trim())) {
                    callback(new Error('邮箱格式不正确!'));
                } else {
                    callback();
                }
            };
            var validatePhoneNum = function(rule, value, callback){
                if(value&&!(/^1[34578]\d{9}$/.test(value))){
                    callback(new Error('手机号码不合法!'));
                }else{
                    callback();
                }
            };
            var validateUsername = function (rule,value,callback) {
                if (!self.addModifyFlag){
                    callback();
                }else {
                    var params = {username:value};
                    validateUserName(params).then(function (res) {
                        if(!res.data){
                            callback(new Error('该用户名已存在！'));
                        }else {
                            callback();
                        }
                    })
                }
            };
            const validRoleList=(rule,value,callback)=>{
                console.log(value)
                if(value&&value.length===0){
                    callback(new Error('请至少选择一个角色'));
                }else{
                    callback();
                }
            }
            return {
                addModifyFlag: true,
                userName: '',
                panelTitle: '',
                showHide: false,
                userList: [],
                multipleSelection: [],
                total:10,
                size:10,
                currentPage: 1,
                roleList:[],
                userDetails:null,
                ruleForm: {
                    username: '',
                    // deptName: '',
                    passwd: '',
                    email: '',
                    mobile: '',
                    roleIdList: [],
                    status: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                        { required:true, validator:validateUsername, trigger: 'blur' }
                    ],
                   
                    passwd: [
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min: 6, max: 12, message: '密码长度在6到12位之间', trigger: 'blur' }
                    ],
                    email: [
                       /* { required: true, message: '请输入邮箱', trigger: 'change' },*/
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                    mobile: [
                        { validator: validatePhoneNum, trigger: 'blur' },
                        { min: 11, max: 11, message: '手机号的长度为11位', trigger: 'blur' }
                    ],
                    roleIdList: [
                        {  required: true, trigger: 'change', validator:validRoleList }
                    ],
                    status: [
                        { required: true, message: '状态不能为空', trigger: 'change' }
                    ]
                },
                searchLoading: false,
                tableLoading: false,
                requestFlag:false,
               
            };
    
    },
    methods: {
           
            getRoleSelectList: function(){
                var self  = this;
                roleSelectList({flag: '1'}).then(function(res){
                    self.roleList =res.data;
                   /* vm.deleteLoading();*/
                })
            },
            getUserList: function(){
                var prams = {
                    username: this.userName.trim(),
                    size: this.size,
                    current: this.currentPage
                };
                var self = this;
                userList(prams).then(function(res){
                    console.log(res)
                    self.searchLoading = false;
                    self.tableLoading = false;
                    self.requestFlag = false;
                    self.userList =  res.data.list;
                    self.total = res.data.totalCount;
                    self.currentPage = res.data.currPage;
                    self.size = res.data.pageSize;
                });
            },
            handleSelectionChange: function(val){
                this.multipleSelection = val;
            },
            handleSizeChange: function(val) {
                this.size = val;
                this.tableLoading = true;
                this.searchLoading = true;
                this.requestFlag = true;
                this.getUserList();
            },
            handleCurrentChange: function(val) {
                this.currentPage = val;
                this.tableLoading = true;
                this.searchLoading = true;
                this.requestFlag = true;
                this.getUserList();
            },
            submitForm: function(formName){
                var self = this;
                this.tableLoading = true;
                this.searchLoading = true;
                this.requestFlag = true;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        if(self.addModifyFlag){ // 添加数据
                            let params = Object.assign(self.ruleForm /*,{deptId: self.selectZTreeData.id}*/);
                            addUser(params).then(function(res){
                                console.log(res)
                                self.$message({type: 'success', message: '添加成功!'});
                                self.showHide = false;
                                self.getUserList();
                            });
                        }else{ // 修改数据
                            let params = Object.assign(self.ruleForm ,{
                                id: self.userDetails.id,
                                /*deptId:self.userDetails.deptId*/
                            });
                            ModifyUser(params).then(function(res){
                                if(res.data === 1){
                                    self.$message({type: 'success', message: '修改成功!'});
                                    self.showHide = false;
                                    self.getUserList(); // 重新获取数据列表;
                                }else{
                                    self.$message({type: 'error', message: '修改失败!'});
                                }
                            });
                        }
                    } else {
                        self.tableLoading = false;
                        self.searchLoading = false;
                        self.requestFlag = false;
                        return false;
                    }
                });
            },
            searchInfo:function(){
                this.searchLoading = true;
                this.tableLoading = true;
                this.requestFlag = true;
                this.getUserList()
            },
            addInfo: function(){
                this.addModifyFlag = true;
                this.panelTitle = "新增";
                this.showHide = true;
                if(this.$refs["ruleForm"])
                    this.$refs["ruleForm"].resetFields();
            },
            modifyInfo: function(row){
                this.addModifyFlag = false;
                this.panelTitle = "修改";
                if(this.$refs["ruleForm"])
                    this.$refs["ruleForm"].resetFields();
                var msg = '';
                var flag = false;
                if(flag){
                    this.$message({
                        message: msg,
                        type: 'warning'
                    });
                    return false;
                }
                this.showHide = true;
                var selectData = row;
                var self = this;
                userDetails(selectData.id).then(function(res){
                    if(res.data.roleIdList === null || res.data.roleIdList === undefined ){
                        res.data.roleIdList = [];
                    }
                    self.userDetails = res.data;
                    self.ruleForm = {
                        username: self.userDetails.username,
                        // deptName: self.userDetails.deptName,
                        email: self.userDetails.email,
                        mobile: self.userDetails.mobile,
                        roleIdList: self.userDetails.roleIdList,
                        status: self.userDetails.status.toString(),
                    };
                });
            },
            deleteInfo: function(){
                if(this.multipleSelection.length == 0){
                    this.$message({
                        message: '没有选中用户',
                        type: 'warning'
                    });
                    return false;
                }
                var self = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    var userIds = [];
                    self.multipleSelection.map( function(item){
                        userIds.push(item.id);
                    });
                    self.searchLoading = true;
                    self.tableLoading = true;
                    self.requestFlag = true;
                    var params = JSON.stringify(userIds);
                    deleteUser(params).then(function(res){
                        if(res.data >= 1){
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            self.getUserList();
                        }else{
                            self.searchLoading = false;
                            self.tableLoading = false;
                            self.requestFlag = false;
                            self.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    });
                }).catch(function() {
                    self.searchLoading = false;
                    self.tableLoading = false;
                    self.requestFlag = false;
                    self.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            resetPassword: function () {
                if(this.multipleSelection.length == 0){
                    this.$message({
                        message: '没有选中用户',
                        type: 'warning'
                    });
                    return false;
                }
                var self = this;
                this.$confirm('确定将选中的用户密码重置吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    var userIds = [];
                    self.multipleSelection.map( function(item){
                        userIds.push(item.id);
                    });
                    self.searchLoading = true;
                    self.tableLoading = true;
                    self.requestFlag = true;
                    var params = JSON.stringify(userIds);
                    resetPwd(params).then(function(res){
                        if(res.data >= 1){
                            self.$message({
                                type: 'success',
                                message: '重置密码成功!重置后的密码为888888'
                            });
                            self.getUserList();
                        }else{
                            self.searchLoading = false;
                            self.tableLoading = false;
                            self.requestFlag = false;
                            self.$message({
                                type: 'error',
                                message: '重置密码失败!'
                            });
                        }
                    });
                }).catch(function() {
                    self.searchLoading = false;
                    self.tableLoading = false;
                    self.requestFlag = false;
                    self.$message({
                        type: 'info',
                        message: '已取消重置密码'
                    });
                });
            },
            getBack: function(){
                this.showHide = false;
            },
           
        },
        filters: {
            statesFormat: function (value) {
                switch (value){
                    case 0: return "禁用"; 
                    case 1: return "正常"; 
                    default: return ""; 
                }
            },
            statesType: function (value) {
                switch (value){
                    case 0: return "warning"; 
                    case 1: return "success"; 
                    default: return ""; 
                }
            }
        },
        mounted: function () {
            this.searchLoading = true;
            this.tableLoading = true;
            this.requestFlag = true;
            this.getUserList();
            // this.getDepartList();
            this.getRoleSelectList();
        }
}
</script>