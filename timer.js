class Timer{
    constructor(periodicTime) {
        this.timer=0;
        this.interruptions=[[0,0,[]]];
        this.pTime = periodicTime;

    }

    addTimer(){
        this.timer++;
        
    }

    showTimer(){
        return this.timer;
    }

    showInterruption(){
       // alert(this.interruptions);
        var i=0;
        while(this.interruptions.length > i){
            if(this.interruptions[i][0] == 0){
                if(this.interruptions[i][1]==this.timer){
                    var aux = [];
                    aux = this.interruptions[i];
                    this.interruptions.splice(i,1);
                    return aux;
                }
                    
            }else{
                if(this.interruptions[i][1]==this.timer){
                    this.interruptions[i][1] = this.interruptions[i][1]+this.pTime;
                    return "next";
                }
            }
            i++;
        }
        
        return [0,0,["F",0]];
    }

    setInterruption(type, time, code){
       
        this.interruptions.push([type,time,code]);
        if(this.interruptions[0][0] == "0"){
            this.interruptions.shift();
        }
 
    }

}
