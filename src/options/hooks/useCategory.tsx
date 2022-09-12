import { useState } from "react"
import { Category, getStoredCategories, setStoredCategories } from "../../utils/storage"

const useAddCategory = (category: Category) => {
  const [stateCategories, setStateCategories] = useState<Category[]>()
  setStoredCategories([category]).then(() => {
      setStateCategories(p => [
        ...p,
        category
      ])
    })
  return stateCategories
}

const useDeleteCategory = (categoryTitle: string) => {
  const [stateCategories, setStateCategories] = useState<Category[]>()
  getStoredCategories().then((categories) => {
    const newCategories = categories.filter(category => category.title !== categoryTitle)
    setStoredCategories(newCategories).then(() => {
        setStateCategories(newCategories)
      })
  })

  return stateCategories
}


//not done yet
const useEditCategory = (categoryTitle: string, newCategory: Category) => {
  const [stateCategories, setStateCategories] = useState<Category[]>()
  getStoredCategories().then((categories) => {
    const categoryIndex = categories.findIndex((category => category.title === categoryTitle))
    categories[categoryIndex] = newCategory
    setStoredCategories(categories).then(() => {
        setStateCategories(categories)
      })
  })

  return stateCategories
}

export { useAddCategory, useDeleteCategory, useEditCategory }