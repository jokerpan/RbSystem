<template>
  <div id="import" class="layout">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>批量导入</span>
      </div>
      <el-steps :active="active" finish-status="success">
        <el-step title="上传文件"></el-step>
        <el-step title="执行导入"></el-step>
        <el-step title="导入完成"></el-step>
      </el-steps>
      <div  style="display: block;" id="step1" class="upOrDownBox">
          <div class="downloadBox">
            <i class="iconfont icon-xiazai1 el-icon-downloadBox"></i>
            <div class="download">
                <h2 class="botSpace">填写导入员工的信息</h2>
                <p class="botSpace">请按照数据模板的格式准备导入数据，模板中的表头名称、表内字体不可更改，表头行不能删除</p>
                <a  href='/apiStatic/platformManagement/downLoad/员工导入模板.xlsx' download=""  title="下载">下载模板</a>
            </div>
          </div>
          <div class="uploadBox">
            <i class="iconfont icon-shangchuan1  el-icon-downloadBox"></i>
            <div class="upload">
                <h2 class="botSpace">上传填好的员工信息表</h2>
                <p class="botSpace">文件名后缀必须为xls或者xlsx(即Excel),文件大小不得大于10M</p>
                <el-upload
                    :limit="limitNumber"
                    ref="upload"
                    action="/apiExcel/SysEmpController/readEmpExcel"
                    :on-success="handleAvatarSuccess"
                    :on-change="handleFilesChange"
                    :auto-upload="false"
                    :on-error="uploadError"
                    style="margin-bottom: 20px;">
                  <el-button slot="trigger" size="small" type="primary">上传信息表</el-button>
                </el-upload>
            </div>
         </div>
         <el-button v-model="active" class="nextBtn" style="margin-top: 50px;" @click="next">下一步</el-button>
      </div>
      <div  style="display: none;" id="step2" class="executeImport">
          <div class="downloadBox">
             <i class="iconfont icon-zhengquewanchengchenggong el-icon-downloadBox" style="color:#4AA34A"></i>
             <div class="download">
                 <h2 class="botSpace">本次可导入员工数量</h2>
                 <p class="botSpace" style="color:#0079FE;font-size: 14px;">{{this.importSuccessNum}}人</p>
             </div>
          </div>
          <div class="uploadBox">
             <i class="iconfont icon-tanhao el-icon-downloadBox"  style="color:#FC4A4A"></i>
             <div class="upload">
                 <h2 class="botSpace">本次不可导入员工数量</h2>
                 <p class="botSpace"  style="color:#0079FE;font-size: 14px;">{{this.importFailedNum}}人</p>
             </div>
          </div>
          <div style="margin:50px auto; width: 340px;">
              <el-button v-model="active" class="nextBtn1"  @click="upload">确定上传</el-button>
              <el-button v-model="active" class="returnStepBtn"  @click="returnStep">返回重新上传</el-button>
          </div>
          <p style="margin:50px 0 20px 0;">不可导入员工列表</p>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="number"
              label="行数"
              >
            </el-table-column>
            <el-table-column
              prop="empNo"
              label="员工工号"
              >
            </el-table-column>
            <el-table-column
              prop="empName"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="departName"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="empPhone"
              label="手机">
            </el-table-column>
            <el-table-column
              prop="errorMsg"
              label="错误提示"
              width="300"
              >
                <template slot-scope="scope">
                    <span style="color: #FC4A4A;">{{scope.row.errorMsg}}</span>
                </template>
            </el-table-column>
          </el-table>
      </div>
      <div  style="display: none;" id="step3">
          <div style="width: 340px;margin: 0 auto;text-align: center;">
              <i class="iconfont icon-icon_duihao-mian" style="font-size: 68px; color: #4BD863 ;"></i>
              <h1 style="margin-top: 20px;">批量导入成功</h1>
              <p style="margin-top: 20px; color: #999999;">成功导入员工数量5人，默认密码为员工工号</p>
              <el-button style="margin-top: 50px;" type="primary" @click="complete">完成</el-button>
          </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        active: 1,
        limitNumber: 1,
        tableData:[],
        importSuccessNum:0,
        importFailedNum:0,
        files:{}
    };
  },

  methods: {
      next() {
          // this.$refs.upload.submit();
          this.active+=1;
          var step1 = document.getElementById("step1");
          var step2 = document.getElementById("step2");
          step1.style.display = "none";
          step2.style.display = "block";
      },
      handleFilesChange(file, fileList){
        this.files = file;
      },
      handleAvatarSuccess(response, file, fileList) {
         var step1 = document.getElementById("step1");
         var step2 = document.getElementById("step2");
         var step3 = document.getElementById("step3");
         if(response.status === 200) {
            this.active+=1;
            step2.style.display = "none";
            step3.style.display = "block";
         }else if(response.status === 400){
            this.tableData = response.content.errorList;
            this.importSuccessNum = response.content.successNum;
            this.importFailedNum = response.content.errorNum;
            if(this.importFailedNum>0){
                this.$message({
                  message: '请将错误数据修改后再进行上传操作!',
                  type: 'warning'
                });
            }
         }else{
            this.$notify.error({title: '请刷新重试'});
         }
      },
      upload(){
        // console.log(this.files.name)
        if(this.files.name){
           this.$refs.upload.submit();
        }else{
          this.$message({
            message: '请返回上一页，上传信息表之后在进行上传操作!',
            type: 'warning'
          });
        }
      },
      complete(){
        this.$router.push("/platformManagement/employeesManagement");
      },
      returnStep(){
        var step1 = document.getElementById("step1");
        var step2 = document.getElementById("step2");
        step1.style.display = "block";
        step2.style.display = "none";
        this.active-=1
        this.tableData=[];
        this.importSuccessNum = 0;
        this.importFailedNum = 0;
        // this.files = {};
        this.$refs.upload.clearFiles()
      },
      uploadSuccess(res) {
          if(res.code === 200) {
              this.$notify.success({title: res.msg});
              this.initData();
          } else {
              this.$notify.error({title: res.msg});
          }
      },
      uploadError(err) {
          this.$notify.error({title: err});
      }
  },
}

</script>

<style>
  @import "../../../../../less/layout.css";

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  /*bymyself*/
  .el-steps{
      width: 1100px;
      margin: 40px auto;
  }
  .nextBtn{
     display: block;
     width:170px;
     margin: 0 auto;
     padding: 15px 60px;
     background-color: #0078FF;
     color: #fff;
  }

  .nextBtn1,.returnStepBtnp{
     display: inline-block;
     width:170px;
     margin: 0 auto;
     padding: 15px 60px;
     background-color: #0078FF;
     color: #fff;
  }

  .returnStepBtnp{
     width: 200px;
   }

  .upOrDownBox,.executeImport{
      width: 1100px;
      min-height: 400px;
      margin: 50px auto;
  }
  .downloadBox,.uploadBox{
     border: 1px solid #EDEDED;
     height: 180px;
     margin-top: 20px;
  }
  .download,.upload{
    width: 900px;
    padding: 30px;
    float: left;
  }
  .el-icon-downloadBox{
     display: inline-block;
     float: left;
     font-size: 60px;
     padding: 60px 50px;
     background-color: #F5F5F5;
     text-align: center;
     vertical-align: middle;
  }
  .botSpace{
    margin-bottom: 13px;
  }

  .el-table .cell {
    white-space: pre-line;
  }

</style>
