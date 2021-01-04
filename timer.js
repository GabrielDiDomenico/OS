class Timer{
    constructor() {
        this.timer=0;
        this.interruptions=[];
    }

    addTimer(){
        this.timer++;
    }

    showTimer(){
        return this.timer;
    }

    showInterruption(){
        aux = this.interruption[0];
        this.interruption.shift();
        return aux[2];

    }

    addInterruption(type, time, code){
        this.interruptions.push([type,time,code]);
    }

}
