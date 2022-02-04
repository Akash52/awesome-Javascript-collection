var display = document.getElementById("screen");
var subDisplay = document.getElementById("sub_display");
var buttons = document.getElementsByClassName("btn");
var resultDisplayed = false;
Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener("click", function () {
        if (button.textContent != "=" &&
            button.textContent != "C" &&
            button.textContent != "×" &&
            button.textContent != "÷" &&
            button.textContent != "√" &&
            button.textContent != "x ²" &&
            button.textContent != "mod" &&
            button.textContent != "⌫" &&
            button.textContent != "±" &&
            button.textContent != "sin" &&
            button.textContent != "cos" &&
            button.textContent != "tan" &&
            button.textContent != "atan" &&
            button.textContent != "acos" &&
            button.textContent != "asin" &&
            button.textContent != "log" &&
            button.textContent != "In" &&
            button.textContent != "exp" &&
            button.textContent != "n!" &&
            button.textContent != "π" &&
            button.textContent != "2nd" &&
            button.textContent != "e" &&
            button.textContent != "RAD" &&
            button.textContent != "DEG" &&
            button.textContent != "10x" &&
            button.textContent != "1/x" &&
            button.textContent != "xy" &&
            button.textContent != "|x|" &&
            button.textContent != "F-E" &&
            button.textContent != "⌊x⌋" &&
            button.textContent != "⌈x⌉" &&
            button.textContent != "RAN" &&
            button.textContent != "MC" &&
            button.textContent != "MR" &&
            button.textContent != "M+" &&
            button.textContent != "M-" &&
            button.textContent != "MS" &&
            button.textContent != "ex" &&
            button.textContent != "2x" &&
            button.textContent != "3x" &&
            button.textContent != "∛x" &&
            button.textContent != "/" &&
            button.textContent != "x3" &&
            button.textContent != "+" &&
            button.textContent != "-") {
            display.value += button.textContent;
        }
        else if (button.textContent === "=") {
            equals();
        }
        else if (button.textContent === "C") {
            clear();
        }
        else if (button.textContent === "×") {
            multiply();
        }
        else if (button.textContent === "+") {
            add();
        }
        else if (button.textContent === "-") {
            minus();
        }
        else if (button.textContent === "÷") {
            divide();
        }
        else if (button.textContent === "±") {
            plusMinus();
        }
        else if (button.textContent === "⌫") {
            backspace();
        }
        else if (button.textContent === "mod") {
            percent();
        }
        else if (button.textContent === "π") {
            pi();
        }
        else if (button.textContent === "x ²") {
            square();
        }
        else if (button.textContent === "√") {
            squareRoot();
        }
        else if (button.textContent === "sin") {
            sin();
        }
        else if (button.textContent === "cos") {
            cos();
        }
        else if (button.textContent === "tan") {
            tan();
        }
        else if (button.textContent === "asin") {
            asin();
        }
        else if (button.textContent === "acos") {
            acos();
        }
        else if (button.textContent === "atan") {
            atan();
        }
        else if (button.textContent === "log") {
            log();
        }
        else if (button.textContent === "In") {
            ln();
        }
        else if (button.textContent === "exp") {
            expression();
        }
        else if (button.textContent === "n!") {
            factorial();
        }
        else if (button.textContent === "e") {
            exp();
        }
        else if (button.textContent === "10x") {
            tenpowexp();
        }
        else if (button.textContent === "1/x") {
            fraction();
        }
        else if (button.textContent === "xy") {
            power();
        }
        else if (button.textContent === "|x|") {
            absvalue();
        }
        else if (button.textContent === "F-E") {
            fevalue();
        }
        else if (button.textContent === "⌊x⌋") {
            floor();
        }
        else if (button.textContent === "⌈x⌉") {
            ceil();
        }
        else if (button.textContent === "RAN") {
            random();
        }
        else if (button.textContent === "ex") {
            epowerx();
        }
        else if (button.textContent === "2x") {
            twopowerx();
        }
        else if (button.textContent === "3x") {
            threepowerx();
        }
        else if (button.textContent === "∛x") {
            cubeRoot();
        }
        else if (button.textContent === "x3") {
            cube();
        }
        else if (button.textContent === "MC") {
            memoryClear();
        }
        else if (button.textContent === "MR") {
            memoryRecall();
        }
        else if (button.textContent === "M+") {
            memoryAdd();
        }
        else if (button.textContent === "M-") {
            memorySubtract();
        }
        else if (button.textContent === "MS") {
            memoryStore();
        }
    });
});
function equals() {
    if (display.value.indexOf("^") > -1) {
        var base = display.value.slice(0, display.value.indexOf("^"));
        var exponent_1 = display.value.slice(display.value.indexOf("^") + 1);
    }
    else if (display.value === "" || display.value === undefined) {
        display.value = eval("Math.pow(" + base + "," + exponent + ")");
        clear();
    }
    else {
        try {
            var x = eval(display.value);
            display.value = eval(x);
            subDisplay.value = display.value;
        }
        catch (_a) {
            display.value = "Syntax error!";
        }
    }
}
function clear() {
    display.value = "";
    subDisplay.value = display.value;
}
function backspace() {
    if (display.value.length > 0) {
        display.value = display.value.slice(0, display.value.length - 1);
        subDisplay.value = display.value;
    }
}
var check = function (val, eve) {
    var isvalid;
    var cur_Value = display.value;
    var last_char = cur_Value[cur_Value.length - 1];
    if (display.value !== "0" && display.value !== "") {
        if (last_char === "+" ||
            last_char === "-" ||
            last_char === "/" ||
            last_char === "*" ||
            last_char === "%" ||
            last_char === "!" ||
            last_char === "^" ||
            last_char === "e" ||
            last_char === "e") {
            var assign = cur_Value.substring(0, cur_Value.length - 1) + eve;
            display.value = assign;
            isvalid = false;
        }
        else {
            isvalid = true;
        }
        return isvalid;
    }
};
function multiply() {
    if (check(display.value, "*")) {
        display.value += "*";
    }
}
function divide() {
    if (check(display.value, "/")) {
        display.value += "/";
    }
}
function add() {
    if (check(display.value, "+")) {
        display.value += "+";
    }
}
function minus() {
    if (check(display.value, "-") === true) {
        display.value += "-";
    }
}
function plusMinus() {
    if (display.value.charAt(0) === "-") {
        display.value = display.value.slice(1);
    }
    else {
        display.value = "-" + display.value;
    }
}
function factorial() {
    var fact = 1;
    var value = Number(display.value);
    for (var i = 1; i <= value; i++) {
        fact = fact * i;
        display.value = String(fact);
    }
}
function pi() {
    display.value = String(Number(display.value) * Math.PI);
}
function square() {
    display.value = String(Math.pow(Number(display.value), 2));
}
function squareRoot() {
    display.value = String(Math.sqrt(Number(display.value)));
}
function percent() {
    display.value = String(Number(display.value) / 100);
}
function sin() {
    display.value = String(Math.sin(Number(display.value)));
}
function cos() {
    display.value = String(Math.cos(Number(display.value)));
}
function tan() {
    display.value = String(Math.tan(Number(display.value)));
}
function asin() {
    display.value = String(Math.asin(Number(display.value)));
}
function acos() {
    display.value = String(Math.acos(Number(display.value)));
}
function atan() {
    display.value = String(Math.atan(Number(display.value)));
}
function log() {
    display.value = String(Math.LOG10E);
}
function ln() {
    display.value = String(Math.log(Number(display.value)));
}
function exponent() {
    display.value = String(Math.pow(Number(display.value), 2));
    display.value += "^";
}
function exp() {
    display.value = String(Math.exp(Number(display.value)));
}
function tenpowexp() {
    display.value = String(Math.pow(10, Number(display.value)));
}
function power() {
    display.value += "^";
}
function fraction() {
    display.value = (1 / Number(display.value)).toFixed(2);
}
function absvalue() {
    display.value = String(Math.abs(Number(display.value)));
}
function fevalue() {
    var num = Number(display.value);
    display.value = num.toExponential();
}
function floor() {
    display.value = String(Math.floor(Number(display.value)));
}
function ceil() {
    display.value = String(Math.cbrt(Number(display.value)));
}
function random() {
    display.value = String(Math.random());
}
function epowerx() {
    display.value = String(Math.exp(Number(display.value)));
}
function twopowerx() {
    display.value = String(Math.pow(2, Number(display.value)));
}
function threepowerx() {
    display.value = String(Math.pow(3, Number(display.value)));
}
function cube() {
    display.value = String(Math.pow(Number(display.value), 3));
}
function cubeRoot() {
    display.value = String(Math.pow(Number(display.value), 1 / 3));
}
function expression() {
    display.value = String(eval(display.value));
}
function degtorad() {
    if ($(".degrees").text() == "DEG") {
        display.value = String((Math.PI * Number(display.value)) / 180);
        $(".degrees").text("RAD");
    }
    else {
        display.value = String((180 * Number(display.value)) / Math.PI);
        $(".degrees").text("DEG");
    }
}
//Memory functions
var memory = [];
var data = 0;
function memoryAdd() {
    memory.push(display.value);
    subDisplay.value = "M+(".concat(display.value, ")");
}
function memorySubtract() {
    memory.push(eval("-" + data));
    display.value = String(data);
    subDisplay.value = "M-(".concat(display.value, ")");
}
function memoryRecall() {
    var num = 0;
    memory.forEach(function (data) {
        num += data;
    });
    display.value = String(num);
    subDisplay.value = "MR(".concat(display.value, ")");
}
function memoryStore() {
    memory.push(data);
    display.value = String(memory);
    subDisplay.value = "MS(".concat(display.value, ")");
}
function memoryClear() {
    memory = [];
    display.value = String(memory);
    subDisplay.value = "MC";
}
