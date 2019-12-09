<template>
    <el-card v-loading="loading">
        
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="活动时间">
                <el-col :span="11">
                  <el-form-item prop="start_date">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formInline.start_date" style="width: 100%;" value-format="timestamp"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="end_date">
                    <el-date-picker placeholder="选择时间" v-model="formInline.end_date" style="width: 100%;" value-format="timestamp"></el-date-picker>
                  </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getForm">查询</el-button>
            </el-form-item>
        </el-form>
  
        
        <el-badge :value="recordnum" class="item">                              <!--此处12需要有个返回值   -->        
        <el-button size="small">报销记录条数</el-button>         
        </el-badge>
        <el-table
                :data="tableData"
                class="split">
            <el-table-column
                    prop="rb_id"
                    label="报销单ID"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="hospital"
                    label="医院"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="Admin.id"
                    label="审核员"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="s_time"
                    label="报销时间"
                    align="center">
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
                       @current-change="getForm" class="m-page">
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
                    <el-input v-model="form.hospital"></el-input>
                  </el-form-item>
                  <el-form-item label="转诊单日期">
                      <el-date-picker type="date" placeholder="选择日期" v-model="form.referral.date" style="width: 100%;" value-format="timestamp"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="转诊单发票">
                    <el-upload
                      class="upload-demo"
                      :limit="1"
                      :file-list= "referralFileList"
                      action="/RbSystem/upload.do"
                      list-type="picture-card"
                      :http-request="info"
                      >
                       <i slot="default" class="el-icon-plus"></i>
                       <div slot="tip" class="el-upload__tip">最多上传一张jpg/png文件，且不超过500kb</div>
                    
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-upload>
                  </el-form-item>
                </el-card>
                <el-card v-for="(item, index) in form.ghf">
                    <div slot="header" class="clearfix">
                        <span>挂号费{{index}}</span>
                    </div>
                  <el-form-item label="科室">
                    <el-input v-model="item.department"></el-input>
                  </el-form-item>
                  <el-form-item label="挂号费日期">
                      <el-date-picker type="date" placeholder="选择日期" v-model="item.date" style="width: 100%;" value-format="timestamp"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="总金额">
                    <el-input v-model="item.cost"></el-input>
                  </el-form-item>
                  <el-form-item label="自付金额">
                    <el-input v-model="item.self_paid"></el-input>
                  </el-form-item>
                  <el-form-item label="审核说明">
                    <el-input v-model="item.note"></el-input>
                  </el-form-item>
                  <el-form-item label="挂号费发票">
                    <el-upload
                      class="upload-demo"
                      :limit="1"
                      :file-list= "ghfFileList[index]"
                      action="/RbSystem/upload.do"
                      list-type="picture-card"
                      :http-request="info"
                      >
                       <i slot="default" class="el-icon-plus"></i>
                       <div slot="tip" class="el-upload__tip">最多上传一张jpg/png文件，且不超过500kb</div>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-upload>
                  </el-form-item>
                </el-card>
                <el-card v-for="(item, index) in form.yymx">
                    <div slot="header" class="clearfix">
                        <span>用药明细{{index}}</span>
                    </div>
                  <el-form-item label="用药明细日期">
                      <el-date-picker type="date" placeholder="选择日期" v-model="item.date" style="width: 100%;" value-format="timestamp"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="总金额">
                    <el-input v-model="item.cost"></el-input>
                  </el-form-item>
                  <el-form-item label="部分金额">
                    <el-input v-model="item.part_paid"></el-input>
                  </el-form-item>
                  <el-form-item label="自付金额">
                    <el-input v-model="item.self_paid"></el-input>
                  </el-form-item>
                  <el-form-item label="审核说明">
                    <el-input v-model="item.note"></el-input>
                  </el-form-item>
                  <el-form-item label="用药明细发票">
                    <el-upload
                      class="upload-demo"
                      :limit="1"
                      :file-list= "yymxFileList1[index]"
                      action="/RbSystem/upload.do"
                      list-type="picture-card"
                      :http-request="info"
                      >
                       <i slot="default" class="el-icon-plus"></i>
                       <div slot="tip" class="el-upload__tip">最多上传一张jpg/png文件，且不超过500kb</div>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="用药明细发票2">
                    <el-upload
                      class="upload-demo"
                      :limit="1"
                      :file-list= "yymxFileList2[index]"
                      action="/RbSystem/upload.do"
                      list-type="picture-card"
                      :http-request="info"
                      >
                       <i slot="default" class="el-icon-plus"></i>
                       <div slot="tip" class="el-upload__tip">最多上传一张jpg/png文件，且不超过500kb</div>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-upload>
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
                    <el-upload
                      class="upload-demo"
                      :limit="1"
                      :file-list= "wssmFileList1"
                      action="/RbSystem/upload.do"
                      list-type="picture-card"
                      :http-request="info"
                      >
                       <i slot="default" class="el-icon-plus"></i>
                       <div slot="tip" class="el-upload__tip">最多上传一张jpg/png文件，且不超过500kb</div>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="外伤说明发票2">
                    <el-upload
                      class="upload-demo"
                      :limit="1"
                      :file-list= "wssmFileList2"
                      action="/RbSystem/upload.do"
                      list-type="picture-card"
                      :http-request="info"
                      >
                       <i slot="default" class="el-icon-plus"></i>
                       <div slot="tip" class="el-upload__tip">最多上传一张jpg/png文件，且不超过500kb</div>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-upload>
                  </el-form-item>
              </el-card>
                </el-form>
            </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleClose">确 定</el-button>
          </span>
        </el-dialog>
    </el-card>
</template>

<script>

    export default {
        name: 'views',
        data() {
            return {
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
                referralFileList:[],
                ghfFileList:[],
                yymxFileList1:[],
                yymxFileList2:[],
                wssmFileList1:[],
                wssmFileList2:[],
                dialogImageUrl: '',
                dialogVisible: false,
                formInline: {
                    start_date:"",
                    end_date:""
                },
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
            info() {
                
            },
            handleCheck(row){
                this.loading = true;
                let data = {
                    "rb_id": row.rb_id
                };
                this.$ajax.post('/RbSystem/getRbDetail.do',data).then(res => {
                    this.loading = false;
                    if (res.data.success == "success") {
                        this.referralFileList = [];
                        this.ghfFileList = [];
                        this.yymxFileList1 = [];
                        this.yymxFileList2 = [];
                        this.wssmFileList1 = [];
                        this.wssmFileList2 = [];
                        this.form = res.data.Data;
                        if (this.form.referral.pic != "")
                            this.referralFileList.push({"url": this.form.referral.pic});
                        this.form.ghf.forEach(item => {
                            if(item.pic!="")
                                this.ghfFileList.push([{"url": item.pic}]);
                        });
                        this.form.yymx.forEach(item => {
                            if (item.detailed_pic!="")
                                this.yymxFileList1.push([{"url": item.detailed_pic}]);
                            if (item.pspt_pic!="")
                                this.yymxFileList2.push([{"url": item.pspt_pic}]);
                        });
                        if (this.form.wssm.stamp_pic!="")
                            this.wssmFileList1.push({"url": this.form.wssm.stamp_pic});
                        if(this.form.wssm.special_pic!="")
                            this.wssmFileList2.push({"url": this.form.wssm.special_pic});

                        this.dialogVisible1 = true;
                    } else {
                        this.$message.error("请求失败");
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },
            getForm(page) {
                this.loading = true;
                if(page) {
                    this.page.currentPage = page;
                }
                let data = {
                    "curPage": this.page.currentPage,
                    ...this.formInline
                }
                this.$ajax.post('/RbSystem/user/getMyRbRecord.do',{"rbsf": JSON.stringify(data)}).then(res => {
                    this.loading = false;
                    if (res.data.success == "success") {
                        this.tableData=res.data.Data.RbList;
                        this.page.pageCount = res.data.Data.totalPage;
                        this.recordnum = res.data.Data.totalNum;
                    } else {
                        this.$message.error("请求失败");
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },
            handleClose(done) {
                this.referralFileList = [];
                this.ghfFileList = [];
                this.yymxFileList1 = [];
                this.yymxFileList2 = [];
                this.wssmFileList1 = [];
                this.wssmFileList2 = [];
                this.dialogVisible1 = false;
            }
   
        },
        created() {
            this.getForm(1);
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
