<template>
  <div>
    <el-tabs type="border-card" v-model="chooseData.msgType" stretch>
        <el-tab-pane label="文本" name="text">
            <el-input type="textarea" v-model="chooseData.content" :rows="4" placeholder="请输入内容"></el-input>
        </el-tab-pane>
        <el-tab-pane label="图片" name="image">
            <el-row :gutter="8" v-if="!chooseBack||chooseBack.materialType!=='image'">
                <el-col :span="12">
                    <div style="border: 1px solid #eaeaea;text-align: center;height: 160px;box-sizing: border-box">
                        <el-button type="success" @click="openChooseMaterial('image')" style="margin: 50px 0;">素材库选择</el-button>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div style="border: 1px solid #eaeaea;text-align: center;padding: 50px 0;height: 160px;box-sizing: border-box">
                        <el-upload class="upload-demo" :action="uploadUrl" accept=".bmp,.png,.jpeg,.jpg,.gif" :data="uploadParams" :on-success="uploadSuccess">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">支持bmp/png/jpeg/jpg/gif格式，大小不超过2M</div>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
            <div v-else style="padding: 4px;text-align: center">
                <img :src="chooseBack.url" class="image" style="width: 200px;object-fit: contain">
                <div class="bottom ">
                    <el-button type="text" class="button" @click="removeChooseBack">删除</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="语音" name="voice">
            <el-row :gutter="8" v-if="!chooseBack||chooseBack.materialType!=='voice'">
                <el-col :span="12">
                    <div style="border: 1px solid #eaeaea;text-align: center;padding: 50px 0;height: 160px;box-sizing: border-box">
                        <el-button type="success" @click="openChooseMaterial('voice')">素材库选择</el-button>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div style="border: 1px solid #eaeaea;text-align: center;padding: 50px 0;height: 160px;box-sizing: border-box">
                        <el-upload class="upload-demo" :action="uploadUrl" accept=".mp3,.wma,.wav,.amr" :data="uploadParams" :on-success="uploadSuccess">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">格式支持mp3/wma/wav/amr，文件大小不超过2M，播放长度不超过60s</div>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
            <div v-else style="padding: 4px;text-align: center">
                <span>{{chooseBack.fileName}}</span>
                <div class="bottom ">
                    <el-button type="text" class="button" @click="removeChooseBack">删除</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="视频" name="video">
            <el-row>
                <el-col :span="24">
                    <el-input type="text" v-model="chooseData.title" placeholder="请输入标题"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-top: 12px">
                <el-col :span="24">
                    <el-input type="text" v-model="chooseData.description" placeholder="请输入描述"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-top: 12px;text-align: center">
                <el-col :span="24">
                    <el-button type="success" @click="openChooseMaterial('video')">素材库选择</el-button>
                </el-col>
            </el-row>
        </el-tab-pane>
        <!-- <el-tab-pane label="图文">
            <div style="border: 1px solid #eaeaea;text-align: center;padding: 50px 0;">
                <el-button type="success" @click="openChooseMaterial">素材库选择</el-button>
            </div>
        </el-tab-pane> -->
    </el-tabs>
    <choose-material-dialog ref="chooseMaterialDialogRef" @chooseBack="setChooseData"></choose-material-dialog>
</div>
</template>

<script>
import {uploadMaterialUrl} from '@/api/wxManageApi/wx-material-manage'
import ChooseMaterialDialog from './choose-material'
export default {
    components:{
        ChooseMaterialDialog
    },
    data() {
        return {
            chooseData: {
                content: '',
                msgType: 'text',
                title: '',
                description: ''
            },
            chooseBack: null,
            uploadUrl: uploadMaterialUrl,
            uploadParams: {
                mediaType: 'image'
            }
        }
    },
    created() {
        var oMeta = document.createElement('meta');
        oMeta.name = 'referrer';
        oMeta.content = 'never';
        document.getElementsByTagName('head')[0].appendChild(oMeta)
        // var self = this;
        // window.addEventListener('message', function(e) {
        //     if (e.origin !== location.origin) {
        //         return;
        //     }
        //     self.chooseBack = e.data;
        //     self.chooseBack.materialType = self.chooseData.msgType;
        //     this.console.log(e.data);
        //     if (e.data.name && self.chooseData.msgType === 'video') {
        //         self.chooseData.title = e.data.name;
        //         self.chooseData.description = e.data.description;
        //     } else if (e.data.name && self.chooseData.msgType === 'voice') {
        //         self.chooseBack.fileName = e.data.name;
        //     }
        // });
    },
    methods: {
        // 初始化数据
        initData: function(param) {
            this.chooseData = Object.assign(this.chooseData, param);
        },
        // 设置选中素材
        setChooseData(val){
            this.chooseBack = val;
            this.chooseBack.materialType = this.chooseData.msgType;
            this.console.log(val);
            if (val.name && this.chooseData.msgType === 'video') {
                this.chooseData.title = val.name;
                this.chooseData.description = val.description;
            } else if (val.name && this.chooseData.msgType === 'voice') {
                this.chooseBack.fileName = val.name;
            }
        },
        // 重置数据
        resetData: function() {
            this.chooseData = {
                content: '',
                msgType: 'text',
                title: '',
                description: ''
            }
        },
        // 构建参数
        buildParams: function() {
            var params = {
                msgType: this.chooseData.msgType
            };
            if (params.msgType === 'text') {
                params.content = this.chooseData.content;
            } else if (params.msgType === 'video') {
                params.title = this.chooseBack.title;
                params.description = this.chooseBack.description;
                params.mediaId = this.chooseBack.mediaId;
                delete params.content;
            } else {
                params.mediaId = this.chooseBack.mediaId;
                if (params.msgType === 'image') {
                    params.url = this.chooseBack.url;
                }
                delete params.content;
            }
            console.log(params);
            return params;
        },
        // 打开选择素材
        openChooseMaterial: function(val) {
            this.$refs.chooseMaterialDialogRef.showMaterialChooseDialog = true;
            this.$refs.chooseMaterialDialogRef.msgType = val;
            this.$refs.chooseMaterialDialogRef.getList();
        },
        // 移除选中的素材
        removeChooseBack: function() {
            this.chooseBack = null;
        },
        // 上传成功
        uploadSuccess: function(response, file, fileList) {
            if (response.HttpCode == 200) {
                this.$message({
                    type: 'success',
                    message: '上传成功'
                });
                this.chooseBack = response.data;
                this.chooseBack.materialType = this.chooseData.msgType;
            } else {
                this.$message({
                    type: 'error',
                    message: response.errorMessage || '上传失败'
                });
            }
            console.log(response, file, fileList);
        }
    }
}
</script>

<style>

</style>