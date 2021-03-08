<template>
  <div class="my-homepage-style">
    <div class="top-part-box">
      <div class="home-back">
        <el-image
          :src="userInfo.user_back"
          fit="cover"
          class="img-style"
        ></el-image>
        <el-upload
          class="upload-demo"
          :action="backUrl"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :multiple="false"
          :limit="1"
          :file-list="fileList"
          v-show="user_id == myID"
        >
          <el-button size="small" class="upload-button" icon="el-icon-camera">点击上传</el-button>
        </el-upload>
      </div>
      <div class="info-box">
        <div class="text-style">{{ userInfo.user_name }}</div>
        <div class="text-small-style">一句话简介：{{ userInfo.user_info }}</div>
      </div>
      <div class="avatar-box">
        <el-image
          :src="userInfo.user_avatar"
          fit="cover"
          class="avatar-style"
        ></el-image>
        <el-upload
          class="upload-avatar"
          :action="avatarUrl"
          :show-file-list="false"
          :on-success="uploadSuccessAvatar"
          :multiple="false"
          :limit="1"
          :file-list="fileList"
          v-show="user_id == myID"
        >
          <el-button size="small" class="upload-button" icon="el-icon-camera">点击上传</el-button>
        </el-upload>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName" class="tab-box">
        <el-tab-pane label="提问" name="1"></el-tab-pane>
        <el-tab-pane label="回答" name="2"></el-tab-pane>
        <el-tab-pane label="关注" name="3"></el-tab-pane>
        <el-tab-pane label="文章" name="4"></el-tab-pane>
<!--        <el-tab-pane label="收藏" name="5"></el-tab-pane>-->
      </el-tabs>
    </div>
    <div class="content-info">
      <info-question v-if="activeName === '1'" :user_id="user_id"></info-question>
      <info-answer v-if="activeName === '2'" :user_id="user_id"></info-answer>
      <follow-question v-if="activeName === '3'" :user_id="user_id"></follow-question>
      <info-article v-if="activeName === '4'" :user_id="user_id"></info-article>
    </div>
  </div>
</template>

<script>
import bus from "../../utils/bus";
export default {
  name: "MyHomepage",
  components: {
    InfoArticle: () => import("../../components/infoComponents/InfoArticle"),
    FollowQuestion: () => import("../../components/infoComponents/FollowQuestion"),
    InfoAnswer: () => import("../../components/infoComponents/InfoAnswer"),
    InfoQuestion: () => import("../../components/infoComponents/InfoQuestion")
  },
  data() {
    return {
      myID: this.$store.state.loginData.userId,
      user_id: this.$route.query.id,
      userInfo: {
        user_back: window.requestUrl + "default.jpg",
        user_avatar: window.requestUrl + "avatar.jpg"
      },
      activeName: this.$route.query.index ? this.$route.query.index : "1",
      fileList: [],
      backUrl: window.requestUrl + "backImage",
      avatarUrl: window.requestUrl + "avatarImage"
    };
  },
  watch: {
    $route() {
      this.user_id = this.$route.query.id;
      this.activeName = this.$route.query.index ? this.$route.query.index : "1";
    },
    user_id() {
      this.getInfo();
    }
  },
  methods: {
    getInfo() {
      console.log(this.$route);
      var url = window.requestUrl + "userInfo/queryById";
      this.$post(url, {
        user_id: this.user_id
      }).then(res => {
        this.userInfo = res.info[0];
      });
    },

    uploadSuccess(res) {
      console.log(res);
      if (res.flag) {
        this.postBackImage(window.requestUrl + res.path);
      }
    },

    uploadSuccessAvatar(res) {
      if (res.flag) {
        this.postAvatar(window.requestUrl + res.path);
      }
    },

    postBackImage(path) {
      var url = window.requestUrl + "userInfo/updateBack";
      this.$post(url, {
        user_id: this.user_id,
        back: path
      }).then(res => {
        if (res.status) {
          this.$message.success("上传成功");
          this.userInfo.user_back = path;
        }
      });
    },

    postAvatar(path) {
      var url = window.requestUrl + "userInfo/updateAvatar";
      this.$post(url, {
        user_id: this.user_id,
        avatar: path
      }).then(res => {
        if (res.status) {
          this.$message.success("上传成功");
          this.userInfo.user_avatar = path;
          bus.$emit("avatar", path);
          this.$store.commit("setAvatar", path);
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
.my-homepage-style {
  width: 1000px;
  margin: 0 auto;
  .top-part-box {
    width: 100%;
    height: 355px;
    position: relative;
    border-bottom: 1px solid #f6f6f6;
    .home-back {
      width: 100%;
      height: 240px;
      position: relative;
    }
    .home-back:hover .upload-demo {
      display: block;
    }
    .upload-demo {
      position: absolute;
      display: none;
      top: 20px;
      right: 20px;
    }
    .upload-button {
      background: transparent;
    }
    .img-style {
      width: 100%;
      height: 100%;
    }
    .info-box {
      width: 100%;
      height: 115px;
      background: #fff;
    }
    .text-style {
      margin-left: 200px;
      width: 800px;
      height: 50px;
      line-height: 50px;
      font-weight: bold;
      font-size: 20px;
    }
    .text-small-style {
      margin-left: 200px;
      width: 800px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
    .avatar-box {
      position: absolute;
      width: 160px;
      height: 160px;
      top: 160px;
      left: 20px;
      .avatar-style {
        width: 100%;
        height: 100%;
      }
    }
    .upload-avatar {
      position: absolute;
      bottom: 10px;
      right: 10px;
      display: none;
    }
    .avatar-box:hover .upload-avatar {
      display: block;
    }
  }
  .tab-box {
    width: 100%;
    height: 40px;
    background: #fff;
    box-sizing: border-box;
    padding-left: 20px;
    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
  .content-info {
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 20px;
    min-height: 100px;
  }
}
</style>
