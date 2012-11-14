// cc/modules/dashboard/presenters/OfferPresenter;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview Offer/s page controller(presenter)
 */
define(
    [
        'dojo/_base/declare',
        'dijit/registry',
        'dijit/layout/ContentPane',
        'dojo/string',
        'dojo/text!/ccoach/lib/cc/modules/dashboard/view/offerDetails.html',
        'dojo/query',
        'dojo/dom',
        'dojo/dom-construct',
        'dojo/_base/xhr',
        'cc/modules/dashboard/presenters/BasePresenter'
    ],

    function (declare, registry, ContentPane, str, template, query, dom, domConstruct, xhr, BasePresenter) {

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.OfferPresenter
         * @static
         * @private
         * Constants that define string values
         * Used as to make code easier.
         */
        var VAL = 'value',
            STR_JSON = 'json';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.OfferPresenter
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
         * @memberOf cc.modules.dashboard.presenters.OfferPresenter
         * @static
         * @private
         * Constants that define date formatting
         * Used for creating string formatted values of time.
         */
        var MM_DD_YYYY_SLASH = 'MM/dd/yyyy';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.OfferPresenter
         * @static
         * @private
         * Constants that define contexts' IDs
         * Used to get object from contexts.
         */
        var DASHBOARD_SCREEN_CONT_ID = 'dashboardScreenContainer',
            CREATION_DATE_NODE_ID = '.offerFormCreationDate',
            FROM_DATE_NODE_ID = '.offerFormFromDate';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.OfferPresenter
         * @static
         * @private
         * Constants that define templates
         * Used for replacing values in string substitute
         */
        var TAB_TITLE_TMPL = 'Offer ${0}<span class="offerTitleProperty">Property ${1}</span>',
            OFFER_TAB_ID_TMPL = 'offerDetails_${0}_of_Property_${1}_ContentPane',
            POPUP_CLASS_TMPL = '.addOfferDialog-${0}',
            FORM_CLASS_TMPL = '.addOfferForm-${0}',
            ERR_BOX_CLASS_TMPL = '.addOfferMessBox-${0}',
            OFFER_GRID_ID_TMPL = 'offerGrid-${0}',
            ADD_PROPERTY_SERVICE_URL_TMPL = '/ccoach/control/jsonservice?serviceName=addNewOffer' +
                '&propertyId=${propertyId}' +
                '&creationDate=${creationDate}' +
                '&offerFrom=${offerFrom}' +
                '&propertyDescription=${propertyDescription}' +
                '&parcelNum=${parcelNum}' +
                '&situatedCity=${situatedCity}' +
                '&situatedCounty=${situatedCounty}' +
                '&fromDate=${fromDate}';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.PropertyPresenter
         * @static
         * @private
         * Constants that define other information which we will need
         */
        var ERROR_BOX_TITLE = '<div style="background-color: #E8E1CF; margin-top: 10px; padding-left: 10px;">Next fields are not filled correctly:</div>',
            ERR_BOX_LINES_TMPL = '${msg}<div ${style}>${ind}. ${fieldName}</div>',
            ERR_BOX_LINE_STYLE1 = 'style="border: 1px solid #EBEADB; padding-left: 5px; background-color: #FFFDF3;"',
            ERR_BOX_LINE_STYLE2 = 'style="border: 1px solid #EBEADB; padding-left: 5px;"';

        //noinspection JSUnusedGlobalSymbols
        return declare('cc.modules.dashboard.presenters.OfferPresenter', BasePresenter, {

            addOfferPopup:null,
            addOfferForm:null,
            propertyId:null,

            constructor:function () {
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);
                this.validationErrors = {
                    creationDate:{
                        label:'Creation Date',
                        value:true
                    },
                    offerFrom:{
                        label:'Offer From',
                        value:false
                    },
                    propertyDescription:{
                        label:'Property Description',
                        value:false
                    },
                    parcelNum:{
                        label:'Parcel Number',
                        value:false
                    },
                    situatedCity:{
                        label:'Situated City',
                        value:false
                    },
                    situatedCounty:{
                        label:'Situated County',
                        value:false
                    },
                    fromDate:{
                        label:'From Date',
                        value:true
                    }
                };
            },

            addTab:function (id, offer, tabs) {
                //noinspection JSUnresolvedFunction
                var tabsCount = tabs.getChildren().length;

                offer.creationDate = this.fromObjectDate(offer.creationDate);

                for(var prop in offer){
                    //noinspection JSUnfilteredForInLoop
                    if(offer[prop] === null) { //noinspection JSUnfilteredForInLoop
                        offer[prop] = EMPTY_STR;
                    }
                }

                //noinspection JSUnresolvedFunction
                var pane = new ContentPane({
                    id:id,
                    title:str.substitute(TAB_TITLE_TMPL, [offer.offerId, offer.propertyId]),
                    closable:true,
                    content:str.substitute(template, offer)
                });

                //noinspection JSUnresolvedFunction
                tabs.addChild(pane, tabsCount + 1);
                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                dojo.parser.parse(tabs.getChildren()[tabsCount]);
                //noinspection JSUnresolvedFunction
                tabs.selectChild(pane);
            },

            handleRowDblClick:function (target, event) {

                var offer = event.grid.getItem(event.rowIndex);
                //noinspection JSUnresolvedFunction
                var tabs = registry.byId(DASHBOARD_SCREEN_CONT_ID);

                //noinspection JSUnresolvedFunction
                var id = str.substitute(OFFER_TAB_ID_TMPL, [offer.offerId, event.grid.propertyId]);

                //noinspection JSUnresolvedFunction
                var tab = registry.byId(id);

                if (tab === undefined) {
                    this.addTab(id, offer, tabs);
                } else {
                    //noinspection JSUnresolvedFunction
                    tabs.selectChild(tab);
                }
            },

            handleAddButtonClick:function (target) {
                //noinspection JSUnresolvedFunction
                var className = str.substitute(POPUP_CLASS_TMPL, [target.propertyId]);
                //noinspection JSUnresolvedFunction
                var popup = registry.byNode(query(className)[0]);

                popup.show();

                this.addOfferPopup = popup;

                //noinspection JSUnresolvedFunction
                var formClassName = str.substitute(FORM_CLASS_TMPL, [target.propertyId]);
                //noinspection JSUnresolvedFunction
                this.addOfferForm = registry.byNode(query(formClassName)[0]);
                this.propertyId = target.propertyId;
            },

            obtainErrorBox:function () {

                //noinspection JSUnresolvedFunction
                var className = str.substitute(ERR_BOX_CLASS_TMPL, [this.propertyId]);
                this.messBox = query(className)[0];
            },

            handleAddOfferConfirmBtn:function () {
                if (this.getErrors()) {
                    //noinspection JSCheckFunctionSignatures
                    domConstruct.empty(this.messBox);

                    var value = this.addOfferForm.get(VAL);
                    value.propertyId = this.propertyId;

                    //add added offer in grid store
                    //noinspection JSUnresolvedFunction
                    var offerGrid = registry.byId(str.substitute(OFFER_GRID_ID_TMPL, [this.propertyId]));

                    value.creationDate = this.dateToString(value.creationDate, MM_DD_YYYY_SLASH);
                    value.fromDate = this.dateToString(value.fromDate, MM_DD_YYYY_SLASH);

                    value.propertyId = this.propertyId;

                    //noinspection JSUnresolvedFunction
                    var serviceUrl = str.substitute(ADD_PROPERTY_SERVICE_URL_TMPL, value);

                    this.addOfferForm.reset();
                    //noinspection JSUnresolvedFunction
                    this.addOfferPopup.hide();

                    xhr.get({
                        url:serviceUrl,
                        handleAs:STR_JSON,
                        load:function (data) {
                            value.offerId = data.offerId;
                            //noinspection JSUnresolvedVariable
                            offerGrid.store.objectStore.put(value);
                            //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                            offerGrid.setStore(offerGrid.store);
                        },
                        error:function () {
                            // xhr Error;
                        }
                    });

                    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                    registry.byNode(query(CREATION_DATE_NODE_ID, this.addOfferForm.domNode)[0]).set(VAL, CURRENT_DATE_OBJ);
                    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                    registry.byNode(query(FROM_DATE_NODE_ID, this.addOfferForm.domNode)[0]).set(VAL, CURRENT_DATE_OBJ);

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

            validateCreationDate:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            updateCreationDateValidationStatus:function (result) {
                this.validationErrors.creationDate.value = result;
                return result;
            },

            validateOfferFrom:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            updateOfferFromValidationStatus:function (result) {
                this.validationErrors.offerFrom.value = result;
                return result;
            },

            validatePropertyDescription:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            updatePropertyDescriptionValidationStatus:function (result) {
                this.validationErrors.propertyDescription.value = result;
                return result;
            },

            validateParcelNum:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            updateParcelNumValidationStatus:function (result) {
                this.validationErrors.parcelNum.value = result;
                return result;
            },

            validateSituatedCity:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            updateSituatedCityValidationStatus:function (result) {
                this.validationErrors.situatedCity.value = result;
                return result;
            },

            validateSituatedCounty:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            updateSituatedCountyValidationStatus:function (result) {
                this.validationErrors.situatedCounty.value = result;
                return result;
            },

            validateFromDate:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            updateFromDateValidationStatus:function (result) {
                this.validationErrors.fromDate.value = result;
                return result;
            }
        });
    }
);