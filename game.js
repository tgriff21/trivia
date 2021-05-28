const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('.progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Who voices Lois Griffin",
        choice1: 'Chevy Chase',
        choice2: 'Alex Borstien',
        choice3: 'Rachel MacFarlane',
        choice4: 'Drew Barymore',
        answer: 2,
    },
    {
        question: "Despite being told his first name was Peter all his life his birth cerificate revealed its actually....",
        choice1: 'David',
        choice2: 'Hartman',
        choice3: 'Justin',
        choice4: 'Mort',
        answer: 3,
    },
    {
        question: "what is Meg's actual first name?",
        choice1: 'Megatron',
        choice2: 'Meghan',
        choice3: 'Meg',
        choice4: 'Meggy',
        answer: 1,
    },
    {
        question: "What county was Peter born in?",
        choice1: 'Chile',
        choice2: 'Ireland',
        choice3: 'USA',
        choice4: 'Mexico',
        answer: 4,
    },
    {
        question: "Which member of the Griffin family does Quagmire hate the most?",
        choice1: 'Meg',
        choice2: 'Brian',
        choice3: 'Peter',
        choice4: 'Lois',
        answer: 2,
    },
    {
        question: "Lois discovers she has a mentally ill brother whose name is...",
        choice1: 'Baxton Pewterschmidt',
        choice2: 'Pete Pewterschmidt',
        choice3: 'Carter Pewterschmidt',
        choice4: 'Patrick Pewterschmidt',
        answer: 4,
    },
    {
        question: "What is the real reason meg wears a hat?",
        choice1: 'She has a tiny conjoined twin on her head',
        choice2: 'She just likes the hat',
        choice3: 'She is secretly going bald',
        choice4: 'She will only be able to live without it',
        answer: 1,
    },
    {
        question: " Complete the lyrics: 'All the things that makes us...'",
        choice1: 'Effin Cry',
        choice2: 'Laugh and Cry',
        choice3: 'Dance and Die',
        choice4: 'Laugh and Die',
        answer: 2,
    },
    {
        question: "Who does Seth Macfalane voice?",
        choice1: 'Peter',
        choice2: 'Quagmire',
        choice3: 'Stewie',
        choice4: 'All the above',
        answer: 4,
    },
    {
        question: "Joe Swanson son Kevin is believed to be dead, What actually happened to him",
        choice1: 'His bunkmates were killed in action and he faked his death',
        choice2: 'Trick question, he actually did die',
        choice3: 'Joe doesnt have a son',
        choice4: 'It was a stillbourne birth',
        answer: 1,
    },
    {
        question: "What city does Family guy take place in?",
        choice1: 'Newport',
        choice2: 'England',
        choice3: 'New York',
        choice4: 'Quahog',
        answer: 4,
    },
    {
        question: "What is Quagmires first name?",
        choice1: 'Carl',
        choice2: 'Glenn',
        choice3: 'Simon',
        choice4: 'Gil',
        answer: 2,
    },
    {
        question: "How many times has family guy been canceled?",
        choice1: '1',
        choice2: '2',
        choice3: '0',
        choice4: '3',
        answer: 2,
    },
    {
        question: "What ended Peters short term career with the Patriots?",
        choice1: 'He wasnt very good',
        choice2: 'He tried to play naked',
        choice3: 'Him constantly showboating',
        choice4: 'He refused to lose weight',
        answer: 3,
    },
    {
        question: "In the episode 'Stew-Roids', Stewie decides it's time to start hitting the gym after getting beat up by who?",
        choice1: 'Meg',
        choice2: 'Susie',
        choice3: 'Lois',
        choice4: 'Peter',
        answer: 2,
    },
    {
        question: "What is Stewies middle name?",
        choice1: 'Gilbert',
        choice2: 'Calos',
        choice3: 'Gilligan',
        choice4: 'Gibby',
        answer: 3,
    },
    {
        question: "Besides Brian, who is stewies stuffed best friend?",
        choice1: 'Rupert',
        choice2: 'Robert',
        choice3: 'Louie',
        choice4: 'Repel',
        answer: 1,
    },
    {
        question: "In the early seasons, Peter discovers one of his anscestors was a slave named",
        choice1: 'Luke Griffin',
        choice2: 'Manor Griffin',
        choice3: 'Lando Griffin',
        choice4: 'Nate Griffin',
        answer: 4,
    },
    {
        question: "What Peter's very repetitive favorite song?",
        choice1: '"Flying Pig"',
        choice2: '"Surfin Bird"',
        choice3: '"Surfin Penguine"',
        choice4: '"Bird is the Word"',
        answer: 2,
    },
    {
        question: "Peter shows off his new Drivers License Photo that starts a show and tell. Quagmires liscense reveals he's",
        choice1: '58',
        choice2: '34',
        choice3: '50',
        choice4: '61',
        answer: 4,
    },
    {
        question: "What job does Peter get in the episode Peter-assment?",
        choice1: 'Shoe maker',
        choice2: 'Paporazzi',
        choice3: 'Photographer',
        choice4: 'Butcher',
        answer: 2,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 21;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () =>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    };

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100 }%`
    

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"
        selectedChoice.parentElement.classList.add(classToApply);

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS);
        }
        setTimeout(() =>{
            getNewQuestion()
            selectedChoice.parentElement.classList.remove(classToApply);
            
        }, 1000)
    });
   
});

 incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}

startGame();