<?php

namespace Webdevia\Main_Plugin;

if ( ! defined('ABSPATH') ) {
	exit;
}

class SearchFormMetaBox {

    function __construct() {

        add_action( 'admin_init', [ $this, 'init' ] );
        $this->init();

    }

    public function init() {

        add_action( 'admin_menu', [ $this, 'add_metabox' ] );
        add_action( 'save_post', [ $this, 'save_meta' ], 10, 2 );

    }

    function add_metabox() {
      add_meta_box(
        'wd_search_form_metabox', // metabox ID
        'Search Filters', // title
        [ $this, 'metabox_callback' ], // callback function
        'wd_search_form', // post type or post types in array
        'normal', // position (normal, side, advanced)
        'high' // priority (default, low, high, core)
      );
    }

    function metabox_callback( $post ) {

      wp_nonce_field( 'somerandomstr', '_devia_nonce' );

      echo '<div id="wdmp_search_filters_root"></div>';

      if ( class_exists( 'WooCommerce' ) ) {
        $metaFields[] = [ 'value' => '_price', 'name' => 'Price' ];
        $metaFields[] = [ 'value' => '_regular_price', 'name' => 'Regular price' ];
        $metaFields[] = [ 'value' => '_sale_price', 'name' => 'Sale price' ];
      }

      if ( class_exists( 'WooCommerce_simple_auction' ) ) {
        $metaFields[] = [ 'value' => '_auction_start_price', 'name' => 'Auction start price' ];
        $metaFields[] = [ 'value' => '_auction_reserved_price', 'name' => 'Auction reserved price' ];
      }

      $customFields = CustomFields::instance();
      if ( !empty( $customFields->fields ) )
        foreach ( $customFields->fields as $key => $value ) {
          if ($value->type === 'number')
            $metaFields[] = [
              'value' => $value->id,
              'name' => $value->name
            ];
        }

      foreach (get_object_taxonomies( 'product', 'objects' ) as $key => $value) {
        $productsTaxonomies[] = [
          'value' => $key,
          'name' => $value->label
        ];
      }

      $wdmp_search_filters = get_post_meta( $post->ID, 'wdmp_search_filters', TRUE ) == '' ? '{"searchfileds": []}' : get_post_meta( $post->ID, 'wdmp_search_filters', TRUE );
      ?>
        <input id="metaFields" type="text" value='<?= json_encode( $metaFields ) ?>' hidden />
        <input id="taxonomies" type="text" value='<?= json_encode( $productsTaxonomies ) ?>' hidden />
        <input id="wdmp_search_filters" name="wdmp_search_filters" type="text" value='<?= $wdmp_search_filters ?>' hidden />
      <?php
    }

    function save_meta( $post_id, $post ) {
      
      // nonce check
      if ( ! isset( $_POST[ '_devia_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_devia_nonce' ], 'somerandomstr' ) ) {
        return $post_id;
      }

      // check current use permissions
      $post_type = get_post_type_object( $post->post_type );

      if ( ! current_user_can( $post_type->cap->edit_post, $post_id ) ) {
        return $post_id;
      }

      // Do not save the data if autosave
      if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) {
        return $post_id;
      }

      // define your own post type here
      if( $post->post_type != 'wd_search_form' ) {
        return $post_id;
      }

      if( isset( $_POST[ 'wdmp_search_filters' ] ) ) {
        update_post_meta( $post_id, 'wdmp_search_filters', sanitize_text_field( get_taxonomy_tags( $_POST[ 'wdmp_search_filters' ] ) ) );
      } else {
        delete_post_meta( $post_id, 'wdmp_search_filters' );
      }

      return $post_id;
    }

}

function get_taxonomy_tags( $search_filters ) {

  $search_filters = str_replace('\\', '', substr(json_encode( $search_filters ), 1, -1));
  $search_filters_array = json_decode( $search_filters, true);

  foreach ($search_filters_array as $key => $value) {
    if ($key == 'searchfileds') {
      foreach ($value as $key2 => $value2) {
        if($value2['type'] == 'taxonomy') {
          $terms = get_terms( [ 'taxonomy' => [$value2['taxonomy']], 'hide_empty' => false ] );
          $search_filters_array[$key][$key2]['selectOptions'] = [];
          foreach ($terms as $term){
            $search_filters_array[$key][$key2]['selectOptions'][$term->slug] = $term->name;
          }
        }
      }
    }
  }

  $search_filters = json_encode( $search_filters_array );

  return $search_filters;
}

new SearchFormMetaBox();

















