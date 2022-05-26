import React, { useState } from 'react'
import { useUpdateContext } from '../../context/GlobalState'

function AddTaxonomy (props) {

    const { addField, getMaxId, getLastOrder } = useUpdateContext()

    let [dataState, setDataState] = useState({
        "id": getMaxId(),
        "taxonomy": "", // select option
        "name": "", // required
        "type": "taxonomy",
        "key": "", // dont need it
        "keyType": "", // needs a way of entry
        "description": "", // optional
        "order": getLastOrder(),
        "displayType": "", // select option
        "defaultValue": "", // needs a way of entry
        "selectOptions": {
        } // improted later in php code
    })
    
    function handleInputChange(e) {
        setDataState( e.target.name === 'name' ? {...dataState, id: getMaxId(), name: e.target.value} : {...dataState, description: e.target.value})
    }
   
    function handleChange(e) {
        setDataState( e.target.name === 'taxonomy' ? {...dataState, taxonomy: e.target.value} : {...dataState, displayType: e.target.value})
    }

    function addNewField(e) {
        e.preventDefault()
        dataState.taxonomy = dataState.taxonomy === "" ? document.querySelector('.new-field-container select[name=taxonomy] option')?.value : dataState.taxonomy
        dataState.displayType = dataState.displayType === "" ? document.querySelector('.new-field-container select[name=dtype] option')?.value : dataState.displayType
        addField(dataState)
        props.onSubmit()
    }

    return <>

        <div className="metaxonomy__card__head">
            <i className="dashicons dashicons-arrow-right-alt2"></i>
            <div className="metaxonomy__card__type">
                {dataState.type}
            </div>
            <div className="metaxonomy__card__name">
                {dataState.name}
            </div>
        </div>
        
        <form action="#" onSubmit={ addNewField } className="metaxonomy__container new-field-container">

            <div className="metaxonomy__fields">

                <div className="metaxonomy__field">
                    <div className="metaxonomy__field__label">Taxonomy</div>
                    <div className="metaxonomy__taxonomy__input">
                        <select name="taxonomy" value={dataState.taxonomy} onChange={handleChange}>
                            { props.taxonomies.map(taxonomy => <option value={ taxonomy.value }>{ taxonomy.name } ({ taxonomy.value })</option>) }
                        </select>
                    </div>
                </div>

                <div className="metaxonomy__field">
                    <div className="metaxonomy__field__label">Name</div>
                    <div className="metaxonomy__name__input">
                        <input type="text" name="name" value={dataState.name} onChange={handleInputChange.bind(this)} required />
                    </div>
                </div>

                <div className="metaxonomy__field">
                    <div className="metaxonomy__field__label">Display Type</div>
                    <div className="metaxonomy__dtype__input">
                        <select name="dtype" value={dataState.displayType} onChange={handleChange}>
                            <option value="text">Text</option>
                            <option value="select">Select</option>
                            <option value="select2">Select 2</option>
                        </select>
                    </div>
                </div>

                <div className="metaxonomy__field">
                    <div className="metaxonomy__field__label">Description</div>
                    <div className="metaxonomy__description__input">
                        <input type="text" name="description" value={dataState.description} onChange={handleInputChange.bind(this)} />
                    </div>
                </div>

            </div>

            <div className="metaxonomy__savechanges-button">
                <input type="submit" value="Add" />
            </div>

        </form>
        
    </>
}


export default AddTaxonomy
