class Cpu {
    constructor(memSize) {
      this.pc = 0; this.acc = 0, this.state="normal", this.instructionMemory = Array(memSize), this.dataMemory = Array(memSize);
      this.dataMemory.fill(50,0,50);
    }
  
    get memory() {
        return this.dataMemory[40];
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
            memFail();
        }
    }

    cargx(value){
        value = parseInt(value);
        if(this.dataMemory.length > value){
            if(this.dataMemory[this.dataMemory[value]] < this.dataMemory.length){
                this.acc = this.dataMemory[this.dataMemory[value]];
                this.pc++;
            }else{
                memFail();
            }
        }else{
            memFail();
        }
    }

    armm(value){
        value = parseInt(value);
        if(this.dataMemory.length > value){
            this.dataMemory[value] = this.acc;
            this.pc++;
        }else{
            memFail();
        }
    }

    armx(value){
        value = parseInt(value);
        if(this.dataMemory.length > value){
            if(this.dataMemory[this.dataMemory[value]] < this.dataMemory.length){
                this.dataMemory[this.dataMemory[value]] = this.acc;
                this.pc++;
            }else{
                memFail();
            }
        }else{
            memFail();
        }
    }

    soma(value){
        value = parseInt(value);
        if(this.dataMemory.length > value){
            acc += this.dataMemory[value];
            this.pc++;
        }else{
            memFail();
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

    loadState(arq){
        var values = JSON.parse(arq);
    }
}