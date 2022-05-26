import React, { useState, useEffect } from 'react'
import { useGlobalContext, useUpdateContext } from '../../context/GlobalState'

function EditTanonomy ( { id, index, groupId, taxonomies} ) {

    const { fields, toggleForm } = useGlobalContext()
    const { editField } = useUpdateContext()
    
    let field = groupId ? fields.filter(group => group.id === groupId)[0].fields.filter(field => field.id === id)[0] : fields.filter(field => field.id === id)[0]
    let [dataState, setDataState] = useState(field)

    useEffect(() => {
        editField(dataState)
    }, [dataState])

    function handleInputChange(e) {
        if ( e.target.name === 'name' ) {
            const cardHead = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.metaxonomy__card__head')
            cardHead.style.backgroundColor = e.target.value == '' ? '#b32d2e' : '#f1f1f1'
        }
        setDataState( e.target.name === 'name' ? {...dataState, name: e.target.value} : {...dataState, description: e.target.value})
    }
   
    function handleChange(e) {
        setDataState( e.target.name === 'taxonomy' ? {...dataState, taxonomy: e.target.value} : {...dataState, displayType: e.target.value})
    }

    return <>

        <div className="metaxonomy__card__head" onClick={toggleForm}>
            <i className="dashicons dashicons-arrow-right-alt2"></i>
            <div className="metaxonomy__card__type">
                {dataState.type}
            </div>
            <div className="metaxonomy__card__name">
                {dataState.name}
            </div>
            <div className="metaxonomy__card__remove">
                <span name="id" hidden>{ dataState.id }</span>
                <span name="index" hidden>{ index }</span>
                <i className="dashicons dashicons-trash"></i>
            </div>
        </div>
        
        <div className="metaxonomy__container">

            <div className="metaxonomy__fields">
                
                <div className="metaxonomy__field">
                    <div className="metaxonomy__field__label">Taxonomy</div>
                    <div className="metaxonomy__taxonomy__input">
                        <select name="taxonomy" value={dataState.taxonomy} onChange={handleChange}>
                            { taxonomies.map(taxonomy => <option value={ taxonomy.value }>{ taxonomy.name } ({ taxonomy.value })</option>) }
                        </select>
                    </div>
                </div>

                <div className="metaxonomy__field">
                    <div className="metaxonomy__field__label">Name</div>
                    <div className="metaxonomy__name__input">
                        <input type="text" name="name" value={dataState.name} onChange={handleInputChange.bind(this)} placeholder="Name required" required />
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
            
        </div>

        

    </>
}

export default EditTanonomy