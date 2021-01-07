var program1 = [
    "CARGI 6",
    "ARMM 0",
    "CARGI 7",
    "ARMM 1",
    "CARGI 0",
    "ARMM 2",
    "CARGM 0",
    "DESVZ 17",
    "CARGM 2",
    "SOMA 1",
    "ARMM 2",
    "CARGI 1",
    "NEG",
    "SOMA 0",
    "ARMM 0",
    "CARGI 0",
    "DESVZ 6",
    "CARGM 2",
    "LE 0",
    "CARGI 0",
    "GRAVA 1",
    "PARA"
]
var program2 = [
    "CARGI 0",
    "ARMM 0",
    "LE 0",
    "ARMM 1",
    "CARGI 1",
    "NEG",
    "ARMM 2",
    "CARGM 0",
    "SOMA 1",
    "ARMM 0",
    "CARGM 1",
    "SOMA 2",
    "ARMM 1",
    "DESVZ 16",
    "CARGI 0",
    "DESVZ 7",
    "CARGM 0",
    "GRAVA 1",
    "PARA"
]
var program3 = [
    "LE 0",
    "ARMM 0",
    "LE 1",
    "SOMA 0",
    "GRAVA 2",
    "DESVZ 8",
    "CARGI 0",
    "DESVZ 0",
    "PARA"
]

var jobs = [
    [program1, program1.length, 5, 5, 0, 0.5],
    [program2, program2.length, 5, 5, 0, 0.5],
    [program3, program3.length, 5, 5, 0, 0.5]
]

console.log(jobs);

var files = [[10,20,30,0],[100,200,0],[0],[0],[0],[0]];
var os = new OperatingSystem(50,jobs,files,30);

document.getElementById("run").onclick = function() {os.start();}
document.getElementById("showState").onclick = function() {$("#output").append("<p>State: "+os.getOutput()+"</p>");}
document.getElementById("showRegister").onclick = function() {$("#output").append("<p>Accumulator: "+os.cpu.acc+"</p><p>PC: "+os.cpu.pc+"</p>");}
document.getElementById("showInstruction").onclick = function() {os.cpu.showInstructionMemory();}
document.getElementById("showCurInstruction").onclick = function() {$("#output").append("<p>"+os.getLastLine()+"</p>");}
document.getElementById("showData").onclick = function() {os.cpu.showDataMemory();}
document.getElementById("saveState").onclick = function() {os.cpu.saveState(arq);}
document.getElementById("loadState").onclick = function() {if(file.length < 1) alert("Nothing to load");  else os.cpu.loadState(arq);}
document.getElementById("reset").onclick = function() { location.reload();}
document.getElementById("clear").onclick = function() {$('#output').empty();}






