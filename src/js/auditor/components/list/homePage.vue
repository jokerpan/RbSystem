<template>
  <div >

     <p style="color:#00F;font-size: 20px;text-align:center">{{ msg }}</p>

     <div style="text-align:center">
     <a :href="webpage" style="display: inline-block;color:#F00;font-size: 30px;;text-decoration:underline">点击这里</a>
     <p style="color:#00F;font-size: 20px;text-align:center">查看审核结果</p>
     </div>
    
  </div>
</template> 



<script>
    export default {
        name: 'homePage',
        data() {
              return {
                
                    msg: "",
                    webpage: "auditor#/list/alreadyAudit"
                


                }
                   
                 
              },
        
         methods: {
            initData() {
                this.$ajax.get('/auditor/homepage.do').then(res => {
                    console.log(res);
                    if(res.data.success == "success") {
                        switch(res.data.rb_state){
                            case 1:
                            this.msg = "您当前提交的重新审核申请已批准";break;
                            case 2:
                            this.msg = "已审核，点击查看信息";break;
                            case 3:
                            this.msg = " 正在审核，请等待几分钟后刷新页面";break;
                            // case 4:
                            // this.msg = "审核通过，点击查看信息";break;
                            //  case 5:
                            // this.msg = "审核未通过，点击查看信息";break;
                            //  case 6:
                            // this.msg = "报销单未报销，点击下载报销单";break;
                            //  case 7:
                            // this.msg = "未完成报销，点击进行报销单申请";break;
                        }

                               
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