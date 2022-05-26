(function( $ ) {
  'use strict';


  function add_new_custom_field(e){
    e.preventDefault(); 

    var formData = new FormData(advancedSearchForm);
    const data = [...formData.entries()];
    $( e.target ).children('.submit').children('.spinner').addClass( "is-active" );
    formData.append('action', 'wd_add_custom_filed');
    $.ajax({
      type: 'POST',
      url: devia.ajax_url,
      data: formData,
      contentType: false,
      cache: false,
      processData: false,
      success: function( data ) {
        $('.advanced-filters-content').html( data.results.content );
        $('.advanced-filters-content').css('opacity', 1);
        location.reload();
      },
      complete: function () {
        $( e.target ).children('.submit').children('.spinner').removeClass( "is-active" );
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Some problem occurred, please try again.");
      }
    });
  }

   
  let advancedSearchForm = document.getElementById('add_new_custom_field');
  if(typeof(advancedSearchForm) != 'undefined' && advancedSearchForm != null){
    advancedSearchForm.addEventListener('submit', (e) => {
      add_new_custom_field(e);          
    });
  }
   
  let editCustomField = document.getElementById('editCustomField');
  if(editCustomField){
    editCustomField.addEventListener('submit', (e) => {
      e.preventDefault()
      var formData = new FormData(editCustomField);
      $( '.spinner' ).addClass( "is-active" );
      formData.append('action', 'wd_edit_custom_filed');
      $.ajax({
          type: 'POST',
          url: devia.ajax_url,
          data: formData,
          contentType: false,
          cache: false,
          processData: false,
          success: function( data ) {
            document.referrer ? window.location = document.referrer : history.back();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            alert("Some problem occurred, please try again.");
          }
      });  
    });
  }

  $('#type').on('change', e => {
    switch( e.target.value ) {
      case 'number':
        $('#allow_multiple').parent().hide()
        $('#parentFieldWrapp').hide()
        $('#displayTypeWrapp').show()
        $('#displaytype').html(
          '<option value="real">Real Number</option>' + 
          '<option value="currency">Currency</option>' 
        )
        break;
      case 'taxonomy':
        $('#allow_multiple').parent().show()
        $('#parentFieldWrapp').show()
        $('#displayTypeWrapp').show()
        $('#displaytype').html(
          '<option value="select">Select</option>' + 
          '<option value="select2">Select2</option>' + 
          '<option value="checklist">Checklist</option>' + 
          '<option value="radiobuttons">Radio Buttons</option>' 
        )
        break;
      case 'text':
        $('#parentFieldWrapp').hide()
        $('#displayTypeWrapp').hide()
        $('#allow_multiple').parent().hide()
        break;
      default:
        $('#allow_multiple').parent().hide()
        $('#parentFieldWrapp').hide()
        $('#displayTypeWrapp').hide()
        break;
    }
  })
   
  $('.wdmp-delete-field').on('click', (e) => {
    $(e.target).addClass('widget-selected');
    var data = {
      'action': 'wd_delete_custom_filed',
      'fieldId': $(e.target).attr("data-field-id")
    };
    $( e.target ).children('.spinner').addClass( "is-active" );
    $.ajax({
      type: 'POST',
      url: devia.ajax_url,
      data: data,
      success: function( data ) {
        if ( $(e.target).attr("id") == 'wdmpDeleteFieldEdit' ) 
          document.referrer ? window.location = document.referrer : history.go(-2);
        else
          location.reload();
      },
      complete: function(){
        // $( e.target ).children('.spinner').removeClass( "is-active" );
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Some problem occurred, please try again.");
      }
    });
  })

   /** location map and marker */

    document.querySelectorAll(".mapContainer").forEach( mapContainer => {
      
      const lat = mapContainer.querySelector("#lat").value
      const lng = mapContainer.querySelector("#lng").value
      const locationInput = mapContainer.querySelector("#location")
      
      let locationInfo = {
        lat: lat != "" ? parseFloat( lat ) : 40.749933,
        lng: lng != "" ? parseFloat( lng ) : -73.98633
      }

      mapContainer.querySelector('#locationInfo').value = JSON.stringify(locationInfo)

      const geocoder = new google.maps.Geocoder()
      const infowindow = new google.maps.InfoWindow()
      const map = new google.maps.Map(mapContainer.querySelector("#map"), {
        center: locationInfo,
        zoom: 9,
        mapTypeControl: false
      })

      if ( map ) {
          
        if ( lat != "") geocodeLatLng(geocoder, map, infowindow, locationInfo, locationInput)

        const options = {
          strictBounds: false,
          // componentRestrictions: { country: ["au"] },
          fields: ["address_components", "geometry"],
          types: ["address"]
        }

        const autocomplete = new google.maps.places.Autocomplete(mapContainer.querySelector("#location"), options);
        autocomplete.bindTo("bounds", map)
          
        const marker = new google.maps.Marker({
          map,
          anchorPoint: new google.maps.Point(0, -29)
        })
        
        autocomplete.addListener("place_changed", () => {
        
          marker.setVisible(false)
      
          const place = autocomplete.getPlace()
      
          if (!place.geometry || !place.geometry.location) {
            
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'")
            return;
          }
      
          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport)
          } else {
            map.setCenter(place.geometry.location)
            map.setZoom(9)
          }
      
          marker.setPosition(place.geometry.location)
          marker.setVisible(true)

          locationInfo = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }

          for (const component of place.address_components) {
            const componentType = component.types[0];
        
            switch (componentType) {
              case "locality":
                locationInfo.city = component.long_name;
                break;
              case "administrative_area_level_1": 
                locationInfo.state = component.short_name;
                break;
              case "country":
                locationInfo.country = component.short_name;
                break;
              case "postal_code":
                locationInfo.zipcode = component.short_name;
                break;
            }
          }
          
          mapContainer.querySelector("#locationInfo").value = JSON.stringify(locationInfo)
          
        })

      } else console.log(`google apis is not defined`)

    })
    
    // if saved location present marker on the map and adress on the input using geocode
    function geocodeLatLng(geocoder, map, infowindow, position, input) {
      geocoder.geocode({ location: position })
      .then((response) => {
        if (response.results[0]) {
          map.setZoom(17)

          const marker = new google.maps.Marker({
            position: position,
            map: map,
          });

          infowindow.setContent(response.results[0].formatted_address)
          
          input.value = response.results[0].formatted_address

          infowindow.open(map, marker)
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e))
    }

  /**************************** Multiple (select2) ********************************/

  $('.custom-fields__select__multiple').select2({
    tags: true,
    placeholder: 'Select an option',
    allowClear: true,
    width: '50%'
  })
  

})( jQuery );
