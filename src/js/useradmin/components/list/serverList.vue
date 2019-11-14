<template>
    <el-card v-loading="loading">
        
        <el-form  label-width="600px" >
        <el-form-item label="报销记录" size="large">
        </el-form-item>
        </el-form>
  
        
        <el-badge :value="recordnum" class="item">                              <!--此处12需要有个返回值   -->        
        <el-button size="small">报销记录条数</el-button>         
        </el-badge>
        <el-table
                :data="tableData"
                class="split"
                v-show="!loading">
            <el-table-column
                    prop="time"
                    label="报销完成时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="hosptial"
                    label="医院"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="totalmoney"
                    label="总金额"
                    align="center"
                    sortable
                    width="150">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.type == 'normal'">正常</el-tag>
                    <el-tag type="warning" v-else-if="scope.row.type == 'warning'">警告</el-tag>
                    <el-tag type="danger" v-else>严重</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="rbmoney"
                    label="报销金额"
                    align="center"
                    sortable
                    width="150">
                <template slot-scope="scope">
                    <span class="t-do" v-if="scope.row.rbmoney">已处理</span>
                    <span class="t-undo" v-else>待处理</span>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"
                    width="280">
                <template slot-scope="scope">
                    <el-button type="primary" @click="handleEvent(scope.row.nbr, 'confirm')" v-if="!scope.row.rbmoney">确认</el-button>
                    <el-button type="info" @click="handleEvent(scope.row.nbr, 'cancel')">消除</el-button>
                    <el-button type="danger" @click="handleEvent(scope.row.nbr, 'upgrade')">升级</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background  layout="prev, pager, next, jumper"
                       :current-page="page.currentPage" :page-size="page.pageSize" :page-count="page.pageCount"
                       @current-change="initData" class="m-page">
        </el-pagination>
    </el-card>
</template>

<script>

    export default {
        name: 'views',
        data() {
            return {
                recordnum:12,
                loading: false,
                tableData: [],
                page: {
                    currentPage: 1,
                    pageSize: 15,
                    pageCount: 1
                },
                form: {
                    time: '',
                    type: '',
                    rbmoney: ''
                }
            }
        },
        methods: {
            initData(page) {
                if(page) {
                    this.page.currentPage = page;
                }
                this.loading = true;
                this.$ajax.post('./alarm/getView', {
                    currentPage: this.page.currentPage,
                    pageSize: this.page.pageSize,
                    ...this.form
                }).then(res => {
                    this.loading = false;
                    if (res.data.code === 200) {
                        const tableData = [], result = res.data.result;
                        for(const time in result) {
                            tableData.push({
                                time,
                                ...result[time]
                            })
                        }
                        this.tableData = tableData;
                        this.page.pageCount = res.data.pageCount;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },
            clearForm() {
                this.form = {
                    time: '',
                    type: '',
                    rbmoney: ''
                };
            },
            handleEvent(nbr, type) {
                this.$ajax.post('./alarm/processView', {
                    nbr,
                    type
                }).then(res => {
                    if(res.data.code === 200) {
                        this.$notify.success({
                            title: res.data.msg
                        });
                        this.initData();
                    } else {
                        this.$message.warning(res.data.msg);
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            }
        },
        created() {
            this.initData();
        }
    }
</script>

<style>
    .split {
        width: 100%;
        margin-bottom: 20px;
    }
    .t-do {
        color: #f56c6c;
    }
    .t-undo {
        color: #e6a23c;
    }
    .m-page {
        text-align: center;
        margin-top: 30px;
    }
</style>
