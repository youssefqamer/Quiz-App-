export class Quiz{
    constructor(results){
        this.result=results
        this.index=0
        this.score = 0;
        this.currentQuestionElement = document.getElementById('currentQuestion');
        this.totalNumberOfQuestionsElement = document.getElementById('totalNumberOfQuestions');
        this.questionElement = document.getElementById('question');
        this.rowAnswerElement = document.getElementById('rowAnswer');
        this.next = document.getElementById('next');
        this.next.addEventListener('click',this.nextQues.bind(this))
        this.showQuestion()
    }
    showQuestion(){
        this.currentQuestionElement.innerHTML=this.index+1
        this.totalNumberOfQuestionsElement.innerHTML=this.result.length
        this.questionElement.innerHTML=this.result[this.index].question
        // let answers=(this.result[index].incorrect_answers).concat(this.result[index].correct_answer)
        let answers=[...this.result[this.index].incorrect_answers,this.result[this.index].correct_answer]

   
        let div=''
        answers.forEach((answer)=>{
            div+=`
            <div class="form-check">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" id="" value="${answer}" >
               ${answer}
                </label>
           </div>
            `
        })
    this.rowAnswerElement.innerHTML=div
    }
    nextQues(){
        if(!this.checkAnswer()){
            $('#alert').fadeIn(200)
            return
        }
        $('#alert').fadeOut(200)
        this.index++
        if(this.index >= this.result.length){
           $('#quiz').fadeOut(200,()=>{
            $('#finish').fadeIn(200)
            $('#score').html(this.score)
            $('#tryBtn').click(()=>{
                $('#numberOfQuestions').val(' ')
                $('#finish').fadeOut(200,function(){
                    $('#setting').fadeIn(200)
                })
            })
           })
        }else{
            this.showQuestion()
        }
    }
    checkAnswer=()=>{
        let userAnswer=[...document.getElementsByName('answer')].find((input)=>input.checked)?.value
        let correctAnswer = this.result[this.index].correct_answer
        if(!userAnswer){
            return false
        }
        if(userAnswer==correctAnswer){
            this.score++
            $('#Correct').fadeIn(100).fadeOut(500)
        }else{
            $('#inCorrect').fadeIn(100).fadeOut(500)
        }
        return true
    }
}