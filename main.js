const questions=[
    {
        question:"Qaysi biri Array metodi?",
        answer:["substring", 'trim', 'concat', 'include'],
        correct:4
    },
    {
        question:"Dunyodagi eng uzun daryo?",
        answer:["Nill", 'Amazon', 'Kongo', 'Gang']  ,
        correct:1
    },
    {
        question:"Ispaniyaning poytaxti?",
        answer:["Lisabon", 'Madrid', 'London', 'Parij']  ,
        correct:2  
    },
    {
        question:"Qaysi sayyora eng katta?",
        answer:["Neptun", 'Mars', 'Yupiter', 'Yer']  ,
        correct:3   
    },
    {
        question:"Futbol qaysi davlatda kashf etilgan?",
        answer:["Germaniyada", 'Braziliyada', 'Angliyada', 'Ispaniyada']  ,
        correct:3   
    },
    {
        question:"Ukrainaning poytaxti?",
        answer:["Kiev", 'Moskva', 'Lyuksemburg', 'Buones-Ayres']  ,
        correct:1   
    },
 {
    question:"Java script nechanchi yil kashf etilgan?",
    answer:["2005", '1911', '1985', '1995']  ,
    correct:4     
 }
];

// Html elements
const quizHeader=document.querySelector('#header');
const  quizList=document.querySelector('#list');
const  submitBtn=document.querySelector('#submit');
const success=document.getElementById('successSound');
const Error=document.getElementById('errorSound');
const clups=document.getElementById('clups');



let score=0;
let questionIndex=0;



 clearPage();
showQuestion()

submitBtn.addEventListener('click', checkAnswer)

function clearPage(){
quizHeader.innerHTML='';
quizList.innerHTML='';
}

function showQuestion(){
console.log('show questions');
// savol
const headerTemplate=`<h2 class='title'>%title%</h2>`
const title=headerTemplate.replace('%title%',questions[questionIndex] ['question'] )
quizHeader.innerHTML=title;



// variantlar
let answerNumber=1;
for(answerText of questions[questionIndex]['answer']){
  const questionTemplate=`<li><label><input type="radio"value='%number%' class="answer"><span>%answer%</span></label></li>`; 


const answerHTML=questionTemplate
.replace('%answer%', answerText).replace
('%number%', answerNumber)
quizList.innerHTML+=answerHTML;
answerNumber++
}

}

function checkAnswer(){
    console.log('start checkAns');
const checkRadio=quizList.querySelector('input[type="radio"]:checked')
if(!checkRadio){
    submitBtn.blur()
    return
}
const userAnswer=parseInt(checkRadio.value)
if(userAnswer ===questions[questionIndex]['correct']){
    if(success.paused){
        success.play()
    }else{
        success.pause()
    }
    score++;
    console.log('score=', score);
}else if(userAnswer !==questions[questionIndex]['correct']){
    if(Error.paused){
        Error.play()
    }else{
        Error.pause()
    }
}
if(questionIndex !== questions.length -1){
console.log('neposledniy');
questionIndex++;
clearPage();
showQuestion();
return;
}else{
console.log('posledniy');
clearPage();
showResult()
}
}


function showResult(){
    console.log('show result checked!');
    console.log('togri javob soni=', score);

const resultTemplate=`
   <h2 class="title">%title%</h2>
   <h3 class="summary">%message%</h3>
    <p class="result">%result%</p>
    `;

    let title, message;
    if(score === questions.length){
     title='Tabriklaymiz 🏆🥇';
     message='Siz hamma savolga to\'g\'ri javob berdingiz 😎👍🏻';
     if(clups.paused){
        clups.play()
     }else{
        clups.pause()
     }
    }else if((score *100)/questions.length >=50){
     title='Yomon emas 😉';
     message='Siz savollarning yarmiga tog\'ri javob berdingiz👍🏻';
    }else{
        title='Yana bir bor urinib ko\'ring🙁';
        message='Siz yarmidan kamiga javob berdingiz'
    }

    let result=`${score} dan ${questions.length}`;

    const finalMessage=resultTemplate
    .replace('%title%', title)
    .replace('%message%', message)
    .replace('%result%', result)


quizHeader.innerHTML=finalMessage;





submitBtn.blur();
submitBtn.innerText='Qayta o\'ynash';
submitBtn.onclick =()=>{history.go()}



}



