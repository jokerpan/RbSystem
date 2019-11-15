<template>
    <div >
        <el-card v-if="seen">
            <el-form >
                <span>转诊单</span>
                <el-form-item>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="活动时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                 </el-form-item>
               
            </el-form>

        </el-card> 
    </div>
</template>

<script >
    export default{
        name:'scriptList',
        data(){
            return{
                seen:true,
                form:{
                    name:'',
                }
            }
        },
    }


</script>>
<!--<script>

    export default {
        name: 'scriptList',
        data() {
            return {
                seen:true,
                chooseShell: '',
                activeTab: 100,
                optionValue: '',
                options: [],
                limitNumber: 1,
                title:'',
                formScript: {
                    command: '',
                    parameters: '',
                    description: ''
                },
                addVisible: false,
                doVisible:false,
                tableData: [],
                fileList: [{
                    name:'',
                    url:''
                }],
                multipleSelection: [],
                loading: true,
                rules: {
                    description: [
                        {required: true, message: '请输入描述', trigger: 'blur' }
                    ],
                    parameters: [
                        {required: true, message: '请输入参数', trigger: 'blur' }
                    ],
                    command: [
                        {required: true, message: '请输入指令', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            initData() {
            	this.loading = true;
                this.$ajax.get('./script/getScriptList').then(res => {
                	this.loading = false;
                    if(res.data.code === 200) {
                        this.tableData = res.data.result.result;
                    } else {
                        this.$notify.error({title: res.data.msg});
                    }
                }).catch(res => {
                	this.loading = false;
                    this.$notify.error({title: '请刷新重试'});
                });

                this.$ajax.get('./server/getServerList').then(res => {
                    if(res.data.code === 200) {
                        this.options = res.data.result.result;
                    } else {
                        this.$notify.error({title: res.data.msg});
                    }
                }).catch(res => {
                    this.$notify.error({title: '请刷新重试'});
                })
            },
            handleSelectionChange(val) {
           		this.multipleSelection = val.map(item => item.fileName);
            },
            addScript() {
                this.title = '添加脚本';
                this.addVisible = true;
                this.formScript = {}
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.get(`./script/deleteScript?fileName=${row.fileName}`).then(res => {
                        if(res.data.code === 200) {
                            this.$notify.success({title: res.data.msg});
                            this.initData();
                        } else {
                            this.$notify.error({title: res.data.msg});
                        }
                    }).catch(res => {
                        this.$notify.error({title: '请刷新重试'});
                    })
                }).catch(() => {
                    this.$notify({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            upload(){
            	this.$refs["ruleForm"].validate((valid) => {
            		if (valid) {
		                this.$refs.upload.submit();
		                this.addVisible = false;
	            	} else {
	            		this.$notify.error({title: '请按要求填写'});
	            	}
            	}
            )
            },
            onSubmit() {
                if (this.multipleSelection.length != 0) {
                    window.open(`./script/downloadScript?fileName=${this.multipleSelection.toString()}`);
                } else {
                    this.$notify.error({title: '请选择脚本'});
                }
            },
            handleDo(index, row) {
                this.doVisible = true;
                this.chooseShell = row.fileName;
            },
            doShell() {
            	this.loading = true;
                this.$ajax.get(`./script/execScript?fileName=${this.chooseShell}&servers=${this.optionValue}`).then(res => {
                	this.loading = false;
                    if(res.data.code === 200) {
                        for (let p in res.data.result.cmdresult) {
                            this.$notify({
                              title: p,
                              message: res.data.result.cmdresult[p],
                              type: 'success',
                              duration: 0
                            });
                        }
                        this.doVisible = false;
                    } else {
                        this.$notify.error({title: res.data.msg});
                    }
                }).catch(res => {
                	this.loading = false;
                    this.$notify.error({title: '请刷新重试'});
                })
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
        created() {
            this.initData();
        }
    }
</script>
-->
