<template>
    <div v-loading="loading">
         <p style="text-align: center;font-size:40px">报销系统中的审核人列表</p>
        <el-card v-if="seen">
        <el-button type="primary"
                  size="large"
                  @click="addAdmin(1)">添加审核人</el-button>
         
        <!--       <el-dialog title="新建审核人" :visible.sync="addVisible1">
          <el-form :model="form1" :rules="rules">
            <el-form-item label="审核人员id" :label-width="formLabelWidth">
              <el-input v-model="form1.id" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="审核新密码" :label-width="formLabelWidth">
              <el-input v-model="form1.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" :label-width="formLabelWidth">
              <el-input v-model="form1.repeatpsd" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="OnSubmit1">确 定</el-button>
          </div>
        </el-dialog> -->
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="index"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              property="id"
              label="审核员ID"
              align="center">
            </el-table-column>
            <el-table-column
              property="password"
              align="center"
              label="密码">
            </el-table-column>
             <el-table-column
              property="level"
              label="审核员级别"
              align="center">
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
         
            <el-dialog title="新建审核人" :visible.sync="addVisible1">
          <el-form :model="form1" :rules="rules">
            <el-form-item label="审核人员id" :label-width="formLabelWidth">
              <el-input v-model="form1.id" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="审核新密码" :label-width="formLabelWidth">
              <el-input v-model="form1.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" :label-width="formLabelWidth">
              <el-input v-model="form1.repeatpsd" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="OnSubmit1">确 定</el-button>
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
                    addVisible1: false,
                    tableData: [],
                    loading: true,
                    form: {
                      psd:'',
                      newpsd:'',
                      repeatpsd:''
                    },
                     form1: {
                      id:'',
                      password:'',
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
                this.$ajax.get('./RbSystem/admin/getEList.do').then(res => {
                    this.loading = false;
                    if(res.data.success === 'success') {
                        this.tableData = res.data.Data.EList;

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
              this.form.psd = row.password;
              this.form.id = row.id;
            },
            addAdmin(){
              this.addVisible1 =true;
            },
             OnSubmit1() {
              if (this.form1.password === this.form1.repeatpsd) {
                let admin={
                     "id":this.form1.id,
                     "password":this.form1.password
                }
                this.$ajax.post('./RbSystem/admin/addAdmin.do',admin).then(res => {
                    if(res.data.success === 'success') {
                      this.$notify.success("增加审核人成功");
                        this.initData();
                        this.addVisible1=false;
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
            },
            OnSubmit() {
              if (this.form.newpsd === this.form.repeatpsd) {
                let admin={
                     "id":this.form.id,
                     "password":this.form.newpsd
                }
                this.$ajax.post('./RbSystem/admin/updateAdmin.do',admin).then(res => {
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