import dayjs from "dayjs"

export default function CalendarModal ({ closeModal, expenses, categories }) {
  const baseExpenses = expenses.baseExpenses.map((expense, idx) => (
    <li key={idx} className="modal-expense">
      <h3><span style={{color: expense.categoryColor}}>• </span>{Number(expense.expenseSum)} - {expense.categoryName}</h3>
    </li>
  ))


  return (
    <div className="calendar-modal__container">
      <div className="modal-header">
        <h3 className="header__date">{dayjs(expenses.date).format('D MMMM YYYY')}</h3>
        <h1 className="header__total">Total spent: {expenses.total}</h1>
      </div>
      <ul className="modal-expense__container">
        {baseExpenses}
      </ul>
      <button className="modal-expense__add">+ Add Expense</button>
    </div>
  )
}