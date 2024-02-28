import { createContext, useContext } from "react"

const BudgetsContext = createContext()

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deletExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}
