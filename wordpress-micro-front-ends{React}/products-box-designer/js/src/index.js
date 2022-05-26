import React from 'react'
import { GlobalProvider } from './context/GlobalState'

import LeftCol from './components/leftCol'
import RightCol from './components/rightCol'

import './scss/style.scss'

document.addEventListener("DOMContentLoaded", function() {
	
  function App () {
    
		const customFieldsDOM = document.querySelector('#customFields')
		const taxonomiesDOM = document.querySelector('#taxonomies')
		let taxonomies = isJsonString( 'Taxonomies', taxonomiesDOM.value )
		let customFields = isJsonString( 'Custom fields', customFieldsDOM.value )

		function isJsonString ( source, str ) {
			try {
				return JSON.parse(str)
			} catch (e) {
				alert( 'invalid or empty ' + source )
				return JSON.parse('[]')
			}
		}

		customFields.forEach( field => {
			if ( field.type === 'location' ) {
				customFields.push( { ...field, type: 'meta', id: field.id + '-country', name: field.name + ' Country', displayText: '{field}' } )
				customFields.push( { ...field, type: 'meta', id: field.id + '-city', name: field.name + ' City', displayText: '{field}' } )
				customFields.push( { ...field, type: 'meta', id: field.id + '-state', name: field.name + ' State', displayText: '{field}' } )
				customFields.push( { ...field, type: 'meta', id: field.id + '-zipcode', name: field.name + ' Zipcode', displayText: '{field}' } )
			}
		})
		
		taxonomies.forEach( taxonomy => {
			if ( !customFields.filter(field => field.id === taxonomy.id).length )
			customFields.push( { ...taxonomy, type: !taxonomy.type ? 'taxonomy' : taxonomy.type } )
		})

		customFields = customFields.filter( field => field.type !== 'location')
		
    return <>
			<GlobalProvider>

				<h2 className="wd-box-designer__title">Product Box Designer</h2>
				
				<div id="col-container" className="wp-clearfix product-box-designer" >

					<LeftCol customFields={ customFields } />

					<RightCol customFields={ customFields } /> {/* live preview */}

				</div>

			</GlobalProvider>
    </>
  }

  const root = document.getElementById('wdmp_products-box-designer_root')
  if(root) ReactDOM.render(<App />, root)
    
})
