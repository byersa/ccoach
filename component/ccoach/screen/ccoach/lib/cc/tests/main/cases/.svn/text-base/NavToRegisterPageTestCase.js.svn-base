// cc/tests/main/cases/NavToRegisterPageTestCase
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file to test Register page functionality
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/window',
        'dojo/_base/lang',
        'dojo/aspect'
    ],

    function (declare, win, lang, aop) {

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
         * @static
         * @private
         * Constants that define presenters' IDs
         * Used to get object from contexts.
         */
        var WELCOME_PRESENTER_ID = 'welcomePresenter',
            REGISTER_PRESENTER_ID = 'registerPresenter',
            REGISTER_FORM_ID = 'userRegisterForm';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
         * @static
         * @private
         * Constant that define User class name
         * Used for validation of form input values.
         */
        var USER_CLASS_NAME = 'cc.internal.User';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
         * @static
         * @private
         * Constant that define presenter property name
         * Used for getting form value.
         */
        var STR_HANDLE_BTN_CLICK = 'handleBtnClick';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
         * @static
         * @private
         * Constant that define presenter manageable error message
         * Used as parameter of doh assert function.
         */
        var WELCOME_PRESENTER_ERR_MSG = 'Welcome presenter is not manageable object.',
            REGISTER_PRESENTER_ERR_MSG = 'Register presenter is not manageable object.',
            VALIDATION_UTILS_ERR_MSG = 'Validation Utils is not injected to Register presenter.',
            LOGIN_IS_EMPTY_ERR_MSG = 'User Login is empty, it should be word which start with Uppercase letter',
            LOGIN_IS_DIGIT_FIRST_LETTER_ERR_MSG = 'Login is not valid, first letter should not be digit.',
            LOGIN_IS_UPPERCASE_FIRST_LETTER_ERR_MSG = 'Login is not valid, it should be started with upper case letter';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
         * @static
         * @private
         * Constants that define string representation of property
         * Used for getting value.
         */
        var VAL = 'value';

        //noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,JSValidateJSDoc
        return declare('cc.tests.main.cases.NavToRegisterPageTestCase', self.TestCase, {

            commonCtx:null,
            welcomeCtx:null,
            registerCtx:null,
            welcomePresenter:null,
            registerPresenter:null,
            validator:null,
            formValue:null,
            dojo:null,

            /**
             * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
             *
             * Running setters for setting main class properties to use them in tests
             */
            setUp:function () {
                this.beforeFormProceed();
                this.dojo = win.global.dojo;
                //noinspection JSUndeclaredVariable,JSUnresolvedFunction
                User = this.dojo.getObject(USER_CLASS_NAME);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
             *
             * Setting main class properties to use them in tests
             */
            beforeFormProceed:function () {

                //noinspection JSUnresolvedVariable
                this.commonCtx = win.global.commonContext;
                //noinspection JSUnresolvedVariable
                this.welcomeCtx = win.global.welcomeContext;
                //noinspection JSUnresolvedVariable
                this.registerCtx = win.global.registerContext;

                //noinspection JSUnresolvedFunction
                this.welcomePresenter = this.welcomeCtx.provide(WELCOME_PRESENTER_ID);
                //noinspection JSUnresolvedFunction
                var registerPresenter = this.registerCtx.provide(REGISTER_PRESENTER_ID);
                this.registerPresenter = registerPresenter;

                //noinspection JSUnresolvedFunction
                this.validator = this.registerCtx.provide(REGISTER_PRESENTER_ID).validator;

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction,JSCheckFunctionSignatures
                aop.before(registerPresenter, STR_HANDLE_BTN_CLICK, lang.hitch(this, function () {
                    //noinspection JSPotentiallyInvalidUsageOfThis,JSPotentiallyInvalidUsageOfThis,JSUnresolvedFunction
                     this.formValue = this.commonCtx.provide(REGISTER_FORM_ID).get(VAL);
                 }));
            },

            /**
             * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
             *
             * Tests if presenter is manageable via context.
             */
            isWelcomePresenterExist:function $Assert() {
                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(this.welcomePresenter, WELCOME_PRESENTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
             *
             * Tests if presenter is manageable via context.
             */
            isRegisterPresenterExist:function $Assert() {
                //noinspection JSUnresolvedVariable,JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(this.registerPresenter, REGISTER_PRESENTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
             *
             * Tests if Validation utils is injected into presenter.
             */
            isValidatorExist:function $Assert() {
                //noinspection JSUnresolvedFunction
                var validator = this.registerCtx.provide(REGISTER_PRESENTER_ID).validator;
                this.validator = validator;

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(validator, VALIDATION_UTILS_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
             *
             * Tests is Login empty
             */
            testLoginIsEmpty:function $Assert() {
                var user = new User(this.formValue);
                var actual = this.validator.isEmpty(null, user.login);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, LOGIN_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
             *
             * Tests is digit first Login letter
             */
            testLoginIsDigitFirstLetter:function $Assert() {
                var user = new User(this.formValue);
                var actual = this.validator.isDigitFirstLetter(null, user.login);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, LOGIN_IS_DIGIT_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
             *
             * Tests is upppercase first Login letter
             */
            testLoginIsUppercaseFirstLetter:function $Assert() {
                var user = new User(this.formValue);
                var actual = this.validator.isUppercaseFirstLetter(null, user.login);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, LOGIN_IS_UPPERCASE_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
             *
             * Destroying properties(cleaning)
             */
            tearDown:function () {
                this.commonCtx = null;
                this.welcomeCtx = null;
                this.registerCtx = null;
                this.welcomePresenter = null;
                this.registerPresenter = null;
                this.validator = null;
                this.formValue = null;
                this.dojo = null;
            }
        });
    }
);