<?php 
/*-------------- Search Form custom posttyp -----------------------*/
 if( ! function_exists('wd_search_form_posttype')): 
  function wd_search_form_posttype() {
    register_post_type( 'wd_search_form',
      array(
        'labels' => array(
          'name' => __( 'Search Form', 'bidpro' ),
          'singular_name' => __( 'Search Form', 'bidpro' ),
          'add_new' => __( 'Add New Search Form', 'bidpro' ),
          'add_new_item' => __( 'Add New Search Form', 'bidpro' ),
          'edit_item' => __( 'Edit Search Form', 'bidpro' ),
          'new_item' => __( 'Add New Search Form', 'bidpro' ),
          'view_item' => __( 'View Search Form', 'bidpro' ),
          'search_items' => __( 'Search Search Form', 'bidpro' ),
          'not_found' => __( 'No Search Form found', 'bidpro' ),
          'not_found_in_trash' => __( 'No Search Form found in trash', 'bidpro' )
        ),
        'public' => true,
        'menu_icon' => 'dashicons-search',
        'exclude_from_search' 	=> true,
				'hierarchical' 			=> false,
        'supports' => array( 'title'),
        'capability_type' => 'post',
        'rewrite' => array("slug" => "search_form"), // Permalinks format
        'menu_position' => 5,
        'supports' => array('title')
      )
    );

  }
  add_action( 'init', 'wd_search_form_posttype' );
endif;