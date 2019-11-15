<template>
    <div >
        <el-card v-if="seen1">
            <el-form >
                <span>转诊单</span>
                <el-form-item label="请选择医院">
                    <el-input v-model="form.name1"></el-input>
                </el-form-item>

                <el-form-item label="请选择时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                 </el-form-item>
               <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">转诊单图片只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            

            <span>医事服务费发票</span>
            <el-form-item label="请选择医院">
                    <el-input v-model="form.name2"></el-input>
                </el-form-item>
                <el-form-item label="请选择科室">
                    <el-input v-model="form.office"></el-input>
                </el-form-item>
                 <el-form-item label="请选择时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                 </el-form-item>
                 <el-form-item label="请输入发票金额">
                    <el-input v-model="form.momey"></el-input>
                </el-form-item>
                 <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">转诊单图片只能上传jpg/png文件，且不超过500kb</div>
                     <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                </el-upload>
            </el-form>
        </el-card> 
        <el-card v-if="seen2">
            <el-form >
                <span>转诊单</span>
                <el-form-item label="请选择医院">
                    <el-input v-model="form.oldname1" disabled></el-input>
                </el-form-item>

                <el-form-item label="请选择时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" ></el-date-picker>
                 </el-form-item>
               <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">转诊单图片只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            

            <span>医事服务费发票</span>
            <el-form-item label="请选择医院">
                    <el-input v-model="form.oldname2" disabled></el-input>
                </el-form-item>
                <el-form-item label="请选择科室">
                    <el-input v-model="form.oldoffice" disabled></el-input>
                </el-form-item>
                 <el-form-item label="请选择时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                 </el-form-item>
                 <el-form-item label="请输入发票金额">
                    <el-input v-model="form.oldmomey" disabled></el-input>
                </el-form-item>
                 <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">转诊单图片只能上传jpg/png文件，且不超过500kb</div>
                     <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                </el-upload>
            </el-form>
        </el-card> 
        <el-card v-if="seen3">
                <div class="demo-image">
  <div class="block" v-for="fit in fits" :key="fit">
    <span class="demonstration">{{ fit }}</span>
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :fit="fit"></el-image>
  </div>
</div>

        </el-card>
        
    </div>
</template>

<script >
    export default{
        name:'scriptList',
        data(){
            return{
                seen1:true,
                seen2:false,
                seen3:false,
                form:{
                    name1:'',
                    name2:'',
                    oldname1:'',
                    oldname2:'',
                    oldoffice:'',
                    oldmomey:'',
                },
                 fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                  
                 
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},{name:'smileface.jpg',url:'C:\Users\lizhiwen\Pictures\Saved Pictures'}]
            }
        },
    methods: {
        submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
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
