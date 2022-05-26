import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/GlobalState'

const RightCol = ( { customFields } ) => {
  
  const { state } = useGlobalContext()
  const [ products, setProducts ] = useState()

  useEffect(() => {
    wp.apiRequest( { path: '/wc/v3/products?_embed&per_page=10' } ).then( posts => {
      setProducts( posts )
      console.log( posts[0] )
      if ( posts.length ) setproductData( state, posts[Math.floor(Math.random() * (9 - 0 + 1) + 0)] )
    })
  }, [])

  useEffect(() => {
      if ( products ) {
        const product = products[Math.floor(Math.random() * (9 - 0 + 1) + 0)]
        setproductData( state, product )
      }
  }, [state])

  return <div  className="product-box-designer__right-col" >
    <div className="col-wrap">
      <div className="product-box-cava">
        <div className="product-box-preview">
          <figure className="product_item_thumbnail">
          { state.coverType == 'hide' ? '' : 
          state.coverType == 'image' ? <img id="productBoxPreviewImage" src='../wp-content/uploads/woocommerce-placeholder.png' className="woocommerce-placeholder wp-post-image" /> :
          state.coverType == 'author' ? <div className="product-box-preview__author" >
            <img id="productBoxPreviewImage" src="../wp-content/uploads/woocommerce-placeholder.png" className="product-box-preview__avatar" alt="Avatar" />
            <div className="product-box-preview__header-info">
              <h3 className="product-box-preview__display-name">Display name </h3>
              <span className="product-box-preview__email">email@Email.ex</span>
            </div>
          </div> : <img id="productBoxPreviewImage" src='../wp-content/uploads/woocommerce-placeholder.png' className="woocommerce-placeholder wp-post-image" /> }
          </figure>
          { state.hideContent ? '' :
            <div className="wd-product__content">
              <div className="wd-product__head">
                <div className="wd-product__before-title">
                  { state.beforeTitle.map(field => <div id={ field.slug } className="product_item_details__meta">{ field.displayText.replace( '{field}', customFields.filter( customField => customField.id == field.slug )[0]?.name ) } </div> ) }
                </div>
                <div className="wd-product__title">
                  <h2  style={{fontSize: '20px'}}><a href='#' id="productBoxPreviewTitle">{ state.title.type == 'title' ? 'Prdoct Title' : state.title.type == 'short-description' ? 'Short Description' : state.title.type == 'address' ? 'Adress' : '' }</a></h2>		
                </div>
                <div className="wd-product__after-title">
                  { state.afterTitle.map(field => <div id={ field.slug } className="product_item_details__meta">{ field.displayText.replace( '{field}', customFields.filter( customField => customField.id == field.slug )[0]?.name ) } </div> ) }
                </div>
              </div>
              <div className="wd-product__details">
                { state.details.map(field => <div id={ field.slug } className="product_item_details__meta">{ field.displayText.replace( '{field}', customFields.filter( customField => customField.id == field.slug )[0]?.name )} </div> ) }
              </div>
              <div className="wd-product__bottom">
                <div className="wd-product__bottom__left" >
                  { state.bottom.left.slug == 'hide' ? '' : state.bottom.left.slug == 'price' ? <Price /> : <AddToCart /> }
                </div>
                <div className="wd-product__bottom__right" >
                  { state.bottom.right.slug == 'hide' ? '' : state.bottom.right.slug == 'price' ? <Price /> : <AddToCart /> }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  </div>
}

const Price = () => {
  return <>
    <span class="bottom-price-html" ></span>
  </>
}

const AddToCart = () => {
  return <>
    <button href="#">Add to cart</button>
  </>
}


function setproductData ( state, product ) {
  if ( state.coverType != 'hide' ) {
    document.querySelector('#productBoxPreviewImage').src = product.images[0].src
    document.querySelector('#productBoxPreviewImage').alt = product.images[0].alt
  }
  if ( !state.hideContent ) {

    document.querySelectorAll('.wd-product__before-title .product_item_details__meta').forEach(meta => {
      showMeta( product, meta )
    })

    let adress = {}
    for ( const component of product.meta_data ) {
      const componentKey = component.key
      switch (componentKey.split('-')[1]) {
        case "city":
          adress.city = component.value
          break;
        case "state": 
          adress.state = component.value
          break;
        case "country":
          adress.country = component.value
          break;
      }
    }
    const titleContent = state.title.type == 'title' ? product.name : 
      state.title.type == 'short-description' ? product.short_description : 
      state.title.type == 'address' ? `${adress.city} ${adress.state} - ${adress.country}` : ''
    document.querySelector('#productBoxPreviewTitle').innerHTML = titleContent

    document.querySelectorAll('.wd-product__after-title .product_item_details__meta').forEach(meta => {
      showMeta( product, meta )
    })

    document.querySelectorAll('.wd-product__details .product_item_details__meta').forEach(meta => {
      showMeta( product, meta )
    })

    document.querySelectorAll('.bottom-price-html').forEach( price => {
      price.innerHTML = `${product.price_html}`
    })
  }
}

function showMeta( product, meta ) {
  switch ( meta.id ) {
    case 'title':
      meta.innerHTML = product.name
      break;
    case 'product_type':
      meta.innerHTML = product.type
      break;
    case 'product_visibility':
      meta.innerHTML = product.catalog_visibility
      break;
    case 'product_shipping_class':
      meta.innerHTML = product.shipping_class
      break;
    case 'product_details_tax':
      meta.innerHTML = product.tax_status
      break;
    case '_price':
      meta.innerHTML = `${product.price} $`
      break;
    case 'description':
      meta.innerHTML = product.description
      break;
    case 'short-description':
      meta.innerHTML = product.short_description
      break;
    case '_regular_price':
      if ( product.type == 'auction' ) meta.innerHTML = `${product.regular_price} $`
      break;
    case '_sale_price':
      if ( product.type == 'auction' ) meta.innerHTML = `${product.sale_price} $`
      break;
    case '_auction_start_price':
      if ( product.type == 'auction' ) {
        product.meta_data.forEach( metaData => {
          if ( metaData.key == '_auction_start_price') meta.innerHTML = `${metaData.value} $`
        })
      }
      break;
    case '_auction_reserved_price':
      if ( product.type == 'auction' ) {
        product.meta_data.forEach( metaData => {
          if ( metaData.key == '_auction_reserved_price') meta.innerHTML = `${metaData.value} $`
        })
      }
      break;
    case 'product_tag':
      let tags = ''
      for ( let i = 0; i < product.tags.length; i++ ) {
        tags += product.tags[i].name
        tags += product.tags.length == i + 1 ? '.' : ', '
      }
      meta.innerHTML = tags
      break;
    case 'product_cat':
      let categories = ''
      for ( let i = 0; i < product.categories.length; i++ ) {
        categories += product.categories[i].name
        categories += product.categories.length == i + 1 ? '.' : ', '
      }
      meta.innerHTML = categories
      break;
    case 'countdown':
      if ( product.type == 'auction')
        meta.innerHTML = `<div class="auction-time">
          <div class="main-auction auction-time-countdown hasCountdown" >
            <span class="countdown_row countdown_show4">
              <span class="countdown_section">
                <span class="countdown_amount">1007</span><br>Days
              </span>
              <span class="countdown_section">
                <span class="countdown_amount">12</span><br>Hours
              </span>
              <span class="countdown_section">
                <span class="countdown_amount">33</span><br>Minutes
              </span>
              <span class="countdown_section">
                <span class="countdown_amount">41</span><br>Seconds
              </span>
            </span>
          </div>
        </div>`
      break;
  }
}

export default RightCol