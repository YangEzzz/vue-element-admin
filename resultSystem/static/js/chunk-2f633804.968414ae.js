(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f633804"],{"0525":function(t,e,a){},"07a8":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"text-align":"center"}},[a("el-select",{staticClass:"filter-item",staticStyle:{margin:"20px auto 20px"},attrs:{placeholder:"选择科目"},on:{change:t.handleFilter},model:{value:t.subject,callback:function(e){t.subject=e},expression:"subject"}},t._l(t.ChartCategoryList,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.valueGrade,callback:function(e){t.valueGrade=e},expression:"valueGrade"}},t._l(t.grade,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),a("v-chart",{staticStyle:{height:"440px",width:"100%",margin:"auto"},attrs:{option:t.options,autoresize:"",loading:t.load}})],1)},l=[],r=a("5530"),u=a("49e5"),s=a("2f62"),i={data:function(){return{myCharts:{},load:!0,options:{tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}}},xAxis:{type:"category",axisPointer:{type:"shadow"}},legend:{},yAxis:[{type:"value",name:"人",axisLabel:{formatter:"{value}"}},{type:"value",splitLine:{show:!1},axisLabel:{formatter:"{value}"}}],series:[{type:"bar"},{type:"bar"},{type:"bar"},{type:"bar"},{type:"line",yAxisIndex:1}],dataset:{dimensions:["分数段","一班","二班","三班","四班","全级"],source:[]}},subject:"Chinese",grade:[{value:"1",label:"初一"},{value:"2",label:"初二"},{value:"3",label:"初三"}],valueGrade:"1",valueClass:"1",categoryList:[],list:[],ChartCategoryList:[{value:"Chinese",label:"语文"},{value:"Math",label:"数学"},{value:"English",label:"英语"},{value:"Physical",label:"物理"},{value:"Chemistry",label:"化学"},{value:"History",label:"历史"},{value:"Politics",label:"道法"},{value:"Biology",label:"生物"},{value:"Geographic",label:"地理"}]}},computed:Object(r["a"])({},Object(s["c"])({views:function(t){return t.tagsView}})),mounted:function(){this.getList(),console.log("views",this.views)},methods:{getList:function(){var t=this;Object(u["b"])([this.subject,this.valueGrade]).then((function(e){console.log(e);for(var a=e.data.list,n=["一班","二班","三班","四班","全级"],l=["100以上","90-100","80-90","70-80","60-70","50-60","40-50","0-40"],r=0;r<8;r++){var u=[];u[0]=l[r];for(var s=0;s<5;s++)u[s+1]=a[r][n[s]];t.options.dataset.source.push(u)}t.load=!1}))},handleFilter:function(){this.options.dataset.source.length=0,this.getList(),this.load=!1,this.echarts.loading=!0}}},o=i,c=(a("1a81"),a("2877")),d=Object(c["a"])(o,n,l,!1,null,null,null);e["default"]=d.exports},"1a81":function(t,e,a){"use strict";a("0525")},"49e5":function(t,e,a){"use strict";a.d(e,"d",(function(){return l})),a.d(e,"g",(function(){return r})),a.d(e,"f",(function(){return u})),a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return i})),a.d(e,"i",(function(){return o})),a.d(e,"h",(function(){return c})),a.d(e,"a",(function(){return d})),a.d(e,"e",(function(){return h}));var n=a("b775");function l(t){return Object(n["a"])({url:"/student/category",method:"get",params:t})}function r(t){return Object(n["a"])({url:"/student/list",method:"get",params:t})}function u(t){return Object(n["a"])({url:"/student/listRank",method:"get",params:t})}function s(t){return Object(n["a"])({url:"/student/chartList",method:"get",params:t})}function i(t){return Object(n["a"])({url:"/student/create",method:"post",data:t})}function o(t){return Object(n["a"])({url:"/student/update",method:"post",data:t})}function c(t){return Object(n["a"])({url:"/student/pass",method:"get",params:t})}function d(t){return Object(n["a"])({url:"/student/advantage",method:"post",data:t})}function h(){return Object(n["a"])({url:"/student/getSum",method:"get"})}}}]);
//# sourceMappingURL=chunk-2f633804.968414ae.js.map