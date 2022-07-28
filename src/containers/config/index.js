import React, { useEffect, useState, useContext } from 'react'
import Box from '@material-ui/core/Box'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga';
import * as categoryActions from '../../actions/categoryAction'
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState'
import AddEditCategory from '../../components/Config/Categories/AddEditCategory'
import CategoryList from '../../components/Config/Categories/CategoryList'

export default function Config() {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const dispatch = useDispatch();
  const { setAlert } = useContext(AlertNotificationContext);
  const categoryList = useSelector((state) => state.category.categoryList)
  const subCategoryList = useSelector((state) => state.category.subCategoryList)

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryLoader, setCategoryLoader] = useState(true)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [subCategoryLoader, setSubCategoryLoader] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [title, setTitle] = useState('')
  const [isCategory, setIsCategory] = useState(null)
  const [isAdd, setIsAdd] = useState(true)
  const [selectedItem, setSelectedItem] = useState({})

  function handleScroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    // API Call for Categories here
    dispatch(categoryActions.getCategories(loadFirstItem))
  }, [])

  const loadFirstItem = () => {
    setCategoryLoader(false)
  }

  useEffect(() => {
    if (!selectedCategory) {
      setSubCategoryLoader(true)
      setTimeout(() => {
        setSelectedCategory(categoryList[0])
      }, 500)
    }
    if (categoryList.length === 0) {
      setSubCategoryLoader(false)
    }
  }, [categoryList])

  useEffect(() => {
    // API Call for SubCategories onChange
    if (selectedCategory) {
      dispatch(
        categoryActions.getSubCategories(selectedCategory?._id, () =>
          setSubCategoryLoader(false)
        )
      )
    }
  }, [selectedCategory])

  const handleChangeCategory = (item) => {
    setSubCategoryLoader(true)
    setSelectedCategory(item)
  }

  const handleChangeSubCategory = (item) => {
    setSelectedSubCategory(item)
  }

  const handleOnAddCategory = () => {
    setIsAdd(true)
    setOpenModal(true)
    setSelectedItem({})
    setTitle('Add Category')
  }

  const handleOnAddSubCategory = () => {
    setIsAdd(true)
    setIsCategory(selectedCategory)
    setOpenModal(true)
    setSelectedItem({})
    setTitle('Add Subcategory')
  }

  const handleClose = () => {
    setOpenModal(false)
    setIsCategory(null)
  }

  const addCategory = (data) => {
    let bodyData = {
      title: data.title,
      image: data.image,
    }
    dispatch(categoryActions.addCategory(bodyData, handleClose, setAlert))
    handleScroll();
  }

  const refresh = () => {
    dispatch(categoryActions.getCategories(loadFirstItem))
  }

  const addSubCategory = (data) => {
    let bodyData = {
      title: data.title,
      image: data.image,
      category: isCategory?._id,
    }

    dispatch(categoryActions.addSubCategory(bodyData, handleClose, refresh, setAlert))
    handleScroll();
  }

  const handleEditCategory = (item) => {
    // console.log('item', item);
    setSelectedItem(item)
    setOpenModal(true)
    setIsAdd(false)
    setTitle('Edit Category')
    // setIsCategory(null)
  }
  const handleEditSubCategory = (item) => {
    setSelectedItem(item)
    setOpenModal(true)
    setIsCategory(selectedCategory)
    setIsAdd(false)
    setTitle('Edit Subcategory')
    // setIsCategory(null)
  }

  const editCategory = (data) => {
    handleEditClose()
    let bodyData = {
      title: data.title,
      image: data.image,
    }
    dispatch(
      categoryActions.editCategory(selectedItem._id, bodyData, handleEditClose, setAlert)
    )
    handleScroll()
  }

  const handleEditClose = () => {
    setOpenModal(false)
    setIsCategory(null)
    dispatch(categoryActions.getCategories(() => setCategoryLoader(false)))
  }
  const handleEditSubClose = () => {
    setOpenModal(false)
    // setIsCategory(null);
    dispatch(
      categoryActions.getSubCategories(selectedCategory?._id, () =>
        setSubCategoryLoader(false)
      )
    )
  }
  const editSubCategory = (data) => {
    handleEditClose()
    let bodyData = {
      title: data.title,
      image: data.image,
      category: data.category,
    }
    dispatch(
      categoryActions.editSubCategory(
        selectedItem._id,
        bodyData,
        handleEditSubClose,
        setAlert
      )
    )
    handleScroll()
  }

  return (
    <Box display='flex' style={{ backgroundColor: '#FFFF' }}>
      <Box
        style={{
          width: '90%',
          boxShadow: '12px 0px 5px -8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CategoryList
          isAdd={true}
          onAdd={handleOnAddCategory}
          loader={categoryLoader}
          isCategory={true}
          selected={selectedCategory}
          data={categoryList}
          title='Categories'
          onEdit={handleEditCategory}
          onChange={handleChangeCategory}
        />
      </Box>
      <Box style={{ width: '100%', paddingLeft: '10' }}>
        <CategoryList
          onEdit={handleEditSubCategory}
          isAdd={selectedCategory}
          onAdd={handleOnAddSubCategory}
          loader={subCategoryLoader}
          data={selectedCategory ? subCategoryList : []}
          title='Subcategories'
          isCategory={false}
          selected={selectedSubCategory}
          onChange={handleChangeSubCategory}
        />
      </Box>
      {openModal ? (
        <AddEditCategory
          selected={selectedItem}
          isAdd={isAdd}
          title={title}
          isCategory={isCategory}
          open={openModal}
          onAdd={addCategory}
          onEditCategory={editCategory}
          onEditSubCategory={editSubCategory}
          onClose={handleClose}
          onAddSubCategory={addSubCategory}
        />
      ) : null}
    </Box>
  )
}
