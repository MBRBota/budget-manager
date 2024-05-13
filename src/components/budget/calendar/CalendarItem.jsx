export default function CalendarItem({ day, expenses, openModal }) {
  const baseExpensesPeek = expenses.baseExpenses.slice(0, 3).map((expense, idx) => (
    <li key={idx} className="calendar-peek">{Number(expense.expenseSum)}</li>
  ))


  return (
    <button className="calendar-item" onClick={() => openModal(expenses)}>
      <h2 className="calendar-item__day">{day}</h2>
      {
        expenses.total > 0 && (
          <>
            <h4 className="calendar-item__total">{expenses.total}</h4>
            <ul className="calendar-peek__container">
              {baseExpensesPeek}
            </ul>
          </>
        )
      }
    </button>
  )
}