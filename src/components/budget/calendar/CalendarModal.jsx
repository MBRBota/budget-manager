import { useContext, useState } from 'react';
import ExpenseForm from './modal/ExpenseForm';
import { UserContext } from '../../../context/UserContext';
import { postExpense } from '../../../services/resource/postResource.service';
import Expense from './modal/Expense';
import { patchExpense } from '../../../services/resource/patchResource.service';
import { deleteExpense } from '../../../services/resource/deleteResource.service';

export default function CalendarModal({ closeModal, setShouldRefresh, date, expenses, categories }) {
  const { user, userTokenRefresh } = useContext(UserContext);

  const [expenseData, setExpenseData] = useState(expenses);
  const [categoryData, setCategoryData] = useState(categories);

  const [expenseFormData, setExpenseFormData] = useState(null);
  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);

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

  const handleExpenseEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const patchData = {
      expenseId: formData.get('expenseId'),
      expenseSum: formData.get('expenseSum'),
      expenseDate: formData.get('expenseDate'),
      categoryId: formData.get('categoryId'),
    };

    try {
      const {
        data: { updatedExpense },
      } = await patchExpense(user.accessToken, patchData);

      setExpenseData((prevExpenseData) => ({
        ...prevExpenseData,
        baseExpenses: prevExpenseData.baseExpenses.map((expense) => {
          return expense.expenseId === updatedExpense.expenseId ? updatedExpense : expense;
        }),
        total:
          prevExpenseData.total -
          Number(
            prevExpenseData.baseExpenses.find((expense) => expense.expenseId === updatedExpense.expenseId).expenseSum,
          ) +
          Number(updatedExpense.expenseSum),
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
    
    const expenseId = Number(e.currentTarget.value)
    
    try {
      await deleteExpense(user.accessToken, expenseId);

      setExpenseData((prevExpenseData) => ({
        ...prevExpenseData,
        baseExpenses: prevExpenseData.baseExpenses.filter((expense) => expense.expenseId !== expenseId),
        total:
          prevExpenseData.total -
          Number(prevExpenseData.baseExpenses.find((expense) => expense.expenseId === expenseId).expenseSum),
      }));
    } catch (err) {
      console.log(err);
      userTokenRefresh();
    }
  };

  const onCategorySubmit = (newCategory) => {
    
    setCategoryData((prevCategoryData) => [...prevCategoryData, newCategory]);

    setShouldRefresh(true);
  }

  const onCategoryEdit = (updatedCategory) => {

    setCategoryData((prevCategoryData) =>
      prevCategoryData.map((category) => {
        return category.categoryId === updatedCategory.categoryId ? updatedCategory : category;
      }),
    );

    setShouldRefresh(true);
  };

  const onCategoryDelete = (deletedId) => {

    setCategoryData((prevCategoryData) => prevCategoryData.filter((category) => category.categoryId !== deletedId));

    setShouldRefresh(true);
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
          key={categoryData}
          categories={categoryData}
          initialData={expenseFormData.initialData}
          categoryName={expenseFormData.categoryName}
          isEdit={expenseFormData.isEdit}
          onSubmit={expenseFormData.isEdit ? handleExpenseEdit : handleExpenseSubmit}
          onCategorySubmit={onCategorySubmit}
          onCategoryEdit={onCategoryEdit}
          onCategoryDelete={onCategoryDelete}
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
