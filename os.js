class OperatingSystem{
    constructor(memSize) {
        this.controller = new Controller(memSize);
        this.output = this.controller.response;
    }

    start(program, file){
        this.controller.callCPU(program, file);
        this.output = this.controller.response;
    }

    getOutput(){
        return this.output;
    }
}
