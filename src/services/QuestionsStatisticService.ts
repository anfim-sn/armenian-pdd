export type QuestionStatistic = {
  'correct': number
  'incorrect': number
}

export type AllQuestionsStatistic = Record<number, QuestionStatistic>

export class QuestionsStatisticService {
  private static localStorageKey = 'questionStats';
  private static initialAll: AllQuestionsStatistic = {}
  private static initialQuestion = { correct: 0, incorrect: 0 }

  public static setQuestionStatistic(questionId: number, isCorrect: boolean): void {

    const allQuestionsStatistic = QuestionsStatisticService.getAll()
    let questionStat = allQuestionsStatistic[questionId]

    if (questionStat) {
      isCorrect ?
        questionStat.correct++ :
        questionStat.incorrect++
    } else {
      allQuestionsStatistic[questionId] =
        isCorrect ?
          { correct: 1, incorrect: 0 } :
          { correct: 0, incorrect: 1 }
    }

    window.localStorage?.setItem(QuestionsStatisticService.localStorageKey, JSON.stringify(allQuestionsStatistic))
  }

  private static getLocalStorage() {
    if (window?.localStorage && typeof window.localStorage === 'object') {
      return localStorage
    }

    return null
  }

  private static getAll(): AllQuestionsStatistic {
    try {
      const localStorage = QuestionsStatisticService.getLocalStorage()

      const allQuestionStatistic =
        (JSON.parse(localStorage?.getItem(QuestionsStatisticService.localStorageKey) || 'null') as AllQuestionsStatistic) ??
        QuestionsStatisticService.initialAll
      return allQuestionStatistic
    } catch (_) {
      return QuestionsStatisticService.initialAll
    }
  }

  public static getByQuestionId(questionId: number): QuestionStatistic {
    const allQuestionsStats = QuestionsStatisticService.getAll()

    return allQuestionsStats[questionId] ?? QuestionsStatisticService.initialQuestion
  }
}