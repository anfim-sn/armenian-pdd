import { createContext, FC, useContext } from 'react'
import { QuestionsStatisticService } from '../services/QuestionsStatisticService'

interface IServicesContext {
  questionStatisticService: typeof QuestionsStatisticService
}

const ServicesContext = createContext<IServicesContext>(null!)
const useServices = () => useContext(ServicesContext)

export const useQuestionStatisticService = () =>
  useServices().questionStatisticService

export const ServicesProvider: FC<{
  value: IServicesContext
  children?: React.ReactNode
}> = ({ value, children }) => {
  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  )
}
