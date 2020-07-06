<template>
  <div>
        <el-dialog title="请选择用户" append-to-body :visible.sync="showUserChooseDialog" width="900px">
            <el-row :gutter="16" style="margin-bottom: 12px;">
                <el-col :span="6">
                    <el-input type="text" v-model="nickname" placeholder="请输入用户昵称"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary">查询</el-button>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:12px;">
                <el-col :span="24">
                    <el-tag type="success" closable v-for="(item,index) in selectedRows" :key="index" style="margin-right: 10px;" @close="closeUserTag(item,index)">{{item.nickname}}</el-tag>
                </el-col>
            </el-row>
            <el-table ref="chooseTableRef" v-loading="tableLoading" :data="userTableData" border @selection-change="setSelectData" tooltip-effect="dark">
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

            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
            <div slot="footer">
                <el-button @click="showUserChooseDialog=false">取消</el-button>
                <el-button type="primary" @click="submitChooseUser">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getUserList} from '@/api/wxManageApi/wx-user-list'
import {paddZero} from '@/util/util'
export default {
    data: function() {
        return {
            showUserChooseDialog: false,
            userTableData: [],
            nickname: '',
            currentPage: 1,
            size: 10,
            total: 0,
            selectedRows: [],
            tableLoading: false,
            parentUserData: []
        }
    },
    created() {

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
            self.tableLoading = true;
            if (self.parentUserData.length > 0) {
                self.tableLoading = false;
                return;
            }
            getUserList(params).then(function(res) {
                self.userTableData = res.data.data;
                self.total = res.data.totalCount;
                self.tableLoading = false;

            }).catch(function(err) {
                console.log(err)
                self.tableLoading = false;
            });
        },
        // 提交已选用户
        submitChooseUser: function() {
            this.showUserChooseDialog = false;
            // setChooseUser是父组件传过来回调函数
            if (this.setChooseUser) {
                this.setChooseUser(this.selectedRows);
            }
        },
        // 设置选中用户
        setSelectData: function(val) {
            console.log(val, this.parentUserData);
            this.selectedRows = val;
        },
        // 关闭选中的用户
        closeUserTag: function(val, idx) {
            this.$refs.chooseTableRef.toggleRowSelection(val, false);
            this.selectedRows.splice(idx, 1);
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

</style>