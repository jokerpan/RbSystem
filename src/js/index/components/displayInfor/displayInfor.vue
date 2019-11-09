<template>
    <div class="container">
        <el-card class="cardContainer">
			<div slot="header" class="clearfix">
				<span>操作页面</span>
				<el-button style="float: right; padding: 3px 0" type="text" @click="changeLayout()">更换布局</el-button>
			</div>
			<!-- 以下只负责页面布局，具体展示内容在cardChild子组件里 -->
			<!-- 模板 1-->
			<div id="container1"  v-if="tplId==0">
				 <div class="line1-box">
						<div class="card card1"  v-for="(item,index) in list[0]" :key="item.id"  :data="list[0]">
								<cardChild v-bind:message="list[0][index]" v-bind:tplId="tplId"   @childCarMessage="getChildCardMessage" ></cardChild>
						</div>
						<div class="card card2">
							<div class="card" :class="'card2'+index"  v-for="(item,index) in list[1]" :key="item.id"  :data="list[1]">
								<cardChild v-bind:message="list[1][index]" @childCarMessage="getChildCardMessage"></cardChild>
							</div>
						</div>
				</div>
				<div class="line2-box">
						<div class="card" :class="'card'+item.id"  v-for="(item,index) in list[2]" :key="item.id"  :data="list[2]">
							<cardChild v-bind:message="list[2][index]" @childCarMessage="getChildCardMessage"></cardChild>
						</div>
				</div>
			</div>
			<!-- 模板2 -->
			<div id="container1"  v-if="tplId==1">
				 <div class="line1-box">
						<div class="card card1"  v-for="(item,index) in list[0]" :key="item.id"  :data="list[0]">
								<cardChild v-bind:message="list[0][index]" @childCarMessage="getChildCardMessage"></cardChild>
						</div>
						<div class="card card2">
							<div  :class="'card2'+index"  v-for="(item,index) in list[1]" :key="item.id"  :data="list[1]">
								<cardChild v-bind:message="list[1][index]" @childCarMessage="getChildCardMessage"></cardChild>
							</div>
						</div>
				</div>
			</div>
		 </el-card>
	</div>
</template>


<script>
import cardChild from './cardChild.vue';
import { dealWithListData } from "../../../../utils/dealWithData.js";
export default {
	components:{cardChild},  //组件化
	name: 'displayInfor',
	data() {
		return {
		  list:[],
		  tplId:-1,
		}
	},
	updated(){

	},
	watch: {
	// 如果 `question` 发生改变，这个函数就会运行
	//   list: function (newQuestion, oldQuestion) {
		// // this.list=this.getChildCardMessage();
		// // console.log(this.list);
		// // console.log(this.getChildCardMessage())
	//   }
	},
	created() {
		this.$ajax.get('./display/getTemplate',{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
		    if (res.data.code === 200) {
		        this.$notify.success({
		            title: res.data.msg
		        });
				this.tplId=res.data.result.tplId;
				this.list = dealWithListData(res.data.result.tplId,res.data.result.list);
		    } else {
		        this.$notify.error({
		            title: res.data.msg
		        });
		    }
		}).catch(res => {
		    this.$message.error('请刷新重试');
		})
	},
	methods: {
		//更换布局
		changeLayout(){
			this.$router.push("/displayInfor/changeTpls");
		},
		//接收子组件传回来的新list，更新this.list刷新页面
		getChildCardMessage(message){
			this.listState=true;
			this.list = dealWithListData(message.tplId,message.list);
		}
	}
};
</script>


<style scoped>
/* 每个模板通用样式 */
.container{
   min-height: 900px;
}

.cardContainer{
   width: 95%;
   margin:0 auto;
}

#container1{
	width: 100%;
	min-height: 600px;
	margin: 0 auto;
}
.item{
  width: 300px;
  height: 50px;
  background-color: #42b983;
  color: #ffffff;
}

.text {
  font-size: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}


</style>
