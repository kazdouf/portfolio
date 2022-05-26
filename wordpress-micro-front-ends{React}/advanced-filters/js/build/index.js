/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/fieldsList.js":
/*!**************************************!*\
  !*** ./src/components/fieldsList.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldsList": function() { return /* binding */ FieldsList; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/GlobalState */ "./src/context/GlobalState.js");
/* harmony import */ var _forms_edit_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forms/edit-group */ "./src/components/forms/edit-group.js");
/* harmony import */ var _forms_edit_taxonomy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forms/edit-taxonomy */ "./src/components/forms/edit-taxonomy.js");
/* harmony import */ var _forms_edit_meta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./forms/edit-meta */ "./src/components/forms/edit-meta.js");






const FieldsList = props => {
  const dragFieldIndex = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const {
    fields,
    toggleForm
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useGlobalContext)();
  const {
    switchFields,
    getGroupIndex
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useUpdateContext)();

  const handleDragStart = () => {
    document.querySelectorAll('.metaxonomy__card__head').forEach(card => {
      if (card.classList.contains('open') && card.querySelector('.metaxonomy__card__type').textContent !== 'group') toggleForm({
        target: card
      });
    });
  };

  const handleDragEnter = index => {
    dragFieldIndex.current = index;
    document.querySelectorAll(`.metaxonomy__card__head`).forEach(cardHead => {
      cardHead.style.backgroundColor = '#f1f1f1';
    });
    document.querySelector(`.metaxonomy__draggable-list__item:nth-child(${index + 2}) .metaxonomy__card__head`).style.backgroundColor = '#ccc';
  };

  const handleDragEnd = (e, index) => {
    const parentGroupCard = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    const currentCard = document.querySelector(`.metaxonomy__draggable-list__item:nth-child(${dragFieldIndex.current + 2})`);
    const params = {
      fromGrpIndex: getGroupIndex(),
      fromGrp: parentGroupCard.classList.contains('metaxonomy__draggable-list__item') ? parentGroupCard.querySelector('.metaxonomy__card__remove span').textContent : null,
      toGrp: currentCard.querySelector(`.metaxonomy__card__type`).textContent === 'group' ? currentCard.querySelector(`.metaxonomy__card__remove span`).textContent : null,
      fromFieldId: parentGroupCard.classList.contains('metaxonomy__draggable-list__item') ? e.target.querySelector('.metaxonomy__card__remove span').textContent : null,
      fromFieldIndex: index,
      toFieldIndex: dragFieldIndex.current
    };

    if (params.toFieldIndex !== index) {
      if (currentCard.querySelector(`.metaxonomy__card__type`).textContent == 'group' && e.target.querySelector(`.metaxonomy__card__type`).textContent == 'group') alert(`Sorry! Can't nest a group inside another !!! :(`);else switchFields(params);
    }

    document.querySelectorAll(`.metaxonomy__card__head`).forEach(cardHead => {
      cardHead.style.backgroundColor = '#f1f1f1';
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, fields.length > 0 ? fields.map((field, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: field.id,
    className: "metaxonomy__draggable-list__item",
    draggable: true,
    onDragStart: () => handleDragStart(),
    onDragEnter: () => handleDragEnter(index),
    onDragEnd: e => handleDragEnd(e, index)
  }, field.type === 'meta' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_forms_edit_meta__WEBPACK_IMPORTED_MODULE_5__["default"], {
    metaFields: props.metaFields,
    id: field.id,
    index: index
  }) : field.type === 'group' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_forms_edit_group__WEBPACK_IMPORTED_MODULE_3__["default"], {
    metaFields: props.metaFields,
    taxonomies: props.taxonomies,
    id: field.id,
    grpIndex: index
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_forms_edit_taxonomy__WEBPACK_IMPORTED_MODULE_4__["default"], {
    taxonomies: props.taxonomies,
    id: field.id,
    index: index
  }))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: ""
  }, "No fields to show."));
};

/***/ }),

/***/ "./src/components/forms/add-group.js":
/*!*******************************************!*\
  !*** ./src/components/forms/add-group.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/GlobalState */ "./src/context/GlobalState.js");




function AddGroup(props) {
  const {
    addField,
    getMaxId,
    getLastOrder
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useUpdateContext)();
  let [dataState, setDataState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    "id": getMaxId(),
    "name": "",
    // required
    "type": "group",
    "description": "",
    // optional
    "order": getLastOrder(),
    "fields": []
  });

  function handleInputChange(e) {
    setDataState(e.target.name === 'name' ? { ...dataState,
      id: getMaxId(),
      name: e.target.value
    } : { ...dataState,
      description: e.target.value
    });
  }

  function addNewField(e) {
    e.preventDefault();
    addField(dataState);
    props.onSubmit();
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-arrow-right-alt2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__type"
  }, dataState.type), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__name"
  }, dataState.name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    action: "#",
    onSubmit: addNewField,
    className: "metaxonomy__container new-field-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__fields"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__name__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "name",
    value: dataState.name,
    onChange: handleInputChange.bind(this),
    required: true
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Description"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__description__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "description",
    value: dataState.description,
    onChange: handleInputChange.bind(this)
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__savechanges-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "submit",
    value: "Add"
  }))));
}

/* harmony default export */ __webpack_exports__["default"] = (AddGroup);

/***/ }),

/***/ "./src/components/forms/add-metadata.js":
/*!**********************************************!*\
  !*** ./src/components/forms/add-metadata.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/GlobalState */ "./src/context/GlobalState.js");




function AddMetaData(props) {
  const {
    addField,
    getMaxId,
    getLastOrder
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useUpdateContext)();
  let [dataState, setDataState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    "id": getMaxId(),
    "name": "",
    // required
    "type": "meta",
    "key": "",
    // required
    "keyType": "",
    // needs a way of entry
    "description": "",
    // optional
    "order": getLastOrder(),
    "displayType": "",
    // select option
    "placeholder": "",
    // needs a way of entry
    "defaultValue": "",
    // needs a way of entry
    "selectOptions": {} // improted later in php code

  });

  function handleInputChange(e) {
    setDataState(e.target.name === 'name' ? { ...dataState,
      id: getMaxId(),
      name: e.target.value
    } : e.target.name === 'description' ? { ...dataState,
      description: e.target.value
    } : { ...dataState,
      key: e.target.value.replace(/[^a-z]/g, '')
    });
  }

  function handleChange(e) {
    setDataState(e.target.name === 'key' ? { ...dataState,
      key: e.target.value
      /* .replace(/[^a-z]/g, '') */

    } : { ...dataState,
      displayType: e.target.value
    });
  }

  function addNewField(e) {
    var _document$querySelect, _document$querySelect2;

    e.preventDefault();
    dataState.key = dataState.key === "" ? (_document$querySelect = document.querySelector('.new-field-container select[name=key] option')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value : dataState.key;
    dataState.displayType = dataState.displayType === "" ? (_document$querySelect2 = document.querySelector('.new-field-container select[name=dtype] option')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value : dataState.displayType;
    addField(dataState);
    props.onSubmit();
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    action: "#",
    onSubmit: addNewField,
    className: "add-new-metaxonomy-placeholder"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-arrow-right-alt2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__type"
  }, dataState.type), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__name"
  }, dataState.name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__container new-field-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__pt__fields"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Key"), dataState.displayType == 'range' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "key",
    value: dataState.key,
    onChange: handleChange
  }, props.metaFields.map(metaField => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: metaField.value
  }, metaField.name, " (", metaField.value, ")"))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__key__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "key",
    value: dataState.key,
    onChange: handleInputChange.bind(this),
    required: true
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__name__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "name",
    value: dataState.name,
    onChange: handleInputChange.bind(this),
    required: true
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Display Type"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__dtype__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "dtype",
    value: dataState.displayType,
    onChange: handleChange
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "text"
  }, "Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "autocomplete"
  }, "Auto Complete"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "select"
  }, "Select"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "range"
  }, "Range min/max")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Description"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__description__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "description",
    value: dataState.description,
    onChange: handleInputChange.bind(this)
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__savechanges-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "submit",
    value: "Add"
  }))));
}

/* harmony default export */ __webpack_exports__["default"] = (AddMetaData);

/***/ }),

/***/ "./src/components/forms/add-product-title.js":
/*!***************************************************!*\
  !*** ./src/components/forms/add-product-title.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/GlobalState */ "./src/context/GlobalState.js");




function AddProductTitle(props) {
  const {
    addField,
    getMaxId,
    getLastOrder
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useUpdateContext)();
  let [dataState, setDataState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    "id": getMaxId(),
    "name": "",
    // required
    "type": "product_title",
    "description": "",
    // optional
    "key": "",
    // required
    "keyType": "",
    // sneeds a way of entry
    "order": getLastOrder(),
    "displayType": "" // select option

  });

  function handleInputChange(e) {
    setDataState(e.target.name === 'name' ? { ...dataState,
      id: getMaxId(),
      name: e.target.value
    } : e.target.name === 'description' ? { ...dataState,
      description: e.target.value
    } : { ...dataState,
      key: e.target.value.replace(/[^a-z]/g, '')
    });
  }

  function handleChange(e) {
    setDataState({ ...dataState,
      displayType: e.target.value
    });
  }

  function addNewField(e) {
    var _document$querySelect, _document$querySelect2;

    e.preventDefault();
    dataState.keyType = dataState.keyType === "" ? (_document$querySelect = document.querySelector('.new-field-container select[name=ktype] option')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value : dataState.keyType;
    dataState.displayType = dataState.displayType === "" ? (_document$querySelect2 = document.querySelector('.new-field-container select[name=dtype] option')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value : dataState.displayType;
    addField(dataState);
    props.onSubmit();
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-arrow-right-alt2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__type"
  }, dataState.type), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__name"
  }, dataState.name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    action: "#",
    onSubmit: addNewField,
    className: "metaxonomy__container new-field-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__fields"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Key"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__key__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "key",
    value: dataState.key,
    onChange: handleInputChange.bind(this),
    required: true
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__name__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "name",
    value: dataState.name,
    onChange: handleInputChange.bind(this),
    required: true
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Display Type"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__dtype__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "dtype",
    value: dataState.displayType,
    onChange: handleChange
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "text"
  }, "Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "select"
  }, "Select")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Description"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__description__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "description",
    value: dataState.description,
    onChange: handleInputChange.bind(this)
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__savechanges-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "submit",
    value: "Add"
  }))));
}

/* harmony default export */ __webpack_exports__["default"] = (AddProductTitle);

/***/ }),

/***/ "./src/components/forms/add-taxonomy.js":
/*!**********************************************!*\
  !*** ./src/components/forms/add-taxonomy.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/GlobalState */ "./src/context/GlobalState.js");




function AddTaxonomy(props) {
  const {
    addField,
    getMaxId,
    getLastOrder
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useUpdateContext)();
  let [dataState, setDataState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    "id": getMaxId(),
    "taxonomy": "",
    // select option
    "name": "",
    // required
    "type": "taxonomy",
    "key": "",
    // dont need it
    "keyType": "",
    // needs a way of entry
    "description": "",
    // optional
    "order": getLastOrder(),
    "displayType": "",
    // select option
    "defaultValue": "",
    // needs a way of entry
    "selectOptions": {} // improted later in php code

  });

  function handleInputChange(e) {
    setDataState(e.target.name === 'name' ? { ...dataState,
      id: getMaxId(),
      name: e.target.value
    } : { ...dataState,
      description: e.target.value
    });
  }

  function handleChange(e) {
    setDataState(e.target.name === 'taxonomy' ? { ...dataState,
      taxonomy: e.target.value
    } : { ...dataState,
      displayType: e.target.value
    });
  }

  function addNewField(e) {
    var _document$querySelect, _document$querySelect2;

    e.preventDefault();
    dataState.taxonomy = dataState.taxonomy === "" ? (_document$querySelect = document.querySelector('.new-field-container select[name=taxonomy] option')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value : dataState.taxonomy;
    dataState.displayType = dataState.displayType === "" ? (_document$querySelect2 = document.querySelector('.new-field-container select[name=dtype] option')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value : dataState.displayType;
    addField(dataState);
    props.onSubmit();
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-arrow-right-alt2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__type"
  }, dataState.type), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__name"
  }, dataState.name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    action: "#",
    onSubmit: addNewField,
    className: "metaxonomy__container new-field-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__fields"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Taxonomy"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__taxonomy__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "taxonomy",
    value: dataState.taxonomy,
    onChange: handleChange
  }, props.taxonomies.map(taxonomy => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: taxonomy.value
  }, taxonomy.name, " (", taxonomy.value, ")"))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__name__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "name",
    value: dataState.name,
    onChange: handleInputChange.bind(this),
    required: true
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Display Type"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__dtype__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "dtype",
    value: dataState.displayType,
    onChange: handleChange
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "text"
  }, "Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "select"
  }, "Select"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "select2"
  }, "Select 2")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Description"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__description__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "description",
    value: dataState.description,
    onChange: handleInputChange.bind(this)
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__savechanges-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "submit",
    value: "Add"
  }))));
}

/* harmony default export */ __webpack_exports__["default"] = (AddTaxonomy);

/***/ }),

/***/ "./src/components/forms/edit-group.js":
/*!********************************************!*\
  !*** ./src/components/forms/edit-group.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/GlobalState */ "./src/context/GlobalState.js");
/* harmony import */ var _edit_taxonomy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit-taxonomy */ "./src/components/forms/edit-taxonomy.js");
/* harmony import */ var _edit_meta__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit-meta */ "./src/components/forms/edit-meta.js");






function EditGroup({
  id,
  grpIndex,
  metaFields,
  taxonomies
}) {
  const {
    fields,
    toggleForm
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useGlobalContext)();
  const {
    editField,
    switchFields,
    setGroupIndex
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useUpdateContext)();
  const dragField = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  let [dataState, setDataState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(fields.filter(group => group.id == id)[0]);
  let groupFields = fields.filter(group => group.id == id)[0].fields;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    editField(dataState);
  }, [dataState]);

  function handleInputChange(e) {
    if (e.target.name === 'name') {
      const cardHead = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.metaxonomy__card__head');
      cardHead.style.backgroundColor = e.target.value == '' ? '#b32d2e' : '#f1f1f1';
    }

    setDataState(e.target.name === 'name' ? { ...dataState,
      name: e.target.value
    } : { ...dataState,
      description: e.target.value
    });
  }

  const handleDragEnter = index => {
    dragField.current = index;
  };

  const handleDragEnd = (grpId, index) => {
    const params = {
      fromGrp: grpId,
      toGrp: grpId,
      fromFieldId: null,
      fromFieldIndex: index,
      toFieldIndex: dragField.current,
      grpIndex: grpIndex
    };
    setGroupIndex(grpIndex);
    if (dragField.current !== index) switchFields(params);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__head",
    onClick: toggleForm
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-arrow-right-alt2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__type"
  }, dataState.type), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__name"
  }, dataState.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__remove"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    name: "id",
    hidden: true
  }, dataState.id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    name: "index",
    hidden: true
  }, grpIndex), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-trash"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__fields"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__name__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "name",
    value: dataState.name,
    onChange: handleInputChange.bind(this),
    placeholder: "Name required",
    required: true
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Description"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__description__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "description",
    value: dataState.description,
    onChange: handleInputChange.bind(this)
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field group"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Fields"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__list group"
  }, groupFields.length > 0 ? groupFields.map((field, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: field.id,
    className: "metaxonomy__draggable-list__item",
    draggable: true,
    onDragEnter: () => {
      handleDragEnter(index);
    },
    onDragEnd: () => handleDragEnd(dataState.id, index)
  }, field.type === 'meta' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_edit_meta__WEBPACK_IMPORTED_MODULE_4__["default"], {
    metaFields: metaFields,
    groupId: id,
    id: field.id,
    index: index
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_edit_taxonomy__WEBPACK_IMPORTED_MODULE_3__["default"], {
    taxonomies: taxonomies,
    groupId: id,
    id: field.id,
    index: index
  }))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: ""
  }, "No fields to show."))))));
}

/* harmony default export */ __webpack_exports__["default"] = (EditGroup);

/***/ }),

/***/ "./src/components/forms/edit-meta.js":
/*!*******************************************!*\
  !*** ./src/components/forms/edit-meta.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/GlobalState */ "./src/context/GlobalState.js");




function EditMeta({
  id,
  index,
  groupId,
  metaFields
}) {
  const {
    fields,
    toggleForm
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useGlobalContext)();
  const {
    editField
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useUpdateContext)();
  let field = groupId ? fields.filter(group => group.id === groupId)[0].fields.filter(field => field.id === id)[0] : fields.filter(field => field.id === id)[0];
  let [dataState, setDataState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(field);

  function handleInputChange(e) {
    if (e.target.name === 'name' || e.target.name === 'key') {
      const cardHead = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.metaxonomy__card__head');
      cardHead.style.backgroundColor = e.target.value == '' ? '#b32d2e' : '#f1f1f1';
    }

    setDataState(e.target.name === 'name' ? { ...dataState,
      name: e.target.value
    } : e.target.name === 'description' ? { ...dataState,
      description: e.target.value
    } : { ...dataState,
      key: e.target.value.replace(/[^a-z]/g, '')
    });
  }

  function handleChange(e) {
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.metaxonomy__card__head').style.backgroundColor = e.target.name === 'dtype' && e.target.value === 'range' ? '#f1f1f1' : '#b32d2e';
    setDataState(e.target.name === 'key' ? { ...dataState,
      key: e.target.value
    } : { ...dataState,
      displayType: e.target.value
    });
  }

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    editField(dataState);
  }, [dataState]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__head",
    onClick: toggleForm
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-arrow-right-alt2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__type"
  }, dataState.type), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__name"
  }, dataState.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__remove"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    name: "id",
    hidden: true
  }, dataState.id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    name: "index",
    hidden: true
  }, index), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-trash"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__pt__fields"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Key"), dataState.displayType == 'range' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "key",
    value: dataState.key,
    onChange: handleChange
  }, metaFields.map(metaField => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: metaField.value
  }, metaField.name, " (", metaField.value, ")"))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__key__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "key",
    value: dataState.key,
    onChange: handleInputChange.bind(this),
    placeholder: "Key required",
    required: true
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__name__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "name",
    value: dataState.name,
    onChange: handleInputChange.bind(this),
    placeholder: "Name required",
    required: true
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Display Type"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__dtype__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "dtype",
    value: dataState.displayType,
    onChange: handleChange
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "text"
  }, "Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "autocomplete"
  }, "Auto Complete"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "select"
  }, "Select"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "range"
  }, "Range min/max")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Description"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__description__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "description",
    value: dataState.description,
    onChange: handleInputChange.bind(this)
  }))))));
}

/* harmony default export */ __webpack_exports__["default"] = (EditMeta);

/***/ }),

/***/ "./src/components/forms/edit-taxonomy.js":
/*!***********************************************!*\
  !*** ./src/components/forms/edit-taxonomy.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/GlobalState */ "./src/context/GlobalState.js");




function EditTanonomy({
  id,
  index,
  groupId,
  taxonomies
}) {
  const {
    fields,
    toggleForm
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useGlobalContext)();
  const {
    editField
  } = (0,_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.useUpdateContext)();
  let field = groupId ? fields.filter(group => group.id === groupId)[0].fields.filter(field => field.id === id)[0] : fields.filter(field => field.id === id)[0];
  let [dataState, setDataState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(field);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    editField(dataState);
  }, [dataState]);

  function handleInputChange(e) {
    if (e.target.name === 'name') {
      const cardHead = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.metaxonomy__card__head');
      cardHead.style.backgroundColor = e.target.value == '' ? '#b32d2e' : '#f1f1f1';
    }

    setDataState(e.target.name === 'name' ? { ...dataState,
      name: e.target.value
    } : { ...dataState,
      description: e.target.value
    });
  }

  function handleChange(e) {
    setDataState(e.target.name === 'taxonomy' ? { ...dataState,
      taxonomy: e.target.value
    } : { ...dataState,
      displayType: e.target.value
    });
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__head",
    onClick: toggleForm
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-arrow-right-alt2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__type"
  }, dataState.type), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__name"
  }, dataState.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__card__remove"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    name: "id",
    hidden: true
  }, dataState.id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    name: "index",
    hidden: true
  }, index), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-trash"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__fields"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Taxonomy"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__taxonomy__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "taxonomy",
    value: dataState.taxonomy,
    onChange: handleChange
  }, taxonomies.map(taxonomy => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: taxonomy.value
  }, taxonomy.name, " (", taxonomy.value, ")"))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__name__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "name",
    value: dataState.name,
    onChange: handleInputChange.bind(this),
    placeholder: "Name required",
    required: true
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Display Type"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__dtype__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "dtype",
    value: dataState.displayType,
    onChange: handleChange
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "text"
  }, "Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "select"
  }, "Select"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "select2"
  }, "Select 2")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__field__label"
  }, "Description"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "metaxonomy__description__input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "description",
    value: dataState.description,
    onChange: handleInputChange.bind(this)
  }))))));
}

/* harmony default export */ __webpack_exports__["default"] = (EditTanonomy);

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
  let fields = JSON.parse(JSON.stringify(state.fields));

  switch (action.type) {
    case "ADD_FIELD":
      return { ...state,
        fields: [...state.fields, action.payload]
      };

    case "EDIT_FIELD":
      const updatedField = action.payload;
      const updatedFields = state.fields.map(field => {
        if (field.id === updatedField.id) {
          return updatedField;
        }

        return field;
      });
      return { ...state,
        fields: updatedFields
      };

    case "REMOVE_FIELD":
      const grpIndex = action.payload.grpIndex;
      const fieldId = action.payload.fieldId;
      const group = fields.filter(group => group.id == action.payload.grpId)[0];
      fields = fields.filter(group => group.id != action.payload.grpId);
      return action.payload.grpId ? { ...state,
        fields: [...fields.slice(0, grpIndex), { ...group,
          fields: group.fields.filter(field => field.id != fieldId)
        }, ...fields.slice(grpIndex, fields.length)]
      } : { ...state,
        fields: state.fields.filter(field => field.id !== action.payload.fieldId)
      };

    case "SWITCH_FIELDS":
      let newState;
      const fromGrp = action.payload.fromGrp;
      const fromGrpIndex = action.payload.fromGrpIndex;
      const toGrp = action.payload.toGrp;
      const fromFieldIndex = action.payload.fromFieldIndex;
      const fromFieldId = action.payload.fromFieldId;
      const toFieldIndex = action.payload.toFieldIndex;
      const dragedField = fields[fromFieldIndex];

      if (fromGrp) {
        const fromGroup = fields.filter(group => group.id == fromGrp)[0];

        if (toGrp) {
          const toGroup = fields.filter(group => group.id == toGrp)[0];

          if (fromGrp == toGrp) {
            // switch inside same group
            const grpIndex = action.payload.grpIndex;
            console.log(`switch inside same group ${toGrp} with index ${grpIndex} from ${fromFieldIndex} to ${toFieldIndex}`);
            const dragedGroupField = toGroup.fields[fromFieldIndex];
            toGroup.fields.splice(fromFieldIndex, 1);
            fields = fields.filter(group => group.id != toGrp);
            toGroup.fields = toGroup.fields.filter(field => field.id != dragedField.id);
            const GroupFields = [...toGroup.fields.slice(0, toFieldIndex), { ...dragedGroupField,
              order: (toFieldIndex + 1).toString()
            }, ...toGroup.fields.slice(toFieldIndex, toGroup.fields.length)];
            const switched = [...fields.slice(0, grpIndex), { ...toGroup,
              fields: GroupFields,
              order: (grpIndex + 1).toString()
            }, ...fields.slice(grpIndex, fields.length)];
            newState = { ...state,
              fields: switched
            };
          } else {
            // from group to another group
            console.log(`${fromFieldId} from group ${fromGrp} to group ${toGrp}`);
            const dragedGroupField = fromGroup.fields.filter(field => field.id == fromFieldId)[0];
            const fromGroupFields = [...fromGroup.fields.filter(field => field.id !== fromFieldId)];
            const toGroupFields = [...toGroup.fields, { ...dragedGroupField,
              order: (toGroup.fields.length + 1).toString()
            }];
            fields = fields.filter(group => group.id != fromGrp && group.id != toGrp);
            const switched = fromGrpIndex > toFieldIndex ? [...fields.slice(0, toFieldIndex), { ...toGroup,
              fields: toGroupFields
            }, ...fields.slice(toFieldIndex, fromGrpIndex), { ...fromGroup,
              fields: fromGroupFields
            }, ...fields.slice(fromGrpIndex, fields.length)] : [...fields.slice(0, fromGrpIndex), { ...fromGroup,
              fields: fromGroupFields
            }, ...fields.slice(fromGrpIndex, toFieldIndex), { ...toGroup,
              fields: toGroupFields
            }, ...fields.slice(toFieldIndex, fields.length)];
            newState = { ...state,
              fields: switched
            };
          }

          toGroup.fields.forEach((field, index) => {
            field.order = (index + 1).toString();
          });
        } else {
          // from group to the out
          console.log(`${fromFieldId} from group ${fromGrp} to index ${toFieldIndex}`);
          fields = fields.filter(group => group.id != fromGrp);
          const dragedGroupField = fromGroup.fields.filter(field => field.id == fromFieldId)[0];
          const GroupFields = [...fromGroup.fields.filter(field => field.id !== fromFieldId)];
          const switched = toFieldIndex < fromGrpIndex ? [...fields.slice(0, toFieldIndex), { ...dragedGroupField,
            order: (toFieldIndex + 1).toString()
          }, ...fields.slice(toFieldIndex, fromGrpIndex), { ...fromGroup,
            fields: GroupFields
          }, ...fields.slice(fromGrpIndex, fields.length)] : [...fields.slice(0, fromGrpIndex), { ...fromGroup,
            fields: GroupFields
          }, ...fields.slice(fromGrpIndex, toFieldIndex), { ...dragedGroupField,
            order: (toFieldIndex + 1).toString()
          }, ...fields.slice(toFieldIndex, fields.length)];
          newState = { ...state,
            fields: switched
          };
        }

        fromGroup.fields.forEach((field, index) => {
          field.order = (index + 1).toString();
        });
      } else {
        const group = fields.filter(group => group.id == toGrp)[0];
        fields.splice(fromFieldIndex, 1);

        if (toGrp) {
          // normal field to a group
          console.log(`normal field ${fromFieldIndex} to a group ${toGrp}`);
          fields = fields.filter(group => group.id != toGrp);
          const GroupFields = [...group.fields, { ...dragedField,
            order: (group.fields.length + 1).toString()
          }];
          const switched = [...fields.slice(0, toFieldIndex), { ...group,
            fields: GroupFields
          }, ...fields.slice(toFieldIndex, fields.length)];
          group.fields.forEach((field, index) => {
            field.order = (index + 1).toString();
          });
          newState = { ...state,
            fields: switched
          };
        } else {
          // two normal fields out of group
          console.log(`from field ${fromFieldIndex} to ${toFieldIndex}`);
          const switched = [...fields.slice(0, toFieldIndex), { ...dragedField,
            order: (toFieldIndex + 1).toString()
          }, ...fields.slice(toFieldIndex, fields.length)];
          newState = { ...state,
            fields: switched
          };
        }
      }

      fields.forEach((field, index) => {
        field.order = index >= toFieldIndex ? (index + 2).toString() : (index + 1).toString();
      });
      return newState;

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



const initialState = {
  fields: []
};
let interval = setInterval(() => {
  var _document$getElementB;

  if ((_document$getElementB = document.getElementById('wdmp_search_filters')) !== null && _document$getElementB !== void 0 && _document$getElementB.value) initialState.fields = JSON.parse(document.getElementById('wdmp_search_filters').value).searchfileds;
}, 0);
const GlobalContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(initialState);
const UpdateContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(initialState);
const GlobalProvider = ({
  children
}) => {
  const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_AppReducer__WEBPACK_IMPORTED_MODULE_2__["default"], initialState);
  let groupIndex;

  function addField(field) {
    dispatch({
      type: "ADD_FIELD",
      payload: field
    });
  }

  function editField(field) {
    dispatch({
      type: "EDIT_FIELD",
      payload: field
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

  function getMaxId() {
    let ids = state.fields.map(field => field.id);
    state.fields.map(field => {
      if (field.type == "group") {
        field.fields.map(field => ids.push(field.id));
      }
    });
    return state.fields.length == 0 || isNaN(Math.max.apply(Math, ids)) ? '0' : (Math.max.apply(Math, ids) + 1).toString();
  }

  function getLastOrder() {
    return (state.fields.length + 1).toString();
  }

  function toggleForm(e) {
    const form = e.target.classList.contains('metaxonomy__card__head') ? e.target.parentElement.querySelector('.metaxonomy__container') : e.target.parentElement.parentElement.querySelector('.metaxonomy__container');
    const iconClass = e.target.classList.contains('metaxonomy__card__head') ? e.target.querySelector('i').classList : e.target.parentElement.querySelector('i').classList;

    if (e.target.parentElement.classList.contains('metaxonomy__card__remove')) {
      const params = {
        grpIndex: e.target.parentElement.parentElement.parentElement.parentElement.classList.contains('group') ? e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('span[name=index]').innerText : null,
        grpId: e.target.parentElement.parentElement.parentElement.parentElement.classList.contains('group') ? e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('span').innerText : null,
        fieldId: e.target.parentElement.querySelector('span[name=id]').innerText
      };
      removeField(params);
    } else {
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
  }

  function getGroupIndex() {
    return groupIndex;
  }

  function setGroupIndex(index) {
    groupIndex = index;
  } // update hidden input


  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    document.getElementById('wdmp_search_filters').value = JSON.stringify({
      searchfileds: [...state.fields]
    }); // console.log( { searchfileds: [...state.fields] } )

    clearInterval(interval);
  }, [state]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(GlobalContext.Provider, {
    value: {
      fields: state.fields,
      toggleForm
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(UpdateContext.Provider, {
    value: {
      addField,
      editField,
      removeField,
      switchFields,
      getMaxId,
      getLastOrder,
      getGroupIndex,
      setGroupIndex
    }
  }, children));
};
const useGlobalContext = () => (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(GlobalContext);
const useUpdateContext = () => (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(UpdateContext);

/***/ }),

/***/ "./src/css/app.css":
/*!*************************!*\
  !*** ./src/css/app.css ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/card.css":
/*!**************************!*\
  !*** ./src/css/card.css ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/draggable-list.css":
/*!************************************!*\
  !*** ./src/css/draggable-list.css ***!
  \************************************/
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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_GlobalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context/GlobalState */ "./src/context/GlobalState.js");
/* harmony import */ var _components_fieldsList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/fieldsList */ "./src/components/fieldsList.js");
/* harmony import */ var _components_forms_add_group__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/forms/add-group */ "./src/components/forms/add-group.js");
/* harmony import */ var _components_forms_add_taxonomy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/forms/add-taxonomy */ "./src/components/forms/add-taxonomy.js");
/* harmony import */ var _components_forms_add_metadata__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/forms/add-metadata */ "./src/components/forms/add-metadata.js");
/* harmony import */ var _components_forms_add_product_title__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/forms/add-product-title */ "./src/components/forms/add-product-title.js");
/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./css/app.css */ "./src/css/app.css");
/* harmony import */ var _css_card_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./css/card.css */ "./src/css/card.css");
/* harmony import */ var _css_draggable_list_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./css/draggable-list.css */ "./src/css/draggable-list.css");











document.addEventListener("DOMContentLoaded", function () {
  function App() {
    const taxonomies = document.getElementById('taxonomies') ? JSON.parse(document.getElementById('taxonomies').value) : [];
    const metaFields = document.getElementById('metaFields') ? JSON.parse(document.getElementById('metaFields').value) : [];
    let [fieldType, setFieldType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('taxonomy');

    function handleOnClick(e) {
      if (e.target.value == 'Cancel') setFieldType('taxonomy');
      showHideAdd();
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_GlobalState__WEBPACK_IMPORTED_MODULE_2__.GlobalProvider, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "metaxonomy__draggable-list"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
      className: "MT_header"
    }, "Search Filters List"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_fieldsList__WEBPACK_IMPORTED_MODULE_3__.FieldsList, {
      taxonomies: taxonomies,
      metaFields: metaFields
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "add-new-metaxonomy-placeholder metaxonomy__container"
    }, fieldType == 'taxonomy' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_forms_add_taxonomy__WEBPACK_IMPORTED_MODULE_5__["default"], {
      taxonomies: taxonomies,
      onSubmit: showHideAdd
    }) : fieldType == 'meta' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_forms_add_metadata__WEBPACK_IMPORTED_MODULE_6__["default"], {
      metaFields: metaFields,
      onSubmit: showHideAdd
    }) : fieldType == 'product_title' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_forms_add_product_title__WEBPACK_IMPORTED_MODULE_7__["default"], {
      onSubmit: showHideAdd
    }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_forms_add_group__WEBPACK_IMPORTED_MODULE_4__["default"], {
      onSubmit: showHideAdd
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      id: "metaxonomyFieldType",
      className: "metaxonomy__select-field",
      value: fieldType,
      onChange: e => {
        var _e$target;

        return setFieldType((_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value);
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "taxonomy"
    }, "Taxonomy"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "meta"
    }, "MetaData"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "product_title"
    }, "Product Title"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "group"
    }, "Group")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "metaxonomy__addnew-button"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "button",
      value: "Add New",
      id: "metaxonomyAddNew",
      onClick: handleOnClick
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      name: "fieldsList",
      id: "fieldsListInput",
      type: "text",
      hidden: true,
      value: "nothing"
    })));
  }

  if (document.getElementById('wdmp_search_filters_root')) ReactDOM.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null), document.getElementById('wdmp_search_filters_root'));
  const metaxonomySelect = document.querySelector('.metaxonomy__select-field');
  const addplaceholder = document.querySelector('.add-new-metaxonomy-placeholder');
  const metaxonomyAddNew = document.querySelector('#metaxonomyAddNew');
  if (addplaceholder) addplaceholder.style.display = 'none';
  if (metaxonomySelect) metaxonomySelect.style.display = 'block';

  function showHideAdd() {
    addplaceholder.style.display = addplaceholder.style.display == 'none' ? 'block' : 'none';
    metaxonomySelect.style.display = metaxonomySelect.style.display == 'none' ? 'block' : 'none';
    metaxonomyAddNew.value = metaxonomyAddNew.value == 'Add New' ? 'Cancel' : 'Add New'; // empty form fields

    document.querySelectorAll('.new-field-container').forEach(element => {
      element.querySelectorAll('input[type=text]').forEach(element => {
        element.value = '';
      });
      element.querySelectorAll('select').forEach(element => {
        element.selectedIndex = 0;
      }); // element.querySelectorAll('input[type=checkbox]').forEach(element => { element.checked = false })
      // if( element.querySelector('textarea') ) element.querySelector('textarea').value = ''
    });
  }
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map