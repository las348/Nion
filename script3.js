$(document).ready(function () {

    //List of questions, choices, and answers
    var questions = [{
        question: "What does Michael pretend to fire Pam over in season one?",
        choices: ["Stealing post-its", "Not answering the phone", "Wearing her glasses"],
        answer: "Stealing post-its"
    },
    {
        question: "Dwight tells Jim's roommate that he keeps an extra pair of shoes in his car for special occasions. What kind of shoes are they?",
        choices: ["Dress shoes", "Birkenstocks", "Sandals"],
        answer: "Birkenstocks"
    },
    {
        question: "Fill in the blank: On the day that he's supposed to move to Boulder, Colorado, Michael says, 'I can't do this. All the channels are going to be different there. I'm not going to be able to find my shows. I am not going to start ______ at level one.'",
        choices: ["Improv", "Management", "Guitar"],
        answer: "Improv"
    },
    {
        question: "What does Kevin say after Kelly yells that her middle name is Rajnigandha and that she hates it?",
        choices: ["What is Rajnigandha?", "What an awful name", "I thought Rajnigandha was a boy's name."],
        answer: "I thought Rajnigandha was a boy's name."
    },
    {
        question: "In S1E1 Pilot: Who started their first day at Dunder Mifflin Scranton?",
        choices: ["Jim Halpert", "Ryan Howard", "Erin Hannon"],
        answer: "Ryan Howard"
    },
    {
        question: "In S2E5 Halloween: What is Jim's costume?",
        choices: ["'Dave'", "Three Hole Punch Jim", "Irrational Consumer"],
        answer: "Three Hole Punch Jim"
    },
    {
        question: "Which Toy Story character is Holly's doll that Michael throws in the trash and pours coffee on?",
        choices: ["Woody", "Buzz", "Bo Peep"],
        answer: "Woody"
    },
    {
        question: "Fill in the blank: '______, where's ______? Whoa, there you are. Didn't see you behind that grain of rice! Boom. Roasted!'",
        choices: ["Jim", "Angela", "Pam"],
        answer: "Angela"
    },
    {
        question: "What does Michael sleep on instead of the bed because Jan has 'space issues'?",
        choices: ["A couch", "A chair", "A bench"],
        answer: "A bench"
    },
    {
        question: "Aside from Jim, who in the office has an obvious crush on Pam throughout the show?",
        choices: ["Toby", "Andy", "Ryan"],
        answer: "Toby"
    },
    ];

    //Images//
    var imgArray = ["Assets/cast1.jpg", "Assets/cast2.jpg", "Assets/MainImage.jpg", "Assets/cast3.png", "Assets/cast4.jpg", "Assets/cast6.jpg", "Assets/cast7.png", "Assets/cast8.jpg"];
    console.log(imgArray.length);
    //////////


    var questionEl = document.querySelector("#question");
    var optionListEl = document.querySelector("#option-list");
    var questionResultEl = document.querySelector("#question-result");
    var timerEl = document.querySelector("#timer");

    var questionIndex = 0;
    var correctCount = 0;
    var time = 90;
    var intervalId;


    //updates timer
    function updateTime() {
        time--;
        timerEl.textContent = "Timer: " + time;
        if (time <= 0) {
            endQuiz();
        }
    }

    //end of quiz
    function endQuiz() {
        clearInterval(intervalId);

        //hides the div tag
        $("div").hide(1000);

        var scoreEl = document.createElement("p");

        scoreEl.innerHTML = "Game over, You scored " + correctCount;
        setTimeout(showHighScore, 2);
    }

    //logs scores
    function showHighScore() {
        var name = prompt("Please enter your name");

        var high_scores = localStorage.getItem("scores");

        if (!high_scores) {
            high_scores = [];
        } else {
            high_scores = JSON.parse(high_scores);
        }

        high_scores.push({ name: name, score: correctCount });

        localStorage.setItem("scores", JSON.stringify(high_scores));

        //clears score data
        // localStorage.clear(high_scores)

        high_scores.sort(function (a, b) {
            return b.score - a.score;
        });

        var contentP = document.createElement("p")
        contentP.style.fontWeight = 'bold';
        contentP.style.padding = '20px';
        contentP.style.backgroundColor = 'whitesmoke';
        contentP.style.fontSize = '30px';
        contentP.textContent = 'High Scores';

        document.body.appendChild(contentP);

        var contentOL = document.createElement("ol")
        contentOL.style.fontWeight = 'bold';
        contentOL.style.padding = '20px';
        contentOL.style.textAlign = 'center';


        for (var i = 0; i < high_scores.length; i++) {
            var contentLI = document.createElement("li")
            contentLI.style.backgroundColor = 'whitesmoke';
            contentLI.style.width = '300px';
            contentLI.style.border = 'double';

            var nameScore = "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;

            contentLI.textContent = nameScore
            contentOL.appendChild(contentLI);
        }
        document.body.appendChild(contentOL);
    }


    //populates text
    function renderQuestion() {

        if (time == 0) {
            updateTime();
            return;
        }

        intervalId = setInterval(updateTime, 1000);
        questionEl.textContent = questions[questionIndex].question;

        optionListEl.innerHTML = "";
        questionResultEl.innerHTML = "";

        var choices = questions[questionIndex].choices;
        console.log(choices); //Q mult choice
        var choicesLen = choices.length;
        console.log(choicesLen); //3

        for (var i = 0; i < choicesLen; i++) {
            var questionListItem = document.createElement("li");
            questionListItem.textContent = choices[i];
            optionListEl.append(questionListItem);
        }

        /////Image/////
        var i = Math.floor(Math.random() * 7);
        $("#img").attr("src", imgArray[i]);
    };

    //next question
    function nextQuestion() {
        questionIndex++;

        if (questionIndex === questions.length) {
            time = 0;
        }
        renderQuestion();
    }


    ////Check if answer is correct or not
    function checkAnswer(event) {
        clearInterval(intervalId);
        if (event.target.matches("li")) {
            var answer = event.target.textContent;
            if (answer === questions[questionIndex].answer) {
                $("#question-result").html("<b>Correct</b>").attr("style", "color: green;");
                correctCount++;

            } else {
                $("#question-result").html("<b>Incorrect</b>").attr("style", "color: red;");
                time = time - 2;
                timerEl.textContent = time;
            }
        }
        setTimeout(nextQuestion, 2000);
    }



    renderQuestion();
    optionListEl.addEventListener("click", checkAnswer);

});
