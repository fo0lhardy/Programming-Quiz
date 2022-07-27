const questions = [
	{
		question: "What language works in the browser?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "What does CSS mean?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "What does HTML mean?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "What year was JavaScript created?",
		answers: ["1996", "1995", "1994", "all answers are wrong"],
		correct: 2,
	},
];

// 
const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

//
let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer; 

function clearPage(){
	headerContainer.innerHTML = "";
	listContainer.innerHTML = "";
}

function showQuestion(){
	console.log("showQuestion");
	
	//
	const headerTemplate = '<h2 class="title">%title%</h2>';
	const title = headerTemplate.replace("%title%", questions[questionIndex]["question"]);
	headerContainer.innerHTML = title;
	

	let answerNumber = 1;
	for (answerText of questions[questionIndex]["answers"]) {

		const questionTemplate = 
		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;

		const answerHTML = questionTemplate
				.replace("%answer%", answerText)
				.replace("%number%", answerNumber)

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}

}

function checkAnswer(){
	console.log("checkAnswer started!");

	const checkedRadio = listContainer.querySelector("input[type='radio']:checked");
	
	if (!checkedRadio){
		submitBtn.blur();
		return
	}

	const userAnswer = parseInt(checkedRadio.value)

	if (userAnswer === questions[questionIndex]["correct"]) {
		score++;
	}
		console.log("score =", score);

		if (questionIndex !== questions.length - 1){
			console.log("This is not the last question");
			questionIndex++;
			clearPage();
			showQuestion();
			return;
		} else {
			console.log("That's the last question");
			clearPage();
			showResults();
	}
}

function showResults (){
	console.log("showResults started");
	console.log(score);

	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
	`;

	let title, message;

	if (score === questions.length) {
		title = "Congratulations 🎉"
		message = "You answered all questions correctly! 😉👍";
	} else if ((score * 100) / questions.length >= 50 ) {
		title = "Good result 🙃";
		message = " You gave more than half of the right answers 👍";
	} else {
		title = "Worth the effort 😐";
		message = " You gave more than half of the right answers";

	}

	let result = `${score} of ${questions.length}`;

	const finalMessage = resultsTemplate
							.replace("%title%" , title)
							.replace("%message%" , message)
							.replace("%result%" , result)

	headerContainer.innerHTML = finalMessage;

	submitBtn.blur();
	submitBtn.innerText = "Start again";
	submitBtn.onclick = function(){
		history.go()
	};

}

