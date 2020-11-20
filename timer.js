class Timer{
    constructor() {
        this.timer=0;
        this.interruption=false;
    }

    addTimer(){
        this.timer++;
    }

    showTimer(){
        return this.timer;
    }


}
