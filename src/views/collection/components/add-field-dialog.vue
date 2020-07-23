<template>
<div>
    <el-dialog title="新增变量" :visible="showVariableDialog" @close="closeDialog">
        <el-form label-width="90px">
            <el-row :gutter="16">
                <el-col :span="12">
                    <el-form-item label="xpath">
                        <el-input type="text" placeholder="请输入xpath"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="字段名">
                        <el-input type="text" placeholder="请输入字段名"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :span="12">
                    <el-form-item label="字段说明">
                        <el-input type="text" placeholder="请输入字段说明"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="规则">
                        <el-input type="text" placeholder="请输入规则"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :span="12">
                    <el-form-item label="默认值">
                        <el-input type="text" placeholder="请输入默认值"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="前置">
                        <div>
                            <el-tag v-for="(item,index) in preTaskData" :key="index" style="margin-right:12px">{{item}}</el-tag>
                            <el-button  size="mini" icon="el-icon-setting" @click="showPreTaskDialog=true" >设置</el-button>
                        </div>
                    </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer">
            <el-button type="primary">保存</el-button>
            <el-button @click="closeDialog">取消</el-button>
        </div>
    </el-dialog>
    <pre-task-list :showDialog.sync="showPreTaskDialog" @selectedData="setPreTaskData"></pre-task-list>
</div>
</template>
<script>
import PreTaskList from './pre-task-list'
export default {
    components:{
        PreTaskList
    },
    data(){
        return {
            preTaskData:[],
            showPreTaskDialog:false
        }
    },
    props:{
        showVariableDialog:{
            Type:Boolean,
            required:true
        }
    },
    methods:{
        // 关闭变量弹框
        closeDialog(){
            this.$emit('update:showVariableDialog',false)
        },
        // 设置
        setPreTaskData(val){
            console.log(val)
            this.preTaskData=val
        }
    }
}
</script>