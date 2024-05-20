import { useContext, useState } from 'react';
import { patchCategory } from '../../../../services/resource/patchResource.service';
import { deleteCategory } from '../../../../services/resource/deleteResource.service';
import { UserContext } from '../../../../context/UserContext';
import CategoryForm from './CategoryForm';

export default function CustomCategory({
  categoryId,
  categoryName,
  categoryColor,
  selectedId,
  handleExpenseChange,
  onCategoryEdit,
  onCategoryDelete,
}) {
  const { user, setUser } = useContext(UserContext);

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleIsEditing = () => {
    setIsEditing((prevEditing) => !prevEditing);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const patchData = { categoryId: formData.get('categoryId'), categoryName: formData.get('categoryName'), categoryColor: formData.get('categoryColor') }
    
    try {
      const response = await patchCategory(user.accessToken, patchData);

      const { updatedCategory } = response.data;

      onCategoryEdit(updatedCategory);

      setIsEditing(false);
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(user.accessToken, categoryId);

      onCategoryDelete(categoryId);

      setIsEditing(false);
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  return (
    <li
      className="category__container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-index={categoryId}
    >
      {isEditing ? (
        <CategoryForm
          initialData={{ categoryId, categoryName, categoryColor }}
          isEdit={true}
          onSubmit={handleEditSubmit}
          toggleForm={toggleIsEditing}
        />
      ) : (
        <>
          <button
            className={`category ${selectedId === categoryId ? 'active' : ''}`}
            name="categoryId"
            value={categoryId}
            onClick={handleExpenseChange}
          >
            <i className="fa-solid fa-circle" style={{ color: '#' + categoryColor }} />
            {categoryName}
          </button>
          <button className={'overlay__edit ' + (isHovered ? 'overlay-button' : 'invisible')} onClick={toggleIsEditing}>
            <i className="fa-solid fa-pencil" />
          </button>
          <button className={'overlay__delete ' + (isHovered ? 'overlay-button' : 'invisible')} onClick={handleDelete}>
            <i className="fa-solid fa-trash" />
          </button>
        </>
      )}
    </li>
  );
}
