class Controller {
    constructor(memSize) {
        this.cpuState="normal";
    }

    callCPU(cpu){
        
        while(true){
            cpu.run(1);
            if(cpu.state == "Illegal instruction"){
                if(cpu.getCurrentInstruction() == "PARA"){
                    return "exit"
                }else if(cpu.getCurrentInstruction() == "LE"){
                    return "LE";
                }else if(cpu.getCurrentInstruction() == "GRAVA"){
                    return "GRAVA";
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