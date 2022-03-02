// ============================
// C O O K I E  S T U F F
// ============================

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// ==========================================
// A D D  S C O R E
// ==========================================

let scoreForm = document.querySelector("#score-form")
const scoreURL = '/api/score/new'

scoreForm.addEventListener('submit', function(event){
    event.preventDefault()
    console.log(event.target)
    formData = new FormData(scoreForm)
    // let score = 2
    formData.append('score', score)
    fetch(scoreURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Request-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken,
        },
        body: formData, 
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
    document.location.reload()
})


// ==========================================
// D I S P L A Y  L E A D E R B O A R D
// ==========================================

let leaderBoard = document.querySelector("#leader-board")
let leaderURL = "api/leaderboard"

fetch(leaderURL, {
    method: 'GET',
    credentials: 'same-origin',
    headers:{
        'Accept': 'application/json',
        'X-Request-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken,
    },
})
.then(response => {
    return response.json()
})
.then(leaderArray => {
    for (let score of leaderArray){
        let playerScore = document.createElement('tr')
        playerScore.innerText = `${score.fields.player} | ${score.fields.points}`
        leaderBoard.appendChild(playerScore)
    }
})
