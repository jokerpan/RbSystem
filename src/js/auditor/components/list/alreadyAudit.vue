<template>
  <el-card v-loading="loading">
      <p style="text-align: center;font-size:40px">已审核列表</p>   
        <el-form :inline="true" :model="form">
          <el-form-item label="选择报销类型">
            <el-checkbox label="学生报销" name="type"></el-checkbox>
            <el-checkbox label="在职职工报销" name="type"></el-checkbox>
            <el-checkbox label="退休职工报销" name="type"></el-checkbox>
            <el-checkbox label="离休职工报销" name="type"></el-checkbox>
            <el-checkbox label="工伤报销" name="type"></el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="initData(1)">查询</el-button>
            <el-button @click="clearForm">重置</el-button>
          </el-form-item>
        </el-form>
        
          
          <el-badge :value="12" class="item">                              <!--此处12需要有个返回值   -->        
            <el-button size="small">报销记录条数</el-button>         
          </el-badge>
          
          <el-table
              :data="tableData"
              class="split"
              v-show="!loading">
            <el-table-column
              prop="submitTime"
              label="提交时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="applyer"
              label="申请人"
              align="center">
            </el-table-column>
            <el-table-column
              prop="rbType"
              label="报销类型"
              align="center"
              sortable
              width="150">
              <!-- <template slot-scope="scope">
             
              </template> -->
            </el-table-column>
            <el-table-column
                      prop="totalMoney"
                      label="总金额"
                      align="center">
            </el-table-column>
            <el-table-column
                      prop="curStatus"
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
                      align="operation"
                      label="操作"
                      width="280">
                  <template slot-scope="scope">
                      <el-button type="primary" @click="handleEvent(scope.row.nbr, 'confirm')" v-if="!scope.row.pos">查看</el-button>
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
        name: 'alreadyAudit',
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
