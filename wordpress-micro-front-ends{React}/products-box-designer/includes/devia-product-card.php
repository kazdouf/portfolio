<?php

namespace Webdevia\Main_Plugin;

class Devia_Product_Card {

	use \Webdevia\Main_Plugin\Singleton;

	public $settings;

	function __construct( ) {
		$this->load_settings();
	}

	public function load_settings() {
		
		$wdmp_product_box_display_json = json_decode( get_option( 'wdmp_product_box_display_settings'), true );
		$this->settings = $wdmp_product_box_display_json;
	}

	public function save_settings() {
		
	}

	public function product_cover(){

		global $product;
		$product_obj = get_post( $product );
		$link = apply_filters( 'woocommerce_loop_product_link', get_the_permalink(), $product );
		switch ( $this->settings['coverType'] ){
			case 'image':
					echo '<a href="' . esc_url( $link ) . '" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">' .
					woocommerce_get_product_thumbnail() .
					'</a>';
				break;

			case 'slide':
					$product_obj = json_decode($product-> __toString());
					$product_obj->img_src = wp_get_attachment_image_src($product_obj->image_id, 'woocommerce_thumbnail')[0];
					$images_ids = $product-> get_gallery_image_ids();
					$images_arr = [];
					$img = new \StdClass;
					foreach ( $images_ids as $id ) {
						$image_query = wp_get_attachment_image_src($id, 'woocommerce_thumbnail');
						$img->src = $image_query[0];
						array_push($images_arr, $img);
					}
          $img->src = $product_obj->img_src;
					array_push($images_arr, $img);
					echo '<div class="swiper">
									<div class="swiper-wrapper">';
					foreach($images_arr as $image)
						echo '<div class="swiper-slide">
								<a href="' . get_permalink( $product->get_id() ) . '"><img class="" src="' . $image->src . '" style="width:100%" /></a>
						</div>';
					echo '</div>
							<div class="swiper-pagination"></div>
						</div>';
					
				break;

			case 'author':
					echo '<a href="' . get_the_author_meta( 'url', $product_obj->post_author ) . '">
						<div class="product-box__author" >
							<img src="' . get_avatar_url(get_the_author_meta( 'ID', $product_obj->post_author )) . '" class="product-box__avatar" alt="Avatar" />
							<div class="product-box__header-info">
								<h3 class="product-box__display-name">'.get_the_author_meta( 'display_name' , $product_obj->post_author ).'</h3>
								<span class="product-box__email">' . get_the_author_meta( 'user_email' , $product_obj->post_author ) . '</span>
							</div>
						</div>
					</a>';
				break;

			default:
				return false;
		}
	}

	public function get_before_title() {

		global $product; ?>
		<div class="wd-product__before-title">
		<?php

		if( is_array( $this->settings['beforeTitle'] ) ){
			foreach( $this->settings['beforeTitle'] as $beforeTitle ){
				switch ( $beforeTitle['type'] ){

					case 'title': 
						echo str_replace( '{field}',  $product->get_title(), $beforeTitle['displayText'] );
						break;

					case 'category':
							echo wc_get_product_category_list( $product->get_id(), ', ', '<span class="product_item_details__meta">', '.</span>' );
						break;

					case 'taxonomy':  
							$this->taxonomy_html($product->get_id(), $beforeTitle['slug'], $beforeTitle['displayText']);
						break;

					case 'countdown':
							woocommerce_auction_countdown();
						break;

					case 'author':
							$product_obj = get_post( $product );
							echo str_replace( '{field}', get_the_author_meta( $beforeTitle['slug'] , $product_obj->post_author ), $beforeTitle['displayText'] );
						break;

					default:
						$this->meta_html($product->get_id(), $beforeTitle['slug'], $beforeTitle['displayText']);
						break;

				}
			}
		}
		?>
		</div>
		<?php

	}


	public function get_title() {
		global $product; ?>
		<div class="wd-product__title">
		<?php

		switch ( $this->settings['title']['type'] ){

			case 'title': 
					echo '<h2><a href="' . get_permalink( $product->get_id() ) . '">' . $product->get_title() . '</a></h2>';
				break;

			case 'short-description': 
					echo '<h2>
						<a href="' . get_permalink( $product->get_id() ) . '">' . 
							str_replace( '{field}', $product->get_short_description(), $this->settings['title']['displayText'] ) . 
						'</a>
					</h2>';
				break;

			case 'address': 
					$post_id = $product->get_id();
					$adresses = '';
					$customFields = CustomFields::instance();
					if ( !empty( $customFields->fields ) )
						foreach ($customFields->fields as $field ) {
							if ( $field->storage === 'location' ) {
								$locations[] = $field;
							}
						}
					if ( count( $locations ) > 1 )
						foreach( $locations as $location ) {
							if ( get_post_meta( $post_id, $location->id . '-lat', true ) )
								$adresses .= $location->name . ': ' . get_post_meta($post_id, $location->id . '-city', true) . ' ' . get_post_meta($post_id, $location->id . '-state', true) . ' ' . get_post_meta($post_id, $location->id . '-country', true) . '</br>';
						}
					else {
						if ( get_post_meta($post_id, $locations[0]->id . '-lat', true) )
							$adresses = get_post_meta($post_id, $locations[0]->id . '-city', true) . ' ' . get_post_meta($post_id, $locations[0]->id . '-state', true) . ' ' . get_post_meta($post_id, $locations[0]->id . '-country', true) . '</br>';
					}
					echo '<h2>
						<a href="' . get_permalink( $product->get_id() ) . '">' . $adresses . '</a>
					</h2>';
				break;

			case 'meta':
					echo '<h2>
						<a href="' . get_permalink( $product->get_id() ) . '">' . 
							$this->meta_html($product->get_id(), $this->settings['title']['slug'], $this->settings['title']['displayText']) . 
						'</a>
					</h2>';
				break;

			default:
				break;

		}
		?>
		</div>
		<?php
	}

	public function get_after_title() {
		 global $product; ?>
		<div class="wd-product__after-title">
		<?php
		if( is_array( $this->settings['afterTitle'] ) ){
			foreach( $this->settings['afterTitle'] as $afterTitle ){
				switch ( $afterTitle['type'] ){

					case 'title':
						echo str_replace( '{field}',  $product->get_title(), $afterTitle['displayText'] );
						break;

					case 'taxonomy': 
							$this->taxonomy_html($product->get_id(), $afterTitle['slug'], $afterTitle['displayText']);
						break;

					case 'countdown':
						woocommerce_auction_countdown();
					break;

					case 'author':
						$product_obj = get_post( $product );
						echo str_replace( '{field}', get_the_author_meta( $afterTitle['slug'] , $product_obj->post_author ), $afterTitle['displayText'] );
					break;

					default:
						$this->meta_html($product->get_id(), $afterTitle['slug'], $afterTitle['displayText']);
						break;

				}
			}
		}
		?>
		</div>
		<?php

	}

	public function get_details() {
		global $product; ?>
			<div class="wd-product__details">
			<?php
			if( is_array( $this->settings['details'] ) ){
				foreach( $this->settings['details'] as $details ){
					switch ( $details['type'] ){

						case 'short-description':
							echo '<div>' . str_replace( '{field}', $product->get_short_description(), $details['displayText'] ) . '</div>';
							break;
			
						case 'description':
							echo '<div>' . str_replace( '{field}', $product->get_description(), $details['displayText'] ) . '</div>';
							break;
			
						case 'taxonomy': 
								$this->taxonomy_html($product->get_id(), $details['slug'], $details['displayText']);
							break;

						case 'countdown':
							woocommerce_auction_countdown();
						break;

						case 'author':
							$product_obj = get_post( $product );
							echo str_replace( '{field}', get_the_author_meta( $details['slug'] , $product_obj->post_author ), $details['displayText'] );
						break;
			
						default:
							$this->meta_html($product->get_id(), $details['slug'], $details['displayText']);
							break;
			
					}
				}
			}
			?>
		</div>
		<?php
	}

	public function get_bottom_left() { ?>
		<div class="wd-product__bottom-left">
			<?php
			global $product;
			switch ( $this->settings['bottom']['left']['slug'] ){

				case 'all':
					echo '<div>' . $product->get_price_html() . '</div>';
					woocommerce_template_loop_add_to_cart();
					break;
	
				case 'add-to-cart': 
					woocommerce_template_loop_add_to_cart();
					break;
	
				case 'price':
					echo '<div>' . $product->get_price_html() . '</div>'; //TODO: get the right price
					break;
	
				default:
					break;
	
			}		
			?>
		</div>
		<?php
	}	
	
	public function get_bottom_right() { ?>
		<div class="wd-product__bottom-right">
			<?php
			global $product;
			switch ( $this->settings['bottom']['right']['slug'] ){

				case 'all':
					echo '<div>' . $product->get_price_html() . '</div>';
					woocommerce_template_loop_add_to_cart();
					break;
	
				case 'add-to-cart': 
					woocommerce_template_loop_add_to_cart();
					break;
	
				case 'price':
					echo '<div>' . $product->get_price_html() . '</div>'; //TODO: get the right price
					break;
	
				default:
					break;
	
			}			
			?>
		</div>
		<?php
	}
	
	private function taxonomy_html($product_id, $slug, $display_text) {
		
		$terms = get_the_terms( $product_id, $slug);
		if ( $terms && empty( $terms->errors ) ) {
			$terms_string = '';
			foreach ($terms as $key => $term) {
				$terms_string .= $term->name;
				$terms_string .= strpos($slug, 'price') ? ($key + 1 == count($terms) ? ' $' : ' $ - ') : ($key + 1 == count($terms) ? '' : ', ');
			}
			echo '<div>' . str_replace( '{field}', $terms_string, $display_text ) . '</div>';
		}
	}

	private function meta_html($product_id, $slug, $display_text) {

		$meta_values = get_post_meta( $product_id, $slug);
		if ( !empty( $meta_values ) ){
			$meta_string = '';
			foreach ($meta_values as $key => $meta_value) {
				$meta_string .= $meta_value;
				$meta_string .= strpos($slug, 'price') ? ($key + 1 == count($meta_values) ? ' $' : ' $ - ') : ($key + 1 == count($meta_values) ? '' : ', ');
			}
			echo '<div>' . str_replace( '{field}', $meta_string, $display_text ) . '</div>';
		}
	}

}
