<template>
<div>
    <div style="padding:20px">
        <el-row :gutter="16" style="margin-bottom: 16px;">
            <el-col :span="8">
                <el-input type="text" placeholder="请输入权限名称" clearable></el-input>
            </el-col>
            <el-col :span="8">
                <el-input type="text" placeholder="请输入权限编号" clearable></el-input>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" size="small" icon="el-icon-search" :loading="searchLoading">查询</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 10px;">
            <el-col>
                <el-button  type="primary" size="small" icon="el-icon-plus" @click="addInfo">新增</el-button>
                
                <el-button  type="danger" size="small" icon="el-icon-delete" @click="deleteApi">删除</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table border v-loading="tableLoading" :data="apiTableData" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
                <el-table-column type="selection" width="55px"></el-table-column>
                <el-table-column type="index" width="55px" label="序号"></el-table-column>
                <el-table-column   label="权限名称"></el-table-column>
                <el-table-column  label="权限编号"></el-table-column>
                <el-table-column  label="接口类型"></el-table-column>
                <el-table-column   label="操作" >
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view">查看</el-button>
                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
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
            <el-form>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="权限名称">
                            <el-input type="text" placeholder="请输入权限名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="权限编号">
                            <el-input type="text" placeholder="请输入权限编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="接口类型">
                            <el-select placeholder="请选择接口类型">
                                <el-option></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input type="text" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </el-dialog>
</div>
</template>
<script>
import { apiPermissionList,deleteApiPermission,addApiPermission,updateApiPermission,detailApiPermission} from '@/api/sysManageApi/api-permission'
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
            showDialog:false
        }
    },
    created(){

    },
    methods:{
        // 获取列表数据
        async getListData(){
            try{
                this.searchLoading=true
                this.tableLoading=true
                let param={
                    size: this.size,
                    current: this.currentPage
                }
                let res=await apiPermissionList(param)
                console.log(res)
                this.apiTableData=res.data
            }finally{
                this.tableLoading=false
                this.searchLoading=false
            }
        },
        // 删除接口权限
        async deleteApi(){
            try{
                await deleteApiPermission(this.multipleSelection.map(item=>item.id))
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
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