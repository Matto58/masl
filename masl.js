const fs = require("fs");
const fl = fs.readFileSync(process.argv[2], "utf-8").split("\n");
const args = process.argv.slice(3);

const nothing = ()=>{};

let banks = [
    "    ".split(""),
    "    ".split(""),
    "    ".split(""),
    "    ".split("")
];

let viewLines = false;
let showMem = false;

for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case "--view-lines":
            viewLines = true;
            break;
        case "-vl":
            viewLines = true;
            break;
        case "--show-mem":
            showMem = true;
            break;
        case "-sm":
            showMem = true;
            break;

    }
}

let output = "";
for (let i = 0; i < fl.length; i++) {
    const line = fl[i].split(" ");
    if (line != "") {
        // console.log(line);
        const cmd = line[0];
        const args = line[1].split(",");

        switch (cmd.toLowerCase()) {
            case "psh":
                if (args[2].charAt(1).toLowerCase() == "x") // hex
                    banks[parseInt(args[0])][parseInt(args[1])] = parseInt(args[2].substring(2), 16);
                else if (args[2].charAt(1).toLowerCase() == "b") // binary
                    banks[parseInt(args[0])][parseInt(args[1])] = parseInt(args[2].substring(2), 2);
                else
                    banks[parseInt(args[0])][parseInt(args[1])] = parseInt(args[2]);
                break;
            case "cnt":
                if (banks[parseInt(args[0])][parseInt(args[1])] == " ") output += " ";
                else if (args[2] == "ch")
                    output += String.fromCharCode(banks[parseInt(args[0])][parseInt(args[1])]);
                else if (args[2] == "nm")
                    output += banks[parseInt(args[0])][parseInt(args[1])];
                else if (args[2] == "hx")
                    output += banks[parseInt(args[0])][parseInt(args[1])].toString(16).toUpperCase();
                else if (args[2] == "bn")
                    output += banks[parseInt(args[0])][parseInt(args[1])].toString(2);
                else {
                    console.log("Error: Unknown type in line " + (i + 1));
                    process.exit(1);
                }
                break;
            case "add": // example: add <num1>,<num2>,<bank>,<register>
                var num1 = 0;
                var num2 = 0;
                var bank = parseInt(args[2]);
                var reg = parseInt(args[3]);
                if (args[0].charAt(1).toLowerCase() == "x") // hex
                    num1 = parseInt(args[0].substring(2), 16);
                else if (args[0].charAt(1).toLowerCase() == "b") // binary
                    num1 = parseInt(args[0].substring(2), 2);
                else
                    num1 = parseInt(args[0]);
                if (args[1].charAt(1).toLowerCase() == "x") // hex
                    num2 = parseInt(args[1].substring(2), 16);
                else if (args[1].charAt(1).toLowerCase() == "b") // binary
                    num2 = parseInt(args[1].substring(2), 2);
                else
                    num2 = parseInt(args[1]);
                banks[bank][reg] = num1 + num2;
                break;
            case "sub": // example: sub <num1>,<num2>,<bank>,<register>
                var num1 = 0;
                var num2 = 0;
                var bank = parseInt(args[2]);
                var reg = parseInt(args[3]);
                if (args[0].charAt(1).toLowerCase() == "x") // hex
                    num1 = parseInt(args[0].substring(2), 16);
                else if (args[0].charAt(1).toLowerCase() == "b") // binary
                    num1 = parseInt(args[0].substring(2), 2);
                else
                    num1 = parseInt(args[0]);
                if (args[1].charAt(1).toLowerCase() == "x") // hex
                    num2 = parseInt(args[1].substring(2), 16);
                else if (args[1].charAt(1).toLowerCase() == "b") // binary
                    num2 = parseInt(args[1].substring(2), 2);
                else
                    num2 = parseInt(args[1]);
                banks[bank][reg] = num1 - num2;
                break;
            case "mul": // example: mul <num1>,<num2>,<bank>,<register>
                var num1 = 0;
                var num2 = 0;
                var bank = parseInt(args[2]);
                var reg = parseInt(args[3]);
                if (args[0].charAt(1).toLowerCase() == "x") // hex
                    num1 = parseInt(args[0].substring(2), 16);
                else if (args[0].charAt(1).toLowerCase() == "b") // binary
                    num1 = parseInt(args[0].substring(2), 2);
                else
                    num1 = parseInt(args[0]);
                if (args[1].charAt(1).toLowerCase() == "x") // hex
                    num2 = parseInt(args[1].substring(2), 16);
                else if (args[1].charAt(1).toLowerCase() == "b") // binary
                    num2 = parseInt(args[1].substring(2), 2);
                else
                    num2 = parseInt(args[1]);
                banks[bank][reg] = num1 * num2;
                break;
            case "div":
                var num1 = 0;
                var num2 = 0;
                var bank = parseInt(args[2]);
                var reg = parseInt(args[3]);
                if (args[0].charAt(1).toLowerCase() == "x") // hex
                    num1 = parseInt(args[0].substring(2), 16);
                else if (args[0].charAt(1).toLowerCase() == "b") // binary
                    num1 = parseInt(args[0].substring(2), 2);
                else
                    num1 = parseInt(args[0]);
                if (args[1].charAt(1).toLowerCase() == "x") // hex
                    num2 = parseInt(args[1].substring(2), 16);
                else if (args[1].charAt(1).toLowerCase() == "b") // binary
                    num2 = parseInt(args[1].substring(2), 2);
                else
                    num2 = parseInt(args[1]);
                banks[bank][reg] = num1 / num2;
                break;
            case "mdl":
                var num1 = 0;
                var num2 = 0;
                var bank = parseInt(args[2]);
                var reg = parseInt(args[3]);
                if (args[0].charAt(1).toLowerCase() == "x") // hex
                    num1 = parseInt(args[0].substring(2), 16);
                else if (args[0].charAt(1).toLowerCase() == "b") // binary
                    num1 = parseInt(args[0].substring(2), 2);
                else
                    num1 = parseInt(args[0]);
                if (args[1].charAt(1).toLowerCase() == "x") // hex
                    num2 = parseInt(args[1].substring(2), 16);
                else if (args[1].charAt(1).toLowerCase() == "b") // binary
                    num2 = parseInt(args[1].substring(2), 2);
                else
                    num2 = parseInt(args[1]);
                banks[bank][reg] = num1 % num2;
            case "jmp": // example: jmp <line>,<side1>,<side2>,<cond_sign>
                var l = parseInt(args[0]);
                var side1 = parseInt(args[1]);
                var side2 = parseInt(args[2]);
                var cond_sign = args[3];
                var cond = false;
                switch (cond_sign) {
                    case "==":
                        cond = banks[0][side1] == banks[0][side2];
                        break;
                    case "!=":
                        cond = banks[0][side1] != banks[0][side2];
                        break;
                    case ">":
                        cond = banks[0][side1] > banks[0][side2];
                        break;
                    case "<":
                        cond = banks[0][side1] < banks[0][side2];
                        break;
                    case ">=":
                        cond = banks[0][side1] >= banks[0][side2];
                        break;
                    case "<=":
                        cond = banks[0][side1] <= banks[0][side2];
                        break;
                    default:
                        console.log("Error: invalid condition sign at line " + i);
                        process.exit(1);
                }
                if (cond) {
                    // convert line number from hex/binary to decimal
                    if (l.charAt(1).toLowerCase() == "x") // hex
                        l = parseInt(l.substring(2), 16);
                    else if (l.charAt(1).toLowerCase() == "b") // binary
                        l = parseInt(l.substring(2), 2);
                    else
                        l = parseInt(l);
                    if (l < 0 || l >= lines.length) {
                        console.log("Error: invalid line number to jump to at line " + i);
                        process.exit(1);
                    }
                }
                break;
            case "adr": // example: adr <bank1>,<register1>,<bank2>,<register2>,<bank3>,<register3>
                var bank1 = parseInt(args[0]);
                var reg1 = parseInt(args[1]);
                var bank2 = parseInt(args[2]);
                var reg2 = parseInt(args[3]);
                var bank3 = parseInt(args[4]);
                var reg3 = parseInt(args[5]);
                banks[bank1][reg1] = banks[bank2][reg2] + banks[bank3][reg3];
                break;
            case "sbr": // example: sbr <bank1>,<register1>,<bank2>,<register2>,<bank3>,<register3>
                var bank1 = parseInt(args[0]);
                var reg1 = parseInt(args[1]);
                var bank2 = parseInt(args[2]);
                var reg2 = parseInt(args[3]);
                var bank3 = parseInt(args[4]);
                var reg3 = parseInt(args[5]);
                banks[bank1][reg1] = banks[bank2][reg2] - banks[bank3][reg3];
                break;
            case "mlr": // example: mlr <bank1>,<register1>,<bank2>,<register2>,<bank3>,<register3>
                var bank1 = parseInt(args[0]);
                var reg1 = parseInt(args[1]);
                var bank2 = parseInt(args[2]);
                var reg2 = parseInt(args[3]);
                var bank3 = parseInt(args[4]);
                var reg3 = parseInt(args[5]);
                banks[bank1][reg1] = banks[bank2][reg2] * banks[bank3][reg3];
                break;
            case "dvr": // example: dvr <bank1>,<register1>,<bank2>,<register2>,<bank3>,<register3>
                var bank1 = parseInt(args[0]);
                var reg1 = parseInt(args[1]);
                var bank2 = parseInt(args[2]);
                var reg2 = parseInt(args[3]);
                var bank3 = parseInt(args[4]);
                var reg3 = parseInt(args[5]);
                banks[bank1][reg1] = Math.round(banks[bank2][reg2] / banks[bank3][reg3]);
                break;
            case "mdr": // example: mdr <bank1>,<register1>,<bank2>,<register2>,<bank3>,<register3>
                var bank1 = parseInt(args[0]);
                var reg1 = parseInt(args[1]);
                var bank2 = parseInt(args[2]);
                var reg2 = parseInt(args[3]);
                var bank3 = parseInt(args[4]);
                var reg3 = parseInt(args[5]);
                banks[bank1][reg1] = banks[bank2][reg2] % banks[bank3][reg3];
                break;
            case "jmr": // example: jmr <line>,<bank1>,<register1>,<bank2>,<register2>,<cond_sign>
                var l = parseInt(args[0]);
                var bank1 = parseInt(args[1]);
                var reg1 = parseInt(args[2]);
                var bank2 = parseInt(args[3]);
                var reg2 = parseInt(args[4]);
                var cond_sign = args[5];
                var cond = false;
                switch (cond_sign) {
                    case "==":
                        cond = banks[bank1][reg1] == banks[bank2][reg2];
                        break;
                    case "!=":
                        cond = banks[bank1][reg1] != banks[bank2][reg2];
                        break;
                    case ">":
                        cond = banks[bank1][reg1] > banks[bank2][reg2];
                        break;
                    case "<":
                        cond = banks[bank1][reg1] < banks[bank2][reg2];
                        break;
                    case ">=":
                        cond = banks[bank1][reg1] >= banks[bank2][reg2];
                        break;
                    case "<=":
                        cond = banks[bank1][reg1] <= banks[bank2][reg2];
                        break;
                    default:
                        console.log("Error: invalid condition sign at line " + i);
                        process.exit(1);
                }
                if (cond) {
                    // convert line number from hex/binary to decimal
                    if (l.charAt(1).toLowerCase() == "x") // hex
                        l = parseInt(l.substring(2), 16);
                    else if (l.charAt(1).toLowerCase() == "b") // binary
                        l = parseInt(l.substring(2), 2);
                    else
                        l = parseInt(l);
                    if (l < 0 || l >= lines.length) {
                        console.log("Error: invalid line number to jump to at line " + i);
                        process.exit(1);
                    }
                }
                break;
        }
    }
}

output != "" ? console.log(output) : nothing();
showMem ? console.log(banks) : nothing();
viewLines ? console.log(fl) : nothing();