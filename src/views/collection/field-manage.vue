<template>
    <basic-container>
        <el-form label-width="90px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="编码：">
                        <span style="color:#999999">YUUUJJ45544</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="url：">
                        <span style="color:#999999">/fdjkfd/ff/d/sa</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row style="margin-bottom:16px">
            <el-button type="primary" size="small" @click="addFieldSetEvent">新增字段集</el-button>
        </el-row>
        <add-field-set ref="fieldSetRef"  @openVariableDialog="showVariableDialog=true"></add-field-set>
        <add-field-dialog :showVariableDialog.sync="showVariableDialog"></add-field-dialog>
        <div style="text-align:center;margin-top:16px">
            <el-button type="primary">保存</el-button>
            <el-button >取消</el-button>
        </div>
    </basic-container>
</template>
<script>
import AddFieldSet from './components/add-field-set'
import AddFieldDialog from './components/add-field-dialog'
export default {
    components:{
        AddFieldDialog,
        AddFieldSet
    },
    data(){
        return {
            showAddSet:false,
            showVariableDialog:false
        }
    },
    methods:{
        // 新增字段集
        addFieldSetEvent(){
            this.showAddSet=true
            this.$refs.fieldSetRef.addCollapse()
        }
    }
}
</script>