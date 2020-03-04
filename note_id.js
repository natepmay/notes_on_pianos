// Note ID
// first check to see if you're in the rectangle of a black key
// if not, check for collision with white key rectangle
let topY, leftX, kbdWidth, whiteWidth, blackWidth, whiteHeight, blackHeight, blackKeys, whiteKeys, blackXs, whiteXs, keyOver, noteNames, quizKey, msgTxt, noteMsg, scoreCorrect, scoreTotal, frameCount, startCount, elapsed, totElapsed;

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(24);
  blackKeys = [1,3,6,8,10];
  whiteKeys = [0,2,4,5,7,9,11];
  scoreCorrect = 0;
  scoreTotal = 0;
  frameCount = 0;
  startCount = 0;
  totElapsed = 0;
  elapsed = 0;
  noteNames = ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B","none"];
  setupWindow();
  newKey()
  msgTxt = "";
}

function draw() {
  frameCount++; // don't let this overflow;
  let debugTexts = [];
  background(80);
  fill(255);
  // draw white keys
  for(let a=0;a<7;a++){
    rect(whiteXs[a],topY,whiteWidth,whiteHeight);
  }
  // draw black keys
  fill(0);
  let blackInd = 0;
  for(let a=0;a<12;a++){
    if(blackKeys.includes(a)){
      rect(blackXs[blackInd],topY,blackWidth,blackHeight);
      blackInd++;
    }
  }
  textSize(height/10);
  textAlign(LEFT);
  fill(255);
  text(noteMsg,leftX,height*(1/10));
  if(scoreCorrect>0){
    if(msgTxt == "Yes"){fill(0,255,0)} else {fill(255,0,0)};
    text(msgTxt,leftX,height*(2/10));
    textAlign(RIGHT);
    fill(0);
    text("score: "+scoreCorrect+"/"+scoreTotal,leftX+kbdWidth,height*(1/10));
    text("time: "+elapsed.toFixed(1)+" (avg: "+(totElapsed/scoreCorrect).toFixed(1)+")",leftX+kbdWidth,height*(2/10));
  }

  if(frameCount>=9999999){
    textSize(height/5);
    textAlign(CENTER);
    text("Timeout!",width/2,height/2)
  };

  debugTexts.push(frameCount);
  // textSize(12);
  // for(let i=0;i<debugTexts.length;i++){text(debugTexts[i],10,(i*10)+10)};
}


function touchStarted() {
  touchClick()
}

function mousePressed() {
  touchClick()
}

function touchClick(){
  keyOver = 12;
  for(let a=0;a<5;a++){
    if(mouseX>=blackXs[a] && mouseX<=(blackXs[a]+blackWidth) && mouseY>=topY && mouseY<=(topY+blackHeight)){
      keyOver = blackKeys[a];
    }
  }
  if(keyOver == 12){
    for(let a=0;a<7;a++){
      if(mouseX>=whiteXs[a] && mouseX<=(whiteXs[a]+whiteWidth) && mouseY>=topY && mouseY<=(topY+whiteHeight)){
        keyOver = whiteKeys[a];
      }
    }
  }
  if(keyOver==quizKey){
    msgTxt = "Yes";
    scoreCorrect++;
    scoreTotal++;
    elapsed = (frameCount - startCount)/24;
    totElapsed = totElapsed + elapsed;
    newKey();
  } else {
    msgTxt = "No"
    scoreTotal++;
  };
}

function setupWindow() {
  kbdWidth = width * 0.9;
  whiteHeight = height * (3/5);
  leftX = (width/2) - (kbdWidth/2);
  topY = (height * (3/5)) - (whiteHeight/2);
  whiteWidth = kbdWidth/7;
  blackWidth = kbdWidth/12;
  blackHeight = whiteHeight*(3/5);
  blackXs = [];
  whiteXs = [];
  // define white keys
  // seven-member array with Xs of left edges of white keys
  for(let a=0;a<7;a++){
    whiteXs.push(leftX+(a*(whiteWidth)));
  }
  // define black keys
  // five-member array with Xs of left edges of black keys
  for(let a=0;a<12;a++){
    if(blackKeys.includes(a)){
      blackXs.push(leftX+(a*(blackWidth)));
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupWindow();
}

function newKey() {
  startCount = frameCount;
  quizKey = floor(random(0,12));
  if(blackKeys.includes(quizKey)){
    let randBin = random([0,1]);
    if(randBin == 0){
      noteMsg = noteNames[quizKey-1]+"#";
    } else {
      noteMsg = noteNames[quizKey+1]+"b";
    }
  } else {
    noteMsg = noteNames[quizKey];
  };
}
