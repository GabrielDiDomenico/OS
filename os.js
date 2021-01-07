class OperatingSystem{

    constructor(memSize,jobs,files,maxQuantum) {
        this.controller = new Controller(maxQuantum);
        this.cpu = new Cpu(memSize);
        this.ctrlrReturn = "";
        this.output = "normal";
        this.timer = new Timer(15);
        this.jobs = jobs;
        this.files = files;
        this.fileItrs = Array(this.files.length)
        this.fileItrs.fill(0,0,this.files.length);
        this.timer.setInterruption("p", 15, ["next",-1]);
        this.quantum = 0;
        this.maxQuantum = maxQuantum;
        this.sch = new Scheduler(jobs,files,this.fileItrs);
    }

    start(){
        
        if(this.cpu.instructionMemory[0]==undefined){
            this.cpu.loadProgram(this.jobs[0][0]);
        }
        
        this.ctrlrReturn = this.controller.callCPU(this.cpu, this.timer, this.quantum);
        console.log(this.ctrlrReturn[0]);
        if(this.cpu.state == "Illegal instruction"){
            if(this.ctrlrReturn[0].split(" ")[0] == "LE"){
                console.log("entro0");
                this.cpu.state = "sleep";
                this.timer.setInterruption("a", this.timer.timer+this.jobs[this.sch.currentJob][2], ["LE "+this.ctrlrReturn.split(" ")[1],this.sch.currentJob]);
                this.callScheduler();
                this.quantum = 0;
                this.start();
            }else if(this.ctrlrReturn.split(" ")[0] == "GRAVA"){
                this.cpu.state = "sleep";
                this.timer.setInterruption("a", this.timer.timer+this.jobs[this.sch.currentJob][3], ["GRAVA "+this.ctrlrReturn.split(" ")[1],this.sch.currentJob]);
                this.callScheduler();
                this.quantum = 0;
                this.start();
            }else {
                console.log("entro0");
                this.output = this.cpu.state;
            }
        }else if(this.ctrlrReturn == "exit"){
            console.log("entro1"); 
            this.callScheduler();
            this.quantum = 0;
            if(this.output == "exit"){
                console.log("terminou");
            }else{
                this.start();
            }
            
        }else if(this.ctrlrReturn == "next"){
            console.log("entro2");
            this.cpu.state = "sleep";
           
            this.callScheduler();
            
            this.quantum = 0;
            this.start();
        }else if(this.ctrlrReturn == "next1"){
            this.callScheduler();
            
            this.quantum = 0;
            this.start();
        }else{
            
            var aux = this.ctrlrReturn; // To be able to use split
            
            if(aux[0].split(" ")[0] == "LE"){
                
                this.callScheduler(aux[1]);
                console.log("entro3");
                this.quantum = 0;
                this.readFile(this.files, aux[0].split(" ")[1]);
                // this.start();
            }else if(aux[0].split(" ")[0] == "GRAVA"){
                console.log("entro4");
                this.callScheduler(aux[1]);
                this.quantum = 0;
                this.writeFile(this.files, aux[0].split(" ")[1]);
                this.start();
            }
        }
        
        
        
    }

    callScheduler(idProcessInt=-1){
        let auxProc = [];
        var auxQuantum = 0;
        auxQuantum = this.quantum;
        this.quantum = 0;
        this.saveProcess(this.cpu.acc,this.cpu.pc,this.cpu.state,this.files,(Math.trunc((auxQuantum*100)/this.maxQuantum))*Math.pow(10,-2),this.fileItrs,this.cpu.dataMemory);
        auxProc = this.sch.getProcess(idProcessInt);
        this.cpu.resetState();
        if(auxProc == "exit"){
            this.output = "exit";
        }else if(auxProc == "sleep"){
            this.cpu.state = "sleep";
            this.start();
        }else{
            this.loadProcess(auxProc);
        }

    }

    saveProcess(acc,pc,state,files,fracQuantum,fileItrs,dataMem){
        this.sch.processTable[this.sch.currentJob][0] = parseInt(acc);
        this.sch.processTable[this.sch.currentJob][1] = parseInt(pc);
        this.sch.processTable[this.sch.currentJob][2] = state;
        this.sch.processTable[this.sch.currentJob][3] = files;
        this.sch.processTable[this.sch.currentJob][4][5] = (this.sch.processTable[this.sch.currentJob][4][5]-fracQuantum)/2;
        this.sch.processTable[this.sch.currentJob][5] = fileItrs;
        this.sch.processTable[this.sch.currentJob][6] = dataMem;
    }

    loadProcess(process){
        this.cpu.loadState(process);
        this.files = process[3];
        this.cpu.loadProgram(process[4][0]);
        console.log(this.cpu.instructionMemory);
        this.fileItrs = process[5];
        console.log(process[6]);
        this.cpu.dataMemory = process[6];
      
    }

    readFile(file,n){
        if(file[n][this.fileItrs[n]] == undefined){
            this.cpu.acc = 0;
        }else{
            this.cpu.acc = file[n][this.fileItrs[n]];
            this.fileItrs[n] = this.fileItrs[n]+1;
        }
        this.cpu.pc++;
        this.cpu.state = "normal";
    }

    writeFile(file,n){
        file[n][this.fileItrs[n]] = this.cpu.acc;
        this.fileItrs[n] = this.fileItrs[n]+1;
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
