var arr = [],
    box, ei, ej;

function swap(arr, i1, j1, i2, j2) {
    t = arr[i1][j1];
    arr[i1][j1] = arr[i2][j2];
    arr[i2][j2] = t;
}
window.onload = function() {
    box = document.getElementById("box");
}

function cellClick(event) {
    var event = event || window.event,
        el = event.target,
        i = el.id.charAt(0),
        j = el.id.charAt(2);
    /*
     * Если пустая ячейка расположена в одном стобце или строке
     * с ячейкой, по которой кликнули, и расстояние между
     * этими ячейками 1, то меняем их содержимое местами
     */
    if ((i == ei && Math.abs(j - ej) == 1) || (j == ej && Math.abs(i - ei) == 1)) {
        document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
        el.innerHTML = "";
        //Запоминаем положение пустой ячейки
        ei = i;
        ej = j;
        var flag = true;
        //  Проверяем не в выигрышной ли комбинации находятся ячейки.
        var select = document.getElementById("levels");
        var value = select.value;
        if (value == '1') {
            Winn(2, 2);
            //  Winn(4,4);
        }
        if (value == '2') {
            Winn(5, 5);
        }
        if (value == '3') {
            Winn(6, 6);
        }
    }

    function Winn(q, w) {
        for (i = 0; i < q; ++i)
            for (j = 0; j < w; ++j)
                if (i + j != q * 2 - 2 && document.getElementById(i + " " + j).innerHTML != i * q + j + 1) {
                    flag = false;
                    break;
                }
        if (flag == true) {
            var timer = document.getElementById("game-screen1");
            var box = document.getElementById("box");
            var recordtable = document.getElementById("infoAboutGamer1");
            timer.style.display = "none";
            box.style.display = "none";
            recordtable.style.display = "block";
            alert("Victory!");
            //  var loos = document.getElementById("box");
            // loos.style.display="none";
            // var wingame = document.querySelector(".wingame");
            // wingame.style.display="block";
            var p = document.getElementById("username");
            console.log("username = " + p.value);
            Stop();
        }
    }
}

function newGame(q, w, n, m) {
    var box = document.getElementById("box");
    box.style.display = "block";
    //  var q;
    // var  w;
    //    var n,m;
    for (i = 0; i < q; ++i) {
        arr[i] = []
        for (j = 0; j < w; ++j) {
            if (i + j != q * 2 - 2) arr[i][j] = i * q + j + 1;
            else arr[i][j] = "";
        }
    }
    //5
    ei = n;
    ej = m;
    for (i = 0; i < 1000; ++i) switch (Math.round(3 * Math.random())) {
        case 0:
            if (ei != 0) swap(arr, ei, ej, --ei, ej);
            break; // up
        case 1:
            if (ej != n) swap(arr, ei, ej, ei, ++ej);
            break; // right
        case 2:
            if (ei != m) swap(arr, ei, ej, ++ei, ej);
            break; // down
        case 3:
            if (ej != 0) swap(arr, ei, ej, ei, --ej); // left
    }
    var table = document.createElement("table"),
        tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (i = 0; i < q; ++i) {
        var row = document.createElement("tr");
        for (j = 0; j < w; ++j) {
            var cell = document.createElement("td");
            cell.id = i + " " + j;
            cell.onclick = cellClick;
            cell.innerHTML = arr[i][
                j
            ]; // Добавляем ячейку в строку
            row.appendChild(cell);
        }
        tbody.appendChild(row); // Добавляем строку в итаблицу					
    }
    //    * Проверяем, нет ли у
    // 
    //<div id="box"> дочернего эл-та.
    //	 * То есть таблицы. Она уже будет на странице
    //	 * если  функция newGame вызвана нажатием
    //	 * кнопки "New game", а не при загрузки страницы.
    if (box.childNodes.length == 1) box.removeChild(box.firstChild);
    box.appendChild(table);
}

function start1() {
    count = 0;
    var tb = document.querySelector(".tableRecord").style.display = "none";
    var select = document.getElementById("levels");
    var value = select.value;
    var timer = document.getElementById("game-screen1");
    //  alert(value);
    if (value == '1') {
        timer.style.display = "block";
        Reset()
        newGame(2, 2, 1, 1);
        // newGame(4,4,3,3);
        Start();
    }
    if (value == '2') {
        timer.style.display = "block";
        Reset()
        newGame(5, 5, 4, 4);
        Start();
    }
    if (value == '3') {
        timer.style.display = "block";
        Reset()
        newGame(6, 6, 5, 5);
        Start();
    }
}
var seconds = 00;
var tens = 00;
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var Interval;

function Start() {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}

function Stop() {
    clearInterval(Interval);
}

function Reset() {
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
}

function startTimer() {
    tens++;
    if (tens < 9) {
        appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9) {
        appendTens.innerHTML = tens;
    }
    if (tens > 99) {
        console.log("seconds");
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
}
// coockie
var page = {
    init: function() {
        Reset();
        Start();
        // this.game_interface.init();
        //this.tableRecord_game.init();
    },
    tableRecord_game: {
        mas: [],
        // gamer : {name: null, timer: null},
        draw_tableRecord: function(mas) {
            var theTable = document.createElement('table');
            tr = document.createElement('tr'); // шапка таблицы
            td = document.createElement('td');
            td.appendChild(document.createTextNode('Имя игрока'));
            tr.appendChild(td);
            /******/
            td = document.createElement('td');
            td.appendChild(document.createTextNode("Рекорд (мс)"));
            tr.appendChild(td);
            theTable.appendChild(tr);
            // Note, don't forget the var keyword!
            for (var i = 0, tr,
                    td; i < 4; i++) {
                tr = document.createElement('tr');
                td = document.createElement('td');
                if (mas[i].name == '_ga') i++;
                // console.log(mas[i].name + "mas Name");
                td.appendChild(document.createTextNode(mas[i].name));
                tr.appendChild(td);
                td = document.createElement('td'); //(parseInt((mas[i].timer/1000)%60)
                td.appendChild(document.createTextNode(mas[i].timer + " мс"));
                tr.appendChild(td);
                theTable.appendChild(tr);
            }
            var tableRecord = document.querySelector(".tableRecord");
            tableRecord.innerHTML = "";
            tableRecord.appendChild(theTable);
        },
        compareRecordTime: function(personA, personB) {
            return personA.timer - personB.timer;
        },
        SetCookie: function(time, usname) {
            // var usname = document.getElementById("username");
            var usvalue = seconds * 1000 + tens;
            console.log("NAME = " + usname);
            console.log("VALUE" + usvalue);
            var expires = "";
            if (time) {
                var date = new Date();
                date.setTime(date.getTime() + time * 10000);
                expires = "; expires=" + date.toGMTString();
            }
            document.cookie = usname + "=" + usvalue + expires + "; path=/";
            window.location.reload();
            console.log("cookie == " + document.cookie);
        },
        DelCookie: function() {
            SetCookie(0, mas);
        },
        GetCookie: function(mas) {
            var usname = document.getElementById('username');
            //var usvalue = seconds*1000 + tens;
            var nameEQ = usname.value + "=";
            //console.log("в GC name = " + nameEQ);
            // console.log("GC value = " + usvalue);
            var ca = document.cookie.split(';');
            console.log("ca = " + ca)
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                /********/
                var dop = c.indexOf('=');
                var valueForPush = c.substring(dop + 1, c.length);
                var gamer = {};
                gamer.name = c.substring(0, dop);
                gamer.timer = valueForPush;
                console.log(" name = " + gamer.name + "  record  = " + gamer.timer);
                // console.log('value i = ' + i);
                mas.push(gamer);
                // console.log("m = " + mas[i].name + mas[i].timer);
            }
            // console.log("ca" + ca);
            // console.log('длина массива ' + mas.length)
            //console.log(ca); // выводит все значения
            console.log("до сортировки массив");
            for (var i = 0; i < mas.length; i++) {
                console.log(" name = " + mas[i].name + "  record  = " + mas[i].timer);
            }
            mas.sort(page.tableRecord_game.compareRecordTime);
            console.log("после сортировки массив");
            for (var i = 0; i < mas.length; i++) {
                console.log(" name = " + mas[i].name + "  record  = " + mas[i].timer);
            }
            // draw_table();
            page.tableRecord_game.draw_tableRecord(page.tableRecord_game.mas);
            // return null;
        },
        init: function() // инициализируем все
        {
            this.div = document.querySelector(".tableRecord");
            this.draw_tableRecord();
        },
    },
}

function afterGetName() {
    var usname = document.getElementById('username');
    var recordtable = document.getElementById("infoAboutGamer1");
    recordtable.style.display = "none";
    page.tableRecord_game.SetCookie(500, usname.value);
    console.log(usname.value);
}
var count = 0;

function ShowRecords2() {
    var timer = document.getElementById("game-screen1").style.display = "none";
    var box = document.getElementById("box").style.display = "none";
    var tb = document.querySelector(".tableRecord");
    if (count == 1) {
        return;
    }
    if (tb.style.display = 'none') {
        // alert('zs');
        tb.style.display = 'block';
        page.tableRecord_game.GetCookie(page.tableRecord_game.mas);
        count = 1;
    } else {
        //     tb.style.display = 'none';
    }
}
