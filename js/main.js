// This File is  where the main funtion is launched 

// This asynchronous function will read the file when it is loaded
getData = (selector, readFile) => {
    selector.addEventListener("change", (event) => {
        const fileList = event.target.files;
        if(fileList[0].type == "text/plain"){
            readFile(fileList[0]);
        }
        else{
            alert('Le fichier doit être au format .txt')
            document.location.reload();
        }
    });
};

// It show the position and orientation of each mower (it will be called after each mower is done)
createResult=(mower, i)=>{
    var position = document.createElement('h4')
    position.classList.add('result')
    position.innerText = `La position de la tondeuse ${i} est ${mower.posX}${mower.posY} ${mower.orientation}`
    divResult.append(position)
}


getData(fileSelector, (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        var data = event.target.result.split("\n");
        settingMower(data);
        intro.remove()
      
        grassInit(grass)
        waitTurn(mower)
    });
    reader.readAsText(file);
});