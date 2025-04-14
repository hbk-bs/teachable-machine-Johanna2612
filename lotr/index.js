// Classifier Variable
let classifier;
// Model URL
// HERE
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/zYdYqMTzN/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';

// Load the model first
function preload() {
	classifier = ml5.imageClassifier(imageModelURL + 'model.json');
	console.log(classifier);
}

function setup() {
	createCanvas(320, 260);
	// Create the video
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();

	// Start classifying
	classifyVideo();
}

function draw() {
	background(0);
	// Draw the video
	image(video, 0, 0);

	// Draw the label
	fill(255);
	textSize(16);
	textAlign(CENTER);
	text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
	classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
	console.log(results);
	// The results are in an array ordered by confidence.
	// console.log(results[0]);
	label = results[0].label;
	// Classifiy again!
	classifyVideo();
	
	// Update character display
	updateCharacterDisplay(label);
	
	// Classify again
	classifyVideo();
}

function updateCharacterDisplay(character) {
	const nameEl = document.getElementById('character-name');
	const imgEl = document.getElementById('character-image');

	nameEl.textContent = `Du bist ${character}!`;

	const characterImages = {
		'Galadriel': 'https://hbk-bs.github.io/the-archives-Johanna2612/assets/images/Galadriel.jpg',
		'Ork': 'https://hbk-bs.github.io/the-archives-Johanna2612/assets/images/Ork.jpg',
		'Aragorn': 'https://hbk-bs.github.io/the-archives-Johanna2612/assets/images/Aragorn.jpg',
		'Legolas': 'https://hbk-bs.github.io/the-archives-Johanna2612/assets/images/Legolas.jpg',
		'Gimli': 'https://hbk-bs.github.io/the-archives-Johanna2612/assets/images/Gimli.jpg',
		// weitere Charaktere hier ergänzen
	};

	if (characterImages[character]) {
		imgEl.src = characterImages[character];
		imgEl.style.display = 'block';
		imgEl.alt = character;
	} else {
		imgEl.style.display = 'none';
	}
}

	




