var cnv;

var scrambleSended = false;

let curTime=0;
let timer=0;
let finish=false;
let mas = []; 

scrambles.oninput = function(){
if (scrambles.value != ""){
  button.type="button";
}else{
  button.type="hidden";
}
}

button2.onclick = function() {
  timeRes.length=timeRes.length-1;
  nowS--;
  if (nowS <2){
    button2.type="hidden";
  }
  timesAdded=false;
  finish=false;
  timer=0;
  cantStart=false;
}
button.onclick = function() {
  scrambleSended = true;
  button.type="hidden";
  scrambles.hidden=true;
  mas = scrambles.value.split("\n");
  if(mas[0].charAt(0) == 'G'){
    mas.shift();
  }
  if(mas[mas.length-1] == ""){
    mas.length=mas.length-1;
  }
  for (let i = 0;i<=mas.length-1;i++){
    mas[i] = mas[i].replace(/(.*\d\. )/,"");
  }
  showc.type="checkBox";
  c.innerHTML = "Show Scrambles";
  windowResized();
  if (mas.length==0){
    finish=true;
  }
  //print(mas);
};

let ao5 = 0;
let ao12 = 0;
let nowS = 1;
function draw(){
 if (scrambleSended){
   if (readyMode){
     background(0,0,0);
     fill("#FF5B78");
   }
   else{  
     background(250);
   }
   textSize(h/22);
   fill("#CE5B78");
   textAlign(CENTER,CENTER);
   if (!solving && !readyMode){
   text("Amount of scrambes: " + mas.length,w/2,h/10);
   if(nowS>=6){
       lastFive=timeRes.slice(timeRes.length-5,timeRes.length);
       ao5=0;
       ao5=lastFive.reduce(function(a, b) {return a + b;});
       ao5=ao5-Math.min.apply( Math, lastFive);
       ao5=ao5-Math.max.apply( Math, lastFive)
       ao5=ao5/3;
       text("Last ao5: "+ao5.toFixed(3) + " [" +lastFive.join(", ")+"]",w/2,h/10+h/10+h/10);
     }
      if(nowS>=13){
       lastT=timeRes.slice(timeRes.length-12,timeRes.length);
       ao12=0;
       ao12=lastT.reduce(function(a, b) {return a + b;});
       ao12=ao12-Math.min.apply( Math, lastT);
       ao12=ao12-Math.max.apply( Math, lastT)
       ao12=ao12/10;
       text("Last ao12: "+ao12.toFixed(3),w/2,h/10+h/10+h/10+h/10);
     }
   }
   if (!finish){
     if (!solving && !readyMode){
     text("[Already solved: " + (nowS-1)+"]",w/2,h/10+h/10);
     
     textSize(h/17);
     let str= mas[nowS-1];
     text(str,w/16,h/3+h/10,w-w/8,h/3);
     textSize(h/10);
     }
     if (solving){
       timer=(new Date()-curTime)/1000;
       textSize(h/3);
       text(timer.toFixed(3),w/2,h/2);
     }else{
       textSize(h/15);
       if(!readyMode){
         if (timeRes.length>0){
         text("Last time: "+ timeRes[timeRes.length-1],w/2,h/2+h/3);
         }
       }else{
         textSize(h/3);
         text("Ready",w/2,h/2);
       }
     }
     //textSize(40);
     //text(timeRes.join(" "),w/16,h/2+h/6,w-w/8,h/6);
   }else{
     textSize(h/13);
     text("All scrambles are solved!",w/2,h/2+h/6);
   }
   if(!timesAdded){
     if (!showc.checked){
     times.innerHTML = "<textarea id=\"ss\">"+timeRes.join(", ")+"</textarea>";
     } else{
       let out = "";
       for (let i = 0; i<=nowS-2;i++){
         out += timeRes[i] + " [" + mas[i] + "]" + "\n";
       }
       times.innerHTML = "<textarea id=\"ss\">"+out+"</textarea>";
     }
       timesAdded=true;
     
     ss.scrollTop = ss.scrollHeight;
   }
 }
}
let timesAdded = false;
let solving = false;
let timeRes = [];

function keyReleased() {
  if (key == " "){
  if(!solving && !cantStart && !finish){
    timer=0;
    solving=true;
    curTime=new Date();
    button2.disabled = true;
    readyMode=false;
  }
    if (cantStart){
    cantStart=false;
    }
  }
}

let readyMode=false;
let cantStart=false;
function keyPressed(){
  
if (scrambleSended && !finish){
  if (key == " "){
    document.activeElement.blur();
  if(!solving){
    //timer="-1";
    readyMode=true;
    button2.disabled = true;
  }
  else{
    
    solving=false;
    cantStart=true;
    timeRes.push(timer);
    nowS++;
    button2.disabled = false;
    if (nowS >=2){
    button2.type="button";
    }
    timesAdded = false;
    
    if (nowS >= mas.length+1){
      finish=true;
    }
  }
}
}
}

let w;
let h;
function setup(){

  cnv = createCanvas(1, 1);
  cnv.parent('sketch-holder');
}
function windowResized() {
  w=windowWidth*0.95;
  h=windowHeight*0.60;
  resizeCanvas(w,h);
  
}

