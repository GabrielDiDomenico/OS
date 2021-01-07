class Timer{
    constructor(periodicTime) {
        this.timer=0;
        this.interruptions=[["0",0,[]]];
        this.pTime = periodicTime;
    }

    addTimer(){
        this.timer++;
        
    }

    showTimer(){
        return this.timer;
    }

    showInterruption(){
        var i=0;
        while(this.interruptions.length > i){
            if(this.interruptions[i][0] == "a"){
                if(this.interruptions[i][1]==this.timer){
                    var aux = [];
                    aux = this.interruptions[i];
                    this.interruptions.shift();
                    this.interruptions.push([0,0,[]]);
        
                    return aux[2];
                }
                    
                
            }else{
                console.log(this.timer);
                if(this.interruptions[i][1]==this.timer){
                    this.interruptions[i][1] = this.interruptions[i][1]+this.pTime;
                    return this.interruptions[i][2];
                }
            }
            i++;
        }
        
        return ["F",0];
    }

    setInterruption(type, time, code){
       
        this.interruptions.push([type,time,code]);
        if(this.interruptions[0][0] == "0"){
            this.interruptions.shift();
        }
 
    }

}
