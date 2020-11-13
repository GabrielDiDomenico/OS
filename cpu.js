class Cpu {
    constructor(memSize) {
      this.pc = 0, this.acc = 0, this.state="normal", this.instructionMemory = Array(memSize), this.dataMemory = Array(memSize);
     // this.dataMemory.fill('_',0,this.dataMemory.length);
    }
  
    get memory() {
        return this.dataMemory.length;
    }  
    
    cargi(value) {  
        this.acc = parseInt(value);
        this.pc++;
    }

    cargm(value){
        value = parseInt(value);
        if(this.dataMemory.length > value){
            this.acc = this.dataMemory[value];
            this.pc++;
        }else{
            this.memFail();
        }
    }

    cargx(value){
        value = parseInt(value);
        if(this.dataMemory.length > value){
            if(this.dataMemory[this.dataMemory[value]] < this.dataMemory.length){
                this.acc = this.dataMemory[this.dataMemory[value]];
                this.pc++;
            }else{
                this.memFail();
            }
        }else{
            this.memFail();
        }
    }

    armm(value){
        value = parseInt(value);
        if(this.dataMemory.length > value){
            this.dataMemory[value] = this.acc;
            this.pc++;
        }else{
            this.memFail();
        }
    }

    armx(value){
        value = parseInt(value);
        if(this.dataMemory.length > value){
            if(this.dataMemory[this.dataMemory[value]] < this.dataMemory.length){
                this.dataMemory[this.dataMemory[value]] = this.acc;
                this.pc++;
            }else{
                this.memFail();
            }
        }else{
            this.memFail();
        }
    }

    soma(value){
        value = parseInt(value);
        if(this.dataMemory.length > value){
            this.acc += this.dataMemory[value];
            this.pc++;
        }else{
            this.memFail();
        }
    }

    neg(){
        this.acc *= -1;
        this.pc++;
    }

    desvz(value){
        if(this.acc==0){
            this.pc = value;
        }else{
            this.pc++;
        }
    }

    memFail(){
        this.state = "invalid access memory";
    }

    illegalInstruction(){
        this.state = "Illegal instruction";
    }

    saveState(arq){
        arq.push(this.pc);
        arq.push(this.acc);
        arq.push(this.state);
    }

    loadState(arq){
       this.pc = arq[0];
       this.acc = arq[1];
       this.state = arq[2];
    }

    resetState(){
        this.pc = 0, this.acc = 0, this.state="normal", this.instructionMemory = Array(this.instructionMemory.length), this.dataMemory = Array(this.dataMemory.length);
        //this.dataMemory.fill(0,0,this.dataMemory.length);
    }

    run(n=0){
        var run = true;
        if(n<=0){
            while(run){
                run = this.execute(this.getCurrentInstruction());
            }
        }else{
            for(let i=0;i<n;i++){
                if(!run) break;
                run = this.execute(this.getCurrentInstruction());
            }
        }
    }

    runLine(){
        this.execute(this.getCurrentInstruction());
    }


    execute(line){
        var params = line.split(' ');

        if(this.state != "normal"){
            return false;
        }

        if(params.length == 1){
            if(line == "NEG"){
                this.neg();
                return true;
            }else{
                this.illegalInstruction();
                return false;
            }
        }

        if(params.length == 2){
            if(params[0] == "CARGI"){
                this.cargi(params[1]);
                return true;
            }else if(params[0] == "CARGM"){
                this.cargm(params[1]);
                return true;
            }else if(params[0] == "CARGX"){
                this.cargx(params[1]);
                return true;
            }else if(params[0] == "ARMM"){
                this.armm(params[1]);
                return true;
            }else if(params[0] == "ARMX"){
                this.armx(params[1]);
                return true;
            }else if(params[0] == "SOMA"){
                this.soma(params[1]);
                return true;
            }else if(params[0] == "DESVZ"){
                this.desvz(params[1]);
                return true;
            }else{
                this.illegalInstruction();
                return false;
            }
            
        }
    }

    showDataMemory(i=-1){
        if(i < 0){
            $("#output").append("<p>"+this.dataMemory+"</p>");
        }else if(i < this.dataMemory.length){
            $("#output").append("<p>"+this.dataMemory+"</p>");
        }else{
            this.memFail();
        }

    }

    showInstructionMemory(i=-1){
        if(i < 0){
            $("#output").append("<p>"+this.instructionMemory+"</p>");
        }else if(i < this.instructionMemory.length){
            $("#output").append("<p>"+this.instructionMemory+"</p>");
        }else{
            this.memFail();
        }

    }

    showCpuState(){
        $("#output").append("<p>"+this.pc+"</p>");
        $("#output").append("<p>"+this.acc+"</p>");
        $("#output").append("<p>"+this.state+"</p>");
    }

    resetCpu(){
        this.state = "normal";
    }

    getCurrentInstruction(){
        return this.instructionMemory[this.pc];
    }

    loadProgram(program){
        for(let i=0;i<program.length;i++){
            this.instructionMemory[i] = program[i];
        }
    }
}