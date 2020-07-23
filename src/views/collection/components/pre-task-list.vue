<template>
<el-dialog append-to-body :visible="showDialog" @close="cancel">
    <div>
        <el-table border 
            :data="tableData"
            @selection-change="selectionChange"
            tooltip-effect="dark">
                <el-table-column type="selection" width="55px"></el-table-column>
                <el-table-column label="任务名称" prop="prop1"></el-table-column>
                <el-table-column label="任务描述" prop="prop2"></el-table-column>
                <el-table-column label="任务编码" prop="prop3"></el-table-column>
                <!-- <el-table-column label="操作" width="80px">
                    <template>
                        <el-button type="primary" size="small">选中</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
    </div>
    <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
    </div>
</el-dialog>
</template>
<script>
export default {
    props:{
        showDialog:{
            type:Boolean,
            required:true
        }
    },
    data(){
        return {
            seletedList:[],
            tableData:[{
                prop1:'任务1',
                prop2:'看到了上课了规范法规',
                prop3:'JDKSJDKSJDKSJDKJSOJK'
            },{
                prop1:'任务2',
                prop2:'看到了上课了规范法规',
                prop3:'JDKSJDKSJDKSJDKJSOJK'
            },{
                prop1:'任务3',
                prop2:'看到了上课了规范法规',
                prop3:'JDKSJDKSJDKSJDKJSOJK'
            }]
        }
    },
    methods:{
        // 选中表格
        selectionChange(val){
            this.seletedList=val
        },
        // 确定
        submit(){
            this.$emit('selectedData',this.seletedList.map(item=>item.prop3))
            this.cancel()
        },
        // 取消
        cancel(){
            this.$emit('update:showDialog',false)
        }
    }
}
</script>