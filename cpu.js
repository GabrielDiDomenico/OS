class Cpu {
    constructor(memSize) {
      this.pc = 0, this.acc = 0, this.state="normal", this.instructionMemory = Array(memSize), this.dataMemory = Array(memSize);
      this.dataMemory.fill(0,0,this.dataMemory.length);
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

    saveState(){
        function encode( s ) {
            var out = [];
            for ( var i = 0; i < s.length; i++ ) {
                out[i] = s.charCodeAt(i);
            }
            return new Uint8Array( out );
        }
        
        var data = encode( JSON.stringify({
            pc: this.pc,
            acc: this.acc,
            state: this.state
            
        }, null, 3) );
    
        var blob = new Blob( [ data ], {
            type: 'application/octet-stream'
        });
      
        var link = document.createElement( 'a' );
        link.setAttribute( 'href', URL.createObjectURL( blob ) );
        link.setAttribute( 'download', 'data.json' );
        
        var event = document.createEvent( 'MouseEvents' );
        event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent( event );
    }

    loadState(pc,acc,state){
        if(parseInt(pc) >= 0){
            this.pc = pc;
        }else{
            alert("Invalid PC Value");
            return;
        }
            
        if(parseInt(acc) >= 0){
            this.acc = acc;
        }
        else{
            alert("Invalid ACC Value");
            return;
        }

        if(state != "Illegal instruction" && state != "invalid access memory" && state != "normal"){
            alert("Invalid State Value");
            return;
        }else{
            this.state = state;
        }
            

        location.reload();
        alert("Load Finished");
    }

    resetState(){
        this.pc = 0, this.acc = 0, this.state="normal", this.instructionMemory = Array(this.instructionMemory.length), this.dataMemory = Array(this.dataMemory.length);
        this.dataMemory.fill(0,0,this.dataMemory.length);
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
            console.log(this.dataMemory);
        }else if(i < this.dataMemory.length){
            console.log(this.dataMemory[i]);
        }else{
            this.memFail();
        }

    }

    showInstructionMemory(i=-1){
        if(i < 0){
            console.log(this.instructionMemory);
        }else if(i < this.instructionMemory.length){
            console.log(this.instructionMemory[i]);
        }else{
            this.memFail();
        }

    }

    showCpuState(){
        console.log(this.state);
        alert(this.state);
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