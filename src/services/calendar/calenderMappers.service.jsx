import { mapExpenseTotalsLinearly } from "../resource/expenseMappers.service"

export const getYearOptions = () => {
  const yearOptions = []

  for (let year = 1900; year <= 2100; year++){
    const yearOption = <option key={year} value={year}>{year}</option>
    
    yearOptions.push(yearOption)
  }

  return yearOptions
}

export const getMonthOptions = () => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
  const monthOptions = []

  for (let month = 1; month <= 12; month++) {
    const monthOption = <option key={month} value={month}>{monthNames[month-1]}</option>

    monthOptions.push(monthOption)
  }

  return monthOptions
}

export const getMonthItems = (options, userCategories) => {
  const mappedExpenses = mapExpenseTotalsLinearly(options)

  return mappedExpenses.map((expense, idx) => (
    <li key={idx}>{`${idx+1} - ${expense.expenseSum}`}</li>
  ))
}