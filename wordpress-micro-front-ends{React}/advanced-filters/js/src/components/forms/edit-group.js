import React, { useState, useEffect, useRef } from 'react'
import { useGlobalContext, useUpdateContext } from '../../context/GlobalState'

import EditTanonomy from './edit-taxonomy'
import EditMeta from './edit-meta'

function EditGroup ( { id, grpIndex, metaFields, taxonomies } ) {

    const { fields, toggleForm } = useGlobalContext()
    const { editField, switchFields, setGroupIndex } = useUpdateContext()
    const dragField = useRef()

    let [dataState, setDataState] = useState(fields.filter(group => group.id == id)[0])
    let groupFields = fields.filter(group => group.id == id)[0].fields
    
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

    const handleDragEnter = index => {
        dragField.current = index
    }

    const handleDragEnd = (grpId, index) => {

        const params = {
            fromGrp: grpId,
            toGrp: grpId,
            fromFieldId: null,
            fromFieldIndex: index,
            toFieldIndex: dragField.current,
            grpIndex: grpIndex
        }
        setGroupIndex(grpIndex)
        if (dragField.current !== index) switchFields( params )
    }

    return <>

        <div className="metaxonomy__card__head" onClick={ toggleForm }>
            <i className="dashicons dashicons-arrow-right-alt2"></i>
            <div className="metaxonomy__card__type">
                {dataState.type}
            </div>
            <div className="metaxonomy__card__name">
                {dataState.name}
            </div>
            <div className="metaxonomy__card__remove">
                <span name="id" hidden>{ dataState.id }</span>
                <span name="index" hidden>{ grpIndex }</span>
                <i className="dashicons dashicons-trash"></i>
            </div>
        </div>
        
        <div className="metaxonomy__container">

            <div className="metaxonomy__fields">

                <div className="metaxonomy__field">
                    <div className="metaxonomy__field__label">Name</div>
                    <div className="metaxonomy__name__input">
                        <input type="text" name="name" value={dataState.name} onChange={handleInputChange.bind(this)} placeholder="Name required" required />
                    </div>
                </div>

                <div className="metaxonomy__field">
                    <div className="metaxonomy__field__label">Description</div>
                    <div className="metaxonomy__description__input">
                        <input type="text" name="description" value={dataState.description} onChange={handleInputChange.bind(this)} />
                    </div>
                </div>
                
                <div className="metaxonomy__field group">
                    <div className="metaxonomy__field__label">Fields</div>
                    <div className="metaxonomy__field__list group">
                        { groupFields.length > 0 ? (
                            groupFields.map(( field, index ) => (
                                <div 
                                    key={field.id} 
                                    className="metaxonomy__draggable-list__item"
                                    draggable
                                    onDragEnter={ () => { handleDragEnter( index ) } }
                                    onDragEnd={ () => handleDragEnd( dataState.id, index ) }
                                >
                                    { field.type === 'meta' ? (<EditMeta metaFields={ metaFields } groupId={ id } id={ field.id } index={ index }/>) : 
                                    (<EditTanonomy taxonomies={ taxonomies } groupId={ id } id={ field.id } index={ index }/>) }
                                </div>
                            ))
                        ) : (
                            <p className="">No fields to show.</p>
                        )}
                    </div>
                </div>

            </div>

        </div>

    </>
}

export default EditGroup