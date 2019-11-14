<template>
    <div v-loading="loading">
        <el-card>
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">批量下载</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="addScript">新增脚本</el-button>
                </el-form-item>
            </el-form>

        <el-table
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
            <el-table-column
                    property="fileName"
                    label="文件名"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    property="command"
                    label="执行命令"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    property="parameters"
                    align="center"
                    label="参数">
            </el-table-column>
            <el-table-column
                    property="description"
                    align="center"
                    label="描述">
            </el-table-column>
            <el-table-column
                    property="operator"
                    align="center"
                    label="上传人员">
            </el-table-column>
            <el-table-column label="操作" align="center" width="300">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button
                            size="mini"
                            type="success"
                            @click="handleDo(scope.$index, scope.row)">批量执行</el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-card>
        <el-dialog
                :title="title"
                :visible.sync="addVisible"
                width="40%">
            <el-upload
                    :limit="limitNumber"
                    ref="upload"
                    action="./script/addScript"
                    :data="formScript"
                    :auto-upload="false"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    style="margin-bottom: 20px;">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
            <el-form ref="ruleForm" :rules="rules" label-position="left" label-width="80px" :model="formScript">
                <el-form-item label="描述" prop="description">
                    <el-input v-model="formScript.description"></el-input>
                </el-form-item>
                <el-form-item label="命令" prop="command">
                    <el-input v-model="formScript.command"></el-input>
                </el-form-item>
                <el-form-item label="参数" prop="parameters">
                    <el-input v-model="formScript.parameters"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addVisible = false">取 消</el-button>
              <el-button type="primary" @click="upload">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="批量执行"
                :visible.sync="doVisible"
                width="40%">
            <el-select v-model="optionValue" multiple placeholder="可多选">
                <el-option v-for="item in options" :key="item.ip" :label="item.ip" :value="item.ip">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
              <el-button @click="doVisible = false">取 消</el-button>
              <el-button type="primary" @click="doShell">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: 'scriptList',
        data() {
            return {
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
