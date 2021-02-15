var fileSelector = document.getElementById("file-selector");
var divResult = document.getElementById("result");
var intro = document.getElementById("intro");
var grass = [];
var grassToRemove;
var result;
var tondeuse = [];
var turn = 0
var speed = 200;
var tondeuseNbr = 1
// var tondeuse = {
//     posX: 4,
//     posY: 4,
//     orientation: 'S'
// }
// var tondeuse2 = {
//     posX: 2,
//     posY: 2,
//     orientation: 'N'
// }

getData = (selector, readFile) => {
    selector.addEventListener("change", (event) => {
        const fileList = event.target.files;
        readFile(fileList[0]);
    });
};

settingTondeuse = (data) => {
    
    var result = [];
    var tempGrass = [];
    var tempTondeuses = [];
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
        tempTondeuses.push(result.slice(i, i + 2));
    }
    for (let i = 0; i < tempTondeuses.length; i++) {
        let tempXYO = [];
        for (let j = 0; j < tempTondeuses[i][0].length; j++) {
            tempXYO.push(tempTondeuses[i][0][j]);
        }
        tondeuse[i] = {
            posX: Number(tempXYO[0]),
            posY: Number(tempXYO[1]),
            orientation: tempXYO[3],
            instructions: tempTondeuses[i][1],
        };
    }
};

tondeuseInit = (tondeuse) => {
    let orientation = "tondeuse" + tondeuse.orientation;
    if (tondeuse.posX == 0) {
        tondeuse.posX = 1;
    }
    if (tondeuse.posY == 0) {
        tondeuse.posY = 1;
    }
    let pos = 25 - tondeuse.posY * 5 + tondeuse.posX;
    let div = document.getElementById(pos);
    div.classList.remove(div.classList);
    div.classList.add(orientation);
    grassToRemove = div;
};

removingGrass = (div) => {
    div.classList.remove(div.classList);
    div.classList.toggle("removedGrass");
};

grassInit = (rectangle) => {
    var main = document.querySelector("#rectangle");
    var square = [];
    for (let i = 1; i < rectangle[0] * rectangle[1] + 1; i++) {
        square[i] = document.createElement("div");
        square[i].classList.add("grass");
        square[i].setAttribute("id", i);
        main.appendChild(square[i]);
    }
};

command = (instructions, tondeuse, i) => {
    setTimeout(function () {
        if(i == instructions.length){
            createResult(tondeuse, tondeuseNbr)
            window.scrollTo(0,document.body.scrollHeight);
            tondeuseNbr++
        }
        tondeuseInit(tondeuse);
        if (i < instructions.length) {
            setTimeout(() => {
                removingGrass(grassToRemove);
            }, speed);
        }
        switch (instructions[i]) {
            case "G":
                if (tondeuse.orientation == "S") {
                    tondeuse.orientation = "E";
                } else if (tondeuse.orientation == "N") {
                    tondeuse.orientation = "W";
                } else if (tondeuse.orientation == "W") {
                    tondeuse.orientation = "S";
                } else if (tondeuse.orientation == "E") {
                    tondeuse.orientation = "N";
                }
                break;
            case "D":
                if (tondeuse.orientation == "S") {
                    tondeuse.orientation = "W";
                } else if (tondeuse.orientation == "N") {
                    tondeuse.orientation = "E";
                } else if (tondeuse.orientation == "W") {
                    tondeuse.orientation = "N";
                } else if (tondeuse.orientation == "E") {
                    tondeuse.orientation = "S";
                }
                break;

            case "A":
                if (
                    tondeuse.orientation == "S" &&
                    tondeuse.posY > 0 &&
                    tondeuse.posY <= grass[1]
                ) {
                    tondeuse.posY -= 1;
                } else if (
                    tondeuse.orientation == "N" &&
                    tondeuse.posY > 0 &&
                    tondeuse.posY < grass[1]
                ) {
                    tondeuse.posY += 1;
                } else if (
                    tondeuse.orientation == "E" &&
                    tondeuse.posX > 0 &&
                    tondeuse.posX < grass[0]
                ) {
                    tondeuse.posX += 1;
                } else if (
                    tondeuse.orientation == "W" &&
                    tondeuse.posX > 0 &&
                    tondeuse.posX <= grass[0]
                ) {
                    tondeuse.posX -= 1;
                }
                break;
        }
        i++;
        if (i < instructions.length + 1) {
            command(instructions, tondeuse, i);
        }
        else if(i == instructions.length){
            console.log(tondeuse)
        }
    }, speed);
 
};

waitTurn=(time=0)=>{
    setTimeout(function () {
        command(tondeuse[turn].instructions, tondeuse[turn], 0);   
        var Newtime = tondeuse[turn].instructions.length*speed+speed
        turn++;
        if (turn < tondeuse.length) {
            waitTurn(Newtime)       
        }  
}, time);
 
}

createResult=(tondeuse, i)=>{
    var position = document.createElement('h4')
    position.classList.add('result')
    position.innerText = `La position de la tondeuse ${i} est ${tondeuse.posX}${tondeuse.posY} ${tondeuse.orientation}`
    divResult.append(position)
}

getData(fileSelector, (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        var data = event.target.result.split("\n");
        settingTondeuse(data);
        intro.remove()
        console.log(grass)
        grassInit(grass)
        waitTurn(tondeuse)
        // command(instruction1, tondeuse, 0, 'tondeuse1')
        // setTimeout(() => {
        //     resultTondeuse.innerText = `La position de la tondeuse1 est ${tondeuse.posX}${tondeuse.posY}${tondeuse.orientation}`
        //     window.scrollTo(0,document.body.scrollHeight);
        //     command(instruction2, tondeuse2, 0, 'tondeuse2')
        // }, 500 * instruction1.length + 1000);
        // setTimeout(() => {
        //     resultTondeuse2.innerText = `La position de la tondeuse2 est ${tondeuse2.posX}${tondeuse2.posY}${tondeuse2.orientation}`
        // }, (500 * instruction1.length) + (500 * instruction2.length) + 1000);
    });
    reader.readAsText(file);
});
