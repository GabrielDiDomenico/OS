class OperatingSystem{
    constructor(memSize) {
        this.controller = new Controller(memSize);
        this.cpu = new Cpu(memSize);
        this.ctrlrReturn = "";
        this.output = "normal";
    }

    start(program, file){
   
        this.cpu.loadProgram(program);
   
        
        this.ctrlrReturn = this.controller.callCPU(this.cpu);

        if(this.ctrlrReturn == "LE"){
            this.readFile(file);
            this.start(program,file);
        }else if(this.ctrlrReturn == "GRAVA"){
            this.writeFile(file);
            this.start(program,file);
        }else if(this.ctrlrReturn == "exit"){
            this.output = "exit";
        }else{
            this.output = this.cpu.state;
        }
        
        
    }

    readFile(file){
        this.cpu.acc = file[0];
        this.cpu.pc++;
        this.cpu.state = "normal";
    }

    writeFile(file){
        file[0] = this.cpu.acc;
        this.cpu.state = "normal";
        this.cpu.pc++;
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
