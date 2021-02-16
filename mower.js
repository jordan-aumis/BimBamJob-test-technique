// Here are all the functions concerning the mower 


// It takes the information on the loaded file and tranform it to usable data.
settingMower = (data) => {
    var result = [];
    var tempGrass = [];
    var tempMowers = [];
    for (let i = 0; i < data.length; i++) {
        if (i == 0) {
            tempGrass.push(data[i]);
        } else {
            result.push(data[i]);
        }
    }
    for (let i = 0; i < tempGrass[0].length; i++) {
        grass.push(tempGrass[0][i]);
    }
    for (i = 0, j = result.length; i < j; i += 2) {
        tempMowers.push(result.slice(i, i + 2));
    }
    for (let i = 0; i < tempMowers.length; i++) {
        let tempXYO = [];
        for (let j = 0; j < tempMowers[i][0].length; j++) {
            tempXYO.push(tempMowers[i][0][j]);
        }

        mower[i] = {
            posX: Number(tempXYO[0]),
            posY: Number(tempXYO[1]),
            orientation: tempXYO[3],
            instructions: tempMowers[i][1],
        };
    }
};

// It places the position of the mower on the screen (we will call it everytime after an instruction)
mowerInit = (mower, id) => {
    let orientation = "mower" + mower.orientation;
    if (mower.posX == 0) {
        mower.posX = 1;
    }
    if (mower.posY == 0) {
        mower.posY = 1;
    }
    let pos = 25 - mower.posY * 5 + mower.posX;
    let div = document.getElementById(pos);
    div.classList.remove(div.classList);
    div.classList.add(orientation);
    grassToRemove = div;
};


// this is the algorithm which reads and do the instructions (I made this fonction recursive so it will wait for one instruction to finish before starting a new one using SetTimeout)
command = (instructions, mower, i) => {
    setTimeout(function () {
        if(i == instructions.length){
            createResult(mower, mowerNbr)
            window.scrollTo(0,document.body.scrollHeight);
            mowerNbr++
        }
        mowerInit(mower, mowerNbr);
        if (i < instructions.length) {
            setTimeout(() => {
                removingGrass(grassToRemove);
            }, speed);
        }
        switch (instructions[i]) {
            case "G":
                if (mower.orientation == "S") {
                    mower.orientation = "E";
                } else if (mower.orientation == "N") {
                    mower.orientation = "W";
                } else if (mower.orientation == "W") {
                    mower.orientation = "S";
                } else if (mower.orientation == "E") {
                    mower.orientation = "N";
                }
                break;
            case "D":
                if (mower.orientation == "S") {
                    mower.orientation = "W";
                } else if (mower.orientation == "N") {
                    mower.orientation = "E";
                } else if (mower.orientation == "W") {
                    mower.orientation = "N";
                } else if (mower.orientation == "E") {
                    mower.orientation = "S";
                }
                break;

            case "A":
                if (
                    mower.orientation == "S" &&
                    mower.posY > 0 &&
                    mower.posY <= grass[1]
                ) {
                    mower.posY -= 1;
                } else if (
                    mower.orientation == "N" &&
                    mower.posY > 0 &&
                    mower.posY < grass[1]
                ) {
                    mower.posY += 1;
                } else if (
                    mower.orientation == "E" &&
                    mower.posX > 0 &&
                    mower.posX < grass[0]
                ) {
                    mower.posX += 1;
                } else if (
                    mower.orientation == "W" &&
                    mower.posX > 0 &&
                    mower.posX <= grass[0]
                ) {
                    mower.posX -= 1;
                }
                break;
        }
        i++;
        if (i < instructions.length + 1) {
            command(instructions, mower, i);
        }
        else if(i == instructions.length){
            console.log(mower)
        }
    }, speed);
 
};

// it waits before each mower finishes their intructions to start (It is the same principle as the command function i made it recursive with a setTimeout)

waitTurn=(time=0)=>{
    setTimeout(function () {
        command(mower[turn].instructions, mower[turn], 0);   
        var Newtime = mower[turn].instructions.length*speed+speed
        turn++;
        if (turn < mower.length) {
            waitTurn(Newtime)       
        }  
}, time);
 
}


