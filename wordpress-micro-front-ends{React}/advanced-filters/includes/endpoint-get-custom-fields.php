<?php

namespace Webdevia\Main_Plugin;

if ( ! defined('ABSPATH') ) {
	exit;
}

class Endpoint_Get_Custom_Fields {

	public $action = 'wd_get_custom_fields';

	public function __construct() {
		add_action('rest_api_init', 
			function () {
				register_rest_route( 'wdmp/v1', 'get-custom-fields',array(
									'methods'  => 'GET',
									'callback' => [$this, 'wd_get_custom_fields'],
									'permission_callback' => '__return_true'
				));
			});
	}

	public function wd_get_custom_fields() {

		$customFields = CustomFields::instance();

		wp_send_json( $customFields->fields );

	}

}
