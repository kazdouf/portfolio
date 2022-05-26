import React, { useState } from 'react'
import { useUpdateContext } from '../../context/GlobalState'

function AddGroup (props) {

    const { addField, getMaxId, getLastOrder } = useUpdateContext()

    let [dataState, setDataState] = useState({
        "id": getMaxId(),
        "name": "", // required
        "type": "group",
        "description": "", // optional
        "order": getLastOrder(),
        "fields": []
    })
    
    function handleInputChange(e) {
        setDataState( e.target.name === 'name' ? { ...dataState, id: getMaxId(), name: e.target.value } : { ...dataState, description: e.target.value } )
    }
    
    function addNewField(e) {
        e.preventDefault()
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
                    <div className="metaxonomy__field__label">Name</div>
                    <div className="metaxonomy__name__input">
                        <input type="text" name="name" value={dataState.name} onChange={handleInputChange.bind(this)} required />
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


export default AddGroup
