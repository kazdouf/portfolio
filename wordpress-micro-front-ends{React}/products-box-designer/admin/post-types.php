<?php 
if( ! function_exists('webdevia_single_product_template')): 
  function webdevia_single_product_template() {
    register_post_type( 'wd_product_template',
      array(
        'labels' => array(
          'name'          => __( 'Product Templates', 'bidpro' ),
          'singular_name' => __( 'Product Template', 'bidpro' ),
          'add_new'       => __( 'Add New Product Template', 'bidpro' ),
          'add_new_item'  => __( 'Add New Product Template', 'bidpro' ),
          'edit_item'     => __( 'Edit Product Template', 'bidpro' ),
          'new_item'      => __( 'Add New Product Template', 'bidpro' ),
          'view_item'     => __( 'View Product Template', 'bidpro' ),
          'search_items'  => __( 'Search Product Template', 'bidpro' ),
          'not_found'     => __( 'No Product Templates found', 'bidpro' ),
          'not_found_in_trash' => __( 'No Product Templates found in trash', 'bidpro' )
        ),
        'show_in_rest'    => true,
        'supports'        => [ 'title', 'editor', 'custom-fields', ],
        'public'          => true,
        'menu_icon'       => 'dashicons-table-col-after',
        'capability_type' => 'post',
        'rewrite'         => array("slug" => "woo_product_template"), // Permalinks format
        'menu_position'   => 8
      )
    );
  }
  add_action( 'init', 'webdevia_single_product_template' );
endif;