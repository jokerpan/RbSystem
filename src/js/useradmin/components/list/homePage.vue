<template>
    <el-card>
     
    <span>{{ msg }}</span>
     <a :href="webpage">点击这里</a>

    </el-card>
</template> 



<script>
    export default {
        name: 'homePage',
        data() {
              return {
                
                    msg: "",
                    webpage: "useradmin#/list/scriptList",
                    data: {
                      msg:''
                    }
                


                }
                   
                 
              },
        
         methods: {
            initData() {
                this.$ajax.get('/RbSystem/homepage.do').then(res => {
                    if(res.data.success == "success") {
                        switch(res.data.Data.rb_state){
                            case 0:
                            this.msg = "无报销单";break;
                            case 1:
                            this.msg = "已暂存，点击继续编辑";break;
                            case 2:
                            this.msg = "待审核，点击查看信息";break;
                            case 3:
                            this.msg = "正在审核，请等待几分钟后刷新页面";break;
                            case 4:
                            this.msg = "审核通过，点击查看信息";break;
                             case 5:
                            this.msg = "审核未通过，点击查看信息";break;
                             case 6:
                            this.msg = "报销单未报销，点击下载报销单";break;
                        }
                        this.$cookie.set("rb_id", res.data.Data.rb_id);
                        this.$cookie.set("rb_state", res.data.Data.rb_state);

                               
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