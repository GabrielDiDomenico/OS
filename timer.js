class Timer{
    constructor() {
        this.timer=0;
        this.interruptions=[[0,0,0]];
    }

    addTimer(){
        this.timer++;
        
    }

    showTimer(){
        return this.timer;
    }

    showInterruption(){
        
        if(this.interruptions[0][1]==this.timer){
            var aux = [];
            aux = this.interruptions[0];
            this.interruptions.shift();
            this.interruptions.push([0,0,0]);
  
            return aux[2];
        }else{ 
            return "F";
        }

    }

    setInterruption(type, time, code){
       
        this.interruptions.push([type,time,code]);
        if(this.interruptions[0][0] == 0){
            this.interruptions.shift();
        }
 
    }

}
