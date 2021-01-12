class OperatingSystem{

    constructor(memSize,jobs,files,maxQuantum) {
        this.controller = new Controller(maxQuantum);
        this.cpu = new Cpu(memSize);
        this.ctrlrReturn = "";
        this.output = "normal";
        this.timer = new Timer(15);
        this.jobs = jobs;
        this.files = files;
        this.fileItrs = Array(this.files.length);
        this.fileItrs.fill(0,0,this.files.length);
        this.timer.setInterruption(1, 60, ["next",-1]);
        this.quantum = 0;
        this.maxQuantum = maxQuantum;
        this.sch = new Scheduler(jobs,files,this.fileItrs);
        this.currentJob = 0;
    }
    

    start(){
     
        if(this.cpu.instructionMemory[0]==undefined){
            this.cpu.loadProgram(this.jobs[0][0]);
        }
        
        alert(this.sch.processTable);
        this.ctrlrReturn = this.controller.callCPU(this.cpu, this.timer, this.quantum);
 
        if(this.ctrlrReturn == "force_exit"){
            this.output = "force_exit";
        }else if(this.ctrlrReturn == "exit"){
           
            this.cpu.state = "exit";
            this.showResume();
        
            this.callScheduler();
            
            if(this.cpu.state == "exit"){
                this.output = "Exit";
                
            }else{
                this.start();
            }
        }else{
            if(this.ctrlrReturn == "next_quantum" || this.ctrlrReturn == "next"){
                this.callScheduler(-1);
                this.start();
            }
            if(this.cpu.state == "Illegal instruction"){
                if(this.ctrlrReturn[0].split(" ")[0] == "LE"){
                    
                    this.cpu.state = "sleep";
                    this.timer.setInterruption(0, this.timer.timer+this.jobs[this.currentJob][2], ["LE "+this.ctrlrReturn[0].split(" ")[1],this.currentJob]);
                    this.callScheduler();
                    this.start();
        
                }
                if(this.ctrlrReturn[0].split(" ")[0] == "GRAVA"){
        
                    this.cpu.state = "sleep";
        
                    this.timer.setInterruption(0, this.timer.timer+this.jobs[this.currentJob][3], ["GRAVA "+this.ctrlrReturn[0].split(" ")[1],this.currentJob]);
                    this.callScheduler();
                    this.start();
                }
            }
            

            if(this.ctrlrReturn[2][0].split(" ")[0] == "LE"){
                this.cpu.state = "sleep";
                this.callScheduler(this.ctrlrReturn[2][1]);
                this.readFile(this.files,this.ctrlrReturn[2][0].split(" ")[1]);
                this.start();
            }
            if(this.ctrlrReturn[2][0].split(" ")[0] == "GRAVA"){
                this.cpu.state = "sleep";
                
                this.callScheduler(this.ctrlrReturn[2][1]);
                this.writeFile(this.files,this.ctrlrReturn[2][0].split(" ")[1]);
                this.start();
            }
    
            
            if(this.ctrlrReturn[0][0].split(" ")[0] == "Illegal instruction"){
                this.output = "Illegal instruction";
            }
        }

       
    }

    

    callScheduler(idProcessInt=-2){
        
        let auxProc = [];
        var auxQuantum = 0;
        auxQuantum = this.quantum;
        this.quantum = 0;

        this.saveProcess(this.cpu.acc,this.cpu.pc,this.cpu.state,this.files,(Math.trunc((auxQuantum*100)/this.maxQuantum))*Math.pow(10,-2),this.fileItrs,this.cpu.dataMemory);
        this.cpu.resetState();
        this.files = [];
        this.fileItrs = [];
        auxProc = this.sch.getProcess(idProcessInt);
        this.currentJob = auxProc[7];
        this.loadProcess(auxProc);
        
        
    }

    saveProcess(acc,pc,state,files,fracQuantum,fileItrs,dataMem){
        
        let varQuantum = (this.sch.processTable[this.currentJob][4][5]-fracQuantum)/2;
     
        this.sch.processTable[this.currentJob][0] = parseInt(pc);
        this.sch.processTable[this.currentJob][1] = parseInt(acc);
        this.sch.processTable[this.currentJob][2] = state;
        this.sch.processTable[this.currentJob][3] = files;
        
        this.sch.processTable[this.currentJob][4][5] = varQuantum < 0.001 ? 0 : varQuantum;
        this.sch.processTable[this.currentJob][5] = fileItrs;
        this.sch.processTable[this.currentJob][6] = dataMem;

        
    }

    

    loadProcess(process){
        this.cpu.pc = process[0];
        this.cpu.acc = process[1];
        this.cpu.state = process[2];
        this.files = process[3];
        this.cpu.loadProgram(process[4][0]);
        this.fileItrs = process[5];
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

    showFiles(){
        for(let i=0;i<this.files.length;i++){
            $("#output").append("<p>File "+i+": "+this.files[i]+"</p>");
        }
    }

    getLastLine(){
        if(this.cpu.instructionMemory[this.cpu.pc] == undefined){
            return this.cpu.instructionMemory[this.cpu.pc-1];
        }else{
            return this.cpu.instructionMemory[this.cpu.pc];
        }
        
    }

    showResume(){
        $("#output").append("<p>State: "+os.getOutput()+"</p>");
        $("#output").append("<p>Accumulator: "+os.cpu.acc+"</p><p>PC: "+os.cpu.pc+"</p>");
        this.showFiles();
        this.cpu.showDataMemory();
    }

    
}
