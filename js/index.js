$(function() {
  var page = {
    init() {
      page.listen();
    },
    listen: function() {
      page.queryDate();
      page.myChart3();
    },
    queryDate: function() {
      //原因分析
      $.ajax({
        url:
          "http://192.168.1.240:8080/dfbinterface/mobile/gisshow/GetGisCountData4",
        type: "get",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(data) {
          page.myChart1(data.result[0]);
        },
        error: function(err) {}
      });
      //数据详情
      $.ajax({
        url:
          "http://192.168.1.240:8080/dfbinterface/mobile/gisshow/GetGisCountData5",
        type: "get",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(data) {
          page.table(data.result);
        },
        error: function(err) {}
      });
      //折线图
      $.ajax({
        url:
          "http://192.168.1.240:8080/dfbinterface/mobile/gisshow/GetGisCountData6",
        type: "get",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(data) {
          page.myChart2(data.result);
        },
        error: function(err) {}
      });
    },
    table: function(data) {
      var tabledata = [];
      var tbody = "";
      for (let i = 0; i < data.length; i++) {
        tbody +=
          "<tr><td>" +
          data[i].areaname +
          "</td><td>" +
          data[i].datacount +
          "</td><td>" +
          data[i].solved +
          "</td><td>" +
          data[i].percent +
          "</td></tr>";
      }
      $("#tbody").html(tbody);
    },
    myChart1: function(data) {
      var datas = [];
      for (const key in data) {
        datas.unshift(data[key]);
      }
      var dataname = [],
        datacount = [];
      for (let i = 0; i < datas.length; i++) {
        dataname.push(datas[i].dataname);
        if (datas[i].color == undefined) {
          datas[i].color = "";
        }
        datacount.push({
          value: datas[i].datacount,
          name: datas[i].dataname,
          itemStyle: { color: datas[i].color }
        });
      }
      console.log(datacount);
      var myChart1 = echarts.init(document.getElementById("main1"));
      option1 = {
        title: {
          text: "2018年度深圳市地面坍塌原因分析",
          textStyle: {
            color: "#fefefe",
            fontSize: "22",
            verticalAlign: "bottom",
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: "0",
          top: "10%",
          data: dataname,
          itemWidth: 40,
          itemHeight: 26,
          itemGap: 30,
          textStyle: {
            color: "#ffffff"
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["20%", "70%"],
            center: ["30%", "48%"],
            label: {
              normal: {
                position: "inner",
                formatter: "{d}%"
              }
            },
            data: datacount,
            itemStyle: {
              emphasis: {
                shadowBlur: 50,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                borderColor: "#171C3C",
                borderWidth: 2
              }
            }
          }
        ]
      };
      myChart1.setOption(option1);
    },
    myChart2: function(data) {
      console.log(data);
      var yearsArr = [],
        datacountArr = [],
        solvedArr = [];
      for (let i = 0; i < data.length; i++) {
        yearsArr.unshift(data[i].years);
        datacountArr.unshift(data[i].datacount);
        solvedArr.unshift(data[i].solved);
      }
      var myChart2 = echarts.init(document.getElementById("main2"));
      option2 = {
        title: {
          text: "近6年深圳地面坍塌趋势分析",
          textStyle: {
            color: "#efefef",
            fontSize: "22",
            verticalAlign: "bottom",
            fontWeight: "normal"
          }
        },
        xAxis: {
          type: "category",
          data: yearsArr,
          name: "年份",
          nameTextStyle: {
            color: "#ffffff",
            align: "right"
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#116DFF",
              width: "1"
            }
          }
        },
        yAxis: {
          type: "value",
          name: "灾害点情况",
          nameLocation: "end",
          nameTextStyle: {
            color: "#ffffff",
            align: "left"
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#116DFF",
              width: "1"
            }
          }
        },
        legend: {
          //图例组件
          data: ["灾害点", "已治理"],
          top: "0%",
          right: "0%",
          textStyle: {
            color: "#efefef"
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "2%",
          top: "20%",
          containLabel: true
        },
        tooltip: {
          type: "line",
          lineStyle: {
            color: "#48b",
            width: 2,
            type: "solid"
          },
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            data: datacountArr,
            type: "line",
            name: "灾害点",
            smooth: true,
            itemStyle: { color: "#EF093A" }
          },
          {
            data: solvedArr,
            type: "line",
            name: "已治理",
            smooth: true,
            itemStyle: { color: "#19AAA2" }
          }
        ]
      };
      myChart2.setOption(option2);
    },
    myChart3: function() {
      var myChart3 = echarts.init(document.getElementById("main3"));
      myChart3.showLoading();
      $.get("js/HK.json", function(geoJson) {
        myChart3.hideLoading();
        echarts.registerMap("HK", geoJson);
        myChart3.setOption(
          option3 = {
            title: {
              text: "",
              subtext: "",
              sublink: 
                "http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12"
            },
            tooltip: {
              trigger: "item",
              formatter: "{b}<br/>{c} ( / km2)"
            },
            visualMap: {
              min: 800,
              max: 50000,
              text: ["High", "Low"],
              realtime: false,
              calculable: true,
              inRange: {
                color: ["red", "green", "blue"]
              },
              textStyle: {
                color: "#efefef"
              }
            },
            series: [
              {
                name: "香港18区人口密度",
                type: "map",
                mapType: "HK", // 自定义扩展图表类型
                itemStyle: {
                  normal: { label: { show: true } },
                  emphasis: { label: { show: true } }
                },
                data: [
                  { name: "南山区", value: 20057.34 },
                  { name: "盐田区", value: 15477.48 },
                  { name: "宝安区", value: 31686.1 },
                  { name: "福田区", value: 6992.6 },
                  { name: "龙岗区", value: 44045.49 },
                  { name: "罗湖区", value: 40689.64 },
                  { name: "龙华区", value: 40689.64 }
                ],
                // 自定义名称映射
                nameMap: {
                  "Central and Western": "南山区",
                  Eastern: "东区",
                  Islands: "离岛",
                  "Kowloon City": "九龙城",
                  "Kwai Tsing": "葵青",
                  "Kwun Tong": "观塘",
                  North: "北区",
                  "Sai Kung": "西贡",
                  "Sha Tin": "沙田",
                  "Sham Shui Po": "深水埗",
                  Southern: "南区",
                  "Tai Po": "大埔",
                  "Tsuen Wan": "荃湾",
                  "Tuen Mun": "屯门",
                  "Wan Chai": "湾仔",
                  "Wong Tai Sin": "黄大仙",
                  "Yau Tsim Mong": "油尖旺",
                  "Yuen Long": "元朗"
                }
              }
            ]
          })
      });
    }
  };
  page.init();
});