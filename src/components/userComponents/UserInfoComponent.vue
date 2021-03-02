<template>
  <div class="user-info-component-style">
    <div class="user-info-box-component">
      <div class="avator-class">
        <el-avatar
          :size="60"
          shape="square"
          :src="userInfo.user_avator"
          fit="contain"
        ></el-avatar>
      </div>
      <div class="item-class">
        <div class="font-size-big" @click="searchUser(userInfo.user_id)">
          {{ userInfo.user_name }}
        </div>
        <div class="font-size-small">
          {{ userInfo.user_info }}
        </div>
      </div>
    </div>
    <div class="user-total-component">
      <div class="user-total-item">
        <div class="user-total-item-title">
          提问
        </div>
        <div class="user-total-item-num" @click="searchUserPart(userInfo.user_id, '1')">
          {{ userInfo.questionTotal }}
        </div>
      </div>
      <div class="user-total-item">
        <div class="user-total-item-title">
          回答问题
        </div>
        <div class="user-total-item-num" @click="searchUserPart(userInfo.user_id, '2')">
          {{ userInfo.answerTotal }}
        </div>
      </div>
      <div class="user-total-item">
        <div class="user-total-item-title">
          文章
        </div>
        <div class="user-total-item-num" @click="searchUserPart(userInfo.user_id, '4')">
          {{ userInfo.articleTotal }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfoComponent",
  data() {
    return {
      userInfo: {
        user_name: "zzz",
        user_id: "",
        user_info: "swsw",
        user_avator: "",
        answerTotal: 0,
        articleTotal: 0,
        questionTotal: 0
      }
    };
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  watch: {
    id(val) {
      if (val > 0) {
        this.getUserInfo(val);
      }
    }
  },
  methods: {
    getUserInfo() {
      var url = window.requestUrl + "userInfo/getUserMessage";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          id: this.id
        }),
        success: res => {
          console.log(res);
          this.userInfo.user_name = res.info[0].user_name;
          this.userInfo.user_id = res.info[0].user_id;
          this.userInfo.user_info = res.info[0].user_info;
          this.userInfo.user_avator = res.info[0].user_avatar;
          this.userInfo.answerTotal = res.answerTotal;
          this.userInfo.articleTotal = res.articleTotal;
          this.userInfo.questionTotal = res.questionTotal;
        },
        error: err => {
          console.log(err);
        }
      });
    },

    searchUser(id) {
      console.log(id);
      this.$router.push({
        path: "/myHomepage",
        query: {
          id: id
        }
      });
    },

    searchUserPart(id, index) {
      console.log(id);
      this.$router.push({
        path: "/myHomepage",
        query: {
          id: id,
          index: index
        }
      });
    }
  }
};
</script>

<style lang="scss">
.user-info-component-style {
  width: 100%;
  background: #fff;
  box-shadow: 0 0 5px #ddd;
  .user-info-box-component {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding: 10px 15px;
    border-bottom: 1px solid #f3f3f3;
    .avator-class {
      float: left;
    }
    .item-class {
      float: left;
      margin-left: 15px;
      .font-size-big {
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: bolder;
        cursor: pointer;
      }
      .font-size-small {
        line-height: 18px;
        height: 18px;
        font-size: 12px;
        color: #666;
      }
      .font-size-normal {
        line-height: 58px;
        height: 58px;
        font-size: 16px;
        color: #666;
      }
    }
  }
  .user-total-component {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding: 10px 15px;
    display: flex;
    .user-total-item {
      flex: 1;
      height: 100%;
    }
    .user-total-item-title {
      height: 30px;
      width: 100%;
      line-height: 30px;
      font-size: 16px;
      text-align: center;
    }
    .user-total-item-num {
      height: 30px;
      width: 100%;
      line-height: 30px;
      font-size: 18px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
