export default function appReducer(state, action) {

    let position

    switch (action.type) {
      case "ADD_FIELD":
        const newField = action.payload.field
        position = action.payload.position

        state[position] = [
          ...state[position],
          newField
        ]

        return { ...state }
  
      case "EDIT_FIELD":
        const updatedField = action.payload.cardFields
        position = action.payload.position
        
        if( position == 'beforeTitle' || position == 'afterTitle' || position == 'details')
          state[position] = updatedField
        else if ( position === 'coverType' || position === 'hideContent') {
          state[position] = action.payload.value
        }
        else if ( position === 'title' ) {
          state[position].type = action.payload.value
        }
        else if ( position === 'bottom_left' ) {
          state['bottom'].left.slug = action.payload.value
        }
        else if ( position === 'bottom_right' ) {
          state['bottom'].right.slug = action.payload.value
        }
  
        return { ...state }

      case "REMOVE_FIELD":

        position = action.payload.position
        state[position] = state[position].filter( ( field, index ) => index != action.payload.id )

        return  { ...state }
  
      case "SWITCH_FIELDS":
        
        const fromFieldIndex = action.payload.fromFieldIndex
        const toFieldIndex = action.payload.toFieldIndex
        position = action.payload.position
        const dragedField = state[position][fromFieldIndex]
        
        state[position].splice(fromFieldIndex, 1)

        state[position] = [
            ...state[position].slice(0, toFieldIndex),
            dragedField,
            ...state[position].slice(toFieldIndex, state[position].length)
        ]

        return { ...state }

      case 'RESET': 
        return action.payload
  
      default:
        return state
    }

  }