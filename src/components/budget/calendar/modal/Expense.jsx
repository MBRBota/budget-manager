import { useState } from 'react';

export default function Expense({
  expenseId,
  expenseSum,
  expenseDate,
  categoryName,
  categoryColor,
  categoryId,
  openExpenseForm,
  handleExpenseDelete,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li className="modal-expense" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <h3>
        <i className="fa-solid fa-circle" style={{ color: '#' + categoryColor }} />
        {Number(expenseSum)} RON - {categoryName}
      </h3>
      <button
        className={'overlay__edit ' + (isHovered ? 'overlay-button' : 'invisible')}
        onClick={openExpenseForm}
        data-expense-id={expenseId}
        data-expense-sum={expenseSum}
        data-expense-date={expenseDate}
        data-category-id={categoryId}
        data-category-name={categoryName}
        data-is-edit
      >
        <i className="fa-solid fa-pencil" />
      </button>
      <button
        className={'overlay__delete ' + (isHovered ? 'overlay-button' : 'invisible')}
        onClick={handleExpenseDelete}
      >
        <i className="fa-solid fa-trash" />
      </button>
    </li>
  );
}
