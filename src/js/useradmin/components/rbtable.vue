<template>
    <div>
        <el-card >
          <div id="printDiv">
          <el-row style="width:100%">
            <el-col :span="20" style="font-size: 20px;">
              <el-row>
                <el-col :span="6">报销号</el-col>
                <el-col :span="6">{{form.rb_id}} </el-col>
                <el-col :span="6">报帐号</el-col>
                <el-col :span="6">{{form.u_id}} </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">姓名</el-col>
                <el-col :span="6">{{form.u_name}} </el-col>
                <el-col :span="6">类别</el-col>
                <el-col :span="6">{{form.u_type}} </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">部门</el-col>
                <el-col :span="6">{{form.u_department}} </el-col>
                <el-col :span="6">日期</el-col>
                <el-col :span="6">{{form.c_time}} </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <div id="qrcode"></div>
            </el-col>
          </el-row>
          <table width="100%"  border="1"  style="font-size: 16px;">
            <tr>
              <td>医师服务费申报金额</td>
              <td>{{form.ghf.total_cost}}</td>
              <td>自付比例</td>
              <td>{{form.ghf.self_pro}}</td>
            </tr>
            <tr>
              <td>凭证数量</td>
              <td>{{form.ghf.count}}</td>
              <td>自付金额</td>
              <td>{{form.ghf.self_paid}}</td>
            </tr>
            <tr>
              <td>医药费申报金额</td>
              <td>{{form.yymx.total_cost}}</td>
              <td>自付比例</td>
              <td>{{form.yymx.self_paid}}</td>
            </tr>
            <tr>
              <td>凭证数量</td>
              <td>{{form.yymx.count}}</td>
              <td>自付金额</td>
              <td>{{form.yymx.self_paid}}</td>
            </tr>
            <tr>
              <td>就诊医院</td>
              <td>{{form.hospital}}</td>
              <td>总自付金额</td>
              <td>{{form.total_self_paid}}</td>
            </tr>
            <tr>
              <td>总申报费用</td>
              <td>{{form.total_cost}}</td>
              <td>总报销金额</td>
              <td>{{form.yymx.total_cost-form.total_self_paid}}</td>
            </tr>
          </table>
        </div>
        </el-card>
        <el-button type="primary" v-print="'#printDiv'">打印报销单</el-button>
        <el-button type="primary" @click="getPdf">下载报销单</el-button>
    </div>
</template>

<script>
    import QRCode  from "qrcodejs2"
    import html2Canvas from 'html2canvas'
    import JsPDF from 'jspdf'
    export default {
        name: 'rbtable',
        data() {
              return {
                form:{
                  "QRCode": '',
                  "rb_id": '',
                  "u_id": '',
                  "u_name": '',
                  "u_type": '',
                  "hospital": "",
                  "c_time":"",
                  "u_department":"",
                  "total_cost":"",
                  "total_self_paid":"",
                  "ghf": {
                      "total_cost":"",
                      "self_paid":"",
                      "self_pro":"",
                      "count":""
                  },
                  "yymx": {
                      "total_cost":"",
                      "self_paid":"",
                      "self_pro":"",
                      "count":""
                  }
                }
              }
        },
        components: { QRCode },
        methods: {
            initData() {
                this.$ajax.post('/RbSystem/user/getQR.do',{"rb_id": this.$cookie.get("rb_id")}).then(res => {
                    if(res.data.success === "success") {
                        this.form=res.data.Data;
                        this.$nextTick(()=>this.qrcode());
                    } else {
                        this.$notify.error({title: res.data.msg});
                    }
                }).catch(res => {
                    this.$notify.error({title: res});
                    console.log(res)
                })
            },
            qrcode () {
                let that = this;
                let qrcode = new QRCode('qrcode', {
                    width: 80,
                    height: 80,        // 高度
                    text:  this.form.QRCode,   // 二维码内容
                    // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f',   // 背景色
                    // foreground: '#ff0'    // 前景色
                })
            },
            getPdf() {
            var title = "报销单"
            html2Canvas(document.querySelector('#printDiv'), {
              allowTaint: true
            }).then(function (canvas) {
              let contentWidth = canvas.width
              let contentHeight = canvas.height
              let pageHeight = contentWidth / 592.28 * 841.89
              let leftHeight = contentHeight
              let position = 0
              let imgWidth = 595.28
              let imgHeight = 592.28 / contentWidth * contentHeight
              let pageData = canvas.toDataURL('image/jpeg', 1.0)
              let PDF = new JsPDF('', 'pt', 'a4')
              if (leftHeight < pageHeight) {
                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
              } else {
                while (leftHeight > 0) {
                  PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                  leftHeight -= pageHeight
                  position -= 841.89
                  if (leftHeight > 0) {
                    PDF.addPage()
                  }
                }
              }
              PDF.save(title + '.pdf')
            }
            )
        }

        },
        mounted () {
            this.initData();
        }
    }
</script>