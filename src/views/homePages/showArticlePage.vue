<template>
  <div class="show-article-page-style">
    <div class="left-article">
      <div class="top-part">
        <el-tag
          class="margin-right15"
          v-for="content in articleInfo.tagList"
          :key="content"
          >{{ content }}</el-tag
        >
        <div class="title-box">{{ articleInfo.arcticle_title }}</div>
        <div class="user-info-box">
          <div class="avator-class">
            <el-avatar
              :size="40"
              :src="articleInfo.user_avatar"
              fit="contain"
            ></el-avatar>
          </div>
          <div class="item-class">
            <div class="font-size-big">
              {{ articleInfo.user_name }}
            </div>
            <div class="font-size-small">
              {{ articleInfo.user_info }}
            </div>
          </div>
        </div>
      </div>
      <div class="content-class" v-html="articleInfo.arcticle_content"></div>
      <div class="other-info-box">编辑于{{ articleInfo.day }}</div>
      <div class="other-info-box" v-show="articleInfo.tips !== ''">
        作者有话说：{{ articleInfo.tips }}
      </div>
      <div class="comment-box">
        <el-button
          type="text"
          icon="el-icon-chat-dot-round"
          @click="showList"
          class="comment-button margin-right30"
          >{{ total }} 条评论</el-button
        >
        <el-button
          type="text"
          icon="el-icon-position"
          class="comment-button margin-right30"
          >分享</el-button
        >
        <el-button type="text" icon="el-icon-star-off" class="comment-button"
          >收藏</el-button
        >
      </div>
      <div class="comment-list-box" v-show="showComment">
        <div class="comment-list"
             v-infinite-scroll="loadSet"
             infinite-scroll-disabled="busy"
             infinite-scroll-distance="10">
          <div class="comment-info" v-for="item in commentList" :key="item.comment_id">
            <div class="user-comment">
              <el-avatar shape="square" size="small" :src="item.user_avatar"></el-avatar>
              <span style="margin-left: 15px;">{{ item.user_name }}</span>
            </div>
            <div class="user-comment-info" v-html="item.content"></div>
          </div>
        </div>
        <div class="add-comment">
          <div class="input-style">
            <comment-editor
              v-model="commentInfo"
              class="editor-box"
              :showHeader="false"
              placeValue="请输入内容"
            ></comment-editor>
          </div>
          <div class="submit-style">
            <el-button
              class="button-style"
              size="small"
              :disabled="commentInfo === ''"
              type="primary"
              @click="submitComment"
              >发布</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="right-article">
      <pic-component class="pic-box"></pic-component>
      <user-info-component v-bind:id="article_user"></user-info-component>
      <attention-info></attention-info>
    </div>
  </div>
</template>

<script>
import formatFunction from "@/utils/formatHtml";
export default {
  name: "showArticlePage",
  components: {
    CommentEditor: () => import("../../components/editor/CommentEditor"),
    AttentionInfo: () => import("../../components/AttentionInfo"),
    PicComponent: () => import("../../components/userComponents/picComponent"),
    UserInfoComponent: () => import("../../components/userComponents/UserInfoComponent")
  },
  data() {
    return {
      articleId: this.$route.query.id,
      user_id: this.$store.state.loginData.userId,
      articleInfo: {},
      total: 0,
      commentInfo: "",
      commentList: [],
      showComment: false,
      article_user: 0,
      busy: true,
      pageNum: 0
    };
  },
  methods: {
    getInfo() {
      var url = window.requestUrl + "article/queryInfo";
      this.$post(url, {
        id: parseInt(this.articleId)
      }).then(res => {
        if (res.status) {
          this.articleInfo = res.info[0];
          this.articleInfo.tagList = this.articleInfo.type.split(",");
          this.articleInfo.day = formatFunction.formatDate(
            parseInt(this.articleInfo.dt_create)
          );
          this.article_user = res.info[0].user_id;
        }
      });
    },

    loadSet() {
      this.busy = true;
      setTimeout(() => {
        this.getComments(this.pageNum);
      }, 1000);
    },

    showList() {
      this.showComment = !this.showComment;
      if (this.showComment) {
        this.busy = false;
        this.loadSet();
      }
    },

    getComments(page) {
      var start = page * 10;
      var url = window.requestUrl + "comment/queryByArticle";
      this.$post(url, {
        article_id: parseInt(this.articleId),
        dt_start: start,
        dt_end: 10
      }).then(res => {
        if (page === 0) {
          this.commentList = res.info;
        } else {
          this.commentList = this.commentList.concat(res.info);
        }
        this.pageNum++;
        this.busy = res.info.length === 0;
      });
    },

    getCommentsAll() {
      var url = window.requestUrl + "comment/queryByArticleAll";
      this.$post(url, {
        article_id: parseInt(this.articleId)
      }).then(res => {
        this.total = res.total;
      });
    },

    submitComment() {
      var url = window.requestUrl + "comment/addComment";
      this.$post(url, {
        article_id: parseInt(this.articleId),
        user_id: this.user_id,
        content: this.commentInfo,
        parent_id: 0,
        dt_create: new Date().getTime()
      }).then(res => {
        if (res.status) {
          this.commentInfo = "";
          this.getComments(0);
        }
      });
    }
  },
  created() {
    this.articleId = this.$route.query.id;
    this.getInfo();
    this.getCommentsAll();
  }
};
</script>

<style lang="scss">
.show-article-page-style {
  width: 1200px;
  margin: 0 auto;
  .left-article {
    width: 800px;
    background: #fff;
    box-shadow: 0 0 5px #ddd;
    float: left;
    .top-part {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 15px;
      .margin-right15 {
        margin-right: 15px;
      }
      .title-box {
        width: 100%;
        line-height: 60px;
        margin-top: 10px;
        font-size: 26px;
        font-weight: bold;
      }
      .user-info-box {
        width: 100%;
        height: 60px;
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
          }
          .font-size-small {
            line-height: 18px;
            height: 18px;
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
    .content-class {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 15px;
    }
    .other-info-box {
      width: 100%;
      font-size: 12px;
      box-sizing: border-box;
      color: #666;
      padding: 5px 15px;
    }
    .comment-box {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 15px;
      border-top: 1px solid #ddd;
      .comment-button {
        color: #666;
      }
      .margin-right30 {
        margin-right: 30px;
      }
    }
    .comment-list-box {
      width: 100%;
      min-height: 100px;
      box-sizing: border-box;
      .comment-list {
        width: 100%;
        height: 100%;
      }
      .comment-info {
        width: 100%;
        box-sizing: border-box;
        padding: 5px 15px;
        .user-comment {
          width: 100%;
          height: 40px;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
        }
        .user-comment-info {
          width: 100%;
          box-sizing: border-box;
          font-size: 14px;
          padding-bottom: 5px;
          margin-bottom: 5px;
          border-bottom: 1px solid #ddd;
        }
      }
      .add-comment {
        width: 100%;
        box-sizing: border-box;
        padding: 5px 15px;
      }
      .input-style {
        width: calc(100% - 80px);
        margin-bottom: 10px;
        float: left;
        box-sizing: border-box;
        border: 1px solid #ddd;
      }
      .submit-style {
        width: 80px;
        float: left;
        .button-style {
          float: right;
        }
      }
    }
  }
  .right-article {
    width: 380px;
    float: right;
  }
}
</style>
