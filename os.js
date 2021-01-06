class OperatingSystem{

    constructor(memSize,jobs,files) {
        this.controller = new Controller();
        this.cpu = new Cpu(memSize);
        this.ctrlrReturn = "";
        this.output = "normal";
        this.timer = new Timer();
        this.jobs = jobs;
        this.files = files;
        this.jobItr = 0;
    }

    start(){
        if(this.cpu.instructionMemory[0]==undefined){
            this.cpu.loadProgram(this.jobs[this.jobItr][0]);
        }
        
        this.ctrlrReturn = this.controller.callCPU(this.cpu, this.timer);
        if(this.cpu.state == "Illegal instruction"){
            if(this.ctrlrReturn.split(" ")[0] == "LE"){
                this.cpu.state = "sleep";
                this.timer.setInterruption("a", this.timer.timer+this.jobs[this.jobItr][2][0][1], "LE "+this.ctrlrReturn.split(" ")[1]);
                this.jobs[0][2].shift();
                this.start();
            }else if(this.ctrlrReturn.split(" ")[0] == "GRAVA"){
                this.cpu.state = "sleep";
                this.timer.setInterruption("a", this.timer.timer+this.jobs[this.jobItr][3][0][1], "GRAVA "+this.ctrlrReturn.split(" ")[1]);
                this.jobs[0][3].shift();
                this.start();
            }else if(this.ctrlrReturn == "exit"){
                $("#output").append("<p>Accumulator: "+os.cpu.acc+"</p><p>PC: "+os.cpu.pc+"</p>");
                $("#output").append("<p>"+os.getLastLine()+"</p>");
                os.cpu.showDataMemory();
                $("#output").append("<p>State: "+os.getOutput()+"</p>");
                if(this.jobs.length-1 == this.jobItr){
                    this.output = "exit";
                }else{
                    this.output = "normal";
                    this.cpu.resetState();
                    this.jobItr++;
                    
                    this.start();
                }
                
            }else{
                this.output = this.cpu.state;
            }
        }else{
            var aux = this.ctrlrReturn+''; // To be able to use split
            if(aux.split(" ")[0] == "LE"){
                this.readFile(this.files, aux.split(" ")[1]);
                this.start();
            }else if(aux.split(" ")[0] == "GRAVA"){
                this.writeFile(this.files, aux.split(" ")[1]);
                this.start();
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
