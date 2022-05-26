<?php get_header(); ?>
  
  <main class="l-main align-center add-listing-page shop-main-content" style="padding-top: 120px;">
    <div class="advanced-filters-form" style="width: 100%;">
      <?php
      include plugin_dir_path( __FILE__ ).'/form.php';
      ?>
    </div>
    <div id="advancedFiltersContent" class="advanced-filters-content row">
      <?php
      echo \Webdevia\Main_Plugin\AdvancedFilters::get_products( $_GET );
     // echo do_shortcode('[products limit="12" columns="4"]'); ?>
    </div>
  </main>
  <!-- /content  -->

<?php get_footer(); ?>