<?php

namespace Webdevia\Main_Plugin;

if ( ! defined('ABSPATH') ) {
	exit;
}

class Field {

  const storage_option = 'option';
  const storage_meta = 'meta';
  const storage_term = 'term';
  const storage_location = 'location';

  public $id;
  public $name;
  public $type;
  public $displaytype;
  public $storage;
  public $value;
  public $show_in_submission_form;
  public $allow_multiple;
  public $required;
  public $parentField;
  public $classes = [];
  public $attrs = [];
  public $style = '';

  function __construct( $properties ) {

    if( !isset( $properties['name'] ) ){
      throw new \Exception("Field name is required!");
    }

    foreach($properties as $key => $value){
      $this->{$key} = $value;
    }
    
  }


  public function get_value() {
    switch ( $this->storage ) {

      case $this::storage_option:
        return get_option( $this->id );

      case $this::storage_meta:
        return get_post_meta( get_the_ID(), $this->id );
      
      case $this::storage_term:
        return get_term_meta( $this->id );

      case $this::storage_location:
        return get_post_meta( get_the_ID(), $this->id );

    }

  }

  public function save( $post_id, $value ) {
   
    switch ( $this->storage ) {

      case $this::storage_option:
        update_option( $this->id, $this->value );
        break;

      case $this::storage_meta:
        if( $value != ''){
          update_post_meta( $post_id, $this->id, $value );
        }else{
          delete_post_meta( $post_id, $this->id );
        }
        break;

      case $this::storage_location:
        $location_info = json_decode( str_replace('\\', '', substr( json_encode( $value, JSON_UNESCAPED_UNICODE ), 1, -1) ), true );
        if( !empty( $location_info ) ){
          if ( $location_info['lat'] != '' )      update_post_meta( $post_id, $this->id . '-lat', $location_info['lat'] );
          if ( $location_info['lng'] != '' )      update_post_meta( $post_id, $this->id . '-lng', $location_info['lng'] );
          if ( $location_info['country'] != '' )  update_post_meta( $post_id, $this->id . '-country', $location_info['country'] );
          if ( $location_info['state'] != '' )    update_post_meta( $post_id, $this->id . '-state', $location_info['state'] );
          if ( $location_info['city'] != '' )     update_post_meta( $post_id, $this->id . '-city', $location_info['city'] );
          if ( $location_info['zipcode'] != '' )  update_post_meta( $post_id, $this->id . '-zipcode', $location_info['zipcode'] );
        }else{
          delete_post_meta( $post_id, $this->id . '-lat' );
          delete_post_meta( $post_id, $this->id . '-lng' );
          delete_post_meta( $post_id, $this->id . '-country' );
          delete_post_meta( $post_id, $this->id . '-state' );
          delete_post_meta( $post_id, $this->id . '-city' );
          delete_post_meta( $post_id, $this->id . '-zipcode' );
        }
        break;
      
      case $this::storage_term:
        $term_ids = [];
        if ( !empty( $value )) {
          if ( is_array( $value ) ) {
            foreach ( $value as $val ) {
              $terms[] = get_term_by( 'slug', $val, $this->id );
            }
          }
          else
            $terms = get_term_by( 'slug', $value, $this->id );    // 'name', 'automatic', 'transmission
          if ($terms) {
            if( is_array( $terms ) ) { // has multiple terms
              foreach($terms as $term){
                $term_ids[] = $term->term_id;
              }
            }
            else // single term
              $term_ids[] = $terms->term_id;
          }
        }
        wp_set_post_terms( $post_id, $term_ids, $this->id );
        break;
    }

  }

  public function get_html( $post_id = null ) {

    $output = '';
    switch ( $this->storage ) {

      case $this::storage_term:
        $output .= $this->allow_multiple ? 
          '<select class="custom-fields__select__multiple" name="wdmp_customfields['. $this->id .'][]" multiple="multiple" ' . ( $this->required ? 'required' : '' ) . ' />' :
          '<select class="custom-fields__select" name="wdmp_customfields['. $this->id .']" ' . ( $this->required ? 'required' : '' ) . ' />';
        $terms = get_terms( [ 'taxonomy' => $this->id,
                              'hide_empty' => false,
                          ]);

        $current_terms = wp_get_post_terms( $post_id, $this->id );
        $output .= '<option value="">(Default) Select ' . $this->name . '</option>';                
        foreach ( $terms as $term ){
          $output .= "<option value='" . $term->slug . "'";
          foreach ( $current_terms as $current_term ) {
            if ( !empty( $current_terms ) && $current_term->term_id == $term->term_id ){ 
              $output .= ' selected ';
            }
          }
          $output .= ">$term->name</option>";
        }
        $output .= '</select>';
        break;

      case $this::storage_location:
        $adress = get_post_meta($post_id, $this->id . '-city', true) . ' ' . get_post_meta($post_id, $this->id . '-country', true) . ' - ' . get_post_meta($post_id, $this->id . '-zipcode', true);
        $output .= '
          <div class="mapContainer">
            <input id="location" type="text" name="location" class="regular-text" style="margin-bottom: 5px;" placeholder="Enter location" ' . ( $this->required ? 'required' : '' ) . ' />
            <div id="map" style="min-width: 800px; height:400px;"></div>
            <input id="locationInfo" type="hidden" name="wdmp_customfields['. $this->id .']" />
            <input id="lat" type="hidden" value="' . get_post_meta($post_id, $this->id . '-lat', true) . '" />
            <input id="lng" type="hidden" value="' . get_post_meta($post_id, $this->id . '-lng', true) . '" />
            <input id="adress" type="hidden" value="' . $adress . '" />
          </div>
        ';
        break;

      default:
          $post_meta = get_post_meta( $post_id, $this->id, true );
          $output .=   '<input type="' . $this->type . '" id="'. $this->id .'" name="wdmp_customfields['. $this->id .']" value="' . $post_meta . '" class="regular-text" ' . ( $this->required ? 'required' : '' ) . ' >';  
    }

    return $output;  
  }


}