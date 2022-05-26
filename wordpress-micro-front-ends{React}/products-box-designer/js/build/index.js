/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/initialState.js":
/*!************************************!*\
  !*** ./src/assets/initialState.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const initialState = {
  "coverType": "image",
  "hideContent": false,
  "beforeTitle": [{
    "type": "meta",
    "slug": "_price",
    "displayText": "{field}"
  }],
  "title": {
    "type": "title",
    "displayText": "{field}"
  },
  "afterTitle": [{
    "type": "taxonomy",
    "slug": "product_cat",
    "displayText": "{field}"
  }],
  "details": [{
    "type": "short-description",
    "slug": "short-description",
    "displayText": "{field}"
  }],
  "bottom": {
    "left": {
      "slug": "price"
    },
    "right": {
      "slug": "add-to-cart"
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (initialState);

/***/ }),

/***/ "./src/components/field-card.js":
/*!**************************************!*\
  !*** ./src/components/field-card.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/GlobalState */ "./src/context/GlobalState.js");




const FieldCard = props => {
  var _customFields$filter$;

  const {
    fieldCard,
    position,
    customFields,
    index
  } = props;
  const {
    removeField,
    toggleForm
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useUpdateContext)(); // let [ cardField, setCardField ] = useState( fieldCard )
  // useEffect(() => {
  // 	setCardField( { fieldCard } )
  // }, [cardField])

  const handleSelectChange = e => {
    const value = JSON.parse(e.target.value);
    setCardField({ ...fieldCard,
      id: value.id,
      type: value.type
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__head"
    /* onClick={ toggleForm } */

  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-arrow-right-alt2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__type"
  }, fieldCard.type), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__name"
  }, (_customFields$filter$ = customFields.filter(field => field.id == fieldCard.slug)[0]) === null || _customFields$filter$ === void 0 ? void 0 : _customFields$filter$.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "metaxonomy__card__remove",
    onClick: e => removeField({
      position: position,
      id: index
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    class: "dashicons dashicons-trash"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__fields"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Field"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__taxonomy__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "customFormat",
    className: "wd-box-designer__add-form__custom-fields",
    value: JSON.stringify({
      id: fieldCard.slug,
      type: fieldCard.type
    }),
    onChange: e => handleSelectChange(e)
  }, customFields.map(customField => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: JSON.stringify({
      id: customField.id,
      type: customField.type
    })
  }, customField === null || customField === void 0 ? void 0 : customField.name))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "metaxonomy__field__label",
    style: {
      display: 'block'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    className: "wd-box-designer__add-form__custom-format__check-box"
    /* onClick={ e => handleCustomFormatCheck(e) } */

  }), " Custom Format"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__name__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "customFormatText",
    className: "wd-box-designer__add-form__custom-format__text",
    hidden: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text"
    /* value={ customFormatField.displayText } */

    /* onChange={ e => handleInputChange( e ) } */

  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-box-designer__add-form__custom-format__text__hint"
  }, 'hint: something {field} something else.')))))));
};

/* harmony default export */ __webpack_exports__["default"] = (FieldCard);

/***/ }),

/***/ "./src/components/leftCol.js":
/*!***********************************!*\
  !*** ./src/components/leftCol.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./options */ "./src/components/options.js");
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/GlobalState */ "./src/context/GlobalState.js");





const LeftCol = props => {
  const {
    customFields
  } = props;
  const {
    editField
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_3__.useUpdateContext)();
  const {
    state
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_3__.useGlobalContext)();
  let [coverType, setCoverType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('image');

  const handleChange = e => {
    if (e.target.name === "coverType") setCoverType(e.target.value);
    editField({
      position: e.target.name,
      value: e.target.value
    });
  };

  const handleCheckboxChange = e => {
    if (e.target.name === "hideContent") editField({
      position: e.target.name,
      value: e.target.checked
    });
  };

  const handleSave = e => {
    e.preventDefault();
    document.forms.productsBoxDisplaySettingsForm.submit();
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "product-box-designer__left-col"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-field form-required term-name-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "coverType"
  }, "Cover Type"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "coverType",
    onChange: e => handleChange(e),
    value: state.coverType
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "image"
  }, "Image"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "slide"
  }, "Slide"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "author"
  }, "Author"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "hide",
    disabled: state.hideContent
  }, "Hide"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-field form-required term-name-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "hideContent"
  }, "Hide Content"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "hideContent",
    type: "checkbox",
    name: "hideContent",
    checked: state.hideContent,
    onChange: e => handleCheckboxChange(e),
    disabled: state.coverType == 'hide' ? true : false
  })), state.hideContent ? '' : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-field form-required term-name-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "before_title"
  }, "Before Title"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_options__WEBPACK_IMPORTED_MODULE_2__.Options, {
    position: "beforeTitle",
    customFields: customFields
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-field form-required term-name-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "title"
  }, "Title Field"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "title",
    onChange: e => handleChange(e),
    value: state.title.type
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "title"
  }, "Title"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "short-description"
  }, "Short Description"), customFields.filter(field => field.storage === 'location') ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "address"
  }, "Address") : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "hide"
  }, "Hide"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-field form-required term-name-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "after_title"
  }, "After Title"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_options__WEBPACK_IMPORTED_MODULE_2__.Options, {
    position: "afterTitle",
    customFields: customFields
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-field form-required term-name-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "title"
  }, "Details"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_options__WEBPACK_IMPORTED_MODULE_2__.Options, {
    position: "details",
    customFields: customFields
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    classNameName: "form-field form-required term-name-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "title"
  }, "Bottom Left"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "bottom_left",
    onChange: e => handleChange(e),
    value: state.bottom.left.slug
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "price"
  }, "Price"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "add-to-cart"
  }, "Add to Cart"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "hide"
  }, "Hide"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-field form-required term-name-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "title"
  }, "Bottom Right"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "bottom_right",
    onChange: e => handleChange(e),
    value: state.bottom.right.slug
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "price"
  }, "Price"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "add-to-cart"
  }, "Add to Cart"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "hide"
  }, "Hide")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "submit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "button",
    className: "wd-box-designer__btn-div__button",
    value: "Save Changes",
    onClick: e => handleSave(e)
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (LeftCol);

/***/ }),

/***/ "./src/components/options.js":
/*!***********************************!*\
  !*** ./src/components/options.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Options": function() { return /* binding */ Options; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/GlobalState */ "./src/context/GlobalState.js");
/* harmony import */ var _field_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./field-card */ "./src/components/field-card.js");




const Options = props => {
  const {
    customFields,
    position
  } = props;
  const {
    addField,
    editField,
    switchFields
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useUpdateContext)();
  const {
    state
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useGlobalContext)();
  const dragFieldIndex = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  let [cardFields, setcardFields] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(position == 'beforeTitle' ? state.beforeTitle : position == 'afterTitle' ? state.afterTitle : state.details);
  let [customFormatField, setCustomFormatField] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    id: customFields[0].id,
    name: customFields[0].name,
    type: customFields[0].type,
    displayText: '{field}'
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setcardFields(position == 'beforeTitle' ? state.beforeTitle : position == 'afterTitle' ? state.afterTitle : state.details);
  }, [state]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    editField({
      position,
      cardFields
    });
  }, [cardFields]);

  const handleDragStart = () => {};

  const handleDragEnter = index => {
    dragFieldIndex.current = index;
  };

  const handleDragEnd = (e, index) => {
    const params = {
      position: position,
      fromFieldIndex: index,
      toFieldIndex: dragFieldIndex.current
    };
    switchFields(params);
  };

  const handleSelectChange = e => {
    if (e.target.name === 'customFormat') {
      const value = JSON.parse(e.target.value);
      const field = {
        id: value.id,
        name: e.target[e.target.selectedIndex].textContent,
        type: value.type,
        displayText: '{field}'
      };

      if (value.type === 'map') {
        field.canvasHeight = '';
        field.zoomLevel = '';
      }

      setCustomFormatField(field);
    }
  };

  const handleInputChange = e => {
    if (customFormatField.type === 'map') {
      setCustomFormatField(e.target.name == 'canvasHeight' ? { ...customFormatField,
        canvasHeight: e.target.value.replace(/[^0-9]/g, '')
      } : { ...customFormatField,
        zoomLevel: e.target.value.replace(/[^0-9]/g, '')
      });
    } else setCustomFormatField({ ...customFormatField,
      displayText: e.target.value
    });
  };

  const handleCustomFormatCheck = e => {
    e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText').style.display = e.target.checked ? 'block' : 'none';
  };

  const addNewField = e => {
    const checked = e.target.closest('.wd-box-designer__add-form').querySelector('input[type=checkbox]').checked;
    const newField = {
      type: customFormatField.type,
      slug: customFormatField.id,
      displayText: '{field}'
    };

    if (customFormatField.type === 'map') {
      newField.canvasHeight = e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText input[name=canvasHeight]').value;
      newField.zoomLevel = e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText input[name=zoomLevel]').value;
    } else newField.displayText = checked ? e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText input[name=displayText]').value : '{field}';

    addField({
      position: position,
      field: newField
    }); // cleanin form

    if (e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText input[name=displayText]')) e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText input[name=displayText]').value = '';
    e.target.closest('.wd-box-designer__add-form').querySelector('input[type=checkbox]').checked = false;
    e.target.closest('.wd-box-designer__add-form').querySelector('#customFormatText').style.display = 'none';
    e.target.closest('.wd-box-designer__add-form').style.display = 'none';
    e.target.closest('.wd-box-designer__add-form').nextSibling.textContent = 'Add New';
  };

  const showHideAdd = e => {
    e.target.previousSibling.style.display = e.target.previousSibling.style.display == 'block' ? 'none' : 'block';
    e.target.textContent = e.target.textContent == 'Add New' ? 'Cancel' : 'Add New';
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, cardFields.length > 0 ? cardFields.map((fieldCard, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "metaxonomy__draggable-list__item",
    draggable: true,
    onDragStart: () => handleDragStart(),
    onDragEnter: () => handleDragEnter(index),
    onDragEnd: e => handleDragEnd(e, index)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_field_card__WEBPACK_IMPORTED_MODULE_3__["default"], {
    index: index,
    fieldCard: fieldCard,
    position: position,
    customFields: customFields,
    setCustomFields: setCustomFormatField
  }))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: ""
  }, "No options to show yet 'please add a new one :)"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "wdboxDesignerAddform",
    className: "wd-box-designer__add-form"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "customFormat",
    className: "wd-box-designer__add-form__custom-fields",
    onChange: e => handleSelectChange(e)
  }, customFields.map(customField => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: JSON.stringify({
      id: customField.id,
      type: customField.type
    })
  }, customField.name))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "wd-box-designer__add-form__custom-format__label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    className: "wd-box-designer__add-form__custom-format__check-box",
    onClick: e => handleCustomFormatCheck(e)
  }), " Custom Format"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "customFormatText",
    className: "wd-box-designer__add-form__custom-format__text",
    hidden: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "displayText",
    value: customFormatField.displayText,
    onChange: e => handleInputChange(e)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-box-designer__add-form__custom-format__text__hint"
  }, 'hint: something {field} something else.')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-box-designer__btn-div"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: "wdboxDesignerSave",
    className: "wd-box-designer__btn-div__button",
    onClick: e => addNewField(e)
  }, "Save"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: "wdboxDesignerAddnew",
    className: "wd-box-designer__btn-div__button",
    onClick: showHideAdd
  }, "Add New"));
};

/***/ }),

/***/ "./src/components/rightCol.js":
/*!************************************!*\
  !*** ./src/components/rightCol.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/GlobalState */ "./src/context/GlobalState.js");




const RightCol = _ref => {
  let {
    customFields
  } = _ref;
  const {
    state
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useGlobalContext)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "product-box-designer__right-col"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "product-box-cava"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "product-box-preview"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", {
    className: "product_item_thumbnail"
  }, state.coverType == 'hide' ? '' : state.coverType == 'image' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: "../wp-content/uploads/woocommerce-placeholder.png",
    className: "woocommerce-placeholder wp-post-image"
  }) : state.coverType == 'author' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "product-box-preview__author"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: "../wp-content/uploads/woocommerce-placeholder.png",
    className: "product-box-preview__avatar",
    alt: "Avatar"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "product-box-preview__header-info"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "product-box-preview__display-name"
  }, "Display name "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "product-box-preview__email"
  }, "email@Email.ex"))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: "../wp-content/uploads/woocommerce-placeholder.png",
    className: "woocommerce-placeholder wp-post-image"
  })), state.hideContent ? '' : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-product__content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-product__head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-product__before-title"
  }, state.beforeTitle.map(field => {
    var _customFields$filter$;

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "product_item_details__meta"
    }, field.displayText.replace('{field}', (_customFields$filter$ = customFields.filter(customField => customField.id == field.slug)[0]) === null || _customFields$filter$ === void 0 ? void 0 : _customFields$filter$.name), " ");
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-product__title"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    style: {
      fontSize: '20px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, state.title.type == 'title' ? 'Prdoct Title' : state.title.type == 'short-description' ? 'Short Description' : state.title.type == 'address' ? 'Adress' : ''))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-product__after-title"
  }, state.afterTitle.map(field => {
    var _customFields$filter$2;

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "product_item_details__meta"
    }, field.displayText.replace('{field}', (_customFields$filter$2 = customFields.filter(customField => customField.id == field.slug)[0]) === null || _customFields$filter$2 === void 0 ? void 0 : _customFields$filter$2.name), " ");
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-product__details"
  }, state.details.map(field => {
    var _customFields$filter$3;

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "product_item_details__meta"
    }, field.displayText.replace('{field}', (_customFields$filter$3 = customFields.filter(customField => customField.id == field.slug)[0]) === null || _customFields$filter$3 === void 0 ? void 0 : _customFields$filter$3.name), " ");
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-product__bottom"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-product__bottom__left"
  }, state.bottom.left.slug == 'hide' ? '' : state.bottom.left.slug == 'price' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Price, null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(AddToCart, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wd-product__bottom__right"
  }, state.bottom.right.slug == 'hide' ? '' : state.bottom.right.slug == 'price' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Price, null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(AddToCart, null))))))));
};

const Price = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "auction-price starting-bid",
    "data-auction-id": "11415",
    "data-bid": "",
    "data-status": "future"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "starting auction"
  }, "Starting bid:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "woocommerce-Price-amount amount"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "woocommerce-Price-currencySymbol"
  }, "$"), "0.00")));
};

const AddToCart = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "button button-primary",
    href: "#"
  }, "Add to cart"));
};

/* harmony default export */ __webpack_exports__["default"] = (RightCol);

/***/ }),

/***/ "./src/context/AppReducer.js":
/*!***********************************!*\
  !*** ./src/context/AppReducer.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ appReducer; }
/* harmony export */ });
function appReducer(state, action) {
  let position;

  switch (action.type) {
    case "ADD_FIELD":
      const newField = action.payload.field;
      position = action.payload.position;
      state[position] = [...state[position], newField];
      return { ...state
      };

    case "EDIT_FIELD":
      const updatedField = action.payload.cardFields;
      position = action.payload.position;
      if (position == 'beforeTitle' || position == 'afterTitle' || position == 'details') state[position] = updatedField;else if (position === 'coverType' || position === 'hideContent') {
        state[position] = action.payload.value;
      } else if (position === 'title') {
        state[position].type = action.payload.value;
      } else if (position === 'bottom_left') {
        state['bottom'].left.slug = action.payload.value;
      } else if (position === 'bottom_right') {
        state['bottom'].right.slug = action.payload.value;
      }
      return { ...state
      };

    case "REMOVE_FIELD":
      position = action.payload.position;
      state[position] = state[position].filter((field, index) => index != action.payload.id);
      return { ...state
      };

    case "SWITCH_FIELDS":
      const fromFieldIndex = action.payload.fromFieldIndex;
      const toFieldIndex = action.payload.toFieldIndex;
      position = action.payload.position;
      const dragedField = state[position][fromFieldIndex];
      state[position].splice(fromFieldIndex, 1);
      state[position] = [...state[position].slice(0, toFieldIndex), dragedField, ...state[position].slice(toFieldIndex, state[position].length)];
      return { ...state
      };

    case 'RESET':
      return action.payload;

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/context/GlobalState.js":
/*!************************************!*\
  !*** ./src/context/GlobalState.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalProvider": function() { return /* binding */ GlobalProvider; },
/* harmony export */   "useGlobalContext": function() { return /* binding */ useGlobalContext; },
/* harmony export */   "useUpdateContext": function() { return /* binding */ useUpdateContext; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppReducer */ "./src/context/AppReducer.js");
/* harmony import */ var _assets_initialState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/initialState */ "./src/assets/initialState.js");




const GlobalContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(_assets_initialState__WEBPACK_IMPORTED_MODULE_3__["default"]);
const UpdateContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(_assets_initialState__WEBPACK_IMPORTED_MODULE_3__["default"]);
const GlobalProvider = _ref => {
  let {
    children
  } = _ref;
  const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_AppReducer__WEBPACK_IMPORTED_MODULE_2__["default"], _assets_initialState__WEBPACK_IMPORTED_MODULE_3__["default"]);

  function addField(params) {
    dispatch({
      type: "ADD_FIELD",
      payload: params
    });
  }

  function editField(params) {
    dispatch({
      type: "EDIT_FIELD",
      payload: params
    });
  }

  function removeField(params) {
    dispatch({
      type: "REMOVE_FIELD",
      payload: params
    });
  }

  function switchFields(params) {
    dispatch({
      type: "SWITCH_FIELDS",
      payload: params
    });
  }

  function toggleForm(e) {
    const form = e.target.classList.contains('metaxonomy__card__head') ? e.target.parentElement.querySelector('.metaxonomy__container') : e.target.parentElement.parentElement.querySelector('.metaxonomy__container');
    const iconClass = e.target.classList.contains('metaxonomy__card__head') ? e.target.querySelector('i').classList : e.target.parentElement.querySelector('i').classList;

    if (iconClass.contains('dashicons-arrow-down-alt2')) {
      form.style.display = 'none';
      iconClass.add('dashicons-arrow-right-alt2');
      iconClass.remove('dashicons-arrow-down-alt2');
    } else {
      form.style.display = 'block';
      iconClass.add('dashicons-arrow-down-alt2');
      iconClass.remove('dashicons-arrow-right-alt2');
    }

    form.parentElement.classList.toggle('open'); // padding

    form.parentElement.querySelector('.metaxonomy__card__head').classList.toggle('open');
    form.parentElement.querySelector('.metaxonomy__card__type').classList.toggle('open');
    form.parentElement.querySelector('.metaxonomy__card__name').classList.toggle('open');
  }

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const displaySettings = document.querySelector('#wdmp_product_box_display_settings');

    if (displaySettings !== null && displaySettings !== void 0 && displaySettings.value) {
      _assets_initialState__WEBPACK_IMPORTED_MODULE_3__["default"] = JSON.parse(displaySettings.value);
      dispatch({
        type: 'RESET',
        payload: _assets_initialState__WEBPACK_IMPORTED_MODULE_3__["default"]
      });
    }
  }, []); // update hidden input

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    document.querySelector('#wdmp_product_box_display_settings').value = JSON.stringify(state); // console.log( JSON.parse(document.querySelector('#wdmp_product_box_display_settings').value) )
  }, [state]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(GlobalContext.Provider, {
    value: {
      state: state
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(UpdateContext.Provider, {
    value: {
      addField,
      editField,
      removeField,
      switchFields,
      toggleForm
    }
  }, children));
};
const useGlobalContext = () => (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(GlobalContext);
const useUpdateContext = () => (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(UpdateContext);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context/GlobalState */ "./src/context/GlobalState.js");
/* harmony import */ var _components_leftCol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/leftCol */ "./src/components/leftCol.js");
/* harmony import */ var _components_rightCol__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/rightCol */ "./src/components/rightCol.js");
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scss/style.scss */ "./src/scss/style.scss");






document.addEventListener("DOMContentLoaded", function () {
  function App() {
    const customFieldsDOM = document.querySelector('#customFields');
    const taxonomiesDOM = document.querySelector('#taxonomies');
    let taxonomies = isJsonString('Taxonomies', taxonomiesDOM.value);
    let customFields = isJsonString('Custom fields', customFieldsDOM.value);

    function isJsonString(source, str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        alert('invalid or empty ' + source);
        return JSON.parse('[]');
      }
    }

    customFields.forEach(field => {
      if (field.type === 'location') {
        customFields.push({ ...field,
          type: 'meta',
          id: field.id + '-country',
          name: field.name + ' Country',
          displayText: '{field}'
        });
        customFields.push({ ...field,
          type: 'meta',
          id: field.id + '-city',
          name: field.name + ' City',
          displayText: '{field}'
        });
        customFields.push({ ...field,
          type: 'meta',
          id: field.id + '-state',
          name: field.name + ' State',
          displayText: '{field}'
        });
        customFields.push({ ...field,
          type: 'meta',
          id: field.id + '-zipcode',
          name: field.name + ' Zipcode',
          displayText: '{field}'
        });
      }
    });
    taxonomies.forEach(taxonomy => {
      if (!customFields.filter(field => field.id === taxonomy.id).length) customFields.push({ ...taxonomy,
        type: !taxonomy.type ? 'taxonomy' : taxonomy.type
      });
    });
    customFields = customFields.filter(field => field.type !== 'location');
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.GlobalProvider, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "wd-box-designer__title"
    }, "Product Box Designer"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "col-container",
      className: "wp-clearfix product-box-designer"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_leftCol__WEBPACK_IMPORTED_MODULE_3__["default"], {
      customFields: customFields
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_rightCol__WEBPACK_IMPORTED_MODULE_4__["default"], {
      customFields: customFields
    }), " ")));
  }

  const root = document.getElementById('wdmp_products-box-designer_root');
  if (root) ReactDOM.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null), root);
});

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkjs"] = self["webpackChunkjs"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map