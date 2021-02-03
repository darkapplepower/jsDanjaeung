/*
 * Block로 생성한 것들을 run으로 돌릴 수 있음,
 * 아직 완벽하게 구현하진 않았음
 * 태그가 날씨, 다음채팅 2개 뿐임
 */
const scriptName = "단자응 3.0.0";

function response(arg) {
    arg.replier.reply(eval(arg.msg));
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
    Block.run = function (list, arg) {
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
    function runBlock(block, params) {
        var code = split(block.slice(2, -2));
        //앞과 뒤의 태그 시작점, 종료점을 떼어낸다. 그 후에 태그 분석
        const result = [];
        //|로 구분한 것 담을 배열
        var len = 0;
        //|로 구분하기 위해 필요한 변수
        for (let i of code) {
            if (result[len] === undefined) {
                result[len] = "";
            }
            if (i.type === 1) {
                let res = runBlock(i.value, params);
                if (result[len] === "") {
                    result[len] = res;
                } else {
                    result[len] += res;
                }
            } else {
                let barrier = i.value.split("|");
                barrier.forEach((x, xx) => {
                    if (result[len + xx] === undefined) {
                        result[len + xx] = x;
                    } else {
                        result[len + xx] += x;
                    }
                });
                len += barrier.length - 1;
            }
        }
        if (functions.hasOwnProperty(result[0])) {
            return functions[result.shift()](result, params);
        } else {
            return block;
        }
    }
    const functions = {
        날씨: function () {
            return Utils.parse("https://m.search.daum.net/search?w=tot&nil_mtopsearch=btn&DA=YZR&q=%EC%A0%84%EA%B5%AD%EB%82%A0%EC%94%A8").select("a[class= link_city now_info]").toArray().map(x => [x.select("span.txt_name"), x.select("span.txt_temp"), x.select("span[class^=ico_ws ico_w0]")].map(xx => xx.text()).join(" ")).join("\n");
        },
        다음채팅: function (arg, params) {
            return ["다음채팅", isNaN(arg[0]) ? 0 : Number(arg[0])];
        }
    };
    return function (str, params) {
        str = split(str);
        const result = [""];
        const delay = [0];
        str.forEach(x => {
            if (x.type === 1) {
                let i = runBlock(x.value, params);
                if (i[0] === "다음채팅") {
                    result[result.length] = "";
                    delay[delay.length] = i[1];
                } else {
                    result[result.length - 1] += i;
                }
            } else {
                result[result.length - 1] += x.value;
            }
        });
        result.forEach((x, xx) => {
            java.lang.Thread.sleep(delay[xx] * 1000);
            params.replier.reply(x);
        });
    };
})();
