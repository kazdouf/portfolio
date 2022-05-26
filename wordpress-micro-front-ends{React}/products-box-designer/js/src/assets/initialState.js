const initialState = {
	"coverType": "image",
	"hideContent": false,
	"beforeTitle": [
		{
			"type": "meta",
			"slug": "_price",
			"displayText": "{field}"
		}
	],
	"title": {
		"type": "title",
		"displayText": "{field}"
	},
	"afterTitle": [
		{
			"type": "taxonomy",
			"slug": "product_cat",
			"displayText": "{field}"
		}
	],
	"details": [
		{
			"type": "short-description",
			"slug": "short-description",
			"displayText": "{field}"
		}
	],
	"bottom": {
		"left": {
			"slug": "price"
		},
		"right": {
			"slug": "add-to-cart"
		}
	}
}


export default initialState