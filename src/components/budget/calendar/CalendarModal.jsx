

export default function CalendarModal ({ modalContent }) {
  const { expenses, categories } = modalContent
  const baseExpenses = expenses.baseExpenses.map((expense, idx) => (
    <li key={idx} className="modal-expense">{expense.expenseSum}</li>
  ))


  return (
    <div className="calendar-modal__container">
      <div className="modal-header">
        <h3 className="header__day"></h3>
        <h1 className="header__total">Total spent:</h1>
      </div>
      <ul className="modal-expense__container">
        {baseExpenses}
      </ul>
      <button className="modal-expense__add">+ Add Expense</button>
    </div>
  )
}