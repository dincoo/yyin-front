<template>
    <div>
        <el-dialog title="选择素材" append-to-body :visible.sync="showMaterialChooseDialog" width="900px">
            <el-table border :data="materialList" v-loading="loadingTableData">
                <el-table-column label="序号" type="index" width="66px" align="center"></el-table-column>
                <el-table-column label="media_id" prop="mediaId" align="center"></el-table-column>
                <el-table-column label="名称" prop="name" align="center"></el-table-column>
                <el-table-column label="更新时间" align="center" width="160px">
                    <template slot-scope="scope">
                        <span>{{scope.row.updateTime|formatDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="92px" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="chooseIt(scope.row)">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
import {getMaterialList} from '@/api/wxManageApi/wx-material-manage'
import {paddZero} from '@/util/util'
export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            total: 0,
            materialList: [],
            showMaterialChooseDialog: false,
            selectedRow: null,
            msgType: 'image',
            loadingTableData: false
        }
    },

    methods: {
        // 获取列表数据
        getList: function() {
            var self = this;
            var params = {
                current: this.currentPage,
                size: this.pageSize,
                msgType: this.msgType
            }
            this.loadingTableData = true;
            getMaterialList(params).then(function(res) {
                self.materialList = res.data.list;
                self.total = res.data.totalCount;
                self.loadingTableData = false;
            }).catch(function() {
                self.loadingTableData = false;
            })
        },
        // 选中当前行
        chooseIt: function(row) {
            this.selectedRow = row;
            this.showMaterialChooseDialog = false;
            window.postMessage(row, location.origin);
            this.$emit('chooseBack',row)
            if (this.getSelectedMaterial) {
                this.getSelectedMaterial(row);
            }
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