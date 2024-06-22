package com.fawad.quiz_service.service;


import com.fawad.quiz_service.dao.QuizDao;
import com.fawad.quiz_service.feign.QuizInterface;
import com.fawad.quiz_service.model.QuestionWrapper;
import com.fawad.quiz_service.model.Quiz;
import com.fawad.quiz_service.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;

    @Autowired
    QuizInterface quizInterface;


    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {

        List<Integer> questions = quizInterface.getQuestionsForQuiz(category, numQ).getBody();
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestionIds(questions);
        quizDao.save(quiz);

        return new ResponseEntity<>("Success", HttpStatus.CREATED);

    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
          Quiz quiz = quizDao.findById(id).get();
          List<Integer> questionIds = quiz.getQuestionIds();
        return quizInterface.getQuestionsFromId(questionIds);

    }

    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
        return quizInterface.getScore(responses);
    }

    public ResponseEntity<List<Quiz>> getAllQuizes() {
        List<Quiz> quizzes=quizDao.findAll();
        return ResponseEntity.ok().body(quizzes);
    }
}
