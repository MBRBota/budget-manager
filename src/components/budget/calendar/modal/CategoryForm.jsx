import { useState } from 'react';

export default function CategoryForm({ initialData, isEdit, onSubmit, toggleForm }) {
  const [categoryData, setCategoryData] = useState(initialData);

  const handleCategoryDataChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="category-form" onSubmit={onSubmit}>
      <label>
        <i className="fa-solid fa-circle" style={{ color: '#' + categoryData.categoryColor }} />
        #
        <input
          type="text"
          name="categoryColor"
          className="category-form__color"
          value={categoryData.categoryColor}
          minLength="6"
          maxLength="8"
          onChange={handleCategoryDataChange}
          placeholder="Color (hex)"
          required
        />
      </label>
      <input
        type="text"
        name="categoryName"
        className="category-form__name"
        value={categoryData.categoryName}
        maxLength="20"
        onChange={handleCategoryDataChange}
        placeholder="Enter category name"
        required
      />
      {isEdit && <input type="hidden" name="categoryId" value={categoryData.categoryId} required />}
      <button className="category-form__submit" type="submit">
        <i className="fa-solid fa-floppy-disk" />
      </button>
      <button className="category-form__cancel" type="button" onClick={toggleForm}>
        <i className="fa-solid fa-ban" />
      </button>
    </form>
  );
}
