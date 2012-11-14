// cc/modules/dashboard/presenters/PropertyPresenter;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview Property/ies page controller(presenter)
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/xhr',
        'dijit/registry',
        'dijit/layout/ContentPane',
        'dojo/string',
        'dojo/text!/ccoach/lib/cc/modules/dashboard/view/propertyDetails.html',
        'dojobiz/context/Container',
        'dojo/dom',
        'dojo/dom-construct',
        'cc/modules/dashboard/presenters/BasePresenter',
        'dojo/dom-style'
    ],

    function (declare, xhr, registry, ContentPane, str, template, Container, dom, domConstruct, BasePresenter, domStyle) {

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.PropertyPresenter
         * @static
         * @private
         * Constants that define contexts' IDs
         * Used to get object from contexts.
         */
        var COMMON_CTX_ID = 'commonContext',
            DASHBOARD_CTX_ID = 'dashboardContext';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.PropertyPresenter
         * @static
         * @private
         * Constants that define contexts' objects IDs
         * Used to get object from contexts.
         */
        var ADD_POPUP_ID = 'addPropertyPopup',
            ADD_FORM_ID = 'addPropertyForm',
            ADDITIONAL_DETAILS_BLOCK_ID = 'additionalDetails',
            LIST_DATE_NODE_ID = 'propertyFormListDate',
            EXP_DATE_NODE_ID = 'propertyFormExpDate',
            DASHBOARD_SCREEN_CONT_ID = 'dashboardScreenContainer',
            PROPERTY_GRID_ID = 'propertyGrid',
            USER_INFO_ID = 'userInfo';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.PropertyPresenter
         * @static
         * @private
         * Constants that define string values
         * Used as to make code easier.
         */
        var VAL = 'value',
            ZERO_STR = '0',
            STR_BLOCK = 'block',
            STR_NONE = 'none',
            STR_DISPLAY = 'display',
            STR_DATE = 'date',
            STR_DIGIT = 'digit',
            STR_STATUS = 'status',
            STR_JSON = 'json',
            STR_STATUSID = 'statusId',
            STR_STRING = 'string',
            STR_EMPTY_VALUE = 'EMPTY VALUE',
            STR_HIDDEN = 'hidden';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.PropertyPresenter
         * @static
         * @private
         * Constants that define current date
         * Used for creating string formatted values of time.
         */
        var CURRENT_DATE_OBJ = new Date();

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.PropertyPresenter
         * @static
         * @private
         * Constants that define empty string
         * Used for comparing values with empty string
         */
        var EMPTY_STR = new String();

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.PropertyPresenter
         * @static
         * @private
         * Constants that define date formatting
         * Used for creating string formatted values of time.
         */
        var MM_DD_YYYY_SLASH = 'MM/dd/yyyy';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.PropertyPresenter
         * @static
         * @private
         * Constants that define other information which we will need
         */
        var ACTIVE_IMG_URL = '/ccoach/themes/images/active.png',
            NOT_ACTIVE_IMG_URL = '/ccoach/themes/images/notactive.png',
            ACTIVE_STATUS = 'Active',
            ERR_BOX_LINE_STYLE1 = 'style="border: 1px solid #EBEADB; padding-left: 5px; background-color: #FFFDF3;"',
            ERR_BOX_LINE_STYLE2 = 'style="border: 1px solid #EBEADB; padding-left: 5px;"',
            ERROR_BOX_TITLE = '<div style="background-color: #E8E1CF; margin-top: 10px; padding-left: 10px;">Next fields are not filled correctly:</div>',
            ERR_BOX_LINES_TMPL = '${msg}<div ${style}>${ind}. ${fieldName}</div>',
            LOADER_ID_TMPL = 'offerGridLoader_${0}';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.PropertyPresenter
         * @static
         * @private
         * Constants that define templates
         * Used for replacing values in string substitute
         */
        var TAB_TITLE_TMPL = 'Property ${0}',
            GET_OFFERS_SERVICE_URL_TMPL = '/ccoach/control/jsonservice?serviceName=getOfferList&propertyId=${0}',
            NODE_ID_TMPL = 'propertyForm${0}${1}',
            PROPERTY_TAB_ID_TMPL = 'propertyDetails_${0}_ContentPane',
            PROPERTY_OFFER_GRID_ID_TMPL = 'offerGrid-${0}',
            DATE_TMPL = '${0}/${1}/${2}',
            ADD_PROPERTY_SERVICE_URL_TMPL = '/ccoach/control/jsonservice?serviceName=addNewProperty' +
                '&partyId=${partyId}' +
                '&situatedStreet1=${situatedStreet1}' +
                '&situatedZip=${situatedZip}' +
                '&parcelNum=${parcelNum}' +
                '&situatedCity=${situatedCity}' +
                '&situatedCounty=${situatedCounty}' +
                '&clientId=${clientId}' +
                '&clientNames=${clientNames}' +
                '&clientAddress=${clientAddress}' +
                '&clientPhone=${clientPhone}' +
                '&clientEmail=${clientEmail}' +
                '&clientNotes=${clientNotes}' +
                '&mlsNum=${mlsNum}' +
                '&propSqFt=${propSqFt}' +
                '&propYearBuilt=${propYearBuilt}' +
                '&propStyle=${propStyle}' +
                '&termiteRepair=${termiteRepair}' +
                '&retrofit=${retrofit}' +
                '&otherRepairs=${otherRepairs}' +
                '&totalCommission=${totalCommission}' +
                '&listPercentage=${listPercentage}' +
                '&sellPercentage=${sellPercentage}' +
                '&listDate=${listDate}' +
                '&expDate=${expDate}' +
                '&originalLP=${originalLP}' +
                '&currentLP=${currentLP}' +
                '&daysOnMarket=${daysOnMarket}' +
                '&offerCount=${offerCount}' +
                '&recentOfferDate=${recentOfferDate}' +
                '&highestOffer=${highestOffer}' +
                '&lowestOffer=${lowestOffer}' +
                '&cashOffers=${cashOffers}' +
                '&conventionalOffers=${conventionalOffers}' +
                '&fhaOffers=${fhaOffers}' +
                '&vaOffers=${vaOffers}' +
                '&highestCash=${highestCash}' +
                '&highestConventional=${highestConventional}' +
                '&highestFha=${highestFha}' +
                '&highestVa=${highestVa}' +
                '&highestDownPay=${highestDownPay}' +
                '&shortestEscrow=${shortestEscrow}' +
                '&shortestInspection=${shortestInspection}' +
                '&shortestLoan=${shortestLoan}' +
                '&fromDate=${fromDate}' +
                '&thruDate=${thruDate}' +
                '&statusId=${statusId}';

        //noinspection JSUnusedGlobalSymbols
        return declare('cc.modules.dashboard.presenters.PropertyPresenter', BasePresenter, {

            commonCtx:null,
            dashboardCtx:null,
            grid:null,
            messBoxId:'addPropertyMessBox',

            constructor:function () {
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);
                this.commonCtx = Container.getContext(COMMON_CTX_ID);
                this.dashboardCtx = Container.getContext(DASHBOARD_CTX_ID);
                this.validationErrors = {
                    situatedStreet1:{
                        label:'Street',
                        value:false
                    },
                    situatedZip:{
                        label:'Zip',
                        value:false
                    },
                    parcelNum:{
                        label:'Parcel Number',
                        value:false
                    },
                    situatedCity:{
                        label:'City',
                        value:false
                    },
                    situatedCounty:{
                        label:'Situated County',
                        value:false
                    },
                    clientId:{
                        label:'Client Id',
                        value:false
                    },
                    clientNames:{
                        label:'Client Names',
                        value:false
                    },
                    clientNotes:{
                        label:'Client Notes',
                        value:false
                    },
                    mlsNum:{
                        label:'MLS Number',
                        value:false
                    },
                    propSqFt:{
                        label:'Property Square Feet',
                        value:false
                    },
                    propYearBuilt:{
                        label:'Property Year Built',
                        value:false
                    },
                    propStyle:{
                        label:'Property Style',
                        value:false
                    },

                    totalCommission:{
                        label:'Total Commission',
                        value:false
                    },
                    listPercentage:{
                        label:'List Percentage',
                        value:false
                    },
                    sellPercentage:{
                        label:'Sell Percentage',
                        value:false
                    },
                    listDate:{
                        label:'List Date',
                        value:true
                    },
                    expDate:{
                        label:'Expiration Date',
                        value:true
                    },
                    originalLP:{
                        label:'Original Listing Price',
                        value:false
                    }
                };
                //noinspection JSUnusedGlobalSymbols
                this.notRequiredFields = {
                    clientAddress:{
                        type:STR_STRING
                    },
                    clientPhone:{
                        type:STR_STRING
                    },
                    clientEmail:{
                        type:STR_STRING
                    },
                    termiteRepair:{
                        type:STR_DIGIT
                    },
                    retrofit:{
                        type:STR_DIGIT
                    },
                    otherRepairs:{
                        type:STR_DIGIT
                    },
                    currentLP:{
                        type:STR_DIGIT
                    },
                    daysOnMarket:{
                        type:STR_DIGIT
                    },
                    offerCount:{
                        type:STR_DIGIT
                    },
                    recentOfferDate:{
                        type:STR_DATE
                    },
                    highestOffer:{
                        type:STR_DIGIT
                    },
                    lowestOffer:{
                        type:STR_DIGIT
                    },
                    cashOffers:{
                        type:STR_DIGIT
                    },
                    conventionalOffers:{
                        type:STR_DIGIT
                    },
                    fhaOffers:{
                        type:STR_DIGIT
                    },
                    vaOffers:{
                        type:STR_DIGIT
                    },
                    highestCash:{
                        type:STR_DIGIT
                    },
                    highestConventional:{
                        type:STR_DIGIT
                    },
                    highestFha:{
                        type:STR_DIGIT
                    },
                    highestVa:{
                        type:STR_DIGIT
                    },
                    highestDownPay:{
                        type:STR_DIGIT
                    },
                    shortestEscrow:{
                        type:STR_DIGIT
                    },
                    shortestInspection:{
                        type:STR_DIGIT
                    },
                    shortestLoan:{
                        type:STR_DIGIT
                    },
                    fromDate:{
                        type:STR_DATE
                    },
                    thruDate:{
                        type:STR_DATE
                    },
                    statusId:{
                        type:STR_STATUS
                    }
                }
            },

            addTab:function (id, property, tabs) {

                //noinspection JSUnresolvedFunction
                var tabsCount = tabs.getChildren().length;
                property.statusImgUrl = EMPTY_STR;

                if (property.statusId === ACTIVE_STATUS) {
                    property.statusImgUrl = ACTIVE_IMG_URL;
                } else {
                    property.statusImgUrl = NOT_ACTIVE_IMG_URL;
                }

                property.fromDate = this.fromObjectDate(property.fromDate);
                property.thruDate = this.fromObjectDate(property.thruDate);

                for (var prop in property) {
                    //noinspection JSUnfilteredForInLoop
                    if (property[prop] === null) { //noinspection JSUnfilteredForInLoop
                        property[prop] = EMPTY_STR;
                    }
                }

                //noinspection JSUnresolvedFunction
                var pane = new ContentPane({
                    id:id,
                    title:str.substitute(TAB_TITLE_TMPL, [property.propertyId]),
                    closable:true,
                    content:str.substitute(template, property)
                });

                //noinspection JSUnresolvedFunction
                tabs.addChild(pane, tabsCount + 1);
                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                dojo.parser.parse(tabs.getChildren()[tabsCount]);
                //noinspection JSUnresolvedFunction
                tabs.selectChild(pane);
            },

            fromObjectDate:function (value) {

                if (typeof value === STR_STRING) {
                    return value;
                } else {
                    if (value === null) {
                        return this.dateToString(CURRENT_DATE_OBJ, MM_DD_YYYY_SLASH);
                    } else {
                        var month = EMPTY_STR;
                        var day = EMPTY_STR;

                        //noinspection JSUnresolvedVariable
                        if (1 + Math.floor(Math.log(value._value.month) / Math.log(10)) === 1) {
                            //noinspection JSUnresolvedVariable
                            month = ZERO_STR + (value._value.month + 1).toString();
                        } else {
                            //noinspection JSUnresolvedVariable
                            month = (value._value.month + 1).toString();
                        }

                        //noinspection JSUnresolvedVariable
                        if (1 + Math.floor(Math.log(value._value.day) / Math.log(10)) === 1) {
                            //noinspection JSUnresolvedVariable
                            day = ZERO_STR + value._value.day.toString();
                        } else {
                            //noinspection JSUnresolvedVariable
                            day = value._value.day.toString();
                        }

                        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                        return str.substitute(DATE_TMPL, [month, day, value._value.year]);
                    }
                }
            },

            setOfferGridData:function (propertyId) {
                //noinspection JSUnresolvedFunction
                var offerGrid = registry.byId(str.substitute(PROPERTY_OFFER_GRID_ID_TMPL, [propertyId]));

                //noinspection JSUnresolvedFunction
                var serviceUrl = str.substitute(GET_OFFERS_SERVICE_URL_TMPL, [propertyId]);
                xhr.get({
                    url:serviceUrl,
                    handleAs:STR_JSON,
                    //sync: true,
                    load:function (data) {
                        //noinspection JSUnresolvedVariable,JSCheckFunctionSignatures
                        offerGrid.store.objectStore.setData(data);
                        //noinspection JSUnresolvedFunction
                        dom.byId(str.substitute(LOADER_ID_TMPL, [propertyId])).style.visibility = STR_HIDDEN;
                        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                        offerGrid.setStore(offerGrid.store);
                    },
                    error:function () {
                        //noinspection JSUnresolvedFunction
                        dom.byId(str.substitute(LOADER_ID_TMPL, [propertyId])).style.visibility = STR_HIDDEN;
                        //noinspection JSUnresolvedVariable,JSCheckFunctionSignatures
                        offerGrid.store.objectStore.setData([]);
                    }
                });
            },

            handleRowDblClick:function (target, event) {

                var property = event.grid.getItem(event.rowIndex);

                //noinspection JSUnresolvedFunction
                var tabs = registry.byId(DASHBOARD_SCREEN_CONT_ID);

                //noinspection JSUnresolvedFunction
                var id = str.substitute(PROPERTY_TAB_ID_TMPL, [property.propertyId]);

                //noinspection JSUnresolvedFunction
                var tab = registry.byId(id);

                if (tab === undefined) {
                    this.addTab(id, property, tabs);
                    this.setOfferGridData(property.propertyId);
                } else {
                    //noinspection JSUnresolvedFunction
                    tabs.selectChild(tab);
                }
            },

            handleAddButtonClick:function () {
                //noinspection JSUnresolvedFunction
                var createPopup = this.dashboardCtx.provide(ADD_POPUP_ID);
                createPopup.show();
            },

            handleActivationChange:function (target, value) {

                //noinspection JSUnresolvedFunction
                var grid = this.dashboardCtx.provide(PROPERTY_GRID_ID);

                //noinspection JSUnresolvedFunction
                var items = grid.selection.getSelected();

                for (var i in items) {
                    //noinspection JSUnfilteredForInLoop
                    var item = items[i];

                    if (item.statusId !== value) {
                        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                        grid.store.setValue(item, STR_STATUSID, value);
                    }
                }
            },

            handleAddPropertyConfirmBtn:function () {

                if (this.getErrors()) {

                    //noinspection JSCheckFunctionSignatures
                    domConstruct.empty(this.messBox);

                    //noinspection JSUnresolvedFunction
                    var grid = this.dashboardCtx.provide(PROPERTY_GRID_ID);
                    //noinspection JSUnresolvedFunction
                    var createPopup = this.dashboardCtx.provide(ADD_POPUP_ID);
                    //noinspection JSUnresolvedFunction
                    var userInfo = this.commonCtx.provide(USER_INFO_ID);
                    //noinspection JSUnresolvedFunction
                    var form = this.dashboardCtx.provide(ADD_FORM_ID);
                    var value = form.get(VAL);

                    value.listDate = this.dateToString(value.listDate, MM_DD_YYYY_SLASH);
                    value.expDate = this.dateToString(value.expDate, MM_DD_YYYY_SLASH);

                    //noinspection JSDuplicatedDeclaration
                    for (var i in this.notRequiredFields) {
                        //noinspection JSDuplicatedDeclaration,JSUnfilteredForInLoop
                        var item = this.notRequiredFields[i];

                        if (item.type === STR_STRING) {
                            //noinspection JSUnfilteredForInLoop
                            value[i] = value[i] == EMPTY_STR ? STR_EMPTY_VALUE : value[i];
                        }
                        if (item.type === STR_DIGIT) {
                            //noinspection JSUnfilteredForInLoop
                            value[i] = value[i] == EMPTY_STR ? ZERO_STR : value[i];
                        }
                        if (item.type === STR_DATE) {
                            //noinspection JSUnfilteredForInLoop
                            value[i] = value[i] === null ? this.dateToString(CURRENT_DATE_OBJ, MM_DD_YYYY_SLASH) : this.dateToString(value[i], MM_DD_YYYY_SLASH);
                        }
                    }

                    value.partyId = userInfo.partyId;

                    //noinspection JSUnresolvedFunction
                    var serviceUrl = str.substitute(ADD_PROPERTY_SERVICE_URL_TMPL, value);

                    form.reset();
                    //noinspection JSUnresolvedFunction
                    createPopup.hide();

                    xhr.get({
                        url:serviceUrl,
                        handleAs:STR_JSON,
                        load:function (data) {
                            value.propertyId = data.propertyId;
                            //noinspection JSUnresolvedVariable
                            grid.store.objectStore.put(value);
                            //noinspection JSUnresolvedFunction
                            grid._refresh();
                        },
                        error:function () {
                            // xhr Error;
                        }
                    });

                    //noinspection JSUnresolvedFunction
                    registry.byId(LIST_DATE_NODE_ID).set(VAL, CURRENT_DATE_OBJ);
                    //noinspection JSUnresolvedFunction
                    registry.byId(EXP_DATE_NODE_ID).set(VAL, CURRENT_DATE_OBJ);

                    //noinspection JSDuplicatedDeclaration
                    for (var i in this.notRequiredFields) {
                        //noinspection JSDuplicatedDeclaration,JSUnfilteredForInLoop
                        var item = this.notRequiredFields[i];
                        //noinspection JSUnresolvedFunction,JSUnfilteredForInLoop
                        var nodeId = str.substitute(NODE_ID_TMPL, [i.charAt(0).toUpperCase(), i.slice(1)]);

                        if (item.type === STR_DIGIT) {
                            //noinspection JSUnresolvedFunction
                            registry.byId(nodeId).set(VAL, ZERO_STR);
                        }
                        if (item.type === STR_DATE) {
                            //noinspection JSUnresolvedFunction
                            registry.byId(nodeId).set(VAL, CURRENT_DATE_OBJ);
                        }
                        if (item.type === STR_STATUS) {
                            //noinspection JSUnresolvedFunction
                            registry.byId(nodeId).set(VAL, ACTIVE_STATUS);
                        }
                    }
                    //noinspection JSUnresolvedFunction
                    dom.byId(ADDITIONAL_DETAILS_BLOCK_ID).style.display = STR_NONE;
                } else {
                    var msg = ERROR_BOX_TITLE;
                    var ind = 1;

                    for (var prop in this.validationErrors) {
                        //noinspection JSUnfilteredForInLoop
                        if (!this.validationErrors[prop].value) {
                            //noinspection JSUnfilteredForInLoop,JSUnresolvedFunction
                            msg = str.substitute(
                                ERR_BOX_LINES_TMPL,
                                {
                                    msg:msg,
                                    ind:ind,
                                    fieldName:this.validationErrors[prop].label,
                                    style:ind % 2 === 0 ? ERR_BOX_LINE_STYLE1 : ERR_BOX_LINE_STYLE2
                                }
                            );
                            ind++;
                        }
                    }
                    this.showErrorBox(msg);
                }
            },

            obtainErrorBox:function () {
                if (this.messBox === undefined) {
                    //noinspection JSUnresolvedFunction
                    this.messBox = dom.byId(this.messBoxId);
                }
            },

            handleShowAdditionalDetailsBtn:function () {
                //noinspection JSUnresolvedFunction
                var table = dom.byId(ADDITIONAL_DETAILS_BLOCK_ID);

                //noinspection JSCheckFunctionSignatures
                if (domStyle.get(table, STR_DISPLAY) === STR_NONE) {
                    domStyle.set(table, STR_DISPLAY, STR_BLOCK);
                    //noinspection JSUnresolvedFunction
                    var form = dom.byId(ADD_FORM_ID);
                    form.scrollTop = form.scrollHeight;
                } else {
                    domStyle.set(table, STR_DISPLAY, STR_NONE);
                }
            },

            validateSituatedStreet1:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            updateSituatedStreet1ValidationStatus:function (result) {
                this.validationErrors.situatedStreet1.value = result;
                return result;
            },

            validateSituatedZip:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isZip(widget, value));
            },

            updateSituatedZipValidationStatus:function (result) {
                this.validationErrors.situatedZip.value = result;
                return result;
            },

            validateParcelNum:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isParcelNumber(widget, value));
            },

            updateParcelNumValidationStatus:function (result) {
                this.validationErrors.parcelNum.value = result;
                return result;
            },

            validateSituatedCity:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isDigitFirstLetter(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            updateSituatedCityValidationStatus:function (result) {
                this.validationErrors.situatedCity.value = result;
                return result;
            },

            validateSituatedCounty:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isDigitFirstLetter(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            updateSituatedCountyValidationStatus:function (result) {
                this.validationErrors.situatedCounty.value = result;
                return result;
            },

            validateClientId:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isDigitFirstLetter(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            updateClientIdValidationStatus:function (result) {
                this.validationErrors.clientId.value = result;
                return result;
            },

            validateClientNames:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isDigitFirstLetter(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            updateClientNamesValidationStatus:function (result) {
                this.validationErrors.clientNames.value = result;
                return result;
            },

            validateClientAddress:function (widget, value) {
                return this.validator.isUppercaseFirstLetter(widget, value);
            },

            validateClientPhone:function (widget, value) {
                return this.validator.isPhone(widget, value);
            },

            validateClientEmail:function (widget, value) {
                return this.validator.isValidEmail(widget, value);
            },

            validateClientNotes:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isDigitFirstLetter(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            updateClientNotesValidationStatus:function (result) {
                this.validationErrors.clientNotes.value = result;
                return result;
            },

            validateMlsNum:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isAlphaNumeric(widget, value));
            },

            updateMlsNumValidationStatus:function (result) {
                this.validationErrors.mlsNum.value = result;
                return result;
            },

            validatePropSqFt:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isOnlyDigits(widget, value));
            },

            updatePropSqFtValidationStatus:function (result) {
                this.validationErrors.propSqFt.value = result;
                return result;
            },

            validatePropYearBuilt:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isYear(widget, value));
            },

            updatePropYearBuiltValidationStatus:function (result) {
                this.validationErrors.propYearBuilt.value = result;
                return result;
            },

            validatePropStyle:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            updatePropStyleValidationStatus:function (result) {
                this.validationErrors.propStyle.value = result;
                return result;
            },

            validateTermiteRepair:function (widget, value) {
                return this.validator.isFloatingNumber(widget, value);
            },

            validateRetrofit:function (widget, value) {
                return this.validator.isFloatingNumber(widget, value);
            },

            validateOtherRepairs:function (widget, value) {
                return this.validator.isOnlyDigits(widget, value);
            },

            validateTotalCommission:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isOnlyDigits(widget, value));
            },

            updateTotalCommissionValidationStatus:function (result) {
                this.validationErrors.totalCommission.value = result;
                return result;
            },

            validateListPercentage:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isOnlyDigits(widget, value));
            },

            updateListPercentageValidationStatus:function (result) {
                this.validationErrors.listPercentage.value = result;
                return result;
            },

            validateSellPercentage:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isOnlyDigits(widget, value));
            },

            updateSellPercentageValidationStatus:function (result) {
                this.validationErrors.sellPercentage.value = result;
                return result;
            },

            validateListDate:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            updateListDateValidationStatus:function (result) {
                this.validationErrors.listDate.value = result;
                return result;
            },

            validateExpDate:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            updateExpDateValidationStatus:function (result) {
                this.validationErrors.expDate.value = result;
                return result;
            },

            validateOriginalLP:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isFloatingNumber(widget, value));
            },

            updateOriginalLPValidationStatus:function (result) {
                this.validationErrors.originalLP.value = result;
                return result;
            },

            validateCurrentLP:function (widget, value) {
                return this.validator.isFloatingNumber(widget, value);
            },

            validateDaysOnMarket:function (widget, value) {
                return this.validator.isOnlyDigits(widget, value);
            },

            validateOfferCount:function (widget, value) {
                return this.validator.isOnlyDigits(widget, value);
            },

            validateRecentOfferDate:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            validateHighestOffer:function (widget, value) {
                return this.validator.isFloatingNumber(widget, value);
            },

            validateLowestOffer:function (widget, value) {
                return this.validator.isFloatingNumber(widget, value);
            },

            validateCashOffers:function (widget, value) {
                return this.validator.isOnlyDigits(widget, value);
            },

            validateConventionalOffers:function (widget, value) {
                return this.validator.isOnlyDigits(widget, value);
            },

            validateFhaOffers:function (widget, value) {
                return this.validator.isOnlyDigits(widget, value);
            },

            validateVaOffers:function (widget, value) {
                return this.validator.isOnlyDigits(widget, value);
            },

            validateHighestCash:function (widget, value) {
                return this.validator.isFloatingNumber(widget, value)
            },

            validateHighestConventional:function (widget, value) {
                return this.validator.isFloatingNumber(widget, value)
            },

            validateHighestFha:function (widget, value) {
                return this.validator.isFloatingNumber(widget, value)
            },

            validateHighestVa:function (widget, value) {
                return this.validator.isFloatingNumber(widget, value)
            },

            validateHighestDownPay:function (widget, value) {
                return this.validator.isFloatingNumber(widget, value)
            },

            validateShortestEscrow:function (widget, value) {
                return this.validator.isOnlyDigits(widget, value);
            },

            validateShortestInspection:function (widget, value) {
                return this.validator.isOnlyDigits(widget, value);
            },

            validateShortestLoan:function (widget, value) {
                return this.validator.isOnlyDigits(widget, value);
            },

            validateFromDate:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            validateThruDate:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            }
        });
    }
);