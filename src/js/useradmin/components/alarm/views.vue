<template>
    <el-card v-loading="loading">
        <el-form :inline="true" :model="form">
            <el-form-item label="事件名称">
                <el-input v-model="form.name" placeholder="事件名称"></el-input>
            </el-form-item>
            <el-form-item label="事件级别">
                <el-select v-model="form.type" placeholder="事件级别">
                    <el-option label="正常" value="normal"></el-option>
                    <el-option label="警告" value="warning"></el-option>
                    <el-option label="严重" value="shanghai"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="事件状态">
                <el-select v-model="form.pos" placeholder="事件状态">
                    <el-option label="已处理" :value="1"></el-option>
                    <el-option label="待处理" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="initData(1)">查询</el-button>
                <el-button @click="clearForm">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                class="split"
                v-show="!loading">
            <el-table-column
                    prop="name"
                    label="事件名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="source"
                    label="事件来源"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="class"
                    label="级别"
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
                    prop="pos"
                    label="状态"
                    align="center"
                    sortable
                    width="150">
                <template slot-scope="scope">
                    <span class="t-do" v-if="scope.row.pos">已处理</span>
                    <span class="t-undo" v-else>待处理</span>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"
                    width="280">
                <template slot-scope="scope">
                    <el-button type="primary" @click="handleEvent(scope.row.nbr, 'confirm')" v-if="!scope.row.pos">确认</el-button>
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
                loading: false,
                tableData: [],
                page: {
                    currentPage: 1,
                    pageSize: 15,
                    pageCount: 1
                },
                form: {
                    name: '',
                    type: '',
                    pos: ''
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
                        for(const name in result) {
                            tableData.push({
                                name,
                                ...result[name]
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
                    name: '',
                    type: '',
                    pos: ''
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
