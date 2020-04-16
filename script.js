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
}]


var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");
var resultEl = document.querySelector("#result");

var questionIndex = 0;
var correctCount = 0;
var wrongCount = 0;

//Timer//
timerEl.innerHTML = 005 + ":" + 60;
startTimer();

function startTimer() {
  var presentTime = timerEl.innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
    
  timerEl.innerHTML =
    m + ":" + s;
   setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; 
  if (sec < 0) {sec = "59"};
  return sec;
}
////////////////////////////////////////////////

function questionPop() {
  questionEl.textContent = questions[questionIndex].question;
  choicesEl.innerHTML = "";
  resultEl.innerHTML = "";

  var choiceOps = questions[questionIndex].choices;
  var choiceLen = choiceOps.length;

  for (var i = 0; i < choiceLen; i++) {
    var choicesList = document.createElement("li");
    choicesList.textContent = choiceOps[i];
    choicesEl.append(choicesList);
  }
}

//questionPop();

function checkAns(event) {
  if (event.target.matches("li")) {
    var theAnswer = event.target.textContent;
    if (theAnswer === questions[questionIndex].answer) {
      //timerEl.textContent = time;
      resultEl.textContent = "correct";
      correctCount++
    } else {
      resultEl.textContent = "Wrong";
      wrongCount++;
    }
  }
  setTimeout(nextQ, 1000);
}

function nextQ() {
  questionIndex++
  questionPop()
  
  var questionLen = questions[questionIndex].question;
  if ((questionIndex > questionLen) === true) {
    alert(done);
  }
}

choicesEl.addEventListener("click", checkAns);
questionPop();