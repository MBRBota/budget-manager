import { useContext, useState } from 'react';
import { UserContext } from '../../../../context/UserContext';
import CustomCategory from './CustomCategory';
import CategoryForm from './CategoryForm';
import { postCategory } from '../../../../services/resource/postResource.service';

export default function ExpenseForm({
  categories,
  initialData,
  categoryName,
  isEdit,
  onSubmit,
  setShouldRefresh,
  closeExpenseForm,
}) {
  const { user, userTokenRefresh } = useContext(UserContext);

  const [categoryData, setCategoryData] = useState(categories);
  const [expenseFormData, setExpenseFormData] = useState(initialData);

  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenseFormData((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  const toggleAddingCategory = () => {
    setIsAddingCategory((prevAdding) => !prevAdding);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const postData = { categoryName: formData.get('categoryName'), categoryColor: formData.get('categoryColor') };

    try {
      const { data } = await postCategory(user.accessToken, postData);

      setCategoryData((prevCategoryData) => [...prevCategoryData, data.newCategory]);

      setIsAddingCategory(false);
      setShouldRefresh(true);
    } catch (err) {
      console.log(err);
      userTokenRefresh();
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

  const categoryMapper = (categoryList, isCustom = false) =>
    categoryList.map((category) =>
      isCustom ? (
        <CustomCategory
          key={category.categoryId}
          categoryId={category.categoryId}
          categoryName={category.categoryName}
          categoryColor={category.categoryColor}
          selectedId={Number(expenseFormData.categoryId)}
          handleExpenseChange={handleExpenseChange}
          onCategoryDelete={onCategoryDelete}
          onCategoryEdit={onCategoryEdit}
        />
      ) : (
        <li key={category.categoryId} className="category__container">
          <button
            className={`category ${Number(expenseFormData.categoryId) === category.categoryId ? 'active' : ''}`}
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
    <>
      {isEdit && (
        <p>
          <strong>Modifying Expense: </strong>
          {initialData.expenseSum} RON - {categoryName}
        </p>
      )}
      <form className="expense-form" onSubmit={onSubmit}>
        <button type="button" onClick={closeExpenseForm}>
          <i className="fa-solid fa-square-caret-left" />
        </button>
        <input
          type="number"
          name="expenseSum"
          value={expenseFormData.expenseSum}
          min="1"
          onChange={handleExpenseChange}
          placeholder="Enter sum"
          required
        />
        <input type="hidden" name="expenseDate" value={expenseFormData.expenseDate} required />
        <input type="hidden" name="categoryId" value={expenseFormData.categoryId} required />
        {isEdit && <input type="hidden" name="expenseId" value={expenseFormData.expenseId} required />}
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
              <CategoryForm
                initialData={{ categoryName: '', categoryColor: '' }}
                isEdit={false}
                onSubmit={handleCategorySubmit}
                toggleForm={toggleAddingCategory}
              />
            ) : (
              <button className="category__add" onClick={toggleAddingCategory}>
                <i className="fa-regular fa-square-plus" />
              </button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
