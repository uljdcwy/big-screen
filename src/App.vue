<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  mounted(){
    function resizeScreen() {
      const app = document.getElementById("app")
      const width = window.innerWidth;
      const height = window.innerHeight;
      const designWidth = 1920; // 设计稿的宽
      const designHeight = 1080; // 设计稿的高

      // 计算宽高比
      const aspectRatio = designWidth / designHeight;

      console.log(aspectRatio,"aspectRatio");

      // 获取当前高度乘比例后的值
      const heightRatio = height * aspectRatio;
      // 说时宽比高小
      if(heightRatio >= width){
        // 需要放大与缩小的比例
        const lastRation = width/designWidth;

        app.style.transform = `translate(-50%, -50%) scale(${lastRation}) `;

        console.log(lastRation,"lastRation width")
        app.style.transformOrigin = 'center center';
        // 说明宽比高大
      }else{
        // 需要放大与缩小的比例
        const lastRation = height/designHeight;
        console.log(lastRation,"lastRation height")
        app.style.transform = `translate(-50%, -50%) scale(${lastRation})`;
        app.style.transformOrigin = 'center center';
      }

    }

    // 监听窗口变化
    window.addEventListener("resize", resizeScreen);
    resizeScreen(); // 页面加载时执
  }
}
</script>

<style>
body{
  background-image: url("@/assets/image//footer-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.data-item,
.statistics-item{
  background-image: url("@/assets/image/tex-imgt-bg.png");
  background-repeat: no-repeat;
  background-size: 140px auto;
  background-position: 50% 50%;
}
*{
  margin: 0;
  padding: 0;
}
#app {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1920px;
  height: 1050px;
  margin: 0 auto;

}

.otherPage #app{
  background-image: url("@/assets/image/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
