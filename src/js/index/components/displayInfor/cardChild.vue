<template>
	<div>
		<div :key="message.cardId"  :data="message">
			<div class="header">
				<span>{{message.cardName?message.cardName:'区块标题文字'}}</span>
				<i class="el-icon-s-tools"
				   style="float: right; padding: 5px 0px 3px 5px; fontSize:16px"
				   @click="editCard(message.cardId)">
				</i>
				<el-popover
					placement="bottom"
					style="float: right; padding: 0px"
					title="标题"
					width="200"
					trigger="click"
					content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
					<el-link slot="reference" type="primary">查看详情</el-link>
				</el-popover>
			</div>

			<!-- 根据children内的数据展现形式标识 render不同的组件 -->
			<p>
			    <div v-if="message.children.mark=='form'">
			 		<div>{{message}}</div>
			    </div>
			    <div v-if="message.children.mark=='table'">
			        <el-table
			        ref="singleTable"
			        :data="message.children.data"
			        style="width: 100%">
			            <el-table-column
			            	type="index"
			            	width="50">
			            </el-table-column>
			            <el-table-column
			            	property="date"
			            	label="日期"
			            	width="120">
			            </el-table-column>
			            <el-table-column
			            	property="name"
			            	label="姓名"
			            	width="120">
			            </el-table-column>
			            <el-table-column
			            	property="address"
			            	label="地址">
			            </el-table-column>
			        </el-table>
			    </div>
			</p>
		</div>
		<!-- 弹框，选择区块内容 -->
		<el-dialog
				title="提示"
				:visible.sync="dialogVisible"
				width="30%"
				>
				<el-form :model="dialogFormData" :rules="rules" ref="dialogFormData" label-width="100px" class="demo-ruleForm">
					<el-form-item label="区块内容" prop="type">
						<el-select v-model="dialogFormData.cardName" placeholder="请选择区块内容">
							<el-option
								v-for="item in options"
								:key="item.cardName"
								:label="item.cardName"
								:value="item.cardName">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
					<el-button @click="resetForm()">取消</el-button>
					<el-button type="primary" @click="submitForm()">确定</el-button>
					</el-form-item>
				</el-form>
		</el-dialog>
	</div>
</template>
<script>
export default {
  name: 'cardChild', //组件命名
	props:["message","tplId"], //接收父组件传输过来的数据
	data() {
		return {
				dialogVisible: false,
				options:[],
				dialogFormData: {
					cardId:'',
					cardName: '',
					mark: ''
				},
				rules: {
					cardName: [
						{ required: true, message: '请选择区块内容', trigger: 'change' }
					]
				}
		}
	},
	created() {
		// console.log(this.data)
	},
  	methods: {
		//更换卡片展示内容函数
		editCard(index){
			this.dialogVisible=true;
			this.dialogFormData.cardId=index;
			// 获取下拉数据
			this.$ajax.get('./display/getSelectCardData',{
				headers:{
					'x-requested-with': 'XMLHttpRequest'
				}
			}).then(res => {
				if(res.data.code === 200) {
					this.options = res.data.result.selectedCardList;
				} else {
					this.$notify.error({title: res.data.msg});
				}
			}).catch(res => {
				this.loading = false;
				this.$notify.error({title: '请刷新重试'});
			})
		},
		//提交弹框数据
		submitForm() {
		  this.$refs.dialogFormData.validate((valid) => {
		    if (valid) {
				//传输给后台的数据  tplID cardId size cardName
				var data={
					"tplId":this.tplId,//假设--未取到
					"cardId":this.dialogFormData.cardId,
					"cardName":this.dialogFormData.cardName,
					"size":this.message.size,
				}

				this.$ajax.post('./display/getTemplate',data,{
              		headers:{
						'x-requested-with': 'XMLHttpRequest'
					}
				}).then(res => {
					if(res.data.code === 200) {
						//将后台返回的整个list数据传输给父组件
						this.$emit("childCarMessage",res.data.result);
						// 清除弹框数据
						this.$nextTick(() => {
							this.$refs['dialogFormData'].resetFields()
						})
						this.dialogVisible=false;
					} else {
						this.$notify.error({title: res.data.msg});
					}
				}).catch(res => {
					this.loading = false;
					this.$notify.error({title: '请刷新重试'});
				})
		    } else {
		      console.log('error submit!!');
		      return false;
		    }
		  });
		},
		//重置弹框内的数据
		resetForm(formName) {
		  this.$nextTick(() => {
		     this.$refs['dialogFormData'].resetFields()
		  })
		},
	}
};
</script>


<style scoped>
 .header{
		height: 40px;
		padding: 10px 15px;
		font-size: 16px;
		margin-bottom: 15px;
		background-color: #f2f2f2;
 }

</style>
