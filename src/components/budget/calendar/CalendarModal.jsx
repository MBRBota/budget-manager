import { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { postCategory, postExpense } from '../../../services/resource/postResource.service';
import CustomCategory from './modal/CustomCategory';

export default function CalendarModal({ closeModal, setShouldRefresh, date, expenses, categories }) {
  const { user, setUser } = useContext(UserContext);

  // Prop data to state initialization
  const [expenseData, setExpenseData] = useState(expenses);
  const [categoryData, setCategoryData] = useState(categories);

  // POST form states
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newExpense, setNewExpense] = useState({ expenseSum: '', expenseDate: date.valueOf(), categoryId: 1 });
  const [newCategory, setNewCategory] = useState({ categoryName: '', categoryColor: '' });

  // New resource form input handlers
  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  // New resource togglers
  const toggleAddingExpense = () => {
    setIsAddingExpense((prevAdding) => !prevAdding);
  };

  const toggleAddingCategory = () => {
    setIsAddingCategory((prevAdding) => !prevAdding);
  };

  // New resource form submit handlers
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postExpense(user.accessToken, newExpense);

      if (!response?.success) setUser(null);

      setExpenseData((prevExpenseData) => ({
        ...prevExpenseData,
        baseExpenses: [...prevExpenseData.baseExpenses, response.data.newExpense],
        total: prevExpenseData.total + Number(response.data.newExpense.expenseSum),
      }));

      setIsAddingExpense(false);
      setShouldRefresh(true);
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postCategory(user.accessToken, newCategory);

      if (!response?.success) setUser(null);

      setCategoryData((prevCategoryData) => [...prevCategoryData, response.data.newCategory]);

      setIsAddingCategory(false);
      setShouldRefresh(true);
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

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

  const baseExpenses = expenseData.baseExpenses.map((expense, idx) => (
    <li key={idx} className="modal-expense">
      <h3>
        <i className="fa-solid fa-circle" style={{ color: '#' + expense.categoryColor }} />
        {Number(expense.expenseSum)} RON - {expense.categoryName}
      </h3>
    </li>
  ));

  const categoryMapper = (categoryList, isCustom = false) =>
    categoryList.map((category) =>
      isCustom ? (
        <CustomCategory
          key={category.categoryId}
          categoryId={category.categoryId}
          categoryName={category.categoryName}
          categoryColor={category.categoryColor}
          selectedId={Number(newExpense.categoryId)}
          handleExpenseChange={handleExpenseChange}
          onCategoryDelete={onCategoryDelete}
          onCategoryEdit={onCategoryEdit}
        />
      ) : (
        <li key={category.categoryId} className="category__container">
          <button
            className={`category ${Number(newExpense.categoryId) === category.categoryId ? 'active' : ''}`}
            name="categoryId"
            value={category.categoryId}
            onClick={handleExpenseChange}
          >
            <i className="fa-solid fa-circle" style={{ color: '#' + category.categoryColor }} />
            {category.categoryName}
          </button>
        </li>
      ),
    );

  const defaultCategories = categoryMapper(categoryData.filter((category) => category.categoryId <= 8));
  const customCategories = categoryMapper(
    categoryData.filter((category) => category.categoryId > 8),
    true,
  );

  return (
    <div className="calendar-modal__container">
      <div className="modal-header">
        <h3 className="header__date">{date.format('D MMMM YYYY')}</h3>
        <h1 className="header__total">Total spent: {expenseData.total} RON</h1>
      </div>
      {isAddingExpense ? (
        <>
          <form className="expense-form" onSubmit={handleExpenseSubmit}>
            <button type="button" onClick={toggleAddingExpense}>
              <i className="fa-solid fa-square-caret-left" />
            </button>
            <input
              type="number"
              name="expenseSum"
              value={newExpense.expenseSum}
              min="1"
              onChange={handleExpenseChange}
              placeholder="Enter sum"
              required
            />
            <input type="hidden" name="expenseDate" value={newExpense.expenseDate} required />
            <input type="hidden" name="categoryId" value={newExpense.categoryId} required />
            <button className="expense-form__submit" type="submit">
              <i className="fa-solid fa-floppy-disk" />
            </button>
          </form>
          <div className="modal-category__container">
            <h2 className="category__header">Default Categories</h2>
            <ul className="category-default__container">{defaultCategories}</ul>
            <h2 className="category__header">Custom Categories</h2>
            {customCategories.length === 0 && (
              <p className="category__notice">No custom categories. You can add a custom category below.</p>
            )}
            <ul className="category-custom__container">
              {customCategories}
              <li>
                {isAddingCategory ? (
                  <form className="category-form" onSubmit={handleCategorySubmit}>
                    <label>
                      <i className="fa-solid fa-circle" style={{ color: '#' + newCategory.categoryColor }} />
                      #
                      <input
                        type="text"
                        name="categoryColor"
                        className="category-form__color"
                        value={newCategory.categoryColor}
                        minLength="6"
                        maxLength="8"
                        onChange={handleCategoryChange}
                        placeholder="Color (hex)"
                        required
                      />
                    </label>
                    <input
                      type="text"
                      name="categoryName"
                      className="category-form__name"
                      value={newCategory.categoryName}
                      maxLength="20"
                      onChange={handleCategoryChange}
                      placeholder="Enter category name"
                      required
                    />
                    <button className="category-form__submit" type="submit">
                      <i className="fa-solid fa-floppy-disk" />
                    </button>
                    <button className="category-form__cancel" type="button" onClick={toggleAddingCategory}>
                      <i className="fa-solid fa-ban" />
                    </button>
                  </form>
                ) : (
                  <button className="category__add" onClick={toggleAddingCategory}>
                    <i className="fa-regular fa-square-plus" />
                  </button>
                )}
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <ul className="modal-expense__container">{baseExpenses}</ul>
          <button className="modal-expense__add" onClick={toggleAddingExpense}>
            + Add Expense
          </button>
        </>
      )}
    </div>
  );
}
