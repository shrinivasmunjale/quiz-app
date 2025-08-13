const startbtn = document.querySelector("#start-btn");
const startbox = document.querySelector(".start-box")
const box = document.querySelector(".box")
const p = document.querySelector(".pp")
const qn = document.querySelector(".qn")
const option = document.querySelectorAll(".ans")
const cat = document.querySelectorAll(".cat")
const next = document.querySelector("#next")
let cate=""
cat.forEach((e)=>{
    e.addEventListener("click",()=>{
         cate = e.innerHTML;
        e.style.backgroundColor="lightgreen"

        
        
        
    })
    
})




const api = `https://the-trivia-api.com/api/questions?limit=10&categories=${cate}`

let index = 0;
const data =[];
let score = 0;
const getdata = async()=>{
    const res = await fetch(api)
    const data = await res.json()
   


startbtn.addEventListener ("click", ()=>{
    startbox.style.display = "none";
    box.style.display = "block";
    p.style.display="block"

    getqn() 
})

const getqn =()=>{
    const currentq = data[index]
    qn.innerHTML= currentq.question;
     p.innerHTML=`${index +1}/${data.length}  ` ;

    const answer=[...currentq.incorrectAnswers , currentq.correctAnswer]
    answer.sort(()=>Math.random()-0.5)

    option.forEach((btn,i)=>{
        btn.innerHTML=answer[i] ||"";
        btn.style.backgroundColor = "";
        btn.disabled = false;
        btn.onclick = ()=>checkAnswer(btn,currentq.correctAnswer)
    })  
} 
function checkAnswer(selected,currect){
    if(selected.innerHTML===currect){
        selected.style.backgroundColor="lightgreen"
        score ++;
    }
    else{
        selected.style.backgroundColor="red"
    }
    option.forEach((a)=>{
        return a.disabled=true;
    })
}
next.addEventListener("click",(e)=>{
    e.preventDefault();
    index++;
   
    if(index< data.length){
        getqn()


    }
    else{
        qn.innerHTML=`Quiz Over! Your Score: ${score}/${data.length}`;
        option.forEach((e)=>e.style.display="none")
        next.style.display="none"
    }
})

}

getdata()
