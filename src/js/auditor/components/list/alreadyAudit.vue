<template>
  <el-card v-loading="loading">
      <p style="text-align: center;font-size:40px">已审核列表</p>   
        <el-form :inline="true" :model="form">
          <el-form-item label="选择报销类型">
            <el-checkbox-group v-model="checkList">
             <el-checkbox label="学生报销" ></el-checkbox>
             <el-checkbox label="在职职工报销"></el-checkbox>
             <el-checkbox label="退休职工报销"></el-checkbox>
             <el-checkbox label="离休职工报销"></el-checkbox>
             <el-checkbox label="工伤报销"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="initData(1)">查询</el-button>
            <!-- <el-button @click="clearForm">重置</el-button> -->
          </el-form-item>
        </el-form>
        

          <div style="color:#000;font-size: 15px;text-align:left;">共有<font color='red'>{{recordnum}}</font>条报销记录</div>
          
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
                      <span class="alreadyAudit" >已审核</span>
                  </template>
              </el-table-column>
              <el-table-column
                      align="operation"
                      label="操作"
                      width="280">
                  <template slot-scope="scope">
                      <el-button type="primary" @click="handleAudit(scope.$index, scope.row)">审核</el-button>
                       <el-dialog title="审核页面" :visible.sync="auditVisible":center = true>
                        <el-form :model="form">
                          <el-form-item label="姓名" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" disabled></el-input>
                          </el-form-item>
                        </el-form>
                         <div slot="footer" class="dialog-footer">
                           <el-button @click="auditVisible = false">取 消</el-button>
                           <el-button type="primary" @click="auditVisible = false">确 定</el-button>
                         </div>
                       </el-dialog>
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
                tableData: [],
                auditVisible: false,
                loading: true,
                page: {
                    currentPage: 1,
                    pageSize: 14,
                    pageCount: 1
                },
                form: {
                    name: '',
                    type: '',
                    pos: ''
                },
                checkList:['']
            }
        },
        methods: {
             initData(page) {
                if(page) {
                    this.page.currentPage = page;
                }
                this.loading = true;
                this.$ajax.post('/auditor/getView', {
                    currentPage: this.page.currentPage
                }).then(res => {
                    this.loading = false;
                    if (res.data.success === "success") {
                        this.tableData=res.data.data;
                        this.page.pageCount = res.data.pageCount;
                        this.recordnum = res.data.recordnum;
                    } else {
                        this.$message.error(res.data.success);
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
                    if(res.data.success === "success") {
                        this.$notify.success({
                            title: res.data.success
                        });
                        this.initData();
                    } else {
                        this.$message.warning(res.data.success);
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },

            handleAudit(index, row) {
              this.auditVisible = true;
              this.form.name = row.applyer;
            },


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
