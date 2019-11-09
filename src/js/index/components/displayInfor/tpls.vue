<template>
	<el-card class="box-card">
	  <div slot="header" class="clearfix">
		<span>页面配置</span>
	  </div>
	  <h3>请选择当前页面的布局样式</h3>
	  <div class="tplContainer">
			<div v-for="(item,index) in tplList" :key="item.tplId" class="tpls"  :data="tplList"  @click="selectedTpl(index)"  :class="activeBorderClass == index ? 'activeBorder':''" >
				<div :class="'tpl'+(index+1)">
					<i class="el-icon-success selectBtn" :class="activeFontClass == index ? 'activeFont':''"></i>
				</div>
			</div>
			<div class="btns">
				<el-button type="primary" :plain="true"  @click="selectTplSaveBtn()">保存</el-button>
				<el-button>取消</el-button>
			</div>
	  </div>
	  <el-dialog
	    title="保存成功"
	    :visible.sync="dialogVisible"
	    width="30%"
	    :before-close="handleClose">
		<i class="el-icon-success" style="color: #55A532; font-size: 36px; float: left;"></i>
		<div style="float: left; height: 100px; margin-left: 20px;">
			<p style="font-size: 25px;">新布局保存成功</p>
			<p>可在页面内对区块内容进行配置</p>
		</div>
		<div style="clear: both;"></div>
	    <span slot="footer" class="dialog-footer">
			<el-button type="primary"  @click="submit()">确 定</el-button>
			<el-button @click="dialogVisible = false">取 消</el-button>
	    </span>
	  </el-dialog>
	</el-card>
</template>

<script>
	export default {
	    name: 'tpls',
	    data() {
			return {
				tplList: [
					  {tplId:"0"},
					  {tplId:"1"},
					  {tplId:"2"},
					  {tplId:"3"},
					  {tplId:"4"},
					  {tplId:"5"},
				],
				activeBorderClass: -1,
				activeFontClass:-1,
				tplId:-1,
				dialogVisible:false,
			}
		},
		methods:{
			selectTplSaveBtn(){
				if(this.tplId>0){
					this.dialogVisible = true;
				}else{
					this.$message({
					  message: '请先选择一个模板，在点击保存按钮！',
					  type: 'warning'
					});
				}
			},
			selectedTpl(index){
				this.activeBorderClass = index;
				this.activeFontClass = index;
				this.tplId=index;
			},
			submit(){
				// console.log(this.tplId)
				var tplId={"tplId":this.tplId};
				this.$ajax.post('./display/changeTpl', tplId,{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
					if (res.data.code === 200) {
						this.dialogVisible = false;
						this.$notify.success({
							title: res.data.msg
						});
						this.$router.push("/displayInfor/displayInfor");
					} else {
						this.$notify.error({
							title: res.data.msg
						});
					}
				}).catch(res => {
					this.$message.error('请刷新重试');
				})
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
				  .then(_ => {
					done();
				  })
				  .catch(_ => {});
			}
		}
	}
</script>

<style scoped>

	.tplContainer{
		width: 95%;
		min-height: 700px;
		margin: 50px auto;
	}
	.tpls{
		position: relative;
		width: 30%;
		height: 366px;
		float: left;
		box-shadow:0 0 12px #b9b1b1;
		/* border: 1px solid #ddd; */
		margin-right: 3%;
		margin-bottom: 20px;;
	}
	@media screen and (max-width: 1900px) {
		.tpls{
			height: 270px;
		}
	}
	.selectBtn{
		position: absolute;
		bottom: 0px;
		right: 0px;
		font-size: 45px;
		color: #DCDFE6;
		margin: 10px;
	}
	.tpl1{
		background: url(../../../../assets/tpl1.png) no-repeat;
		background-size:contain;
		background-position: center 0;
		width: 100%;
		height: 80%;
	}
	.tpl2{
		background: url(../../../../assets/tpl2.png) no-repeat;
		background-size:contain;
		background-position: center 0;
		width: 100%;
		height: 80%;
	}
	.tpl3{
		background: url(../../../../assets/tpl3.png) no-repeat;
		background-size:contain;
		background-position: center 0;
		width: 100%;
		height: 80%;
	}
	.tpl4{
		background: url(../../../../assets/tpl4.png) no-repeat;
		background-size:contain;
		background-position: center 0;
		width: 100%;
		height: 80%;
	}
	.tpl5{
		background: url(../../../../assets/tpl5.png) no-repeat;
		background-size:contain;
		background-position: center 0;
		width: 100%;
		height: 80%;
	}
	.tpl6{
		background: url(../../../../assets/tpl6.png) no-repeat;
		background-size:contain;
		background-position: center 0;
		width: 100%;
		height: 80%;
	}
	.btns{
		width: 450px;
		margin: 20px auto;
	}

	.btns>.el-button{
		padding:15px 70px;
		margin-right: 15px;;
	}
	.activeBorder {
		border: 2px solid #409EFF;
	}
	.activeFont{
		color: #409EFF;
	}
</style>
