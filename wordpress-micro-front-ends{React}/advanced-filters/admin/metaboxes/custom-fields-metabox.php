<?php

namespace Webdevia\Main_Plugin;

if ( ! defined('ABSPATH') ) {
	exit;
}

class CustomFieldMetabox {

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
        'misha_metabox', // metabox ID
        'Custom Fileds', // title
        [ $this, 'metabox_callback' ], // callback function
        'product', // post type or post types in array
        'normal', // position (normal, side, advanced)
        'core' // priority (default, low, high, core)
      );
    }   

    function metabox_callback( $post ) {

      $customFields = CustomFields::instance();
      $post_meta_fields = $customFields->get_post_meta_fields();
    
      // nonce, actually I think it is not necessary here
      wp_nonce_field( 'somerandomstr', '_devia_nonce' );
    
      echo '<p>Fields with (*) are required.</p>
      <table class="form-table">
        <tbody>';
        if (is_array( $customFields->fields ) || is_object( $customFields->fields )){
          foreach ( $customFields->fields as $field ) {
            echo '<tr>
                  <th><label>'. $field->name . ( $field->required ? ' *' : '' ) . '</label></th>
                  <td>' . $field->get_html( $post->ID ). '</td>
                </tr>';
          }
        }
      echo '</tbody>
      </table>';	
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

      // check if we are in the correct post type
      if( $post->post_type != 'product' ) {
        return $post_id;
      }

      $submited_custom_fields =  $_POST[ 'wdmp_customfields' ];
      $customFields = CustomFields::instance();

      // save the Custom Fields
      foreach ( $customFields->fields as $field ){
        if( isset( $submited_custom_fields [ $field->id ] ) ) {
          $field->save( $post->ID, $submited_custom_fields [ $field->id ] );
        }
      }

      return $post_id;
      
    }
}

new CustomFieldMetabox();