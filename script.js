var questionEl = document.querySelector("#card-title");
var choicesEl = document.querySelector("#choices");
var resultEl = document.querySelector("#result");
//var liEl = document.querySelector("li");

var questionFire = [{
    question: "What does Michael pretend to fire Pam over in season one?",
    choices: ["Stealing post-its", "Not answering the phone", "Wearing her glasses"],
    answer: "Correct"
}]
    

questionEl.addEventListener("click", 

/*function(event) {
  if(event.target.matches("button")) {
    var item = document.createElement("div");
    item.textContent = groceries[event.target.parentElement.id];
    shoppingCartEl.append(item);
  }
}

);*/

function resultCheck(event) {
    if(event.target.matches("#correct" == true)) {
        var correct = document.createElement("div");
        correct.textContent = questionFire[event.target.parentElement.id];
        resultEl.append(correct);
        }
  });
  
 