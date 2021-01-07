class Controller {
    constructor(maxQuantum) {

        this.mq = maxQuantum;
    }

    callCPU(cpu, timer, quantum){
        console.log(timer);
        while(true){
            if(quantum == this.mq){
                return "next1";
            }
            if(timer.timer==300){
                return "force_exit";
            }
            var result=[];
            timer.addTimer();
            result.push(timer.showInterruption());
            console.log(result);
            
             
            if(result[0][0]=="next"){   
                return result[0][0];
            }else if(result[0][0]!=undefined && result[0][0]!="F"){
                
                return result;
            }
            if(cpu.state == "sleep"){
                
                continue;
            }
            
            cpu.run(1);
           
            if(cpu.state == "Illegal instruction"){
               
                if(cpu.getCurrentInstruction() == "PARA"){

                    return "exit";
                }else if(cpu.getCurrentInstruction().split(" ")[0] == "LE"){

                    return [["LE "+cpu.getCurrentInstruction().split(" ")[1],0]];
                }else if(cpu.getCurrentInstruction().split(" ")[0] == "GRAVA"){

                    return [["GRAVA "+cpu.getCurrentInstruction().split(" ")[1],0]];
                }else{

                    return cpu.state;
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