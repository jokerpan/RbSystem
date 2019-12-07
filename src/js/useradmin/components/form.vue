<template>
    <div >
        <el-steps :active="active">
            <el-step title="未提交" description="本报销单还未提交"></el-step>
            <el-step title="待审核" description="已经提交，等待审核员审核中"></el-step>
            <el-step title="审核中" description="审核员正在审核"></el-step>
            <el-step title="待确定" description="审核员审核完成，有疑义请联系审核员"></el-step>
            <el-step title="等待报销" description="请在七个工作日内提交报单员，逾期作废"></el-step>
            <el-step title="已完成" description="报销已完成">
            </el-step>
        </el-steps>
        <div>
            <el-form ref="form" :model="form" label-width="200px">
            <el-card>
                <div slot="header">
                    <span>转诊单</span>
                </div>
              <el-form-item label="医院">
                <el-input v-model="form.hospital"></el-input>
              </el-form-item>
              <el-form-item label="转诊单日期">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.referral.date" style="width: 100%;" value-format="timestamp" ></el-date-picker>
              </el-form-item>
              <el-form-item label="转诊单发票">
                <el-upload
                  class="upload-demo"
                  :limit="1"
                  :file-list= "referralFileList"
                  action="/RbSystem/upload.do"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="(file,fileList)=>{return handleRemove(file,fileList,0)}"
                  :on-success="(res,file,fileList)=>{return uploadSuccess(res,file,fileList,0)}"
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
                    <el-button style="float: right; padding: 3px 0" type="text" @click="addCard(0)">增加</el-button>
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
              <el-form-item v-if="seen" label="自付金额">
                <el-input v-model="item.self_paid"></el-input>
              </el-form-item>
              <el-form-item v-if="seen" label="审核说明">
                <el-input v-model="item.note"></el-input>
              </el-form-item>
              <el-form-item label="挂号费发票">
                <el-upload
                  class="upload-demo"
                  :limit="1"
                  :file-list= "ghfFileList[index]"
                  action="/RbSystem/upload.do"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="(file,fileList)=>{return handleRemove(file,fileList,1,index)}"
                  :on-success="(res,file,fileList)=>{return uploadSuccess(res,file,fileList,1,index)}"
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
                    <el-button style="float: right; padding: 3px 0" type="text" @click="addCard(1)">增加</el-button>
                </div>
              <el-form-item label="用药明细日期">
                  <el-date-picker type="date" placeholder="选择日期" v-model="item.date" style="width: 100%;" value-format="timestamp"></el-date-picker>
              </el-form-item>
              <el-form-item label="总金额">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item v-if="seen" label="部分金额">
                <el-input v-model="item.part_paid"></el-input>
              </el-form-item>
              <el-form-item v-if="seen" label="自付金额">
                <el-input v-model="item.self_paid"></el-input>
              </el-form-item>
              <el-form-item v-if="seen" label="审核说明">
                <el-input v-model="item.note"></el-input>
              </el-form-item>
              <el-form-item label="用药明细发票">
                <el-upload
                  class="upload-demo"
                  :limit="1"
                  :file-list= "yymxFileList1[index]"
                  action="/RbSystem/upload.do"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="(file,fileList)=>{return handleRemove(file,fileList,2,index)}"
                  :on-success="(res,file,fileList)=>{return uploadSuccess(res,file,fileList,2,index)}"
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
                  :on-preview="handlePictureCardPreview"
                  :on-remove="(file,fileList)=>{return handleRemove(file,fileList,3,index)}"
                  :on-success="(res,file,fileList)=>{return uploadSuccess(res,file,fileList,3,index)}"
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
                  :on-preview="handlePictureCardPreview"
                  :on-remove="(file,fileList)=>{return handleRemove(file,fileList,4)}"
                  :on-success="(res,file,fileList)=>{return uploadSuccess(res,file,fileList,4)}"
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
                  :on-preview="handlePictureCardPreview"
                  :on-remove="(file,fileList)=>{return handleRemove(file,fileList,5)}"
                  :on-success="(res,file,fileList)=>{return uploadSuccess(res,file,fileList,5)}"
                  >
                   <i slot="default" class="el-icon-plus"></i>
                   <div slot="tip" class="el-upload__tip">最多上传一张jpg/png文件，且不超过500kb</div>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-upload>
              </el-form-item>
              <el-form-item v-if="seen1">
                <el-button type="primary" @click="onConfirm(1)">确定报销</el-button>
                <el-button type="primary" @click="onConfirm(2)">修改后提交</el-button>
              </el-form-item>
              <el-form-item v-if="seen2">
                <el-button type="primary" @click="onSubmit(2)">提交</el-button>
                <el-button type="primary" @click="onSubmit(1)">暂存</el-button>
              </el-form-item>
          </el-card>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default{
        name:'scriptList',
        data(){
            return{
                seen: false,
                seen1: false,
                seen2: false,
                active: 0,
                rb_state: '',
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
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
                wssmFileList2:[]
            }
        },
        methods: {
            uploadSuccess(res,file,fileList,x,y) {
                if(res.success === "success") {
                    this.$notify.success("成功了");
                    file.url = res.Data.path;
                    switch(x) {
                        case 0: this.referralFileList = fileList;break;
                        case 1: this.ghfFileList[y] = fileList;break;
                        case 2: this.yymxFileList1[y] = fileList;break;
                        case 3: this.yymxFileList2[y] = fileList;break;
                        case 4: this.wssmFileList1 = fileList;break;
                        case 5: this.wssmFileList2 = fileList;break;
                    }
                    console.log(this.referralFileList);
                    console.log(this.ghfFileList);
                    console.log(this.yymxFileList1);
                    console.log(this.yymxFileList2);
                    console.log(this.wssmFileList1);
                    console.log(this.wssmFileList2);
                } else {
                    this.$notify.error("上传失败");
                }
            },
            handleRemove(file,fileList,x,y) {
              console.log(x,y);
              switch(x) {
                  case 0: this.referralFileList = [];break;
                  case 1: this.ghfFileList[y] = [];break;
                  case 2: this.yymxFileList1[y] = [];break;
                  case 3: this.yymxFileList2[y] = [];break;
                  case 4: this.wssmFileList1 = [];break;
                  case 5: this.wssmFileList2 = [];break;
              }
              console.log(this.referralFileList);
              console.log(this.ghfFileList);
              console.log(this.yymxFileList1);
              console.log(this.yymxFileList2);
              console.log(this.wssmFileList1);
              console.log(this.wssmFileList2);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            },
            initData() {
                this.rb_state = this.$cookie.get("rb_state")
                this.stepChange();
                let data = {
                  "rb_id": this.$cookie.get("rb_id"),
                  "rb_state": this.rb_state
                };
                this.$ajax.post(`/RbSystem/user/getRbForm.do`, data).then(res => {
                    if (res.data.success == "success") {
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
                        this.rb_state = res.data.Data.rb_state;
                        this.$cookie.set("rb_id", this.form.rb_id);
                        this.stepChange();
                    }
                }).catch(res => {
                    this.$notify.error({title: '????'});
                })
            },
            stepChange() {
                switch(this.rb_state) {
                    case 1: this.active = 0; this.seen=false; this.seen1=false; this.seen2=true; break;
                    case 2: this.active = 1; this.seen=false; this.seen1=false; this.seen2=false; break;
                    case 3: this.active = 2; this.seen=false; this.seen1=false; this.seen2=false; break;
                    case 4: this.active = 3; this.seen=true; this.seen1=false; this.seen2=false; break;
                    case 5: this.active = 3; this.seen=true; this.seen1=true; this.seen2=false; break;
                    case 6: this.active = 4; this.seen=true; this.seen1=false; this.seen2=false; break;
                    case 7: this.active = 5; this.seen=true; this.seen1=false; this.seen2=false; break;
                }
            },
            addCard(index) {
                switch (index){
                    case 0: this.form.ghf.push({
                        "department": "",
                        "date": "",
                        "cost":"",
                        "self_paid": "",
                        "note": "",
                        "pic":''
                    });break;
                    case 1: this.form.yymx.push({
                        "date": "",
                        "cost":"",
                        "special_paid": "",
                        "part_paid": "",
                        "self_paid": "",
                        "note": "",
                        "detailed_pic":'',
                        "pspt_pic":''
                    }); break;

                }
            },
            onSubmit(flag){
              console.log(flag);
                this.form.referral.pic = this.referralFileList[0] ? this.referralFileList[0].url : "";

                for (let i = 0; i < this.ghfFileList.length; i++){
                    this.form.ghf[i].pic = this.form.ghf[i][0] ? this.ghfFileList[i][0].url : "";
                }
                for (let i = 0; i < this.yymxFileList1.length; i++){
                      this.form.yymx[i].detailed_pic = this.yymxFileList1[i][0] ? this.yymxFileList1[i][0].url : "";
                      this.form.yymx[i].pspt_pic = this.yymxFileList2[i][0] ? this.yymxFileList2[i][0].url : "";
                }
                this.form.wssm.stamp_pic = this.wssmFileList1[0] ? this.wssmFileList1[0].url : "";
                this.form.wssm.special_pic = this.wssmFileList2[0] ? this.wssmFileList2[0].url : "";

                this.form.active = flag;
                let data = JSON.stringify(this.form);
                this.$ajax.post(`/RbSystem/user/postRbForm.do`,{"rbStr":data}).then(res => {
                    if (res.data.success == "success"){
                        this.$notify.success({title: '提交成功'});
                        this.rb_state = res.data.Data.rb_state;
                        this.form.rb_id = res.data.Data.rb_id;
                        this.$cookie.set("rb_id", this.form.rb_id);
                        this.stepChange();
                    }
                }).catch(res => {
                    this.$notify.error({title: '请刷新重试'});
                })
            },
            onConfirm(active) {
              let data = {
                "rb_id": this.form.rb_id,
                "active": active
              }
              this.$ajax.post(`/RbSystem/user/confirmRbForm.do`,data).then(res => {
                  if (res.data.success == "success"){
                      this.$notify.success({title: '提交成功'});
                      this.rb_state = res.data.Data.rb_state;
                      this.form.rb_id = res.data.Data.rb_id;
                      this.$cookie.set("rb_id", this.form.rb_id);
                      this.stepChange();
                  }
              }).catch(res => {
                  this.$notify.error({title: '请刷新重试'});
              })
            }
        },
        created(){
            this.initData();
        }
    }
</script>