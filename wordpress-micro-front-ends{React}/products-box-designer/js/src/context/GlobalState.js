import React, { createContext, useContext, useReducer, useEffect } from 'react'

import appReducer from './AppReducer'
import initialState from '../assets/initialState'

const GlobalContext = createContext(initialState)
const UpdateContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {

  const [state, dispatch] = useReducer(appReducer, initialState)
  
  function addField(params) {
    dispatch({
      type: "ADD_FIELD",
      payload: params
    })
  }

  function editField(params) {
    dispatch({
      type: "EDIT_FIELD",
      payload: params
    })
  }

  function removeField(params) {
    dispatch({
      type: "REMOVE_FIELD",
      payload: params
    })
  }

  function switchFields(params) {
    dispatch({
      type: "SWITCH_FIELDS",
      payload: params
    })
  }

  function toggleForm(e){
    const form = e.target.classList.contains('metaxonomy__card__head') ? e.target.parentElement.querySelector('.metaxonomy__container') : e.target.parentElement.parentElement.querySelector('.metaxonomy__container')
    const iconClass = e.target.classList.contains('metaxonomy__card__head') ? e.target.querySelector('i').classList : e.target.parentElement.querySelector('i').classList
    
    if (iconClass.contains('dashicons-arrow-down-alt2')) {
      form.style.display = 'none'
      iconClass.add('dashicons-arrow-right-alt2')
      iconClass.remove('dashicons-arrow-down-alt2')
    } else {
      form.style.display = 'block'
      iconClass.add('dashicons-arrow-down-alt2')
      iconClass.remove('dashicons-arrow-right-alt2')
    }
    form.parentElement.classList.toggle('open') // padding
    form.parentElement.querySelector('.metaxonomy__card__head').classList.toggle('open')
    form.parentElement.querySelector('.metaxonomy__card__type').classList.toggle('open')
    form.parentElement.querySelector('.metaxonomy__card__name').classList.toggle('open')
    
  }

  useEffect(() => {
    const displaySettings = document.querySelector('#wdmp_product_box_display_settings')
    if( displaySettings?.value ) {
      initialState = JSON.parse( displaySettings.value )
      dispatch( {type: 'RESET', payload: initialState} )
    }
  }, [])
  
  // update hidden input
  useEffect(() => {
    document.querySelector('#wdmp_product_box_display_settings').value = JSON.stringify( state )
    // console.log( JSON.parse(document.querySelector('#wdmp_product_box_display_settings').value) )
  }, [state])
  
  return (
    <GlobalContext.Provider
      value={ { state: state } }
    >
      <UpdateContext.Provider
        value={{
          addField,
          editField,
          removeField,
          switchFields,
          toggleForm
        }}
      >
        {children}
      </UpdateContext.Provider>
    </GlobalContext.Provider>
  )

}

export const useGlobalContext = () => useContext(GlobalContext)
export const useUpdateContext = () => useContext(UpdateContext)
