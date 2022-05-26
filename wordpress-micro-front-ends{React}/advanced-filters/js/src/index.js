import React, { useState } from 'react'
import { GlobalProvider } from './context/GlobalState'

import { FieldsList } from './components/fieldsList'
import AddGroup from './components/forms/add-group'
import AddTaxonomy from './components/forms/add-taxonomy'
import AddMetaData from './components/forms/add-metadata'
import AddProductTitle from './components/forms/add-product-title'

import './css/app.css'
import './css/card.css'
import './css/draggable-list.css'

document.addEventListener("DOMContentLoaded", function() {
    function App () {
    
        const taxonomies = document.getElementById('taxonomies') ? JSON.parse(document.getElementById('taxonomies').value) : []
        const metaFields = document.getElementById('metaFields') ? JSON.parse(document.getElementById('metaFields').value) : []
        
        let [fieldType, setFieldType] = useState('taxonomy')
        
        function handleOnClick(e){
            if (e.target.value == 'Cancel') setFieldType('taxonomy')
            showHideAdd()
        }
        
        return <>
            <GlobalProvider>

                <div className="metaxonomy__draggable-list">
                    <h3 className="MT_header">Search Filters List</h3>
                    <FieldsList taxonomies={ taxonomies } metaFields={ metaFields }/>
                </div>

                <div class="add-new-metaxonomy-placeholder metaxonomy__container">
                    { fieldType == 'taxonomy' ? <AddTaxonomy taxonomies={ taxonomies } onSubmit={ showHideAdd } /> : 
                      fieldType == 'meta' ? <AddMetaData metaFields={metaFields} onSubmit={ showHideAdd } />  : 
                      fieldType == 'product_title' ? <AddProductTitle onSubmit={ showHideAdd } /> :
                      <AddGroup onSubmit={ showHideAdd } /> }
                </div>

                <select id="metaxonomyFieldType" className="metaxonomy__select-field" value={ fieldType } onChange={ e =>  setFieldType( e.target?.value ) }>
                    <option value="taxonomy">Taxonomy</option>
                    <option value="meta">MetaData</option>
                    <option value="product_title">Product Title</option>
                    <option value="group">Group</option>
                </select>

                <div className="metaxonomy__addnew-button">
                    <input type="button" value="Add New" id="metaxonomyAddNew" onClick={ handleOnClick } />
                </div>

                <input name="fieldsList" id="fieldsListInput" type="text" hidden value="nothing"/>

            </GlobalProvider>
        </>
    }

    if(document.getElementById('wdmp_search_filters_root')) ReactDOM.render(<App />, document.getElementById('wdmp_search_filters_root'))
    
    const metaxonomySelect = document.querySelector('.metaxonomy__select-field')
    const addplaceholder = document.querySelector('.add-new-metaxonomy-placeholder')
    const metaxonomyAddNew = document.querySelector('#metaxonomyAddNew')

    if(addplaceholder) addplaceholder.style.display = 'none'
    if(metaxonomySelect) metaxonomySelect.style.display = 'block'

    function showHideAdd() {
        
        addplaceholder.style.display = addplaceholder.style.display == 'none' ? 'block' : 'none'
        metaxonomySelect.style.display = metaxonomySelect.style.display == 'none' ? 'block' : 'none'
        metaxonomyAddNew.value = metaxonomyAddNew.value == 'Add New' ? 'Cancel' : 'Add New'

        // empty form fields
        document.querySelectorAll('.new-field-container').forEach(element => {

            element.querySelectorAll('input[type=text]').forEach( element => { element.value = '' } )
            element.querySelectorAll('select').forEach( element => { element.selectedIndex = 0 } )
            
            // element.querySelectorAll('input[type=checkbox]').forEach(element => { element.checked = false })
            // if( element.querySelector('textarea') ) element.querySelector('textarea').value = ''
        })

    }
})
