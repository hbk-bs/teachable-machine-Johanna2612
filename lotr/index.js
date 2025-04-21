// Classifier Variable
let classifier;
// Model URL
// HERE
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Z_q4LJ5jj/';

// Video
let video;
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

	console.log(video); // Überprüfe, ob das Video-Element korrekt erstellt wurde

// Füge eine Klasse zum Video hinzu
	video.class('styled-video');

	// Start classifying
	classifyVideo();
}

function draw() {
	// Draw the video
	image(video, 0, 0);

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
		localStorage.setItem("character", label); // Speichere das Ergebnis im localStorage
		previousLabel = label;
	}
	
	// Classify again
	classifyVideo();
}