export type QuestionType = {
  id: number,
  alias: string | null,
  position: number,
  correct_answer: string,
  image: string,
  image_original: string,
  image_answer_a: string,
  image_answer_b: string,
  image_answer_c: string,
  image_answer_d: string,
  image_answer_e: string,
  active: string,
  checked: number,
  group: number,
  label: string,
  created_at: string | null,
  updated_at: string | null,
  hint_for_correct_answer: string,
  question: string,
  answer_a: string,
  answer_b: string,
  answer_c: string,
  answer_d: string,
  answer_e: string,
}

export type GroupWithQuestons = {
  groupId: number
  groupName: string
  questions: QuestionType[]
}
