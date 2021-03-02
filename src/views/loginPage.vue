<template>
  <div class="login-page-style">
    <vue-particles
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#FFFFFF"
            :linesWidth="2"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            class="cash login-back-box"
    >
    </vue-particles>
    <div class="login-box">
      <div class="title-box">登  录</div>
      <el-form :model="loginInfo" label-width="80px" class="form-style" :rules="rules" ref="refForm" :hide-required-asterisk="true">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="loginInfo.user_phone" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input v-model="loginInfo.userPassword" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="registerSet">没有登录名？立即注册</el-button>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  data() {
    return {
      loginInfo: {
        user_phone: "",
        userPassword: ""
      },
      rules: {
        user_phone: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["refForm"].validate((valid) => {
        if (valid) {
          this.loginSet();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    loginSet() {
      var url = window.requestUrl + "userInfo/queryLogin";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(this.loginInfo),
        success: res => {
          console.log(res);
          if (res.status === 0) {
            this.$message({
              message: res.msg,
              error: "warning"
            });
          } else if(res.status == 1) {
            var loginData = {
              isLogin: true,
              userId: res.info[0].user_id,
              userName: res.info[0].user_name,
              userInfo: res.info[0].user_info
            };
            this.$message({
              message: res.msg,
              error: "success"
            });
            this.$store.commit("setLoginData", loginData);
            this.$store.commit("setAvatar", res.info[0].user_avatar);
            localStorage.setItem(
              "messageStore",
              JSON.stringify(this.$store.state)
            );
            this.$router.push({
              path: "/homePage"
            });
          }
        },
        error: (err) => {
          console.log(err);
        }
      });

    },

    registerSet() {
      this.$router.push({
        path: "/registerPage"
      });
    }
  }
};
</script>

<style lang="scss">
.login-page-style {
  width: 100%;
  height: 100%;
  background-image: url("../../public/home/homeback.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  .login-back-box {
    width: 100%;
    height: 100%;
  }
  .login-box {
    width: 450px;
    height: 300px;
    position: absolute;
    background-color: rgba(#fff, 0.3);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title-box {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 26px;
      font-weight: bolder;
      color: rgb(99, 180, 255);
    }
    .form-style {
      margin-top: 10px;
      padding: 20px 40px 0 20px;
    }
  }
}
</style>
