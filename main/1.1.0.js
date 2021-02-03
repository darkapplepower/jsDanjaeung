/* This program is free software. It comes without any warranty, to
     * the extent permitted by applicable law. You can redistribute it
     * and/or modify it under the terms of the Do What The Fuck You Want
     * To Public License, Version 2, as published by Sam Hocevar. See
     * http://www.wtfpl.net/ for more details. */
module.exports=function(){
function 단자응(반응할말,보낼말,startsWith){
    "use strict";
    if(반응할말===undefined){
        반응할말="";
    }
    if(보낼말===undefined){
        보낼말="";
    }
    if(Object.prototype.toString.call(반응할말)!=="[object String]"||Object.prototype.toString.call(보낼말)!=="[object String]")
    {
        throw new Error("반응할 말과 보낼 말은 String타입으로 넘겨주세요")
    }
    if(typeof startsWith!=="boolean")startsWith=false;
    this.command={str:반응할말,startsWith:startsWith};
    this.sendMessage=보낼말;
}
단자응.prototype.반응할말=function(str,startsWith){
    if(Object.prototype.toString.call(str)==="[object String]"){
        if(typeof startsWith!=="boolean")startsWith=false;
        this.command={str:str,startsWith:startsWith};
    }else{
        throw new TypeError("String타입으로 넘겨주세요!");
    }
};
단자응.prototype.보낼말=function(str){
    if(Object.prototype.toString.call(str)==="[object String]"){
        this.sendMessage=str;
    }else{
        throw new TypeError("String타입으로 넘겨주세요!");
    }
};
단자응.run=function(array,room, msg, sender, isGroupChat, replier, imageDB)
{
    const 이전채팅=prec[room];
    prec[room]=msg;
    if(!Array.isArray(채팅저장[room]))채팅저장[room]=[];
    채팅저장[room].push(msg);
    for(let i in array){
        if(function(){
            if(array[i].command.startsWith===true){
                return msg.startsWith(array[i].command.str);
            }else{
                return msg===array[i].command.str;
            }
        }()){
            let arr=array[i].sendMessage;
                new java.lang.Thread(new java.lang.Runnable({run:function(){
                    run(arr,{prec:이전채팅,room:room,msg:msg,sender:sender,isGroupChat:isGroupChat,replier:replier,imageDB:imageDB});
                }})).start();
        }
    }
};
var useKaling=false;
const kalingThread=[];
try{
    var kaling=require("kaling.js");
    var kakao=kaling.Kakao()
    var Kakao=new kakao();
    단자응.카링=function(email,password,key,domain){
        try{
            kakao.prototype.static.ka=("sdk/1.36.6 os/javascript lang/en-US device/Win32 origin/"+encodeURIComponent(domain)).toString();
            Kakao.init(key);
            Kakao.login(email,password);
            useKaling=true;
            functions['카링']=function(array,arg){
                kalingThread.push([array,arg]);
                return {type:"string",value:""};
            };
        }catch(e){
            Api.showToast("자바스크립트 키가 잘못되었거나,\n아이디가 틀렸거나,\n비밀번호가 틀렸습니다\n"+e);
            useKaling=false;
        }
    }
}catch(e){
    Api.showToast("카카오링크 모듈을 발견하지 못했거나 다른 오류가 발생하여 [[카링]] 태그를 사용하실 수 없습니다.\n다른 기능은 정상적으로 사용 가능합니다.");
}
var scriptName="";
단자응.전체변수=th=>전체변수=th;
단자응.scriptName=sn=>scriptName=sn.toString();
var 전체변수={};
var ready=true;
단자응.kaTh=setInterval(function(){
    if(useKaling){
        if(ready){
            ready=false;
            if(kalingThread.length>=1){
                sendKaling(kalingThread[0][0],kalingThread[0][1]);
                kalingThread.shift();
                ready=true;
                return;
            }else{
                ready=true;
                return;
            }
        }
    }
},1000);
function sendKaling(array,arg){
                if(array.length<=3){
                    return;
                }
                try{
                    kakao.prototype.static.ka=("sdk/1.36.6 os/javascript lang/en-US device/Win32 origin/"+encodeURIComponent(함수용_분리(array,arg,1))).toString();
                    Kakao.init(함수용_분리(array,arg,2));
                    let dark={
                        "link_ver":"4.0",
                        "template_id":Number(함수용_분리(array,arg,3)),
                        "template_args":{
                            
                        },
                    }
                    let i=6;
                    while(true){
                        if(array.length>=i){
                            dark["template_args"][함수용_분리(array,arg,i-2)]=함수용_분리(array,arg,i-1);
                            i+=2;
                        }else{
                            break;
                        }
                    }
                    Kakao.send(arg.room,dark,"custom");
                    return;
                }catch(e){
                    arg.replier.reply("카카오링크 전송 중 문제가 발생했습니다.");
                }
}
function run(code,arg) {
    if(차단목록.indexOf(arg.sender)!==-1)return;
    var dark=분리(code);
    dark=dark.map((x,xx)=>{
        if(x.type==="block")
        {
            var i=실행(x,false,arg);
            return i;
        }
        else
        {
            return x;
        }
    });
    var white=[];
    var num=0;
    /*dark.forEach(function(x){
        if(x.다음채팅===true&&white.length!==0){
            num++;
        }
        white[num]===undefined?white[num]=x.value:white[num]+=x.value;
    });
    white.forEach(function(x){
        arg.replier.reply(x);
    });*/
    dark.forEach(function(x){
        if(x.다음채팅===true&&white.length!==0){
            num++;
            white[num]=[x.time*1000,""];
        }
        if(white[num]===undefined){
            white[num]=[0,x.value];
        }else{
            white[num][1]+=x.value;
        }
    });
    white.forEach(function(x){
        java.lang.Thread.sleep(x[0]);
        arg.replier.reply(x[1]);
    })
}
const 차단목록=[];
const prec={};
function 실행(block,bo,arg)
{
    if(typeof block!=="object")throw new Error("function 실행(block)에서 받은 매개변수가 object가 아닙니다.");
    if(block.type!=="block")throw new Error("function 실행(block)에서 받은 매개변수의 타입이 block이 아닙니다.");
    let i=block.value.substring(block.value.indexOf("[[")+2,block.value.lastIndexOf("]]"));//처음과 끝의 [[]]를 떼어냄
    block=JSON.parse(JSON.stringify(block));
    i=분리(i);//string과 block을 구분하기 위함
    let list=[];//여기에 들어감
    let start=0;
    i.forEach(x=>{
        if(x.type==="block")
        {
            if(list[start]===undefined)list[start]=[];//만약 그 위치에 아무것도 없다면 배열로 만듬
            list[start].push(x);//타입이 블록이면 그대로 쳐넣음
            return;
        }
        let ii=x.value.split("|");
        if(ii.length===1)
        {
            if(list[start]===undefined)list[start]=[];
            list[start].push(x);
            return;
        }
        else
        {
            ii.forEach((xx1,xx2)=>{
                if(list[start+xx2]===undefined)list[start+xx2]=[];
                list[start+xx2].push({type:"string",value:xx1});
            });
            start+=ii.length-1;
            return;
        }
    });
    if(list.length===0){
        return {type:"string",value:"[[]]"};
    }
    if(list[0].length===0)throw new TypeError("태그의 첫 번째 칸이 비었습니다!");
    if(list[0].some(x=>x.type==="block"))//블록이 포함되어 있을 시
    {
        list[0]=list[0].map(x=>//블록을 분해
        {
            if(x.type==="string")
            {    
                return x;
            }
            else
            {    
                let i=실행(x,true,arg);
                i[0]=i[0].map(x=>x.value).join("");
                if(functions[i[0]]===undefined)
                {
                    return {type:"string",value:block.value};
                }
                return functions[i[0]](i,arg);
            }
        });
    }
    list[0]=list[0].map(x=>x.value).join("");
    if(functions[list[0]]===undefined)
    {
        return {type:"string",value:block.value};
    }
    if(bo===false)
    {
        return functions[list[0]](list,arg);
    }
    return [[functions[list[0]](list,arg)]];
}
const functions={
    시:function()
    {
        return {type:"string",value:String(new Date().getHours())};
    },
    분:function()
    {
        return {type:"string",value:String(new Date().getMinutes())};
    },
    초:function()
    {
        return {type:"string",value:String(new Date().getSeconds())};
    },
    랜덤:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        let i=Math.floor(Math.random()*(array.length-1))+1;
        return {type:"string",value:함수용_분리(array,arg,i)};
    },
    만약:function(array,arg)
    {
        if(array.length<=2)return {type:"string",value:""};
        array[1]=함수용_분리(array,arg,1);
        var i;
        if(array[1]==="true"||array[1]===true)
        {
            i=2;
        }
        else
        {
            if(array.length<=3)
            {
                return {type:"string",value:""};
            }
            i=3;
        }
        return {type:"string",value:함수용_분리(array,arg,i)};
    },
    같다:function(array,arg)
    {
        if(array.length<=2)return {type:"string",value:"false"};
        return 함수용_분리(array,arg,1)==함수용_분리(array,arg,2)?{type:"string",value:"true"}:{type:"string",value:"false"};
    },
    전체보기:function()
    {
        return {type:"string",value:"\u200b".repeat(1000)};
    },
    디지털시계:function()
    {
    let d=new Date();
    return {type:"string",value:[1,2,3,4,5].map(i=>["getHours","getMinutes","getSeconds"].map(ii=>{let s=String(d[ii]());return ((s.length===1?"0":"")+s).split("").map(iii=>eval("t"+i)[iii]).join(" ");}).join(t6[i])).join("\n")};
    },
    보낸사람:(array,arg)=>({type:"string",value:arg.sender}),
    내용:(array,arg)=>({type:"string",value:arg.msg}),
    방:(array,arg)=>({type:"string",value:arg.room}),
    날짜:()=>({type:"string",value:String(new Date().toLocaleString().split("일")[0]+"일")}),
    시간:()=>({type:"string",value:String((new Date().toLocaleString().split("일")[1].split("초")[0]+"초").replace(/오전|오후/,"").trim())}),
    월:()=>({type:"string",value:String(new Date().getMonth()+1)}),
    일:()=>({type:"string",value:String(new Date().getDate())}),
    년:()=>({type:"string",value:String(new Date().getFullYear())}),
    시계:()=>{
        let d=new Date()
        return {type:"string",value:[d.getHours(),d.getMinutes(),d.getSeconds()].join(":")};
    },
    이전내용:(array,arg)=>({type:"string",value:arg.prec}),
    변경:function(array,arg)
    {
        if(array.length<=3)return {type:"string",value:""};
        [1,2,3].forEach(x=>array[x]=함수용_분리(array,arg,x));
        array[2]=new RegExp(array[2]);
        return {type:"string",value:array[1].replace(array[2],array[3])};
    },
    모두변경:function(array,arg)
    {
        if(array.length<=3)return {type:"string",value:""};
        [1,2,3].forEach(x=>array[x]=함수용_분리(array,arg,x));
        array[2]=new RegExp(array[2],"g");
        return {type:"string",value:array[1].replace(array[2],array[3])};
    },
    삭제:function(array,arg)
    {
        if(array.length<=2)return {type:"string",value:""};
        [1,2].forEach(x=>array[x]=함수용_분리(array,arg,x));
        array[2]=new RegExp(array[2]);
        return {type:"string",value:array[1].replace(array[2],"")};
    },
    모두삭제:function(array,arg)
    {
        if(array.length<=2)return {type:"string",value:""};
        [1,2].forEach(x=>array[x]=함수용_분리(array,arg,x));
        array[2]=new RegExp(array[2],"g");
        return {type:"string",value:array[1].replace(array[2],"")};
    },
    토스트:function(array,arg)
    {
        if(array.length<=1){Api.UIThread(()=>android.widget.Toast.makeText(Api.getContext(),"",1).show());return {type:"string",value:""};}
        if(array.length===2){Api.UIThread(()=>android.widget.Toast.makeText(Api.getContext(),함수용_분리(array,arg,1),1).show());return {type:"string",value:""};}
        [1,2].forEach(i=>array[i]=함수용_분리(array,arg,i));
        if(array[2]=="중앙")
        {
            Api.UIThread(()=>{let i=android.widget.Toast.makeText(Api.getContext(),array[1],1);i.setGravity(android.view.Gravity.CENTER|android.view.Gravity.CENTER_HORIZONTAL,0,0);i.show()});
        }
        else
        {
            Api.UIThread(()=>android.widget.Toast.makeText(Api.getContext(),array[1],1).show());
        }
        return {type:"string",value:""};
    },
    상단바:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        if(array.length===2){Api.makeNoti(함수용_분리(array,arg,1));return {type:"string",value:""};}
        Api.makeNoti(함수용_분리(array,arg,1),함수용_분리(array,arg,2));return {type:"string",value:""};
    },
    ON:function(array,arg)
    {
        Api.on(scriptName);
        return {type:"string",value:""};
    },
    OFF:function(array,arg)
    {
        Api.off(scriptName);
        return {type:"string",value:""};
    },
    변수:function(array,arg)
    {
        if(변수[arg.room]===undefined)변수[arg.room]={};
        if(array.length===1)return {type:"string",value:""};
        if(array.length===2)return {type:"string",value:변수[arg.room][함수용_분리(array,arg,1)]};
        if(array.length===3)
        {
            [1,2].forEach(i=>array[i]=함수용_분리(array,arg,i));
            변수[arg.room][array[1]]=array[2];
            return {type:"string",value:""};
        }
        [1,2].forEach(i=>array[i]=함수용_분리(array,arg,i));
        switch(array[2]){
            case "더하기":
                if(변수[arg.room][array[1]]===undefined)변수[arg.room][array[1]]=0;
                if(Number(변수[arg.room][array[1]])==변수[arg.room][array[1]])
                {
                    array[3]=함수용_분리(array,arg,3);
                    if(Number(array[3])==array[3])
                    {
                        변수[arg.room][array[1]]=Number(변수[arg.room][array[1]])+Number(array[3]);
                    }
                }
                break;
            case "빼기":
                if(변수[arg.room][array[1]]===undefined)변수[arg.room][array[1]]=0;
                if(Number(변수[arg.room][array[1]])==변수[arg.room][array[1]])
                {
                    array[3]=함수용_분리(array,arg,3);
                    if(Number(array[3])==array[3])
                    {
                        변수[arg.room][array[1]]=Number(변수[arg.room][array[1]])-Number(array[3]);
                    }
                }
                break;
            case "붙이기":
                array[3]=함수용_분리(array,arg,3);
                변수[arg.room][array[1]]+=String(array[3]);
                break;
            default:
                변수[arg.room][array[1]]=array[2];
                break;
        }
        return {type:"string",value:""};
    },
    전체변수:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        if(array.length===2)return {type:"string",value:전체변수[함수용_분리(array,arg,1)]};
        if(array.length===3)
        {
            [1,2].forEach(i=>array[i]=함수용_분리(array,arg,i));
            전체변수[array[1]]=array[2];
            return {type:"string",value:""};
        }
        [1,2].forEach(i=>array[i]=함수용_분리(array,arg,i));
        switch(array[2]){
            case "더하기":
                if(전체변수[array[1]]===undefined)전체변수[array[1]]=0;
                if(Number(전체변수[array[1]])==전체변수[array[1]])
                {
                    array[3]=함수용_분리(array,arg,3);
                    if(Number(array[3])==array[3])
                    {
                        전체변수[array[1]]=Number(전체변수[array[1]])+Number(array[3]);
                    }
                }
                break;
            case "빼기":
                if(전체변수[array[1]]===undefined)전체변수[array[1]]=0;
                if(Number(전체변수[array[1]])==전체변수[array[1]])
                {
                    array[3]=함수용_분리(array,arg,3);
                    if(Number(array[3])==array[3])
                    {
                        전체변수[array[1]]=Number(전체변수[array[1]])-Number(array[3]);
                    }
                }
                break;
            case "붙이기":
                array[3]=함수용_분리(array,arg,3);
                전체변수[array[1]]+=String(array[3]);
                break;
            default:
                전체변수[array[1]]=array[2];
                break;
        }
        return {type:"string",value:""};
    },
    알림창:function()
    {
        Api.showToast("[[알림창]]은 귀찮아서 넣지 않은 기능입니다.");
        return {type:"string",value:""};
    },
    다르다:function(array,arg)
    {
        if(array.length<=2)return {type:"string",value:"false"};
        return 함수용_분리(array,arg,1)==함수용_분리(array,arg,2)?{type:"string",value:"false"}:{type:"string",value:"true"};
    },
    이상:function(array,arg){
        if(array.length<=2)return {type:"string",value:"false"};
        함수용_분리(array,arg,1);함수용_분리(array,arg,2);
        if(isNaN(array[1])||isNaN(array[2])){
            return {type:"string",value:(array[1]>=array[2]?"true":"false")};
        }else{
            return {type:"string",value:Number(array[1])>=Number(array[2])?"true":"false"};
        }
    },
    이하:function(array,arg){
        if(array.length<=2)return {type:"string",value:"false"};
        함수용_분리(array,arg,1);함수용_분리(array,arg,2);
        if(isNaN(array[1])||isNaN(array[2])){
            return {type:"string",value:array[1]<=array[2]?"true":"false"};
        }else{
            return {type:"string",value:Number(array[1])<=Number(array[2])?"true":"false"};
        }
    },
    초과:function(array,arg){
        if(array.length<=2)return {type:"string",value:"false"};
        함수용_분리(array,arg,1);함수용_분리(array,arg,2);
        if(isNaN(array[1])||isNaN(array[2])){
            return {type:"string",value:array[1]>array[2]?"true":"false"};
        }else{
            return {type:"string",value:Number(array[1])>Number(array[2])?"true":"false"};
        }
    },
    미만:function(array,arg){
        if(array.length<=2)return {type:"string",value:"false"};
        함수용_분리(array,arg,1);함수용_분리(array,arg,2);
        if(isNaN(array[1])||isNaN(array[2])){
            return {type:"string",value:array[1]<array[2]?"true":"false"};
        }else{
            return {type:"string",value:Number(array[1])<Number(array[2])?"true":"false"};
        }
    },
    차단:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        array[1]=함수용_분리(array,arg,1);
        if(차단목록.indexOf(array[1])==-1)
        {
            차단목록.push(array[1]);
        }
        return {type:"string",value:""};
    },
    차단해제:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        array[1]=함수용_분리(array,arg,1);
        if(차단목록.indexOf(array[1])!==-1)
        {
            차단목록.splice(차단목록.indexOf(array[1]),1);
        }
        return {type:"string",value:""};
    },
    차단초기화:function()
    {
        차단목록=[];
        return {type:"string",value:""};
    },
    목록:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        array[1]=함수용_분리(array,arg,1);
        if(module.exports.list[array[1]]===undefined)module.exports.list[array[1]]=[];
        if(array.length===2)return {type:"string",value:module.exports.list[array[1]].toString()};
        array[2]=함수용_분리(array,arg,2);
        switch(array[2]){
            case "추가":
                if(array.length===3)return {type:"string",value:""};
                array[3]=함수용_분리(array,arg,3);
                module.exports.list[array[1]].push(array[3]);
                return {type:"string",value:""};
                break;
            case "삭제":
                if(array.length===3)return {type:"string",value:""};
                array[3]=함수용_분리(array,arg,3);
                for(;;)
                {
                    if(module.exports.list[array[1]].indexOf(array[3])==-1)
                    {
                        break;
                    }
                    module.exports.list[array[1]].splice(module.exports.list[array[1]].indexOf(array[3]),1);
                }
                return {type:"string",value:""};
                break;
            case "포함":
                if(array.length===3)return {type:"string",value:"false"};
                array[3]=함수용_분리(array,arg,3);
                return {type:"string",value:String(module.exports.list[array[1]].some(x=>x==array[3]))};
                break;
            case "랜덤":
                if(module.exports.list[array[1]].length===0)return {type:"string",value:""};
                return {type:"string",value:module.exports.list[array[1]][Math.floor(Math.random()*(module.exports.list[array[1]].length-1))]};
                break;
            case "초기화":
                module.exports.list[array[1]]=[];
                return {type:"string",value:""};
            case "길이":
                return {type:"string",value:module.exports.list[array[1]].length};
                break;
            default:
                if(!isNaN(array[2]))
                {
                    return {type:"string",value:module.exports.list[array[1]][Number(array[2])]};
                }
                break;
        }
        return {type:"string",value:""};
    },
    파일:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        if(array.length===2)return {type:"string",value:FileStream.read(함수용_분리(array,arg,1))};
        FileStream.write(함수용_분리(array,arg,1),함수용_분리(array,arg,2));
        return {type:"string",value:""};
    },
    URL:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        return {type:"string",value:java.net.URLEncoder.encode(함수용_분리(array,arg,1))};
    },
    클립보드:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        Api.getContext().getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText(함수용_분리(array,arg,1));
        return {type:"string",value:""};
    },
    크롤링:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        return {type:"string",value:Utils.parse(함수용_분리(array,arg,1)).html()};
    },
    태그삭제:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        if(array.length===2)return {type:"string",value:org.jsoup.Jsoup.parse(함수용_분리(array,arg,1)).text()};
        let i=org.jsoup.Jsoup.parse(함수용_분리(array,arg,1))
        i.select(함수용_분리(array,arg,2)).remove();
        return {type:"string",value:i.toString()};
    },
    자르기:function(array,arg)
    {
        if(array.length<=3)return {type:"string",value:""};
        [1,2,3].forEach(i=>array[i]=함수용_분리(array,arg,i));
        return {type:"string",value:array[1].split(array[2])[array[3]]};
    },
    날씨:()=>({type:"string",value:Utils.parse("https://m.search.daum.net/search?w=tot&nil_mtopsearch=btn&DA=YZR&q=%EC%A0%84%EA%B5%AD%EB%82%A0%EC%94%A8").select("a[class= link_city now_info]").toArray().map(x=>[x.select("span.txt_name"),x.select("span.txt_temp"),x.select("span[class^=ico_ws ico_w0]")].map(xx=>xx.text()).join(" ")).join("\n")}),
    /*한강:()=>({type:"string",value:org.jsoup.Jsoup.connect("https://hangang.life/").get().select("h1[id=temp]").text()}),*/
    태그선택:function(array,arg)
    {
        if(array.length<=2)return {type:"string",value:""};
        return {type:"string",value:org.jsoup.Jsoup.parse(함수용_분리(array,arg,1)).select(함수용_분리(array,arg,2)).toString()};
    },
    인원수:function(array,arg)
    {
        if(array.length===1)return {type:"string",value:""};
        return {type:"string",value:JSON.parse(Utils.parse("https://open.kakao.com/c/search/unified?q="+함수용_분리(array,arg,1)).text())["items"][0]["mcnt"]};
    },
    다음채팅:function(array,arg){
        var time;
        if(array.length>=2){
            time=Number(함수용_분리(array,arg,1));
        }
        if(isNaN(time))time=0;
        return {type:"string",value:"",다음채팅:true,time:time};
    },
    랜덤채팅:function(array,arg){
        return {type:"string",value:채팅저장[arg.room][Math.random()*채팅저장[arg.room].length|0]};
    }
    /*
    "크롤링",
    "태그삭제",
    "자르기"*/
};
const t6=[null," ░ "," █ "," ░ "," █ "," ░ "];
const t1=["███","░░█","███","███","█░█","███","███","███","███","███"];
const t2=["█░█","░░█","░░█","░░█","█░█","█░░","█░░","█░█","█░█","█░█"];
const t3=["█░█","░░█","███","███","███","███","███","█░█","███","███"];
const t4=["█░█","░░█","█░░","░░█","░░█","░░█","█░█","░░█","█░█","░░█"];
const t5=["███","░░█","███","███","░░█","███","███","░░█","███","███"];
function 분리(str)
{
    /*
    리턴값은 배열로 한다.
    목적은 일반 문자와 단순 자동응답 태그의 분리
    {type:타입,value:값}의 형태로 배열에 넣는다
    */
    if(typeof str!=="string")throw new TypeError("문자열이 아닙니다");//문자열 아닌걸 넣으면 에러
    if(str==="")return [];//받은 것이 빈 문자열일 시, 빈 배열 리턴
    if(str.indexOf("[[")===-1||str.indexOf("]]")===-1)return [{type:"string",value:str}];//단순 자동응답 태그를 나타내는 [[와 ]]중 하나라도 없을 시 그대로 리턴
    if(str.match(/\[\[/g).length!==str.match(/\]\]/g).length)return [{type:"string",value:str}];
    if(str.indexOf("[[")>str.indexOf("]]"))throw new TypeError("태그가 이상합니다.");//]]가 [[보다 먼저 있으면 에러
    /*
    아래 for문은 태그만 가져오고, 
    그 후의 처리로 문자열을 가져온다.
    */
    let blocks=[];//결과 출력용 배열
    let start=0;//검색 시작 위치
    for(;;)//계속 반복
    {
        let i1=start;//i1을 start로 지정함으로서 시작 위치가 애매해도(?) 아니 ㅈㅁ 뭐지 이거
        let i2=0;//블록의 끝
        let blockcount=[0,0];//[[와 ]]의 수 비교용 배열
        if(str.substr(start).indexOf("[[")!==-1)//start 기준으로 자를 때 [[가 없으면 분리 완료로 취급, 종료한다.
        {
            i1=start+str.substr(start).indexOf("[[");//i1에 블럭 시작위치 기록
            start=i1+2;//start에 [[의 길이인 2를 i1과 더한 값 저장([[의 뒤부터 다시 검색 위함)
            blockcount[0]++;//[[의 수 기록
        }
        else
        {
            break;
        }
        for(;;)
        {
            if(str.substr(start).match(/\[\[|\]\]/)===null)
            {
                break;//혹시 몰라서 여기서 잘랐을때 [[와 ]]가 없으면 종료
            }
            if(str.substr(start).match(/\[\[|\]\]/)[0]==="[[")//그 다음에 오는 것이 [[일때
            {
                start=start+str.substr(start).indexOf("[[")+2;//재검색을 위해 start를 증가시킴
                blockcount[0]++;//[[를 찾았으므로 기록
            }
            else
            {
                blockcount[1]++;//]] 찾았으니 기록
                start=start+str.substr(start).indexOf("]]")+2;//역시 재검색을 위함
                if(blockcount[0]===blockcount[1])//찾은 [[와 ]]의 수가 같아지면(블럭 구분 끝)
                {
                    i2=start;//start 위치를 i2로 지정
                    blocks.push({"start":i1,"end":i2,"block":blockcount[0]});//블럭의 위치를 기록
                    break;//for문 하나 종료
                }
            }
        }
    }
    /*
    여기서 blocks는 블록의 시작점과 끝만 담긴 객체가 담긴 배열
    string과 block으로 재구분
    */
    if(blocks.length===0)//블록이 없을 때(아니, 블록이 없으면 처음에 리턴했잖아)
    {
        return {type:"string",value:str};//string타입으로 받은 값을 다시 보냄
    }
    let result=[];
    start=0;
    blocks.forEach(x=>
    {
        if(start!==x.start)result.push({type:"string",value:str.substring(start,x.start)});//검색 시작점과 블럭의 시작점 사이에 있는 문자열
        result.push({type:"block",value:str.substring(x.start,x.end)});//블럭
        start=x.end;//검색 시작점 지정
    });
    if(start!==str.length)result.push({type:"string",value:str.substring(start,str.length)});
    return result;
}
const 변수={};
function 함수용_분리(array,arg,i)
{
        if(!array[i].some(x=>x.type==="block"))
        {
            array[i]=array[i].map(x=>x.value).join("");
        }
        else
        {
            array[i]=array[i].map(x=>{
                if(x.type==="block")
                {
                    return 실행(x,false,arg);
                }
                return x;
            });
            array[i]=array[i].map(x=>x.value).join("");
        }
        return array[i];
}
const 채팅저장={};
return 단자응;
}();
module.exports.list={};
