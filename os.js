class OperatingSystem{

    constructor(memSize,jobs,maxQuantum) {
        this.controller = new Controller(maxQuantum);
        this.cpu = new Cpu(memSize);
        this.ctrlrReturn = "";
        this.output = "normal";
        this.timer = new Timer(15);
        this.jobs = jobs;
        this.files = this.jobs[0][6];
        this.fileItrs = this.jobs[0][7];
        this.timer.setInterruption(1, 15, ["next",-1]);
        this.quantum = 0;
        this.maxQuantum = maxQuantum;
        var filesSched = [];
        var filesItrsSched = [];
        for(let i=0;i< jobs.length;i++){
            filesSched.push(jobs[i][6])
        }
        for(let j=0;j<filesSched.length;j++){
            filesItrsSched.push(jobs[j][7]);
        }
        this.sch = new Scheduler(jobs,filesSched,filesItrsSched);
        this.currentJob = 0;

        //benchmark
        this.programsSchedTimes = [0,0,0]
        this.programsTime = [];
        this.x=[];
    }
    getJobstimers(){
        var somaInit = [];
        var somaEnd = [];
        var usoCPU =0;

        for(let i=0;i<this.x.length;i++){
            $("#output").append("<p>Job "+i+" hora inicio: <span id='jobb"+i+"'>"+this.x[i][4][4]+"</span></p>");
            
            somaInit.push(parseInt(document.getElementById("jobb"+i).innerText));
        }
        for(let i=0;i<this.x.length;i++){
            $("#output").append("<p>Job "+i+" hora fim: <span id='job"+i+"'>"+this.programsTime[i]+"<span></p>");
            somaEnd.push(parseInt(document.getElementById("job"+i).innerText));
        }
        
        for(let i=0;i<somaInit.length;i++){
            let a = 0;
            a = somaEnd[i]-somaInit[i];
            $("#output").append("<p>Job "+i+" tempo de retorno: <span id='job"+i+"'>"+a+"<span></p>");
        }
        for(let i=0;i<this.x.length;i++){
            usoCPU = parseInt(document.getElementById("cpu"+i).innerText);
            let aux=0;
            let a = 0;
            a = somaEnd[i]-somaInit[i];
            aux = usoCPU*100/a;
            $("#output").append("<p>Job "+i+" porcentual de uso de CPU: <span id='jobb"+i+"'>"+aux+"%</span></p>");
            
        }
        for(let i=0;i<somaInit.length;i++){
            
            $("#output").append("<p>Job "+i+" vezes bloqueado: <span id='jobBloq"+i+"'>"+this.programsSchedTimes[i]+"<span></p>");
        }
    }

    start(){
     
        if(this.cpu.instructionMemory[0]==undefined){
            this.cpu.loadProgram(this.jobs[0][0]);
        }
      
        
        this.ctrlrReturn = this.controller.callCPU(this.cpu, this.timer, this.quantum);
 
        if(this.ctrlrReturn == "force_exit"){
            this.output = "force_exit";
        }else if(this.ctrlrReturn == "exit"){
           
            this.cpu.state = "exit";
        
            this.programsTime.push(this.timer.timer);

            //this.showResume();
            
            this.callScheduler();
            
            if(this.cpu.state == "exit"){
                for(let i=0;i< this.sch.doneProcess.length;i++){
            
                    this.x.push(this.sch.doneProcess[i]);
                    $("#output").append("<p>Job "+i+" vezes escalonado: <span id='jobbb"+i+"'>"+this.x[i][9]+"</span></p>");
                    $("#output").append("<p>Job "+i+" vezes que perdeu por preempção: <span id='jobbbP"+i+"'>"+this.x[i][10]+"</span></p>");
                }
                
                this.x.push(this.sch.processTable[0]);
                $("#output").append("<p>Job2 vezes escalonado: <span id='jobbb2'>"+this.x[2][9]+"</span></p>");
                $("#output").append("<p>Job "+2+" vezes que perdeu por preempção: <span id='jobbbP"+2+"'>"+this.x[2][10]+"</span></p>");
                this.getJobstimers();
                $("#output").append("<p>Tempo ativo: <span id='timer'>"+this.timer.timer+"</span></p>");
                $("#output").append("<p>Tempo ocioso: <span id='timerOc'>"+this.controller.timeOcCPU+"</span></p>");
                let auxauxaux = this.controller.timeES + this.controller.timeES1 + this.controller.timeStop + this.controller.timeStop1;
                $("#output").append("<p>Quantas vezes chamou o SO: <span id='timerSO'>"+auxauxaux+"</span></p>");
                $("#output").append("<p>Quantas vezes chamou o por chamada E/S: <span id='timerES'>"+this.controller.timeES+"</span></p>");
                $("#output").append("<p>Quantas vezes chamou o por retorno E/S: <span id='timerES1'>"+this.controller.timeES1+"</span></p>");
                $("#output").append("<p>Quantas vezes chamou o por parada: <span id='timerStop'>"+this.controller.timeStop+"</span></p>");
                $("#output").append("<p>Quantas vezes chamou o por parada por preempção: <span id='timerStop1'>"+this.controller.timeStop1+"</span></p>");
                $("#output").append("<p>Quantas vezes trocou processo: <span id='procChange'>"+this.controller.countInst+"</span></p>");
                
                this.output = "Exit";
                
            }else{
                this.start();
            }
        }else{
            if(this.ctrlrReturn == "next_quantum" || this.ctrlrReturn == "next"){
                
                this.callScheduler(-1);
                this.programsSchedTimes[this.sch.processTable[this.currentJob][8]]++;
                if(this.ctrlrReturn == "next_quantum"){
                    this.sch.processTable[this.currentJob][10]++;
                }
                
                this.start();
            }
            if(this.cpu.state == "Illegal instruction"){
                if(this.ctrlrReturn[0].split(" ")[0] == "LE"){
                    
                    this.cpu.state = "sleep";
                    this.timer.setInterruption(0, this.timer.timer+this.jobs[this.currentJob][2], ["LE "+this.ctrlrReturn[0].split(" ")[1],this.currentJob]);
                    this.programsSchedTimes[this.sch.processTable[this.currentJob][8]]++;
                    this.callScheduler();
                    
                    this.start();
        
                }
                if(this.ctrlrReturn[0].split(" ")[0] == "GRAVA"){
        
                    this.cpu.state = "sleep";
        
                    this.timer.setInterruption(0, this.timer.timer+this.jobs[this.currentJob][3], ["GRAVA "+this.ctrlrReturn[0].split(" ")[1],this.currentJob]);
                    this.programsSchedTimes[this.sch.processTable[this.currentJob][8]]++;
                    this.callScheduler();
                    
                    this.start();
                }
            }
            

            if(this.ctrlrReturn[2][0].split(" ")[0] == "LE"){
                this.cpu.state = "sleep";
                
                this.callScheduler(this.ctrlrReturn[2][1]);
                this.programsSchedTimes[this.sch.processTable[this.currentJob][8]]++;
                this.readFile(this.files,this.ctrlrReturn[2][0].split(" ")[1]);
                this.start();
            }
            if(this.ctrlrReturn[2][0].split(" ")[0] == "GRAVA"){
                this.cpu.state = "sleep";
                
                
                this.callScheduler(this.ctrlrReturn[2][1]);
                this.programsSchedTimes[this.sch.processTable[this.currentJob][8]]++;
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
        if(process[4][4]==0 && process[8] != 0){
            process[4][4] = this.timer.timer;
        }
      
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
        file[n].pop();
        file[n].push(this.cpu.acc);
        file[n].push(0);
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
        $("#output").append("<p>State: "+this.getOutput()+"</p>");
        $("#output").append("<p>Accumulator: "+os.cpu.acc+"</p><p>PC: "+os.cpu.pc+"</p>");
        

    }

    
    
}
