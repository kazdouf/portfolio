<?php
namespace Webdevia\Main_Plugin;

if ( !class_exists('Devia_WooCommerce') ){
	class Devia_WooCommerce {

		public $Product_Card;

		function __construct() {
			if ( wd_is_active_plugin( 'woocommerce/woocommerce.php' ) ) {
				$this->Product_Card = new Devia_Product_Card();
				// Initialising
				add_action( 'before_woocommerce_init', [ $this, 'initialize' ] );
			}
		}

		function initialize() {
			$this->remove_default_hooks();
			$this->add_hooks();
		}

		function remove_default_hooks() {
      // remove produc thumbnail
      remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );

			remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 1 );
			remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10 );

			remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 5 );
			remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );
			
			remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
		}

		function add_hooks() {

			add_filter( 'post_class', [$this, 'add_product_custom_class' ]);

			if ( isset( $this->Product_Card->settings ) ) {
				add_action( 'woocommerce_before_shop_loop_item_title', [$this, 'loop_product_thumbnail'], 10 );
	
				if ( !$this->Product_Card->settings['hideContent'] ) {
					add_action( 'woocommerce_shop_loop_item_title', [$this, 'product_content'], 10 );
					add_action( 'woocommerce_shop_loop_item_title', [$this, 'product_bottom'], 10 );
					add_action( 'woocommerce_after_shop_loop_item_title', [$this, 'product_content_close'], 1 );
				}
			}

		}

		/**
		 * Add custom class "wd-product-box" to product li
		 */
		public function add_product_custom_class( $classes ) {
			// Not on single products
			if ( ( is_product() && isset($woocommerce_loop['name']) && ! empty($woocommerce_loop['name']) ) || ! is_product() ) {
				//only add these classes if we're on a product list loop.
				$classes = array_merge(['wd-product-box'], $classes);
			}
			return $classes;
		}

		function product_content() { ?>
			<div class="wd-product__content">
				<div class="wd-product__head">
          <?php 
            $this->Product_Card->get_before_title();	
            $this->Product_Card->get_title();	
            $this->Product_Card->get_after_title();	
          ?>
				</div>
        <?php $this->Product_Card->get_details();
		}
	
		function product_bottom() {
			echo '<div class="wd-product__bottom">';
				$this->Product_Card->get_bottom_left();		
				$this->Product_Card->get_bottom_right();	
			echo '</div>';	
		}
	
		function product_content_close() {
			// .wd-product__content close ?>
      </div> <?php
		}


    public function loop_product_thumbnail(){
      echo $this->Product_Card->product_cover();
    }


    function custom_single_product_template_include( $template ) {
      if ( is_singular('product') ) {
          $template = WD_MAIN_PLUGIN_PATH . 'modules/products-box-designer/public/content-single-product.php';
      } 
      return $template;
    }


	}

	$Devia_WooCommerce = new Devia_WooCommerce();

	$single_product_template_id = wdmp_get_option("custom_single_product");

	if( $single_product_template_id !== NULL) {
		add_filter( 'template_include', [$Devia_WooCommerce, 'custom_single_product_template_include'], 30 );
	}

}
