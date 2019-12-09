<template>
    <div class="g-all">
      <div style="width: 50%; margin: auto;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="报销单编号">
          <el-input v-model="formInline.QRCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryById(1)">查询</el-button>
        </el-form-item>
    </el-form>
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
            <el-form-item>
              <el-button type="primary" @click="recieve">收单</el-button>
            </el-form-item>
        </el-card>

          </el-form>
      </div>
      <div class="g-ft">
          COPYRIGHT 1998-2018 版权所有 北京东方龙马软件发展有限公司 京ICP备14000200号-1
      </div>
    </div>
    </div>
</template>

<script>



    export default {
        name: 'container',
        data() {
            return {
                formInline: {
                  "QRCode": ''
                },
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
                srcList:[]
            }
        },
        methods:{
          queryById() {
            this.$ajax.post("/RbSystem/admin/getRecieve.do", this.formInline).then(res => {
              if (res.data.success === "success") {
                  this.srcList = [];
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
              } else {
                  this.$message.error(res.data.success);
              }
            }).catch(res => {
              this.$message.error('请刷新重试');
            })
          },
          recieve() {
            let data = {
              "rb_id": this.form.rb_id
            }
            this.$ajax.post(`/RbSystem/admin/recieve.do`,data).then(res => {
                if (res.data.success == "success"){
                    this.$notify.success({title: '收单成功'});
                    this.formInline.QRCode = "";
                    this.form = {};
                    this.srcList=[];
                }else {
                  this.$notify.error({title: '操作失败'});
                }
            }).catch(res => {
                this.$notify.error({title: '请刷新重试'});
            })
          }
        },
        beforeCreate() {
          if (this.$cookie.get('level') != 4) {
            window.location.href = './user';
          }
        }
    }
</script>

<style lang="less">
  @import "../../less/index.less";
  @import "../../icon/iconfont.css";
  .g-all {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  .g-mn {
    margin-left: 250px;
    position: relative;
  .g-container {
    background: #f0f2f5;
    padding: 30px 30px 88px;
  }
  .g-ft {
    width: 100%;
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
    text-align: center;
    position: absolute;
    bottom: 24px;
  }
  }
  }
  .el-table {
    border: 1px solid #ebeef5;
    border-bottom: none;
  th {
    background: #fafafa;
  }
  }
</style>
