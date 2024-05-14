export default function CalendarItem({ day, expenses, openModal }) {
  const baseExpensesPeek = expenses.baseExpenses.slice(0, 3).map((expense, idx) => (
    <li key={idx} className="calendar-peek">{Number(expense.expenseSum)}</li>
  ))


  return (
    <button className="calendar-item" onClick={() => openModal(expenses)}>
      <h3 className="calendar-item__day">{day}</h3>
      {
        expenses.total > 0 && (
          <>
            <h2 className="calendar-item__total">{expenses.total} RON</h2>
            {
              baseExpensesPeek.length > 1 && (
                <ul className="calendar-peek__container">
                  {baseExpensesPeek}
                  {expenses.baseExpenses.length > 3 && <li>...</li>}
                </ul>
              )
            }
          </>
        )
      }
    </button>
  )
}