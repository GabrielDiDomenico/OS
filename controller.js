class Controller {
    constructor(memSize) {
        this.cpuState="normal";
        this.cpu = new Cpu(memSize);
        this.response = this.cpu.state;
    }

    callCPU(program, file){
        this.cpu.loadProgram(program);
        this.cpu.run();
        if(this.cpu.state == "Illegal instruction"){
            if(this.cpu.getCurrentInstruction() == "PARA"){
                this.response = "exit"
            }else if(this.cpu.getCurrentInstruction() == "LE"){
                
            }else if(this.cpu.getCurrentInstruction() == "GRAVA"){
    
            }else{
                this.response = this.cpu.state;
            }
        }else{
            this.response = this.cpu.state;
        }
        

    }

    getResponse(){
        return this.response;
    }

    getLastLine(){
        if(this.cpu.instructionMemory[this.cpu.pc] == undefined){
            return this.cpu.instructionMemory[this.cpu.pc-1];
        }else{
            return this.cpu.instructionMemory[this.cpu.pc];
        }
        
    }
}