import React, { useState } from 'react'
import { Options } from './options'
import { useUpdateContext, useGlobalContext } from '../context/GlobalState'

const LeftCol = props => {

  const { 
    customFields
  } = props
  const { editField } = useUpdateContext()
  const { state } = useGlobalContext()
  let [ coverType, setCoverType ] = useState('image')

  const handleChange = e => {
    if ( e.target.name === "coverType" ) setCoverType( e.target.value )
    editField({position: e.target.name, value: e.target.value})
  }

  const handleCheckboxChange = e => {
    if ( e.target.name === "hideContent" )
      editField({position: e.target.name, value: e.target.checked})
  }

  const handleSave = e => {
    e.preventDefault()
    document.forms.productsBoxDisplaySettingsForm.submit()
  }

  return <div className="product-box-designer__left-col">

    <div className="col-wrap">	
      <div className="form-wrap">
            
        <div className="form-field form-required term-name-wrap">
          <label for="coverType">Cover Type</label>
          <select name="coverType" onChange={ e => handleChange(e) } value={ state.coverType }>
            <option value="image">Image</option>
            <option value="slide">Slide</option>
            <option value="author">Author</option>
            <option value="hide" disabled={ state.hideContent } >Hide</option>
          </select>	
        </div>

        <div className="form-field form-required term-name-wrap">
          <label for="hideContent">Hide Content</label>		
          <input id="hideContent" type="checkbox" name="hideContent" checked={ state.hideContent } onChange={ e => handleCheckboxChange(e) } disabled={ state.coverType == 'hide' ? true : false } />	
        </div>

        { state.hideContent ? '' :
          <div>

            <div className="form-field form-required term-name-wrap">
              <label for="before_title">Before Title</label>
              <Options position="beforeTitle" customFields={ customFields }/>
              
            </div>

            <div className="form-field form-required term-name-wrap">
              <label for="title">Title Field</label>
              <select name="title" onChange={ e => handleChange(e) } value={ state.title.type }>
                <option value="title">Title</option>
                <option value="short-description">Short Description</option>
                { customFields.filter(field => field.storage === 'location') ? <option value='address'>Address</option> : <></> }
                <option value="hide">Hide</option>
              </select>	
            </div>

            <div className="form-field form-required term-name-wrap">
              <label for="after_title">After Title</label>
              <Options position="afterTitle" customFields={ customFields }/>
            </div>

            <div className="form-field form-required term-name-wrap">
              <label for="title">Details</label>
              <Options position="details" customFields={ customFields }/>
            </div>

            <div classNameName="form-field form-required term-name-wrap">
              <label for="title">Bottom Left</label>
              <select name="bottom_left" onChange={ e => handleChange(e) } value={ state.bottom.left.slug }>
                <option value="price">Price</option>
                <option value="add-to-cart">Add to Cart</option>
                <option value="hide">Hide</option>
              </select>	
            </div>

            <div className="form-field form-required term-name-wrap">
              <label for="title">Bottom Right</label>
              <select name="bottom_right" onChange={ e => handleChange(e) } value={ state.bottom.right.slug }>
                <option value="price">Price</option>
                <option value="add-to-cart">Add to Cart</option>
                <option value="hide">Hide</option>
              </select>	
            </div>

          </div>
        }

        <p className="submit">
          <input type="button" className="wd-box-designer__btn-div__button" value="Save Changes" onClick={ e => handleSave(e) }/>
        </p>
      </div>	
    </div>
  </div>
}
 
export default LeftCol