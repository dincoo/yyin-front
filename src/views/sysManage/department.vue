<template>
    <basic-container>
        <section>
        <div >
            <el-row>
                <el-col>
                    <el-button  type="primary" size="small" icon="el-icon-plus" @click="addInfo">新增</el-button>
                    
                    <el-button  type="danger" size="small" icon="el-icon-delete" @click="deleteInfo">删除</el-button>
                </el-col>
            </el-row>
            <el-row class="paddingTop10">
                <el-col>
                    <el-table
                            ref="multipleTable"
                            :data="filterDepData"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            row-key="id"
                            :tree-props="{children: 'children'}"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="部门名称">
                            
                        </el-table-column>
                        <el-table-column
                                prop="parentName"
                                label="上级部门"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="orderNum"
                                label="排序号">
                        </el-table-column>
                        <el-table-column label="操作" fixed="right">
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" icon="el-icon-edit" @click="modifyInfo(scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>

        <!--新增 / 编辑-->
        <el-dialog :title="panelTitle" :visible.sync="showHide">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="部门名称" prop="departmentName">
                        <el-input v-model="ruleForm.departmentName"
                                  placeholder="部门名称"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="上级部门" prop="pDepartment">
                        <el-input v-model="ruleForm.pDepartment"
                                  placeholder="选择上级部门"
                                  readonly="readonly"
                                  @click.native="departmentSelect"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="排序号" prop="orderNum">
                        <el-input v-model="ruleForm.orderNum"
                                  type="number"
                                  min="0"
                                  placeholder="排序号"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="getBack">返回</el-button>
                </div>
        </el-dialog>
        
        <el-dialog title="选择部门" :visible.sync="treeVisible" size="tiny" append-to-body>
            <el-tree ref="departmentTree" :data="topNode" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="treeSubmit" :loading="treeLoading">确认</el-button>
                <el-button @click.native="treeVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </section>
    </basic-container>
</template>
<script>
import {departAdd,departUpdate,departDelete} from '@/api/sysManageApi/departmentApi'
import {departList} from '@/api/sysManageApi/commonApi'
export default {
    data: function() {
            return {
                topNode:[],
                defaultProps:{
                    children:'children',
                    label:'name'
                },
                panelTitle: '',
                showHide: false,
                depData: [],
                filterDepData: [],
                multipleSelection: [],
                treeVisible: false,
                treeLoading : false,
                zTreeObj: null,
                selectZTreeData:'',
                addModifyFlag: false,
                ruleForm: {
                    departmentName: '',
                    pDepartment: '',
                    orderNum: 0
                },
                isActive: false,
                rules: {
                    departmentName: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    pDepartment: [
                        { required: true, message: '请选择上级部门', trigger: 'change' }
                    ],
                    orderNum: [
                        { required: true, message: '排序号不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            getListData: function(){
                var self = this;
                departList().then(function (res){

                    var listArr = res.data;
                    self.depData =listArr;
                    self.filterDepData = [];
                    self.depData.map(function(item){
                        if(!item.parentId){
                            self.filterDepData.push(item);
                        }
                    });
                    self.findChildren(self.depData)
                });
            },
            // 拼接子节点
            findChildren(list){
                for(let item of list){
                    item.children=[]
                    for(let c of this.depData){
                        if(c.parentId==item.id){
                            item.children.push(c)
                        }
                    }
                    this.findChildren(item.children)
                }
            },
            handleSelectionChange: function(val){
                this.multipleSelection = val;
            },
            submitForm: function(formName){
                var self = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        if(self.addModifyFlag){ // 添加数据
                            let params = {
                                name: self.ruleForm.departmentName,
                                id: "",
                                parentId: self.ruleForm.parentId,
                                orderNum: self.ruleForm.orderNum
                            };
                            departAdd(params).then(function(res){
                                console.log(res)
                                self.$message({type: 'success', message: '添加成功!'});
                                self.showHide = false;
                                self.getListData(); // 重新获取数据列表;
                            });
                        }else{ // 修改数据
                            let params = {
                                name: self.ruleForm.departmentName,
                                id: self.ruleForm.id,
                                parentId: self.ruleForm.parentId,
                                orderNum: self.ruleForm.orderNum
                            };
                            departUpdate(params).then(function(res){
                                console.log(res)
                                self.$message({type: 'success', message: '修改成功!'});
                                self.showHide = false;
                                self.getListData(); // 重新获取数据列表;
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            addInfo: function(){
                this.panelTitle = "新增";
                this.showHide = true;
                this.addModifyFlag = true;
                if(this.$refs["ruleForm"]){
                    this.$refs["ruleForm"].resetFields();
                    this.$refs["ruleForm"].clearValidate();
                }
                this.ruleForm={
                    departmentName: '',
                    pDepartment: '',
                    orderNum: ''
                }
                    
            },
            modifyInfo: function(row){
                if(this.$refs["ruleForm"]){
                    this.$refs["ruleForm"].resetFields();
                    this.$refs["ruleForm"].clearValidate();
                }
                this.panelTitle = "修改";
                this.addModifyFlag = false;
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
                this.ruleForm ={
                    departmentName: selectData.name,
                    pDepartment: selectData.parentName,
                    orderNum: selectData.orderNum.toString()
                };
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
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function(){
                    departDelete(self.multipleSelection[0].id).then(function(res){
                        if(res.code == '200'){
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            self.getListData();
                        }else{
                            self.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    });
                }).catch(function(){
                    self.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getBack: function(){
                this.showHide = false;
            },
            departmentSelect: function(){
                this.treeVisible = true;
                this.topNode=this.depData.filter(item=>!item.parentId)
                this.findChildren(this.topNode)
                console.log(this.topNode)
            },
            
            treeSubmit: function(){
                let selectNode = this.$refs.departmentTree.getCurrentNode();
                this.ruleForm.pDepartment = selectNode.name;
                this.treeVisible = false;
                // if(!this.addModifyFlag){
                    this.ruleForm.parentId = selectNode.id;
                // }
                console.log(this.multipleSelection);
            }
        },
        mounted: function () {
            this.getListData();
            // this.initTree();

        }
}
</script>
<style scoped>
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
</style>