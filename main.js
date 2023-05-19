var difference = 0;
var noseX = 0;
var noseY = 0;
var wrist_left_X = 0;
var wrist_right_X = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 550);
    canvas = createCanvas(550, 550);
    canvas.position(580, 120);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("NoseX: " + noseX);
        console.log("NoseY: " + noseY);
        wrist_left_X = results[0].pose.leftWrist.x;
        wrist_right_X = results[0].pose.rightWrist.x;
        difference = floor(wrist_left_X - wrist_right_X);
        console.log("Difference: " + difference);
    }
}

function modelLoaded(){
    console.log("Model Loaded Successfully!");
}

function draw(){
    background("#fff4e6");
    document.getElementById("square_sides").innerHTML = "Width & Height of the square is: " + difference;
    square(noseX, noseY, difference);
    fill("lightpink");
    stroke("black");
}