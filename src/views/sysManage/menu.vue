<template>
    <basic-container>
        <div >
            <el-row style="margin-bottom: 10px;">
                <el-col>
                    <el-button  type="primary" size="small" icon="el-icon-plus" @click="addInfo">新增</el-button>
                    
                    <el-button  type="danger" size="small" icon="el-icon-delete" @click="deleteInfo">删除</el-button>
                </el-col>
            </el-row>
            <el-row class="paddingTop10" >
                <el-col>
                    <el-table
                            ref="multipleTable"
                            :data="filterMenuData"
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
                                label="菜单ID"
                                width="120">
                            <template slot-scope="scope" ><span v-text="scope.row.id"></span></template>
                        </el-table-column>
                        <el-table-column
                                label="菜单名称" prop="name">
                           
                        </el-table-column>
                        <el-table-column
                                prop="parentName"
                                label="上级菜单"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                width="70px"
                                label="图标">
                            <template slot-scope="scope">
                                <i :class="scope.row.icon"></i>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="80px"
                                label="类型">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.type|statesType">
                                    {{ scope.row.type |statesFormat }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="80px"
                                prop="orderNum"
                                label="排序号">
                        </el-table-column>
                        <el-table-column
                                prop="uri"
                                label="菜单URL">
                        </el-table-column>
                        <el-table-column
                                prop="perms"
                                label="授权标识">
                        </el-table-column>
                        <el-table-column label="操作" width="320px">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" icon="el-icon-edit" @click="modifyInfo(scope.row)">修改</el-button>
                                <el-button type="text" size="small" icon="el-icon-setting" @click="showSetting('ApiPermission',scope.row)">接口权限配置</el-button>
                                <el-button type="text" size="small" icon="el-icon-setting" @click="showSetting('DataPermission',scope.row)">数据权限配置</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <el-dialog :title="panelTitle" :visible.sync="showHide">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="类型" prop="type">
                        <el-radio-group v-model="ruleForm.type">
                            <el-radio label = "0" >模块</el-radio>
                            <el-radio label = "1" >目录</el-radio>
                            <el-radio label = "2" >菜单</el-radio>
                            <el-radio label = "3" >按钮</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="菜单名称" prop="name">
                        <el-input v-model="ruleForm.name"
                                  placeholder="菜单名称"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="上级菜单" prop="parentName" >
                        <el-input v-model="ruleForm.parentName"
                                  placeholder="上级菜单"
                                  readonly="readonly"
                                  @click.native="departmentSelect"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="菜单URL" prop="uri" v-if="ruleForm.type == 2|| ruleForm.type == 3">
                        <el-input v-model="ruleForm.uri"
                                  placeholder="菜单URL"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="授权标识" prop="perms"  v-if="ruleForm.type == 2 || ruleForm.type == 3">
                        <el-input v-model="ruleForm.perms"
                                  placeholder="多个用逗号分隔,如:user:list,user:create"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="排序号" prop="orderNum"  v-if="ruleForm.type == 0||ruleForm.type == 1 || ruleForm.type == 2">
                        <el-input v-model="ruleForm.orderNum"
                                  type="number"
                                  min="0"
                                  placeholder="排序号"></el-input>
                    </el-form-item>
                    <el-form-item label="图标" prop="icon" v-if="ruleForm.type == 0||ruleForm.type == 1 || ruleForm.type == 2">
                        <el-input v-model="ruleForm.icon" @focus="showIconDialog=true"
                                  placeholder="菜单图标"
                        ></el-input>
                    </el-form-item>
                   
                </el-form>
                <div slot="footer">
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="getBack">返回</el-button>
                </div>
        </el-dialog>
       
        <el-dialog title="选择菜单" :visible.sync="treeVisible" append-to-body size="tiny">
            <ul id="zTree" class="ztree"></ul>
            <el-tree :data="[topNode]" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="treeSubmit" :loading="treeLoading">确认</el-button>
                <el-button @click.native="treeVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="请选择菜单图标" :visible.sync="showIconDialog" append-to-body width="574px">
            <el-tabs v-model="activeTab">
                <el-tab-pane v-for="(item,index) in iconList" :key="'icon-'+index" :name="'icon-'+index" :label="item.label">
                    <div v-for="icon in item.list" :key="icon" :class="{'icon-item':true,'active-icon':ruleForm.icon==icon}" @click="setMenuIcon(icon)">
                        <i :class="icon" style="font-size:24px !important"></i>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <el-drawer :title="drawerTitle" :visible.sync="showApiPermissionDrawer" size="65%">
            <component :is="curcomponent" :menuItem="selectRow"></component>
        </el-drawer>
    </basic-container>
</template>
<script>
import { menuSelectList,addMenu,ModifyMenu,menuDetails,deleteMenu} from '@/api/sysManageApi/menuApi'
import {menuAllList} from '@/api/sysManageApi/commonApi'
import iconList from "@/config/iconList";
import ApiPermission from '@/components/sysManage/api-permission'
import DataPermission from '@/components/sysManage/data-permission'
export default {
    components:{
        ApiPermission,
        DataPermission
    },
    data(){
            Array.prototype.indexOf = function (val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) return i;
                }
                return -1;
            };

            Array.prototype.remove = function (val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };
            return {
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                showIconDialog:false,
                activeTab:'icon-0',
                topNode:null,
                addModifyFlag: true,
                panelTitle: '',
                showHide: false,
                menuData: [],
                filterMenuData:[],
                multipleSelection: [],
                total: 30,
                size: 10,
                currentPage: 1,
                menuDetails: null,
                ruleForm: {
                    name: '',
                    id:'',
                    parentName: '',
                    icon: '',
                    type: "0",
                    orderNum: '0',
                    uri: '',
                    perms: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' }
                    ],
                    parentName: [
                        { required: true, message: '请选择上级菜单', trigger: 'change' }
                    ],
                    icon: [
                        { required: false, message: '请输入图标类名称(参考fontawesome字体库)', trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: '请输入类型', trigger: 'change' }
                    ],
                    uri: [
                        { required: true, message: '请输入菜单URL', trigger: 'blur' }
                    ],
                    perms: [
                        { required: true, message: '请输入授权标识', trigger: 'blur' }
                    ],
                    orderNum: [
                        { required: true, message: '排序号不能为空', trigger: 'change' }
                    ]
                },
                listLoading: false,
                treeVisible: false,//操作权限树是否显示
                treeLoading : false,
                zNodes: [],
                zTreeObj: null,
                selectZTreeData: null,
                isActive: false,
                selectedTreeNode:null,
                iconList:[],
                showApiPermissionDrawer:false,
                selectRow:null,
                curcomponent:'',
                drawerTitle:''
            }
        },
        mounted: function () {
            this.getMenuList();
            this.getMenuSelectList();
            this.iconList=iconList
        },
        methods: {
            // 获取菜单列表
            getMenuList: function(){
                menuAllList().then((res)=>{
                    this.menuData = res.data;
                    // 添加父级菜单
                    this.filterMenuData = [];
                    if(res.data){
                        res.data.map((item)=>{
                            if(item.type == 0){     //type:0是模块，1是目录，2是菜单，3是按钮
                                this.filterMenuData.push(item);
                            }
                        });
                        for(let item of  this.filterMenuData){
                            this.findChildData(item.id,item,this.menuData)
                        }
                        console.log(this.filterMenuData)
                    }
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
            // 获取无功能按钮菜单列表
            getMenuSelectList: function(){
                menuSelectList().then( (res)=>{
                    this.zNodes = res.data;
                    this.topNode={
                        id: "-1",
                        icon: '',
                        name: '一级菜单',
                        parentId:'-1',
                        children:[]
                    };
                    for(let item of this.zNodes){
                        if(item.type==0){
                            this.topNode.children.push(item)
                        }
                    }
                    for(let child of this.topNode.children){
                        this.findChildData(child.id,child,this.zNodes);
                    }
                    // console.log(this.topNode)
                    
                });
            },
            // 设置菜单图标
            setMenuIcon(val){
                this.ruleForm.icon=val
                this.showIconDialog=false
            },
            handleSelectionChange: function(val){
                this.multipleSelection = val;
            },
            submitForm: function(formName){
                // var self = this;
                console.log(this.selectZTreeData,this.ruleForm)
                this.$refs[formName].validate((valid)=>{
                    if (valid) {
                        var checkFlag = false;
                        console.log(this.selectZTreeData,this.ruleForm)
                        if(this.selectZTreeData){
                            if( this.ruleForm.type == 0){ // 创建目录校验
                                if(this.selectZTreeData.parentId == -1){
                                    checkFlag = true;
                                }else{
                                    this.$message({message: '创建模块上级菜单错误', type: 'warning'});
                                    return false;
                                }
                            }else if(this.ruleForm.type == 1){
                                if(this.selectZTreeData.type == 0){
                                    checkFlag = true;
                                }else{
                                    this.$message({message: '创建目录上级菜单错误', type: 'warning'});
                                    return false;
                                }
                            }else if(this.ruleForm.type == 2){
                                if(this.selectZTreeData.type == 1){
                                    checkFlag = true;
                                }else{
                                    this.$message({message: '创建菜单上级菜单错误', type: 'warning'});
                                    return false;
                                }
                            }else if(this.ruleForm.type == 3){
                                if(this.selectZTreeData.type == 2){
                                    checkFlag = true;
                                }else{
                                    this.$message({message: '创建按钮上级菜单错误', type: 'warning'});
                                    return false;
                                }
                            }
                        }
                        if(this.addModifyFlag){ // 添加菜单
                            if(checkFlag){
                                var params = Object.assign( this.ruleForm, {
                                    parentId: this.selectedTreeNode.id
                                });
                                // if(params.parentId=='-1'){
                                //     params.parentId=''
                                // }
                                delete params.id
                                addMenu(params).then((res)=>{
                                    if(res.code=='200'){
                                        this.$message({type: 'success', message: '添加成功!'});
                                        this.showHide = false;
                                        this.getMenuList();
                                        this.getMenuSelectList();
                                    }
                                });
                            }
                        }else{ // 修改菜单
                            let params = Object.assign( this.ruleForm, {
                                id: this.menuDetails.id,
                                parentId: this.menuDetails.parentId
                            });
                            // if(params.parentId=='-1'){
                            //     params.parentId=''
                            // }
                            ModifyMenu(params).then((res)=>{
                                console.log(res)
                                this.$message({type: 'success', message: '修改成功!'});
                                this.showHide = false;
                                this.getMenuList();
                                this.getMenuSelectList();
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            // 显示新增弹框
            addInfo: function(){
                this.addModifyFlag = true;
                this.panelTitle = "新增";
                this.showHide = true;
                if(this.$refs["ruleForm"]){
                    this.$refs["ruleForm"].resetFields();
                    this.$refs['ruleForm'].clearValidate();
                }
            },
            // 显示编辑弹框
            modifyInfo: function(row){
                this.addModifyFlag = false;
                this.panelTitle = "编辑";
                var msg = '';
                var flag = false;
                if(this.$refs["ruleForm"]){
                    this.$refs["ruleForm"].resetFields();
                    this.$refs['ruleForm'].clearValidate();
                }
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
                menuDetails(selectData.id).then((res)=>{
                    let selectObj  = null;
                    self.menuDetails = res.data;
                    self.zNodes.map( (item)=>{
                        if(parseInt(item.id) == parseInt(self.menuDetails.parentId)){
                            self.menuDetails.parentName = item.name;
                            selectObj = item;
                            return false;
                        }
                    });
                    console.log(selectObj)
                     this.selectZTreeData = selectObj;
                    self.ruleForm = {
                        name: self.menuDetails.name,
                        id: self.menuDetails.id.toString(),
                        parentName: self.menuDetails.parentName||'',
                        icon: self.menuDetails.icon||'',
                        type: self.menuDetails.type.toString(),
                        orderNum: self.menuDetails.orderNum.toString(),
                        uri: self.menuDetails.uri||'',
                        perms: self.menuDetails.perms||''
                    };
                    /* this.zTreeObj.selectNode( selectObj, false, false );*/
                });
            },
            deleteInfo: function(){
                var self = this;
                if(this.multipleSelection.length == 0){
                    this.$message({
                        message: '没有选中菜单',
                        type: 'warning'
                    });
                    return false;
                }else if(this.multipleSelection.length >1){
                    for(let i=0;i<this.multipleSelection.length;i++){
                        if(this.multipleSelection[i].children&&this.multipleSelection[i].children.length>0){
                            this.$message({
                                message: '所选菜单包含子菜单，请先删除子菜单',
                                type: 'warning'
                            });
                            return false
                        }
                    }
                }
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function(){
                    var ids = [];
                    self.multipleSelection.map(function(item){
                        ids.push(item.id);
                    });
                    deleteMenu(ids).then(function(res){
                        if(res.code=='200'){
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            self.getMenuList();
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
            },
            // 选中节点
            handleNodeClick(data){
                console.log(data)
                this.selectedTreeNode=data;
            },
            treeSubmit: function(){
                let selectNode = this.selectedTreeNode;
                this.selectZTreeData = selectNode;
                console.log(this.selectZTreeData)
                this.ruleForm.parentName = this.selectedTreeNode.name;
                this.treeVisible = false;
                if(!this.addModifyFlag){
                    this.menuDetails.parentId = this.selectedTreeNode.id;
                }
            },
            // 显示设置抽屉
            showSetting(cur,row){
                this.showApiPermissionDrawer=true
                this.selectRow=row
                this.curcomponent=cur
                this.drawerTitle=cur=='ApiPermission'?'接口权限配置':'数据权限配置'
            }
        },
        filters: {
            statesFormat: function (value) {
                switch (value){
                    case 1: return "目录"; 
                    case 2: return "菜单"; 
                    case 3: return "按钮";
                    case 0: return "模块";
                    default: return ""; 
                }
            },
            statesType: function (value) {
                switch (value){
                    case 0: return "warning"; 
                    case 1: return "success"; 
                    case 2: return "primary"; 
                    default: return ""; 
                }
            }
        }
}
</script>
<style lang="scss" scoped>
    .icon-item{
        padding: 20px;
        display: inline-block;
    }
    .active-icon{
        color: #409EFF;
    }
    .el-drawer__body{
        padding: 20px;
    }
</style>