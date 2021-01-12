class Scheduler{

    constructor(jobs,files,fileItrs) {
        this.jobs = jobs;
        this.files = files;
        this.processTable = [];
        this.countExit = 0;
        for(let i=0;i<this.jobs.length;i++){
            this.processTable.push([0,0,"normal",files,jobs[i],fileItrs, Array(50),i]);
        }
        this.doneProcess = []
        console.log(this.processTable);
    }

    getProcess(idProcess){
        
        
        this.sortTable();
        if(this.processTable[0][2]=="exit"){
            if(this.processTable.length==1){
                return this.processTable[0];
            }
            this.doneProcess.push(this.processTable[0]);
            this.processTable.shift();
            for(let i=0;i<this.processTable.length;i++){
                this.processTable[i][7]--;
            }
            this.sortTable();
        }
        
        for(let i=0;i<this.processTable.length;i++){
            
            if(idProcess>=0){
                if(this.processTable[idProcess][2]=="sleep"){
                    this.processTable[idProcess][2] = "normal";
                }
                return this.processTable[idProcess];
            }
            if(idProcess==-1){
                if(this.processTable[0][2]=="sleep"){
                    this.processTable[0][2] = "normal";
                }
                return this.processTable[0];
            }
            if(this.processTable[i][2]=="sleep"){
                continue;
            }
            
          
            return this.processTable[i];
        }
      
        return this.processTable[0];
    }

    sortTable(){

        var auxtable=[];
        for(let i=0;i<this.processTable.length-1;i++){
            
            let min_idx = i;
            for(let j=i+1;j<this.processTable.length;j++){
                if(this.processTable[j][4][5] < this.processTable[min_idx][4][5]){
                    min_idx = j; 
                }
            }
            auxtable = this.processTable[min_idx];
            this.processTable[min_idx] = this.processTable[i];
            this.processTable[i] = auxtable;
        }
        
    }

}