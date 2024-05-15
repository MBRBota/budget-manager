import dayjs from "dayjs"
import { useContext, useState } from "react"
import { UserContext } from "../../../context/UserContext"

export default function CalendarModal({ closeModal, date, expenses, categories }) {
  const userContext = useContext(UserContext)

  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newExpense, setNewExpense] = useState({ expenseSum: 0, expenseDate: date.valueOf(), categoryId: 1 })
  const [newCategory, setNewCategory] = useState({ categoryName: "", categoryColor: "" })


  const handleExpenseChange = (e) => {
    const { name, value } = e.target
    setNewExpense(prevExpense => ({ ...prevExpense, [name]: value }))
  }

  const handleCategoryChange = (e) => {
    const { name, value } = e.target
    setNewCategory(prevCategory => ({ ...prevCategory, [name]: value }))
  }

  const toggleAddingExpense = () => {
    setIsAddingExpense(prevAdding => !prevAdding)
  }

  const toggleAddingCategory = () => {
    setIsAddingCategory(prevAdding => !prevAdding)
  }

  const handleExpenseSubmit = async (e) => {
    e.preventDefault()

    try {

    } catch (err) {

    }
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault()

    try {

    } catch (err) {

    }
  }


  const baseExpenses = expenses.baseExpenses.map((expense, idx) => (
    <li key={idx} className="modal-expense">
      <h3><i className="fa-solid fa-circle" style={{ color: '#' + expense.categoryColor }} />{Number(expense.expenseSum)} RON - {expense.categoryName}</h3>
    </li>
  ))

  const categoryMapper = (categoryList) => categoryList.map((category) => (
    <li key={category.categoryId} className="category__container">
      <button
        className={`category ${newExpense.categoryId == category.categoryId ? 'active' : ''}`}
        name="categoryId"
        value={category.categoryId}
        onClick={handleExpenseChange}
      >
        <i className="fa-solid fa-circle" style={{ color: '#' + category.categoryColor }} />{category.categoryName}
      </button>
    </li>
  ))

  const defaultCategories = categoryMapper(categories.filter(category => category.categoryId <= 8))
  const customCategories = categoryMapper(categories.filter(category => category.categoryId > 8))




  return (
    <div className="calendar-modal__container">
      <div className="modal-header">
        <h3 className="header__date">{dayjs(expenses.date).format('D MMMM YYYY')}</h3>
        <h1 className="header__total">Total spent: {expenses.total} RON</h1>
      </div>
      {
        isAddingExpense
          ? (
            <>
              <form className="expense-form">
                <button type="button" onClick={toggleAddingExpense}><i className="fa-solid fa-square-caret-left" /></button>
                <input
                  type="number"
                  name="expenseSum"
                  value={newExpense.expenseSum}
                  min="0"
                  onChange={handleExpenseChange}
                  placeholder="Enter sum"
                  required
                />
                <input
                  type="hidden"
                  name="expenseDate"
                  value={newExpense.expenseDate}
                  required
                />
                <input
                  type="hidden"
                  name="categoryId"
                  value={newExpense.categoryId}
                  required
                />
                <button className="expense-form__submit" type="submit"><i className="fa-solid fa-floppy-disk" /></button>
              </form>
              <div className="modal-category__container">
                <h2 className="category__header">Default Categories</h2>
                <ul className="category-default__container">
                  {defaultCategories}
                </ul>
                <h2 className="category__header">Custom Categories</h2>
                {customCategories.length === 0 && <p className="category__notice">No custom categories. You can add a custom category below.</p>}
                <ul className="category-custom__container">
                  {customCategories}
                  <li>
                    {
                      isAddingCategory
                        ? (
                          <form className="category-form">
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
                            <label htmlFor="#categoryColor">
                              #
                              <input
                                type="text"
                                name="categoryColor"
                                id="categoryColor"
                                className="category-form__color"
                                value={newCategory.categoryColor}
                                maxLength="8"
                                onChange={handleCategoryChange}
                                placeholder="Color (hex)"
                                required
                              />
                            </label>
                            <button className="category-form__submit" type="submit"><i className="fa-solid fa-floppy-disk" /></button>
                            <button className="category-form__cancel" type="button" onClick={toggleAddingCategory}><i className="fa-solid fa-ban" /></button>
                          </form>
                        )
                        : (
                          <button className="category__add" onClick={toggleAddingCategory}>
                            <i className="fa-regular fa-square-plus" />
                          </button>
                        )
                    }
                  </li>
                </ul>
              </div>
            </>
          )
          : (
            <>
              <ul className="modal-expense__container">
                {baseExpenses}
              </ul>
              <button className="modal-expense__add" onClick={toggleAddingExpense}>+ Add Expense</button>
            </>
          )
      }
    </div>
  )
}