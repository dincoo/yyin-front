<template>
<div>
    <div>
        <el-row :gutter="6">
            <el-col :span="6">
                <basic-container>
                    <el-row :gutter="16">
                        <el-col :span="18">
                            <el-input type="text" :value="filterTreeText" @input="changeSearchTree" placeholder="请输入任务名称" size="small"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="text" icon="el-icon-plus" size="medium " @click="showAddDialog=true">新增</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-tree
                            :data="treeData"
                            :props="defaultProps"
                            default-expand-all
                            :filter-node-method="filterNode"
                            ref="tree">
                            </el-tree>
                    </el-row>
                </basic-container>
            </el-col>
            <el-col :span="18">
                <basic-container>
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="任务信息" name="1">
                            <template slot="title">
                                <span style="font-weight:600">任务信息<i class="header-icon el-icon-info"></i></span>
                                
                            </template>
                            <div>
                                <el-form label-width="90px">
                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="任务名称：">
                                                <span>任务1</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="任务编码：">
                                                <span>YHIUIUIU45545</span>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="任务描述：">
                                                <span>快疯了的开发赛科利代课老师d</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="文件路径：">
                                                <span>/fjdkf/dr/tt/894893489</span>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <div style="margin-top:12px">
                        <el-row :gutter="16">
                            <el-col :span="6">
                                <el-input type="text" placeholder="请输入任务编码" size="medium"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input type="text" placeholder="请输入url" size="medium"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-button  type="primary" size="small" icon="el-icon-search">查询</el-button>
                                <el-button  type="primary" @click="showAddSubTaskDialog=true" size="small" icon="el-icon-plus">新增</el-button>
                            </el-col>
                        </el-row>
                        <el-table border :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column type="index" label="序号" width="60px"></el-table-column>
                            <el-table-column
                                    prop="prop1"
                                    label="子任务名称"
                                    width="150px">
                            </el-table-column>
                            <el-table-column
                                    prop="prop2"
                                    label="url"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="prop3"
                                    label="前置"
                                    width="150px">
                            </el-table-column>
                            <el-table-column
                                    prop="prop4"
                                    label="下载"
                                    >
                            </el-table-column>
                            <el-table-column label="操作" width="230px">
                                <template>
                                    <el-button  type="text" size="small" icon="el-icon-sold-out" @click="goField">抽取</el-button>
                                    <el-button type="text" size="small"  @click="goView" icon="el-icon-view">查看</el-button>
                                    <el-button type="text" size="small"  @click="showAddSubTaskDialog=true" icon="el-icon-edit">编辑</el-button>
                                    <el-button  type="text" size="small" icon="el-icon-delete" >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row>
                            <el-col :span="24" style="padding-top: 20px;text-align: right;">
                                <el-pagination v-if="total>0" :diabled="requestFlag"
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[10, 20, 30, 40]"
                                        :page-size="size"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="total">
                                </el-pagination>
                            </el-col>
                        </el-row>
                    </div>
                </basic-container>
            </el-col>
        </el-row>
    </div>
    <sub-task :showAddDialog.sync="showAddSubTaskDialog"></sub-task>
    <el-dialog :visible.sync="showAddDialog" title="新增任务">
        <el-form label-width="90px">
          <el-row>
              <el-col :span="12">
                  <el-form-item label="任务名称">
                      <el-input type="text" placeholder="请输入任务名称"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="任务编码">
                      <el-input type="text" placeholder="请输入任务编码"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="任务描述">
                      <el-input type="text" placeholder="请输入任务描述"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="文件路径">
                      <el-input type="text" placeholder="请输入文件路径"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
            <el-button type="primary">保存</el-button>
            <el-button @click="showAddDialog=false">取消</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
import SubTask from './components/sub-task'
export default {
    components:{
        SubTask
    },
    data(){
        return {
            filterTreeText:'',
            activeNames:['1'],
            searchLoading:false,
            tableLoading:false,
            total:3,
            size:10,
            currentPage: 1,
            requestFlag:false,
            showAddDialog:false,
            showAddSubTaskDialog:false,
            treeData:[
                {
                    label:'分组1',
                    children:[
                        {
                            label:'山东dd'
                        },{
                            label:'焦点is'
                        }
                    ]
                },{
                    label:'贷后8'
                },{
                    label:'iOS啊'
                }
                
            ],
            tableData:[
                {
                    prop1:'担惊受恐',
                    prop2:'HDSJHDJSHDJHJ1551',
                    prop3:'/fhjd/gjkf/s552',
                    prop4:'jddd'
                },{
                    prop1:'担惊受恐',
                    prop2:'HDSJHDJSHDJHJ1551',
                    prop3:'/fhjd/gjkf/s552',
                    prop4:'jddd'
                },{
                    prop1:'担惊受恐',
                    prop2:'HDSJHDJSHDJHJ1551',
                    prop3:'/fhjd/gjkf/s552',
                    prop4:'jddd'
                }
            ]
        }
    },
    created(){
        console.log(this.$route)
    },
    methods:{
        // 获取列表数据
        getCollectionList(){

        },
        changeSearchTree(val){
            console.log(val)
            this.filterTreeText=val;
            this.$refs.tree.filter(val);
        },
        goView(){
            this.$router.push('/collection/collection-detail')
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        // 新增
        addCollection(){
            // this.$emit('changePage','CollectionAdd')
            this.showAddSubTaskDialog=true
        },
        goField(){
            this.$router.push('/collection/field-manage')
        },
        handleSelectionChange: function(val){
            this.multipleSelection = val;
        },
        handleSizeChange: function(val) {
            this.size = val;
            this.tableLoading = true;
            this.searchLoading = true;
            this.requestFlag = true;
            this.getCollectionList();
        },
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.tableLoading = true;
            this.searchLoading = true;
            this.requestFlag = true;
            this.getCollectionList();
        }
    }
}
</script>