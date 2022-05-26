import React, { useState, useEffect } from 'react'
import { useUpdateContext } from '../context/GlobalState'

const FieldCard = props => {
  
  const { 
    fieldCard,
    position,
    customFields,
    index
  } = props
  const {
		removeField,
    toggleForm
	} = useUpdateContext()

  // let [ cardField, setCardField ] = useState( fieldCard )

  // useEffect(() => {
	// 	setCardField( { fieldCard } )
	// }, [cardField])

  const handleSelectChange = e => {
    const value = JSON.parse( e.target.value)
    setCardField( {
      ...fieldCard,
      id: value.id,
      type: value.type
    } )
  }

  return <>

    <div className="metaxonomy__card__head" /* onClick={ toggleForm } */>
      <i className="dashicons dashicons-arrow-right-alt2"></i>
      <div className="metaxonomy__card__type">
        { fieldCard.type }
      </div>
      <div className="metaxonomy__card__name">
        { customFields.filter(field => field.id == fieldCard.slug )[0]?.name  }
      </div>
      <span className="metaxonomy__card__remove" onClick={ e => removeField( { position: position, id: index } ) }><i class="dashicons dashicons-trash"></i></span>
    </div>
        
    <div className="metaxonomy__container">
      
      <div className="metaxonomy__fields">

        <div className="metaxonomy__field">
          <div className="metaxonomy__field__label">Field</div>
          <div className="metaxonomy__taxonomy__input">
            <select
              name="customFormat"
              className="wd-box-designer__add-form__custom-fields"
              value={ JSON.stringify( { id: fieldCard.slug, type: fieldCard.type } )}
              onChange={ e => handleSelectChange( e ) }
              >
                { customFields.map( customField => <option value={ JSON.stringify({ id: customField.id, type: customField.type }) }>{ customField?.name }</option> ) }
            </select>
          </div>
        </div>

        <div className="metaxonomy__field">
          <label className="metaxonomy__field__label" style={ {display: 'block' } }>
            <input type="checkbox" className="wd-box-designer__add-form__custom-format__check-box" /* onClick={ e => handleCustomFormatCheck(e) } */ /> Custom Format
          </label>
          <div className="metaxonomy__name__input">
            <div id="customFormatText" className="wd-box-designer__add-form__custom-format__text" hidden>
              <input type="text" /* value={ customFormatField.displayText } */ /* onChange={ e => handleInputChange( e ) } */ />
              <div className="wd-box-designer__add-form__custom-format__text__hint">{ 'hint: something {field} something else.' }</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </>
}

export default FieldCard