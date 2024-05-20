import { useContext, useState } from "react"
import { patchCategory } from "../../../../services/resource/patchResource.service"
import { deleteCategory } from "../../../../services/resource/deleteResource.service"
import { UserContext } from "../../../../context/UserContext"


export default function CustomCategory({ categoryId, categoryName, categoryColor, selectedId, handleExpenseChange, onCategoryEdit, onCategoryDelete }) {
  const { user, setUser } = useContext(UserContext)

  const [isHovered, setIsHovered] = useState(false)
  const [editData, setEditData] = useState({ categoryId, categoryName, categoryColor })
  const [isEditing, setIsEditing] = useState(false)

  const handleCategoryDataChange = (e) => {
    const { name, value } = e.target
    setEditData(prevData => ({ ...prevData, [name]: value }))
  }

  const toggleIsEditing = () => {
    setIsEditing(prevEditing => !prevEditing)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await patchCategory(user.accessToken, editData)

      const { updatedCategory } = response.data

      onCategoryEdit(updatedCategory)

      setIsEditing(false)
    } catch (err) {
      console.log(err)
      setUser(null)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteCategory(user.accessToken, categoryId)

      onCategoryDelete(categoryId)

      setIsEditing(false)
    } catch (err) {
      console.log(err)
      setUser(null)
    }
  }

  return (
    <li
      className="category__container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-index={categoryId}
    >
      {
        isEditing
          ? (
            <form className="category-form" onSubmit={handleEditSubmit}>
              <label>
                <i className="fa-solid fa-circle" style={{ color: '#' + editData.categoryColor }} />
                #
                <input
                  type="text"
                  name="categoryColor"
                  className="category-form__color"
                  value={editData.categoryColor}
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
                value={editData.categoryName}
                maxLength="20"
                onChange={handleCategoryDataChange}
                placeholder="Enter category name"
                required
              />
              <input
                type="hidden"
                name="categoryId"
                value={editData.categoryId}
                required
              />
              <button className="category-form__submit" type="submit"><i className="fa-solid fa-floppy-disk" /></button>
              <button className="category-form__cancel" type="button" onClick={toggleIsEditing}><i className="fa-solid fa-ban" /></button>
            </form>
          )
          : (
            <>
              <button
                className={`category ${selectedId === categoryId ? 'active' : ''}`}
                name="categoryId"
                value={categoryId}
                onClick={handleExpenseChange}
              >
                <i className="fa-solid fa-circle" style={{ color: '#' + categoryColor }} />{categoryName}
              </button>
              <button
                className={"overlay__edit " + (isHovered ? "overlay-button" : "invisible")}
                onClick={toggleIsEditing}
              >
                <i className="fa-solid fa-pencil" />
              </button>
              <button
                className={"overlay__delete " + (isHovered ? "overlay-button" : "invisible")}
                onClick={handleDelete}
              >
                <i className="fa-solid fa-trash" />
              </button>

            </>
          )
      }
    </li>
  )
}