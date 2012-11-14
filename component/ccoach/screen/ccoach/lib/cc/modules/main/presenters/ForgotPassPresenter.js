// cc/modules/main/presenters/ForgotPassPresenter
//noinspection JSUnresolvedFunction
/**
 * @fileOverview Forgot password page controller(presenter)
 */
define(
    [
        'dojo/_base/declare',
        'dojo/dom-construct',
        'dojo/string',
        'dojo/_base/xhr',
        'cc/modules/main/presenters/BasePresenter'
    ],

    function(declare, domConstruct, str, xhr, BasePresenter){

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.ForgotPassPresenter
         * @static
         * @private
         * Constant that defines id of screen container.
         * Used to get container bean from context.
         */
        var FORGOT_PASS_FORM_ID = 'forgorPassForm';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.ForgotPassPresenter
         * @static
         * @private
         * Constants that define string values
         * Used as to make code easier.
         */
        var STR_JSON = 'json',
            STR_SUCCESS = 'success',
            STR_NOT_EXIST = 'not exist';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.ForgotPassPresenter
         * @static
         * @private
         * Constant that define error message text
         * Used as parameter of action to show it in case on not succesful Sing in.
         */
        var ERR_MESS_NOT_EXIST = 'User with provided login does not exist.',
            SUCCESS_MSG = 'Recovery link was sent to your email.';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.ForgotPassPresenter
         * @static
         * @private
         * Constants that define templates
         * Used for replacing values in string substitute
         */
        var SEND_RECOVERY_SERVICE_URL_TMPL = '/ccoach/control/jsonservice?serviceName=sendRecoveryPasswordLink&email=${email}';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.ForgotPassPresenter
         * @static
         * @private
         * Constant that define name of "value" field of widget type.
         * Used into get and set method of widget.
         */
        var VALUE = 'value';

        /**
         * @class cc.modules.main.ForgotPassPresenter The class incapsulate logic to work with ForgotPassword View
         */
        //noinspection JSValidateJSDoc,JSValidateJSDoc,JSUnusedGlobalSymbols
        return declare('cc.modules.main.presenters.ForgotPassPresenter', BasePresenter, {

            /**
             * @constructor Creates an instance of cc.modules.main.ForgotPassPresenter class
             */
            constructor: function(){
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);

                this.formId = 'forgorPassForm';
                this.messBoxId = 'forgotPassMessBox';

                this.validationErrors = {
                    email: false
                }
            },

            /**
             * @memberOf cc.modules.main.ForgotPassPresenter.prototype
             *
             * Stores result of email validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.ForgotPassPresenter.validationErrors}
             */
            updateEmailValidationStatus: function(result){
                this.validationErrors.email = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.ForgotPassPresenter.prototype
             *
             * Validate email value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateEmail:function(widget, value){
                return !(this.validator.isEmpty(widget, value) ||
                        !this.validator.isValidEmail(widget, value));
            },

            handleBtnClick: function(){
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);

                if(this.getErrors()){
                    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                    var formValue = commonContext.provide(FORGOT_PASS_FORM_ID).get(VALUE);

                    //noinspection JSUnresolvedFunction
                    var serviceUrl = str.substitute(SEND_RECOVERY_SERVICE_URL_TMPL, formValue);

                    var presenter = this;

                    xhr.get({
                        url:serviceUrl,
                        handleAs:STR_JSON,
                        load:function (data) {
                            presenter.handleData(data);
                        }, error:function () {
                            // xhr Error;
                        }
                    });

                    domConstruct.empty(this.messBox);
                    this.form.reset();
                } else {
                    this.showErrorBox(this.notValidValuesErrMsg);
                }
            },

            handleData: function(data){
                if(data.result === STR_SUCCESS){
                    this.showErrorBox(SUCCESS_MSG);
                } else if(data.result === STR_NOT_EXIST){
                    this.showErrorBox(ERR_MESS_NOT_EXIST);
                }
            }
        });
    }
);