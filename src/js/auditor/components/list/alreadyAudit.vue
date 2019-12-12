<template>
  <el-card v-loading="loading">
      <p style="text-align: center;font-size:40px">已审核列表</p>   
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
           <el-form-item label="选择报销人员类型">
             <el-checkbox-group v-model="formInline.user_type">
               <el-checkbox label="1">学生报销</el-checkbox>
               <el-checkbox label="2">在职职工报销</el-checkbox>
               <el-checkbox label="3">退休职工报销</el-checkbox>
               <el-checkbox label="4">离休职工报销</el-checkbox>
               <!-- <el-checkbox label="工伤报销"></el-checkbox> -->
             </el-checkbox-group>
           </el-form-item>
      
          
            <el-form-item label="申请人">
                <el-input v-model="formInline.user_name" placeholder="请输入姓名"></el-input>
            </el-form-item>
                
            <el-form-item>
              <el-checkbox-group v-model="formInline.rb_state">
               <el-checkbox label="4">审核通过</el-checkbox>
               <el-checkbox label="5">审核未通过</el-checkbox>
               <el-checkbox label="6">待报销</el-checkbox>
               <el-checkbox label="7">已完成</el-checkbox>
              </el-checkbox-group>     
            </el-form-item>
                
            <el-form-item>
              <el-button style ="text-align: : right"type="primary" @click="initData(2)">查询</el-button>
            </el-form-item>
          </el-form>
        

          <div style="color:#000;font-size: 15px;text-align:left;">共有<font color='red'>{{recordnum}}</font>条报销记录</div>
          
          <!-- <el-table
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
          </el-table> -->

          <el-table
              :data="tableData"
              class="split">
            <el-table-column
              prop="rb_id"
              label="编号"
              align="center"
              sortable="custom">
            </el-table-column>
            <el-table-column
              prop="s_time"
              label="提交时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="admin_id"
              label="审核人"
              align="center">
            </el-table-column>
            <el-table-column
              prop="user_type"
              label="人员类型"
              align="center">
            </el-table-column>
            <el-table-column
              prop="user_name"
              label="用户姓名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="hospital"
              label="医院"
              align="center">
            </el-table-column>
            <el-table-column
              prop="rb_state"
              label="报销状态"
              align="center"
              sortable="custom">
              <template slot-scope="scope">
                  <span>{{rb_state[scope.row.rb_state]}}</span>
              </template>
            </el-table-column>
             <el-table-column
                    align="center"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="handleCheck(scope.row)">查看</el-button>
                </template>
            </el-table-column>
          </el-table>

          <el-pagination background  layout="prev, pager, next, jumper"
                         :current-page="page.currentPage" :page-size="page.pageSize" :page-count="page.pageCount"
                         @current-change="initData" class="m-page">
          </el-pagination>

          <el-dialog
            title="报销单详情"
            :visible.sync="dialogVisible1"
            width="60%">
            <div>
              <el-form ref="form" :model="form" label-width="150px">
                  <el-card>
              <div slot="header">
                  <span>转诊单</span>
              </div>
            <el-form-item label="医院">
              <el-input v-model="form.hospital" disabled></el-input>
            </el-form-item>
            <el-form-item label="转诊单日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.referral.date" style="width: 100%;" value-format="timestamp" disabled></el-date-picker>
            </el-form-item>
            <el-form-item label="转诊单发票">
              <div class="demo-image__preview">
              <el-image 
                style="width: 100px; height: 100px"
                :src="form.referral.pic" 
                :preview-src-list="srcList">
              </el-image>
              </div>
            </el-form-item>
          </el-card>
          <el-card v-for="(item, index) in form.ghf">
              <div slot="header" class="clearfix">
                  <span>挂号费{{index}}</span>
              </div>
            <el-form-item label="科室">
              <el-input v-model="item.department" disabled></el-input>
            </el-form-item>
            <el-form-item label="挂号费日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="item.date" style="width: 100%;" value-format="timestamp" disabled></el-date-picker>
            </el-form-item>
            <el-form-item label="总金额">
              <el-input v-model="item.cost" disabled></el-input>
            </el-form-item>
            <el-form-item label="自付金额">
              <el-input v-model="item.self_paid"></el-input>
            </el-form-item>
            <el-form-item label="审核说明">
              <el-input v-model="item.note"></el-input>
            </el-form-item>
            <el-form-item label="挂号费发票">
              <el-image 
                style="width: 100px; height: 100px"
                :src="item.pic" 
                :preview-src-list="srcList">
              </el-image>
            </el-form-item>
          </el-card>
          <el-card v-for="(item, index) in form.yymx">
              <div slot="header" class="clearfix">
                  <span>用药明细{{index}}</span>
              </div>
            <el-form-item label="用药明细日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="item.date" style="width: 100%;" value-format="timestamp" disabled></el-date-picker>
            </el-form-item>
            <el-form-item label="总金额">
              <el-input v-model="item.cost" disabled></el-input>
            </el-form-item>
            <el-form-item label="部分金额">
              <el-input v-model="item.part_paid"></el-input>
            </el-form-item>
            <el-form-item label="特殊金额">
              <el-input v-model="item.special_paid"></el-input>
            </el-form-item>
            <el-form-item label="自付金额">
              <el-input v-model="item.self_paid"></el-input>
            </el-form-item>
            <el-form-item label="审核说明">
              <el-input v-model="item.note"></el-input>
            </el-form-item>
            <el-form-item label="用药明细发票">
              <el-image 
                style="width: 100px; height: 100px"
                :src="item.detailed_pic" 
                :preview-src-list="srcList">
              </el-image>
            </el-form-item>
            <el-form-item label="用药明细发票2">
              <el-image 
                style="width: 100px; height: 100px"
                :src="item.pspt_pic" 
                :preview-src-list="srcList">
              </el-image>
            </el-form-item>
          </el-card>
          <el-card>
              <div slot="header" class="clearfix">
                  <span>外伤说明</span>
              </div>
            <el-form-item label="说明">
              <el-input v-model="form.wssm.note"></el-input>
            </el-form-item>
            <el-form-item label="外伤说明发票">
              <el-image 
                style="width: 100px; height: 100px"
                :src="form.wssm.stamp_pic" 
                :preview-src-list="srcList">
              </el-image>
            </el-form-item>
            <el-form-item label="外伤说明发票2">
              <el-image 
                style="width: 100px; height: 100px"
                :src="form.wssm.special_pic" 
                :preview-src-list="srcList">
              </el-image>
            </el-form-item>
        </el-card>
                  </el-form>
              </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible1=false">确定</el-button>
              <!-- <el-button type="danger" @click="postCheck(5)">审核不通过</el-button> -->
            </span>
        </el-dialog>

    </el-card>

</template>


<script>

    export default {
        name: 'alreadyAudit',
        data() {
            return {

                rb_state: {                 
                  0:"没有报销单申请记录",
                  1:"未提交",
                  2:"待审核",
                  3:"审核中", 
                  4:"审核通过", 
                  5:"审核未通过", 
                  6:"待报销", 
                  7:"已完成"
                },
                tableData: [],
                loading: true,
                page: {
                    currentPage: 1,
                    pageSize: 5,
                    pageCount: 1
                },
                formInline: {
                    user_name: '',
                    user_type: [],
                    start_date: "",
                    end_date:"",
                    rb_state:[],
                },
                recordnum:'',
                dialogVisible1:false,
                form: {
                    rb_id: "",
                    hospital:"",
                    referral: {
                      "pic":""
                    },
                    ghf: [{}],
                    yymx: [{}],
                    wssm: {}
                },
               
               srcList: []

            }
        },
        methods: {
            info() {
                
            },
            initData(page) {
                if(page) {
                    this.page.currentPage = page;
                }
                this.loading = true;
                let data1={
                  "curPage":this.page.currentPage,
                  ...this.formInline
                };
                const data = {
                  "rbsf": JSON.stringify(data1)
                }
                this.$ajax.post('/RbSystem/admin/getRbList2.do', data).then(res => {
                    this.loading = false;
                    if (res.data.success === "success") {
                        this.tableData=res.data.Data.RbList;
                        this.page.pageCount = res.data.Data.totalPage;
                        this.recordnum = res.data.Data.totalNum;
                    } else {
                        this.$message.error(res.data.success);
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },

            handleCheck(row){
                this.loading = true;
                let data = {
                    "rb_id": row.rb_id
                };
                this.srcList=[];
                this.$ajax.post('/RbSystem/getRbDetail.do',data).then(res => {
                    this.loading = false;
                    if (res.data.success == "success") {
                        this.form = res.data.Data;
                        if (this.form.referral.pic != "")
                            this.srcList.push(this.form.referral.pic);
                        this.form.ghf.forEach(item => {
                            if(item.pic!="")
                                this.srcList.push(item.pic);
                        });
                        this.form.yymx.forEach(item => {
                            if (item.detailed_pic!="")
                                this.srcList.push(item.detailed_pic);
                            if (item.pspt_pic!="")
                                this.srcList.push(item.pspt_pic);
                        });
                        if (this.form.wssm.stamp_pic!="")
                            this.srcList.push(this.form.wssm.stamp_pic);
                        if(this.form.wssm.special_pic!="")
                            this.srcList.push(this.form.wssm.special_pic);

                        this.dialogVisible1 = true;
                    } else {
                        this.$message.error("请求失败");
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },



        

            postCheck(result) {
                
                let data = {
                  "result": result,
                  ...this.form
                }
                data = JSON.stringify(data);
                this.$ajax.post('/RbSystem/admin/postRbCheck.do', {
                    "rbStr": data
                }).then(res => {
                    if (res.data.success === "success") {
                        this.srcList = [];
                        // this.ghfFileList = [];
                        // this.yymxFileList1 = [];
                        // this.yymxFileList2 = [];
                        // this.wssmFileList1 = [];
                        // this.wssmFileList2 = [];
                        this.dialogVisible1 = false;
                        this.$message.success("提交成功");
                        this.initData();
                    } else {
                        this.$message.error(res.data.success);
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
