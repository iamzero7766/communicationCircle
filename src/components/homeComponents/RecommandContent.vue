<template>
  <div class="recommand-content-style">
    <div v-for="item in contentInfo" :key="item.id" class="content-box">
      <h3>{{ item.title }}</h3>
      <div v-if="item.image != null && item.image != ''" class="image-box">
        <div
          class="image-style"
          :style="
            'background-image:url(' +
              require('../../assets/' + item.image + '.jpg') +
              ')'
          "
        ></div>
        <div class="image-article-style">{{ item.content }}</div>
      </div>
      <div v-if="item.image == null || item.image == ''" class="article-style">
        {{ item.content }}
      </div>
      <div class="comment-box">
        <el-button class="comment-button">
          <i class="el-icon-caret-top"></i>
          赞同
          {{ item.agreeNum }}
        </el-button>
        <el-button class="comment-button" style="width: 40px">
          <i class="el-icon-caret-bottom"></i>
        </el-button>
        <span>
          <img src="../../assets/content/comment.png" class="img-style" />
          {{ item.commentNum }}
          条评论
        </span>
        <el-button>
          <img src="../../assets/content/like.png" />
          喜欢
        </el-button>
        <el-button>
          <img src="../../assets/content/collection.png" />
          收藏
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import contentList from "@/localData/homeContent.js";
export default {
  name: "RecommandContent",
  components: {},
  data() {
    return {
      contentInfo: contentList
    };
  },
  computed: {},
  created() {
    console.log(this.contentInfo);
  },
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
.recommand-content-style {
  width: 100%;
  background-color: #fff;
  .content-box {
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
  }
  .image-box {
    width: 100%;
    margin-top: 10px;
    height: 120px;
  }
  .image-style {
    width: 190px;
    height: 105px;
    margin-top: 5px;
    border-radius: 3px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../../assets/example.jpg");
    float: left;
  }
  .image-article-style {
    width: 450px;
    margin-left: 10px;
    float: left;
    height: 120px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
  .article-style {
    width: 100%;
    height: 60px;
    line-height: 30px;
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
  .img-style {
    width: 20px;
    height: 20px;
  }
}
</style>
