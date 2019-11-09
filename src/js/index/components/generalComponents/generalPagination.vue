<!-- 通用分页组件 -->
<template>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="message.curr"
          :page-sizes="[5,10,15]"
          :page-size="message.size"
          layout="total, sizes, prev, pager, next"
          :total="message.total">
       </el-pagination>
</template>

<script>
export default {
  name: 'pagination', //组件命名
  props:["message","urls"], //接收父组件传输过来的数据
  data() {
      return {
        flag:false,
      };
  },
  created () {

  },
  methods: {
   //每页显示多少条
   handleSizeChange(val) {
      this.message.size = val;
      this.message.curr = 1,
      this.handleCurrentChange();
   },

   //页码的变化
   handleCurrentChange(val) {
      console.log(val)
      this.message.curr = val?val:this.message.curr;
      this.$emit("paginationMessage",this.message);
      console.log(this.message);

      // this.$ajax.post(this.urls,this.message).then(res => {
      // 		if(res.data.status === 200) {
      // 				//将后台返回的数据传输给父组件
      // 				this.$emit("paginationMessage",res.data.content.list);
      // 		} else {
      // 				this.$notify.error({title: res.data.message});
      // 		}
      // }).catch(res => {
      // 		this.loading = false;
      // 		this.$notify.error({title: '请刷新重试'});
      // })
   },

  }
}

</script>

<style>
   .el-pagination{
      margin-top: 12px;
      padding: 0px;
   }
</style>
