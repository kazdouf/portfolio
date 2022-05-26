import React, { useRef } from 'react'
import { useGlobalContext, useUpdateContext } from '../context/GlobalState'
import EditGroup from './forms/edit-group'
import EditTanonomy from './forms/edit-taxonomy'
import EditMeta from './forms/edit-meta'

export const FieldsList = props => {

    const dragFieldIndex = useRef()
    const { fields, toggleForm } = useGlobalContext()
    const { switchFields, getGroupIndex } = useUpdateContext()

    const handleDragStart = () => {
      document.querySelectorAll('.metaxonomy__card__head').forEach(card => {
        if (card.classList.contains('open') && card.querySelector('.metaxonomy__card__type').textContent !== 'group') toggleForm( { target: card } )
      })
    }
    
    const handleDragEnter = index => {
      dragFieldIndex.current = index
      document.querySelectorAll(`.metaxonomy__card__head`).forEach(cardHead => { cardHead.style.backgroundColor = '#f1f1f1' })
      document.querySelector(`.metaxonomy__draggable-list__item:nth-child(${ index + 2 }) .metaxonomy__card__head`).style.backgroundColor = '#ccc'
    }

    const handleDragEnd = ( e, index ) => {

      const parentGroupCard = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
      const currentCard = document.querySelector(`.metaxonomy__draggable-list__item:nth-child(${ dragFieldIndex.current + 2 })`)
      const params = {
        fromGrpIndex: getGroupIndex(),
        fromGrp: parentGroupCard.classList.contains('metaxonomy__draggable-list__item') ? parentGroupCard.querySelector('.metaxonomy__card__remove span').textContent : null,
        toGrp: currentCard.querySelector(`.metaxonomy__card__type`).textContent === 'group' ? currentCard.querySelector(`.metaxonomy__card__remove span`).textContent : null,
        fromFieldId: parentGroupCard.classList.contains('metaxonomy__draggable-list__item') ? e.target.querySelector('.metaxonomy__card__remove span').textContent : null,
        fromFieldIndex: index,
        toFieldIndex: dragFieldIndex.current
      }

      if (params.toFieldIndex !== index) {
        if (currentCard.querySelector(`.metaxonomy__card__type`).textContent == 'group' && e.target.querySelector(`.metaxonomy__card__type`).textContent == 'group')
          alert(`Sorry! Can't nest a group inside another !!! :(`)
        else switchFields( params )
      }

      document.querySelectorAll(`.metaxonomy__card__head`).forEach(cardHead => { cardHead.style.backgroundColor = '#f1f1f1' })
    }

    return (
        
      <React.Fragment>

        {fields.length > 0 ? (
      
          fields.map((field, index) => (
              <div 
                key={field.id} 
                className="metaxonomy__draggable-list__item"
                draggable
                onDragStart={() => handleDragStart() }
                onDragEnter={() => handleDragEnter( index ) }
                onDragEnd={e => handleDragEnd( e, index ) }
              >
                { field.type === 'meta' ? (<EditMeta metaFields={ props.metaFields } id={ field.id } index={ index } />) : 
                  field.type === 'group' ? (<EditGroup metaFields={ props.metaFields } taxonomies={ props.taxonomies } id={ field.id } grpIndex={ index } />) : 
                  (<EditTanonomy taxonomies={ props.taxonomies } id={ field.id } index={ index } />) }
              </div>
          ))

        ) : (
          <p className="">No fields to show.</p>
        )}

      </React.Fragment> 
    )
  
}