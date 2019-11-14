<template>
    <div v-loading="loading">
        <el-card>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="ip">
                <el-input v-model="formInline.ip" placeholder="IP地址"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item style="float:right;">
                <el-button type="primary" icon="el-icon-plus" @click="addServer">新增节点</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="index"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              property="ip"
              label="ip"
              align="center"
              width="250">
            </el-table-column>
            <el-table-column
              property="userName"
              label="用户名"
              align="center">
            </el-table-column>
            <el-table-column
              property="password"
              align="center"
              label="密码">
            </el-table-column>
            <el-table-column
              property="description"
              align="center"
              label="描述">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>


        </el-card>
          <el-dialog
            :title="title"
            :visible.sync="addVisible"
            width="40%">
            <el-form :rules="rules" label-position="left" label-width="80px" ref="ruleform" :model="formServer">
              <el-form-item label="ip" prop="ip">
                <el-input v-model="formServer.ip"></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="formServer.userName"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="formServer.password"></el-input>
              </el-form-item>
              <el-form-item label="描述" prop="description">
              <el-input v-model="formServer.description"></el-input>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitServer">确 定</el-button>
            </span>
          </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'serverList',
        data() {
              function isIP(strIP) {  
                if (strIP === '') return false;  
                var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式  
                if(re.test(strIP))  
                {  
                  if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true;  
                }  
                  return false;  
                }  
              var IP = (rule, value, callback) => {
                if (isIP(value)) {
                  callback();
                } else {
                  callback(new Error('请输入正确ip'));
                }
              };
              return {
                    title:'',
                    formServer: {
                        ip: '',
                        userName: '',
                        password: '',
                        description: ''
                    },
                    addVisible: false,
                    formInline: {
                      ip: ''
                    },
                    tableData: [],
                    loading: true,
                    rules: {
                      ip: [
                        {required: true, validator: IP, trigger: 'blur'}
                      ],
                      userName: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                      ],
                      password: [
                        {required: true, message: '请填写密码', trigger: 'blur'}
                      ],
                      description: [
                        {required: true, message: '请填写描述', trigger: 'blur'}
                      ],
                    }
              }
        },
        methods: {
            initData() {
                this.loading = true;
                this.$ajax.get('./server/getServerList').then(res => {
                    this.loading = false;
                    if(res.data.code === 200) {
                        this.tableData = res.data.result.result;
                    } else {
                        this.$notify.error({title: res.data.msg});
                    }
                }).catch(res => {
                    this.loading = false;
                    this.$notify.error({title: '请刷新重试'});
                })
            },
            addServer() {
                this.title = '添加节点';
                this.addVisible = true;
                this.formServer = {}
            },
            handleEdit(index, row) {
                this.title = '修改节点';
                this.addVisible = true;
                this.formServer = row;
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.get(`./server/deleteServer?ip=${row.ip}`).then(res => {
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
            onSubmit(){
                if (this.formInline.ip != '') {
                    this.$ajax.get(`./server/getServer?ip=${this.formInline.ip}`).then(res => {
                        if(res.data.code === 200) {
                            if (res.data.result === []) {
                                this.$notify.error({title: "未查询到信息"});
                            } else {
                                this.$notify.success({title: res.data.msg});
                                this.tableData = [];
                                this.tableData.push(res.data.result);
                            }
                        } else {
                            this.$notify.error({title: res.data.msg});
                        }
                    }).catch(res => {
                        this.$notify.error({title: '请刷新重试'});
                    })
                } else {
                    this.initData();
                }


            },
            submitServer() {
                if (this.title === '添加节点') {
                    this.$refs["ruleform"].validate((valid) => {
                      if (valid) {
                        this.$ajax.post('./server/addServer',this.formServer).then(res => {
                            if (res.data.code === 200) {
                                this.$notify.success({title: res.data.msg});
                                this.addVisible = false;
                                this.initData();
                            } else {
                                this.$notify.error({title: res.data.msg});
                            }
                        }).catch(res => {
                            this.$notify.error({title: '请刷新重试'});
                        })
                      } else {
                        return false;
                      }
                    })
                } else if (this.title === '修改节点') {
                    this.$notify.error('暂无此操作');
                } else {
                    this.$notify.error('操作错误');
                }
            }

        },
        created () {
            this.initData();
        }
    }
</script>