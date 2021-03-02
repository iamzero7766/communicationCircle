<template>
  <div class="basic-information-box">
    <div class="title-box">
      基本信息
    </div>
    <el-form :model="userInfo" label-position="top" class="form-style">
      <el-form-item label="密码">
        <span>已设置</span>
        <el-button
          type="text"
          class="text-button"
          @click="visiblePassword = true"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="用户名">
        <span>{{ userInfo.user_name }}</span>
        <el-button type="text" class="text-button" @click="showVisibleName"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="手机号">
        <span>{{ userInfo.user_phone }}</span>
      </el-form-item>
      <el-form-item label="基本介绍">
        <span>{{ userInfo.user_info }}</span>
        <el-button type="text" class="text-button" @click="showVisibleDiscuss"
          >修改</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog
      title="修改密码"
      :visible.sync="visiblePassword"
      width="300"
      class="dialog-style"
    >
      <el-form
        :model="passwordInfo"
        label-position="top"
        class="dialog-form"
        :rules="passwordRules"
        hide-required-asterisk
        ref="passForm"
      >
        <el-form-item label="请输入旧密码" prop="oldPassword">
          <el-input
            show-password
            size="small"
            v-model="passwordInfo.oldPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="newPassword">
          <el-input
            show-password
            size="small"
            v-model="passwordInfo.newPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次确认新密码" prop="surePassword">
          <el-input
            show-password
            size="small"
            v-model="passwordInfo.surePassword"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button @click="visiblePassword = false" size="small">
          取消
        </el-button>
        <el-button @click="changePassword" type="primary" size="small">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改用户名"
      :visible.sync="visibleName"
      width="300"
      class="dialog-style"
    >
      <el-form
        :model="dialogUserInfo"
        label-position="top"
        class="dialog-form"
        :rules="userInfoRules"
        hide-required-asterisk
        ref="userForm"
      >
        <el-form-item label="请输入用户名" prop="name">
          <el-input
            size="small"
            v-model="dialogUserInfo.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button @click="visibleName = false" size="small">
          取消
        </el-button>
        <el-button @click="changeUserName" type="primary" size="small">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改用户名"
      :visible.sync="visibleDiscuss"
      width="300"
      class="dialog-style"
    >
      <el-form
        :model="userDiscuss"
        label-position="top"
        class="dialog-form"
        :rules="discussRules"
        hide-required-asterisk
        ref="discussForm"
      >
        <el-form-item label="请输入基本信息" prop="info">
          <el-input
                  size="small"
                  v-model="userDiscuss.info"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button @click="visibleDiscuss = false" size="small">
          取消
        </el-button>
        <el-button @click="changeInfo" type="primary" size="small">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BasicInformation",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordInfo.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user_id: this.$store.state.loginData.userId,
      userInfo: {},
      visiblePassword: false,
      visibleName: false,
      visibleDiscuss: false,
      passwordInfo: {
        oldPassword: "",
        newPassword: "",
        surePassword: ""
      },
      passwordRules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        surePassword: [{ validator: validatePass, trigger: "blur" }]
      },
      dialogUserInfo: {
        name: ""
      },
      userInfoRules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ]
      },
      userDiscuss: {
        info: ""
      },
      discussRules: {
        info: [
          { required: true, message: "基本信息不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {

    setState(info) {
      var loginData = {
        isLogin: true,
        userId: info.user_id,
        userName: info.user_name,
        userInfo: info.user_info,
      };
      this.$store.commit("setLoginData", loginData);
    },
    getInfo() {
      var url = window.requestUrl + "userInfo/queryById";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          user_id: this.user_id
        }),
        success: res => {
          console.log(res);
          this.userInfo = res.info[0];
          this.setState(res.info[0]);
        },
        error: err => {
          console.log(err);
        }
      });
    },

    // 修改密码
    changePassword() {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          this.checkPassword();
        } else {
          return false;
        }
      });
    },
    checkPassword() {
      var url = window.requestUrl + "userInfo/checkPassword";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          user_id: this.user_id,
          userPassword: this.passwordInfo.oldPassword
        }),
        success: res => {
          console.log(res);
          if (!res.status) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          } else {
            this.updatePassword();
          }
        },
        error: err => {
          console.log(err);
        }
      });
    },
    updatePassword() {
      var url = window.requestUrl + "userInfo/updatePassword";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          user_id: this.user_id,
          newPassword: this.passwordInfo.newPassword
        }),
        success: res => {
          console.log(res);
          if (res.status) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.visiblePassword = false;
          }
        },
        error: err => {
          console.log(err);
        }
      });
    },

    // 修改用户名
    showVisibleName() {
      this.visibleName = true;
      this.dialogUserInfo.name = this.userInfo.user_name;
    },
    changeUserName() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.updateName();
        } else {
          return false;
        }
      });
    },
    updateName() {
      var url = window.requestUrl + "userInfo/updateName";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          user_id: this.user_id,
          user_name: this.dialogUserInfo.name
        }),
        success: res => {
          console.log(res);
          if (res.status) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.visibleName = false;
            this.getInfo();
          }
        },
        error: err => {
          console.log(err);
        }
      });
    },

    // 修改基本信息
    showVisibleDiscuss() {
      this.visibleDiscuss = true;
      this.userDiscuss.info = this.userInfo.user_info;
    },
    changeInfo() {
      this.$refs.discussForm.validate(valid => {
        if (valid) {
          this.updateInfo();
        } else {
          return false;
        }
      });
    },
    updateInfo() {
      var url = window.requestUrl + "userInfo/updateInfo";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          user_id: this.user_id,
          user_info: this.userDiscuss.info
        }),
        success: res => {
          console.log(res);
          if (res.status) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.visibleDiscuss = false;
            this.getInfo();
          }
        },
        error: err => {
          console.log(err);
        }
      });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="scss">
.basic-information-box {
  width: 600px;
  height: 800px;
  box-sizing: border-box;
  padding: 15px;
  .title-box {
    width: 100%;
    height: 60px;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
  }
  .form-style {
    margin-top: 15px;
    .el-form-item {
      border-bottom: 1px solid #ddd;
    }
    .el-form-item__label {
      font-size: 16px;
      font-weight: bold;
    }
    .el-form-item__content {
      color: #666666;
      box-sizing: border-box;
      padding: 0 15px;
    }
    .text-button {
      float: right;
    }
  }
  .dialog-style {
    .el-dialog {
      width: 450px;
    }
    .el-dialog__body {
      padding: 15px 20px;
    }
    .el-form-item__label {
      padding: 0;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .button-box {
      text-align: center;
    }
  }
}
</style>
