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
                    prop="hospital"
                    label="医院"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="totalmoney"
                    label="总金额"
                    align="center"     
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="rbmoney"
                    label="报销金额"
                    align="center"
                    width="150">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"
                    width="280">
                <template slot-scope="scope">
                    <el-button type="primary" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
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
                recordnum:'',
                loading: false,
                tableData: [],
                page: {
                    currentPage: 1,
                    pageSize: 5,
                    pageCount: 1
                },
                
            }
        },
        methods: {
            initData(page) {
                if(page) {
                    this.page.currentPage = page;
                }
                this.loading = true;
                this.$ajax.post('./alarm/getView', {
                    currentPage: this.page.currentPage
                }).then(res => {
                    this.loading = false;
                    if (res.data.code === 200) {
                        this.tableData=res.data.data;
                        this.page.pageCount = res.data.pageCount;
                        this.recordnum = res.data.recordnum;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },
         
           handleDelete(index, row) {
              console.log(index, row);
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
