<template>
<basic-container>
    <div id="app-wx-user-list">
        <el-row style="margin-bottom: 10px;">
            <el-col :span="5">
                <el-input v-model="nickname" size="small" placeholder="用户名称"></el-input>
            </el-col>
            <el-col :span="17">
                <el-button style="margin-left:12px;" type="primary" size="small" icon="search" :loading="searchLoading" @click="getList">查询</el-button>
                <el-button type="success" size="small" icon="plus" @click="showTagDialog('add')">打标签</el-button>
                <el-button type="warning" size="small" icon="edit" @click="showTagDialog('remove')">去标签</el-button>
                <el-button type="danger" size="small" icon="delete" @click="synchronousUserData">同步用户</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <el-row>
                    <el-col :span="16">
                        <span>
                                    全部标签
                        </span>
                    </el-col>
                    <el-col :span="6" style="text-align: center">
                        <el-tooltip content="新增标签" placement="right" effect="dark">
                            <i class="el-dropdown-link el-icon-plus" @click.stop="showAddTagDialog"></i>
                        </el-tooltip>
                    </el-col>
                </el-row>
                <div style="margin-top: 12px">
                    <el-row v-for="tag in tagList" :key="tag.id" style="padding: 8px 0">
                        <el-col :span="16">
                            <span>{{tag.name||tag.tagName}}</span>
                        </el-col>
                        <el-col :span="6">

                            <el-dropdown :hide-on-click="false" @command="subCommand" trigger="hover" size="small" placement="bottom-start">
                                <span class="el-dropdown-link">
                                                    <i class="el-icon-more"></i>
                                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>
                                        <el-button type="text" @click.stop="showEditTagDialog(tag)">修改</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <el-button type="text" @click.stop="deleteTag(tag.id)">删除</el-button>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="21">
                <el-table v-loading="tableLoading" :data="userTableData" border @selection-change="setSelectData" tooltip-effect="dark">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column label="头像" width="156px">
                        <template slot-scope="scope">
                            <img :src="scope.row.headImgUrl"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="昵称" prop="nickname"></el-table-column>
                    <el-table-column label="是否订阅">
                        <template slot-scope="scope">
                                <el-tag type="success" v-if="scope.row.subscribe">已关注</el-tag>
                                <el-tag type="danger" v-else>取消关注</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="关注渠道">
                        <template slot-scope="scope">
                            <span>{{scope.row.subscribeScene|FocusOnChannels}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="关注时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.subscribeTime|formatDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="性别" prop="sex">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.sex==1?'':'danger'">{{scope.row.sex|sexFormat}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="所在国家" prop="country"></el-table-column>
                    <el-table-column label="所在省份" prop="province"></el-table-column>
                    <el-table-column label="所在城市" prop="city"></el-table-column>
                    <el-table-column label="用户语言" prop="language"></el-table-column>
                    <el-table-column label="标签列表" prop="tagIds"></el-table-column>
                    <el-table-column label="用户备注" prop="remark"></el-table-column>
                    <el-table-column label="二维码扫码场景" prop="qrScene"></el-table-column>
                    <el-table-column label="关注次数"></el-table-column>
                    <el-table-column label="最近定位"></el-table-column>
                    <el-table-column label="操作" width="150px" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="openDetailDialog(scope.row)">查看</el-button>
                            <el-button type="text" @click="openRemarkDialog(scope.row)">修改备注</el-button>
                            <el-button type="text" @click="openMessageDialog(scope.row)">消息</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <el-dialog title="请选择标签" :visible.sync="tagDialogVisible" width="30%">
            <el-checkbox-group v-model="checkTagList">
                <el-checkbox v-for="tag in tagList" :label="tag.id" :key="tag.id">{{tag.name||tag.tagName}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click="tagDialogVisible = false">取 消</el-button>
                <el-button v-if="tagDialogType==='add'" type="primary" @click="addTagForUser">确 定</el-button>
                <el-button v-else type="primary" @click="removeTagForUser">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="tagDialogTitle" :visible.sync="showAddOrEditTaDialog" width="30%">
            <el-form :model="tagFormData" ref="tagForm">
                <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '请输入标签名称', trigger: 'blur' }]">
                    <el-input type="text" v-model="tagFormData.name" placeholder="请输入标签名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddOrEditTaDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitTagForm('tagForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="查看" :visible.sync="showDetailDialog" width="700px">
            <el-form :model="userDetailFormData" ref="userDetailForm" label-width="80px">
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="头像">
                            <img :src="userDetailFormData.headImgUrl">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="昵称">
                            <el-input type="text" v-model="userDetailFormData.nickname" placeholder="请输入标签名称" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="是否订阅">
                            <el-select disabled v-model="userDetailFormData.subscribe" style="width: 100%">
                                <el-option label="未关注" :value="false"></el-option>
                                <el-option label="已关注" :value="true"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="关注渠道">
                            <el-select disabled v-model="userDetailFormData.subscribeScene" style="width: 100%">
                                <el-option label="公众号搜索" value="ADD_SCENE_SEARCH"></el-option>
                                <el-option label="公众号迁移" value="ADD_SCENE_ACCOUNT_MIGRATION"></el-option>
                                <el-option label="名片分享" value="ADD_SCENE_PROFILE_CARD"></el-option>
                                <el-option label="扫描二维码" value="ADD_SCENE_QR_CODE"></el-option>
                                <el-option label="图文页内名称点击" value="ADD_SCENE_PROFILE_LINK"></el-option>
                                <el-option label="图文页右上角菜单" value="ADD_SCENE_PROFILE_ITEM"></el-option>
                                <el-option label="支付后关注" value="ADD_SCENE_PAID"></el-option>
                                <el-option label="其他" value="ADD_SCENE_OTHERS"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="关注时间">
                            <el-date-picker type="datetime" v-model="userDetailFormData.subscribeTime" disabled style="width: 100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别">
                            <el-select disabled v-model="userDetailFormData.sex" style="width: 100%">
                                <el-option label="未知" :value="0"></el-option>
                                <el-option label="男" :value="1"></el-option>
                                <el-option label="女" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="所在国家">
                            <el-input type="text" v-model="userDetailFormData.country" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在省份">
                            <el-input type="text" v-model="userDetailFormData.province" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="所在城市">
                            <el-input type="text" v-model="userDetailFormData.city" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户语言">
                            <el-input type="text" v-model="userDetailFormData.language" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="标签列表">
                            <el-input type="text" v-model="userDetailFormData.tagIdsName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户备注">
                            <el-input type="text" v-model="userDetailFormData.remark" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="二维码扫码场景">
                            <el-input type="text" v-model="userDetailFormData.qrScene" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户标识">
                            <el-input type="text" v-model="userDetailFormData.openId" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="union_id">
                            <el-input type="text" v-model="userDetailFormData.unionId" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="关注次数">
                            <el-input type="text" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="创建时间">
                            <el-date-picker type="datetime" disabled style="width: 100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="更新时间">
                            <el-date-picker type="datetime" disabled style="width: 100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="取关时间">
                            <el-date-picker type="datetime" v-model="userDetailFormData.closingTime" disabled style="width: 100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDetailDialog = false">取 消</el-button>
            </div>
        </el-dialog>
        <message-dialog ref="messageDialog"></message-dialog>
    </div>
    </basic-container>
</template>
<script>
import {getUserList,synchronousData,getTags,usersAddTags,usersDeleteTags,createTag,deleteTags,updateTags,setUserRemark} from '@/api/wxManageApi/wx-user-list'
import {paddZero} from '@/util/util'
export default {
    data() {
        return {
            nickname: '',
            currentPage: 1,
            size: 10,
            total: 0,
            searchLoading: false,
            selectedRows: [],
            tableLoading: false,
            userTableData: [],
            tagList: [],
            tagDialogVisible: false,
            // 区分打标签、去标签
            tagDialogType: '',
            checkTagList: [],
            showAddOrEditTaDialog: false,
            tagDialogTitle: '新增标签',
            showDetailDialog: false,
            tagFormData: {
                name: ''
            },
            userDetailFormData: {},
            showEditRemarkDialog: false
        }
    },
    created() {
        this.getList();
        this.getTagData();
    },
    methods: {
        // 获取列表
        getList: function() {
            var params = {
                nickname: this.nickname,
                size: this.size,
                current: this.currentPage
            }
            var self = this;
            getUserList(params).then(function(res) {
                self.userTableData = res.data.data;
                self.total = res.data.totalCount;
            })
        },
        // 同步用户
        synchronousUserData: function() {
            var self = this;
            this.$confirm('如果用户数据较多时，在进行用户同步将会耗费较多时间！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function() {
                synchronousData().then(function(res) {
                    console.log(res)
                    self.$message({
                        type: 'success',
                        message: '同步成功!'
                    });
                })

            }).catch();
        },
        // 获取所有标签
        getTagData: function() {
            var self = this;
            getTags().then(function(res) {
                self.tagList = res.data;
            })
        },
        setSelectData: function(val) {
            this.selectedRows = val;
        },
        // 显示打标签弹框
        showTagDialog: function(type) {
            if (this.selectedRows.length === 0) {
                this.$message({
                    type: 'warning',
                    message: '请选择用户!'
                });
                return
            }
            this.tagDialogType = type;
            this.tagDialogVisible = true;
            this.checkTagList = [];
        },
        // 打标签
        addTagForUser: function() {
            var params = {
                openIds: this.selectedRows.map(function(item) {
                    return item.openId
                }),
                tagIds: this.checkTagList
            }
            var self = this;
            usersAddTags(params).then(function(res) {
                console.log(res)
                self.$message({
                    type: 'success',
                    message: '用户标签设置成功!'
                });
                self.getList();
                self.tagDialogVisible = false;
            })
        },
        // 去标签
        removeTagForUser: function() {
            var params = {
                openIds: this.selectedRows.map(function(item) {
                    return item.openId
                }),
                tagIds: this.checkTagList
            }
            var self = this;
            usersDeleteTags(params).then(function(res) {
                console.log(res)
                self.$message({
                    type: 'success',
                    message: '用户标签移除成功!'
                });
                self.getList();
                self.tagDialogVisible = false;
            })
        },
        handleCommand: function(command) {
            console.log(command)
            this.$message('click on item ' + command);
        },
        subCommand: function(command) {
            this.$message('subCommand on item ' + command);
        },
        // 显示标签弹框
        showAddTagDialog: function() {
            this.showAddOrEditTaDialog = true;
            this.clearFormValid('tagForm');
            this.tagDialogTitle = '新增标签'
            this.tagFormData = {
                name: ''
            }
        },
        // 新增标签
        addTag: function() {
            var self = this;
            createTag({
                tagName: this.tagFormData.name
            }).then(function() {
                self.getTagData();
                self.$message({
                    type: 'success',
                    message: '标签新增成功!'
                });
                self.showAddOrEditTaDialog = false;
            }).catch(function() {
                if (self.$refs.dropdownTag) {
                    self.$refs.dropdownTag.visible = true
                }
            })
        },
        // 删除标签
        deleteTag: function(val) {
            var self = this;
            deleteTags({
                tagIds: [val]
            }).then(function() {
                self.getTagData();
                self.$message({
                    type: 'success',
                    message: '标签删除成功!'
                });
            }).catch(function() {
                if (self.$refs.dropdownTag) {
                    self.$refs.dropdownTag.visible = true
                }
            })
        },
        // 显示编辑标签弹框
        showEditTagDialog: function(val) {
            this.tagDialogTitle = '修改标签'
            this.showAddOrEditTaDialog = true;
            this.clearFormValid('tagForm');
            this.tagFormData = {
                name: val.name,
                id: val.id
            }
        },
        // 更新标签
        updateTag: function() {
            var self = this;
            updateTags({
                tagId: this.tagFormData.id,
                tagName: this.tagFormData.name
            }).then(function() {
                self.getTagData();
                self.$message({
                    type: 'success',
                    message: '标签新增成功!'
                });
                self.showAddOrEditTaDialog = false;
            }).catch(function() {
                if (self.$refs.dropdownTag) {
                    self.$refs.dropdownTag.visible = true
                }
            })
        },
        // 提交表单
        submitTagForm: function(formName) {
            var self = this;
            this.$refs[formName].validate(function(valid) {
                if (valid) {
                    if (self.tagDialogTitle === '新增标签') {
                        self.addTag();
                    } else {
                        self.updateTag();
                    }
                } else {
                    return false;
                }
            });
        },
        // 移除表单验证
        clearFormValid: function(formName) {
            if (this.$refs[formName]) {
                this.$refs[formName].clearValidate()
            }
        },
        // 打开详情弹框
        openDetailDialog: function(row) {
            this.showDetailDialog = true
            this.userDetailFormData = row
            this.userDetailFormData.tagIdsName = row.tagIds.map(function(item) {
                return item.tagName
            }).join(';')
        },
        // 打开备注编辑弹框
        openRemarkDialog: function(row) {
            var self = this;
            this.$prompt('请输入备注', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValidator: function(str) {
                    return !!str
                },
                inputErrorMessage: '请输入备注'
            }).then(({
                value
            }) => {
                let param = {
                    openId: row.openId,
                    remark: value
                }
                setUserRemark(param).then(function() {
                    self.getList();
                    self.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                })

            }).catch();
        },
        // 打开消息弹框
        openMessageDialog: function(row) {
            this.selectedOpenId = row.openId;
            this.$refs.messageDialog.showMessageDialog = true;
            this.$refs.messageDialog.openId = row.openId;
            this.$refs.messageDialog.selfHeadImg = row.headImgUrl;
            this.$refs.messageDialog.getMessageData();
        },

        handleSizeChange: function(val) {
            this.size = val;
            this.getList();
        },
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.getList();
        }
    },
    filters: {
        // 关注渠道
        FocusOnChannels: function(val) {
            var channelMap = {
                ADD_SCENE_SEARCH: '公众号搜索',
                ADD_SCENE_ACCOUNT_MIGRATION: '公众号迁移',
                ADD_SCENE_PROFILE_CARD: '名片分享',
                ADD_SCENE_QR_CODE: '扫描二维码',
                ADD_SCENE_PROFILE_LINK: '图文页内名称点击',
                ADD_SCENE_PROFILE_ITEM: '图文页右上角菜单',
                ADD_SCENE_PAID: '支付后关注',
                ADD_SCENE_OTHERS: '其他'
            };
            return channelMap[val]
        },
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
        },
        // 性别
        sexFormat: function(val) {
            var sexMap = ['未知', '男', '女'];
            return sexMap[val]
        }
    }
        
}
</script>
<style>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    
    .el-dropdown-link i {
        padding-left: 12px;
    }
    
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>