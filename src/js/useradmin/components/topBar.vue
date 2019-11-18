<template>
    <div class="g-top">
        <div class="pull-right">
            <div class="t-msg">
                <el-badge :value="12">
                    <i class="el-icon-bell"></i>
                </el-badge>
            </div>
            <el-dropdown>
                <div class="t-usr">
                    <img src=""/>欢迎
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <div class="m-drop-cell" @click="handleEdit">
                            <i class="el-icon-setting"></i> 个人信息
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <div class="m-drop-cell" @click="handlePsd">
                            <i class="el-icon-delete"></i> 修改密码
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <div class="m-drop-cell" @click="handleExit">
                            <i class="el-icon-delete"></i> 退出
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog title="个人信息修改" :visible.sync="visible">
          <el-form :model="form">
            <el-form-item label="姓名" label-width="120px">
              <el-input v-model="form.user.name" autocomplete="off" disabled></el-input>
            </el-form-item>
           <el-form-item label="性别" label-width="120px">
              <el-input v-model="form.user.gender" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="身份证号" label-width="120px">
              <el-input v-model="form.user.idCard" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="部门" label-width="120px">
              <el-input v-model="form.depart.name" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系电话" label-width="120px">
              <el-input v-model="form.user.telephone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" label-width="120px">
              <el-input v-model="form.user.type" autocomplete="off" disabled></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="changeTel">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="密码修改" :visible.sync="visible1">
          <el-form :model="form1">
            <el-form-item label="原密码" label-width="150px">
              <el-input type="password" v-model="form.psd" autocomplete="off"></el-input>
            </el-form-item>
           <el-form-item label="新密码" label-width="150px">
              <el-input type="password" v-model="form.newpsd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码" label-width="150px">
              <el-input type="password" v-model="form.repeatpsd" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="visible1 = false">取 消</el-button>
            <el-button type="primary" @click="changePsd">确 定</el-button>
          </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'topBar',
        data() {
            return {
                visible: false,
                visible1: false,
                form: {
                    "user": {
                        "name": "",
                        "id": "",
                        "gender": "",
                        "idCard": "",
                        "register_time": "",
                        "telephone": "",
                        "type":""
                    },
                    "depart": {
                        "id": "",
                        "name": ""
                    }
                    
                },
                form1 :{
                    "psd": '',
                    "newpsd": '',
                    "repeatpsd": ''
                }
            }
        },
        methods: {
            handleExit() {
                window.location.href = './user';
            },
            handleEdit() {
                this.visible = true;
                this.form.user = JSON.parse(this.$cookie.get('User'));
                this.form.depart = JSON.parse(this.$cookie.get('Department'));
            },
            changeTel() {
                this.$ajax.post('/rbsystem/user/changTel.do',{"id": this.form.user.id, "tel": this.form.user.telephone}).then(res => {
                    if (res.data.success == 'success') {
                        this.$message.success("修改电话号码成功");
                        this.$cookie.set("User", this.form.user);
                        this.visible = false;
                    } else {
                        this.$message.error("修改失败，请重试");
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },
            handlePsd() {
                this.visible1 = true;
            },
            changePsd() {
                this.$ajax.post('/rbsystem/user/changPsd.do',{"id": this.form.user.id, ... this.form1}).then(res => {
                    if (res.data.success == 'success') {
                        this.$message.success("修改密码成功");
                        this.visible = false;
                    } else {
                        this.$message.error("修改失败，请重试");
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            }

        }
    }
</script>

<style lang="less">
  .g-top {
    width: 100%;
    height: 60px;
    color: rgba(0, 0, 0, .65);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    padding: 0 25px;
  .pull-right {
    cursor: pointer;
    float: right;
    display: flex;
    align-items: center;
  .t-msg {
    line-height: 24px;
    font-size: 24px;
    margin: 18px 30px;
    display: inline-block;
  }
  .t-usr {
    height: 24px;
    line-height: 24px;
    cursor: pointer;
  img {
    width: 24px;
    vertical-align: middle;
    margin-right: 8px;
  }
  }
  }
  }
  .m-drop-cell {
    font-size: 16px;
    padding: 0 10px;
  i {
    margin-right: 10px;
  }
  }
</style>
