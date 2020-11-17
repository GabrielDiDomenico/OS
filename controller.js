class Controller {
    constructor(memSize) {
        this.cpuState="normal";
        this.cpu = new Cpu(memSize);
        this.output;
    }

    start(program){
        this.cpu.loadProgram(program);
        this.cpu.run();
        // if(this.cpu.getCurrentInstruction() == "PARA"){
        //     this.output = "exit"
        // }
        // if(this.cpu.getCurrentInstruction() == "LE"){

        // }
        // if(this.cpu.getCurrentInstruction() == "LE"){

        // }
    }

    getOutput(){
        return this.output;
    }

    getLastLine(){
        if(this.cpu.instructionMemory[this.cpu.pc] == undefined){
            return this.cpu.instructionMemory[this.cpu.pc-1];
        }else{
            return this.cpu.instructionMemory[this.cpu.pc];
        }
        
    }
}