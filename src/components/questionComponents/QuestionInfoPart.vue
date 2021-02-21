<template>
  <div class="question-component-style">
    <div style="cursor: pointer" @click="showAnswer(item.id)"><h3>{{ item.title }}</h3></div>
    <div v-if="item.isshow">
      <div v-if="item.image && !item.showContent" class="image-box">
        <el-image :src="item.image" class="image-style" fit="contain"></el-image>
        <div class="image-article-style">
          <span>{{ item.authorName }} : {{ item.content }}</span>
          <el-button type="text" class="cursor-pointer" @click="showHtmlText(item)">
            阅读全文
            <i class="el-icon-arrow-down"></i>
          </el-button>
        </div>
      </div>
      <div v-if="!item.image && !item.showContent" class="article-style">
        <span>{{ item.authorName }} : {{ item.content }}</span>
        <el-button type="text" class="cursor-pointer" @click="showHtmlText(item)">
          阅读全文
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </div>
      <div v-if="item.showContent" class="article-content-style">
        <div v-html="item.htmlText"></div>
        <el-button type="text" class="cursor-pointer" @click="showHtmlText(item)">
          收起
          <i class="el-icon-arrow-up"></i>
        </el-button>
      </div>
    </div>
    <!-- 下方的评论以及回答 -->
    <div class="comment-box" v-show="false">
      <el-button class="comment-button">
        <i class="el-icon-caret-top"></i>
        赞同
        {{ item.agreeNum }}
      </el-button>
      <el-button class="comment-button padding-button" style="width: 40px">
        <i class="el-icon-caret-bottom"></i>
      </el-button>
      <div class="image-text-comment">
          <span class="img-flex">
            <img src="../../assets/content/comment.png" class="img-style" />
          </span>
        {{ item.commentNum }}
        条评论
      </div>
      <div class="image-text-comment">
          <span class="img-flex">
            <img src="../../assets/content/collection.png" class="img-style" />
          </span>
        收藏
      </div>
      <div class="image-text-comment">
          <span class="img-flex">
            <img src="../../assets/content/like.png" class="img-style" />
          </span>
        {{ item.isLike ? "取消喜欢" : "喜欢" }}
      </div>
      <el-dropdown trigger="click" style="margin-left: 40px">
          <span class="el-dropdown-link"
          ><i class="el-icon-more el-icon--right"></i
          ></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>举报</el-dropdown-item>
          <el-dropdown-item>不感兴趣</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionInfoPart",
  data() {
    return {};
  },
  props: {
    item: {
      default: {}
    }
  },
  methods: {
    showAnswer(id) {
      console.log(id);
      this.$router.push({
        path: "questionInfo",
        query: {
          id: id
        }
      });
    },

    showHtmlText(item) {
      item.showContent = !item.showContent;
    }
  },
  created() {}
};
</script>

<style lang="scss">
.question-component-style {
  width: 100%;
  .image-box {
    width: 100%;
    margin-top: 10px;
    height: 110px;
  }
  .image-style {
    width: 190px;
    height: 105px;
    border-radius: 3px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    float: left;
  }
  .image-article-style {
    width: 450px;
    margin-left: 10px;
    font-size: 15px;
    float: left;
    height: 100px;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
  .article-style {
    width: 100%;
    font-size: 15px;
    height: 50px;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .comment-box {
    width: 100%;
    height: 45px;
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  .comment-button {
    color: #0084ff;
    background: rgba(0, 132, 255, 0.1);
    border: 0;
  }
  .padding-button {
    padding-left: 0;
    padding-right: 0;
    text-align: center;
  }
  .img-style {
    width: 20px;
    height: 20px;
  }
  .image-text-comment {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-left: 40px;
    cursor: pointer;
    color: #8590a6;
  }
  .img-flex {
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>
