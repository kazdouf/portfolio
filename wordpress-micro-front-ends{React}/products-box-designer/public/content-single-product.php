<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header( 'shop' ); ?>
<?php if(wdmp_get_option('single_product_titlebar', 'on') == 'on') {
	?>
	<section class="titlebar">
    <div class="row">
      <div class="large-12 columns">
        <h1 id="page-title" class="title"><?php woocommerce_page_title(); ?></h1>
      </div>
    </div>
  </section>
	<?php
}
?>

<div class="has-p clearfix <?php echo (wdmp_get_option('single_product_titlebar', 'on') == 'on') ? '' : ' wc-without-titlebar'; ?>">
    <div class="has-images <?php echo wdmp_get_option('single_product_style', WD_SINGLE_PRODUCT_STYLE) ?>">
		<?php
	    /**
	     * woocommerce_before_main_content hook.
	     *
	     * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
	     * @hooked woocommerce_breadcrumb - 20
	     */
	    do_action( 'woocommerce_before_main_content' );
	    ?>
				<?php

					if(post_password_required()) {
						echo get_the_password_form();
						return;
					} 

					while(have_posts()) : the_post();

						do_action( 'woocommerce_before_single_product' );

						?>
						<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>
						<?php	
							$bidpro_template_id = wdmp_product_custom_layout_id(get_the_ID()); 
							if ( has_blocks((int)wdmp_get_option("custom_single_product")) ) {
								global $wp_embed;
								echo $wp_embed->autoembed( do_blocks(get_the_content(null, false, $bidpro_template_id)) );
							}else{
								echo do_shortcode(get_the_content(null, false, $bidpro_template_id));
							}
								

						?>
						</div>					
						<?php

					endwhile;
					do_action( 'woocommerce_after_main_content' );
				?>
				</div>

    </div>
  <!-- /content  -->

<?php get_footer( 'shop' );