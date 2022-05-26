<?php

namespace Webdevia\Main_Plugin;

if ( ! defined('ABSPATH') ) {
	exit;
}

class Panel {

  use \Webdevia\Main_Plugin\Singleton;

  function __construct() {

  }


	function create_panel_page()	{	
		$callback = isset($_GET['action']) && $_GET['action'] === 'edit' ? 'edit_custom_fields_panel_page_content' : 'custom_fields_panel_page_content';
		add_submenu_page( WD_MAIN_PLUGIN_THEME_SLUG . '_theme_options', 'Custom Fields', 'Custom Fields', 'edit_theme_options', 'wdmp_custom_fields', [$this, $callback] );
	}

	public function edit_custom_fields_panel_page_content( ) {

		$id = isset($_GET['id']) ? $_GET['id'] : '';
		$customFields = CustomFields::instance();
		if ( !empty( $customFields->fields ) )
			foreach ($customFields->fields as $field) {
				if ($field->id === $id)
					$editField = $field;
			}

		?>

			<div id="col-container" class="wp-clearfix" style="margin: 25px 15px;">
				<h2>Edit <?= $editField->name?></h2>

					<form id="editCustomField" method="GET" action="">

						<input type="hidden" name="fieldId" value="<?= $editField->id?>">
						<input type="hidden" name="type" value="<?= $editField->type?>">
						<table class="form-table" role="presentation">
							<tbody>
							
								<tr class="form-field form-required term-name-wrap">
									<th scope="row">
										<label for="name"><?php echo esc_html__('Filed Name', 'webdevia-main-plugin') ?></label>
									</th>
									<td>
										<input name="name" id="name" type="text" size="40" aria-required="true" value="<?= $editField->name?>">
										<p class="description">The name is how it appears on products.</p>
									</td>
								</tr>
							
								<tr class="form-field form-required term-slug-wrap">
									<th scope="row">
										<label for="slug"><?php echo esc_html__('Filed slug', 'webdevia-main-plugin') ?></label>
									</th>
									<td>
										<input name="slug" id="slug" type="text" size="40" aria-required="true" value="<?= $editField->id?>">
										<p class="description">The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.</p>
									</td>
								</tr>

								<?php
								switch ( $editField->type ) {
									case 'taxonomy':
										?>
										<tr class="form-field term-displaytype-wrap">
											<th scope="row">
												<label for="displayType"><?php echo esc_html__('Display Type', 'webdevia-main-plugin') ?></label>
											</th>
											<td>
												<select name="displaytype" id="displaytype" class="postform">
													<option value="-1">None</option>
													<option value="select" <?= $editField->displaytype === 'select' ? 'selected' : '' ?> >Select</option>
													<option value="select2" <?= $editField->displaytype === 'select2' ? 'selected' : '' ?> >Select2</option>
													<option value="checklist" <?= $editField->displaytype === 'checklist' ? 'selected' : '' ?> >Checklist</option>
													<option value="radiobuttons" <?= $editField->displaytype === 'radiobuttons' ? 'selected' : '' ?> >Radio Buttons</option>
												</select>
												<p class="description">Assign a field type to customise appearance of the field like map selections or just a text field.</p>
											</td>
										</tr>

										<tr class="form-field term-parent-wrap">
											<th scope="row">
												<label for="parent"><?php echo esc_html__('Parent Field', 'webdevia-main-plugin') ?></label>
											</th>
											<td>
												<select name="parentField" id="parent" class="postform">
													<option value="-1">None</option>
													<?php
														if ( is_array( $customFields->fields ) ) {
															foreach ($customFields->fields as $field ) {
																if ( $field->storage == Field::storage_term ) {
																	$selected = $field->id == $editField->parentField ? 'selected' : '';
																	echo "<option value='$field->id' $selected >$field->name</option>";
																}
															}
														}
													?>
												</select>
												<p class="description">Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop and Big Band.</p>
											</td>
										</tr>
										<?php
										break;
									case 'number':
										?>
										<tr class="form-field term-displaytype-wrap">
											<th scope="row">
												<label for="displayType"><?php echo esc_html__('Display Type', 'webdevia-main-plugin') ?></label>
											</th>
											<td>
												<select name="displaytype" id="displaytype" class="postform">
													<option value="-1">None</option>
													<option value="real" <?= $editField->displaytype === 'real' ? 'selected' : '' ?> >Real Number</option>
													<option value="currency" <?= $editField->displaytype === 'currency' ? 'selected' : '' ?> >Currency</option>
												</select>
												<p class="description">Assign a field type to customise appearance of the field like map selections or just a text field.</p>
											</td>
										</tr>
										<?php
										break;
								}
								?>
							</tbody>
						</table>

						<div style="display: flex;  gap: 4rem;">

							<div class="form-field form-required term-name-wrap">
								<input type='checkbox' name='show_in_submission_form' id='show_in_submission_form' value="1" <?= $editField->show_in_submission_form ? 'checked' : '' ; ?> >	
								<label for="show_in_submission_form"><?php echo esc_html__('Show in Submission Form', 'webdevia-main-plugin') ?></label>		
							</div>
							
							<div class="form-field form-required term-name-wrap" style="display: <?= $editField->storage == Field::storage_term ? 'block' : 'none' ?>">
								<input type='checkbox' name='allow_multiple' id='allow_multiple' value="1" <?= $editField->allow_multiple ? 'checked' : '' ; ?> >
								<label for="allow_multiple"><?php echo esc_html__('Allow Multiple Values', 'webdevia-main-plugin') ?></label>			
							</div>
							
							<div class="form-field form-required term-name-wrap">	
								<input type='checkbox' name='required' id='required' value="1" <?= $editField->required ? 'checked' : '' ; ?> >
								<label for="required"><?php echo esc_html__('Required Field', 'webdevia-main-plugin') ?></label>
							</div>

						</div>

						<div class="edit-tag-actions" style="display: flex;">

							<input type="submit" class="button button-primary" value="Save" />
							<span id="delete-link">
								<a id="wdmpDeleteFieldEdit" class="wdmp-delete-field" href="#" data-field-id="<?= $editField->id?>" style="color: #b32d2e;">Delete <span class="spinner" style="margin:5px 10px"></span></a>
							</span>
							
							
						</div>

					</form>
			</div>

		<?php
	}

	public function custom_fields_panel_page_content( ) { ?>

		<?php
    	$customFields = CustomFields::instance(); ?>
		<style>
			.custom-fields * {
				margin: 15px;
			}
		</style>

		<div id="col-container" class="wp-clearfix" style="margin: 25px 15px;">
			<h2>Custom Fields List</h2>
			<div id="col-right">
				<div class="col-wrap">
					<table class="wp-list-table widefat fixed striped table-view-list pages" style="width: 90%; margin-inline: auto;">
						<thead>
							<th scope="col" class="manage-column"><b>Name</b></th>
							<th scope="col" class="manage-column"><b>Slug</b></th>
							<th scope="col" class="manage-column"><b>Type</b></th>

							<th scope="col" class="manage-column"><b>Display Type</b></th>
							<th scope="col" class="manage-column"><b>Parent Field</b></th>
							<th scope="col" class="manage-column"><b>Show in Submission Form</b></th>
							<th scope="col" class="manage-column"><b>Allow Multiple Values</b></th>
							<th scope="col" class="manage-column"><b>Required Field</b></th>
							<th scope="col" class="manage-column"><b>Actions</b></th>
						</thead>
						<tbody>
								<?php	
									if ( is_array( $customFields->fields ) ) {
										foreach ($customFields->fields as $field ){
											echo'<tr class="iedit author-self level-0 hentry">';
												echo '<td class="column-primary">'.$field->name.'</td>';
												echo '<td class="column-primary">'.$field->id.'</td>';
												echo '<td class="column-primary">'.$field->type.'</td>';
												echo '<td class="column-primary">'.$field->displaytype.'</td>';
												echo '<td class="column-primary">'.$field->parentField.'</td>';
												echo '<td class="column-primary">'.$field->show_in_submission_form.'</td>';
												echo '<td class="column-primary">'.$field->allow_multiple.'</td>';
												echo '<td class="column-primary">'.$field->required.'</td>';
												echo '<td class="column-primary" style="display: flex; gap: 1rem;">
														<form action="" method="GET">
															<label for="edit">
																<a href="?page=wdmp_custom_fields&action=edit&id='.$field->id.'" class="wdmp-edit-field">Edit</a>
															</label>
															<input id="edit" class="form-control" name="edit" hidden />
														</form>
														<a href="#" class="wdmp-delete-field" data-field-id="'.$field->id.'" style="display:flex;align-items: center;color: #b32d2e">Delete <span class="spinner" style="margin:0 10px"></span></a>
													</td>';
											echo '</tr>';

											//echo "<li><span>$field->id</span><span>$field->name</span><span>$field->type</span></li>";
										}
									}
								?>
						</tbody>
					</table>
				</div>
			</div>

			<div id="col-left">
				<div class="col-wrap">	
					<div class="form-wrap">	
						<h2>Add New Custom Fields</h2>
						<form action="" method="get" class="add_new_custom_field" id="add_new_custom_field">

							<div class="form-field form-required term-name-wrap">
								<label for="name"><?php echo esc_html__('Field Name', 'webdevia-main-plugin') ?></label>
								<input type="text" name='name' id='name' required />
								<p>The name is how it appears on products.</p>
							</div>

							<div class="form-field form-required term-name-wrap">
								<label for="slug"><?php echo esc_html__('Slug', 'webdevia-main-plugin') ?></label>
								<input type="text" name='slug' id='slug' />
								<p>The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.</p>
							</div>

							<div style="display: flex;  gap: 4rem;">
								<div class="form-field form-required term-name-wrap">
									<label for="type"><?php echo esc_html__('Field type', 'webdevia-main-plugin') ?></label>
									<select name='type' id='type'>
										<option value="text">Text</option>
										<option value="number">Number</option>
										<option value="url">Embed</option>
										<option value="taxonomy">Taxonomy</option>
										<option value="location">Location</option>
										
								</select>	
								</div>
								
								<div class="form-field form-required term-name-wrap" id="displayTypeWrapp" hidden>
									<label for="displaytype"><?php echo esc_html__('Field Display Type', 'webdevia-main-plugin') ?></label>
									<select name='displaytype' id='displaytype'></select>
								</div>					
								
								<div class="form-field form-required term-name-wrap" id="parentFieldWrapp" hidden>
									<label for="parentField"><?php echo esc_html__('Parent Field', 'webdevia-main-plugin') ?></label>
									<select name='parentField' id='parentField' >
										<option value="">Select parent</option>
										<?php
											if ( is_array( $customFields->fields ) ) {
												foreach ($customFields->fields as $field ) {
													if ( $field->storage == Field::storage_term )
														echo "<option value='$field->id'>$field->name</option>";
												}
											}
										?>
									</select>
								</div>
							</div>
							
							<div style="display: flex;  gap: 4rem;">
								<div class="form-field form-required term-name-wrap">
									<input type='checkbox' name='show_in_submission_form' id='show_in_submission_form' value='1' >	
									<label for="show_in_submission_form"><?php echo esc_html__('Show in Submission Form', 'webdevia-main-plugin') ?></label>		
									</div>
								
								<div class="form-field form-required term-name-wrap" style="display: none">
									<input type='checkbox' name='allow_multiple' id='allow_multiple' value='1' >
									<label for="allow_multiple"><?php echo esc_html__('Allow Multiple Values', 'webdevia-main-plugin') ?></label>			
									</div>
								
								<div class="form-field form-required term-name-wrap">	
									<input type='checkbox' name='required' id='required' value='1' >
									<label for="required"><?php echo esc_html__('Required Field', 'webdevia-main-plugin') ?></label>
								</div>
							</div>

							<p class="submit" style="display: flex; align-items: center; gap: 0.5rem;">
								<input type="submit" class="button button-primary" value="<?php echo esc_html__('Add New Filed', 'webdevia-main-plugin') ?>" />
								<span class="spinner" style="margin:0 10px"></span>
							</p>
						</form>
					</div>	
				</div>
			</div>
		</div>


	<?php	
		//wdmp_dsm( $customFields->fields );

	}

}