<template>
  <div class="question-info-page">
    <div class="left-box">
      <div class="question-box">
        <div>
          <h3>{{ questionTitle }}</h3>
        </div>
        <div v-show="hasContent">
          <div v-show="showAll" class="text-style">
            {{ questionInfo }}
            <el-button type="text" @click="showAllContent">阅读全文</el-button>
          </div>
          <div v-show="!showAll" v-html="questionContent"></div>
          <div v-show="!showAll">
            <el-button type="text" @click="showAllContent">收起</el-button>
          </div>
        </div>
        <div class="button-box">
          <el-button type="primary" size="small" @click="answerQuestion" v-show="!showButton"
          >回答问题</el-button
          >
          <el-button type="primary" size="small" @click="showMyAnswer" v-show="showButton"
          >查看回答</el-button
          >
          <el-button size="small" @click="changeFollow">{{ followState ? "已关注" : "关注问题"}}</el-button>
          <div class="button-icon margin-right20">
            <img src="../../../public/homePage/bad.png" class="img-size">
            {{ badNum }}
          </div>
          <div class="button-icon">
            <img src="../../../public/homePage/good.png" class="img-size">
            好问题
            {{ goodNum }}
          </div>
        </div>
      </div>
      <div class="my-answer-box" v-if="showAnswer">
        <div class="user-info-box">
          <div class="avator-class">
            <el-avatar
                    :size="40"
                    :src="avatar"
                    fit="contain"
            ></el-avatar>
          </div>
          <div class="item-class">
            <div class="font-size-big" v-show="!isanonymous">
              {{ userName }}
            </div>
            <div class="font-size-small" v-show="!isanonymous">
              {{ userContent }}
            </div>
            <div class="font-size-normal" v-show="isanonymous">匿名用户</div>
          </div>
          <div class="checkbox-box">
            <el-button type="text" @click="changeAnoymous">
              {{ isanonymous ? "取消匿名" : "开启匿名" }}
            </el-button>
          </div>
        </div>
        <div class="editor-box-style">
          <editor-component
                  v-model="userAnswer"
                  class="editor-box"
                  :isClear="isClear"
                  :placeValue="placeValue"
                  @change="change"
                  :menu="menuList"
          ></editor-component>
        </div>
        <div class="editor-button-box">
          <el-button size="small" @click="showAnswer = false">取消</el-button>
          <el-button size="small" type="primary" @click="answerPost"
          >提交</el-button
          >
        </div>
      </div>
      <div class="answer-info-box backWhite" v-if="showEditor">
        <div class="answer-item-info-style">
          <div class="user-info-box">
            <div class="avator-class">
              <el-avatar
                      :size="40"
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                      fit="contain"
              ></el-avatar>
            </div>
            <div class="item-class">
              <div class="font-size-big" v-show="!userAnswerInfo.isanonymous">
                {{ userName }}
              </div>
              <div class="font-size-small" v-show="!userAnswerInfo.isanonymous">
                {{ userContent }}
              </div>
              <div class="font-size-normal" v-show="userAnswerInfo.isanonymous">
                匿名用户
              </div>
            </div>
          </div>
          <div class="answer-content-box" v-html="userAnswerInfo.answer_info"></div>
          <div class="answer-content-box" style="font-size: 12px; color: #666; height: 40px">
            编辑于{{ getMonthDay(userAnswerInfo.dt_create) }}
          </div>
          <div style="padding: 0 15px">
            <el-button type="text" @click="changeAnswer(userAnswerInfo.answer_info)">修改回答</el-button>
          </div>
        </div>
      </div>
      <div class="answer-number-box">
        {{ totalNum > 0 ? "共有回答" + totalNum + "个" : "暂无回答" }}
      </div>
      <div class="answer-info-box">
        <div class="answer-info-box-scroll"
             v-infinite-scroll="loadSet"
             infinite-scroll-disabled="busy"
             infinite-scroll-distance="10">
          <div
            class="answer-item-info-style"
            v-for="item in answerList"
            :key="item.user_id"
          >
            <div class="user-info-box">
              <div class="avator-class">
                <el-avatar
                  :size="40"
                  :src="item.user_avatar"
                  fit="contain"
                ></el-avatar>
              </div>
              <div class="item-class">
                <div class="font-size-big cursor-pointer" v-show="!item.anonymous">
                  <el-popover width="400"
                          placement="right"
                          trigger="click">
                    <user-info-component v-bind:id="popverID"></user-info-component>
                    <el-button slot="reference" type="text" @click="popverID = item.user_id">{{ item.user_name }}</el-button>
                  </el-popover>
                </div>
                <div class="font-size-small" v-show="!item.anonymous">
                  {{ item.user_info }}
                </div>
                <div class="font-size-normal" v-show="item.anonymous">
                  匿名用户
                </div>
              </div>
            </div>
            <div class="answer-content-box" v-html="item.answer_info"></div>
            <div class="answer-content-box" style="font-size: 12px; color: #666; height: 40px">
              编辑于{{ item.day }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-box">
      <pic-component class="pic-box"></pic-component>
      <user-info-component v-bind:id="questionUser" v-show="!questionAnonymous"></user-info-component>
      <anonymos-user v-show="questionAnonymous"></anonymos-user>
      <attention-info></attention-info>
    </div>
  </div>
</template>

<script>
import EditorComponent from "../../components/editor/EditorComponent";
import formatFunction from "@/utils/formatHtml";
import UserInfoComponent from "../../components/userComponents/UserInfoComponent";
import PicComponent from "../../components/userComponents/picComponent";
import AnonymosUser from "../../components/userComponents/AnonymosUser";
import AttentionInfo from "../../components/AttentionInfo";
export default {
  name: "questionInfo",
  components: {AttentionInfo, AnonymosUser, PicComponent, UserInfoComponent, EditorComponent },
  data() {
    return {
      isAnswered: false,
      questionId: "",
      questionTitle: "",
      questionInfo: "",
      questionContent: "",
      questionUser: 0,
      questionAnonymous: 0,
      hasContent: false,
      showAll: true,
      totalNum: 0,
      answerInfo: [],
      userName: this.$store.state.loginData.userName,
      avatar: this.$store.state.avatar,
      userContent: this.$store.state.loginData.userInfo,
      isClear: false,
      placeValue: "请输入你的回答",
      userAnswer: "",
      showAnswer: false,
      isanonymous: false,
      popverID: 0,
      menuList: [
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline",
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table" // 表格
      ],
      answerList: [],
      showButton: false,
      userAnswerInfo: {},
      showEditor: false,
      badNum: 140,
      goodNum: 200,
      followState: false,
      pageNum: 0,
      busy: false,
      showBottom: false
    };
  },
  methods: {

    loadSet() {
      console.log("1212121");
      this.busy = true;
      setTimeout(() => {
        this.getAnswerInfo(this.pageNum);
      }, 1000);
    },

    showUser(id) {
      this.$router.push({
        path: "/myHomepage",
        query: {
          id: id
        }
      });
    },

    getQuestionData(id) {
      var url = "http://localhost:3000/question/queryByID";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          id: id
        }),
        success: res => {
          console.log(res);
          var content = res.info[0];
          this.questionTitle = content.question_title;
          if(content.question_info.length > 0) {
            this.hasContent = true;
            this.questionInfo = formatFunction.formatHtml(content.question_info);
            this.questionContent = content.question_info;
          }
          this.questionUser = content.user_id;
          this.questionAnonymous = content.anonymous;
        },
        error: err => {
          console.log(err);
        }
      });
    },

    getUserAnswerInfo(id) {
      var url = "http://localhost:3000/answer/queryByID";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          question_id: id,
          user_id: this.$store.state.loginData.userId
        }),
        success: res => {
          console.log(res);
          if (res.info.length > 0) {
            this.isAnswered = true;
            this.showButton = true;
            this.userAnswerInfo = res.info[0];
          } else {
            this.isAnswered = false;
            this.showButton = false;
            this.userAnswerInfo = {};
          }
        },
        error: err => {
          console.log(err);
        }
      });
    },
    change(val) {
      console.log(val);
    },

    changeAnswer(text) {
      this.showEditor = false;
      this.showAnswer = true;
      this.userAnswer = text;
    },


    showAllContent() {
      this.showAll = !this.showAll;
    },

    getAnswerInfo(pageNum) {
      var start = pageNum * 5;
      var url = "http://localhost:3000/answer/queryInfo";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          question_id: this.questionId,
          start: start,
          num: 5
        }),
        success: res => {
          console.log(res);
          this.totalNum = res.total;
          res.info.forEach(item => {
            item.day = this.getMonthDay(item.dt_create);
          });
          if (pageNum === 0) {
            this.answerList = res.info;
          } else {
            this.answerList = this.answerList.concat(res.info);
          }
          this.pageNum++;
          this.busy = (res.info.length === 0);
        },
        error: err => {
          console.log(err);
        }
      });
    },

    answerQuestion() {
      this.showAnswer = true;
    },

    showMyAnswer() {
      this.showEditor = true;
    },

    getFollowState(id) {
      var url = "http://localhost:3000/follow/query";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          user_id: this.$store.state.loginData.userId,
          question_id: id
        }),
        success: res => {
          console.log(res);
          this.followState = res.info;
        },
        error: err => {
          console.log(err);
        }
      });
    },

    changeFollow() {
      var url = ""
      if (this.followState) {
        url = "http://localhost:3000/follow/delete";
      } else {
        url = "http://localhost:3000/follow/add";

      }
      this.changeFollowReq(url);
    },

    changeFollowReq(url) {
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          user_id: this.$store.state.loginData.userId,
          question_id: parseInt(this.questionId)
        }),
        success: res => {
          console.log(res);
          if (res.status) {
            this.followState = !this.followState;
          }
        },
        error: err => {
          console.log(err);
        }
      });
    },

    // 增加回答
    answerPost() {
      var url = this.isAnswered
        ? "http://localhost:3000/answer/update"
        : "http://localhost:3000/answer/addQuestion";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          question_id: this.questionId,
          user_id: this.$store.state.loginData.userId,
          content: this.userAnswer,
          anonymous: this.isanonymous ? 1 : 0,
          dt_create: new Date().getTime()
        }),
        success: res => {
          console.log(res);
          if (res.status) {
            this.$message({
              message: "回答成功",
              type: "success"
            });
            this.showAnswer = false;
            this.pageNum = 0;
            this.loadSet();
            this.getUserAnswerInfo(this.questionId);
          }
        },
        error: err => {
          console.log(err);
        }
      });
    },

    changeAnoymous() {
      this.isanonymous = !this.isanonymous;
    },

    getMonthDay(date) {
      var time = new Date(parseInt(date));
      var month = time.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var day = time.getDate();
      day = day < 10 ? "0" + day : day;
      return month + "-" + day;
    }
  },
  created() {
    this.questionId = this.$route.query.id;
    this.getQuestionData(this.questionId);
    this.loadSet();
    this.getUserAnswerInfo(this.questionId);
    this.getFollowState(this.questionId);
  }
};
</script>

<style lang="scss">
.question-info-page {
  width: 1200px;
  margin: 0 auto;
  .left-box {
    width: 800px;
    float: left;
  }
  .right-box {
    width: 360px;
    float: right;
    .pic-box {
      width: 100%;
      height: 160px;
      margin-bottom: 10px;
      background: #fff;
      box-shadow: 0 0 5px #ddd;
    }
  }
  .question-box {
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 0 5px #ddd;
  }
  .text-style {
    width: 100%;
    font-size: 14px;
    font-family: "宋体";
    .el-button--text {
      padding: 0 20px;
    }
  }
  .button-box {
    margin-top: 10px;
    .button-icon {
      box-sizing: border-box;
      padding: 5px 10px;
      color: #8a8a8a;
      font-size: 14px;
      line-height: 20px;
      float: right;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .margin-right20 {
      margin-right: 20px;
    }
    .img-size {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
  .my-answer-box {
    width: 100%;
    height: 500px;
    margin-top: 5px;
    background: #fff;
    .editor-box-style {
      width: 100%;
      height: 400px;
      border-bottom: 1px solid #f6f6f6;
    }
    .uneditor-box-style {
      width: 100%;
      height: 400px;
      box-sizing: border-box;
      padding: 0 15px;
    }
    .editor-button-box {
      width: 100%;
      height: 40px;
      text-align: center;
      box-sizing: border-box;
      padding-top: 5px;
    }
  }
  .user-info-box {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 15px;
    /*border-bottom: 1px solid #f6f6f6;*/
    .avator-class {
      float: left;
      margin-top: 10px;
    }
    .item-class {
      float: left;
      margin-left: 15px;
      .font-size-big {
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: bolder;
        .el-button--text {
          color: #666666;
        }
      }
      .cursor-pointer {
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
    .checkbox-box {
      float: right;
      margin-top: 10px;
    }
  }
  .answer-number-box {
    background: #fff;
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-top: 15px;
    text-align: center;
    box-shadow: 0 0 5px #ddd;
  }
  .backWhite {
    background: #fff;
    box-shadow: 0 0 5px #ddd;
  }
  .answer-info-box {
    width: 100%;
    margin: 15px 0;
    min-height: 200px;
    .answer-info-box-scroll {
      width: 100%;
      height: 100%;
      background: #fff;
      box-shadow: 0 0 5px #ddd;
    }
    .answer-item-info-style {
      border-bottom: 1px solid #eee;
      .answer-content-box {
        width: 100%;
        box-sizing: border-box;
        padding: 0px 15px;
      }
    }
  }
  .height200 {
    min-height: 200px;
  }
}
</style>
