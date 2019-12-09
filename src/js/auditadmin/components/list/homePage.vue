<template>
    <div >
     
    <div style="color:#00F;font-size: 24px;text-align:center">{{"当前有"+num1+"个报销申请人提出申诉请求,"+num2+"个审核人员提出的重新审核申请"}}</div>
  <div style="color:#000;font-size: 15px;text-align:left;">共有<font color='red'>{{recordnum}}</font>条报销记录</div>
     <br>
     <div style="text-align:center;color:#00F;font-size: 24px;">
     <a :href="webpage"style="text-decoration:underline;color:#F00">点击这里</a>
<div>进行查看</div>
</div>
    </div>

    
</template> 



<script>
    export default {
        name: 'homePage',
        data() {
              return {
                    
                    msg: "",
                    webpage: "auditadmin#/list/reApplyList",
                    num1:"",
                    num2:"",


                }
                   
                 
              },
        
         methods: {
            initData() {
                this.$ajax.get('./RbSystem/homepage.do').then(res => {
                    console.log(res);
                    if(res.data.success == "success") {
                      //  switch(res.data.rb_state){
                           // case 1:
                           
                            this.num1 = res.data.Data.rb_state;
                            this.num2 = res.data.num;
                            //break;
                            // case 2:
                            // this.msg = "已审核，点击查看信息";break;
                            // case 3:
                            // this.msg = " 正在审核，请等待几分钟后刷新页面";break;
                            // case 4:
                            // this.msg = "审核通过，点击查看信息";break;
                            //  case 5:
                            // this.msg = "审核未通过，点击查看信息";break;
                            //  case 6:
                            // this.msg = "报销单未报销，点击下载报销单";break;
                            //  case 7:
                            // this.msg = "未完成报销，点击进行报销单申请";break;
                      //  }

                               
                    } else {
                        this.$notify.error({title: res.data.msg});
                    }
                }).catch(res => {
                    this.$notify.error({title: '请刷新重试'});
                })
            },

          },
          created(){
            this.initData();
          }
        }
</script>