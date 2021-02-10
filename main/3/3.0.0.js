importClass(android.widget.Toast);
const scriptName = "단자응 3.0.0";
const savePath = "sdcard/darkapple/danja3/";
function response(arg) {
    if (arg.msg.startsWith("단자응 ")) {
        Block.eval(arg.msg.replace("단자응 ", ""), arg);
    } else {
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
        arg = setP(arg, p[arg.room]);
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
    Block.eval = function (code, arg) {
        if (!Object.prototype.hasOwnProperty.call(p, arg.room)) {
            p[arg.room] = "";
        }
        arg = setP(arg, p[arg.room]);
        p[arg.room] = arg.msg;
        new java.lang.Thread(new java.lang.Runnable({
            run: function () {
                //단자응 실행하는 함수에 실행 내용과 메시지의 속성을 전달
                run(code, arg);
            }
        })).start();
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
    function setP(arg, p) {
        return {
            room: arg.room,
            msg: arg.msg,
            sender: arg.sender,
            isGroupChat: arg.isGroupChat,
            replier: arg.replier,
            imageDB: arg.imageDB,
            packageName: arg.packageName,
            p: p
        };
    }
})();
/*

결과는 

[[b|[[a|[[b|c]]]]|b[[d]]]]입니다.

*/
const run = (function () {
    var on = true;
    var ban = (function () {
        var data = FileStream.read(savePath + "banlist.txt");
        try {
            if (Array.isArray(JSON.parse(data))) {
                return JSON.parse(data);
            } else {
                FileStream.write(savePath + "banlist.txt", "[]");
                return [];
            }
        } catch (e) {
            FileStream.write(savePath + "banlist.txt", "[]");
            return [];
        }
    })();
    var gvariable = {};
    var rvariable = {};
    var lvariable = {};
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
    function codeToStr(str, params) {
        if (str === undefined) {
            return "";
        }
        var result = "";
        str.forEach(x => {
            if (x.type === 1) {
                result += runBlock(x.value, params).map(x => x.value).join("");
            } else {
                result += x.value;
            }
        });
        return result;
    }
    function codeToArray(str, params) {
        if (str === undefined) {
            return [];
        }
        var result = [];
        str.forEach(x => {
            if (x.type === 1) {
                runBlock(x.value, params).map(x => result.push(x));
            } else {
                result.push(x);
            }
        });
        return result;
    }
    function runBlock(str, params) {
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
                            type: 0,
                            value: x
                        }];
                    } else {
                        result[len + xx].push({
                            type: 0,
                            value: x
                        });
                    }
                });
                len += barrier.length - 1;
            } else {
                result[len].push(i);
            }
        }
        if (functions.hasOwnProperty(result[0].map(x => x.value).join(""))) {
            let ret = functions[result.shift().map(x => x.value).join("")](result, params);
            if (ret.constructor === Array) {
                return ret;
            } else {
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
    function type0(value) {
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
            return arg.length === 0 ? [] : codeToArray(arg[Math.random() * arg.length | 0], params);
        },
        변경: function (arg, params) {
            arg[0] = codeToStr(arg[0], params);
            arg[1] = codeToStr(arg[1], params);
            arg[2] = codeToStr(arg[2], params);
            return type0(arg[0].replace(arg[1], arg[2]));
        },
        모두변경: function (arg, params) {
            arg[0] = codeToStr(arg[0], params);
            arg[1] = codeToStr(arg[1], params);
            arg[2] = codeToStr(arg[2], params);
            return type0(arg[0].replace(new RegExp(arg[1], "g"), arg[2]));
        },
        삭제: function (arg, params) {
            arg[0] = codeToStr(arg[0], params);
            arg[1] = codeToStr(arg[1], params);
            return type0(arg[0].replace(arg[1], ""));
        },
        모두삭제: function (arg, params) {
            arg[0] = codeToStr(arg[0], params);
            arg[1] = codeToStr(arg[1], params);
            return type0(arg[0].replace(new RegExp(arg[1], "g"), ""));
        },
        날씨: function () {
            return type0(Utils.parse("https://m.search.daum.net/search?w=tot&nil_mtopsearch=btn&DA=YZR&q=%EC%A0%84%EA%B5%AD%EB%82%A0%EC%94%A8").select("a[class= link_city now_info]").toArray().map(x => [x.select("span.txt_name"), x.select("span.txt_temp") + "C", x.select("span[class^=ico_ws ico_w0]")].map(xx => xx.text()).join(" ")).join("\n"));
        },
        시계: function () {
            return type0(new Date().getClock());
        },
        토스트: function (arg, params) {
            Api.UIThread(() => Toast.makeText(Api.getContext(), codeToStr(arg[0], params), Toast.LENGTH_SHORT).show());
            return type0("");
        },
        상단바: function (arg, params) {
            Api.makeNoti(codeToStr(arg[0], params), codeToStr(arg[1], params));
            return type0("");
        },
        알림창: function () {
            Api.UIThread(() => Toast.makeText(Api.getContext(), "[[알림창]]은 귀찮아서 안 넣은 기능입니다.", Toast.LENGTH_SHORT).show());
            return type0("");
        },
        ON: function () {
            on = true;
            return type0("");
        },
        OFF: function () {
            on = false;
            return type0("");
        },
        만약: function (arg, params) {
            if (codeToStr(arg[0], params) == "true") {
                return codeToArray(arg[1], params);
            } else {
                return codeToArray(arg[2], params);
            }
        },
        같다: function (arg, params) {
            return type0(codeToStr(arg[0], params) == codeToStr(arg[0], params));
        },
        다르다: function (arg, params) {
            return type0(codeToStr(arg[0], params) != codeToStr(arg[0], params));
        },
        이상: function (arg, params) {
            return type0(Number(codeToStr(arg[0], params)) >= Number(codeToStr(arg[0], params)));
        },
        이하: function (arg, params) {
            return type0(Number(codeToStr(arg[0], params)) <= Number(codeToStr(arg[0], params)));
        },
        초과: function (arg, params) {
            return type0(Number(codeToStr(arg[0], params)) > Number(codeToStr(arg[0], params)));
        },
        미만: function (arg, params) {
            return type0(Number(codeToStr(arg[0], params)) < Number(codeToStr(arg[0], params)));
        },
        차단: function (arg, params) {
            arg[0] = codeToStr(arg[0], params);
            if (!ban.includes(arg[0])) {
                ban.push(arg[0]);
                FileStream.write(savePath + "banlist.txt", JSON.stringify(ban));
            }
            return type0("");
        },
        차단해제: function (arg, params) {
            arg[0] = codeToStr(arg[0], params);
            if (ban.includes(arg[0])) {
                ban.splice(ban.indexOf(arg[0]), 1);
                FileStream.write(savePath + "banlist.txt", JSON.stringify(ban));
            }
            return type0("");
        },
        차단초기화: function () {
            ban.length = 0;
            return type0("");
        },
        URL: function (arg, params) {
            return type0(encodeURIComponent(codeToStr(arg[0], params)));
        },
        클립보드: function (arg, params) {
            Api.getContext().getSystemService(Api.getContext().CLIPBOARD_SERVICE).setText(codeToStr(arg[0], params));
            return type0("");
        },
        크롤링: function (arg, params) {
            return type0(org.jsoup.Jsoup.connect(codeToStr(arg[0], params)).get());
        },
        태그삭제: function (arg, params) {
            return type0(codeToStr(arg[0], params).replace(/<[^>]*>/g, ""));
        },
        자르기: function (arg, params) {
            return type0(codeToStr(arg[0], params).split(codeToStr(arg[1], params))[codeToStr(arg[2], params)]);
        },
        다음채팅: function (arg, params) {
            arg[0] = codeToStr(arg[0], params);
            return {
                type: 2,
                value: "",
                time: isNaN(arg[0]) ? 0 : Number(arg[0])
            };
        },
        전체변수: function (arg, params) {
            switch (arg.length) {
                case 0:
                    return type0("");
                    break;
                case 1: {
                    let v = gvariable[codeToStr(arg[0], params)];
                    return type0(v === undefined ? "(저장된 값 없음)" : v);
                    break;
                }
                case 2:
                    gvariable[codeToStr(arg[0], params)] = codeToStr(arg[1], params);
                    return type0("");
                    break;
                case 3:
                    arg[0] = codeToStr(arg[0], params);
                    arg[1] = codeToStr(arg[1], params);
                    switch (arg[1]) {
                        case "더하기":
                            arg[2] = codeToStr(arg[2], params);
                            if (isNaN(arg[2])) {
                                return type0("(변수 태그 처리 중 오류 발생)");
                            }
                            if (isNaN(gvariable[arg[0]])) {
                                gvariable[arg[0]] = (+arg[2]).toString(10);
                            } else {
                                gvariable[arg[0]] = (+gvariable[arg[0]] + +arg[2]).toString(10);
                            }
                            return type0("");
                            break;
                        case "빼기":
                            arg[2] = codeToStr(arg[2], params);
                            if (isNaN(arg[2])) {
                                return type0("(변수 태그 처리 중 오류 발생)");
                            }
                            if (isNaN(gvariable[arg[0]])) {
                                gvariable[arg[0]] = (-arg[2]).toString(10);
                            } else {
                                gvariable[arg[0]] = (+gvariable[arg[0]] - +arg[2]).toString(10);
                            }
                            return type0("");
                            break;
                        case "붙이기":
                            arg[2] = codeToStr(arg[2], params);
                            gvariable[arg[0]] = (gvariable[arg[0]] === undefined ? "" : gvariable[arg[0]]) + "" + arg[2];
                            return type0("");
                            break;
                        default:
                            return type0("(변수 태그 처리 중 오류 발생)");
                            break;
                    }
                    break;
                default:
                    return type0("(변수 태그 처리 중 오류 발생)");
                    break;
            }
        },
        변수: function (arg, params) {
            if (!Object.prototype.hasOwnProperty.call(rvariable, params.room)) {
                rvariable[params.room] = {};
            }
            var gvariable = rvariable[params.room];
            switch (arg.length) {
                case 0:
                    return type0("");
                    break;
                case 1: {
                    let v = gvariable[codeToStr(arg[0], params)];
                    return type0(v === undefined ? "(저장된 값 없음)" : v);
                    break;
                }
                case 2:
                    gvariable[codeToStr(arg[0], params)] = codeToStr(arg[1], params);
                    return type0("");
                    break;
                case 3:
                    arg[0] = codeToStr(arg[0], params);
                    arg[1] = codeToStr(arg[1], params);
                    switch (arg[1]) {
                        case "더하기":
                            arg[2] = codeToStr(arg[2], params);
                            if (isNaN(arg[2])) {
                                return type0("(변수 태그 처리 중 오류 발생)");
                            }
                            if (isNaN(gvariable[arg[0]])) {
                                gvariable[arg[0]] = (+arg[2]).toString(10);
                            } else {
                                gvariable[arg[0]] = (+gvariable[arg[0]] + +arg[2]).toString(10);
                            }
                            return type0("");
                            break;
                        case "빼기":
                            arg[2] = codeToStr(arg[2], params);
                            if (isNaN(arg[2])) {
                                return type0("(변수 태그 처리 중 오류 발생)");
                            }
                            if (isNaN(gvariable[arg[0]])) {
                                gvariable[arg[0]] = (-arg[2]).toString(10);
                            } else {
                                gvariable[arg[0]] = (+gvariable[arg[0]] - +arg[2]).toString(10);
                            }
                            return type0("");
                            break;
                        case "붙이기":
                            arg[2] = codeToStr(arg[2], params);
                            gvariable[arg[0]] = (gvariable[arg[0]] === undefined ? "" : gvariable[arg[0]]) + "" + arg[2];
                            return type0("");
                            break;
                        default:
                            return type0("(변수 태그 처리 중 오류 발생)");
                            break;
                    }
                    break;
                default:
                    return type0("(변수 태그 처리 중 오류 발생)");
                    break;
            }
        },
        목록: function (arg, params) {
            if (arg.length === 0) {
                return type0("");
            } else {
                arg[0] = codeToStr(arg[0], params);
                if (!Array.isArray(lvariable[arg[0]])) {
                    lvariable[arg[0]] = [];
                }
            }
            switch (arg.length) {
                case 1:
                    return type0(lvariable[arg[0]]);
                    break;
                case 2:
                    arg[1] = codeToStr(arg[1], params);
                    switch (arg[1]) {
                        case "랜덤":
                            return lvariable[arg[0]].length === 0 ? type0("") : type0(lvariable[arg[0]][Math.random() * lvariable[arg[0]].length | 0]);
                            break;
                        case "초기화":
                            lvariable[arg[0]].length = 0;
                            return type0("");
                            break;
                        case "길이":
                            return type0(lvariable[arg[0]].length);
                            break;
                        default:
                            return type0(lvariable[arg[0]][arg[1]] === undefined ? "(저장된 값 없음)" : lvariable[arg[0]][arg[1]]);
                            break;
                    }
                    break;
                case 3:
                    arg[1] = codeToStr(arg[1], params);
                    switch (arg[1]) {
                        case "추가":
                            lvariable[arg[0]].push(codeToStr(arg[2], params));
                            return type0("");
                            break;
                        case "삭제":
                            arg[2] = codeToStr(arg[2], params);
                            if (lvariable[arg[0]].includes(arg[2])) {
                                lvariable[arg[0]].splice(lvariable[arg[0]].indexOf(arg[2]), 1);
                            }
                            return type0("");
                            break;
                        case "포함":
                            return type0(lvariable[arg[0]].includes(codeToStr(arg[2], params)));
                            break;
                        default:
                            return type0("");
                            break;
                    }
                    break;
                default:
                    return type0("(목록 태그 처리 중 오류 발생)");
                    break;
            }
        },
        파일: function (arg, params) {
            switch (arg.length) {
                case 0:
                    return type0("");
                    break;
                case 1: {
                    let data = FileStream.read(savePath + "/파일/" + codeToStr(arg[0], params) + ".txt");
                    return type0(data === null ? "(저장된 값 없음)" : data);
                    break;
                }
                case 2:
                    FileStream.write(savePath + "/파일/" + codeToStr(arg[0], params) + ".txt", codeToStr(arg[1], params));
                    return type0("");
                    break;
                default:
                    return type0("(파일 태그 처리 중 오류 발생)");
                    break;
            }
        }
    };
    return function (code, params) {
        if (ban.includes(params.sender)) return;
        code = split(code);
        const result = [];
        code.forEach(x => {
            if (x.type === 1) {
                runBlock(x.value, params).forEach(x => result.push(x));
            } else {
                result.push(x);
            }
        });
        var str = "";
        result.forEach(x => {
            str += x.value;
            if (x.type === 2) {
                if (on) params.replier.reply(str);
                str = "";
                java.lang.Thread.sleep(x.time * 1000);
            }
        });
        if (on) params.replier.reply(str);
    };
})();
Date.prototype.getClock = (function () {
    const TIME = {
        t6: [null, " ░ ", " █ ", " ░ ", " █ ", " ░ "],
        t1: ["███", "░░█", "███", "███", "█░█", "███", "███", "███", "███", "███"],
        t2: ["█░█", "░░█", "░░█", "░░█", "█░█", "█░░", "█░░", "█░█", "█░█", "█░█"],
        t3: ["█░█", "░░█", "███", "███", "███", "███", "███", "█░█", "███", "███"],
        t4: ["█░█", "░░█", "█░░", "░░█", "░░█", "░░█", "█░█", "░░█", "█░█", "░░█"],
        t5: ["███", "░░█", "███", "███", "░░█", "███", "███", "░░█", "███", "███"]
    };
    return function () {
        var Time, result = "";
        Time = (String(this.getHours()).length === 1 ? "0" + this.getHours() : String(this.getHours())) + (String(this.getMinutes()).length === 1 ? "0" + this.getMinutes() : String(this.getMinutes()));
        for (let i = 1; i < 6; i++) {
            result += [TIME["t" + i][Time[0]], TIME["t" + i][Time[1]], TIME["t6"][i], TIME["t" + i][Time[2]], TIME["t" + i][Time[3]]].join(" ") + "\n";
        }
        return result;
    };
})();
