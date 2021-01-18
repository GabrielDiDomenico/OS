class Controller {
    constructor(maxQuantum) {
        this.countCPU=0;
        this.idProcessCPU=0;
        this.timeOcCPU=0;
        this.timeES=0;
        this.timeES1=0;
        this.timeStop=0;
        this.timeStop1=0;
        this.instructionChecker = "";
        this.countInst=0;
        this.mq = maxQuantum;
    }

    callCPU(cpu, timer, quantum){
        
        while(true){
            if(this.instructionChecker == ""){
                this.instructionChecker = cpu.instructionMemory[0];
            }else{
                if(this.instructionChecker != cpu.instructionMemory[0]){
                    this.countInst++;
                    this.instructionChecker = cpu.instructionMemory[0];
                }
            }
            
            cpu.run(1);
        
            timer.addTimer();
            if(quantum == this.mq){
                this.timeStop1++;
                return "next_quantum";
            }
            if(timer.timer==500){
                this.timeStop++;
                return "force_exit";
            }
            
            var result;
            
            result = timer.showInterruption();
            
            if(result=="next"){
                this.timeStop++;   
                return "next";
            }else if(result[2][0]!=undefined && result[2][0]!="F"){
                if(cpu.state == "Illegal instruction"){
                    cpu.state = "normal";
                } 
                this.timeES1++;
                return result;
            }

            if(cpu.state == "sleep"){ 
                this.timeOcCPU++;
                continue;
            }
           
            if(cpu.state == "Illegal instruction"){
                
                if(cpu.getCurrentInstruction() == "PARA"){
                    $("#output").append("<p>Uso de CPU Job"+this.idProcessCPU+": <span id='cpu"+this.idProcessCPU+"'>"+this.countCPU+"</span></p>");
                    this.idProcessCPU++;
                    this.countCPU=0;
                    return "exit";
                }else if(cpu.getCurrentInstruction().split(" ")[0] == "LE"){
                    this.timeES++;
                    return ["LE "+cpu.getCurrentInstruction().split(" ")[1]];
                }else if(cpu.getCurrentInstruction().split(" ")[0] == "GRAVA"){
                    this.timeES++;
                    return ["GRAVA "+cpu.getCurrentInstruction().split(" ")[1]];
                }else{
                    this.timeStop++;
                    return [cpu.state];
                }
            }else if(cpu.state == "normal"){
                this.countCPU++;
                quantum++;
                cpu.run(1);
            }else{
                this.timeStop++;
                return cpu.state;
            }

            
        }
        
    }

    
}