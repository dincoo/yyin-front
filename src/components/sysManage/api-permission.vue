<template>
<div>
    <div style="padding:20px">
        <el-row :gutter="16" style="margin-bottom: 16px;">
            <el-col :span="8">
                <el-input type="text" v-model="searchData.name" placeholder="请输入权限名称" size="small" clearable></el-input>
            </el-col>
            <el-col :span="8">
                <el-input type="text" v-model="searchData.perm" placeholder="请输入权限编号" size="small" clearable></el-input>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" size="small" icon="el-icon-search" :loading="searchLoading" @click="getDetail(menuItem)">查询</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 10px;">
            <el-col>
                <el-button  type="primary" size="small" icon="el-icon-plus" @click="openAddDialog">新增</el-button>
                
                <el-button  type="danger" size="small" icon="el-icon-delete" @click="deleteApi">删除</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table border v-loading="tableLoading" :data="apiTableData" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
                <el-table-column type="selection" width="55px"></el-table-column>
                <el-table-column  width="55px" label="序号">
                    <template slot-scope="scope">
                        <span>{{(scope.$index +1)+(currentPage-1)*size}}</span>
                    </template>
                </el-table-column>
                <el-table-column   label="权限名称" prop="name"></el-table-column>
                <el-table-column  label="权限编号" prop="perm"></el-table-column>
                <el-table-column  label="接口类型">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.type==1?'系统接口':'业务接口'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column   label="操作" >
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="openViewDialog(scope.row)">查看</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="openEditDialog(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
           
            <div style="padding-top: 20px;text-align: right;">
                <el-pagination v-if="total>0" :diabled="requestFlag"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-row>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="showDialog" append-to-body>
        <div>
            <el-form :model="permissionFormData" ref="apiPermissionForm" label-position="right" label-width="100px">
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="权限名称：" prop="name" :rules="[{ required: dialogTitle!=='查看', message: '请输入权限名称',trigger:'blur'}]">
                            <el-input type="text" v-if="dialogTitle!=='查看'" v-model="permissionFormData.name" placeholder="请输入权限名称"></el-input>
                            <span v-else>{{permissionFormData.name}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="权限编号：" prop="perm" :rules="[{ required: dialogTitle!=='查看', message: '请输入权限编号',trigger:'blur'}]">
                            <el-input v-if="dialogTitle!=='查看'" type="text" v-model="permissionFormData.perm" placeholder="请输入权限编号"></el-input>
                            <span v-else>{{permissionFormData.perm}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="接口地址：" prop="uri" :rules="[{ required: dialogTitle!=='查看', message: '请输入接口地址',trigger:'blur'}]">
                            <el-input v-if="dialogTitle!=='查看'" type="text" v-model="permissionFormData.uri" placeholder="请输入接口地址"></el-input>
                            <span v-else>{{permissionFormData.uri}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="接口类型：" prop="type" :rules="[{ required: dialogTitle!=='查看', message: '请选择接口类型',trigger:'change'}]">
                            <el-select v-if="dialogTitle!=='查看'" v-model="permissionFormData.type" placeholder="请选择接口类型" style="width:100%">
                                <el-option label="系统接口" value="1"></el-option>
                                <el-option label="业务接口" value="2"></el-option>
                            </el-select>
                            <span v-else>{{permissionFormData.type==1?'系统接口':'业务接口'}}</span>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="24">
                        <el-form-item label="备注：">
                            <el-input v-if="dialogTitle!=='查看'" type="text" v-model="permissionFormData.remark" placeholder="请输入备注"></el-input>
                            <span v-else>{{permissionFormData.remark}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div slot="footer" v-if="dialogTitle!=='查看'">
            <el-button type="primary" icon="el-icon-circle-check" @click="submitForm('apiPermissionForm')">保存</el-button>
            <el-button icon="el-icon-circle-close" @click="showDialog=false">取消</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
import { deleteApiPermission,addApiPermission,updateApiPermission,detailApiPermission} from '@/api/sysManageApi/api-permission'
export default {
    name:'api-permission',
    data(){
        return {    
            apiTableData:[],
            multipleSelection:[],
            searchLoading:false,
            tableLoading:false,
            currentPage:1,
            size:10,
            total:0,
            dialogTitle:'',
            showDialog:false,
            permissionFormData:{
                name:'',
                perm:'',
                type:'',
                uri:'',
                remark:''
            },
            searchData:{
                name:'',
                perm:''
            }
        }
    },
    props:{
        menuItem:{
            type:Object,
            required:true
        }
    },
    watch:{
        menuItem(val){
            this.getDetail(val)
        }
    },
    created(){
        this.getDetail(this.menuItem)
    },
    methods:{
        // 删除接口权限
        async deleteApi(){
            try{
                await deleteApiPermission(this.multipleSelection.map(item=>item.id))
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
                this.getDetail(this.menuItem)
            }catch(err){
                console.log(err)
            }
        },
        // 打开新增弹框
        openAddDialog(){
            this.showDialog=true
            this.dialogTitle='新增'
            if(this.$refs.apiPermissionForm){
                this.$refs.apiPermissionForm.clearValidate()
                this.$refs.apiPermissionForm.resetFields()
            }
            this.permissionFormData={}
        },
        // 打开编辑弹框
        openEditDialog(row){
            this.showDialog=true
            this.dialogTitle='修改'
            if(this.$refs.apiPermissionForm){
                this.$refs.apiPermissionForm.clearValidate()
                this.$refs.apiPermissionForm.resetFields()
            }
            this.permissionFormData=row
            this.permissionFormData.type=''+this.permissionFormData.type
        },
        // 打开查看弹框
        openViewDialog(row){
            this.showDialog=true
            this.dialogTitle='查看'
            if(this.$refs.apiPermissionForm){
                this.$refs.apiPermissionForm.clearValidate()
                this.$refs.apiPermissionForm.resetFields()
            }
            this.permissionFormData=row
        },
        // 获取详情
        async getDetail(row){
            try{
                this.searchLoading=true
                this.tableLoading=true
                let param={
                    menuId:row.id
                }
                let res=await detailApiPermission(param)
                this.apiTableData=res.data
            }finally{
                this.searchLoading=false
                this.tableLoading=false
            }
        },
        // 提交表单
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.dialogTitle=='新增'){
                        this.addPermission()
                    }else{
                        this.updatePermission()
                    }
                } else {
                    return false;
                }
            });
        },
        // 新增接口权限
        async addPermission(){
            try{
                let param={
                    ...this.permissionFormData,
                    menuId:this.menuItem.id
                }
                // console.log(this.permissionFormData)
                await addApiPermission(param)
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
                this.getDetail(this.menuItem)
                this.showDialog=false
            }catch(err){
                console.log(err)
            }
        },
        // 修改接口权限
        async updatePermission(){
            try{
                let param={
                    ...this.permissionFormData
                }
                await updateApiPermission(param)
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
                this.getDetail(this.menuItem)
                this.showDialog=false
            }catch(err){
                console.log(err)
            }
        },
        handleSelectionChange(val){
            this.multipleSelection =val
        },
        handleSizeChange: function(val) {
            this.size = val;
            this.getListData();
        },
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.getListData();
        },
    }
}
</script>