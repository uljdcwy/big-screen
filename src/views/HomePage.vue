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
        <main class="main-center">
            <div class="mask-bg-left"></div>
            <div class="mask-bg-right"></div>
            <div class="border-left"></div>
            <div class="border-top"></div>
            <div class="border-right"></div>
            <div class="border-bottom"></div>
            <div class="three-model" id="threeModel"></div>
            <div class="main-left">
                <div class="main-weather">
                    <div class="title-bg weather-title">
                        天气信息
                    </div>
                    <div class="weather-data">
                        <template v-for="(item, idx) in weather3dlist" :key="idx">
                            <div class="weather-data-item">
                                <div class="weather-item-icon">
                                    <i :class="item.icon"></i>
                                </div>
                                <div class="weather-item-tip">
                                    {{ item.text }}
                                </div>
                                <div class="weather-item-temperature">
                                    {{ item.temperature }}℃
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="energy-ranking">
                    <div class="title-bg energy-title">
                        能耗排行
                    </div>
                    <div class="energy-bar bar" id="hotRanking"></div>
                    <div class="energy-bar bar" id="electricityRanking"></div>
                    <div class="energy-bar bar" id="waterRanking"></div>
                </div>
            </div>
            <div class="main-model">
            </div>
            <div class="main-right">
                <div class="service-data">
                    <div class="title-bg energy-title">
                        供热客服数据
                    </div>
                    <div class="data-pie" id="maxPie"></div>
                    <div class="data-m-pie" id="drawMPie"></div>
                </div>
                <div class="energy-statistics">
                    <div class="title-bg statistics-title">
                        本季能耗统计
                    </div>
                    <div class="statistics-list">
                        <template v-for="(item, idx) in statisticsList" :key="idx">
                            <div class="statistics-item">
                                <img class="statistics-img" :src="item.image" alt="">
                                <div class="statistics-item-text">
                                    <div class="statistics-text-tip">{{ item.tip }}</div>
                                    <div class="statistics-text-val">{{ item.count }}<span class="statistics-unit"> {{
                                        item.unit }}</span></div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getBuildingGeo, getHotRanking, getElectricityRanking, getWaterRanking, getDrawPie, getDrawMPie, getStatisticsList } from "@/http/index";
import * as echarts from 'echarts';
import 'echarts-gl';  // 如果你使用 echarts-gl
import fire from "@/assets/image/fire.png"
import water from "@/assets/image/water.png"
import lai from "@/assets/image/lai.png"
import lingitBg from "@/assets/image/lingit.png"
import sky_texture from "@/assets/sky_texture.hdr"
import { Font } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { PMREMGenerator } from 'three/src/extras/PMREMGenerator.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import wrrhFont from "@/assets/image/wrrh.json"
import buildingGlb from "@/assets/glbModel/building.glb"
import groundGlb from "@/assets/glbModel/ground.glb"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getCurrentTime } from "@/utils/update-time"
import { setBar, setPie, drawMPie } from "@/utils/echart-fn";
import { getWeather, getWeatherNow } from "@/utils/weather";
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export default {
    name: 'HomePage',
    data: () => {
        return {
            timeShow: getCurrentTime(),
            weatherTipText: "",
            weatherTipNum: "",
            weatherTipIcon: "",
            weather3dlist: [],
            statisticsList: [],
            timer: null,
            bar1Instance: [],
            hotRankingQuote: null,
            timerData: [],
            threeData: {}
        }
    },
    mounted() {
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
        this.hotRanking();
        this.electricityRanking();
        this.waterRanking();
        this.drawPie();
        this.drawMPie();
        this.getStatisticsList();
        this.timer = setInterval(() => {
            this.timeShow = getCurrentTime();
        }, 1000);
        this.showGlbModel();
    },
    unmounted() {
        clearInterval(this.timer);

        // 删除已注册的自定义 shape
        delete echarts.graphic.leftShape;
        delete echarts.graphic.rightShape;
        delete echarts.graphic.topShape;

        this.bar1Instance.forEach((item) => {
            item.dispose();
        });
        this.bar1Instance = null;
        cancelAnimationFrame(this.threeData.frame);
        this.timerData.forEach((elem) => {
            clearInterval(elem)
        });
        this.clearThreeData();
    },
    methods: {
        clearThreeData() {
            const renderer = this.threeData.renderer;
            let animationFrameId = this.threeData.frame;
            const scene = this.threeData.scene;
            const controls = this.threeData.controls;
            // 停止动画循环
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }


            // 清空场景
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }

            // 销毁控制器
            if (controls) {
                controls.dispose();
            }

            // 销毁渲染器
            renderer.dispose();

            // 移除渲染器 DOM 元素
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }

        },
        drawMPie() {
            const chart = echarts.init(document.getElementById("drawMPie"));



            const setIntervalDrawMPie = () => {
                getDrawMPie().then((data) => {
                    drawMPie(data, chart, echarts);
                });
            }
            this.timerData.push(setInterval(setIntervalDrawMPie, 5000));
            setIntervalDrawMPie();
        },
        drawPie() {
            const chart = echarts.init(document.getElementById("maxPie"));


            const setIntervalDrawPie = () => {
                getDrawPie().then((optionsData) => {
                    const data = {
                        allCount: 0,
                        legendList: [],
                        optionsData: optionsData
                    };

                    optionsData.forEach((item) => {
                        data.allCount += item.value;
                        data.legendList.push(item.name)
                    })

                    setPie(chart, data);
                });
            }
            this.timerData.push(setInterval(setIntervalDrawPie, 5000));
            setIntervalDrawPie();

        },
        hotRanking() {
            var myChart = echarts.init(document.getElementById('hotRanking'));
            this.bar1Instance.push(myChart);


            const setIntervalHotRanking = () => {

                getHotRanking().then((res) => {
                    this.barFn({
                        // 第一组条形颜色
                        mainColorFirstTransparent: "RGBA(79, 179, 20, 0)",
                        mainColorFirst: "RGBA(79, 179, 20, 1)",
                        // 3D浅边颜色
                        mainColorFourTransparent: "RGBA(90, 162, 12, 0)",
                        mainColorFour: "RGBA(90, 162, 12, 1)",


                        // 第二组件条颜色
                        mainColorTwoTransparent: "rgba(45, 210, 205, 0)",
                        mainColorTwo: "RGBA(45, 210, 205, 1)",
                        // 3D浅边颜色
                        mainColorThreeTransparent: "RGBA(42, 170, 168, 0)",
                        mainColorThree: "RGBA(42, 170, 168, 1)",

                        firstBarName: res.yData[0].barName,
                        TwoBarName: res.yData[1].barName,

                        xData: res.xData,
                        showDataFrist: res.yData[0].data,
                        showDataTwo: res.yData[1].data,
                        barTitle: res.barName
                    }, myChart);
                })
            };

            this.timerData.push(setInterval(setIntervalHotRanking, 5000));
            setIntervalHotRanking();
        },
        electricityRanking() {
            var myChart = echarts.init(document.getElementById('electricityRanking'));
            this.bar1Instance.push(myChart);


            const setIntervalElectricityRanking = () => {

                getElectricityRanking().then((res) => {
                    this.barFn({
                        // 第一组条形颜色
                        mainColorFirstTransparent: "RGBA(245, 132, 8, 0)",
                        mainColorFirst: "RGBA(245, 132, 8, 1)",
                        // 3D浅边颜色
                        mainColorFourTransparent: "RGBA(161, 108, 12, 0)",
                        mainColorFour: "RGBA(161, 108, 12, 1)",


                        // 第二组件条颜色
                        mainColorTwoTransparent: "RGBA(51, 246, 235, 0)",
                        mainColorTwo: "RGBA(51, 246, 235, 1)",
                        // 3D浅边颜色
                        mainColorThreeTransparent: "RGBA(51, 248, 238, 0)",
                        mainColorThree: "RGBA(51, 248, 238, 1)",

                        firstBarName: res.yData[0].barName,
                        TwoBarName: res.yData[1].barName,

                        xData: res.xData,
                        showDataFrist: res.yData[0].data,
                        showDataTwo: res.yData[1].data,
                        barTitle: res.barName
                    }, myChart);
                })
            };

            this.timerData.push(setInterval(setIntervalElectricityRanking, 5000));
            setIntervalElectricityRanking();

        },
        waterRanking() {
            var myChart = echarts.init(document.getElementById('waterRanking'));
            this.bar1Instance.push(myChart);




            const setIntervalWaterRanking = () => {

                getWaterRanking().then((res) => {
                    this.barFn({
                        // 第一组条形颜色
                        mainColorFirstTransparent: "RGBA(8, 137, 252, 0)",
                        mainColorFirst: "RGBA(8, 137, 252, 1)",
                        // 3D浅边颜色
                        mainColorFourTransparent: "RGBA(11, 92, 162, 0)",
                        mainColorFour: "RGBA(11, 92, 162, 1)",


                        // 第二组件条颜色
                        mainColorTwoTransparent: "RGBA(51, 246, 235, 0)",
                        mainColorTwo: "RGBA(51, 246, 235, 1)",
                        // 3D浅边颜色
                        mainColorThreeTransparent: "RGBA(39, 164, 158, 0)",
                        mainColorThree: "RGBA(39, 164, 158, 1)",

                        firstBarName: res.yData[0].barName,
                        TwoBarName: res.yData[1].barName,

                        xData: res.xData,
                        showDataFrist: res.yData[0].data,
                        showDataTwo: res.yData[1].data,
                        barTitle: res.barName
                    }, myChart);
                })
            };


            this.timerData.push(setInterval(setIntervalWaterRanking, 5000));
            setIntervalWaterRanking();

        },
        barFn(data, myChart) {
            setBar({
                title: {
                    text: data.barTitle,
                    left: 'left',   // 设置标题居中显示
                    top: '1%',        // 设置标题距离顶部一定距离
                    textStyle: {
                        color: '#ffffff',  // 设置字体颜色为红色
                        fontSize: 24        // 设置字体大小
                    }
                },
                legend: {
                    data: [
                        {
                            name: data.firstBarName,
                            icon: 'path://M50,50 L150,50 L150,150 L50,150 Z M50,50 L100,30 L200,30 L150,50 Z M150,50 L200,30 L200,130 L150,150 Z M200,130 L150,150 L50,150 L100,130 Z',
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [  // 渐变从下到上
                                    { offset: 0, color: data.mainColorFirstTransparent },  // 底部：完全透明
                                    { offset: 1, color: data.mainColorFirst }   // 顶部：完全不透明的绿色
                                ])
                            }

                        },
                        {
                            name: data.TwoBarName,
                            icon: 'path://M50,50 L150,50 L150,150 L50,150 Z M50,50 L100,30 L200,30 L150,50 Z M150,50 L200,30 L200,130 L150,150 Z M200,130 L150,150 L50,150 L100,130 Z',
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [  // 渐变从下到上
                                    { offset: 0, color: data.mainColorTwoTransparent },  // 底部：完全透明
                                    { offset: 1, color: data.mainColorTwo }   // 顶部：完全不透明的绿色
                                ])
                            }
                        }
                    ],
                    textStyle: {
                        color: "white",  // 文字颜色
                        fontSize: 14      // 文字大小
                    },
                    padding: [5, 10],  // 为图标和文字添加适当的间距，避免重叠
                    top: '1%',
                    right: '3%'
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        data: data.xData,
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLabel: {
                            fontSize: 9  // 设置字体大小为 10，您可以根据需要调整
                        }
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0,  // 设置最小值为 0
                        max: 100,  // 设置最大值为 100
                        axisLabel: {
                            formatter: '{value}%'  // 将标签格式化为百分比
                        }
                    },
                    {
                        type: "value",
                        min: 0,  // 设置最小值为 0
                        max: 100,  // 设置最大值为 100
                        axisLabel: {
                            formatter: '{value} °C'  // 将标签格式化为百分比
                        }
                    }
                ],
                series: [
                    {
                        type: "custom",
                        name: data.firstBarName,
                        data: data.showDataFrist,
                        renderItem(params, api) {
                            // 基础坐标

                            //api.value(0)可以获取到对应的Index，value(1)获取到y轴value值
                            //api.coord可以获取到某个点(索引,value)的坐标
                            // console.log("coord", api.coord([api.value(0), 0]))
                            const basicsCoord = api.coord([api.value(0), api.value(1)])
                            // 顶部基础 y 轴,注意：是从顶部空白处到头部的距离
                            const topBasicsYAxis = basicsCoord[1]
                            // console.log("topBasic", topBasicsYAxis)
                            // 基础 x 轴
                            const basicsXAxis = basicsCoord[0]
                            // 底部 y 轴  注意：y轴的距离都是从canvas左上角开始，到当前点位的距离
                            const bottomYAxis = api.coord([api.value(0), 0])[1]

                            // 获取当前图表项的 stack 和 name
                            const { seriesName } = params;
                            return {
                                type: "group",
                                children: [
                                    {
                                        type: "leftShape",
                                        shape: {
                                            topBasicsYAxis,
                                            basicsXAxis,
                                            bottomYAxis,
                                            seriesName  // 将 stack 和 name 传递给 shape
                                        },
                                        style: {
                                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0,
                                                    color: data.mainColorFour,
                                                },
                                                {
                                                    offset: 1,
                                                    color: data.mainColorFourTransparent,
                                                },
                                            ]),
                                            emphasis: {
                                                fill: "yellow", // 鼠标高亮时的填充颜色
                                            },
                                        },
                                    },
                                    {
                                        type: "rightShape",
                                        shape: {
                                            topBasicsYAxis,
                                            basicsXAxis,
                                            bottomYAxis,
                                            seriesName  // 将 stack 和 name 传递给 shape
                                        },
                                        style: {
                                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0,
                                                    color: data.mainColorFirst,
                                                },
                                                {
                                                    offset: 1,
                                                    color: data.mainColorFirstTransparent,
                                                },
                                            ]),
                                        },
                                    },
                                    {
                                        type: "topShape",
                                        shape: {
                                            topBasicsYAxis,
                                            basicsXAxis,
                                            bottomYAxis,
                                            seriesName  // 将 stack 和 name 传递给 shape
                                        },
                                        style: {
                                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0.3,
                                                    color: data.mainColorFirst,
                                                },
                                                {
                                                    offset: 1,
                                                    color: data.mainColorFirst,
                                                },
                                            ]),
                                        },
                                    },
                                ],
                            }
                        },
                    },
                    {
                        type: "custom",
                        name: data.TwoBarName,
                        data: data.showDataTwo,
                        renderItem(params, api) {
                            // 基础坐标

                            //api.value(0)可以获取到对应的Index，value(1)获取到y轴value值
                            //api.coord可以获取到某个点(索引,value)的坐标
                            // console.log("coord", api.coord([api.value(0), 0]))
                            const basicsCoord = api.coord([api.value(0), api.value(1)])
                            // 顶部基础 y 轴,注意：是从顶部空白处到头部的距离
                            const topBasicsYAxis = basicsCoord[1]
                            // console.log("topBasic", topBasicsYAxis)
                            // 基础 x 轴
                            const basicsXAxis = basicsCoord[0]
                            // 底部 y 轴  注意：y轴的距离都是从canvas左上角开始，到当前点位的距离
                            const bottomYAxis = api.coord([api.value(0), 0])[1]

                            // 获取当前图表项的 stack 和 name
                            const { seriesName } = params;
                            return {
                                type: "group",
                                children: [
                                    {
                                        type: "leftShape",
                                        shape: {
                                            topBasicsYAxis,
                                            basicsXAxis,
                                            bottomYAxis,
                                            seriesName  // 将 stack 和 name 传递给 shape
                                        },
                                        style: {
                                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0,
                                                    color: data.mainColorThree,
                                                },
                                                {
                                                    offset: 1,
                                                    color: data.mainColorThreeTransparent,
                                                },
                                            ]),
                                            emphasis: {
                                                fill: "yellow", // 鼠标高亮时的填充颜色
                                            },
                                        },
                                    },
                                    {
                                        type: "rightShape",
                                        shape: {
                                            topBasicsYAxis,
                                            basicsXAxis,
                                            bottomYAxis,
                                            seriesName  // 将 stack 和 name 传递给 shape
                                        },
                                        style: {
                                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0,
                                                    color: data.mainColorTwo,
                                                },
                                                {
                                                    offset: 1,
                                                    color: data.mainColorTwoTransparent,
                                                },
                                            ]),
                                        },
                                    },
                                    {
                                        type: "topShape",
                                        shape: {
                                            topBasicsYAxis,
                                            basicsXAxis,
                                            bottomYAxis,
                                            seriesName  // 将 stack 和 name 传递给 shape
                                        },
                                        style: {
                                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0.3,
                                                    color: data.mainColorTwo,
                                                },
                                                {
                                                    offset: 1,
                                                    color: data.mainColorTwo,
                                                },
                                            ]),
                                        },
                                    },
                                ],
                            }
                        },
                    }
                ],
            }, myChart, echarts, data.TwoBarName)
        },
        getStatisticsList() {
            const setIntervalStatisticsList = () => {
                getStatisticsList().then((data) => {
                    const imgList = [fire, lai, water];
                    data.forEach((elem, idx) => {
                        if (idx === 0 || idx === 1) {
                            elem.image = imgList[0];
                        } else if (idx === 2 || idx === 3) {
                            elem.image = imgList[1];
                        } else {
                            elem.image = imgList[2];
                        }
                    })

                    this.statisticsList = data;
                })
            }


            this.timerData.push(setInterval(setIntervalStatisticsList, 5000));
            setIntervalStatisticsList();
        },
        showGlbModel() {
            getBuildingGeo().then(async (data) => {

                // 创建场景
                const scene = new THREE.Scene();
                this.threeData.scene = scene;
                const threeModel = document.getElementById("threeModel");

                const width = threeModel.offsetWidth;
                const height = threeModel.offsetHeight;

                // 创建相机
                const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
                camera.position.set(0.06, 0.05, 0.22); // 适当调整相机位置

                // 创建 WebGL 渲染器
                const renderer = new THREE.WebGLRenderer({ antialias: true });
                this.threeData.renderer = renderer;
                renderer.setSize(width, height);
                threeModel.appendChild(renderer.domElement);
                // 设置半透明背景色
                renderer.setClearColor(new THREE.Color(0xffffff), 0.01);

                // 添加环境光
                const ambientLight = new THREE.AmbientLight(0xffffff, 1);
                scene.add(ambientLight);

                // 添加方向光
                const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
                directionalLight.position.set(-1.2, 1.34, 4.92);

                const buildingInitScale = 0.001;
                const groundInitScale = 0.001;

                const modelPositionY = 0;
                const modelPositionZ = 0;
                const modelPositionX = 0;


                const fontJson = new Font(wrrhFont);



                // 创建一个组，将平面和文本添加到该组中
                const group = new THREE.Group();
                // 当前的文本 Mesh
                let currentTextMesh = null;
                // 初始隐藏 group
                group.visible = false;

                // 使用 lil-gui 调试相机位置
                // const gui = new GUI();
                // const cameraFolder = gui.addFolder('Camera Position');
                // cameraFolder.add(camera.position, 'x', -50, 50, 0.01).name('X Axis');
                // cameraFolder.add(camera.position, 'y', -50, 50, 0.01).name('Y Axis');
                // cameraFolder.add(camera.position, 'z', -50, 50, 0.01).name('Z Axis');
                // cameraFolder.open();

                // 创建文本的函数
                function createText(font, text) {
                    // 删除旧的文本几何体
                    if (currentTextMesh) {
                        group.remove(currentTextMesh);
                    }
                    const geometry = new TextGeometry(text, {
                        font: font,
                        size: (text.length < 4) ? 0.03 : 0.025,
                        depth: 0.001,  // 设置文本的深度（厚度）
                    });

                    // 设置材质
                    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                    currentTextMesh = new THREE.Mesh(geometry, material);
                    const leftRaduce = text.length * 0.01 + 0.01;
                    // 将新文本添加到场景
                    scene.add(currentTextMesh);
                    currentTextMesh.position.x = -leftRaduce;
                    currentTextMesh.position.y = 0.03;

                    // 调整文本位置
                    return currentTextMesh;
                }


                // 加载 GLB 模型
                const loader = new GLTFLoader();
                loader.load(groundGlb, (gltf) => {
                    const model = gltf.scene;

                    // 计算模型的包围盒
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());

                    // 让模型居中
                    model.position.sub(center);


                    // 默认透明度设置为 1
                    model.traverse((child, idx) => {
                        if (child.isMesh) {
                            console.log(child, "child", idx)
                        }
                    });
                    console.log(model, "model");
                    model.children[7].material = new THREE.MeshStandardMaterial({
                        transparent: true, // 启用透明度
                        opacity: 0      // 设置透明度
                    });


                    // 添加到场景
                    scene.add(model);
                    model.position.set(modelPositionZ, modelPositionY, modelPositionX);
                    // 统一缩放模型（所有轴向缩放为 2 倍）
                    model.scale.set(groundInitScale, groundInitScale, groundInitScale); // 设置缩放为 2x


                    // 让相机看向模型
                    camera.lookAt(0, 0, 0);
                });


                loader.load(buildingGlb, (gltf) => {
                    const model = gltf.scene;
                    // 统一缩放模型（所有轴向缩放为 2 倍）
                    model.scale.set(buildingInitScale, buildingInitScale, buildingInitScale); // 设置缩放为 2x

                    console.log(model.children.length)

                    model.position.set(modelPositionZ, modelPositionY, modelPositionX);

                    let initColorNumber = null;

                    // 默认透明度设置为 1
                    model.traverse((child) => {
                        if (child.isMesh) {
                            if (!initColorNumber) {
                                initColorNumber = child.material.color.getHex()
                            }
                            // 启用透明度
                            child.material.transparent = true;
                            // 设置默认透明度为 1（不透明）
                            child.material.opacity = 1;
                        }
                    });

                    // 为每个模型设置 userData 中的 index 属性
                    model.children.forEach((mesh, index) => {
                        mesh.userData.index = index;
                    });

                    // 添加到场景
                    scene.add(model);

                    const threeModel = document.getElementById("threeModel");
                    // 添加鼠标事件监听器
                    threeModel.addEventListener('mousemove', onMouseMove, false);
                    threeModel.addEventListener('click', onMouseClick, false);

                    // 初始化 Raycaster 和鼠标向量
                    const raycaster = new THREE.Raycaster();  // 定义 raycaster
                    const mouse = new THREE.Vector2();        // 定义 mouse 向量
                    const recordHoverData = [];


                    // 创建 PMREM 生成器
                    const pmremGenerator = new PMREMGenerator(renderer);
                    // 使用 RGBELoader 加载 HDR 环境图
                    new RGBELoader().load(sky_texture, (hdrTexture) => {
                        console.log(hdrTexture, "hdrTexture");
                        // 从 HDR 图像生成 PMREM 贴图
                        const pmremTexture = pmremGenerator.fromEquirectangular(hdrTexture).texture;
                        scene.background = pmremTexture;   // 作为背景图像
                        scene.environment = pmremTexture;  // 作为全局环境贴图

                        setTimeout(() => {
                            animate();
                        }, 3000);

                    });


                    // 加载图片纹理
                    const textureLoader = new THREE.TextureLoader();
                    const texture = textureLoader.load(lingitBg);  // 替换为你的图片路径

                    const initWidthPlane = 0.15;

                    // 创建平面几何体
                    const geometry = new THREE.PlaneGeometry(initWidthPlane, initWidthPlane * 1.3);  // 平面大小 5x5

                    // 使用图片纹理创建材质
                    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });

                    // 创建平面 Mesh
                    const plane = new THREE.Mesh(geometry, material);

                    // 将平面和文本添加到组
                    group.add(plane);

                    // 设置平面为默认隐藏
                    /// plane.visible = false; // 默认为隐藏

                    // 将组添加到场景中
                    scene.add(group);

                    // 获取模型的高度
                    function getModelHeight(model) {
                        const box = new THREE.Box3().setFromObject(model);
                        const height = box.max.y - box.min.y; // 计算高度
                        return height;
                    }

                    function onMouseMove(event) {

                        const rect = threeModel.getBoundingClientRect();
                        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                        // 设置射线从相机发射
                        raycaster.setFromCamera(mouse, camera); // 从相机发射射线

                        // 计算与模型的交点
                        const intersects = raycaster.intersectObject(model, true); // 使用递归方式检测模型所有部分
                        // console.log(intersects, "intersects")
                        if (intersects.length > 0) {
                            recordHoverData.forEach((item) => {
                                item.object.material.opacity = 1; // 设置透明度
                            })
                            const intersection = intersects[0];
                            // 获取 data  楼栋 中的数据数据值;
                            const currentShow = data[intersection.object.userData.index];
                            if (!currentShow) {
                                return;
                            }
                            // 将平面移动到交点的上方 (假设"上方"是 Y 轴上方，增加一个偏移量)
                            group.position.copy(intersection.point);
                            console.log(currentShow, "currentShow", plane.position);

                            // 获取模型的高度
                            const modelHeight = getModelHeight(intersection.object);


                            // 计算相机和物体之间的距离
                            // const distance = camera.position.z - group.position.z;
                            // 根据距离调整物体的缩放比例
                            // const scale = 1 * (distance / 1);  // 使用50作为距离参考值，这可以根据需要调整
                            // group.scale.set(scale, scale, scale);  // 更新物体的缩放
                            group.position.y += modelHeight / 2 + initWidthPlane / 2;  // 向上偏移，确保平面位于模型的顶部上方

                            const textMesh = createText(fontJson, currentShow);


                            group.add(textMesh);

                            // 如果鼠标悬停在模型上，改变颜色为红色
                            const mashObject = intersects[0].object;

                            const originalMaterial = mashObject.material; // 获取原始材质
                            const newMaterial = originalMaterial.clone(); // 克隆材质

                            newMaterial.transparent = true; // 启用透明
                            newMaterial.opacity = 0.5; // 设置透明度

                            mashObject.material = newMaterial; // 将新材质赋值给网格对象

                            group.visible = true;
                            recordHoverData.push(intersects[0]);
                        } else {
                            group.visible = false;
                            // 如果鼠标没有悬停在任何地方，恢复透明度为 1
                            model.traverse((child) => {
                                if (child.isMesh && initColorNumber != child.material.color.getHex()) {
                                    child.material.opacity = 1; // 设置透明度
                                }
                            });
                        }
                    }


                    // 如果你想处理鼠标点击事件
                    function onMouseClick(event) {
                        // 处理点击事件
                        const intersects = raycaster.intersectObject(model, true);
                        if (intersects.length > 0) {
                            console.log("模型被点击！", event);
                        }
                    }

                });


                // 添加 OrbitControls 交互控制器
                const controls = new OrbitControls(camera, renderer.domElement);
                this.threeData.controls = controls;


                // 自动获取相机与中心点 (0, 0, 0) 的距离和角度
                let angle = 0; // 初始角度
                let radius = camera.position.length(); // 自动获取初始半径（相机到中心点的距离）

                // 根据相机的初始位置计算角度
                let dx = camera.position.x;
                let dz = camera.position.z;
                angle = Math.atan2(dz, dx); // 计算初始角度（相机在水平面上的角度）


                let autoRun = true;

                threeModel.addEventListener('mouseenter', () => {
                    console.log('鼠标进入');
                    autoRun = false;
                });

                threeModel.addEventListener('mouseleave', () => {
                    console.log('鼠标离开');
                    autoRun = true;
                    dx = camera.position.x;
                    dz = camera.position.z;
                    angle = Math.atan2(dz, dx); // 计算初始角度（相机在水平面上的角度）
                    radius = camera.position.length(); // 自动获取初始半径（相机到中心点的距离）
                });
                // 动画循环
                const animate = () => {
                    this.threeData.frame = requestAnimationFrame(animate);
                    if(autoRun){
                        // 计算相机的位置，使其围绕原点旋转
                        angle += 0.01; // 旋转速度
                        camera.position.x = radius * Math.cos(angle); // 根据角度计算 x 位置
                        camera.position.z = radius * Math.sin(angle); // 根据角度计算 z 位置
                    }

                    controls.update(); // 让 OrbitControls 进行平滑阻尼处理
                    renderer.render(scene, camera);
                }


            });

        }
    },

}
</script>

<style>
.mask-bg-left {
    background: linear-gradient(to right,
            rgba(0, 0, 0, 1) 0px,
            rgba(0, 0, 0, 0.8) 400px,
            rgba(0, 0, 0, 0) 600px);
    position: absolute;
    left: 0;
    width: 600px;
    z-index: 9;
    top: -76px;
    height: calc(100% + 76px);
}

.mask-bg-right {
    background: linear-gradient(to right,
            rgba(0, 0, 0, 0) 0px,
            rgba(0, 0, 0, 0.8) 200px,
            rgba(0, 0, 0, 1) 600px);
    position: absolute;
    right: 0;
    width: 600px;
    top: -76px;
    z-index: 9;
    height: calc(100% + 76px);
}

.border-left {
    position: absolute;
    left: 0;
    top: 44px;
    height: calc(100% - 164px);
    width: 500px;
    background-image: url("@/assets/image/bg.png");
    background-repeat: no-repeat;
    background-position: 0 -120px;
    z-index: 10;
}

.border-top {
    position: absolute;
    left: 0;
    top: -76px;
    height: 120px;
    width: 100%;
    background-image: url("@/assets/image/bg.png");
    background-repeat: no-repeat;
    background-position: 0 0;
    z-index: 10;
}

.border-right {
    position: absolute;
    right: 0;
    top: 44px;
    height: calc(100% - 164px);
    width: 500px;
    background-image: url("@/assets/image/bg.png");
    background-repeat: no-repeat;
    background-position: right -120px;
    z-index: 10;
}

.border-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 120px;
    width: 100%;
    background-image: url("@/assets/image/bg.png");
    background-repeat: no-repeat;
    background-position: 0 bottom;
    z-index: 10;
}

.energy-ranking {
    width: 400px;
    height: 280px;
}

.energy-title {
    margin-bottom: 15px;
}

.bar {
    width: 420px;
    height: 218px;
}

.header {
    position: relative;
    z-index: 100;
}

.header-box {
    height: 76px;
    display: flex;
    justify-content: space-between;
    color: #fff;
    box-sizing: border-box;
    padding-top: 15px;

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
    height: calc(1050px - 76px);
    box-sizing: border-box;
}

.main-model {}

.three-model {
    position: absolute;
    left: 0;
    top: -86px;
    bottom: 0;
    right: 0;
}

.weather-data {
    height: 180px;
    display: flex;
    justify-content: space-around;
}

.weather-data-item {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.weather-item-icon {
    font-size: 40px;
    margin-bottom: 15px;
    color: #fff;
}

.weather-item-tip {
    color: #ffffff;
    margin-bottom: 5px;
    font-size: 12px;
}

.weather-item-temperature {
    font-size: 16px;
    color: #FFF6DD;
    font-weight: bold;
}

.main-left {
    width: 400px;
    position: relative;
    z-index: 100;
}

.main-right {
    width: 400px;
    position: relative;
    z-index: 100;
}

.data-pie {
    width: 100%;
    height: 220px;
}

.data-m-pie {
    height: 300px;
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



.statistics-list {
    padding: 5px;
    padding-top: 25px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.statistics-img {
    width: 80px;
    height: 80px;
}

.statistics-item {
    margin: 5px 0;
    display: flex;
    align-items: center;
    width: 50%;
}

.statistics-text-tip {
    font-size: 15px;
    color: #ECF8FF;
    margin-bottom: 10px;
    white-space: nowrap;
    /* 禁止换行 */
}

.statistics-text-val {
    font-size: 18px;
    color: #6BDCFF;
    white-space: nowrap;
    /* 禁止换行 */
}

.statistics-unit {
    font-size: 12px;
    white-space: nowrap;
    /* 禁止换行 */
}
</style>