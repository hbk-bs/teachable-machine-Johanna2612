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
let previousLabel = ''; // NEU: Zwischenspeicherung des letzten Labels


// Load the model first
function preload() {
	classifier = ml5.imageClassifier(imageModelURL + 'model.json');
	console.log('Modell geladen:', classifier);
}

function setup() {
	let canvas = createCanvas(320, 260);
	canvas.parent('sketch'); // ← das ist der Trick!
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
	label = results[0].label;
	
	// Nur wenn sich das Ergebnis geändert hat
	if (label !== previousLabel) {
		updateCharacterDisplay(label);
		previousLabel = label;
	}
	
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
		// Animate image change
		imgEl.classList.remove('show'); // Entferne Klasse mit voller Sichtbarkeit
		void imgEl.offsetWidth; // Trick, um CSS-Neuberechnung zu erzwingen
		imgEl.src = characterImages[character]; // Bildquelle setzen
		imgEl.style.display = 'block'; // Sicherstellen, dass das Bild sichtbar ist
		imgEl.alt = character;
		imgEl.classList.add('show'); // Zeige das Bild mit Animation
	} else {
		imgEl.style.display = 'none';
	}
}

