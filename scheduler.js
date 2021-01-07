class Scheduler{

    constructor(jobs,files,fileItrs) {
        this.jobs = jobs;
        this.files = files;
        this.processTable = [];
        this.currentJob = 0;

        for(let i=0;i<this.jobs.length;i++){
            this.processTable.push([0,0,"normal",files,jobs[i],fileItrs, Array(50)]);
        }
        console.log(this.processTable);
    }

    getProcess(idProcess){
        if(idProcess>=0){
      
            if(this.processTable[idProcess][2]=="sleep"){
                this.processTable[idProcess][2] = "normal";
            }
            return this.processTable[idProcess];
        }

        var auxSleep=0;
        for(let i=0;i<this.processTable.length;i++){
            if(this.processTable[i][2] == "sleep"){
                auxSleep++;
            }
        }
        if(auxSleep.length == this.processTable.length){
            return "sleep";
        }
        var auxJobItr = this.currentJob;
        var endProgram=0;
        for(let i=0;i<this.processTable.length;i++){
            
            if(this.processTable[i][2] == "exit"){
                endProgram++;
                this.processTable[i][4][5] = 2;
                continue;
            }
            if(this.processTable[i][2] == "sleep"){
                
                continue;
            }
            if(this.processTable[i][4][5] == 0){
                this.currentJob = i;
                break;
            }
            for(let j=0;j<this.processTable.length;j++){
                if(this.processTable[j][2]=="sleep"){
                    continue;
                }
                if(this.processTable[j][2]=="exit"){
                    continue;
                }
                if(this.processTable[i][4][5] >= this.processTable[j][4][5]){
                    this.currentJob = j;
                }
            }
        }  
 
        if(auxJobItr == this.currentJob){
            return "sleep";
        }

        if(endProgram == this.processTable.length){
            return "exit";
        }
     

        return this.processTable[this.currentJob];

    }


}