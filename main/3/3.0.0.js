 const scriptName = "단자응 3.0.0";

function response(arg) {
    if(arg.msg.startsWith("단자응 ")){
        run(arg.msg.replace("단자응 ",""),arg);
    }else{
        arg.replier.reply(eval(arg.msg));
    }
}

function Block(msg, reply, mode, send) {
    "use strict";
    if (send === undefined) {
        send = true;
    }
    this.msg = msg.toString();
    //조건
    this.reply = reply.toString();
    //실행내용
    this.mode = mode.toString();
    /* mode 0: 일치

     * mode 1: 시작

     * mode 2: 포함 */
    this.send = Boolean(send);
    //true: 실행 결과를 채팅방에 전송
    //false: 실행은 하지만, 채팅방에 보내진 않음
}
(function () {
    const p = {};
    Block.run = function (list, arg) {
        if (!Object.prototype.hasOwnProperty.call(p, arg.room)) {
            p[arg.room] = "";
        }
        arg.p = p[arg.room];
        p[arg.room] = arg.msg;
        //list의 모든 요소를 실행
        list.forEach(x => {
            if (check(x, arg)) {
                //크롤링 등의 태그는 소요시간이 오래 걸릴 수 있으므로, 새 쓰레드에서 돌림
                new java.lang.Thread(new java.lang.Runnable({
                    run: function () {
                        //단자응 실행하는 함수에 실행 내용과 메시지의 속성을 전달
                        run(x.reply, arg);
                    }
                })).start();
            }
        });
    };
    //실행 조건을 충족하는지 검사하기 위한 함수
    function check(x, arg) {
        switch (x.mode) {
            case "0":
                //일치
                return x.msg === arg.msg;
                break;
            case "1":
                //시작
                return arg.msg.startsWith(x.msg);
                break;
            case "2":
                //포함
                return arg.msg.includes(x.msg);
                break;
        }
    }
})();
/*

결과는 

[[b|[[a|[[b|c]]]]|b[[d]]]]입니다.

*/
const run = (function () {
    const split = (function () {
        function combine(indexs, str) {
            var start = 0;
            var result = [];
            indexs.forEach(function (x) {
                result.push({
                    type: 0,
                    value: str.substring(start, x[0])
                });
                result.push({
                    type: 1,
                    value: str.substring(x[0], x[1])
                });
                start = x[1];
            });
            result.push({
                type: 0,
                value: str.substring(start)
            });
            return result;
        }
        return function (str) {
            str = str.toString();
            const result = [];
            let count = 0;
            let index = 0;
            let i1;
            while (true) {
                let newString = str.substring(index);
                let match = newString.search(/\[\[|\]\]/);
                if (match === -1) {
                    return count === 0 ? combine(result, str) : [{
                        type: 0,
                        value: str
                    }];
                }
                switch (newString[match]) {
                    case "[":
                        if (count === 0) {
                            i1 = index + match;
                        }
                        count++;
                        break;
                    case "]":
                        count--;
                        if (count === 0) {
                            result.push([i1, index + match + 2]);
                        }
                        if (count < 0) {
                            return [{
                                type: 0,
                                value: str
                            }];
                        }
                        break;
                }
                index = index + match + 2;
            }
        };
    })();
    function codeToStr(str,params){
        var result="";
        str.forEach(x=>{
            if(x.type===1){
                result+=runBlock(str,params).map(x=>x.value).join("");
            }else{
                result+=x.value;
            }
        });
        return result;
    }
    function codeToArray(str,params){
        var result=[];
        str.forEach(x=>{
            if(x.type===1){
                runBlock(x.value,params).map(x=>result.push(x));
            }else{
                result.push(x);
            }
        });
        return result;
    }
    function runBlock(str,params){
        var code = split(str.slice(2, -2));
        //앞뒤 [[]] 제거,블럭 분석
        const result = [];
        //|로 구분한 것 담을 배열
        var len = 0;
        //|로 구분하기 위해 필요한 변수
        for (let i of code) {
            if (result[len] === undefined) {
                result[len] = [];
            }
            if (i.type === 0) {
                let barrier = i.value.split("|");
                barrier.forEach((x, xx) => {
                    if (result[len + xx] === undefined) {
                        result[len + xx] = [{
                            type:0,
                            value:x
                        }];
                    } else {
                        result[len + xx].push({
                            type:0,
                            value:x
                        });
                    }
                });
                len += barrier.length - 1;
            }else{
                result[len].push(i);
            }
        }
        if (functions.hasOwnProperty(result[0].map(x=>x.value).join(""))) {
            let ret=functions[result.shift().map(x=>x.value).join("")](result, params);
            if(ret.constructor===Array){
                return ret;
            }else{
                return [ret];
            }
        } else {
            return [{
                type: 0,
                value: str
            }];
        }
    }
    /*
     * 함수를 만들 때 주의사항 *
     * * [[만약]], [[다음채팅]] 같은 태그의 존재로 인하여
     * * 태그를 미리 처리하고 넘기지 않으므로
     * * 태그를 처리해야 할 경우는
     * * 문자열을 원할 시 codeToStr 함수를 호출하여야 한다.
     * * (요소가 생생하게(?) 살아있는 것(아래에 있는 리턴값들이 배열로 옴)을 원한다면 codeToArray)
     * * codeToStr(arg[0],params);
     * * 같은 형식으로!
     * * * * * * * *
     * 함수의 리턴값에 대하여
     * * {
     * *     type:타입,
     * *     value:"값",
     * *     //type가 2일 시
     * *     second:(초)
     * * }
     * * * 타입 0: 일반 채팅
     * * * 타입 1: 블록(어차피 블록 리턴해봤자 0이랑 똑같이 처리되지만!)
     * * * 타입 2: 다음채팅
     */
     function type0(value){
         return {
             type: 0,
             value: String(value)
         };
     }
    const functions = {
        보낸사람: function (arg, params) {
            return type0(params.sender);
        },
        내용: function (arg, params) {
            return type0(params.msg);
        },
        이전내용: function (arg, params) {
            return type0(params.p);
        },
        방: function (arg, params) {
            return type0(params.room);
        },
        전체보기: function () {
            return type0("\u200b".repeat(1000));
        },
        날짜: function () {
            return type0(new Date().toLocaleDateString());
        },
        시간: function () {
            var t = new Date();
            return type0(t.getHours() + "시 " + t.getMinutes() + "분 " + t.getSeconds() + "초");
        },
        월: function () {
            return type0(new Date().getMonth() + 1);
        },
        일: function () {
            return type0(new Date().getDate());
        },
        시: function () {
            return type0(new Date().getHours());
        },
        분: function () {
            return type0(new Date().getMinutes());
        },
        초: function () {
            return type0(new Date().getSeconds());
        },
        랜덤: function (arg, params) {
            return arg.length === 0 ? [] : codeToArray(arg[Math.random() * arg.length | 0]);
        },
        다음채팅: function (arg, params) {
            return {
                type: 2,
                value: "",
                time: isNaN(codeToStr(arg[0])) ? 0 : Number(codeToStr(arg[0]))
            };
        }
    };
    return function(code,params){
        code=split(code);
        const result=[];
        code.forEach(x=>{
            if(x.type===1){
                runBlock(x.value).forEach(x=>result.push(x));
            }else{
                result.push(x);
            }
        });
        var str="";
        result.forEach(x=>{
            str+=x.value;
            if(x.type===2){
                params.replier.reply(str);
                str="";
                java.lang.Thread.sleep(x.time*1000);
            }
        });
        params.replier.reply(str);
    }
})();
