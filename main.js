var default_program = [
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
    "PARA"
]

$(document).ready(function() {

    for (let line of default_program){
        if(line == "PARA")
            $("#program").append(line);
        else
            $("#program").append(line+",");
    }
    
});


var arq = [];

var cpu = new Cpu(50);

document.getElementById("run").onclick = function() {
    cpu = new Cpu(50);
    var programText = $("#program").val();

    var program = programText.split(',');

    if(program[program.length - 1] !== "PARA"){
        alert("Program without end");
        return;
    }
        

    cpu.loadProgram(program);
    cpu.run();

}
document.getElementById("stepForward").onclick = function() {

    var programText = $("#program").val();

    var program = programText.split(',');
        

    cpu.loadProgram(program);
    cpu.runLine();

}
document.getElementById("showState").onclick = function() {cpu.showCpuState();}
document.getElementById("showInstruction").onclick = function() {cpu.showInstructionMemory();}
document.getElementById("showCurInstruction").onclick = function() {$("#output").append("<p>"+cpu.getCurrentInstruction()+"</p>");}
document.getElementById("showData").onclick = function() {cpu.showDataMemory();}
document.getElementById("saveState").onclick = function() {cpu.saveState(arq);}
document.getElementById("loadState").onclick = function() {if(arq.length < 1) alert("Nothing to load");  else cpu.loadState(arq);}
document.getElementById("reset").onclick = function() {cpu.resetState(); cpu.resetCpu();}
document.getElementById("clear").onclick = function() {$('#output').empty();}






