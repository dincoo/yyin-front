<template>
     <basic-container>
        <div >
            <el-row style="margin-bottom: 10px;">
                <el-col :span="5">
                    <el-input v-model="roleName" size="small" placeholder="角色名称" clearable></el-input>
                </el-col>
                <el-col :span="17">
                    <el-button style="margin-left:12px;" type="primary" size="small" icon="el-icon-search" :loading="searchLoading"  @click="searchInfo">查询</el-button>
                    
                </el-col>
            </el-row>
            <el-row style="margin-bottom:8px">
                <el-col>
                    <el-button shiro:hasPermission="sys:role:save" type="primary" size="small" icon="el-icon-plus" @click="addInfo">新增</el-button>
                    
                    <el-button shiro:hasPermission="sys:role:delete" type="danger" size="small" icon="el-icon-delete" @click="deleteInfo">删除</el-button>
                </el-col>
            </el-row>
            <el-row class="paddingTop10">
                <el-col>
                    <el-table
                            ref="multipleTable"
                            :data="roleData"
                            v-loading="tableLoading"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                label="序号"
                                width="45">
                            <template slot-scope="scope">
                                <span>{{(scope.$index +1)+(currentPage-1)*size}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="roleName"
                                label="角色名称">
                        </el-table-column>
                        <!--<el-table-column
                                prop="deptName"
                                label="上级部门"
                                show-overflow-tooltip>
                        </el-table-column>-->
                        <el-table-column
                                prop="remark"
                                label="备注">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="创建时间">
                        </el-table-column>
                        <el-table-column label=" 操作" width="120px">
                            <template slot-scope="scope">
                                <el-button shiro:hasPermission="sys:role:update" type="text" size="small" icon="el-icon-edit" @click="modifyInfo(scope.row)">修改</el-button>
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
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="ruleForm.roleName"
                                  placeholder="角色名称"
                        ></el-input>
                    </el-form-item>
                    <!--<el-form-item label="所属部门" prop="deptName">
                        <el-input v-model="ruleForm.deptName"
                                  placeholder="所属部门"
                                  readonly="readonly"
                                  @click.native="departmentSelect"
                        ></el-input>
                    </el-form-item>-->
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="ruleForm.remark"
                                  placeholder="备注"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="功能权限">
                       <el-tree ref="roleTree" :data="zNodes02" node-key="id" :props="defaultProps" show-checkbox @check-change="handleCheckChange"></el-tree>
                    </el-form-item>
                    <!-- <el-row style="padding-bottom: 10px;">
                        <el-col :span="12">
                            <span class="roleTitle">功能权限</span> -->
                            <!-- <ul id="zTree02" class="ztree"></ul> -->
                            <!-- <el-tree :data="zNodes02" :props="defaultProps" show-checkbox @check-change="handleCheckChange"></el-tree>
                        </el-col>
                       
                    </el-row> -->
                </el-form>
                <div slot="footer">
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="getBack">返回</el-button>
                </div>
        </el-dialog>
    </basic-container>
</template>
<script>
import {roleList,addRole,roleModify,roleDetails,deleteRole} from '@/api/sysManageApi/roleApi'
import {menuAllList} from '@/api/sysManageApi/commonApi'
export default {
    data(){
            return {
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                roleName:'',
                panelTitle: '',
                showHide: false,
                roleData: [],
                multipleSelection: [],
                searchLoading: false,
                tableLoading: false,
                requestFlag:false,
                total:1,
                size:10,
                currentPage: 1,
                addModifyFlag: true,
                ruleForm: {
                    roleName: "",
                    // deptName: "",
                    remark: "",
                },
                rules: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    /*deptName: [
                        { required: true, message: '请选择上级部门', trigger: 'change' }
                    ]*/
                },
                roleDetails:'',
                treeVisible: false,
                treeLoading: false,
                zNodes: [],
                zTreeObj: null,
                selectZTreeData:'',
                zNodes02: [],
                zNodes03: [],
                zTreeObj02: null,
                // zTreeObj03: null,
                setting02: {
                    data : {
                        simpleData : {
                            enable : true,
                            rootPId : 0,
                            idKey : "id",
                            pIdKey : "parentId"
                        }
                    },
                    check : {
                        enable : true,
                        chkStyle : "checkbox",
                        chkboxType : {
                            "Y" : "ps",
                            "N" : "ps"
                        }
                    }
                },
                setting03: {
                    data : {
                        simpleData : {
                            enable : true,
                            rootPId : 0,
                            idKey : "id",
                            pIdKey : "parentId"
                        }
                    },
                    check : {
                        enable : true,
                        chkStyle : "checkbox",
                        chkboxType : {
                            "Y" : "ps",
                            "N" : "ps"
                        }
                    }
                }
            }
        },
        methods: {
            getRoleList: function(){
                var params = {
                    roleName: this.roleName,
                    size: this.size,
                    current: this.currentPage
                };
                var self = this;
                roleList(params).then(function(res){
                   /* res.data.list.map(item => {
                        item.createTime = parseTime(item.createTime);
                    });*/
                    self.searchLoading = false;
                    self.tableLoading = false;
                    self.requestFlag = false;
                    self.roleData = res.data.list;
                    self.total = res.data.totalCount;
                    self.currentPage = res.data.currPage;
                    self.size = res.data.pageSize;
                })
            },
            //  获取菜单列表
            getMenuAllList: function(){
                menuAllList().then((res)=>{
                    let list=res.data;
                    this.zNodes02 = list.filter(it=>it.type=='3');
                    
                    for(let item of this.zNodes02){
                        this.findChildData(item.id,item,list)
                    }
                    console.log(this.zNodes02)
                });
            },
            // 构建子菜单
            findChildData(parentId,parent,list){
                parent.children=[]
                for(let item of list){
                    if(item.parentId===parentId){
                        this.findChildData(item.id,item,list)
                        parent.children.push(item)
                    }
                }
            },
            // 树形控件选中数据
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            handleSelectionChange: function(val){
                this.multipleSelection = val;
            },
            handleSizeChange: function(val) {
                this.size = val;
                this.searchLoading = true;
                this.tableLoading = true;
                this.requestFlag = true;
                this.getRoleList();
            },
            handleCurrentChange: function(val) {
                this.currentPage = val;
                this.searchLoading = true;
                this.tableLoading = true;
                this.requestFlag = true;
                this.getRoleList();
            },
            submitForm: function(formName) {
                console.log(this.$refs.roleTree.getCheckedNodes())
                var self = this;
                this.searchLoading = true;
                this.tableLoading = true;
                this.requestFlag = true;
                this.$refs[formName].validate((valid)=>{
                    if (valid) {
                        var menuIds= [];
                        this.$refs.roleTree.getCheckedNodes().map( function(item){
                            menuIds.push(item.id);
                        });
                        if(menuIds.length === 0){
                            self.$message({type: 'warning', message: '请先选择至少一个功能权限!'});
                            return;
                        }
                        /*self.zTreeObj03.getCheckedNodes().map( function(item) {
                            ids.push(item.id);
                        });*/
                        if(self.addModifyFlag){ // 添加角色
                            let params = Object.assign( self.ruleForm, {
                                // deptId: self.selectZTreeData.id,
                                menuIdList: menuIds,
                                // deptIdList: ids
                            });
                            addRole(params).then(function(){
                                self.$message({type: 'success', message: '添加成功!'});
                                self.showHide = false;
                                self.getRoleList();
                            });
                        }else { // 修改角色
                            let params = Object.assign( self.ruleForm, {
                                id: self.roleDetails.id,
                                menuIdList: menuIds,
                                // deptIdList: ids,
                                // deptId: self.roleDetails.deptId
                            });
                            roleModify(params).then(function(){
                                self.$message({type: 'success', message: '修改成功!'});
                                self.showHide = false;
                                self.getRoleList();
                            });
                        }
                    } else {
                        self.searchLoading = false;
                        self.tableLoading = false;
                        self.requestFlag = false;
                        return false;
                    }
                })
            },
            searchInfo: function(){
                this.searchLoading = true;
                this.tableLoading = true;
                this.requestFlag = true;
                this.getRoleList();
            },
            addInfo: function(){
                this.addModifyFlag = true;
                this.panelTitle = "新增";
                this.showHide = true;
                if(this.$refs["ruleForm"])
                    this.$refs["ruleForm"].resetFields();
                // this.zTreeObj02.checkAllNodes(false);
                // this.zTreeObj03.checkAllNodes(false);
            },
            modifyInfo: function(row){
                var self = this;
                this.addModifyFlag = false;
                this.panelTitle = "修改";
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
                roleDetails(selectData.id).then((res)=>{
                    if(res.data.menuIdList === null || res.data.menuIdList === undefined ){
                        res.data.menuIdList = [];
                    }
                    self.roleDetails = res.data;
                    self.ruleForm = {
                        roleName: self.roleDetails.roleName,
                        // deptName: self.roleDetails.deptName,
                        remark: self.roleDetails.remark
                    };
                    // self.roleDetails.menuIdList.map(function(item){
                    //     var node =  self.zTreeObj02.getNodeByParam("id",item,null);
                    //     self.zTreeObj02.selectNode(node);
                    //     self.zTreeObj02.checkNode(node, true, false);
                    //     self.zTreeObj02.updateNode(node);
                    // });
                    this.$refs.roleTree.setCheckedKeys(this.roleDetails.menuIdList)
                    /*self.roleDetails.deptIdList.map(function(item){
                        var node =  self.zTreeObj03.getNodeByParam("id",item,null);
                        self.zTreeObj03.selectNode(node);
                        self.zTreeObj03.checkNode(node, true, false);
                        self.zTreeObj03.updateNode(node);
                    });*/
                });
            },

            deleteInfo: function(){
                var self = this;
                if(this.multipleSelection.length == 0){
                    this.$message({
                        message: '没有选中用户',
                        type: 'warning'
                    });
                    return false;
                }

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function(){
                    var roleIds = [];
                    self.multipleSelection.map( function(item){
                        roleIds.push(item.id);
                    });
                    var params = JSON.stringify(roleIds);
                    this.searchLoading = true;
                    this.tableLoading = true;
                    this.requestFlag = true;
                    deleteRole(params).then(function(res){
                        if(res.data >= 1){
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            self.getRoleList();
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
                }).catch(function(){
                    self.searchLoading = false;
                    self.tableLoading = false;
                    self.requestFlag=false;
                    self.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getBack: function() {
                this.showHide = false;
            },
            departmentSelect: function(){
                this.treeVisible = true;
                this.$nextTick(function(){
                    this.initTree();
                });
            },
            
            treeSubmit: function(){
                var selectNode = this.zTreeObj.getSelectedNodes();
                this.selectZTreeData = selectNode[0];
                // this.ruleForm.deptName = selectNode[0].name;
                this.treeVisible = false;
                if(!this.addModifyFlag){
                    this.roleDetails.deptId = selectNode[0].id;
                }
            }
        },
        mounted: function() {
            this.searchLoading = true;
            this.tableLoading = true;
            this.requestFlag = true;
            this.getRoleList();
            // this.getDepartList();
            this.getMenuAllList();

        }
}
</script>
<style lang="scss" scoped>
.panel{
            border: 1px solid #ddd;
            border-radius: 3px;
        }
        .panel-header{
            color: #333;
            background-color: #f5f5f5;
            padding: 10px 15px;
            border-bottom: 1px solid #ddd;
        }
        .roleTitle{
            font-weight: 600;
        }
</style>