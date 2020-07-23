<template>
    <div>
        <el-collapse v-model="activeNames">
            <el-collapse-item v-for="(item,index) in collapseList" :key="index" :name="index+1">
                <template slot="title">
                    <span style="font-weight:600">XXJJJ1223（看到了疯狂的浪费）<i class="header-icon el-icon-info"></i></span>
                    <el-button v-if="isEdit" type="text" size="small" style="margin-left:16px" @click="deleteCollapse(index)">删除</el-button>
                </template>
                <div>
                    <el-form label-width="90px">
                        <el-row :gutter="16">
                            <el-col :span="12">
                                <el-form-item label="GroupID">
                                    <el-input v-if="isEdit" type="text" placeholder="请输入GroupID" clearable></el-input>
                                    <span v-else>YHJH898</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="字段集描述">
                                    <el-input v-if="isEdit" type="text" placeholder="请输入字段集描述" clearable></el-input>
                                    <span v-else>附近快递费啥金卡戴珊山东</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="16">
                            <el-col :span="12">
                                <el-form-item label="是否保存">
                                    <el-switch v-model="isSaveTable" :disabled="!isEdit"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" v-if="isSaveTable">
                                <el-form-item label="表名">
                                    <el-select placeholder="请选择表名" clearable style="width:100%">
                                        <el-option label="table1" value="1"></el-option>
                                        <el-option label="table2" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
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
                            <el-table-column label="操作" width="180px" v-if="isEdit">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" icon="el-icon-edit" @click="addRow">编辑</el-button>
                                    <el-button  type="text" size="small" icon="el-icon-delete" @click="deleteVariableRow(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="text-align:right;" v-if="isEdit">
                            <el-button type="text" icon="el-icon-plus" @click="addRow">新增一行</el-button>
                        </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isSaveTable:false,
            activeNames:[],
            collapseList:[],
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
    props:{
        isEdit:{
            type:Boolean,
            default:()=>true
        }
    },
    methods:{
        // 打开字段弹框
        addRow(){
            this.$emit('openVariableDialog',true)
        },
        // 增加折叠板
        addCollapse(){
            this.collapseList.push({})
            this.activeNames.push(this.collapseList.length)
        },
        // 删除折叠板
        deleteCollapse(idx){
            this.collapseList.splice(idx,1)
            this.activeNames.splice(idx,1)
        }
    }
}
</script>