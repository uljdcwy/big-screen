export const setBar = (option, myChart, echarts, name, width = 6) => {
    let init = 8;
    if (!echarts.graphic.leftShape) {
        const leftShape = echarts.graphic.extendShape({
            buildPath(ctx, shape) {
                const { topBasicsYAxis, bottomYAxis, basicsXAxis, seriesName } = shape
                // 侧面宽度
                const WIDTH = width
                // 斜角高度
                const OBLIQUE_ANGLE_HEIGHT = width / 2;
                let offset;
                if (seriesName == name) {
                    offset = init;
                } else {
                    offset = -init;
                }

                const p1 = [basicsXAxis - WIDTH + offset, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT]
                const p2 = [basicsXAxis - WIDTH + offset, bottomYAxis]
                const p3 = [basicsXAxis + offset, bottomYAxis]
                const p4 = [basicsXAxis + offset, topBasicsYAxis]

                ctx.moveTo(p1[0], p1[1])
                ctx.lineTo(p2[0], p2[1])
                ctx.lineTo(p3[0], p3[1])
                ctx.lineTo(p4[0], p4[1])
            },
        })
        const rightShape = echarts.graphic.extendShape({
            buildPath(ctx, shape) {
                const { topBasicsYAxis, bottomYAxis, basicsXAxis, seriesName } = shape
                // 侧面宽度
                const WIDTH = width
                // 斜角高度
                const OBLIQUE_ANGLE_HEIGHT = width / 2;
                let offset;
                if (seriesName == name) {
                    offset = init;
                } else {
                    offset = -init;
                }

                const p1 = [basicsXAxis + offset, topBasicsYAxis]
                const p2 = [basicsXAxis + offset, bottomYAxis]
                const p3 = [basicsXAxis + WIDTH + offset, bottomYAxis]
                const p4 = [basicsXAxis + WIDTH + offset, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT]

                ctx.moveTo(p1[0], p1[1])
                ctx.lineTo(p2[0], p2[1])
                ctx.lineTo(p3[0], p3[1])
                ctx.lineTo(p4[0], p4[1])
            },
        })

        const topShape = echarts.graphic.extendShape({
            buildPath(ctx, shape) {
                const { topBasicsYAxis, basicsXAxis, seriesName } = shape
                // 侧面宽度
                const WIDTH = width
                // 斜角高度
                const OBLIQUE_ANGLE_HEIGHT = width / 2
                let offset;
                if (seriesName == name) {
                    offset = init;
                } else {
                    offset = -init;
                }

                const p1 = [basicsXAxis + offset, topBasicsYAxis]
                const p2 = [basicsXAxis + WIDTH + offset, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT]
                const p3 = [basicsXAxis + offset, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT * 2]
                const p4 = [basicsXAxis - WIDTH + offset, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT]

                ctx.moveTo(p1[0], p1[1])
                ctx.lineTo(p2[0], p2[1])
                ctx.lineTo(p3[0], p3[1])
                ctx.lineTo(p4[0], p4[1])
            },
        })

        echarts.graphic.registerShape("leftShape", leftShape)
        echarts.graphic.registerShape("rightShape", rightShape)
        echarts.graphic.registerShape("topShape", topShape)    
    }
    myChart.setOption(option)
}

export const setPie = (chart, data) => {
    const optionsData = data.optionsData;
    // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    function getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        h
    ) {
        // 计算
        let midRatio = (startRatio + endRatio) / 2;

        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;

        // 如果只有一个扇形，则不实现选中效果。
        // if (startRatio === 0 && endRatio === 1) {
        //     isSelected = false;
        // }
        isSelected = false;
        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== "undefined" ? k : 1 / 3;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
        let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {
            u: {
                min: -Math.PI,
                max: Math.PI * 3,
                step: Math.PI / 32,
            },

            v: {
                min: 0,
                max: Math.PI * 2,
                step: Math.PI / 20,
            },

            x: function (u, v) {
                if (u < startRadian) {
                    return (
                        offsetX +
                        Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                    );
                }
                if (u > endRadian) {
                    return (
                        offsetX +
                        Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                    );
                }
                return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            y: function (u, v) {
                if (u < startRadian) {
                    return (
                        offsetY +
                        Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                    );
                }
                if (u > endRadian) {
                    return (
                        offsetY +
                        Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                    );
                }
                return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            z: function (u, v) {
                if (u < -Math.PI * 0.5) {
                    return Math.sin(u);
                }
                if (u > Math.PI * 2.5) {
                    return Math.sin(u) * h * 0.1;
                }
                return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
            },
        };
    }

    // 生成模拟 3D 饼图的配置项
    function getPie3D(pieData, internalDiameterRatio) {
        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let legendData = [];
        let k =
            typeof internalDiameterRatio !== "undefined"
                ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
                : 1 / 3;

        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
            sumValue += pieData[i].value;

            let seriesItem = {
                name:
                    typeof pieData[i].name === "undefined"
                        ? `series${i}`
                        : pieData[i].name,
                type: "surface",
                parametric: true,
                wireframe: {
                    show: false,
                },
                pieData: pieData[i],
                pieStatus: {
                    selected: false,
                    hovered: false,
                    k: 1 / 10,
                },
            };

            if (typeof pieData[i].itemStyle != "undefined") {
                let itemStyle = {};

                typeof pieData[i].itemStyle.color != "undefined"
                    ? (itemStyle.color = pieData[i].itemStyle.color)
                    : null;
                typeof pieData[i].itemStyle.opacity != "undefined"
                    ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                    : null;

                seriesItem.itemStyle = itemStyle;
            }
            series.push(seriesItem);
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
            endValue = startValue + series[i].pieData.value;

            series[i].pieData.startRatio = startValue / sumValue;
            series[i].pieData.endRatio = endValue / sumValue;
            series[i].parametricEquation = getParametricEquation(
                series[i].pieData.startRatio,
                series[i].pieData.endRatio,
                false,
                false,
                k,
                series[i].pieData.value
            );

            startValue = endValue;

            legendData.push(series[i].name);
        }

        return series;
    }

    const series = getPie3D(data.optionsData, 0.8);

    // 中心自定义文字
    const centerText = {
        type: "text",
        left: "64px",
        top: "80px",
        style: {
            text: data.allCount + "\n工单总计", // 这里是你要显示的文字
            font: "bold 20px Arial", // 字体样式和大小
            fill: "#fff", // 文字颜色
            textAlign: "center", // 水平居中
            textVerticalAlign: "middle", // 垂直居中
        },
    };

    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    const option = {
        legend: {
            show: true,
            orient: 'horizontal',  // 这里又定义了一次 orient
            tooltip: {
                show: true,
            },
            data: data.legendList,
            top: "center",
            itemGap: 10,
            itemHeight: 8,
            itemWidth: 8,
            align: "left",
            left: "46%",
            textStyle: {
                color: "#fff",
                fontSize: 14,
                lineHeight: 16,
                rich: {
                    name: {
                        width: 30,
                        fontSize: 12,
                        color: "#B0D8DF",
                    },
                    value: {
                        width: 16,
                        fontSize: 12,
                        padding: [0, 5, 0, 5],
                        color: "#fff",
                    },
                    rate: {
                        width: 32,
                        fontSize: 14,
                        color: "#fff",
                    },
                },
            },
            formatter: function (name) {
                let total = 0;
                let target;
                for (let i = 0; i < optionsData.length; i++) {
                    total += optionsData[i].value;
                    if (optionsData[i].name === name) {
                        target = optionsData[i].value;
                    }
                }
                let arr = [
                    "{name|" + name + "}",
                    "{value|" + (target || '') + "}\n",
                    "{rate|" + (((target / total) * 100) ? ((target / total) * 100).toFixed(1) : '--') + "}%    ",
                ];
                return arr.join("  ");
            },
        },
        animation: true,
        labelLine: {
            show: true,
            lineStyle: {
                color: "#7BC0CB",
            },
            normal: {
                show: true,
                length: 10,
                length2: 10,
            },
        },
        label: {
            show: false,
            position: "outside",
            formatter: "{b} \n{c}\n{d}%",
            textStyle: {
                color: "rgba(176, 216, 223, 1)",
                fontSize: 12,
            },
        },
        xAxis3D: {
            min: -1,
            max: 1,
        },
        yAxis3D: {
            min: -1,
            max: 1,
        },
        zAxis3D: {
            min: -1,
            max: 1,
        },
        grid3D: {
            show: false,
            boxHeight: 1,
            left: "0%",
            top: -10,
            width: "50%",
            viewControl: {
                distance: 180,
                alpha: 30,
                beta: 15,
                autoRotate: false, // 自动旋转
                rotateSensitivity: 0, // 禁止旋转
                zoomSensitivity: 0, // 禁止缩放
                panSensitivity: 0, // 禁止平移
            },
        },
        series: series,
        graphic: [centerText], // 将自定义文字作为 graphic 添加
    };

    chart.setOption(option);
}

export const drawMPie = (data, chart, echarts) => {



    // 渐变颜色定义
    const createGradient = (color1, color2) => {
        return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: color1 },
            { offset: 1, color: color2 }
        ]);
    };

    const legendData = [];
    const seriesData = [];

    data.forEach((item, idx) => {
        const itemData = [];
        const itemVal = [];
        for (let key in item.data) {
            itemData.push(key);
            itemVal.push({
                value: 10,
                name: key,
                itemStyle: {
                    color: createGradient(...(item.dataColor[key])),
                    borderWidth: 5,
                    borderColor: 'transption'
                }
            })
        }

        legendData.push({
            data: itemData,
            top: "48%",
            itemGap: 10,
            itemHeight: 8,
            itemWidth: 8,
            itemStyle: {
                borderWidth: 0,  // 去掉边框
                fill: 'transparent'  // 设置填充颜色为透明
            },
            left: (idx * 30) + (5 * idx) + "%",      // 将 legend 放在左侧区域
            orient: 'vertical',
            textStyle: {
                color: "#fff",
                rich: {
                    name: {
                        width: 45,
                        fontSize: 12,
                        color: "#aaaaaa",
                        padding: [0, 0, 0, 5],
                    },
                    val: {
                        width: 24,
                        fontSize: 14,
                        color: "#ffffff",
                    },
                    unit: {
                        width: 6,
                        fontSize: 12,
                        color: "#aaaaaa",
                    },
                },
            },
            formatter: function (name) {
                // "{name|" + name + "}",
                return `{name|${name}} {val|${item.data[name]}}{unit|%}`
            }
        });
        let leftVal = "";
        if (idx == 0) {
            leftVal = "15%"
        } else if (idx == 1) {
            leftVal = "50%"
        } else {
            leftVal = "85%"
        }


        seriesData.push({
            name: item.pieName,
            type: 'pie',
            radius: ['24%', '38%'],  // 设置内外半径
            center: [leftVal, '19%'],  // 第一个环形图的位置
            avoidLabelOverlap: false,     // 第二个环形图位置
            label: {
                show: true,
                position: 'center',
                formatter: item.centerName,
                textStyle: {
                    fontSize: 15,
                    lineHeight: 20,
                    fontWeight: 'bold',
                    color: '#aaaaaa'
                },
                emphasis: {         // 为鼠标悬浮时设置同样的显示效果
                    show: true,
                    textStyle: {
                        fontSize: 15,
                        fontWeight: 'bold',
                        lineHeight: 20,
                        color: '#aaaaaa'
                    }
                }
            },
            emphasis: {
                label: { show: false }
            },
            animation: false,  // 禁用本系列动画
            data: itemVal
        })
    });


    // 配置选项
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: legendData,
        series: seriesData
    };

    chart.setOption(option);
}

export const drawLine = (data, myChart) => {

    const labelData = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];

    const lineData = data
    const seriesData = [];
    const colorData = ['RGBA(64, 193, 255, 1)', 'RGBA(128, 151, 155, 1)'];
    const yAxisData = [];

    const minVal = Math.min(...lineData.flat());

    lineData.forEach((item, idx) => {
        let yAxisIndex = 0, positionStr = "", showStatus = true;
        if (idx == 1) {
            yAxisIndex = 1;
            positionStr = "right";
            showStatus = false;
        }
        seriesData.push({
            data: item,
            type: 'line',
            smooth: true,  // 设置平滑的折线
            areaStyle: {
                color: colorData[idx],  // 定义填充颜色
                origin: minVal,
                // 定义渐变填充
                type: 'linear',
                global: false // 是否使用全局渐变
            },
            itemStyle: {
                color: colorData[idx]  // 设置折线颜色
            },
            yAxisIndex: yAxisIndex, // 使用右侧 y 轴
            symbol: 'none'  // 不显示点
        });
        yAxisData.push({
            type: 'value', // 右侧 y 轴,,
            splitLine: {
                show: showStatus,
                lineStyle: {
                    type: 'dashed',  // 设置虚线
                    width: 2,        // 设置线条宽度
                    color: '#666' // 设置线条颜色
                }
            },  // 不显示Y轴网格线
            position: positionStr, // 将右侧 y 轴放置在右边
            min: Math.min(...item) // 设置 Y 轴的最小值为 0
        });

    })

    const option = {
        animation: false, // 全局禁用动画
        grid: {
            top: '6%',  // 设置图表顶部的间距
            bottom: '10%' // 设置图表底部的间距
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: labelData,
            axisLine: { // 靠近 0 的底线样式
                lineStyle: {
                    type: "dashed",
                    color: "rgba(0,0,0,0)"
                }
            },
            axisLabel: { // 设置X轴的标签的颜色 ，当底线被设置为 透明 时标签也会 显示
              show: true,  // 显示 X 轴的标签
              textStyle: {
                color: '#666'  // 设置标签的颜色
              }
            }
        },
        yAxis: yAxisData,
        series: seriesData
    };

    option && myChart.setOption(option);
}

export const drawPoint = (data, myChart, echarts) => {
      // 配置项
      var option = {
        animation: false, // 全局禁用动画
        grid: {
          top: '6%',  // 设置图表顶部的间距
          bottom: '10%', // 设置图表底部的间距
          left: "8%",
          right: "8%"
        },
        xAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(0,0,0,0)"
            }
          },
          axisLabel: {
            show: true,  // 显示 X 轴的标签
            textStyle: {
              color: '#666'  // 设置标签的颜色
            }
          },
          splitLine: { show: false }  // 不显示Y轴网格线
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(0,0,0,0)"
            }
          },
          axisLabel: {
            show: true,  // 显示 X 轴的标签
            textStyle: {
              color: '#666'  // 设置标签的颜色
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',  // 设置虚线
              width: 2,        // 设置线条宽度
              color: '#222' // 设置线条颜色
            }
          },  // 不显示Y轴网格线
        },
        series: [{
          symbolSize: 18, // 每个点的大小
          itemStyle: {
            color: function () {
              return new echarts.graphic.LinearGradient(0, 0, 1, 1, [ // 设置渐变方向和颜色
                { offset: 0, color: '#A1D0FA' },  // 渐变起始色：番茄红
                { offset: 1, color: '#0B5FD1' }   // 渐变结束色：蓝色
              ]);
            }
          },
          data: data,
          type: 'scatter'
        }]
      };

      // 使用配置项设置图表
      myChart.setOption(option);
}