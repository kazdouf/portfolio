<?php

namespace Webdevia\Main_Plugin;

class AdvancedFilters extends Module {

  public $endpoint;

  function __construct() {
    $this->load_dependencies();
    $this->admin_hooks();
    $this->public_hooks();

    //$this->get_products();
  }

  function load_dependencies() {   
    
    include_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/admin/custom-fields.php';
		CustomFields::instance();

    include_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/admin/field.php';
    include_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/admin/panel/panel.php';

    include_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/admin/metaboxes/custom-fields-metabox.php';
    include_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/admin/metaboxes/search-form-metabox.php';

    include_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/admin/post-types.php';
    require_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/includes/endpoint-advanced-search.php';
		$this->endpoint = new Endpoint_Advanced_Search();
    
		require_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/includes/endpoint-advanced-search-form.php';
		$this->endpoint = new Endpoint_Advanced_Search_Form();
		
    require_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/includes/endpoint-add-custom-field.php';
    $this->endpoint = new Endpoint_Add_Custom_Field();
		
    require_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/includes/endpoint-edit-custom-field.php';
    $this->endpoint = new Endpoint_Edit_Custom_Field();    
		
		require_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/includes/endpoint-get-custom-fields.php';
    $this->endpoint = new Endpoint_Get_Custom_Fields();
		
    require_once WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/includes/endpoint-delete-custom-field.php';
    $this->endpoint = new Endpoint_Delete_Custom_Field();

  }

  function admin_hooks() {
		add_action('admin_enqueue_scripts', [ $this, 'admin_enqueue_js_css' ] );
		add_action('saved_term', [ $this, 'admin_update_terms' ], 10, 4);
		add_action('edited_term', [ $this, 'admin_update_terms' ], 10, 4);
		add_action('delete_term', [ $this, 'admin_update_terms' ], 10, 4);

		$panel = Panel::instance();
		add_action('admin_menu', [ $panel, 'create_panel_page' ], 5 );
		add_action( 'admin_menu', array( $this, 'advanced_search_panel_page' ), 5 );
  }


  function public_hooks () {

    add_filter( 'template_include', [$this, 'advanced_search_template'] );
    add_action( 'the_content', [$this, 'advanced_search_page_content'] );

    //if( $this->is_advanced_search_page() ){
      add_action('wp_enqueue_scripts',    array($this,'enqueue_js_css'));
    //}
  }

	function advanced_search_panel_page() {
		add_submenu_page( WD_MAIN_PLUGIN_THEME_SLUG . '_theme_options', 'Advanced Search', 'Advanced Search', 'edit_theme_options', 'wdmp_dvanced_search', array( $this, 'advanced_search_panel_page_content' ) );
	}

	public function advanced_search_panel_page_content() { ?>
	  <div id="col-container" class="wp-clearfix product-box-designer" style="margin: 25px 15px;">
			<h2>Advanced Search Settings</h2>
			<?php if (isset($_POST) && !empty($_POST)) { ?>
        <div id="message" class="updated fade">
            <p> <?php echo esc_html__('Configuration updated!!', 'grbid'); ?> </p>
        </div>
        <?php
        $this->save_option($_POST);
			 } ?>

			<form method="POST" action="">
			<table class="form-table" role="presentation">
				<tbody>
				<tr>
					<th scope="row">
						<label for="advanced-search-form"><?php echo esc_html__('Search Form', 'webdevia-main-plugin'); ?></label>
					</th>
					<td>
						<select name="advanced-search-form">
						<?php 
						$wd_search_form_array = wdmp_get_posts_by_post_type('wd_search_form');
						$search_form_id = get_option( WD_MAIN_PLUGIN_SLUG .'advanced-search-form');
						if( is_array (  $wd_search_form_array ) ){
							foreach ( $wd_search_form_array as $key => $value ){
								echo "<option value='$value'";
								if( $search_form_id == $value){
									echo "selected";
								}
								echo ">$key</option>";
							}
						}
						wd_var_dump( $wd_search_form_array); ?>
						</select>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="item_per_page"><?php echo esc_html__('Product per page', 'webdevia-main-plugin'); ?></label>
					</th>
					<td>
						<input type="number" name="item_per_page" min="0" max="20" value="<?php echo get_option( WD_MAIN_PLUGIN_SLUG .'item_per_page'); ?>"/>
						<?php echo esc_html__('products', 'webdevia-main-plugin'); ?>
					</td>
				</tr>
				<tr>
					<th scope="row"><?php echo esc_html__('On click on search results item', 'webdevia-main-plugin'); ?></th>
					<td>
						<fieldset>
							<label for="open_in_new_tab">
								<input name="open_in_new_tab" type="checkbox" id="open_in_new_tab" <?php if( get_option( WD_MAIN_PLUGIN_SLUG .'open_in_new_tab') == 'on') echo 'checked'; ?>/>
								<?php echo esc_html__('Open prdouct in a new tab', 'webdevia-main-plugin'); ?></label>
						</fieldset>
					</td>
				</tr>

				</tbody>
			</table>
			<button type="submit" class="button success button-primary"><?php echo esc_html__('Update Options', 'webdevia-main-plugin'); ?></button>
		</div>
		<?php
	}
	private function save_option( $options ) {
		$option_value = "";
		foreach ($options as $option => $value) {
				if (is_array($value)) {
						foreach ($value as $suboption) {
								$option_value .= $suboption . ",";
						}
						update_option( WD_MAIN_PLUGIN_SLUG . $option, htmlentities(stripslashes(($option_value))));
						$option_value = "";
				} else {
						update_option( WD_MAIN_PLUGIN_SLUG . $option, htmlentities(stripslashes(($value))));
				}
		}
	}

  /**
   * Check if it's "add listing" page
   */
  public function is_advanced_search_page( ){
    $page_id = get_queried_object_id();
    $advanced_search_page = get_page_by_title('Advanced Search');
    if( isset( $_GET['post_id'] ) and ! empty( $_GET['post_id'] ) ) {
			$page_id = $_GET['post_id'];
		}else{
      $page_id = get_queried_object_id();
    }
		// page "Advanced Search" not found
		if ( !is_object($advanced_search_page) ){
			return false;
		}
    if( $page_id and ( $page_id == $advanced_search_page->ID ) ) {
      return true;
    }
    return false;
  }

  /** 
   * set a new page temlate for "add listin" page   * 
   * */
  function advanced_search_template( $original_template ) {  
    if( $this->is_advanced_search_page() ){
      return WD_MAIN_PLUGIN_PATH . 'modules/advanced-filters/templates/page-template.php';
    } else {
      return $original_template;
    }
  }

  function advanced_search_page_content( $content ){
    if( $this->is_advanced_search_page() ){
      $this->get_form_content();
    }
    return $content;
  }

  public function get_form_content() {
    include plugin_dir_path( __FILE__ ).'/templates/results.php';
  }

	function admin_enqueue_js_css($hook) {
		if(get_post_type(get_the_ID()) == 'product') {
			$bidpro_mapkey = wdmp_get_option('google_key_map');
			wp_enqueue_script('googlemapskey', "https://maps.googleapis.com/maps/api/js?key=".$bidpro_mapkey."&libraries=places&v=weekly", array('jquery'), '4.4.2', true);
		}
		
		/**Metaxonomy styles */
		wp_enqueue_style( 'metaxonomy_css', WD_MAIN_PLUGIN_URI . 'modules/advanced-filters/js/build/index.css', false);
		
		$customFields = CustomFields::instance();
		foreach (get_object_taxonomies( 'product', 'objects' ) as $key => $value) {
			$productsTaxonomies[] = [
				'id' => $key,
				'name' => $value->label,
				'type' => 'taxonomy'
			];
		}

		$search_form_array = [];
		$wd_search_forms = get_posts(array('post_type' => 'wd_search_form','itemperpage'   => '40'));
		foreach( $wd_search_forms as $post) {
			$search_form_array[] = [
				'label' => $post->post_title,
				'value' => $post->ID,
			];
		}

		wp_enqueue_script( 'custom_fileds_js', plugins_url("advanced-filters/admin/assets/js/admin_custom_fileds.js",__DIR__),array('jquery', 'wp-api-request' ),'',true);
		wp_localize_script( 'custom_fileds_js', 'devia', array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'home_url' => home_url(),
				'custom_fields' => array_merge( array_values( $customFields->fields ? $customFields->fields : [] ), $productsTaxonomies ),
				'search_forms' => $search_form_array
		) );

	}

    /**
   * Load css and scripts
   */
  function enqueue_js_css() {
		wp_enqueue_script('select2', plugins_url("advanced-filters/js/select2.full.min.js",__DIR__), array('jquery'));
		$bidpro_mapkey = wdmp_get_option('google_key_map');
		wp_enqueue_script('googlemapskey', "https://maps.googleapis.com/maps/api/js?key=".$bidpro_mapkey."&libraries=places&v=weekly", array('jquery'), '4.4.2', true);
		
		wp_enqueue_script( 'advanced-filters_js', plugins_url("advanced-filters/js/script.js",__DIR__),array('jquery', 'wp-api-request' ),'',true);
		wp_localize_script( 'advanced-filters_js', 'devia', array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'home_url' => home_url(),
		) );

  }

  public static function get_products( $filter_args ){
    ob_start(); ?>
		<div class="woocommerce">
			<?php
				$tax_query = [];
				$meta_query = [];

				// Taxonomy query
				if( !empty( $filter_args['taxonomy'] ) && is_array( $filter_args['taxonomy'] ) ) {
					foreach ( $filter_args['taxonomy'] as $taxonomy ){				
						if ( count( $taxonomy ) > 1 ) $tax_query[] = [ 'relation' => 'AND' ];		
						foreach ( $taxonomy as $key => $value ) {
							
							$content = is_array( $value ) ? $value[0] : $value;
							if (  $content != '' ) {
								$tax_query[] = array(
									'taxonomy'	=> $key,
									'field' 		=> 'slug',
									'terms'     => $value,
									'operator'  => 'IN'
								);
							}
						}
					}
				}

				// Meta query
				if( !empty( $filter_args['meta'] ) && is_array( $filter_args['meta'] ) ) {
					foreach ( $filter_args['meta'] as $key => $meta ){
						foreach ( $meta as $metakey => $value ) {
							if ( !empty( $value ) ) {
								$meta_query_min = [];
								$meta_query_max = [];
								if ( $key == 'min' && $value != '' ) {
									$meta_query_min = [
										'key'			=> $metakey,
										'type'		=> 'numeric',
										'value'		=> $value,
										'compare'	=> '>='
									];
								}
	
								if ( $key == 'max' && $value != '' ) {
									$meta_query_max = [
										'key'			=> $metakey,
										'type'		=> 'numeric',
										'value'		=> $value,
										'compare'	=> '<='
									];
								}
	
								if(!empty($meta_query_max)){
									$meta_query[] = [ $meta_query_max ];
								}
								
								if(!empty($meta_query_min)){
									$meta_query[] = [ $meta_query_min ];
								}
	
								if(!empty($meta_query_max) && !empty($meta_query_min)){
									$meta_query[] = [
										$meta_query_min,
										$meta_query_max,
										'relation'		=> 'AND' 
									];
								}
	
								if ( $key == 'autocomplete' && $value != '' ) {
									$location_info = json_decode( str_replace('\\', '', $value ) ) ;
									$meta_query[] = array([
											'key'		=> $metakey . '-city',
											'value'	=> $location_info->city
										],[
											'key'		=> $metakey . '-state',
											'value'	=> $location_info->state
										],[
											'key'		=> $metakey . '-country',
											'value'	=> $location_info->country
										],
										'relation'		=> 'AND' 
									);
								}

								if ( !in_array( $key, [ 'autocomplete', 'min', 'max' ] ) && !empty( $value ) ) {
									$meta_query[] = [ [
										'key'		=> $metakey,
										'value'	=> $value
									] ];
								}
							}
						}
					}
				}

				$args = array(
					'post_type'						=> 'product',
					'post_status'					=> 'publish',
					'ignore_sticky_posts'	=> 1,
					'posts_per_page'			=> 16,
					'meta_query'					=> $meta_query,
					'tax_query'						=> $tax_query
				);

				if( !empty( $filter_args['product_title'] ) ) {					
					$args['s'] = $filter_args['product_title'] ;
				}

				do_action( 'woocommerce_before_shop_loop' );
				woocommerce_product_loop_start();

				$loop = new \WP_Query( $args );
				while ( $loop->have_posts() ) : 
					$loop->the_post(); 
					global $product;

					/**
					 * Hook: woocommerce_shop_loop.
					 */
					do_action( 'woocommerce_shop_loop' );

					wc_get_template_part( 'content', 'product' );	
				endwhile;
				woocommerce_product_loop_end();
				do_action( 'woocommerce_after_shop_loop' );
				?>
		</div>
		<?php 
		return ob_get_clean();
  }

	public function admin_update_terms ($term_id, $tt_id, $taxonomy) {

		$term_meta = get_terms( [ 'taxonomy' => $taxonomy, 'hide_empty' => false ] );

		$search_forms = new \WP_Query( [
			'post_type'             => 'wd_search_form',
			'post_status'           => 'publish'
			]
		);

		if( $search_forms->have_posts() ) :
			while( $search_forms->have_posts() ) : $search_forms->the_post();
				$search_filters_array = json_decode( get_post_meta( get_the_ID(), 'wdmp_search_filters', TRUE ), true);
				
				foreach ( $search_filters_array["searchfileds"] as $key => $field) {
					if($field['type'] === 'taxonomy' && $field['taxonomy'] === $taxonomy) {
						$search_filters_array["searchfileds"][$key]['selectOptions'] = [];
						foreach ($term_meta as $term) {
							$search_filters_array["searchfileds"][$key]['selectOptions'][$term->slug] = $term->name;
						}
					}
				}
		
				update_post_meta( get_the_ID(), 'wdmp_search_filters', sanitize_text_field( json_encode( $search_filters_array ) ) );

			endwhile;
		endif;

		wp_reset_query();
	}
}


