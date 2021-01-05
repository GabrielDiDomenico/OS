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
    "LE 0",
    "CARGI 0",
    "GRAVA 0",
    "PARA"
]

$(document).ready(function() {

    for (let line of default_program){
        if(line == "PARA")
            $("#program").append(line);
        else
            $("#program").append(line+"\n");
    }
    
});


var file = [10];
var os = new OperatingSystem(50);

document.getElementById("run").onclick = function() {
    
    var programText = $("#program").val();

    var program = programText.split('\n');
    
    os.start(program, file);


}


document.getElementById("showState").onclick = function() {$("#output").append("<p>State: "+os.getOutput()+"</p>");}
document.getElementById("showRegister").onclick = function() {$("#output").append("<p>Accumulator: "+os.cpu.acc+"</p><p>PC: "+os.cpu.pc+"</p>");}
document.getElementById("showInstruction").onclick = function() {os.cpu.showInstructionMemory();}
document.getElementById("showCurInstruction").onclick = function() {$("#output").append("<p>"+os.getLastLine()+"</p>");}
document.getElementById("showData").onclick = function() {os.cpu.showDataMemory();}
document.getElementById("saveState").onclick = function() {os.cpu.saveState(arq);}
document.getElementById("loadState").onclick = function() {if(file.length < 1) alert("Nothing to load");  else os.cpu.loadState(arq);}
document.getElementById("reset").onclick = function() { location.reload();}
document.getElementById("clear").onclick = function() {$('#output').empty();}






