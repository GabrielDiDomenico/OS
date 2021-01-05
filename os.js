class OperatingSystem{

    constructor(memSize) {
        this.controller = new Controller(memSize);
        this.cpu = new Cpu(memSize);
        this.ctrlrReturn = "";
        this.output = "normal";
        this.timer = new Timer();
    }

    start(program, file){
        
        this.cpu.loadProgram(program);
   
        this.ctrlrReturn = this.controller.callCPU(this.cpu, this.timer);

        if(this.cpu.state == "Illegal instruction"){
            if(this.ctrlrReturn.split(" ")[0] == "LE"){
                this.cpu.state = "sleep";
                this.timer.setInterruption("a", this.timer.timer+3, "LE "+this.ctrlrReturn.split(" ")[1]);
                //this.readFile(file, this.ctrlrReturn.split(" ")[1]);
                this.start(program,file);
            }else if(this.ctrlrReturn.split(" ")[0] == "GRAVA"){
                this.cpu.state = "sleep";
                this.timer.setInterruption("a", this.timer.timer+10, "GRAVA "+this.ctrlrReturn.split(" ")[1]);
                //this.writeFile(file, this.ctrlrReturn.split(" ")[1]);
                this.start(program,file);
            }else if(this.ctrlrReturn == "exit"){
                this.output = "exit";
            }else{
                this.output = this.cpu.state;
            }
        }else{
            var aux = this.ctrlrReturn+''; // To be able to use split, 
            if(aux.split(" ")[0] == "LE"){
                this.readFile(file, aux.split(" ")[1]);
                this.start(program,file);
            }else if(aux.split(" ")[0] == "GRAVA"){
                this.writeFile(file, aux.split(" ")[1]);
                this.start(program,file);
            }
        }
        
        
        
    }

    readFile(file,n){
        this.cpu.acc = file[n];
        this.cpu.pc++;
        this.cpu.state = "normal";
    }

    writeFile(file,n){
        file[n] = this.cpu.acc;
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
