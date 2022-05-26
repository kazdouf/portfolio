<?php

namespace Webdevia\Main_Plugin;

class ProductsBoxDesigner extends Module {

	public $endpoint;

	function __construct() {
		$this->load_dependencies();
		$this->admin_hooks();
		$this->public_hooks();

		// $this->get_products();
	}

	function load_dependencies() {

		include_once WD_MAIN_PLUGIN_PATH . 'modules/products-box-designer/includes/devia-product-card.php';
		include_once WD_MAIN_PLUGIN_PATH . 'modules/products-box-designer/includes/woocommerce.php';
		include_once WD_MAIN_PLUGIN_PATH . 'modules/products-box-designer/admin/post-types.php';
		include_once WD_MAIN_PLUGIN_PATH . 'modules/products-box-designer/admin/vc_elements.php';

	}

	function admin_hooks() {
		add_filter( 'devia_add_theme_options', array( $this, 'devia_add_extra_options' ) );
		add_action( 'admin_menu', array( $this, 'create_panel_page' ), 5 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );

		add_action( 'admin_bar_menu', [ $this, 'admin_menu_edit_product_template' ], 999 );
	}


	function public_hooks() {

	}

	function admin_enqueue_scripts() {
		wp_enqueue_script( 'wdmp-react-products-box-designer-js', WD_MAIN_PLUGIN_URI . 'modules/products-box-designer/js/build/index.js', [ 'jquery', 'wp-element' ] );		
		wp_enqueue_style( 'wdmp-react-products-box-designer-css', WD_MAIN_PLUGIN_URI . 'modules/products-box-designer/js/build/style-index.css', false);
	}

	
	/**
 * @param WP_Admin_Bar $wp_admin_bar
 */
	public function admin_menu_edit_product_template( $wp_admin_bar ) {
		if ( ! is_object( $wp_admin_bar ) ) {
			global $wp_admin_bar;
		}

		$single_product_template_id = wdmp_product_custom_layout_id(get_the_ID()); 
		if( $single_product_template_id !== NULL) {
			if ( is_singular( 'product' ) ) {			
				$wp_admin_bar->add_menu( array(
					'id' => 'wd_edit_product_template',
					'title' => esc_html__( 'Edit with Product Template', 'webdevia-main-plugin' ),
					'href' => get_edit_post_link( $single_product_template_id ), //self::getInlineUrl(),
				) );			
			}
		}
	}

	function create_panel_page() {
		add_submenu_page( WD_MAIN_PLUGIN_THEME_SLUG . '_theme_options', 'Product Box', 'Product Box', 'edit_theme_options', 'wdmp_product_box', array( $this, 'product_box_panel_page_content' ) );
	}

	public function product_box_panel_page_content() {
		if ( isset( $_POST['wdmp_product_box_display_settings'] ) ) {
			$data = str_replace('\\', '', $_POST['wdmp_product_box_display_settings'] );
			update_option( 'wdmp_product_box_display_settings', $data );
		}

		$data = get_option( 'wdmp_product_box_display_settings');
		
		$customFields = CustomFields::instance();
		foreach (get_object_taxonomies( 'product', 'objects' ) as $key => $value) {
			$productsTaxonomies[] = [
				'id' => $key,
				'name' => $value->label
			];
		}

		$metaFields = [
			[
				'id'		=> 'description',
				'type'	=> 'description',
				'name'	=> 'Description'
			],[
				'id'		=> 'short-description',
				'type'	=> 'short-description',
				'name'	=> 'Short Description'
			],[
				'id'		=> 'display_name',
				'type'	=> 'author',
				'name'	=> 'Display Name'
			],[
				'id'		=> 'title',
				'type'	=> 'title',
				'name'	=> 'Title'
			]
		];

		if ( class_exists( 'WooCommerce' ) ) {
			$metaFields = array_merge( $metaFields, [
				[
					'id' => '_regular_price',
					'type'	=> 'meta',
					'name' => 'Regular price'
				],[
					'id' => '_sale_price',
					'type'	=> 'meta',
					'name' => 'Sale price'
				],[
					'id' => '_price',
					'type'	=> 'meta',
					'name' => 'Price'
				]
			] );
		}

		if ( class_exists( 'WooCommerce_simple_auction' ) ) {
			$metaFields = array_merge( $metaFields, [
				[
					'id' => '_auction_start_price',
					'type'	=> 'meta',
					'name' => 'Auction start price'
				],[
					'id' => '_auction_reserved_price',
					'type'	=> 'meta',
					'name' => 'Auction reserved price'
				],[
					'id' => 'countdown',
					'type'	=> 'countdown',
					'name' => 'Countdown'
				]
			] );
		}

		$buildin_fields = array_merge( $metaFields, $productsTaxonomies );

		?>
		
		<div id="wdmp_products-box-designer_root"></div>
		<input id="taxonomies" type="text" value='<?= json_encode( $buildin_fields ) ?>' hidden />
		<input id="customFields" type="text" value='<?= json_encode( array_values( $customFields->fields ? $customFields->fields : [] ) ) ?>' hidden />
		
		<form name="productsBoxDisplaySettingsForm" action="" method="post">
			<input id="wdmp_product_box_display_settings" type="text" name="wdmp_product_box_display_settings" value='<?= $data ?>' hidden />
		</form>
			
		<?php
	}

	function devia_add_extra_options( $theme_options ) {
		$default_template  = array( 'Default' => '' );
		$products_template = array_merge( $default_template, wdmp_get_posts_by_post_type( 'wd_product_template' ) );

		$theme_options['Shop Settings']['fields'][] = array(
			'label'         => esc_html__( 'Custom Single Product Page Layout', 'grbid' ),
			'id'            => 'custom_single_product',
			'type'          => 'dropdown',
			'defaultValue'  => $products_template,
			'parentSection' => 'Shop Settings',
			'group'         => 'Shop Page settings',
			'description'   => esc_html__( '', 'grbid' ),
		);

		return $theme_options;
	}
}