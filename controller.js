class Controller {
    constructor(memSize) {
        this.cpuState="normal";
        
    }

    callCPU(cpu, timer){
        
        while(true){
            var result
  
            timer.addTimer();
            result = timer.showInterruption();
            if(result!="F"){  
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
                    return "LE "+cpu.getCurrentInstruction().split(" ")[1];
                }else if(cpu.getCurrentInstruction().split(" ")[0] == "GRAVA"){
                    return "GRAVA "+cpu.getCurrentInstruction().split(" ")[1];
                }else{
                    return cpu.state;
                }
            }else if(cpu.state == "normal"){
                cpu.run(1);
            }else{
                return cpu.state;
            }
        }
        
    }

    
}