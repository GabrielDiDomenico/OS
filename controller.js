class Controller {
    constructor(maxQuantum) {

        this.mq = maxQuantum;
    }

    callCPU(cpu, timer, quantum){
        
        while(true){
            cpu.run(1);

            if(quantum == this.mq){
                return "next_quantum";
            }
            if(timer.timer==300){
                return "force_exit";
            }
            
            var result;
            timer.addTimer();
            result = timer.showInterruption();
            
            if(result=="next"){   
                return "next";
            }else if(result[2][0]!=undefined && result[2][0]!="F"){
                if(cpu.state == "Illegal instruction"){
                    cpu.state = "normal";
                } 
                return result;
            }

            if(cpu.state == "sleep"){ 
                continue;
            }
           
            if(cpu.state == "Illegal instruction"){
                if(cpu.getCurrentInstruction() == "PARA"){
                    return "exit";
                }else if(cpu.getCurrentInstruction().split(" ")[0] == "LE"){
                    return ["LE "+cpu.getCurrentInstruction().split(" ")[1]];
                }else if(cpu.getCurrentInstruction().split(" ")[0] == "GRAVA"){

                    return ["GRAVA "+cpu.getCurrentInstruction().split(" ")[1]];
                }else{
                    return [cpu.state];
                }
            }else if(cpu.state == "normal"){
                
                quantum++;
                cpu.run(1);
            }else{
                
                return cpu.state;
            }

            
        }
        
    }

    
}