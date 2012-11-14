// cc/modules/main/presenters/SignInPresenter
//noinspection JSUnresolvedFunction
/**
 * @fileOverview Sign In page controller(presenter)
 */
define(
    [
        'dojo/_base/declare',
        'dojo/dom-construct',
        'dojo/_base/lang',
        'dojo/dom',
        'dojo/dom-style',
        'dojo/string',
        'dojo/_base/xhr',
        'dojobiz/context/Container',

        'cc/internal/User',
        'cc/modules/main/presenters/BasePresenter'
    ],

    function (declare, domConstruct, lang, dom, style, str, xhr, Container, User, BasePresenter) {

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.SignInPresenter
         * @static
         * @private
         * Constants that define string values
         * Used as to make code easier.
         */
        var STR_DISPLAY = 'display',
            STR_NONE = 'none',
            STR_INLINE = 'inline',
            STR_VISIBILITY = 'visibility',
            STR_VISIBLE = 'visible',
            STR_JSON = 'json',
            STR_HIDDEN = 'hidden';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.SignInPresenter
         * @static
         * @private
         * Constants that define service result
         * Used as to make code easier.
         */
        var RES_TYPE_SUCCESS = 'success',
            RES_TYPE_NOT_VERIFIED = 'not verified',
            RES_TYPE_WRONG_PASSWORD = 'wrong password',
            RES_TYPE_NOT_EXIST = 'not exist';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.SignInPresenter
         * @static
         * @private
         * Dom elements' IDs
         * Used to get elements.
         */
        var SIGNOUT_LINK_ID = 'signOutNavLink',
            MYACCOUNT_LINK_ID = 'myAccountNavLink',
            SIGNIN_LINK_ID = 'signInNavLink',
            REGISTER_LINK_ID = 'registerNavLink',
            HEADER_USER_STATUS_ID = 'headerActiveUserStatus',
            MESS_BOX_ID = 'signInMessBox',
            SIGN_IN_FORM_ID = 'userSignInForm',
            WELCOME_SCREEN_ID = 'welcomeScreenContainer',
            DASHBOARD_STATE_ID = 'dashboardScreenState',
            START_SCREEN_ID = 'startScreen',
            COMMON_CTX_ID = 'commonContext',
            SIGN_IN_LOADER_ID = 'sinInIELoader',
            SIGN_IN_CONTAINER_DOM_ID = 'signIn';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.SignInPresenter
         * @static
         * @private
         * Constants that define templates
         * Used for replacing values in string substitute
         */
        var HEADER_STATUS_TMPL = 'Contract Coach - ${fName} ${lName} <span id="userRole">${role}</span>',
            GET_USER_SERVICE_URL_TMPL = '/ccoach/control/jsonservice?serviceName=userSignIn' +
            '&email=${userLoginId}' +
            '&password=${password}';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.SignInPresenter
         * @static
         * @private
         * Constant that define error message text
         * Used as parameter of action to show it in case on not succesful Sing in.
         */
        var ERR_MESS_NOT_EXIST = 'User with provided login does not exist.',
            ERR_MESS_WRONG_PASS = 'Wrong password.',
            ERR_MESS_NOT_VERIFIED = 'This user is not verified yet.';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.SignInPresenter
         * @static
         * @private
         * Constant that define name of "value" field of widget type.
         * Used into get and set method of widget.
         */
        var VALUE = 'value';

        /**
         * @class cc.modules.main.SignInPresenter The class incapsulate logic to work with SignIn View
         */
        //noinspection JSValidateJSDoc,JSValidateJSDoc,JSUnusedGlobalSymbols
        return declare('cc.modules.main.presenters.SignInPresenter', BasePresenter, {

            validator:null,
            /**
             * @constructor Creates an instance of cc.modules.main.presenters.SignInPresenter class
             */
            constructor:function () {
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);

                this.formId = 'userSignInForm';
                this.messBoxId = MESS_BOX_ID;

                this.validationErrors = {
                    login:false,
                    password:false
                };
            },

            /**
             * @memberOf cc.modules.main.presenters.SignInPresenter.prototype
             *
             * Stores result of login validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.presenters.SignInPresenter.validationErrors}
             */
            updateLoginValidationStatus:function (result) {
                this.validationErrors.login = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.presenters.SignInPresenter.prototype
             *
             * Stores result of password validation to internal hash to separete bussiness logic from view processing.
             * @param {Boolean} result The result of validation function invoked on particular widget.
             * @return {Boolean} result The same result as retrieved parameter.
             *
             * @link {cc.modules.main.SignInPresenter.validationErrors}
             */
            updatePasswordValidationStatus:function (result) {
                this.validationErrors.password = result;
                return result;
            },

            /**
             * @memberOf cc.modules.main.presenters.SignInPresenter.prototype
             *
             * Validate login value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validateLogin:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            /**
             * @memberOf cc.modules.main.presenters.SignInPresenter.prototype
             *
             * Validate password value.
             * @param {Widget} widget which will be validated
             * @param {Value} value of widget
             * @return {Boolean} result The result of used validation.
             */
            validatePassword:function (widget, value) {
                return !this.validator.isEmpty(widget, value);
            },

            displayMessage:function (msg) {
                this.showErrorBox(msg);
            },

            replaceTopLinks:function () {

                //noinspection JSUnresolvedFunction
                style.set(dom.byId(SIGNIN_LINK_ID), STR_DISPLAY, STR_NONE);
                //noinspection JSUnresolvedFunction
                style.set(dom.byId(REGISTER_LINK_ID), STR_DISPLAY, STR_NONE);
                //noinspection JSUnresolvedFunction
                style.set(dom.byId(SIGNOUT_LINK_ID), STR_DISPLAY, STR_INLINE);
                //noinspection JSUnresolvedFunction
                style.set(dom.byId(MYACCOUNT_LINK_ID), STR_DISPLAY, STR_INLINE);

                //noinspection JSUnresolvedFunction,JSUnusedGlobalSymbols
                dom.byId(HEADER_USER_STATUS_ID).innerHTML = str.substitute(HEADER_STATUS_TMPL,
                    {
                        fName:this.userInfo.name,
                        lName:this.userInfo.lastName,
                        role:this.userInfo.role
                    }
                );
                //noinspection JSUnresolvedFunction
                style.set(dom.byId(HEADER_USER_STATUS_ID), STR_VISIBILITY, STR_VISIBLE);
            },

            handleBtnClick:function () {
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);

                if (this.getErrors()) {
                    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                    var formValue = commonContext.provide(SIGN_IN_FORM_ID).get(VALUE);

                    //noinspection JSUnresolvedFunction
                    var serviceUrl = str.substitute(GET_USER_SERVICE_URL_TMPL,
                        {
                            userLoginId:formValue.login,
                            password:formValue.password
                        });
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
                } else {
                    this.displayMessage(this.notValidValuesErrMsg);
                }
            },

            handleData: function(data){

                if(data.result === RES_TYPE_SUCCESS){
                    var isMSIE = /*@cc_on!@*/0;
                    if (!isMSIE) {
                         //noinspection JSUnresolvedFunction
                         var startScreen = dom.byId(START_SCREEN_ID);
                         startScreen.style.border = '500px solid rgba(0, 0, 0, 0.8)';
                         startScreen.style.visibility = STR_VISIBLE;
                    } else {
                        //noinspection JSUnresolvedFunction
                        dom.byId(SIGN_IN_CONTAINER_DOM_ID).style.visibility = STR_HIDDEN;
                        //noinspection JSUnresolvedFunction
                        dom.byId(SIGN_IN_LOADER_ID).style.visibility = STR_VISIBLE;
                    }

                    //noinspection JSUnresolvedVariable
                    User.update(this.userInfo, data.user);
                    //noinspection JSUnresolvedFunction
                    var container = Container.getContext(COMMON_CTX_ID).provide(WELCOME_SCREEN_ID);
                    this.replaceTopLinks();
                    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                    FlowUtils.setState(container, DASHBOARD_STATE_ID);

                    domConstruct.empty(this.messBox);
                    this.form.reset();
                } else if(data.result === RES_TYPE_NOT_VERIFIED){
                    this.displayMessage(ERR_MESS_NOT_VERIFIED);
                } else if(data.result === RES_TYPE_WRONG_PASSWORD){
                    this.displayMessage(ERR_MESS_WRONG_PASS);
                } else if(data.result === RES_TYPE_NOT_EXIST){
                    this.displayMessage(ERR_MESS_NOT_EXIST);
                }
            }

            /**
             * Autowired. Holds information about current user
             * @name userInfo
             * @property {cc.internal.User}
             */

            /**
             * Autowired. Action group that start asynchronous access to server-side dashboard data.
             * @name authenticationProcess
             * @property {dojobiz.context.actions.QueuedActionGroup}
             */

        });
    }
);