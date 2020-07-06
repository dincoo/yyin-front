<template>
<basic-container>
  <div id="app-wx-material-voice">
    <el-row>
        <el-col :span="24">
            <el-upload class="upload-demo" :before-upload="beforeUploadHandle" :action="uploadUrl" accept=".mp3,.wma,.wav,.amr" :file-list="fileList" :data="uploadParams" :on-success="uploadSuccess">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">格式支持mp3/wma/wav/amr，文件大小不超过2M，播放长度不超过60s</div>
            </el-upload>
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
                        <el-button type="text" @click="downloadVoice(scope.row)">下载</el-button>
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

</div>
</basic-container>
</template>

<script>
import {getMaterialList,uploadMaterialUrl,deleteMarterial,downloadMaterialUrl} from '@/api/wxManageApi/wx-material-manage'
import {paddZero} from '@/util/util'
export default {
    data() {
        return {
            fileList: [],
            materialList: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            uploadUrl: uploadMaterialUrl,
            uploadParams: {
                mediaType: 'voice'
            }
        };
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
                msgType: 'voice'
            }
            getMaterialList(params).then(function(res) {
                self.materialList = res.data.data;
                self.total = res.data.totalCount;
            })
        },
        // 预览图片
        downloadVoice: function(row) {
            var url = downloadMaterialUrl + '/' + row.mediaId + '/' + row.name
            window.open(url, '_blank');
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
        // 上传文件验证
        beforeUploadHandle: function(file) {
            var isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.warning('上传文件大小不能超过 2MB!');
            }
            return isLt2M;
        },
        // 上传成功
        uploadSuccess: function() {
            this.$message({
                type: 'success',
                message: '上传成功'
            });
            this.getList();
            this.fileList = [];
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