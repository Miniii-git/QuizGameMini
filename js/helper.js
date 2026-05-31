export const formatData = (questionData) => {
  console.log(questionData);
  const result = questionData.map((item) => {
    const answers = [...item.incorrect_answers];
    const coorrectAnswerIndex = Math.floor(Math.random() * 4); //console.log(answers, coorrectAnswerIndex, item.correct_answer);
    answers.splice(coorrectAnswerIndex, 0, item.correct_answer); //console.log(answers);
    const questionObject = {
      question: item.question,
      answers,
      coorrectAnswerIndex,
    };
    return questionObject;
  });
  //console.log(result);
  return result;
};

export let diff = null;
