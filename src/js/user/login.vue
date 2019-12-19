<template>
  <div class="g-bg">
    <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="80px">
      <el-form-item>
        <h2 class="t-tt" v-if="type === 1">登录</h2>
        <h2 class="t-tt" v-else>公费医疗报销系统</h2>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="40">
          <el-col :span="16">
            <el-button type="primary" @click="toSubmit" style="width: 158%">登   录</el-button>
          </el-col>
          <!-- <el-col :span="8">
            <span class="t-cell" v-if="type == 2" @click="type = 1">登 录</span>
          </el-col> -->
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        type: 2,
        form: {
          userName: '',
          password: '',
          passwordAgain: ''
        }
      }
    },
    computed: {
      rules() {
        const validatePassword = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            callback();
          }
        };
        const validateUsername = (rule, value, callback) => {
           // var reg=/^[\u4E00-\u9FA5]{2,4}$/; 
           if (value === '') {
            callback(new Error('请输入用户名'));
          } 
          // else if (reg.test(value)==false) {
          //   callback(new Error('请输入2-4位中文用户名'));
          // } 
          else {
            callback();
          }
        };
        const result = {
          userName: [
            { required: true, validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validatePassword, trigger: 'blur' },
            { min: 6,  message: '密码长度至少6位', trigger: 'blur' }
          ]
        };
        return result;
      }
    },
    methods: {
      toSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$ajax.post("/RbSystem/login.do", {
              id: this.form.userName,
              password: this.form.password,
            }).then(res => {
              if (res.data.success == 'success') {
                this.$cookie.set('level', res.data.Data.level);
                this.$cookie.set('User', res.data.Data.User);
                this.$cookie.set('Department', res.data.Data.Department);
                switch(res.data.Data.level) {
                  case 1:
                    location.href = '/useradmin';break;
                  case 2:
                    location.href = '/auditor';break;
                  case 3:
                    location.href = '/auditadmin';break;
                  case 4:
                    location.href = '/reciever';break;
                  case 5:
                    location.href = '/sysadmin';break;
                  default: break;
                }
                //location.href = '/useradmin';
              } else {
                this.$message.error(res.data.msg);
              }
            }).catch(res => {
              this.$message.error('请重新提交');
            })
          } else {
            return false;
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../less/index";
  .g-bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    padding-top: 25vh;
  .el-form {
    width: 400px;
    background: #fff;
    padding: 15px;
    margin: 0 auto;
  .t-tt {
    color: #606266;
    font-size: 22px;
    text-align: center;
  }
  .t-cell {
    color: #409EFF;
    cursor: pointer;
  }
  }
  }
</style>
