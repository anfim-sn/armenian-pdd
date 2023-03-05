import { QuestionType } from "../types/group";

type QuestionsListProps = {
  questions: QuestionType[];
};
export const QuestionsList = ({ questions }: QuestionsListProps) => {
  return (
    <div>
      {questions.map((elem) => (
        <li key={elem.id}>{elem.question}</li>
      ))}
    </div>
  );
};
