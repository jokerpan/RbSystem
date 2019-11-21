<template>
  <el-card v-loading="loading">
      <div style="color:#000;font-size: 25px;text-align:center">报销申请记录</div>
      <br>
      <el-row>
      <el-col :span="8">
      <el-date-picker     
      v-model="value1"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
      </el-date-picker>
          </el-col>
          <el-col :span="14">
              <el-form :inline="true" :model="form">
                  <el-form-item label="审核人">
                      <el-select v-model="form.type" multiple placeholder="审核人">
                          <el-option
                      v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                       <span style="float: left">{{ item.label }}</span>
                        </el-option>
                          <el-option label="001" value="aaa"></el-option>
                          <el-option label="002" value="bbb"></el-option>
                          <el-option label="003" value="ccc"></el-option>
                      </el-select>
                  </el-form-item>
              </el-form>
          </el-col>
    </el-row>
         
        <el-form :inline="true" :model="form">
          <el-form-item label="选择报销类型">           
            <el-radio-group v-model="radio1">
            <el-radio :label="1">在职职工报销</el-radio>
            <el-radio :label="2">退休职工报销</el-radio>
            <el-radio :label="3">离休职工报销</el-radio>
            <el-radio :label="4">工伤报销</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        
          
        <el-form :inline="true" :model="form">
          <el-form-item label="申请人">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
                
          <el-form-item>
            <el-radio-group v-model="radio2">
            <el-radio :label="1">未审核</el-radio>
            <el-radio :label="2">待确认</el-radio>
            <el-radio :label="3">已确认</el-radio>
            <el-radio :label="4">已报销</el-radio>
          </el-radio-group>
         
          </el-form-item>
                
          <el-form-item>
            <el-button style ="text-align: : right"type="primary" @click="initData(1)">查询</el-button>
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
              <template slot-scope="scope">
            
              </template>
            </el-table-column>
            <el-table-column
                      prop="totalMoney"
                      label="总金额"
                      align="center">
            </el-table-column>
            <el-table-column
                      prop="curStatus"
                      label="当前状态"
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
        name: 'views',
        data() {
            return {
                radio1:0,
                radio2:0,
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
                },
              
                 options: [{
          value: 'Beijing',
          label: '张三'
        }, {
          value: 'Shanghai',
          label: '李四'
        }, {
          value: 'Nanjing',
          label: '王五'
        }, {
          value: 'Chengdu',
          label: '赵六'
        }],
        value2: [],
                pickerOptions: {
              shortcuts: [{
             text: '最近一周',
              onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
             }
           }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: ''
            
            }
        },
       methods: {
            initData(page) {
                if(page) {
                    this.page.currentPage = page;
                }
                this.loading = true;
                this.$ajax.post('./alarm/getView1', {
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
