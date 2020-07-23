<template>
<div>
    <basic-container>
    <el-form :model="formData" label-width="100px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="子任务名称：">
                    <span>任务1</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="url：">
                    <span>/ruie/fdi/478734</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="header：">
            <div>
                <el-row >
                    <el-col :span="4">
                        <span>prop1=YYUh90909</span>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="4">
                        <span>prop2=YYUh90120</span>
                    </el-col>
                </el-row>
            </div>
        </el-form-item>
    <el-form-item label="cookie：">
        <span>jdksjdksjdk44545455</span>
    </el-form-item>
    <el-form-item label="前置条件">
        <div>
            <el-tag v-for="(item,index) in preTaskData" :key="index" style="margin-right:12px">{{item}}</el-tag>
    
        </div>
    </el-form-item>
    <el-form-item label="下载文件">
        <el-switch v-model="formData.isDown"></el-switch>
    </el-form-item>
    <el-form-item label="解析变量">
        <el-switch v-model="formData.isParsing"></el-switch>
    </el-form-item>
    <div v-if="formData.isParsing">
        <!-- <el-row>
            <el-col :span="16"> -->
                <el-table stripe :data="variableList" 
                        
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column
                            prop="prop1"
                            label="xpath"
                            width="150px">
                            
                    </el-table-column>
                    <el-table-column
                            prop="prop2"
                            label="变量名">
                            
                    </el-table-column>
                    <el-table-column
                            prop="prop3"
                            label="格式化"
                            width="150px">
                            
                    </el-table-column>
                    <el-table-column
                            prop="prop4"
                            label="默认值">
                            
                    </el-table-column>
                    
                </el-table>
            <!-- </el-col>
        </el-row> -->
    </div>
    </el-form>
    
    <pre-task-list :showDialog.sync="showPreTaskDialog" @selectedData="setPreTaskData"></pre-task-list>
    
    </basic-container>
    <basic-container>
        <h4>字段集</h4>
        <add-field-set ref="fieldSetRef"  @openVariableDialog="showVariableDialog=true" :isEdit="false"></add-field-set>
    </basic-container>
</div>
</template>

<script>
import PreTaskList from './components/pre-task-list'
import AddFieldSet from './components/add-field-set'
export default {
    components:{
        PreTaskList,
        AddFieldSet
    },
    props:{
        showAddDialog:{
            type:Boolean,
            required:true
        }
    },
    data(){
        return {
            showPreTaskDialog:false,
            showVariableDialog:false,
            headerList:[{
                label:'',
                value:''
            },{
                label:'',
                value:''
            }],
            formData:{
                cookieType:1,
                isDown:false,
                isParsing:true
            },
            preTaskData:['YHHIJ8493849384'],
            variableList:[
                {
                    prop1:'dhfjhdf',
                    prop2:'分担分担',
                    prop3:'json',
                    prop4:'12334'
                }
            ]
        }
    },
    mounted(){
        console.log('采集详情')
        this.$refs.fieldSetRef.addCollapse()
    },
    methods:{
        // 添加一行header
        addRow(){
            this.headerList.push({
                label:'',
                value:''
            })
        },
        // 删除一行header
        deleteRow(idx){
            this.headerList.splice(idx,1)
        },
        // cookie类型改变
        changeCookieType(val){
            console.log(val)
            if(val==2){
                this.showPreTaskDialog=true
            }
        },
        // 增加一行变量参数
        addVariableRow(){
            this.variableList.push({
                prop1:'',
                prop2:'',
                prop3:'',
                prop4:''
            })
        },
        // 删除一行变量参数
        deleteVariableRow(idx){
            this.variableList.splice(idx,1)
        },
        // 设置
        setPreTaskData(val){
            console.log(val)
            this.preTaskData=val
        },
        // 取消
        cancel(){
            this.$emit('update:showAddDialog',false)
        }
    }
}
</script>

<style>
.task-drawer{
    width: 700px;
    overflow: auto;
    padding: 0 12px;
}
</style>