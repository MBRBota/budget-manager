import { useContext, useState } from 'react';
import ExpenseForm from './modal/ExpenseForm';
import { UserContext } from '../../../context/UserContext';
import { postExpense } from '../../../services/resource/postResource.service';
import Expense from './modal/Expense';

export default function CalendarModal({ closeModal, setShouldRefresh, date, expenses, categories }) {
  const { user, userTokenRefresh } = useContext(UserContext);

  const [expenseData, setExpenseData] = useState(expenses);
  const [expenseFormData, setExpenseFormData] = useState(null);

  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);

  // New resource togglers
  const openExpenseForm = (e) => {
    const { expenseId, expenseSum, expenseDate, categoryId, categoryName, isEdit } = e.currentTarget.dataset;

    setExpenseFormData({ initialData: { expenseId, expenseSum, expenseDate, categoryId }, categoryName, isEdit });
    setIsAddingOrEditing(true);
  };

  const closeExpenseForm = () => {
    setIsAddingOrEditing(false);
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const postData = {
      expenseSum: formData.get('expenseSum'),
      expenseDate: formData.get('expenseDate'),
      categoryId: formData.get('categoryId'),
    };

    try {
      const { data } = await postExpense(user.accessToken, postData);

      setExpenseData((prevExpenseData) => ({
        ...prevExpenseData,
        baseExpenses: [...prevExpenseData.baseExpenses, data.newExpense],
        total: prevExpenseData.total + Number(data.newExpense.expenseSum),
      }));

      closeExpenseForm();
      setShouldRefresh(true);
    } catch (err) {
      console.log(err);
      userTokenRefresh();
    }
  };

  const handleExpenseDelete = async (e) => {
    e.preventDefault();

    try {
      //todo
    } catch (err) {
      console.log(err);
      userTokenRefresh();
    }
  };

  const handleExpenseEdit = (e) => {
    e.preventDefault();

    try {
      //todo
    } catch (err) {
      console.log(err);
      userTokenRefresh();
    }
  };

  const baseExpenses = expenseData.baseExpenses.map(
    ({ expenseId, expenseSum, expenseDate, categoryId, categoryName, categoryColor }) => (
      <Expense
        key={expenseId}
        expenseId={expenseId}
        expenseSum={Number(expenseSum)}
        expenseDate={expenseDate}
        categoryId={categoryId}
        categoryName={categoryName}
        categoryColor={categoryColor}
        openExpenseForm={openExpenseForm}
        handleExpenseDelete={handleExpenseDelete}
      />
    ),
  );

  return (
    <div className="calendar-modal__container">
      <div className="modal-header">
        <h3 className="header__date">{date.format('D MMMM YYYY')}</h3>
        <h1 className="header__total">Total spent: {expenseData.total} RON</h1>
      </div>
      {isAddingOrEditing ? (
        <ExpenseForm
          categories={categories}
          initialData={expenseFormData.initialData}
          categoryName={expenseFormData.categoryName}
          isEdit={expenseFormData.isEdit}
          onSubmit={expenseFormData.isEdit ? handleExpenseEdit : handleExpenseSubmit}
          setShouldRefresh={setShouldRefresh}
          closeExpenseForm={closeExpenseForm}
        />
      ) : (
        <>
          <ul className="modal-expense__container">{baseExpenses}</ul>
          <button
            className="modal-expense__add"
            onClick={openExpenseForm}
            data-expense-sum=""
            data-expense-date={date.valueOf()}
            data-category-id="1"
          >
            + Add Expense
          </button>
        </>
      )}
    </div>
  );
}
