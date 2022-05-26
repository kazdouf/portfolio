export default function appReducer(state, action) {

    let fields = JSON.parse(JSON.stringify(state.fields))

    switch (action.type) {
      case "ADD_FIELD":
        return {
          ...state,
          fields: [...state.fields, action.payload]
        }
  
      case "EDIT_FIELD":
        const updatedField = action.payload
  
        const updatedFields = state.fields.map((field) => {
          if ( field.type === 'group' ) {
            field.fields = field.fields.map(groupField => {
              if (groupField.id === updatedField.id) {
                return updatedField
              }
              return groupField
            })
          }
          if ( field.id === updatedField.id ) {
            return updatedField
          }
          return field
        })
  
        return {
          ...state,
          fields: updatedFields
        }
  
      case "REMOVE_FIELD":

        const grpIndex = action.payload.grpIndex
        const fieldId = action.payload.fieldId
        const group = fields.filter(group => group.id == action.payload.grpId)[0]
        
        fields = fields.filter(group => group.id != action.payload.grpId)
        return action.payload.grpId ? {
          ...state,
          fields: [
            ...fields.slice(0, grpIndex), 
            { ...group, fields: group.fields.filter(field => field.id != fieldId)},
            ...fields.slice(grpIndex, fields.length)
          ]
        } : {
          ...state,
          fields: state.fields.filter(
            field => field.id !== action.payload.fieldId
          )
        }
  
      case "SWITCH_FIELDS":
        
        let newState

        const fromGrp = action.payload.fromGrp
        const fromGrpIndex = action.payload.fromGrpIndex
        const toGrp = action.payload.toGrp
        const fromFieldIndex = action.payload.fromFieldIndex
        const fromFieldId = action.payload.fromFieldId
        const toFieldIndex = action.payload.toFieldIndex
        const dragedField = fields[fromFieldIndex]

        if ( fromGrp ) {
          const fromGroup = fields.filter(group => group.id == fromGrp)[0]
          if ( toGrp ) {
            const toGroup = fields.filter(group => group.id == toGrp)[0]
            if ( fromGrp == toGrp ) {
              // switch inside same group
              const grpIndex = action.payload.grpIndex
              console.log(`switch inside same group ${toGrp} with index ${grpIndex} from ${fromFieldIndex} to ${toFieldIndex}`)

              const dragedGroupField = toGroup.fields[fromFieldIndex]

              toGroup.fields.splice(fromFieldIndex, 1)

              fields = fields.filter(group => group.id != toGrp)
              toGroup.fields = toGroup.fields.filter(field => field.id != dragedField.id)

              const GroupFields = [
                ...toGroup.fields.slice(0, toFieldIndex), 
                { ...dragedGroupField, order: ( toFieldIndex + 1 ).toString()},
                ...toGroup.fields.slice(toFieldIndex, toGroup.fields.length)
              ]
  
              const switched = [
                ...fields.slice(0, grpIndex), 
                { ...toGroup, fields: GroupFields, order: ( grpIndex + 1 ).toString()},
                ...fields.slice(grpIndex, fields.length)
              ]

              newState = {
                ...state,
                fields: switched
              }
            } else {
              // from group to another group
              console.log(`${fromFieldId} from group ${fromGrp} to group ${toGrp}`)

              const dragedGroupField = fromGroup.fields.filter(field => field.id == fromFieldId)[0]
              const fromGroupFields = [
                ...fromGroup.fields.filter(
                  (field) => field.id !== fromFieldId
                )
              ]
              const toGroupFields = [
                ...toGroup.fields,
                { ...dragedGroupField, order: ( toGroup.fields.length + 1 ).toString() }
              ]

              fields = fields.filter(group => group.id != fromGrp && group.id != toGrp)
              const switched = fromGrpIndex > toFieldIndex ? [
                ...fields.slice(0, toFieldIndex),
                { ...toGroup, fields: toGroupFields},
                ...fields.slice(toFieldIndex, fromGrpIndex),
                { ...fromGroup, fields: fromGroupFields},
                ...fields.slice(fromGrpIndex, fields.length)
              ] : [
                ...fields.slice(0, fromGrpIndex),
                { ...fromGroup, fields: fromGroupFields},
                ...fields.slice(fromGrpIndex, toFieldIndex),
                { ...toGroup, fields: toGroupFields},
                ...fields.slice(toFieldIndex, fields.length)
              ]

              newState = {
                ...state,
                fields: switched
              }
            }
            toGroup.fields.forEach((field, index) => {field.order = (index + 1).toString() })
          } else {
            // from group to the out
            console.log(`${fromFieldId} from group ${fromGrp} to index ${toFieldIndex}`)

            fields = fields.filter(group => group.id != fromGrp)

            const dragedGroupField = fromGroup.fields.filter(field => field.id == fromFieldId)[0]
            const GroupFields = [
              ...fromGroup.fields.filter(
                (field) => field.id !== fromFieldId
              )
            ]

            const switched = toFieldIndex < fromGrpIndex ? [
              ...fields.slice(0, toFieldIndex),
              { ...dragedGroupField, order: (toFieldIndex + 1).toString() },
              ...fields.slice(toFieldIndex, fromGrpIndex),
              { ...fromGroup, fields: GroupFields},
              ...fields.slice(fromGrpIndex, fields.length)
            ] : [
              ...fields.slice(0, fromGrpIndex),
              { ...fromGroup, fields: GroupFields},
              ...fields.slice(fromGrpIndex, toFieldIndex),
              { ...dragedGroupField, order: (toFieldIndex + 1).toString() },
              ...fields.slice(toFieldIndex, fields.length)
            ]

            newState = {
              ...state,
              fields: switched
            }
          }
          fromGroup.fields.forEach((field, index) => {field.order = (index + 1).toString() })
        } else {

          const group = fields.filter(group => group.id == toGrp)[0]
          
          fields.splice(fromFieldIndex, 1)

          if ( toGrp ) {
            // normal field to a group
            console.log(`normal field ${fromFieldIndex} to a group ${toGrp}`)

            fields = fields.filter(group => group.id != toGrp)

            const GroupFields = [
              ...group.fields,
              { ...dragedField, order: ( group.fields.length + 1 ).toString() }
            ]

            const switched = [
              ...fields.slice(0, toFieldIndex), 
              { ...group, fields: GroupFields},
              ...fields.slice(toFieldIndex, fields.length)
            ]

            group.fields.forEach((field, index) => {field.order = (index + 1).toString() })

            newState = {
              ...state,
              fields: switched
            }
          } else {
            // two normal fields out of group
            console.log(`from field ${fromFieldIndex} to ${toFieldIndex}`)

            const switched = [
                ...fields.slice(0, toFieldIndex),
                { ...dragedField, order: (toFieldIndex + 1).toString() },
                ...fields.slice(toFieldIndex, fields.length)
            ]

            newState = {
              ...state,
              fields: switched
            }
          }
        }

        fields.forEach((field, index) => {field.order = (index >= toFieldIndex) ? (index + 2).toString() : (index + 1).toString() })

        return newState

      case 'RESET': 
        return { ...state, fields: action.payload }
  
      default:
        return state
    }

  }