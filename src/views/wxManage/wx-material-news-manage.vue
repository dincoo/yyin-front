<template>
<basic-container>
  <div id="app-wx-material-video">
    <el-row>
        <el-col :span="24">
            <el-button type="primary" @click="openAddNewsDialog">新增</el-button>
        </el-col>
    </el-row>
    <el-row style="margin-top:12px">
        <el-col :span="24">
            <el-table :border="true" :data="materialList" highlight-current-row stripe>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div v-for="(item,index) in props.row.content.articles" :key="index">
                            <p>{{item.title}}</p>
                            <el-form label-position="left" class="demo-table-expand">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="标题">
                                            <span>{{ item.title }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="作者">
                                            <span>{{ item.author }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="描述">
                                                <span>{{ item.digest }}</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="内容">
                                                <el-button type="text" @click="previewPicture(item.url)">预览</el-button>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                            </el-form>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="ID" prop="mediaId"></el-table-column>

                <el-table-column label="标题">
                    <template slot-scope="scope">
                        <p v-for="(item,index) in scope.row.content.articles" :key="index">{{item.title}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.updateTime|formatDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150px">
                    <template slot-scope="scope">
                            <el-button type="text" @click="openEditNewsDialog(scope.row)">编辑</el-button>
                        <el-button type="text" @click="deleteNews(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-col>
    </el-row>
    <el-dialog :title="newsDialogTile" :visible.sync="showAddNewsDialog" width="1000px">
        <el-row :gutter="16">
            <el-col :span="6">
                <div v-for="(item,index) in newsList" :key="index">

                    <div class="father " :class="{'activeAddNews':activeNews==item}" v-if="index===0" @click="setCurrentNew(item)">
                        <div class="news-content">
                            <!---->
                            <img v-if="item.thumbUrl" :src="item.thumbUrl" style="width: 100%;height: 100%;object-fit: cover;">
                            <div class="news-content-title">{{item.title}}</div>
                        </div>
                        <div class="child">
                            <el-button size="mini" @click="moveNew(index,'down')">下移</el-button>
                            <el-button size="mini" @click="deleteNewData(index)">删除</el-button>
                        </div>
                    </div>
                    <div class="news-main-item father" :class="{'activeAddNews':activeNews==item}" v-else @click="setCurrentNew(item)">
                        <div class="news-content-item">
                            <div class="news-content-item-title ">{{item.title}}</div>
                            <div class="news-content-item-img">
                                <img v-if="item.thumbUrl" :src="item.thumbUrl" style="width: 100%;height: 100%;object-fit: cover;">
                            </div>
                        </div>
                        <div class="child">
                            <el-button size="mini" @click="moveNew(index,'up')">上移</el-button>
                            <el-button size="mini" v-if="index!==newsList.length-1" @click="moveNew(index,'down')">下移</el-button>
                            <el-button size="mini" @click="deleteNewData(index)">删除</el-button>
                        </div>
                    </div>
                </div>
                <div style="text-align: center;margin-top: 15px;">
                    <el-button type="primary" size="mini" circle icon="el-icon-plus" @click="addNewData"></el-button>
                </div>
            </el-col>
            <el-col :span="18">
                <el-form label-position="top" :model="activeNews" ref="addVideoForm">
                    <div id="eidtor"></div>
                    <el-form-item label="封面和摘要" prop="digest" :rules="[{ required: true, message: '请输入标题'}]">
                        <el-row>
                            <el-col :span="8">
                                <div class="avatar-uploader">
                                    <img v-if="activeNews.thumbUrl" :src="activeNews.thumbUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </div>
                                <el-upload ref="uploadVideoRef" :before-upload="beforeUploadHandle" :action="uploadUrl" accept=".bmp,.png,.jpeg,.jpg,.gif" :file-list="fileList" :data="activeNews" :on-success="uploadSuccess">

                                    <el-button size="small" type="primary" style="margin-left:  20px" @click="openChooseMaterial('image')">素材选择</el-button>
                                    <el-button size="small" type="primary" slot="trigger" style="margin-left: 20px">本地上传</el-button>

                                    <div slot="tip" class="el-upload__tip">支持bmp/png/jpeg/jpg/gif格式，大小不超过2M</div>
                                </el-upload>
                            </el-col>
                            <el-col :span="14" :offset="2">
                                <el-input v-model="activeNews.digest" type="textarea" :rows="8" placeholder="请输入摘要"></el-input>
                            </el-col>
                        </el-row>

                    </el-form-item>
                    <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入标题'}]">
                        <el-input type="text" v-model="activeNews.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="author" :rules="[{ required: true, message: '请输入作者'}]">
                        <el-input type="text" v-model="activeNews.author" placeholder="请输入作者"></el-input>
                    </el-form-item>
                    <el-form-item label="原文地址" prop="contentSourceUrl" :rules="[{ required: true, message: '请输入原文地址'}]">
                        <el-input type="text" v-model="activeNews.contentSourceUrl" placeholder="请输入原文地址"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <choose-material-dialog ref="chooseMaterialDialogRef"></choose-material-dialog>
        <div slot="footer">
            <el-button @click="showAddNewsDialog=false">取消</el-button>
            <el-button type="primary" @click="submitForm('addVideoForm')">提交</el-button>
        </div>
    </el-dialog>
</div>
</basic-container>
</template>

<script>
import {uploadMaterialUrl,deleteMarterial,getNews,createMutilNews,updateMutilNews} from '@/api/wxManageApi/wx-material-manage'
import {paddZero} from '@/util/util'
import ChooseMaterialDialog from '@/components/wxManage/choose-material'
import E from "wangeditor";
export default {
    components:{
        ChooseMaterialDialog
    },
    data(){
        return {
            fileList: [],
            materialList: [],
            tableLoading: false,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            uploadUrl: uploadMaterialUrl,
            showAddNewsDialog: false,
            activeNews: {
                title: '',
                author: '',
                digest: '',
                content: '',
                contentSourceUrl: '',
                thumbMediaId: '',
                thumbUrl: ''
            },
            selectedMediaId: '',
            newsList: [],
            editor: null,
            newsDialogTile: '新增图文'
        }
    },
    created() {
        var oMeta = document.createElement('meta');
        oMeta.name = 'referrer';
        oMeta.content = 'never';
        document.getElementsByTagName('head')[0].appendChild(oMeta);
        this.getList();
    },

    methods: {
        // 获取列表数据
        getList: function() {
            var self = this;
            var params = {
                current: this.currentPage,
                size: this.pageSize
            }

            if (!this.tableLoading) {
                this.tableLoading = true;
                getNews(params).then(function(res) {
                    self.materialList = res.data.data;
                    self.total = res.data.totalCount;
                    self.tableLoading = false;
                }).catch(function(err) {
                    console.log(err)
                    self.tableLoading = false;
                });
            }
        },
        // 预览图片
        previewPicture: function(url) {
            window.open(url, '_blank');
        },
        // 上传文件验证
        beforeUploadHandle: function(file) {
            var isLt10M = file.size / 1024 / 1024 < 2;
            if (!isLt10M) {
                this.$message.warning('上传文件大小不能超过 2MB!');
            }
            return isLt10M;
        },
        // 创建图文
        createMutilNews: function() {
            var params = {
                newsList: this.newsList
            };
            var self = this;
            createMutilNews(params).then(function(res) {
                console.log(res)
                self.$message({
                    type: 'success',
                    message: '新增成功'
                });
                self.showAddNewsDialog = false;
                // 1.5秒后刷新
                window.setTimeout(function() {
                    self.getList();
                }, 1500);
            })
        },
        // 编辑图文
        updateMutiNews: function() {
            var params = {
                newsList: this.newsList,
                mediaId: this.selectedMediaId
            };
            var self = this;
            updateMutilNews(params).then(function(res) {
                console.log(res)
                self.$message({
                    type: 'success',
                    message: '编辑成功'
                });
                self.showAddNewsDialog = false;
                // 1.5秒后刷新
                window.setTimeout(function() {
                    self.getList();
                }, 1500);
            })
        },
        // 设置当前新闻
        setCurrentNew: function(val) {
            var self = this;
            this.$nextTick(function() {
                self.activeNews = val;
                if (val.content) {
                    self.editor.txt.html(val.content);
                } else {
                    self.editor.txt.clear();
                }
            });

        },
        submitForm: function(formName) {
            var self = this;
            this.$refs[formName].validate(function(valid) {
                if (valid) {
                    self.createMutilNews();
                } else {
                    return false;
                }
            });
        },
        resetForm: function(formName) {
            if (this.$refs[formName]) {
                this.$refs[formName].resetFields();
            }
        },
        // 打开新增弹框
        openAddNewsDialog: function() {
            this.showAddNewsDialog = true;
            this.newsDialogTile = '新增图文';
            this.resetForm('addVideoForm');
            var self = this;
            this.newsList = [];
            this.$nextTick(function() {
                if (!self.editor) {
                    // var E = window.wangEditor;
                    self.editor = new E('#eidtor');
                    self.editor.customConfig.onblur = function(html) {
                        // html 即编辑器中的内容
                        self.activeNews.content = html;
                    }
                    self.editor.create();
                }
                self.addNewData();
            });
        },
        // 打开编辑弹框
        openEditNewsDialog: function(row) {
            this.showAddNewsDialog = true;
            this.newsDialogTile = '编辑图文';
            var self = this;
            this.selectedMediaId = row.mediaId;
            this.newsList = row.content.articles;
            this.$nextTick(function() {
                if (!self.editor) {
                    // var E = window.wangEditor;
                    self.editor = new E('#eidtor');
                    self.editor.customConfig.onblur = function(html) {
                        // html 即编辑器中的内容
                        self.activeNews.content = html;
                    }
                    self.editor.create();
                }
                self.setCurrentNew(this.newsList[0]);
            });
        },
        // 添加图文
        addNewData: function() {
            var temp = {
                author: '',
                title: '',
                digest: '',
                content: '',
                contentSourceUrl: '',
                thumbMediaId: '',
                thumbUrl: ''
            };
            this.newsList.push(temp);
            this.setCurrentNew(temp);
        },
        // 删除图文
        deleteNewData: function(idx) {
            this.newsList.splice(idx, 1);
        },
        // 移动图文
        moveNew: function(idx, direction) {
            if (direction === 'up') {
                let temp = this.newsList[idx];
                this.newsList[idx] = this.newsList[idx - 1];
                this.newsList[idx - 1] = temp;
            } else {
                let temp = this.newsList[idx];
                this.newsList[idx] = this.newsList[idx + 1];
                this.newsList[idx + 1] = temp;
            }
        },
        // 删除图片
        deleteNews: function(row) {
            var self = this;
            var params = {
                mediaIds: [row.mediaId]
            }
            this.$confirm('确定要删除该数据吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function() {
                deleteMarterial(params).then(function(res) {
                    console.log(res)
                    self.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    self.getList();
                })
            }).catch()

        },
        // 上传成功
        uploadSuccess: function(response, file, fileList) {
            console.log(file, fileList)
            this.$message({
                type: 'success',
                message: '上传成功'
            });
            if (response.data) {
                this.activeNews.thumbMediaId = response.data.mediaId;
                this.activeNews.thumbUrl = response.data.url;
            }
            this.getList();
            this.fileList = [];
        },
        // 设置选中的素质
        setChooseMaterial(val) {
            this.activeNews.thumbMediaId = val.mediaId;
            this.$set(this.activeNews, 'thumbUrl', val.url);
        },
        // 打开选择素材
        openChooseMaterial: function(val) {
            this.$refs.chooseMaterialDialogRef.showMaterialChooseDialog = true;
            this.$refs.chooseMaterialDialogRef.msgType = val;
            this.$refs.chooseMaterialDialogRef.getList();
            this.$refs.chooseMaterialDialogRef.getSelectedMaterial = this.setChooseMaterial
        },
        // 分页大小改变
        handleSizeChange: function(val) {
            this.pageSize = val;
            this.getList();
        },
        // 当前页改变
        handleCurrentChange: function(val) {
            this.pageSize = val;
            this.getList();
        }
    },
    filters: {
        // 时间戳转日期
        formatDate: function(val) {
            var now = new Date(val);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            return year + "-" + paddZero(month) + "-" + paddZero(date) + " " + paddZero(hour) + ":" + paddZero(minute) + ":" + paddZero(second);
        }
    }
}
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    /* 图文左侧预览视图 */
    
    .news-content {
        background-color: #acadae;
        height: 120px;
        position: relative;
    }
    
    .news-content .news-content-title {
        display: inline-block;
        font-size: 15px;
        color: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #000;
        padding: 3px;
        opacity: .65;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 25px;
        width: 100%;
    }
    
    .father {
        position: relative;
    }
    
    .father .child {
        display: none;
        text-align: center;
        position: absolute;
        bottom: 25px;
        bottom: 0;
        width: 100%;
    }
    
    .father:hover .child {
        display: block;
    }
    
    .news-main-item {
        background-color: #fff;
        padding: 5px 0;
        border-top: 1px solid #eaeaea;
        margin: auto;
        height: 50px;
        box-sizing: unset;
    }
    
    .news-content-item {
        height: 60px;
        margin-left: -3px;
        height: 50px;
        position: relative
    }
    
    .news-content-item-title {
        display: inline-block;
        font-size: 12px;
    }
    
    .news-content-item-img {
        float: right;
        display: inline-block;
        height: 50px;
        width: 50px;
        background-color: #acadae
    }
    
    .activeAddNews {
        border: 5px solid #2bb673;
    }
    /* 文件上传样式 */
    
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
        width: 230px;
    }
    
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 230px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    
    .avatar {
        width: 100%;
        height: 178px;
        object-fit: cover;
        display: block;
    }
</style>