var boolGameStarted=false;
var arrWords=["shagadelic","swinger","groovy","thrombo","twig and berries","fembots","jubbly","mojo back","randy","oh behave"];
var intWordCnt=arrWords.length;
var arrWordsRandom=[];
var intWordNext=0;
var strCurrKey;
var intKeyCode;
var intWordIndex=0;
var strWordIndex=0;
var strCurrWord;
var strGuessWord;
var arrGuessLetters=[];
var arrIncorrectLetters=[];
var arrCorrectLetters=[];
var intIncorrectGuessCnt=0;
var intIncorrectGuessLimit=6;
var intWins=0;
var intLosses=0;




document.onkeyup = function(event) {
	
	if (event.keyCode===32 && boolGameStarted===false) {
		boolGameStarted=true;
		strCurrKey=event.key.toLowerCase();
		intKeyCode=event.keyCode;
		// alert("Start game");
		StartGame();
		}
    else if (event.keyCode===27 && boolGameStarted===true) {
    	boolGameStarted=false;
        EndGame();
    	}
    else if (boolGameStarted===true && intWordNext<intWordCnt) {
      strCurrKey=event.key.toLowerCase();
      intKeyCode=event.keyCode;
      if (intKeyCode>=65 && intKeyCode<=90 || intKeyCode>=97 && intKeyCode<=122) {
      	    //alert("Guess Letter");
      		GuessLetter(strCurrKey);
      }
      
	}
  }

function StartGame() {
   intWordNext=0;
   intWordIndex=0;
   strWordIndex=0;
   RandomWordArray();
   intWordIndex=arrWordsRandom[intWordNext];
   //console.log(arrWordsRandom);
   strCurrWord=arrWords[intWordIndex];
   strGuessWord=strCurrWord.replace(/[A-Za-z0-9-]/g,"-");
   arrGuessLetters=[];
   arrIncorrectLetters=[];
   arrCorrectLetters=[];
    intIncorrectGuessCnt=0;
   //console.log(strGuessWord);
   document.getElementById("parGuessWord").innerHTML = "Guess Word:" + strGuessWord;
   document.getElementById("parWordCnt").innerHTML = "Word " + 1 + " of " + arrWords.length;
   document.getElementById("parGuessLetters").innerHTML = "Guess Letters:";
}

function RandomWordArray() {
var intRandomIndex=0;
  for(i=0;i<intWordCnt;i++) {
      intRandomIndex=Math.floor((Math.random() * arrWords.length-1)+1); 
    while (arrWordsRandom.indexOf(intRandomIndex)>=0) {
       intRandomIndex=Math.floor((Math.random() * arrWords.length-1)+1); 
      //  console.log(arrWordsRandom);
      // console.log(intRandomIndex);
    }
 
    arrWordsRandom.push(intRandomIndex);
    // console.log(arrWordsRandom);
   
  }
}

function GuessLetter(strCurrKey) {

 		// for (intCurrRound=1;intCurrRound<=intTotalRounds; intCurrRound++) {
   // 	  		strCurrWord=arrWords[intCurrRound-1];
   //          strGuessWord=strCurrWord.replace(/[^A-Za-z0-9-]/g,"-")
   //          document.getElementById("parGuessWord").innerHTML = "Guess Word: " + strGuessWord.toUpperCase();
   //          document.getElementById("parCurrWord").innerHTML = "Current Word: " + strCurrWord.toUpperCase();
   	  		// while (intIncorrectGuessCnt<intIncorrectGuessLimit && strGuessWord!=strCurrWord) {
                 arrGuessLetters.push(strCurrKey.toUpperCase());
                  //console.log(arrGuessLetters);
                 if(strCurrWord.indexOf(strCurrKey)==-1) {
                 	arrIncorrectLetters.push(strCurrKey.toUpperCase());
                 	intIncorrectGuessCnt=intIncorrectGuessCnt+1;
                 	document.getElementById("parGuessLetters").innerHTML = "Guess Letters: " + arrGuessLetters.toString();
                 }
                 else {
                    arrCorrectLetters.push(strCurrKey.toUpperCase());
                    //console.log(arrCorrectLetters);
                    document.getElementById("parGuessLetters").innerHTML = "Guess Letters: " + arrGuessLetters.toString();
                 }
                     UpdateGuessWord(strCurrWord, arrCorrectLetters);
                 
                 
                
                 
               if (intIncorrectGuessCnt==intIncorrectGuessLimit) {
               	     
               	     intLosses=intLosses+1;
               	     document.getElementById("parLosses").innerHTML = "Losses: " + intLosses;
               	     
               	     if(intWordNext<intWordCnt-1) {
               	     	alert("You lost! On to the next word.");
                      document.getElementById("parGuessWord").innerHTML = "Guess Word: " + strGuessWord.toUpperCase();
               	     	//setTimeout(NextWord(),2000);
                      NextWord();
               	     }
               	      else {
                        alert("You lost!");
                        document.getElementById("parGuessWord").innerHTML = "Guess Word: " + strGuessWord.toUpperCase();
                        //setTimeout(NextWord(),2000);
               	      	EndGame();
               	      }
                    }
               else if (strCurrWord.toUpperCase()==strGuessWord.toUpperCase()) {
               		intWins=intWins+1;
               		document.getElementById("parWins").innerHTML = "Wins: " + intWins;
               		 if (intWordNext<intWordCnt-1) {
               		 	   alert("You won! On to the next word.");
               		 	   document.getElementById("parGuessWord").innerHTML = "Guess Word: " + strGuessWord.toUpperCase();
                        //setTimeout(NextWord(),2000);
               	     	 NextWord();
               	     }
               	      else {
                        alert("You won!");
                        document.getElementById("parGuessWord").innerHTML = "Guess Word: " + strGuessWord.toUpperCase();
                        //setTimeout(NextWord(),2000);
               	      	EndGame();
               	      }
               }

  	}
  

function NextWord(){
     if (intWordNext==intWordCnt-1) {
      EndGame();
     }
   intWordNext=intWordNext+1;
   strWordNext=intWordNext+1;
   intWordIndex=arrWordsRandom[intWordNext];
   strCurrWord=arrWords[intWordIndex];
   strGuessWord=strCurrWord.replace(/[A-Za-z0-9-]/g,"-");
    arrGuessLetters=[];
    arrIncorrectLetters=[];
    arrCorrectLetters=[];
    intIncorrectGuessCnt=0;
   document.getElementById("parGuessWord").innerHTML = "Guess Word: " + strGuessWord;
   document.getElementById("parGuessLetters").innerHTML = "Guess Letters: " + arrGuessLetters.toString();
   document.getElementById("parWordCnt").innerHTML = "Word " + strWordNext + " of " + arrWords.length;
}

function EndGame() {
  boolGameStarted=false;
  intWordNext=0;
  arrWordsRandom=[]
  intIncorrectGuessCnt=0
	alert("Game over!");
}

function UpdateGuessWord(strCurrWord, arrCorrectLetters) {
	//alert("UpdateGuessWord");
	for (i=0;i<strCurrWord.length;i++) {
		//console.log(strCurrWord.charAt(i).toUpperCase())
        //console.log(arrCorrectLetters)
		//console.log(arrCorrectLetters.indexOf(strCurrWord.charAt(i).toUpperCase()));
		 if (arrCorrectLetters.indexOf(strCurrWord.charAt(i).toUpperCase())>=0) {
		 	//console.log(i);
		 	//console.log(strGuessWord);
		 	  strGuessWord=strGuessWord.substring(0,i) +strCurrWord.charAt(i).toUpperCase()+strGuessWord.substring(i+1);		 
		 	//console.log(strGuessWord);
	     }
    }  
    //alert(strGuessWord);
	document.getElementById("parGuessWord").innerHTML = "Guess Word: " + strGuessWord;
}
