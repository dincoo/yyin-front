<template>
<basic-container>
  <div id="app-wx-material-video">
    <el-row>
        <el-col :span="24">
            <el-button type="primary" @click="showAddVideoDialog=true;resetForm('addVideoForm');">新增</el-button>
        </el-col>
    </el-row>
    <el-row style="margin-top:12px">
        <el-col :span="24">
            <el-table :border="true" :data="materialList">
                <el-table-column label="ID" prop="mediaId"></el-table-column>

                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="更新时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.updateTime|formatDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150px">
                    <template slot-scope="scope">
                        <el-button type="text" @click="previewPicture(scope.row.url)">下载</el-button>
                        <el-button type="text" @click="deletePicture(scope.row)">删除</el-button>
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
    <el-dialog title="新建视频" :visible.sync="showAddVideoDialog">
        <el-form label-position="top" :model="formData" ref="addVideoForm">
            <el-form-item label="">
                <el-upload ref="uploadVideoRef" class="upload-demo" :before-upload="beforeUploadHandle" :auto-upload="false" :action="uploadUrl" accept=".mp4" :file-list="fileList" :data="formData" :on-success="uploadSuccess">
                    <el-button size="small" type="primary" slot="trigger">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">格式支持MP4，文件大小不超过10MB</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入标题'}]">
                <el-input type="text" v-model="formData.title" placeholder="标题将展示在相关播放页面，建议填写清晰、准确、生动的标题"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description" :rules="[{ required: true, message: '请输入描述'}]">
                <el-input type="textarea" v-model="formData.description" :rows="4" placeholder="介绍语将展示在相关播放页面，建议填写简洁明确、有信息量的内容"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="showAddVideoDialog=false">取消</el-button>
            <el-button type="primary" @click="submitForm('addVideoForm')">提交</el-button>
        </div>
    </el-dialog>
</div>
</basic-container>
</template>

<script>
import {getMaterialList,uploadMaterialUrl,deleteMarterial} from '@/api/wxManageApi/wx-material-manage'
import {paddZero} from '@/util/util'
export default {
    data(){
        return {
            fileList: [],
            materialList: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            uploadUrl: uploadMaterialUrl,
            showAddVideoDialog: false,
            formData: {
                title: '',
                description: '',
                mediaType: 'video'
            }
        }
    },
    created() {
        this.getList();
    },
    methods: {
        // 获取列表数据
        getList: function() {
            var self = this;
            var params = {
                current: this.currentPage,
                size: this.pageSize,
                msgType: 'video'
            }
            getMaterialList(params).then(function(res) {
                self.materialList = res.data.data;
                self.total = res.data.totalCount;
            })
        },
        // 预览图片
        previewPicture: function(url) {
            window.open(url, '_blank');
        },
        // 上传文件验证
        beforeUploadHandle: function(file) {
            var isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                this.$message.warning('上传文件大小不能超过 10MB!');
            }
            return isLt10M;
        },
        submitForm: function(formName) {
            var self = this;
            this.$refs[formName].validate(function(valid) {
                if (valid) {
                    self.$refs.uploadVideoRef.submit();
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
        // 删除图片
        deletePicture: function(row) {
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
        uploadSuccess: function() {
            this.$message({
                type: 'success',
                message: '上传成功'
            });
            this.getList();
            this.fileList = [];
            this.showAddVideoDialog = false;
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

</style>