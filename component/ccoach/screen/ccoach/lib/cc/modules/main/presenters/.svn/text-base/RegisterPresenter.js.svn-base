// cc/modules/main/RegisterPresenter
//noinspection JSUnresolvedFunction
/**
 * @fileOverview Register page controller(presenter)
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/xhr',
        'dojo/dom',
        'dojo/string',
        'dojo/dom-construct',
        'cc/modules/main/presenters/BasePresenter',
        'dojobiz/context/Container'
    ],

    function (declare, xhr, dom, str, domConstruct, BasePresenter, Container) {

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.RegisterPresenter
         * @static
         * @private
         * Constant that defines id of screen container.
         * Used to get container bean from context.
         */
        var USER_REGISTER_FORM_ID = 'userRegisterForm',
            REG_FORM_CONTAINER_DOM_ID = 'registerFormContainer',
            REG_LOADER_ID = 'registrationLoader',
            COMMON_CTX_ID = 'commonContext';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.RegisterPresenter
         * @static
         * @private
         * Constants that define string values
         * Used as to make code easier.
         */
        var STR_EXIST = 'exist',
            STR_SUCCESS = 'success',
            STR_VISIBLE = 'visible',
            STR_HIDDEN = 'hidden',
            STR_JSON = 'json';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.RegisterPresenter
         * @static
         * @private
         * Constants that define templates
         * Used for replacing values in string substitute
         */
        var CREATE_PERSON_AND_USER_LOGIN = '/ccoach/control/jsonservice?serviceName=createPersonAndUserLogin' +
            '&name=${name}' +
            '&lastName=${lastName}' +
            '&email=${email}' +
            '&agencyName=${agencyName}' +
            '&password1=${password1}' +
            '&phone1=${phone1}' +
            '&phone2=${phone2}' +
            '&address1=${address1}' +
            '&address2=${address2}' +
            '&city=${city}' +
            '&state=${state}' +
            '&zip=${zip}' +
            '&agentNumber=${agentNumber}';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.RegisterPresenter
         * @static
         * @private
         * Constants that define presenter error messages
         * Used as parameter in show error function.
         */
        var USER_EXIST_MSG = 'User with provided Email(login) already exist.',
            USER_SUCCESS_REGISTRATION_MSG = 'To complete registration, please visit URL that we have sent to your email.',
            REGISTRATION_PROBLEM_MSG = 'Problem with registration please try again 5 minutes later.';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.RegisterPresenter
         * @static
         * @private
         * Constant that define name of "value" field of widget type.
         * Used into get and set method of widget.
         */
        var VALUE = 'value';

        /**
         * @class cc.modules.main.RegisterPresenter The class incapsulate logic to work with Register View
         */
        //noinspection JSValidateJSDoc,JSUnusedGlobalSymbols
        return declare('cc.modules.main.presenters.RegisterPresenter', BasePresenter, {

            notValidValuesErrMsg:'Incorrect registration form data on step 1.',
            /**
             * @constructor Creates an instance of cc.modules.main.RegisterPresenter class
             */
            constructor:function () {
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);

                this.formId = 'userRegisterForm';
                this.messBoxId = 'registerMessBox';

                this.validationErrors = {
                    name:false,
                    lastName:false,
                    email:false,
                    agencyName:false,
                    password1:false,
                    password2:false,
                    phone1:false,
                    phone2:false,
                    address1:false,
                    address2:false,
                    city:false,
                    state:false,
                    zip:false,
                    agentNumber:false
                };
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate name value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateName:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isDigitFirstLetter(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of name validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updateNameValidationStatus:function (result) {
                this.validationErrors.name = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate last name value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateLastName:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isDigitFirstLetter(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of last name validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updateLastNameValidationStatus:function (result) {
                this.validationErrors.lastName = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate email value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateEmail:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isValidEmail(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of email validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updateEmailValidationStatus:function (result) {
                this.validationErrors.email = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate agency name value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateAgencyName:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isAlphaNumeric(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of agency name validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updateAgencyNameValidationStatus:function (result) {
                this.validationErrors.agencyName = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate password 1 value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validatePassword1:function (widget, value) {
                return !(this.validator.isEmpty(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of password 1 validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updatePassword1ValidationStatus:function (result) {
                this.validationErrors.password1 = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate password 2 value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validatePassword2:function (widget, value) {
                var pass1Val = Container.getContext(COMMON_CTX_ID).provide(USER_REGISTER_FORM_ID).get(VALUE).password1;
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isPasswordsEqual(widget, value, pass1Val));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of password 2 validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updatePassword2ValidationStatus:function (result) {
                this.validationErrors.password2 = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate phone 1 value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validatePhone1:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isPhone(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of phone 1 validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updatePhone1ValidationStatus:function (result) {
                this.validationErrors.phone1 = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate phone 2 value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validatePhone2:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isPhone(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of phone 2 validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updatePhone2ValidationStatus:function (result) {
                this.validationErrors.phone2 = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate address 1 value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateAddress1:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },


            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of address 1 validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updateAddress1ValidationStatus:function (result) {
                this.validationErrors.address1 = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate address 2 value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateAddress2:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of address 2 validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updateAddress2ValidationStatus:function (result) {
                this.validationErrors.address2 = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate city value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateCity:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isDigitFirstLetter(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of city validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updateCityValidationStatus:function (result) {
                this.validationErrors.city = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate state value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateState:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isDigitFirstLetter(widget, value) ||
                    !this.validator.isUppercaseFirstLetter(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of state validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updateStateValidationStatus:function (result) {
                this.validationErrors.state = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate zip value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateZip:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    !this.validator.isZip(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of zip validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updateZipValidationStatus:function (result) {
                this.validationErrors.zip = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Validate agent number value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateAgentNumber:function (widget, value) {
                return !(this.validator.isEmpty(widget, value) ||
                    this.validator.isAlphaNumeric(widget, value));
            },

            /**
             * @memberOf cc.modules.main.RegisterPresenter.prototype
             *
             * Stores result of agent number validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.Presenter.validationErrors}
             */
            updateAgentNumberValidationStatus:function (result) {
                this.validationErrors.agentNumber = result;
                return result;
            },


            handleBtnClick:function () {
                //noinspection JSUnresolvedFunction,JSUnresolvedFunction
                this.inherited(arguments);



                if (this.getErrors()) {

                    //noinspection JSUnresolvedFunction
                    dom.byId(REG_FORM_CONTAINER_DOM_ID).style.visibility = STR_HIDDEN;
                    //noinspection JSUnresolvedFunction
                    dom.byId(REG_LOADER_ID).style.visibility = STR_VISIBLE;
                    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                    var formValue = commonContext.provide(USER_REGISTER_FORM_ID).get(VALUE);
                    //noinspection JSUnresolvedFunction
                    var serviceUrl = str.substitute(CREATE_PERSON_AND_USER_LOGIN, formValue);
                    var presenter = this;

                    xhr.get({
                        url:serviceUrl,
                        handleAs:STR_JSON,
                        //sync: true,
                        load:function (data) {
                            if (data && data.result === STR_SUCCESS) {
                                //noinspection JSUnresolvedFunction
                                dom.byId(REG_FORM_CONTAINER_DOM_ID).style.visibility = STR_VISIBLE;
                                //noinspection JSUnresolvedFunction
                                dom.byId(REG_LOADER_ID).style.visibility = STR_HIDDEN;

                                presenter.showErrorBox(USER_SUCCESS_REGISTRATION_MSG);
                                presenter.form.reset();
                            } else if (data && data.result === STR_EXIST) {
                                presenter.showErrorBox(USER_EXIST_MSG);
                            } else {
                                presenter.showErrorBox(REGISTRATION_PROBLEM_MSG);
                            }
                        },
                        error:function () {
                            //can't add new user
                        }
                    });

                    //noinspection JSCheckFunctionSignatures
                    domConstruct.empty(this.messBox);

                } else {
                    this.showErrorBox(this.notValidValuesErrMsg);
                }
            }
        });
    }
);