<template>
  <div>
    <h3>用户登录</h3>
    <div v-if="emailLogin">
      <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon

          label-width="100px"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"/>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
          >提交
          </el-button
          >
          <el-button type="" @click="current">获取用户实例</el-button>

        </el-form-item>
      </el-form>
    </div>
    <div v-if="phoneNumberLogin">
      <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon

          label-width="100px"
      >

          <el-form-item label="手机号" prop="phoneNumber">
            <el-input v-model="ruleFormPhone.phoneNumber" style="width: 80%;" />
            <el-button type="primary" @click="_sendPhoneCode" style="width: 20%;">获取验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="ruleFormPhone.phoneCode"/>
          </el-form-item >
          <el-form-item label="密码">
            <el-input v-model="ruleFormPhone.password"/>
          </el-form-item>
          <el-form-item>
            <el-button type="" @click="submitFormPhone('ruleForm')"
            >注册
            </el-button
            >
            <el-button type="primary" @click="submitFormPhone('ruleForm')"
            >登录
            </el-button
            >
            <el-button type="" @click="current">获取用户实例</el-button>

          </el-form-item>
      </el-form>
    </div>
    <div v-if="weChartLogin">
        <el-button type="primary" @click="submitFormWeChart">微信登录</el-button>
    </div>
    <!--    <LoginState v-slot="{ loginState, loading }">-->
    <!--      <p>{{ loading ? '加载中' : (loginState ? '已登录' : '没登录') }}</p>-->
    <!--    </LoginState>-->
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      emailLogin: false,
      phoneNumberLogin: false,
      weChartLogin: true,
      ruleFormPhone: {
        phoneNumber: '',
        phoneCode: '',
        password: ''
      },
      ruleForm: {
        email: '',
        pass: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const email = this.ruleForm.email
          const password = this.ruleForm.pass
          console.log(email)
          console.log(password)
          this.$cloudbase
              .auth({ persistence: 'local' })
              .signInWithEmailAndPassword(email, password)
              .then((loginState) => {
                // 邮箱密码登录成功
                console.log(loginState)
              }).catch(err => {console.log(err)})
        }
      })
    },
    submitFormPhone(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const phoneNumber = this.ruleFormPhone.phoneNumber
          const phoneCode = this.ruleFormPhone.phoneCode
          const password = this.ruleFormPhone
          this.$cloudbase.auth({persistence: 'local'})
              .signUpWithPhoneCode(phoneNumber, phoneCode, password)
              .then(() => {

              })
        }
      })
    },
    submitFormWeChart() {
      const provider = this.$cloudbase.auth().weixinAuthProvider({
        appid: 'wxbcd02ba637b465dc',
        scope: 'snsapi_userinfo'
      })
      provider.signInWithRedirect().then((res) => {
        console.log('signInWithRedirect', res)
        this.getRedirectResult(provider)
      })
    },
    getRedirectResult(provider) {
      provider.getRedirectResult().then(loginState => {
        console.log('loginState', loginState)
      }).catch(err => {console.log(err)})
    },
    current () {
      // this.$cloudbase.auth().getCurrenUser().then(user => {
      //   console.log(user)
      // })
      console.log(this.$cloudbase.auth().currentUser)
    },
    _sendPhoneCode() {
      const phoneNumber = this.ruleFormPhone.phoneNumber
      this.$cloudbase.auth().sendPhoneCode(phoneNumber).then((res) => {
        console.log(res)
        this.$message.success('发送成功')
      }).catch(() => {this.$message.warning('请稍后重试')})
    }
  },
}
</script>

<style scoped>

</style>
