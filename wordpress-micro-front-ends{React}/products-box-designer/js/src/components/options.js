import React, { useState, useEffect, useRef } from 'react'
import { useGlobalContext, useUpdateContext } from '../context/GlobalState'
import FieldCard from './field-card'

export const Options = props => {

	const {
		customFields,
		position
	} = props
	const {
		addField,
		editField,
		switchFields
	} = useUpdateContext()
	const { state } = useGlobalContext()
	const dragFieldIndex = useRef()
	
	let [ cardFields, setcardFields ] = useState( position == 'beforeTitle' ? state.beforeTitle : position == 'afterTitle' ? state.afterTitle : state.details )
	let [ customFormatField, setCustomFormatField ] = useState( { 
		id: customFields[0].id,
		name: customFields[0].name,
		type: customFields[0].type,
		displayText: '{field}'
	} )

	useEffect( () => {
		setcardFields(  position == 'beforeTitle' ? state.beforeTitle : position == 'afterTitle' ? state.afterTitle : state.details  )
	}, [state])

	useEffect(() => {
		editField( { position, cardFields } )
	}, [cardFields])
	
  const handleDragStart = () => {
		
	}
  
  const handleDragEnter = index => {
		dragFieldIndex.current = index
	}
	
  const handleDragEnd = ( e, index ) => {
		const params = {
			position: position,
			fromFieldIndex: index,
			toFieldIndex: dragFieldIndex.current
		}
		switchFields( params )
	}
	
	const handleSelectChange = e => {
		
		if ( e.target.name === 'customFormat' ) {
			const value = JSON.parse(e.target.value)
			const field = {
				id: value.id,
				name: e.target[e.target.selectedIndex].textContent,
				type: value.type,
				displayText: '{field}'
			}
			if ( value.type === 'map' ) {
				field.canvasHeight = ''
				field.zoomLevel = ''
			}
			setCustomFormatField( field )
		}
	}

	const handleInputChange = e => {
		if ( customFormatField.type === 'map' ) {
			setCustomFormatField(  e.target.name == 'canvasHeight' ? { ...customFormatField, canvasHeight:  e.target.value.replace(/[^0-9]/g, '') } : { ...customFormatField, zoomLevel:  e.target.value.replace(/[^0-9]/g, '') } )
		} else
			setCustomFormatField( { ...customFormatField, displayText: e.target.value} )
	}

	const handleCustomFormatCheck = e => {
		e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText').style.display = e.target.checked ? 'block' : 'none'
	}

	const addNewField = e => {
		const checked = e.target.closest('.wd-box-designer__add-form').querySelector('input[type=checkbox]').checked
		const newField = {
			type: customFormatField.type,
			slug: customFormatField.id,
			displayText: '{field}'
		}
		
		if ( customFormatField.type === 'map' ) {
			newField.canvasHeight = e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText input[name=canvasHeight]').value
			newField.zoomLevel = e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText input[name=zoomLevel]').value
		} else
			newField.displayText = checked ? e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText input[name=displayText]').value : '{field}'

		addField( { 
			position: position,
			field: newField
		} )

		// cleanin form
		if ( e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText input[name=displayText]') )
			e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText input[name=displayText]').value = ''

		e.target.closest('.wd-box-designer__add-form').querySelector('input[type=checkbox]').checked = false
		e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText').style.display = 'none'
		e.target.closest('.wd-box-designer__add-form').style.display = 'none'
		e.target.closest('.wd-box-designer__add-form').nextSibling.textContent = 'Add New'
	}

	const showHideAdd = e => {
		e.target.previousSibling.style.display = e.target.previousSibling.style.display == 'block' ? 'none' : 'block'
		e.target.textContent = e.target.textContent == 'Add New' ? 'Cancel' : 'Add New'
	}
	
  return (
		
    <>
		
      { cardFields.length > 0 ? (
				cardFields.map((fieldCard, index) => (
					<div
						key={ index }
						className="metaxonomy__draggable-list__item"
						draggable
						onDragStart={() => handleDragStart() }
						onDragEnter={() => handleDragEnter( index ) }
						onDragEnd={e => handleDragEnd( e, index ) }
					>
						<FieldCard
							index={ index }
							fieldCard={ fieldCard }
							position={ position }
							customFields={ customFields }
							setCustomFields={ setCustomFormatField }
						/>
					</div>
				))
			) : (
				<p className="">No options to show yet 'please add a new one :)</p>
			) }
			<div id="wdboxDesignerAddform" className="wd-box-designer__add-form">
				<select
					name="customFormat"
					className="wd-box-designer__add-form__custom-fields"
					onChange={ e => handleSelectChange( e ) }
					>
						{ customFields.map( customField => <option value={ JSON.stringify({ id: customField.id, type: customField.type }) }>{ customField.name }</option> ) }
				</select>
				<label className="wd-box-designer__add-form__custom-format__label">
					<input type="checkbox" className="wd-box-designer__add-form__custom-format__check-box" onClick={ e => handleCustomFormatCheck(e) } /> Custom Format
				</label>
				<div id="customFormatText" className="wd-box-designer__add-form__custom-format__text" hidden >
					<input type="text" name="displayText" value={ customFormatField.displayText } onChange={ e => handleInputChange( e ) } />
					<div className="wd-box-designer__add-form__custom-format__text__hint">{ 'hint: something {field} something else.' }</div>
				</div>
				<div className="wd-box-designer__btn-div">
					<button id="wdboxDesignerSave" className="wd-box-designer__btn-div__button" onClick={ e => addNewField( e ) }>Save</button>
				</div>
			</div>
			<button id="wdboxDesignerAddnew" className="wd-box-designer__btn-div__button" onClick={ showHideAdd }>Add New</button>
    </>
  )
  
}