<template>
    <div v-loading="loading">
         <p style="text-align: center;font-size:40px">报销系统中的审核人列表</p>
        <el-card v-if="seen">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="index"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              property="userName"
              label="用户名"
              align="center">
            </el-table-column>
            <el-table-column
              property="psd"
              align="center"
              label="密码">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">修改密码</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-card>

        <el-dialog title="修改密码" :visible.sync="addVisible">
          <el-form :model="form" :rules="rules">
            <el-form-item label="原密码" :label-width="formLabelWidth">
              <el-input v-model="form.psd" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input v-model="form.newpsd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" :label-width="formLabelWidth">
              <el-input v-model="form.repeatpsd" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="OnSubmit">确 定</el-button>
          </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'auditManage',
        data() {
              return {
                    seen: true,
                    addVisible: false,
                    tableData: [],
                    loading: true,
                    form: {
                      psd:'',
                      newpsd:'',
                      repeatpsd:''
                    },
                    rulses: {
                      newpsd: [
                        {required: true, message: '请填写密码', trigger: 'blur'}
                      ],
                      repeatpsd: [
                        {required: true, message: '请填写重复密码', trigger: 'blur'}
                      ],
                    }
              }
        },
        methods: {
            initData() {
                this.loading = true;
                this.$ajax.get('./RbSystem/auditManage/getAudit').then(res => {
                    this.loading = false;
                    if(res.data.success === 'success') {
                        this.tableData = res.data.result;

                    } else {
                        this.$notify.error({title: res.data.success});
                    }
                }).catch(res => {
                    this.loading = false;
                    this.$notify.error({title: '请刷新重试'});
                })
            },

            handleEdit(index, row) {
              this.addVisible = true;
              this.form.psd = row.psd;
              this.form.userName = row.userName;
            },

            OnSubmit() {
              if (this.form.newpsd === this.form.repeatpsd) {
                this.$ajax.post('./auditManage/changePsd',this.form).then(res => {
                    if(res.data.success === 'success') {
                        this.$notify.success("修改密码成功");
                        this.initData();
                        this.addVisible=false;
                    } else {
                        this.$notify.error({title: res.data.success});
                    }
                }).catch(res => {
                    this.loading = false;
                    this.$notify.error({title: '请刷新重试'});
                })
              } else {
                this.$notify.error("密码不一致");
              }
            }

        },
        created () {
            this.initData();
        }
    }
</script>