let cpu = new Cpu(50);

document.getElementById("button").onclick = function(){cpu.saveState();}

var json = require(['./data.json']);
console.log(json);
