<template>
  <van-skeleton :row="26" :loading="skeletonLoading">
    <div class="page">
      <div v-if="coverShow" class="cover" @click="closeCover">
        <div :style="style" ref="lavContainer"></div>
      </div>

      <div :class="coverShow ? 'blur' : ''">
        <div class="title">{{article.title}}</div>
        <div class="desc-wrap">
          <div class="desc">
            <div class="author">{{article.author}}</div>
            <div class="time">{{article.publishTime}}</div>
          </div>
          <div v-if="!article.collected" class="collect" @click="collect">
            <span>收 藏</span>
          </div>
          <div v-else class="collect collected" @click="cancelCollect">
            <span>已收藏</span>
          </div>
        </div>
        <div id="editor" class="ql-editor"></div>
      </div>
    </div>
  </van-skeleton>
</template>

<script>
import Quill from "quill";
import { Skeleton } from "vant";
import lottie from "lottie-web";
export default {
  name: "page-article",
  components: {
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      skeletonLoading: true,
      style: {
        width: "100px",
        height: "100px",
        overflow: "hidden",
        margin: "0 auto",
      },
      article: {
        title: "",
        collected: false,
        content: ``,
      },
      timer: "",
      coverShow: false,
    };
  },
  beforeDestroy() {
    this.quill = null;
    delete this.quill;
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      setTimeout(() => {
        this.skeletonLoading = false;
        this.article = {
          title: "这里是标题",
          author: "作者",
          publishTime: "发布时间",
          collected: false,
          content: `<p><span style="color: rgb(63, 63, 63);">这里是内容</span></p><br><p><img src="https://mmbiz.qpic.cn/mmbiz_jpg/mmufUMGh1ic1TsISjzpx1WgeJSxY9tp6dnpyasMuVNZsr3Gqa9VfBsQS5NVfL6qzOnIiaRg6H1JfztibTjibGRGyDQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1"></p>`,
        };
        this.init();
      }, 500);
    },
    init() {
      this.$nextTick(() => {
        this.quill = new Quill("#editor", {
          theme: "bubble",
        });
        this.quill.enable(false);
        document.querySelector("#editor").innerHTML = this.article.content;
      });
    },
    lottieCollect(path) {
      this.ajax.$get(path).then((res) => {
        lottie.loadAnimation({
          container: this.$refs.lavContainer,
          renderer: "svg",
          loop: false,
          autoplay: true,
          animationData: res.data,
        });
      });
    },
    collect() {
      this.lottieCollect(
        `${document.location.origin}/lottie/collect/collect.json`
      );
      this.coverShow = true;
      this.timer = setTimeout(() => {
        this.coverShow = false;
      }, 2000);
      this.article.collected = true;
    },
    cancelCollect() {
      this.lottieCollect(
        `${document.location.origin}/lottie/cancel/cancel.json`
      );
      this.coverShow = true;
      this.timer = setTimeout(() => {
        this.coverShow = false;
      }, 2000);
      this.article.collected = false;
    },
    closeCover() {
      this.coverShow = false;
      clearTimeout(this.timer);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";

.ql-container {
  font-family: "PingFangSC-Regular", "PingFangSC", "PingFang SC",
    "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", Arial,
    sans-serif;
  font-size: 15px;
}

/deep/ .ql-editor img {
  max-width: 100%;
}

.page {
  position: relative;
}

.blur {
  filter: blur(8px);
}

.cover {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100px;
    height: 100px;
  }
}

.title {
  padding: 0.24rem 0.3rem;
  font-size: 0.48rem;
  font-weight: bolder;
  color: rgba(51, 51, 51, 1);
  line-height: 0.68rem;
}
.desc-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  .desc {
    .author {
      height: 25px;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
    }
    .time {
      height: 17px;
      font-size: 13px;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
    }
  }
  .collect {
    width: 42px;
    text-align: center;
    padding: 4px 10px;
    border-radius: 50px;
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
    background: rgba(255, 149, 67, 1);
  }
  .collected {
    background: rgba(232, 232, 232, 1);
    color: rgba(189, 189, 189, 1);
  }
}
</style>