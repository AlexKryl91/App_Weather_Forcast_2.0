import{u as p,_ as w,o as l,c as r,a as e,t as s,b as g,F as _,r as d}from"./index-D6qtVNiJ.js";import{p as v,_ as f,a as D}from"./clock-Ch-GnoHa.js";const A={name:"MainTable",data(){return{store:p(),paramsData:v,currentTime:"",timeId:-1}},methods:{getWIconUrl(n,i){return`./icons/weather_icons/wi_code${i}${(i===0||i===1||i===2)&&n==="night"?"_night":""}.svg`},horizontalScroll(n){n.preventDefault();const i=document.querySelector(".w-wrapper");i.scrollLeft+=n.deltaY}},mounted(){this.timeId=setInterval(()=>{this.currentTime=this.store.midnightHandler()},1e3),this.store.isSearchOpened=!1,this.store.isMeteoFetching=!1},updated(){this.store.isSearchOpened=!1,this.store.isMeteoFetching=!1},unmounted(){clearInterval(this.timeId)}},b={class:"weather-table"},y={class:"head-item"},S={class:"date-wrapper"},T={class:"dow"},I={class:"date"},M={class:"place"},k=["src"],B={key:0,class:"time"},F={class:"table"},C={class:"param__icon"},E=["src","alt"],V={class:"param__name"},x={class:"param__units"},z={class:"w-item-top"},W={class:"w-item-top__hour"},L=["src","alt"],N={class:"w-item-top__temp"},O={class:"w-item-top__desc"},U={class:"w-item__list"};function q(n,i,h,m,o,c){var u,a;return l(),r("main",b,[e("div",y,[e("div",S,[e("div",T,s(o.store.currentMeteoData.dow),1),e("div",I,[i[1]||(i[1]=e("img",{class:"calendar-icon",src:f,alt:"Иконка календаря",width:"21",height:"24"},null,-1)),e("span",null,s(o.store.currentMeteoData.date),1)]),e("div",M,[e("img",{class:"flag-icon",src:`./icons/flag_icons/fi_${(u=o.store.location)==null?void 0:u.countryCode}.svg`,alt:"Иконка флага",width:"21",height:"24"},null,8,k),e("span",null,s((a=o.store.location)==null?void 0:a.name),1)]),o.store.currentTab===0?(l(),r("div",B,[i[2]||(i[2]=e("img",{class:"clock-icon",src:D,alt:"Иконка времени",width:"21",height:"24"},null,-1)),e("span",null,s(o.currentTime),1)])):g("",!0)]),e("table",F,[e("tbody",null,[(l(!0),r(_,null,d(o.paramsData,t=>(l(),r("tr",{class:"param",key:t.name},[e("td",C,[e("img",{src:t.icon,alt:t.iconAlt,width:"30",height:"20"},null,8,E)]),e("td",V,s(t.name),1),e("td",x,s(t.units),1)]))),128))])])]),e("div",{onWheel:i[0]||(i[0]=(...t)=>c.horizontalScroll&&c.horizontalScroll(...t)),ref:"wrapper",class:"w-wrapper"},[(l(!0),r(_,null,d(o.store.currentMeteoData.hourly,t=>(l(),r("div",{class:"w-item",key:t.hour},[e("div",z,[e("div",W,s(t.hour),1),e("img",{class:"w-item-top__icon",src:c.getWIconUrl(t.sunTag,t.weatherCode),alt:t.weatherDescription,width:"100",height:"100"},null,8,L),e("div",N,s(t.temperature),1),e("div",O,s(t.weatherDescription),1)]),e("ul",U,[e("li",null,s(t.apparentTemperature),1),e("li",null,s(t.pressure),1),e("li",null,s(t.windSpeed),1),e("li",null,s(t.windGusts),1),e("li",null,s(t.windDirection),1),e("li",null,s(t.humidity),1),e("li",null,s(t.precipitation),1),e("li",null,s(t.cloudCover),1),e("li",null,s(t.visibility),1)])]))),128))],544)])}const Y=w(A,[["render",q],["__scopeId","data-v-096d7017"]]);export{Y as default};
