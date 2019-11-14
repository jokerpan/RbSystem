<template>
  <div class="g-bg">
    <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="80px">
      <el-form-item>
        <h2 class="t-tt" v-if="type === 1">登录</h2>
        <h2 class="t-tt" v-else>注册</h2>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordAgain" v-if="type === 2">
        <el-input v-model="form.passwordAgain" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="40">
          <el-col :span="16">
            <el-button type="primary" @click="toSubmit" style="width: 100%">提 交</el-button>
          </el-col>
          <el-col :span="8">
            <span class="t-cell" v-if="type == 2" @click="type = 1">登 录</span>
            <span class="t-cell" v-else @click="type = 2">注 册</span>
          </el-col>
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
        type: 1,
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
            if (this.type === 2 && this.form.password !== '') {
              this.$refs.form.validateField('passwordAgain');
            }
            callback();
          }
        };
        const validatePasswordAgain = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        const result = {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validatePassword, trigger: 'blur' },
            { min: 6,  message: '密码长度至少6位', trigger: 'blur' }
          ]
        };
        if(this.type === 2) {
          result.passwordAgain =  [
            { required: true, validator: validatePasswordAgain, trigger: 'blur' }
          ]
        }
        return result;
      }
    },
    methods: {
      toSubmit() {
        const url = this.type === 1 ? '/api/user/login' : '/api/user/register';
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$ajax.post(url, {
              userName: this.form.userName,
              password: this.form.password,
            }).then(res => {
              if (res.data.code === 200) {
                this.$cookie.set('user', this.form.userName);
                location.href = '/useradmin';
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
