import {Quiz} from './quiz.js'
export class Settings{
    constructor(){
     this.categoryElement=document.getElementById('category')
     this.difficultyElements=document.getElementsByName('difficulty')
     this.numberOfQuestionsElement=document.getElementById('numberOfQuestions')
     this.startBtn=document.getElementById('startBtn')
     this.startBtn.addEventListener('click',this.startQuiz.bind(this))
    }
   async startQuiz(){
        let category=this.categoryElement.value
        let diffculty=Array.from(this.difficultyElements).find((input)=>input.checked).value
        let numberOfQuestions=this.numberOfQuestionsElement.value
        let url=`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${diffculty}`
      let results=await  this.fetchApi(url)
      if(results.length){
        $('#alertChoose').fadeOut(200,()=>{
            $('#setting').fadeOut(500,()=>{
                $('#quiz').fadeIn(500)
            }) 
        })
      new Quiz(results)
       }else{
        $('#alertChoose').fadeIn(200)
       }
    }
  async  fetchApi(url){
        let results=await fetch(url)
        let response=await results.json()
        return response.results
    }
}