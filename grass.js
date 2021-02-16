// Here are all the functions concerning the grass

// It is to create the illusion of the grass being mowed (it removes the html class of the mower and set it to another color of grass)

removingGrass = (div) => {
    div.classList.remove(div.classList);
    div.classList.toggle("removedGrass");
};

// this simply set the number of square of grass dinamically using the data we transorfmed in settingMower.
grassInit = (rectangle) => {
    var main = document.querySelector("#rectangle");
    main.style.display = 'flex'
    var square = [];
    for (let i = 1; i < rectangle[0] * rectangle[1] + 1; i++) {
        square[i] = document.createElement("div");
        square[i].classList.add("grass");
        square[i].setAttribute("id", i);
        main.appendChild(square[i]);
    }
};