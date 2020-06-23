<template>
<div>
    <div style="padding:20px">
        <el-row :gutter="16" style="margin-bottom: 16px;">
            <el-col :span="8">
                <el-input type="text" placeholder="请输入权限名称" size="small" clearable></el-input>
            </el-col>
            <el-col :span="8">
                <el-input type="text" placeholder="请输入权限编号" size="small" clearable></el-input>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" size="small" icon="el-icon-search" :loading="searchLoading" @click="getDetail(menuItem)">查询</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 10px;">
            <el-col>
                <el-button  type="primary" size="small" icon="el-icon-plus" @click="openAddDialog">新增</el-button>
                
                <el-button  type="danger" size="small" icon="el-icon-delete" @click="deleteData">删除</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table border v-loading="tableLoading" :data="dataTableData" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
                <el-table-column type="selection" width="55px"></el-table-column>
                <el-table-column  width="55px" label="序号">
                    <template slot-scope="scope">
                        <span>{{(scope.$index +1)+(currentPage-1)*size}}</span>
                    </template>
                </el-table-column>
                <el-table-column   label="权限名称" prop="name"></el-table-column>
                <el-table-column  label="权限编号" prop="number"></el-table-column>
                <el-table-column  label="规则类型" prop="type">
                    <template slot-scope="scope">
                        <span>{{scope.row.type|getTypeDesc}}</span>
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
            <el-form :model="permissionFormData" ref="dataPermissionForm" label-position="right" label-width="100px">
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="权限名称：" prop="name" :rules="[{ required: dialogTitle!=='查看', message: '请输入权限名称',trigger:'blur'}]">
                            <el-input v-if="dialogTitle!=='查看'" type="text" v-model="permissionFormData.name" placeholder="请输入权限名称"></el-input>
                            <span v-else>{{permissionFormData.name}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="权限编号：" prop="number" :rules="[{ required: dialogTitle!=='查看', message: '请输入权限编号',trigger:'blur'}]">
                            <el-input v-if="dialogTitle!=='查看'" type="text" v-model="permissionFormData.number" placeholder="请输入权限编号"></el-input>
                            <span v-else>{{permissionFormData.number}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    
                    <el-col :span="12">
                        <el-form-item label="规则类型：" prop="type" :rules="[{ required: dialogTitle!=='查看', message: '请选择规则类型',trigger:'change'}]">
                            <el-select v-if="dialogTitle!=='查看'" v-model="permissionFormData.type" placeholder="请选择规则类型" style="width:100%">
                                <el-option label="全部可见" value="1"></el-option>
                                <el-option label="本人可见" value="2"></el-option>
                                <el-option label="所在部门可见" value="3"></el-option>
                                <el-option label="所在机构及子集可见" value="4"></el-option>
                                <el-option label="自定义" value="5"></el-option>
                            </el-select>
                            <span v-else>{{permissionFormData.type|getTypeDesc}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="24">
                        <el-form-item label="可见字段：" prop="field" :rules="[{ required: dialogTitle!=='查看', message: '请输入可见字段',trigger:'blur'}]">
                            <el-input v-if="dialogTitle!=='查看'" type="text" v-model="permissionFormData.field" placeholder="请输入可见字段"></el-input>
                            <span v-else>{{permissionFormData.field}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="24">
                        <el-form-item label="权限类名：" prop="classPath" :rules="[{ required: dialogTitle!=='查看', message: '请输入权限类名',trigger:'blur'}]">
                            <el-input v-if="dialogTitle!=='查看'" type="text" v-model="permissionFormData.classPath" placeholder="请输入权限类名"></el-input>
                            <span v-else>{{permissionFormData.classPath}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16" v-if="permissionFormData.type==='5'">
                    <el-col :span="24">
                        <el-form-item label="规则值：" prop="ruleValue" :rules="[{ required: dialogTitle!=='查看', message: '请输入规则值',trigger:'blur'}]">
                            <el-input v-if="dialogTitle!=='查看'" type="textarea" v-model="permissionFormData.ruleValue" :rows="4" placeholder="请输入规则值"></el-input>
                            <span v-else>{{permissionFormData.ruleValue}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="24">
                        <el-form-item label="备注：" prop="remark">
                            <el-input v-if="dialogTitle!=='查看'" type="text" v-model="permissionFormData.remark" placeholder="请输入备注"></el-input>
                            <span v-else>{{permissionFormData.remark}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div slot="footer" v-if="dialogTitle!=='查看'">
            <el-button type="primary" icon="el-icon-circle-check" @click="submitForm('dataPermissionForm')">保存</el-button>
            <el-button icon="el-icon-circle-close" @click="showDialog=false">取消</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
import { deleteDataPermission,addDataPermission,updateDataPermission,detailDataPermission} from '@/api/sysManageApi/data-permission'
export default {
    name:'data-permission',
    data(){
        return {    
            dataTableData:[],
            multipleSelection:[],
            searchLoading:false,
            tableLoading:false,
            currentPage:1,
            size:10,
            total:0,
            dialogTitle:'',
            showDialog:false,
            permissionFormData:{}
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
        
        // 删除数据权限
        async deleteData(){
            try{
                await deleteDataPermission(this.multipleSelection.map(item=>item.id))
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
            if(this.$refs.dataPermissionForm){
                this.$refs.dataPermissionForm.clearValidate()
                this.$refs.dataPermissionForm.resetFields()
            }
            this.permissionFormData={}
        },
        // 打开编辑弹框
        openEditDialog(row){
            this.showDialog=true
            this.dialogTitle='修改'
            if(this.$refs.dataPermissionForm){
                this.$refs.dataPermissionForm.clearValidate()
                this.$refs.dataPermissionForm.resetFields()
            }
            this.permissionFormData=row
            this.permissionFormData.type=''+this.permissionFormData.type
        },
        // 打开查看弹框
        openViewDialog(row){
            this.showDialog=true
            this.dialogTitle='查看'
            if(this.$refs.dataPermissionForm){
                this.$refs.dataPermissionForm.clearValidate()
                this.$refs.dataPermissionForm.resetFields()
            }
            this.permissionFormData=row
            this.permissionFormData.type=''+this.permissionFormData.type
        },
        // 获取详情
        async getDetail(row){
            try{
                this.tableLoading=true
                this.searchLoading=true
                let param={
                    menuId:row.id
                }
                let res=await detailDataPermission(param)
                this.dataTableData=res.data
            }finally{
                this.tableLoading=false
                this.searchLoading=false
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
        // 新增数据权限
        async addPermission(){
            try{
                let param={
                    ...this.permissionFormData,
                    menuId:this.menuItem.id
                }
                await addDataPermission(param)
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
        // 修改数据权限
        async updatePermission(){
            try{
                let param={
                    ...this.permissionFormData
                }
                await updateDataPermission(param)
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
            this.getDetail(this.menuItem);
        },
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.getDetail(this.menuItem);
        },
    },
    filters:{
        getTypeDesc(val){
            let result=''
            switch(val+''){
                case '1':
                    result='全部可见'
                    break
                case '2':
                    result='本人可见'
                    break
                case '3':
                    result='所在部门可见'
                    break
                case '4':
                    result='所在机构及子集可见'
                    break
                case '5':
                    result='自定义'
                    break
            }
            return result
        }
    }
}
</script>