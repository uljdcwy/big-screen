import Mock from 'mockjs'

// 模拟用户数据
Mock.mock('/api/getHotRanking', 'get', {
    code: 200,
    message: 'Success',
    data: {
        barName: '热耗',
        xData: ["敬老院", "实验高中", "一中", "宜春小区", "广泽", "招待所"],
        age: '@integer(18, 60)',
        yData: [{
            barName: "百分比",
            data: [20, 90, 30, 30, 90, 30]
        }, {
            barName: "室温",
            data: [30, 50, 30, 30, 30, 30]
        }]
    }
})

// 模拟用户数据
Mock.mock('/api/getElectricityRanking', 'get', {
    code: 200,
    message: 'Success',
    data: {
        barName: '电耗',
        xData: ["敬老院", "实验高中", "一中", "宜春小区", "广泽", "招待所"],
        age: '@integer(18, 60)',
        yData: [{
            barName: "百分比",
            data: [20, 90, 30, 30, 90, 30]
        }, {
            barName: "室温",
            data: [30, 50, 30, 30, 30, 30]
        }]
    }
})

// 模拟用户数据
Mock.mock('/api/getWaterRanking', 'get', {
    code: 200,
    message: 'Success',
    data: {
        barName: '水耗',
        xData: ["敬老院", "实验高中", "一中", "宜春小区", "广泽", "招待所"],
        age: '@integer(18, 60)',
        yData: [{
            barName: "百分比",
            data: [20, 90, 30, 30, 90, 30]
        }, {
            barName: "室温",
            data: [30, 50, 30, 30, 30, 30]
        }]
    }
})

// 模拟用户数据
Mock.mock('/api/getDrawPie', 'get', {
    code: 200,
    message: 'Success',
    data: [
        {
            name: "已派单",
            value: 116,
            itemStyle: {
                color: "#1EF0D7",
                opacity: 0.5, // 默认不透明度
            },
        },
        {
            name: "处理中",
            value: 8,
            itemStyle: {
                color: "#3D67FF",
                opacity: 0.5, // 默认不透明度
            },
        },
        {
            name: "已完成",
            value: 5,
            itemStyle: {
                color: "#47BC79",
                opacity: 0.5, // 默认不透明度
            },
        },
        {
            name: "已回访",
            value: 1,
            itemStyle: {
                color: "#FFC615",
                opacity: 0.5, // 默认不透明度
            },
        },
        {
            name: "已超时",
            value: 2,
            itemStyle: {
                color: "#8C3EE6",
                opacity: 0.5, // 默认不透明度
            },
        },
        {
            name: "满意度",
            value: 0,
            itemStyle: {
                color: "#34B4FF",
                opacity: 0.5, // 默认不透明度
            },
        }
    ]
});


// 模拟用户数据
Mock.mock('/api/getDrawMPie', 'get', {
    code: 200,
    message: 'Success',
    data: [
        {
            pieName: "客诉",
            centerName: "客诉\n分类",
            data: {
                "投诉": 10,
                "报修": 10,
                "报停": 30,
                "资询": 30,
                "其他": 20,
            },
            dataColor: {
                "投诉": ['#FFBF7F', '#FFD565'],
                "报修": ['#398EEC', '#398EEC'],
                "报停": ['#55F7D4', '#45B7EF'],
                "资询": ['#70D19D', '#90E987'],
                "其他": ['#BCCFFD', '#5A7ED8']
            }
        },
        {
            pieName: "来源",
            centerName: "来源\n渠道",
            data: {
                "来电": 20,
                "微信": 20,
                "线下": 30,
                "其他": 20
            },
            dataColor: {
                "来电": ['#FFBF7F', '#FFD664'],
                "微信": ['#54F6D3', '#46B8EF'],
                "线下": ['#70D29C', '#91E987'],
                "其他": ['#BCCFFD', '#5479D6'],
            }
        },
        {
            pieName: "进展",
            centerName: "进展\n状态",
            data: {
                "已完成": 20,
                "已派单": 20,
                "处理中": 30,
                "已回访": 20
            },
            dataColor: {
                "已完成": ['#FFBF7F', '#FFD664'],
                "已派单": ['#54F6D3', '#46B8EF'],
                "处理中": ['#70D29C', '#91E987'],
                "已回访": ['#BCCFFD', '#5479D6']
            }
        }
    ]
});

// 模拟用户数据
Mock.mock('/api/getStatisticsList', 'get', {
    code: 200,
    message: 'Success',
    data: [{
        tip: "本季热耗",
        count: "763",
        unit: "（万GJ）",
    }, {
        tip: "热单耗",
        count: "28.39",
        unit: "（W/m³）",
    },
    {
        tip: "本季电耗",
        count: "393.7",
        unit: "（万kWh）",
    }, {
        tip: "电单耗",
        count: "0.91",
        unit: "（kWh/㎡·a）",
    },
    {
        tip: "本季水耗",
        count: "11.36",
        unit: "（万t）",
    }, {
        tip: "水单耗",
        count: "26.35",
        unit: "（L/㎡·a）",
    }
    ]
});


// 模拟用户数据
Mock.mock('/api/getAllDataList', 'get', {
    code: 200,
    message: 'Success',
    data: [
        {
            tip: "用户数",
            count: "2,763",
            unit: "",
        }, {
            tip: "开栓数",
            count: "335",
            unit: "",
        },
        {
            tip: "供热面积",
            count: "34773",
            unit: "",
        }, {
            tip: "累计数量",
            count: "26",
            unit: "",
        },
        {
            tip: "累计水量",
            count: "17",
            unit: "",
        }, {
            tip: "单位面积能耗",
            count: "2.99",
            unit: "",
        }
    ]
});


// 模拟用户数据
Mock.mock('/api/getDrawWave', 'get', {
    code: 200,
    message: 'Success',
    data: [
        [820, 932, -301, 934, 1290, 1330],
        [120, 132, 101, 134, 290, 230]
    ]
});


// 模拟用户数据
Mock.mock('/api/getUnitInfoList', 'get', {
    code: 200,
    message: 'Success',
    data: [
        {
            position: "低区",
            roomCount: 12,
            openCount: 10,
            noodle: 790,
        },
        {
            position: "高区",
            roomCount: 11,
            openCount: 27,
            noodle: 2253,
        }
    ]
});



// 模拟用户数据
Mock.mock('/api/getHotDatList', 'get', {
    code: 200,
    message: 'Success',
    data: [
        {
            text: "总户数",
            count: "142"
        }, {
            text: "开栓数",
            count: "136"
        }, {
            text: "总面积",
            count: "11247"
        }, {
            text: "开栓面积",
            count: "10025"
        }, {
            text: "功率",
            count: "0"
        }, {
            text: "流量",
            count: "0"
        }, {
            text: "平均回温",
            count: "24.2"
        }, {
            text: "平均室温",
            count: "20"
        },
    ]
});



// 模拟用户数据
Mock.mock('/api/getDrawPoint', 'get', {
    code: 200,
    message: 'Success',
    data: [
        [3, 20],
        [9, 10],
        [5, 11],
        [13, 15],
        [15, 19],
        [17, 19],
        [19, 15],
        [21, 10],
        [23, 8],
        [25, 22],
        [26, 25]
    ]
});


// 模拟用户数据
Mock.mock('/api/getNotifyInfo', 'get', {
    code: 200,
    message: 'Success',
    data: [{
        text: "重要公告",
        time: "2025-03-06 19:09"
    },
    {
        text: "供热通知",
        time: "2025-03-06 19:09"
    },
    {
        text: "供热时间调整",
        time: "2025-03-06 22:09"
    }
    ]
});


// 模拟用户数据
Mock.mock('/api/getBuildingInfo', 'get', {
    code: 200,
    message: 'Success',
    data: {
        buildingInfo: [
            {
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: false,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: false,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: false,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            },{
                buildingRoomCount: [{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                },{
                    roomNumber: "1074",
                    temperatureSensing: true,
                    roomCode: "10912354452285",
                    roomInfo: [
                        {
                            label1: "阀门开度：",
                            value1: "50",
                            label2: "室温（℃）：",
                            value2: "10"
                        },
                        {
                            label1: "供温：",
                            value1: "25.4",
                            label2: "回温（℃）：",
                            value2: "20"
                        },
                        {
                            label1: "流速（m³/h）：",
                            value1: "0.25",
                            label2: "热功率（kwh）：",
                            value2: "0"
                        }
                    ]
                }]
            }
        ],
        buildingTitle: "小区名字 1栋 1单元 低区"
    }
});


const arrData = new Array(2835).fill("5栋");
arrData.forEach((item,idx) => {
    item
    if(idx % 2){
        arrData[idx] = "10栋"
    }
})
// 模拟用户数据
Mock.mock('/api/getBuildingGeo', 'get', {
    code: 200,
    message: 'Success',
    data: arrData
});



export default Mock