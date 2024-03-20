const lifeworld = {
    init(numCols,numRows){
        this.numCols = numCols;
        this.numRows = numRows;
        this.world = this.buildArray();
        this.worldBuffer = this.buildArray();
        this.randomSetup();
    },

    buildArray(){
        let outerArray = [];
        for(let row = 0; row<this.numRows; row++) {
            let innerArray = [];
            for(let col = 0; col<this.numCols; col++) {
                innerArray.push(0);
            }
            outerArray.push(innerArray);
        }
        return outerArray;
    },

    randomSetup(){
        for(let row = 0; row < this.numRows; row++) {
            for(let col = 0; col < this.numCols; col++) {
                this.world[row][col] = 0;
                if(Math.random() < 0.1) {
                    this.world[row][col] = 1;
                }
            }
        }
    },

    getLivingNeighbors(row,col){
        // TODO:
        if (row < 0 || col < 0 ||
            row >= this.numRows || col >= this.numCols) {
            return 0;
        }
        /*
        let livingNeighbors = 0;
        for (let rowCheck = row - 1; rowCheck <= row + 1; rowCheck++) {
            for (let colCheck = col - 1; colCheck <= col + 1; colCheck++) {
                if (rowCheck >= 0 && colCheck >= 0 &&
                    rowCheck < this.numRows && colCheck < this.numCols &&
                    rowCheck !== row && colCheck !== col) {
                    if (this.world[rowCheck][colCheck] === 1) {
                        livingNeighbors++;
                    }
                }
            }
        }
        return livingNeighbors;
        */


        let livingNeighbors = 0;

        for(let rowCheck = row-1; rowCheck <= row+1; rowCheck++) {

            for(let colCheck = col-1; colCheck <= col+1; colCheck++) {

                if(rowCheck >= 0 && 
                   colCheck >= 0 && 
                   rowCheck < this.numRows && 
                   colCheck < this.numCols && 
                   !(rowCheck == row && colCheck == col)) {

                    if(this.world[rowCheck][colCheck] === 1) {

                        livingNeighbors++;

                    }
                }
            }
        }
        return livingNeighbors;
    },

    step(){
        // TODO: 
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                let livingNeighbors = this.getLivingNeighbors(row, col);

                if (this.world[row][col] === 1 && (livingNeighbors < 2 || livingNeighbors > 3)) {
                        this.worldBuffer[row][col] = 0;
                } /*else {
                        this.worldBuffer[row][col] = 1;
                    }*/
                else if (this.world[row][col] === 0 && livingNeighbors === 3) {
                        this.worldBuffer[row][col] = 1;
                }
                else {
                    this.worldBuffer[row][col] = this.world[row][col];
                }
            }
        }
        
        
        const temp = this.world;
        this.world = this.worldBuffer;
        this.worldBuffer = temp;
        
        //this.randomSetup();
    }
}