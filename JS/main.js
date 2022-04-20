
let storeClickdedPos = [["", "", ""], ["", "", ""], ["", "", ""]]
let storeActivebutton = [["", "", ""], ["", "", ""], ["", "", ""]]

let turn = "x"

///1/3    Math.ceil(1/3)-1  1/3.5 Math.floor(1/3.5)


let playwith="play with friend" //default

let containerOfButton = document.querySelector(".game-play")
let title = document.querySelector(".title")
let playButton = document.querySelector(".play")


let controlWithPlay = document.querySelectorAll(".settings > div")

controlWithPlay.forEach(element => {

    element.addEventListener("click", function () {
        playwith = this.innerHTML.toLowerCase()
        console.log(playwith)
        document.querySelector(".sett-con").classList.remove("active")


    })

});

document.querySelector(".again").style.display = "none"
document.querySelector(".again").style.opacity = "0";


document.querySelector(".sett-con").addEventListener('transitionend', (e) => {
    
    if (document.querySelector(".sett-con").style.display != "none") {
        document.querySelector(".sett-con").style.display = "none"

    }
});





function clicked(currentElement, x, y) {

    if (!storeClickdedPos[x][y]) {
        storeClickdedPos[x][y] = turn


        if (turn === "x") {
            currentElement.querySelector("img").src = "image/pngwing.ong.png"
        }
        else {

            currentElement.querySelector(".back img").src = "image/oo.png"


        }
        currentElement.classList.add("active")
        storeActivebutton[x][y] = currentElement
        containerOfButton.classList.add("active")

        if (!checkIfGameEnd()) {
            setTimeout(function () {
                containerOfButton.classList.remove("active")
            }, 1000)

            /////This play if The player choose play with competer

            if (playwith === "play with competer" && turn === "o") {
                setTimeout(function () {
                    turnComputer()
                }, 1000)
            }
        }
        else {


            document.querySelector(".again").style.display = "flex"
            setTimeout(function () {
                document.querySelector(".again").style.opacity = "1";
            }, 30)
        }




    }
}


document.querySelector(".again").addEventListener('transitionend', (e) => {
    if (document.querySelector(".again").style.opacity === "0") {
        document.querySelector(".again").style.display = "none"

    }
});


function turnComputer() {
    let done = true
    let column;
    let row;

    while (done) {

        /// random number from 1 to 9
        let random = Math.floor(Math.random() * 9) + 1;

        /// Equation to get number represents the row 
        row = Math.ceil(random / 3) - 1

        /// Equation to get number represents the column 

        if (random % 3 === 0) {
            column = 2
        }
        else {
            column = (random % 3) - 1
        }
        ////End



        if (!storeClickdedPos[row][column]) {


            document.querySelectorAll(".game-play > div")[random - 1].click()

            containerOfButton.classList.add("active")

            done = false
            setTimeout(function () {
                containerOfButton.classList.remove("active")
            }, 1000)

        }
    }
}



playButton.onclick = function () {

    document.querySelector(".again").style.opacity = "0";

    title.innerHTML = `XO Game`
    turn = "x"
    storeClickdedPos = [["", "", ""], ["", "", ""], ["", "", ""]]
    createButton()
    containerOfButton.classList.remove("active")




}

createButton()

function createButton() {

    containerOfButton.innerHTML = ""

    for (let x = 0; x < storeClickdedPos.length; x++) {
        for (let y = 0; y < storeClickdedPos.length; y++) {
            containerOfButton.innerHTML += `
            <div onclick="clicked(this,${x},${y})">
                <div class="front"></div>
                <div class="back">
                    <img src="">
                </div>
            </div>
        `
        }

    }

}


function checkIfGameEnd() {

    if (cheakIfWon()) {
        title.innerHTML = `win ${turn} `
        return true

    }


    else if (checkIfDraw()) {
        title.innerHTML = `Draw`

        return true

    }
    else {
        if (turn === "x") {
            turn = "o"

        }
        else {
            turn = "x"
        }

        title.innerHTML = `Turn ${turn.toUpperCase()} `


    }



}

function cheakIfWon() {

    for (let i = 0; i < storeClickdedPos.length; i++) {
        if (checkAllColumn(i) || checkAllRow(i)) {
            return true
        }

    }

    if (checktar()) {
        return true
    }


}

function checkIfDraw() {


    for (let x = 0; x < storeClickdedPos.length; x++) {
        for (let y = 0; y < storeClickdedPos.length; y++) {
            if (!storeClickdedPos[x][y]) {
                return false
            }
        }
    }
    return true

}



function checkAllColumn(y) {


    if (storeClickdedPos[0][y] == turn && storeClickdedPos[1][y] == turn && storeClickdedPos[2][y] == turn) {

        for (let i = 0; i <= 2; i++) {
            storeActivebutton[i][y].querySelector(".back").classList.add("active")
        }
        return true
    }
    return false

}


function checkAllRow(x) {
    if (storeClickdedPos[x][0] == turn && storeClickdedPos[x][1] == turn && storeClickdedPos[x][2] == turn) {

        for (let i = 0; i <= 2; i++) {
            storeActivebutton[x][i].querySelector(".back").classList.add("active")
        }
        return true
    }
    return false
}



function checktar() {

    if (storeClickdedPos[0][0] === turn && storeClickdedPos[1][1] === turn && storeClickdedPos[2][2] === turn) {
        storeActivebutton[0][0].querySelector(".back").classList.add("active")
        storeActivebutton[1][1].querySelector(".back").classList.add("active")
        storeActivebutton[2][2].querySelector(".back").classList.add("active")
        return true
    }
    else if (storeClickdedPos[0][2] === turn && storeClickdedPos[1][1] === turn && storeClickdedPos[2][0] === turn) {
        storeActivebutton[0][2].querySelector(".back").classList.add("active")
        storeActivebutton[1][1].querySelector(".back").classList.add("active")
        storeActivebutton[2][0].querySelector(".back").classList.add("active")

        return true
    }

}