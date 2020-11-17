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

var controller = new Controller(50);

document.getElementById("run").onclick = function() {

    var programText = $("#program").val();

    var program = programText.split(',');
    console.log(program)
    
    controller.start(program);

}
// document.getElementById("stepForward").onclick = function() {

//     var programText = $("#program").val();

//     var program = programText.split(',');
        

//     cpu.loadProgram(program);
//     cpu.runLine();

// }
document.getElementById("showState").onclick = function() {controller.cpu.showCpuState();}
document.getElementById("showInstruction").onclick = function() {controller.cpu.showInstructionMemory();}
document.getElementById("showCurInstruction").onclick = function() {$("#output").append("<p>"+controller.getLastLine()+"</p>");}
document.getElementById("showData").onclick = function() {controller.cpu.showDataMemory();}
document.getElementById("saveState").onclick = function() {controller.cpu.saveState(arq);}
document.getElementById("loadState").onclick = function() {if(arq.length < 1) alert("Nothing to load");  else controller.cpu.loadState(arq);}
document.getElementById("reset").onclick = function() {controller.cpu.resetState(); controller.cpu.resetCpu();}
document.getElementById("clear").onclick = function() {$('#output').empty();}






