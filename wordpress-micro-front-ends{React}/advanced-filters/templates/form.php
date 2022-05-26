<form action="wd_advanced_search" id="wd-advanced-search-form">
<?php

  $search_form_ID = get_option( WD_MAIN_PLUGIN_SLUG .'advanced-search-form', 0);
  if ( $search_form_ID ) {
    $wdmp_search_filters = get_post_meta( $search_form_ID, 'wdmp_search_filters', TRUE);
    $formFields = $wdmp_search_filters != '' ? json_decode( $wdmp_search_filters ) : NULL;
  
    echo '<div class="row">';
    if( is_object($formFields) ){
      foreach ($formFields->searchfileds as $formField) {
        if ( $formField->type == 'group' ) {
          ?>
            <div class="wd-form-group wd-form-metagroup wd-group-popover" style="border: solid var(--gray-4-color) 1px;">
          
              <label class="wd-group-popover__label" for="<?= $formField->id ?>"><?= $formField->name ?></label>
              <div class="wd-group-popover__container group">
                <?php 
                  foreach ($formField->fields as $groupField) {
                    show_field( $groupField, true );
                  }
                ?>
              </div>
    
            </div>
          <?php
        } else show_field( $formField, false );
      }
    }
  } else {
    ?>
      <div class="wd-srch-frm__error-msg" style="border: solid var(--gray-4-color) 1px;">
        you need to select a filters form settings to be shown, you can select one it by clicking <a href="<?= home_url()?>/wp-admin/admin.php?page=wdmp_dvanced_search">here</a>.
      </div>
    <?php
  }

  function show_field( $field, $group ) {
    switch ($field->displayType) {
      case "text": ?>
          <div class="wd-form-group" style="border: solid var(--gray-4-color) 1px;">
            <input type="text" name="<?= "$field->type[text][$field->key]" ?>" id="<?php echo $field->id ?>" placeholder="<?php echo $field->name ?>" />
          </div>
        <?php
        break;

      case "autocomplete": ?>
          <div class="wd-auto-complete" style="border: solid var(--gray-4-color) 1px;">
            <input type="text" id="<?php echo $field->key ?>" placeholder="<?php echo $field->name ?> by City" />
            <input type="text" id="autocompleteValueInput" name="<?php echo "$field->type[autocomplete][$field->key]"; ?>" style="display:none" hidden />
          </div>
        <?php
        break;
  
      case "select": ?>
          <div class="wd-form-group" style="border: solid var(--gray-4-color) 1px;">
  
            <label class="wd-select__label" data-labeltext="<?php // echo $field->name ?>" for="<?php echo $field->taxonomy ?>"><?php // echo $field->name ?></label>
            <select id="<?php echo $field->taxonomy ?>" class="wd-select wd-select-one" name="<?php echo "$field->type[$field->order][$field->taxonomy]"; ?>" >
              <option value=""><?php echo $field->name ?> (All)</option>
              <?php
                foreach ( $field->selectOptions as $taxonomy => $value ){
                  echo '<option value="' .$taxonomy. '" >' . $value . '</option>';
                }
              ?>
            </select>
  
          </div>
        <?php
        break;
  
      case "select2": ?>
          <div class="wd-form-group" style="border: solid var(--gray-4-color) 1px;">
  
            <label class="multi-select-label" data-labeltext="<?php echo $field->name ?>" for="<?php echo $field->taxonomy ?>"><?php echo $field->name ?></label>
            <select class="wd-multi-select <?= $group ? 'group' : '' ?>" name="<?php echo "$field->type[$field->order][$field->taxonomy]"; ?>[]" id="<?php echo $field->taxonomy ?>"  multiple="multiple">
              <?php
                foreach ( $field->selectOptions as $taxonomy => $value ){
                  echo '<option value="' .$taxonomy. '"  >' . $value . '</option>';
                }
              ?>
            </select>
  
          </div>
        <?php
        break;
  
      case "checkbox": ?>
          <div class="wd-form-group" style="border: solid var(--gray-4-color) 1px;">
  
            <label for="<?php echo $field->id ?>"><?php echo $field->name ?></label>
            <input type="checkbox" name="favorite_pet" value="Cats">Cats<br> 
  
            <select name="<?php echo "$field->type[$field->order][$field->key]"; ?>" id="<?php echo $field->id ?>">
              <option value="">All</option>
              <?php
                foreach ( $field->selectOptions as $key => $value ){
                  echo '<option value="' .$key. '" >' . $value . '</option>';
                }
              ?>
            </select>
  
          </div>
        <?php
        break;
  
      case "range": ?>
          <div class="wd-form-group wd-form-multi wd-popover <?= $group ? 'group' : '' ?>" style="border: <?= !$group ? 'solid var(--gray-4-color) 1px;' : 'none;' ?>">
  
            <label data="<?= $field->name ?>" for="<?php echo $field->id ?>"><?php echo $field->name ?></label>
            <div class="wd-popover__container" >
              <input id="<?php echo $field->id ?>min" type="number" name="<?php echo "$field->type[min][$field->key]"; ?>" placeholder="min" />
              <input id="<?php echo $field->id ?>max" type="number" name="<?php echo "$field->type[max][$field->key]"; ?>" placeholder="max" />
            </div>
  
          </div>
        <?php
        break;
    }  
  }
    

?>

  </div>

</form>