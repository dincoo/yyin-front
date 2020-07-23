<template>
<div>
  <el-drawer title="新增子任务" :visible="showAddDialog" :size="700" custom-class="task-drawer" @close="cancel">
          <el-form :model="formData" label-width="90px">
              <el-row>
                  <el-col >
                      <el-form-item label="子任务名称">
                          <el-input type="text"  placeholder="请输入子任务名称"></el-input>
                      </el-form-item>
                  </el-col>
                  
              </el-row>
            <el-row>
                <el-col >
                      <el-form-item label="url">
                          <el-input type="text" placeholder="请输入url"></el-input>
                      </el-form-item>
                  </el-col>
            </el-row>
              <el-form-item label="header">
                  <div>
                      <el-row v-for="(item,index) in headerList" :key="index">
                          <el-col :span="6">
                              <el-input v-model="item.label" type="text" placeholder="请输入属性名"></el-input>
                          </el-col>
                          <el-col :span="6" style="margin-left:16px">
                              <el-input v-model="item.value" type="text" placeholder="请输入属性值"></el-input>
                          </el-col>
                          <el-col :span="4" style="margin-left:16px">
                              <el-button @click="addRow" icon="el-icon-plus" type="primary" circle size="small"></el-button>
                              <el-button v-if="index>0" @click="deleteRow" icon="el-icon-minus" type="danger" circle size="small"></el-button>
                          </el-col>
                      </el-row>
                  </div>
              </el-form-item>
            <el-form-item label="cookie">
                <div>
                    <el-radio-group v-model="formData.cookieType" @change="changeCookieType">
                        <el-radio :label="1">无</el-radio>
                        <el-radio :label="2">前置</el-radio>
                        <el-radio :label="3">自定义</el-radio>
                    </el-radio-group>
                    <el-row v-if="formData.cookieType!==1">
                        <el-col :span="10">
                            <el-input type="text" placeholder="请输入cookie值"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>
            <el-form-item label="前置条件">
                <!-- <el-input type="text" @focus="showPreTaskDialog=true"  placeholder="请选择前置条件"></el-input> -->
                <div>
                    <el-tag v-for="(item,index) in preTaskData" :key="index" style="margin-right:12px">{{item}}</el-tag>
                    <el-button  size="small" icon="el-icon-setting" @click="showPreTaskDialog=true" >设置</el-button>
                </div>
            </el-form-item>
            <el-form-item label="下载文件">
                <el-switch v-model="formData.isDown"></el-switch>
            </el-form-item>
            <el-form-item label="解析变量">
                <el-switch v-model="formData.isParsing"></el-switch>
            </el-form-item>
            <div v-if="formData.isParsing">
                <el-table border :data="variableList" 
                        
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column
                            prop="prop1"
                            label="xpath"
                            width="150px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.prop1" type="text" placeholder="请输入xpath"></el-input>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="prop2"
                            label="变量名">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.prop2" type="text" placeholder="请输入变量名"></el-input>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="prop3"
                            label="格式化"
                            width="150px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.prop3" type="text" placeholder="请输入格式化"></el-input>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="prop4"
                            label="默认值">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.prop3" type="text" placeholder="请输入默认值"></el-input>
                            </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px">
                        <template slot-scope="scope">
                            <!-- <el-button type="text" size="small" icon="el-icon-edit">编辑</el-button> -->
                            <el-button  type="text" size="small" icon="el-icon-delete" @click="deleteVariableRow(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align:right;">
                    <el-button type="text" icon="el-icon-plus" @click="addVariableRow">新增一行</el-button>
                </div>
            </div>
          </el-form>
          <div style="text-align:center;margin-bottom:20px">
              <el-button type="primary">保存</el-button>
              <el-button @click="cancel">取消</el-button>
          </div>
      </el-drawer>
      <pre-task-list :showDialog.sync="showPreTaskDialog" @selectedData="setPreTaskData"></pre-task-list>
</div>
</template>

<script>
import PreTaskList from './pre-task-list'
export default {
    components:{
        PreTaskList
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
            headerList:[{
                label:'',
                value:''
            }],
            formData:{
                cookieType:1,
                isDown:false,
                isParsing:false
            },
            preTaskData:[],
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