const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
    //button.classList.add('clicked');
    button.addEventListener('click', (e) => {
        e.target.classList.add('clicked');
        game(e.target.textContent);
    });

    button.addEventListener('transitionend', removeTransition);
});

const roundWin = document.querySelector('h3');

const modal = document.querySelector('#modal')
const closeModalButton = document.querySelector('[data-close-button]');
const overlay = document.getElementById('overlay');

closeModalButton.addEventListener('click', () =>{
    closeModal(modal);
});

overlay.addEventListener('click', () => {
    closeModal(modal);
});

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('clicked');
  }


function computerPlay(){
    const shapeOption = ['Rock', 'Paper', 'Scissors'];
    const computerSelection = Math.floor(Math.random()*shapeOption.length);
    return shapeOption[computerSelection];
  }

function playRound(userShape, compShape){
    if(userShape == compShape){
        return "tied";
    }
    else if((userShape == 'Rock' && compShape == 'Scissors') || (userShape == 'Paper' && compShape == 'Rock') || (userShape == 'Scissors' && compShape == 'Paper')){
        return 'user';
    }
    else
        return 'computer';
}

function openModal(modal, winner){
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
    const winMessage = document.querySelector('.modal-body');
    winMessage.textContent = `${winner}`;
}

function closeModal(modal){
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

let userWin = compWin = 0;

function game(userSelection){
    computerShape = computerPlay();
    let result = playRound(userSelection, computerShape);
    const scoreDiv = document.querySelector('.roundResult');
    if(result == 'user'){  
        roundWin.textContent = `Your ${userSelection} Beated ${computerShape}`;
        userWin++;                                                              //checking who wins
    }
    else if(result == 'computer'){
        roundWin.textContent = `Your ${userSelection} Beaten by ${computerShape}`;
        compWin++;
    }
    else{
        roundWin.textContent = `Both Choose ${userSelection}, Tied!`;
    }
    scoreDiv.textContent = `${userWin}:${compWin}`;
    if(userWin == 5 || compWin == 5){
        if(userWin == 5){
            openModal(modal, 'YOU WON');
        }
        else{
            openModal(modal, 'YOU LOSE');
        }
        
        userWin = compWin = 0;
        scoreDiv.textContent = `${userWin}:${compWin}`;
        roundWin.textContent = "Make Your Selection";
    }
    
}