import { createContext, useContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []) // {id, name, max}
  const [expenses, setExpenses] = useLocalStorage("expenses", []) // {id, budgetId, amount, description}

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId)
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: crypto.randomUUID(), budgetId, amount, description },
      ]
    })
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) return prevBudgets
      return [...prevBudgets, { id: crypto.randomUUID(), name, max }]
    })
  }

  function deleteBudget({ id }) {
    // TODO: Deal with expenses
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id)
    })
  }

  function deletExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id)
    })
  }

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
