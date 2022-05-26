(function( $ ) {
  'use strict';

  function generate_url_params(data){
    data = data.filter(values => values[1] !== '')
    const asString = data
    .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&');
    return devia.home_url + '/advanced-search/?' + asString
  }

  function send_ajax_request(e){
    $('.advanced-filters-content').css('opacity', .7);
    
    var formData
    if ( e.target ) {
      e.preventDefault()
      formData = new FormData(e.target.closest('#wd-advanced-search-form'))

    } else {
      formData = new FormData(e.closest('#wd-advanced-search-form'))
    }
    if ( !$('.advanced-filters-content').length ){
      const data = [...formData.entries()]
      window.location.href = generate_url_params(data)
    }
    else {
      const currentProducts = document.querySelectorAll('.advanced-filters-content li.product').length; 
      let placeHolderItem = `<li class="placeholder-item product">
                              <figure class="product_item_thumbnail">
                                <img style="width: 100%;" width="300" height="300" src="${devia.home_url}/wp-content/uploads/woocommerce-placeholder.png" class="woocommerce-placeholder wp-post-image">
                              </figure>
                              <div class="product_item_details">
                                <div class="text"></div>
                                <div class="text" style="width: 140px;opacity: .3;height: 20px;"></div>
                                <div class="text" style="width: 100px; "></div>
                              </div>
                            </li>`;
      let placeHolder = placeHolderItem;
      for (var i = 0; i < currentProducts - 1; i++) {
        placeHolder += placeHolderItem;
      }
      $('.advanced-filters-content ul.products').html( placeHolder );

      formData.append('action', 'wd_advanced_search');
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
          },
          error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
        },
      });
    }
  }

  var last, diff = 200;
  $(".wd-form-group").on( 'change', function(e) {
    if ( last ) { // make sure it runs only once per 100ms
      diff = e.timeStamp - last;
      if( diff < 100 ){ return }
    }
    last = e.timeStamp;
    submit_options (e)
  });
  
  $(".wd-form-group input, .wd-form-group select").on( 'change', function(e) {
    submit_options (e)
  })
   
  let advancedSearchForms = document.querySelectorAll('.wd-srch-frm')
  advancedSearchForms.forEach(advancedSearchForm => {
    if(typeof(advancedSearchForm) != 'undefined' && advancedSearchForm != null){
      advancedSearchForm.addEventListener('submit', (e) => {
        send_ajax_request(e);          
      });
    }
  });
  
  function submit_options (e) {
    
    if ( $('.advanced-filters-content').length && !e.target.closest('#wd-advanced-search-form').querySelector('.wd-srch-frm__submit') )
      send_ajax_request(e)

    if ( !$('.advanced-filters-content').length && !e.target.closest('#wd-advanced-search-form').querySelector('.wd-srch-frm__submit') ) {
      window.location.href = generate_url_params([ [
        e.target.name,
        e.target.value
      ] ])
    }

  }
  /****************************** add listing multi select filters ********************************/
  $('.add-listing-form__select__multiple').select2({
    tags: true,
    placeholder: 'Select an option',
    allowClear: true,
    width: '100%'
  })

  // Advanced search multi select 
  var wdMultiSelect = $(".wd-multi-select");

  wdMultiSelect.select2({
    containerCssClass: "wd-filter-select2",
    dropdownCssClass: "wd-filter-select2-dropdown",

    closeOnSelect : false,
    placeholder : "Placeholder",
    allowHtml: true,
    allowClear: true,
    tags: true
  });

  $(".wd-multi-select.group").select2( {
    closeOnSelect : true
  } )
  
  function select2_changed(element) {
    var uldiv = $(element).siblings('span.select2').find('ul');
    var elmntdiv = uldiv.parent().parent().parent().parent().find(".multi-select-label");
    var labeltext = uldiv.parent().parent().parent().parent().find(".multi-select-label").data( "labeltext" ); 
    var count = uldiv.find('li').length - 1;
    const wdFormGroup = element.closest('.wd-form-group');
    if (count == 0 ){
      elmntdiv.html( labeltext )
      wdFormGroup.classList.remove('has-selection')
    }else{
      elmntdiv.html( labeltext + " ("+count+")")
      wdFormGroup.classList.add('has-selection')
    }
  }

  wdMultiSelect.on('select2:close select2:select select2:unselect', function (e) {
    select2_changed(this);
  });

  
  // Advanced search group multi select 
  // var wdGroupMultiSelect = $(".wd-group-popover__container .wd-multi-select").select2({
  //   containerCssClass: "wd-filter-select2",
  //   dropdownCssClass: "wd-filter-select2-dropdown",

  //   closeOnSelect : false,
  //   placeholder : "Placeholder",
  //   allowHtml: true,
  //   allowClear: true,
  //   tags: true
  // }).on(".wd-group-popover__container .wd-multi-select:closing", function(e) {
  //   e.preventDefault();
  // }).on(".wd-group-popover__container .wd-multi-select:closed", function(e) {
  //   wdGroupMultiSelect.select2("open");
  // });
  // wdGroupMultiSelect.select2("open");

  ///////////////////////////  wd-popover  //////////////////////////////
  const wdPopover = document.querySelectorAll('.wd-popover label');
  wdPopover.forEach(item => {
    item.addEventListener('click', event => {
      const closeIcon = window.getComputedStyle( event.target.closest('.wd-popover').querySelector('label'), ':after' ).getPropertyValue('content') != '""'
      if ( closeIcon && event.offsetX > 173 && event.offsetX < 183 && event.offsetY > 18 && event.offsetY < 30 ) 
        removeFilters( event, event.target.closest('.wd-popover') );
      else {
        event.target.closest('.wd-popover').classList.toggle('wd-popover--active');
        selectionLabel( event, event.target.closest('.wd-popover') );
      }
    })
  })

  // remove "wd-popover--active" class when clicking outside
  const popovers = document.querySelectorAll('.wd-popover');
  window.addEventListener('mouseup', e => {
    popovers.forEach(item => {
      if (e.target != item && e.target.parentNode != item && e.target.parentNode.parentNode != item ) {
        item.classList.remove('wd-popover--active');
        selectionLabel( e, item );
      }
    })
  });

  function selectionLabel ( e, item ) {
    const label = item.querySelector('label')
    let count = 0
    item.querySelectorAll('input').forEach( minmax => {
      if ( minmax.value !== '' ) count++
    })
    item.querySelectorAll('select').forEach( select => {
      if ( select.value !== '' ) count++
    })
    
    if ( count === 0 ) {
      label.classList.remove('has-selection')
      label.textContent = label.textContent.slice(-1) == ')' ? label.textContent.slice(0, -4) : label.textContent
    } else {
      label.classList.add('has-selection')
      label.textContent = label.textContent.slice(-1) == ')' ? 
      `${label.textContent.slice(0, -4)} (${count})` :
      `${label.textContent} (${count})`
    }

  }

  function removeFilters ( e, filter ) {
    const label = filter.querySelector('label')
    filter.querySelectorAll('input').forEach( input => {
      input.value = ''
    })
    filter.querySelectorAll('select').forEach( select => {
      select.options.selectedIndex = select.multiple ? -1 : 0
    })
    label.classList.remove('has-selection')
    label.textContent = label.textContent.slice(-1) == ')' ? label.textContent.slice(0, -4) : label.textContent
    send_ajax_request(e)
  }

  ///////////////////////////  wd-group-popover  //////////////////////////////
  const wdGroupPopover = document.querySelectorAll('.wd-group-popover__label');
  wdGroupPopover.forEach(item => {
    item.addEventListener('click', event => {
      const closeIcon = window.getComputedStyle( event.target.closest('.wd-group-popover').querySelector('label'), ':after' ).getPropertyValue('content') != '""'
      if ( closeIcon && event.offsetX > 173 && event.offsetX < 183 && event.offsetY > 18 && event.offsetY < 30 ) 
        removeFilters( event, event.target.closest('.wd-group-popover') );
      else {
        event.target.closest('.wd-group-popover').classList.toggle('wd-group-popover--active');
        selectionLabel( event, event.target.closest('.wd-group-popover') );
      }
    })
  })

   // remove "wd-group-popover--active" class when clicking outside
   const groupPopovers = document.querySelectorAll('.wd-group-popover');
   window.addEventListener('mouseup', e => {
    groupPopovers.forEach(item => {
      if ( !e.target.closest('.wd-group-popover__container.group') && !e.target.classList.contains('wd-group-popover__label') ) {
        item.classList.remove('wd-group-popover--active');
        selectionLabel( e, item );
      }
     })
   });

  /************************** Select active ****************************/
  const wdSelectOne = document.querySelectorAll('.wd-select');
  wdSelectOne.forEach(item => {
    item.addEventListener('click', event => {
      event.target.closest('.wd-form-group').querySelector('.wd-select__label').classList.toggle('wd-select__label--active');
    })
  })

  window.addEventListener('mouseup', e => {
    wdSelectOne.forEach(item => {
    if ( e.target != item )
      item.closest('.wd-form-group').querySelector('.wd-select__label').classList.remove('wd-select__label--active')
    })
  });

  // const wdSelectMultiple = document.querySelectorAll('.wd-multi-select');
  // wdSelectMultiple.forEach(item => {
  //   item.closest('.wd-form-group').addEventListener('click', event => {
  //     event.target.closest('.wd-form-group').querySelector('.multi-select-label').classList.toggle('multi-select-label--active');
  //   })
  // })

  // window.addEventListener('mouseup', e => {
  //   wdSelectMultiple.forEach(item => {
  //   if ( e.target != item )
  //     item.closest('.wd-form-group').querySelector('.multi-select-label').classList.remove('multi-select-label--active')
  //   })
  // });

  // autocomplete search fieldset
  const locationInfo = {}

  const options = {
    strictBounds: false,
    fields: ["address_components", "geometry"],
    types: ["(cities)"]
  }

  document.querySelectorAll(".wd-auto-complete").forEach(autocompleteContainer => {
    const autocompleteInput = autocompleteContainer.querySelector('input')
    const autocompleteValueInput = autocompleteContainer.querySelector('#autocompleteValueInput')
    const autocomplete = new google.maps.places.Autocomplete( autocompleteInput, options )
    const params = new URLSearchParams(location.search)
    const prevLocation = JSON.parse ( params.get( autocompleteValueInput.name ) )
    const defaultLocation = 'New York, NY, USA'
    
    autocompleteValueInput.value = '{"city":"New York","state":"NY","country":"US"}'

    if( autocomplete ) {

      if ( !autocompleteContainer.classList.contains('home') && prevLocation)
        autocompleteInput.value = prevLocation?.city + ', ' + prevLocation?.country
      else {
        if ( document.querySelector('.wd-srch-frm') ) {
          document.querySelector('.wd-srch-frm').addEventListener( 'submit', e => {
            e.preventDefault()
          })
          autocompleteInput.value = defaultLocation
        }
      }

      autocomplete.addListener("place_changed", (e) => {
          
        let place = autocomplete.getPlace()

        let geocoder = new google.maps.Geocoder()
        geocoder.geocode( { 'address': defaultLocation}, function(results, status) {
          if (status == 'OK') {
            if ( autocompleteContainer.classList.contains('home') && autocompleteInput.value == defaultLocation )
              place = results[0]

            if (!place.geometry || !place.geometry.location) {
              window.alert("No details available for input: '" + place.name + "'")
              return;
            }

            for (const component of place.address_components) {
              const componentType = component.types[0]
          
              switch (componentType) {
                case "locality":
                  locationInfo.city = component.long_name
                  break;
                case "administrative_area_level_1": 
                  locationInfo.state = component.short_name
                  break;
                case "country":
                  locationInfo.country = component.short_name
                  break;
              }
            }
            
            autocompleteValueInput.value = JSON.stringify(locationInfo)
            if ( autocompleteContainer.classList.contains('home') && !autocompleteInput.closest('.wd-srch-frm').querySelector('.wd-srch-frm__submit') ) {
              window.location.href = generate_url_params([[
                `meta[autocomplete][${autocompleteInput.id}]`,
                `{"city":"${locationInfo.city}","state":"${locationInfo.state}","country":"${locationInfo.country}"}`
              ]])
            } else {
              if ( !autocompleteContainer.classList.contains('home') )
                send_ajax_request(autocompleteContainer)
            }

          } else
            alert('Geocode was not successful for the following reason: ' + status)
        })
        
      })

      autocompleteInput.addEventListener('change', e => {
        if ( !autocompleteContainer.classList.contains('home') ){
          if ( e.target.value === '' ) autocompleteValueInput.value = ''
          send_ajax_request(e)
        }
      })

    } else console.log(`google apis is not defined!!`)

  })

  /************************************** single product map *********************************************/
  if ( document.querySelector('#mapContainer') ) {
    const geocoder = new google.maps.Geocoder()
    const infowindow = new google.maps.InfoWindow()
    const singleProductLocationInfo = JSON.parse( document.querySelector('#locationInfo').value )
    const singleProductZoomLevel = parseInt( document.querySelector('#zoomLevel').value )
  
    const map = new google.maps.Map(document.querySelector('#mapContainer #map'), {
      center: singleProductLocationInfo,
      zoom: singleProductZoomLevel,
      mapTypeControl: false
    })

    geocodeLatLng(geocoder, map, infowindow, singleProductLocationInfo)
  }

  function geocodeLatLng(geocoder, map, infowindow, position) {
    geocoder.geocode({ location: position })
    .then((response) => {
      if (response.results[0]) {

        const marker = new google.maps.Marker({
          position: position,
          map: map,
        });

        infowindow.setContent(response.results[0].formatted_address)
        infowindow.open(map, marker)

      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e))
  }

  /******************************* product slide gallery && timer observer *****************************************/
  swipe ()

  const target = document.querySelector('#advancedFiltersContent')
  const SwipObserver = new MutationObserver( function() {
    swipe()
  });
  if ( target )
    SwipObserver.observe( target, {
      childList:     true,
      // attributes:    true,
      // characterData: true
    });
  
  const timerObserver = new MutationObserver(function() {
    $( ".auction-time-countdown" ).each(function( index ) {
      var time 	= $(this).data('time');
      var format 	= $(this).data('format');
      var compact = false;

      if(format == ''){
        format = 'yowdHMS';
      }
      if(data.compact_counter == 'yes'){
        compact	 = true;
      } else{
        compact	 = false;
      }
      var etext ='';
      if($(this).hasClass('future') ){
        var etext = '<div class="started">'+data.started+'</div>';
      } else{
        var etext = '<div class="over">'+data.checking+'</div>';
      }

      if ( ! $(' body' ).hasClass('logged-in') ) {
        time = $.SAcountdown.UTCDate(-(new Date().getTimezoneOffset()),new Date(time*1000));
      }

      $(this).SAcountdown({
        until: time,
        format: format,
        compact:  compact,

        onExpiry: closeAuction,
        expiryText: etext
      });
    });
  });
  if ( target ) timerObserver.observe( target, { childList: true } );

  function swipe () {
    const swiper = new Swiper('.swiper', {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  }

  function closeAuction(){
    var auctionid = jQuery(this).data('auctionid');
    var future = jQuery(this).hasClass('future') ? 'true' : 'false';
    var ajaxcontainer = jQuery(this).parent().next('.auction-ajax-change');
    if ( ajaxcontainer.length == 0 ){
      ajaxcontainer = jQuery(".auction_form[data-product_id='" + auctionid + "']");
    }
    ajaxcontainer.hide();
    jQuery( '<div class="ajax-working"></div>' ).insertBefore(ajaxcontainer);
    ajaxcontainer.parent().children('form.buy-now').hide();

    var ajaxurl = saajaxurl+'=finish_auction';

    jQuery( document.body).trigger('sa-close-auction',[auctionid]);
    request =  jQuery.ajax({
      type : "post",
      url : ajaxurl,
      cache : false,
      data : {action: "finish_auction", post_id : auctionid, ret: ajaxcontainer.length, future: future},
      success: function(response) {
        if ( response ) {
          if (response.status == 'closed' ){
            ajaxcontainer.parent().children('form.buy-now').remove();
            if ( response.message ){
              jQuery('.ajax-working').remove();
              jQuery('.main-auction.auction-time-countdown[data-auctionid='+auctionid+']').parent().remove();
              ajaxcontainer.empty().prepend(response.message).wrap( "<div></div>" );
              ajaxcontainer.show();
              jQuery( document.body).trigger('sa-action-closed',[auctionid]);
            }
          } else if (response.status == 'running') {
            getPriceAuction();
            jQuery('.ajax-working').remove();
            ajaxcontainer.show();
            ajaxcontainer.parent().children('form.buy-now').show();
          } else {
            location.reload();
          }
        } else {
          location.reload();
        }
      },
      error: function(){
        location.reload();
      },
    });
  }

})( jQuery );
