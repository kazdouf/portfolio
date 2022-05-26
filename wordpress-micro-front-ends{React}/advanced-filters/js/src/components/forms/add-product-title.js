import { React, useState } from 'react'
import { useUpdateContext } from '../../context/GlobalState'

function AddProductTitle (props) {

    const { addField, getMaxId, getLastOrder } = useUpdateContext()

    let [dataState, setDataState] = useState({
        "id": getMaxId(),
        "name": "", // required
        "type": "product_title",
        "description": "", // optional
        "key": "", // required
        "keyType": "", // sneeds a way of entry
        "order": getLastOrder(),
        "displayType": "" // select option
    })
    
    function handleInputChange(e) {
        setDataState(
            (e.target.name === 'name') ? {...dataState, id: getMaxId(), name: e.target.value} : 
            (e.target.name === 'description') ? {...dataState, description: e.target.value} :
            {...dataState, key: e.target.value.replace(/[^a-z]/g, '')}
        )
    }
    
   
    function handleChange(e) {
        setDataState( {...dataState, displayType: e.target.value} )
    }

    function addNewField(e) {
        e.preventDefault()
        dataState.keyType = dataState.keyType === "" ? document.querySelector('.new-field-container select[name=ktype] option')?.value : dataState.keyType
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
                    <div className="metaxonomy__field__label">Key</div>
                    <div className="metaxonomy__key__input">
                        <input type="text" name="key" value={dataState.key} onChange={handleInputChange.bind(this)} required />
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

export default AddProductTitle