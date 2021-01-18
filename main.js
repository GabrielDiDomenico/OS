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
var files1 = [[10,20,30,0],[100,200,0],[0],[0],[0],[0]];
var fileItrs1 = Array(this.files1.length);
fileItrs1.fill(0,0,this.files1.length);
var files2 = [[10,20,30,0],[100,200,0],[0],[0],[0],[0]];
var fileItrs2 = Array(this.files1.length);
fileItrs2.fill(0,0,this.files1.length);
var files3 = [[10,20,30,0],[100,200,0],[0],[0],[0],[0]];
var fileItrs3 = Array(this.files1.length);
fileItrs3.fill(0,0,this.files1.length);



var jobs = [
    [program2, program2.length, 4, 4, 0, 0.5, files2, fileItrs2],
    [program1, program1.length, 4, 4, 0, 0.5, files1, fileItrs1],
    [program3, program3.length, 4, 4, 0, 0.5, files3, fileItrs3]
 
]

console.log(jobs);


var os = new OperatingSystem(50,jobs,15);

// 15
// 30

document.getElementById("run").onclick = function() {os.start();}
document.getElementById("sort").onclick = function() {os.sort();}
document.getElementById("showState").onclick = function() {$("#output").append("<p>State: "+os.getOutput()+"</p>");}
document.getElementById("showRegister").onclick = function() {$("#output").append("<p>Accumulator: "+os.cpu.acc+"</p><p>PC: "+os.cpu.pc+"</p>");}
document.getElementById("showInstruction").onclick = function() {os.cpu.showInstructionMemory();}
document.getElementById("showCurInstruction").onclick = function() {$("#output").append("<p>"+os.getLastLine()+"</p>");}
document.getElementById("showData").onclick = function() {os.cpu.showDataMemory();}
document.getElementById("showFiles").onclick = function() {os.showFiles();}
document.getElementById("saveState").onclick = function() {os.cpu.saveState(arq);}
document.getElementById("loadState").onclick = function() {if(file.length < 1) alert("Nothing to load");  else os.cpu.loadState(arq);}
document.getElementById("reset").onclick = function() { location.reload();}
document.getElementById("clear").onclick = function() {$('#output').empty();}






