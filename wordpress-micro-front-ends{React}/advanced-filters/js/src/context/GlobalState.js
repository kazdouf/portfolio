import React, { createContext, useContext, useReducer, useEffect } from 'react'

import appReducer from './AppReducer'

let initialState = { fields: [] }

const GlobalContext = createContext(initialState)
const UpdateContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {

  const [state, dispatch] = useReducer(appReducer, initialState)
  let groupIndex

  function addField(field) {
    dispatch({
      type: "ADD_FIELD",
      payload: field
    })
  }

  function editField(field) {
    dispatch({
      type: "EDIT_FIELD",
      payload: field
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

  function getMaxId() {
    let ids = state.fields.map(field => field.id)
    state.fields.map(field => {
      if ( field.type == "group" ) {
        field.fields.map(field => ids.push(field.id))
      } 
    })
    return state.fields.length == 0 || isNaN(Math.max.apply(Math, ids)) ? '0' : (Math.max.apply(Math, ids) + 1).toString()
  }

  function getLastOrder() {
    return (state.fields.length + 1).toString()
  }

  function toggleForm(e){

    const form = e.target.classList.contains('metaxonomy__card__head') ? e.target.parentElement.querySelector('.metaxonomy__container') : e.target.parentElement.parentElement.querySelector('.metaxonomy__container')
    const iconClass = e.target.classList.contains('metaxonomy__card__head') ? e.target.querySelector('i').classList : e.target.parentElement.querySelector('i').classList
    if(e.target.parentElement.classList.contains('metaxonomy__card__remove')){
      const params = {
        grpIndex: e.target.parentElement.parentElement.parentElement.parentElement.classList.contains('group') ? e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('span[name=index]').innerText : null,
        grpId: e.target.parentElement.parentElement.parentElement.parentElement.classList.contains('group') ? e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('span').innerText : null,
        fieldId: e.target.parentElement.querySelector('span[name=id]').innerText
      }
      removeField( params )
    } else {
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
    
  }

  function getGroupIndex() { return groupIndex }

  function setGroupIndex( index ) { groupIndex = index }

  // get the saved state
  useEffect(() => {
    const searchFilters = document.querySelector('#wdmp_search_filters')
    if( searchFilters?.value ) {
      initialState = JSON.parse( searchFilters.value )
      dispatch( { type: 'RESET', payload: initialState.searchfileds } )
    }
  }, [])

  // update hidden input
  useEffect(() => {
    document.getElementById( 'wdmp_search_filters' ).value = JSON.stringify( { searchfileds: [...state.fields] } )
  }, [state])
  
  return (
    <GlobalContext.Provider
      value={{ fields: state.fields, toggleForm }}
    >
      <UpdateContext.Provider
        value={{
          addField,
          editField,
          removeField,
          switchFields,
          getMaxId,
          getLastOrder,
          getGroupIndex,
          setGroupIndex
        }}
      >
        {children}
      </UpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
export const useUpdateContext = () => useContext(UpdateContext)
