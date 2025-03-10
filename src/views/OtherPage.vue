<template>
  <div class="main">
    <header class="header">
      <div class="header-box">
        <div class="header-left">
          <img src="@/assets/image/sumTitle.png" alt="" width="193" height="40">
        </div>
        <div class="header-center">
          智慧供热驾驶舱
        </div>
        <div class="header-right">
          <div class="header-time">
            {{ timeShow }}
          </div>
          <div class="header-weather">
            <i :class="weatherTipIcon"></i>
            <div class="weather-tips">
              <div class="weather-desciption">{{ weatherTipText }}</div>
              <div class="weather-temperature">{{ weatherTipNum }} <span>℃</span></div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Teleport 组件，动态绑定 to 属性，传送目标为类选择器 -->
    <Teleport :to="teleportTarget">
      <div class="building-tips-block"
        :style="{ opacity: tipsBlockOpacity, left: tipsBlockLeft + 'px', top: tipsBlockTop + 'px' }">
        <div class="building-tips-title">
          房间号：{{ roomInfo.roomNumber }}<span class="building-title-minText"> ({{ roomInfo.roomCode }})</span>
        </div>
        <div class="building-tips-list">
          <template v-for="(item, idx) in roomInfo.roomInfo" :key="idx">
            <div class="tips-item">
              <div class="tips-item-block">
                <span class="tips-item-label">{{ item.label1 }}</span>
                <span class="tips-item-val">{{ item.value1 }}</span>
              </div>
              <div class="tips-item-block">
                <span class="tips-item-label">{{ item.label2 }}</span>
                <span class="tips-item-val">{{ item.value2 }}</span>
              </div>
            </div>
          </template>
        </div>
        <img class="building-tips-img" src="@/assets/image/clickIcon.png" alt="">
      </div>
    </Teleport>
    <main class="main-center">
      <div class="main-left">

        <div class="data-all">
          <div class="title-bg data-title">
            数据总览
          </div>
          <div class="data-list">
            <template v-for="(item, idx) in allDataList" :key="idx">
              <div class="data-item">
                <img class="data-img" :src="item.image" alt="">
                <div class="data-item-text">
                  <div class="data-text-tip">{{ item.tip }}</div>
                  <div class="data-text-val">{{ item.count }}<span class="data-unit"> {{
                    item.unit }}</span></div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="energy-weather">
          <div class="title-bg weather-title">
            24小时气象日能耗趋势图
          </div>
          <div class="weather-line" id="weatherLine">
          </div>
        </div>
        <div class="unit-information">
          <div class="title-bg unit-title">
            本单元信息
          </div>
          <div class="unit-info-list">
            <div class="unit-info-item">
              <div class="unit-info-text">位置</div>
              <div class="unit-info-text">房间数</div>
              <div class="unit-info-text">开栓数</div>
              <div class="unit-info-text">总面积</div>
            </div>
            <template v-for="(item, idx) in unitInfoList" :key="idx">
              <div class="unit-info-item">
                <div class="unit-info-text">{{ item.position }}</div>
                <div class="unit-info-text">{{ item.roomCount }}</div>
                <div class="unit-info-text">{{ item.openCount }}</div>
                <div class="unit-info-text">{{ item.noodle }}</div>
              </div>

            </template>
          </div>
        </div>
      </div>
      <div class="main-building">
        <div @click="mouseBuilding('up')" class="building-arrow arrow-top">
          <img src="@/assets/image/arrow.png" alt="">
        </div>
        <!-- <div @click="mouseBuilding('left')" class="building-arrow arrow-left">
          <img src="@/assets/image/arrow.png" alt="">
        </div>
        <div @click="mouseBuilding('right')" class="building-arrow arrow-right">
          <img src="@/assets/image/arrow.png" alt="">
        </div> -->
        <div @click="mouseBuilding('down')" class="building-arrow arrow-bottom">
          <img src="@/assets/image/arrow.png" alt="">
        </div>
        <div class="building-list">
          <div class="building-move-box" id="buildingMoveBox"
            :style="{ bottom: mouseBuildingBottom, left: mouseBuildingLeft }">
            <template v-for="(item, idx) in buildingLayerCount" :key="idx">
              <div class="building-item" :data-text="idx + 1 + 'F'">
                <template v-for="(itemChild, idxChild) in item.buildingRoomCount" :key="idxChild">
                  <div v-if="idxChild === 0" class="building-img"
                    @mouseleave="setTeleport('leave', 'building-left' + idx, itemChild)"
                    @mouseenter="setTeleport('enter', 'building-left' + idx, itemChild)" :class="'building-left' + idx">
                    <img class="status-img building-hover-show" v-if="itemChild.temperatureSensing" src="@/assets/image/hover-left.png" alt="">
                    <img class="status-img" v-show="!itemChild.temperatureSensing" src="@/assets/image/disabled-left.png" alt="">
                    <img src="@/assets/image/default-left.png" alt="">
                  </div>
                  <div v-else-if="idxChild === (item.buildingRoomCount.length - 1)"
                    @mouseleave="setTeleport('leave', 'building-right' + idx, itemChild)"
                    @mouseenter="setTeleport('enter', 'building-right' + idx, itemChild)" class="building-img"
                    :class="'building-right' + idx">
                    <img class="status-img building-hover-show" v-if="itemChild.temperatureSensing" src="@/assets/image/hover-right.png" alt="">
                    <img class="status-img" v-show="!itemChild.temperatureSensing" src="@/assets/image/disabled-right.png" alt="">
                    <img src="@/assets/image/default-right.png" alt="">
                  </div>
                  <div v-else class="building-img"
                    @mouseleave="setTeleport('leave', 'building-center' + idx + '' + idxChild, itemChild)"
                    @mouseenter="setTeleport('enter', 'building-center' + idx + '' + idxChild, itemChild)"
                    :class="'building-center' + idx + '' + idxChild">
                    <img class="status-img building-hover-show" v-if="itemChild.temperatureSensing" src="@/assets/image/hover-center.png" alt="">
                    <img class="status-img" v-show="!itemChild.temperatureSensing" src="@/assets/image/disabled-center.png" alt="">
                    <img src="@/assets/image/default-center.png" alt="">
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
        <div class="building-name">
          {{ buildingTitle }}
        </div>
      </div>
      <div class="main-right">

        <div class="hot-data">
          <div class="title-bg hot-title">
            本楼栋供热数据总览
          </div>
          <div class="hot-list">
            <template v-for="(item, idx) in hotDataList" :key="idx">
              <div class="hot-item">
                <div class="hot-item-text">
                  {{ item.text }}
                </div>
                <div class="hot-item-val" :class="((idx % 3) === 0) ? 'hot1' : (((idx % 3) == 1) ? 'hot2' : 'hot3')">
                  {{ item.count }}
                </div>
              </div>
            </template>
          </div>
        </div>


        <div class="point-data">
          <div class="title-bg point-title">
            室温分布
          </div>
          <div class="point-img" id="pointImg">
          </div>
        </div>


        <div class="notify">
          <div class="title-bg notify-title">
            重要通知
          </div>
          <div class="notify-list">
            <template v-for="(item, idx) in notifyList" :key="idx">
              <div class="notify-item">
                <img :src="item.img" alt="" class="notify-img" />
                <span class="notify-text">{{ item.text }}</span>
                <span class="notify-time">{{ item.time }}</span>
              </div>
            </template>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
import { getAllDataList, getDrawWave, getUnitInfoList, getHotDatList, getDrawPoint, getNotifyInfo, getBuildingInfo } from "@/http";
import water from "@/assets/image/water.png"
import lai from "@/assets/image/lai.png"
import userCount from "@/assets/image/userCount.png"
import openCount from "@/assets/image/openCount.png"
import hotNoodle from "@/assets/image/hotNoodle.png"
import allCount from "@/assets/image/allCount.png"


import hot from "@/assets/image/hot.png"
import importImg from "@/assets/image/import.png"
import time from "@/assets/image/time.png"


import { getCurrentTime } from "@/utils/update-time"
import * as echarts from 'echarts';
import { getWeather, getWeatherNow } from "@/utils/weather";
import { drawLine, drawPoint } from "@/utils/echart-fn"

export default {
  name: 'HomePage',
  data: () => {
    return {
      timeShow: getCurrentTime(),
      weatherTipText: "",
      weatherTipNum: "",
      weatherTipIcon: "",
      weather3dlist: [],
      allDataList: [],
      hotDataList: [],
      notifyList: [],
      unitInfoList: [],
      timer: null,
      mouseBuildingBottom: "0px",
      mouseBuildingLeft: "0px",
      buttonMoveCount: 0,
      leftMoveCount: 0,

      buildingLayerCount: [],
      teleportTarget: "body",
      tipsBlockOpacity: 0,
      tipsBlockLeft: -500,
      tipsBlockTop: -500,
      timerData: [],
      buildingTitle: "",
      roomInfo: []
    }
  },
  mounted() {
    this.drawPoint();
    this.getHotDatList();
    this.drawWave();
    this.getNotifyInfo();
    this.getUnitInfoList();
    this.getBuildingInfo();

    getWeatherNow().then((data) => {

      console.log("获取到的天气信息 now", data);
      const dataNow = data.now;
      if (!dataNow) {
        return;
      }
      this.weatherTipText = dataNow.text;
      this.weatherTipIcon = `qi-${dataNow.icon}`;
    })
    getWeather().then((data) => {
      console.log("获取到的天气信息", data);
      const dataBody = data.daily;
      if (!dataBody) {
        return;
      }
      this.weatherTipNum = dataBody[0].tempMin + "～" + dataBody[0].tempMax;
      const dayList = ["今天", "明天", "后天"];
      dataBody.forEach((item, idx) => {
        this.weather3dlist.push({
          temperature: item.tempMin + "～" + item.tempMax,
          text: dayList[idx] + " ：" + item.textDay,
          icon: "qi-" + item.iconDay,
        })
      })


    });

    this.getAllDataList();
    this.timer = setInterval(() => {
      this.timeShow = getCurrentTime();
    }, 1000);
  },
  unmounted() {
    clearInterval(this.timer);
    this.timerData.forEach((elem) => {
      clearInterval(elem);
    })
  },
  methods: {
    getBuildingInfo() {
      const setIntervalBuildingInfo = () => {
        getBuildingInfo().then((data) => {
          this.buildingLayerCount = data.buildingInfo;
          this.buildingTitle = data.buildingTitle
        });
      };

      this.timerData.push(setInterval(setIntervalBuildingInfo, 5000))
      setIntervalBuildingInfo();
    },
    setTeleport(status, className, item) {
      console.log(status, className, item, "status, className, item");
      if (status == "enter") {
        let widthSelfStatus = className.search("center") > -1;
        this.tipsBlockOpacity = 1;
        this.tipsBlockLeft = (-200) + (widthSelfStatus ? 99 : 68) - 20;
        this.tipsBlockTop = -298;
        this.teleportTarget = "." + className;
        this.roomInfo = item;
      } else {
        this.teleportTarget = "body";
        this.tipsBlockOpacity = 0;
        this.tipsBlockLeft = -500;
        this.tipsBlockTop = -500;
      }
    },
    mouseBuilding(directives) {
      const currentBottom = parseInt(this.mouseBuildingBottom);
      const currentLeft = parseInt(this.mouseBuildingLeft);
      const baseApp = document.getElementById("buildingMoveBox");
      const baseRect = baseApp.getBoundingClientRect();
      const baseChildRect = baseApp.children[0].getBoundingClientRect();
      const baseChildLeftMaxVal = (baseChildRect.width - baseRect.width) + 20
      switch (directives) {
        case "up":
          if ((-(baseRect.height)) >= currentBottom) {
            console.log(123)
          } else {
            this.mouseBuildingBottom = (currentBottom - 150) + "px";
          }
          break;
        case "down":
          if (currentBottom + 150 >= 0) {
            this.mouseBuildingBottom = 0 + "px";
          } else {
            this.mouseBuildingBottom = (currentBottom + 150) + "px";
          }
          break;
        case "left":
          if (currentLeft + 150 >= 0) {
            this.mouseBuildingLeft = 0 + "px";
          } else {
            this.mouseBuildingLeft = (currentLeft + 150) + "px";
          }
          break;
        case "right":
          console.log(baseChildLeftMaxVal, "baseChildLeftMaxVal", currentLeft, "currentLeft")
          if ((-baseChildLeftMaxVal) >= currentLeft - 150) {
            if (baseChildLeftMaxVal < 0) {
              this.mouseBuildingLeft = -baseChildLeftMaxVal + "px";
            }
          } else {
            this.mouseBuildingLeft = (currentLeft - 150) + "px";
          }
          break;
        // 如果上面的 case 都不满足，就走这里
        default:
          console.log('使用默认情况');
          break;
      }
    },
    getAllDataList() {
      const imgList = [userCount, openCount, hotNoodle, allCount, water, lai]
      const setIntervalAllDataList = () => {
        getAllDataList().then((data) => {
          data.forEach((elem, idx) => {
            elem.image = imgList[idx]
          })
          this.allDataList = data;
        });
      };

      this.timerData.push(setInterval(setIntervalAllDataList, 5000))
      setIntervalAllDataList();
    },
    drawWave() {
      var myChart = echarts.init(document.getElementById('weatherLine'));
      console.log(myChart, "myChart");

      const setIntervalDrawWave = () => {
        getDrawWave().then((data) => {
          drawLine(data, myChart);
        });
      }
      this.timerData.push(setInterval(setIntervalDrawWave, 5000))
      setIntervalDrawWave();
    },
    getHotDatList() {
      const setIntervalHotDataList = () => {
        getHotDatList().then((data) => {
          this.hotDataList = data;
        })
      };
      this.timerData.push(setInterval(setIntervalHotDataList, 5000));
      setIntervalHotDataList();
    },
    drawPoint() {
      // 初始化 echarts 实例
      var myChart = echarts.init(document.getElementById('pointImg'));

      const setIntervalDrawPoint = () => {
        getDrawPoint().then((data) => {
          drawPoint(data, myChart, echarts)
        });
      }

      this.timerData.push(setInterval(setIntervalDrawPoint, 5000));
      setIntervalDrawPoint();
    },
    getNotifyInfo() {
      const imgData = [importImg, hot, time];
      const setIntervalNotifyInfo = () => {
        getNotifyInfo().then((notifyData) => {
          const dataList = [];
          notifyData.forEach((item, idx) => {
            dataList.push({
              img: imgData[idx],
              text: item.text,
              time: item.time
            });
          });

          this.notifyList = dataList
        });
      };

      this.timerData.push(setInterval(setIntervalNotifyInfo, 5000))
      setIntervalNotifyInfo();
    },
    getUnitInfoList() {
      const setIntervalUnitInfoList = () => {
        getUnitInfoList().then((data) => {
          this.unitInfoList = data;
        })
      };
      this.timerData.push(setInterval(setIntervalUnitInfoList, 5000));
      setIntervalUnitInfoList();
    }
  },

}
</script>

<style>
.header-box {
  height: 76px;
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.header-left {
  padding-left: 60px;
  position: relative;
  top: 50%;
  margin-top: -20px;
  width: 380px;
}

.header-right {
  padding-right: 45px;
  position: relative;
  top: 50%;
  margin-top: -15px;
  width: 350px;
  display: flex;
}

.header-time {
  font-weight: bold;
  font-size: 30px;
  font-family: 'Arial Bold';
}

.header-center {
  font-family: "PingFang SC", "Microsoft YaHei", "SimHei", sans-serif;
  font-weight: bold;
  font-size: 50px;
  width: 400px;
}

.title-bg {
  height: 40px;
  background-image: url("@/assets/image/title.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  box-sizing: border-box;
  padding-left: 76px;
  line-height: 42px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  color: #fff;
}

.main-center {
  padding: 20px 90px;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.main-left {
  width: 400px;
}

.main-right {
  width: 400px;
}

.header-weather {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 40px 0 20px;
  align-items: center;
  flex: 1;
  height: 70px;
  margin-top: -12px;
}

.header-weather i {
  font-size: 40px;
}

.weather-desciption {
  color: #7C909E;
  font-size: 14px;
  text-align: right;
}

.weather-temperature {
  font-size: 20px;
  color: #C0D1DE;
}

.data-list {
  padding: 5px;
  padding-top: 25px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.data-img {
  width: 80px;
  height: 80px;
}

.data-item {
  margin: 5px 0;
  display: flex;
  align-items: center;
  width: 50%;
}

.data-text-tip {
  font-size: 15px;
  color: #ECF8FF;
  margin-bottom: 10px;
  white-space: nowrap;
}

.data-text-val {
  font-size: 18px;
  color: #6BDCFF;
  white-space: nowrap;
}

.data-unit {
  font-size: 12px;
  white-space: nowrap;
}

.point-img,
.weather-line {
  height: 180px;
  margin-top: 20px;
}

.energy-weather {
  margin-top: 15px;
}

.unit-information {
  margin-top: 50px;
}

.unit-info-text {
  font-size: 14px;
  color: #AFB9C3;
  width: 25%;
  text-align: center;
  line-height: 24px;
  padding: 5px 0;
}

.unit-info-list {
  display: flex;
  flex-direction: column;
  padding-top: 15px
}

.unit-info-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.hot-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: #fff;
  padding-top: 25px;
}

.hot-item {
  width: 33%;
  padding: 10px 0;
  text-align: center;
}

.hot-item-text {
  font-size: 14px;
  color: #B1C0CB;
  line-height: 22px;
  padding: 2px 0;
}

.hot-item-val {
  font-size: 24px;
  line-height: 32px;
  padding-top: 5px
}

.hot1 {
  color: #6BDCFF;
}

.hot2 {
  color: #5DE5B4;
}

.hot3 {
  color: #FFAEA9;
}

.point-data {
  margin-top: 30px
}

.notify-list {
  padding-top: 20px;
}

.notify {
  margin-top: 40px;
}

.notify-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #004C7C;
  margin: 15px 0;
  background-color: #08283A;
}

.notify-item:hover {
  border-color: #3D9DD9;
  background: linear-gradient(to bottom, #092D3F, #04639E);
}

.notify-img {
  width: 22px;
  height: 22px;
}

.notify-text {
  padding-left: 12px;
  ;
  font-size: 16px;
  color: #FFFFFF;
  flex: 1;
}

.notify-time {
  font-size: 14px;
  color: #CCCCCC;
}

.building-arrow img {
  width: 60px;
  height: 60px;
}

.building-arrow {
  position: absolute;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.arrow-top {
  top: 10px;
  left: 50%;
  margin-left: -30px;
}

.arrow-left {
  top: 50%;
  left: 20px;
  margin-top: -30px;
  transform: rotate(270deg);
}

.arrow-right {
  top: 50%;
  right: 20px;
  margin-top: -30px;
  transform: rotate(90deg);
}

.arrow-bottom {
  bottom: 85px;
  right: 50%;
  margin-right: -30px;
  transform: rotate(180deg);
}

.building-tips-block {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 200;
}

.building-title-minText {
  font-size: 14px;
}

.building-tips-title {
  height: 44px;
  width: 270px;
  line-height: 36px;
  font-size: 16px;
  color: #C6EAFF;
  padding: 0 20px;
  background-image: url("@/assets/image/building-title-bg.png");
  background-repeat: no-repeat;
  background-size: 270px 36px;
  background-position: 0 0;
}

.main-building {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
  padding: 15px;
  align-items: center;
  justify-content: flex-end;
}

.building-item {
  margin-top: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  position: relative;
}

.building-item::after {
  content: attr(data-text);
  position: absolute;
  left: -40px;
  font-weight: bold;
  font-size: 18px;
  top: 50%;
  margin-top: -6px;
  color: #fff;
  width: 35px;
  text-align: right;
}

.building-list {
  position: relative;
  margin-bottom: 90px;
  height: 634px;
  width: 804px;
  overflow: hidden;
}

.building-move-box {
  height: auto;
  position: absolute;
  bottom: 0;
  margin-left: 40px;
  transition: all ease 0.5s;
  width: 724px;
  display: flex;
  flex-direction: column;
  flex-flow: wrap-reverse;
}

.building-item .building-img:first-child .building-tips-block {
  margin-left: 110px;
}

.building-item .building-img:first-child .building-tips-img {
  margin-left: -134px;
}

.building-item .building-img:last-child .building-tips-block {
  margin-left: -130px;
}

.building-item .building-img:last-child .building-tips-img {
  margin-left: 100px;
}


.building-img>img {
  width: 100%;
  height: auto;
}

.building-img {
  padding-top: 20px;
  margin: 0 5px;
  width: 198px;
  height: 42px;
  display: flex;
  align-items: flex-end;
  position: relative;
}
.status-img{
  position: absolute;
  height: 42px;
  width: 198px;
  left: 0;
  bottom: 0;
}
.building-img:hover .building-hover-show{
  display: block;
}
.building-hover-show{
  display: none;
}
.building-name {
  height: 70px;
  line-height: 70px;
  text-align: center;
  width: 594px;
  background-image: url("@/assets/image/text-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  font-size: 32px;
  color: #fff;
}

.building-tips-list {
  background-color: rgba(47, 170, 239, 0.3);
  width: 415px;
  height: 180px;
  box-shadow: inset 5px 5px 10px;
  box-shadow:
    inset 15px 0 15px -15px #2FAAEF,
    /* 左边阴影 */
    inset -15px 0 15px -15px #2FAAEF,
    /* 右边阴影 */
    inset 0 15px 15px -15px #2FAAEF,
    /* 上边阴影 */
    inset 0 -15px 15px -15px #2FAAEF;
  /* 下边阴影 */
  border-radius: 10px;
  box-sizing: border-box;
  padding: 12px 18px;
  padding-bottom: 0;
}

.building-tips-img {
  position: absolute;
  left: 50%;
  top: 100%;
  margin-left: -40px;
  width: 80px;
  z-index: 100;
}

.tips-item {
  margin: 12px 0;
  height: 36px;
  background-color: RGBA(13, 33, 48, 0.5);
  font-size: 16px;
  color: #B0C7D5;
  display: flex;
}

.tips-item-block {
  width: 50%;
  height: 36px;
  line-height: 36px;
}

.tips-item-block {
  margin: 0 12px;
}

.tips-item-label {
  display: inline-block;
  width: 115px;
  white-space: nowrap;
}

.tips-item-val {
  display: inline-block;
  width: 46px;
}

.tips-item:nth-child(2n) {
  height: 36px;
  background-color: RGBA(13, 33, 48, 0.8);
}
</style>