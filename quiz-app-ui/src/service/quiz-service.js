import axios from 'axios'
const URL="http://localhost:8085"

export async function getAllQuizes(){
    const res= await axios.get(`${URL}/quiz/get`);
    return res.data
}

export async function getQuizById(quizId){
    const res= await axios.get(`${URL}/quiz/get/${quizId}`);
    return res.data
}

export async function createQuiz(quiz){
    const res= await axios.post(`${URL}/quiz/create`,quiz);
    return res.data
}