<template>
  <div class="register-page-style">
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
    <div class="register-box">
      <div class="title-box">注 册</div>
      <el-form
        class="form-style"
        ref="registerForm"
        label-position="left"
        status-icon
        :rules="formRules"
        :model="userInfo"
        :hide-required-asterisk="true"
      >
        <el-form-item label="" prop="userName">
          <el-input v-model="userInfo.userName" placeholder="请为自己选一个有个性的用户名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="userPhone">
          <el-input v-model="userInfo.userPhone" placeholder="请输入正确手机号"></el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <el-input v-model="userInfo.code" placeholder="请输入验证码" style="width: 190px" class="input-code"></el-input>
          <verify-set :identifyCode="userCode" class="input-code" style="height: 40px" :contentWidth="160"></verify-set>
          <el-button type="text" @click="changeCode(4)">换一张</el-button>
        </el-form-item>
        <el-form-item label="" prop="userPassword">
          <el-input type="password" v-model="userInfo.userPassword" placeholder="请为自己设置一个密码"></el-input>
        </el-form-item>
        <el-form-item label="" prop="userNewWord">
          <el-input type="password" v-model="userInfo.userNewWord" placeholder="请再次确认密码"></el-input>
        </el-form-item>
        <el-form-item label="" prop="userInfo">
          <el-input v-model="userInfo.userInfo" placeholder="请简单介绍一下自己，例如：一个程序员"></el-input>
        </el-form-item>
        <el-form-item label="">
          <g-button-aylen color="warning" class="register-button cursor-pointer" @click.native="reLogin">已有帐号，返回登陆</g-button-aylen>
          <el-button type="primary" class="button-set" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import VerifySet from "../components/VerifySet";
export default {
  name: "registerPage",
  components:{ VerifySet },
  data() {
    var validateCode = (rule, value, callback) => {
      if (value === this.userCode) {
        callback();
      } else {
        callback(new Error("请输入正确验证码"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userInfo.userNewWord !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userInfo.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userCode: "4568",
      userInfo: {
        userName: "",
        userPhone: "",
        code: "",
        userPassword: "",
        userNewWord: "",
        userInfo: ""
      },
      formRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^1(\d){10}$/, message: "请输入正确手机号", trigger: "blur"}
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ],
        userPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        userNewWord: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        userInfo: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    changeCode(num) {
      var result = "";
      var str = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f"
      ];
      for (var i = 0; i < num; i++) {
        var number = Math.floor(Math.random() * 16);
        result += str[number];
      }
      this.userCode = result;
    },

    reLogin() {
      console.log("sas")
      this.$router.push({
        path: "/loginPage"
      });
    },

    register() {
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          this.reqRegister();
        } else {
          return false;
        }
      });
    },

    reqRegister() {
      var url = window.requestUrl + "userInfo/add";
      this.$post(url, {
        user_name: this.userInfo.userName,
        user_password: this.userInfo.userPassword,
        user_info: this.userInfo.userInfo,
        user_phone: this.userInfo.userPhone,
      })
        .then(res => {
          if (res.status) {
            this.$message.success(res.info);
            this.$router.push({
              path: "/loginPage"
            });
          } else {
            this.$message.warning(res.info);
            this.$refs.registerForm.resetFields();
          }
        });
    }
  },
  created() {
    this.changeCode(4);
  }
};
</script>

<style lang="scss">
.register-page-style {
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
  .register-box {
    width: 500px;
    height: 600px;
    position: absolute;
    background-color: rgba(#fff, 0.3);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .title-box {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 26px;
    font-weight: bolder;
    color: rgb(99, 180, 255);
  }
  .el-form-item__label {
    color: #63b4ff;
  }
  .el-form-item__content .el-input__inner {
    border: 0;
    box-shadow: 0 0 5px #63b4ff;
    background-color: rgba(#fff, 0.6);
  }
  .el-form-item__content {
    display: flex;
    align-items: center;
  }
  .form-style {
    margin-top: 10px;
    padding: 20px 40px 0 20px;
  }
  .verify-code {
    float: right;
    width: 160px !important;
    height: 40px !important;
    line-height: 40px !important;
  }
  .verify-code-area {
    float: left;
    width: 160px !important;
    .verify-input-area {
      width: 80%;
    }
    .verify-change-area {
      display: none;
    }
  }
  .input-code {
    float: left;
    margin-right: 15px;
  }
  .register-button {
    margin-right: 30px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .button-set {
    color: #fff;
    height: 35px;
    line-height: 35px;
    padding: 0 15px;
    text-align: center;
    box-shadow: 0 0 5px #8590a6;
  }


}
</style>
