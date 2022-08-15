const fs = require("fs");
const fln = process.argv[2];

const metadata = {
    "version": "1.0.0-beta5",
    "author": "Matto58"
}

let viewLines = false;
let showMem = false;
let showCurrent = false;
let removeIntro = false;
let monochrome = false;

const colors = JSON.parse(fs.readFileSync("./color.json"));

const args = process.argv.slice(3);
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
        case "--show-current":
            showCurrent = true;
            break;
        case "-sc":
            showCurrent = true;
            break;
        case "--remove-intro":
            removeIntro = true;
            break;
        case "-ri":
            removeIntro = true;
            break;
        case "--monochrome":
            monochrome = true;
            break;
        case "-mc":
            monochrome = true;
            break;
    }
}

if (!removeIntro) {
    // show in blue text
    console.log((!monochrome ? "\x1b[34m" : "") + "MASL v" + metadata.version + (!monochrome ? "\x1b[90m" : "") + " by " + metadata.author);
    if (fln == "-h" || fln == "--help") {
        console.log((!monochrome ? "\x1b[33m" : "") + "Usage" + (!monochrome ? "\x1b[0m" : "") + ": masl.js <filename> [args]");
        process.exit(0);
    }
    console.log((!monochrome ? "\x1b[32m" : "") + "Running file " + (!monochrome ? "\x1b[92m\"" : "\"") + process.argv[2] + (!monochrome ? "\"\x1b[0m" : "\""));
}

const fl = fs.readFileSync(fln, "utf-8").split("\n");
const nothing = ()=>{};

let banks = [
    "    ".split(""),
    "    ".split(""),
    "    ".split(""),
    "    ".split("")
];



let output = "";
for (let i = 0; i < fl.length; i++) {
    const ll = fl[i].split(" ");
    if (ll != null && ll.length > 0 && ll[0].replace(" ", "") != "" && ll[0] != "#") {
        // console.log(line);
        const cmd = ll[0];
        const args = ll[1].split(",");
        showCurrent
            ? console.log((monochrome ? "\x1b[90m" : "") + (i+1) + ": " + fl[i] + "\x1b[0m") 
            : nothing();
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
                var fg = args[3];
                var bg = args[4];
                var s = args[5];
                if (!monochrome) {
                    if (fg != undefined && fg != "" && colors["fg"][fg] != undefined) {
                        output += "\x1b[" + colors["fg"][fg] + "m";
                    }
                    if (bg != undefined && bg != "" && colors["bg"][bg] != undefined) {
                        output += "\x1b[" + colors["bg"][bg] + "m";
                    }
                    if (s != undefined && s != "" && colors["styles"][s] != undefined) {
                        output += "\x1b[" + colors["styles"][s] + "m";
                    }
                }
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
                    console.log((!monochrome ? "\x1b[31m" : "") + "Error: Unknown type in line " + (i + 1) + "\x1b[0m");
                    process.exit(1);
                }
                break;
            case "cnl":
                var fg = args[3];
                var bg = args[4];
                var s = args[5];
                if (!monochrome) {
                    if (fg != undefined && fg != "" && colors["fg"][fg] != undefined) {
                        output += "\x1b[" + colors["fg"][fg] + "m";
                    }
                    if (bg != undefined && bg != "" && colors["bg"][bg] != undefined) {
                        output += "\x1b[" + colors["bg"][bg] + "m";
                    }
                    if (s != undefined && s != "" && colors["styles"][s] != undefined) {
                        output += "\x1b[" + colors["styles"][s] + "m";
                    }
                }
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
                    console.log((!monochrome ? "\x1b[31m" : "") + "Error: Unknown type in line " + (i + 1) + "\x1b[0m");
                    process.exit(1);
                }
                console.log(output);
                output = "";
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
                var l = args[0];
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
                        console.log((!monochrome ? "\x1b[31m" : "") + "Error: invalid condition sign at line " + (i + 1) + "\x1b[0m");
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
                    if (l < 0 || l > fl.length) {
                        console.log((!monochrome ? "\x1b[31m" : "") + "Error: invalid line number to jump to at line " + (i+1) + "\x1b[0m");
                        process.exit(1);
                    }
                    i = l - 2;
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
                var l = args[0];
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
                        console.log((!monochrome ? "\x1b[31m" : "") + "Error: invalid condition sign at line " + (i+1) + "\x1b[0m");
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
                    if (l < 0 || l > fl.length) {
                        console.log((!monochrome ? "\x1b[31m" : "") + "Error: invalid line number to jump to at line " + (i+1) + "\x1b[0m");
                        process.exit(1);
                    }
                    i = l - 2;
                }
                break;
            case "rng": // example: rng <min>,<max>,<bank>,<register>
                var min = parseInt(args[0]);
                var max = parseInt(args[1]);
                var bank = parseInt(args[2]);
                var reg = parseInt(args[3]);
                banks[bank][reg] = Math.floor(Math.random() * (max - min + 1)) + min;
                break;
            case "flr": // example: flr <filename>
                var filename = args[0];
                var f = fs.readFileSync(filename, "utf8");
                output += f;
                break;
            case "frl": // example: frl <filename>
                var filename = args[0];
                var f = fs.readFileSync(filename, "utf8");
                console.log(output + f);
                output = "";
                break;
            case "flw": // example: flw <filename>,<bank>,<register>,<type>
                var filename = args[0];
                var bank = parseInt(args[1]);
                var reg = parseInt(args[2]);
                var type = args[3];
                if (type == "hx") { // hex
                    var n = parseInt(banks[bank][reg], 16);
                    fs.writeFileSync(filename, n.toString(16), "utf8");
                } else if (type == "bn") { // binary
                    var n = parseInt(banks[bank][reg], 2);
                    fs.writeFileSync(filename, n.toString(2), "utf8");
                } else if (type == "ch") { // char
                    var n = String.fromCharCode(banks[bank][reg]);
                    fs.writeFileSync(filename, n, "utf8");
                } else if (type == "nm") { // number
                    fs.writeFileSync(filename, banks[bank][reg].toString(), "utf8");
                } else {
                    console.log((!monochrome ? "\x1b[31m" : "") + "Error: invalid file type at line " + (i+1) + "\x1b[0m");
                    process.exit(1);
                }
                break;
        }
    }
}

output != "" ? console.log(output + "\x1b[0m") : nothing();
showMem ? console.log(banks) : nothing();
viewLines ? console.log(fl) : nothing();