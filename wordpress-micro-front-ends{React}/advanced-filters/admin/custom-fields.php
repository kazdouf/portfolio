<?php

namespace Webdevia\Main_Plugin;

if ( ! defined('ABSPATH') ) {
	exit;
}

class CustomFields {

  use \Webdevia\Main_Plugin\Singleton;

  public $fields = [];

  function __construct() {
    
    $this->admin_hooks();
    $this->public_hooks();

    $this->load_fields();

  }

  function admin_hooks() {
    add_action( 'init', [ $this, 'create_custom_taxonomies' ] );
  }

  function public_hooks () {

  }

  public function serialize() {
    return serialize($this->data);
  }
  public function unserialize($data) {
      $this->data = unserialize($data);
  }

  public function load_fields() {
    $fields = get_option( "wdmp_custom_fileds" );
    $this->fields = unserialize( $fields );
  }

  public function add_field( $field ) {
    $this->fields[] = $field;
    return $this->save_fields();
  }

  public function edit_field( $fieldId, $editedField ) {

    foreach ($this->fields as $key => $field ){
      if( $field->id == $fieldId ){
        $this->fields[$key] = $editedField;
      }
    }
    return $this->save_fields();
  }

  public function delete_field( $fieldId ) {

    foreach ($this->fields as $key => $field ){
      if( $field->id == $fieldId ) {
        if ( $field->storage == 'term' ) {
          $terms = get_terms( $fieldId, [ 'hide_empty' => false ] );
          if ( ! is_wp_error($terms) && ! empty($terms) )
            foreach ( $terms as $term ) {
              wp_delete_term( $term->term_id, $term->taxonomy);
            }
        } elseif ( $field->storage == 'location' ) {
          delete_post_meta_by_key( $fieldId . '-lat' );
          delete_post_meta_by_key( $fieldId . '-lng' );
          delete_post_meta_by_key( $fieldId . '-country' );
          delete_post_meta_by_key( $fieldId . '-state' );
          delete_post_meta_by_key( $fieldId . '-city' );
          delete_post_meta_by_key( $fieldId . '-zipcode' );
        } else delete_post_meta_by_key( $fieldId );
        unset($this->fields[$key]);
      }
    }
    return $this->save_fields();
  }

  public function save_fields() {
    return update_option( "wdmp_custom_fileds", serialize( $this->fields ) );
  }

  public function get_post_meta_fields(){
    $meta_fields = [];
    if ( is_array( $this->fields ) || is_object( $this->fields ) ){
      foreach ( $this->fields as $field ){
        if ( $field->storage == Field::storage_meta ){
          $meta_fields[] = $field;
        }
      }
    }
    return $meta_fields;
  }

  public function create_custom_taxonomies( ){

    $this->load_fields();

    if ( is_array($this->fields) ){
      foreach ( $this->fields as $field ){
        if ( $field->storage == Field::storage_term ){

            // Add new taxonomy, NOT hierarchical (like tags)
          $labels = array(
            'name'                       => $field->name,
            'singular_name'              => esc_html__( 'Item', 'taxonomy singular name', 'webdevia-main-plugin' ),
            'search_items'               => esc_html__( 'Search Items', 'webdevia-main-plugin' ),
            'popular_items'              => esc_html__( 'Popular Items', 'webdevia-main-plugin' ),
            'all_items'                  => esc_html__( 'All Items', 'webdevia-main-plugin' ),
            'parent_item'                => $field->parentField != '' ? $field->parentField : null,
            'parent_item_colon'          => null,
            'edit_item'                  => esc_html__( 'Edit Item', 'webdevia-main-plugin' ),
            'update_item'                => esc_html__( 'Update Item', 'webdevia-main-plugin' ),
            'add_new_item'               => esc_html__( 'Add New Item', 'webdevia-main-plugin' ),
            'new_item_name'              => esc_html__( 'New Item Name', 'webdevia-main-plugin' ),
            'separate_items_with_commas' => esc_html__( 'Separate items with commas', 'webdevia-main-plugin' ),
            'add_or_remove_items'        => esc_html__( 'Add or remove items', 'webdevia-main-plugin' ),
            'choose_from_most_used'      => esc_html__( 'Choose from the most used items', 'webdevia-main-plugin' ),
            'not_found'                  => esc_html__( 'No items found.', 'webdevia-main-plugin' ),
            'menu_name'                  => $field->name,
          );

          $args = array(
            'hierarchical'        => true,
            'labels'              => $labels,
            'public'              => false,
            'show_ui'             => true,
            'show_in_quick_edit'  => false,
            'meta_box_cb'         => false,
            'show_admin_column'   => false,
            'query_var'           => true,
            'show_in_rest'        => true,
            'rewrite'               => array( 'slug' => $field->id ),
          );

        register_taxonomy( sanitize_key( $field->id ), 'product', $args );

        }
      }
    }

  }

}