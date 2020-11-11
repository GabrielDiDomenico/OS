var program = [
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

let cpu = new Cpu(50);
cpu.loadProgram(program);
cpu.run();
cpu.showCpuState();
cpu.showInstructionMemory();
cpu.saveState();
cpu.loadState();
cpu.showDataMemory();
instr = cpu.getCurrentInstruction();
console.log(instr);




