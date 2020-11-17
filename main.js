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


var file = [];
var os = new OperatingSystem(50);

document.getElementById("run").onclick = function() {
    
    var programText = $("#program").val();

    var program = programText.split(',');
    
    os.start(program, file);

}
// document.getElementById("stepForward").onclick = function() {

//     var programText = $("#program").val();

//     var program = programText.split(',');
        

//     cpu.loadProgram(program);
//     cpu.runLine();

// }
document.getElementById("showState").onclick = function() {$("#output").append("<p>State: "+os.controller.getResponse()+"</p>");}
document.getElementById("showRegister").onclick = function() {$("#output").append("<p>Accumulator: "+os.controller.cpu.acc+"</p><p>PC: "+os.controller.cpu.pc+"</p>");}
document.getElementById("showInstruction").onclick = function() {os.controller.cpu.showInstructionMemory();}
document.getElementById("showCurInstruction").onclick = function() {$("#output").append("<p>"+os.controller.getLastLine()+"</p>");}
document.getElementById("showData").onclick = function() {os.controller.cpu.showDataMemory();}
document.getElementById("saveState").onclick = function() {os.controller.cpu.saveState(arq);}
document.getElementById("loadState").onclick = function() {if(arq.length < 1) alert("Nothing to load");  else os.controller.cpu.loadState(arq);}
document.getElementById("reset").onclick = function() {os.controller.cpu.resetState(); os.controller.cpu.resetCpu();}
document.getElementById("clear").onclick = function() {$('#output').empty();}






