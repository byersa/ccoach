// cc/tests/main/cases/NavToSignInPageTestCase
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file to test SignIn page functionality
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
         * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
         * @static
         * @private
         * Constants that define presenter and form ID
         * Used to get object from contexts.
         */
        var SIGN_IN_PRESENTER_ID = 'signInPresenter',
            SIGN_IN_FORM_ID = 'userSignInForm';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
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
         * Constant that define action property name
         * Used for getting form value.
         */
        var STR_START = 'start';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
         * @static
         * @private
         * Constants that define test error messages
         * Used as parameter of doh assert function.
         */
        var PRESENTER_ERR_MSG = 'SignIn presenter is not manageable object.',
            VALIDATION_UTILS_ERR_MSG = 'Validation Utils is not injected to SignIn presenter.',
            LOGIN_IS_EMPTY_ERR_MSG = 'User Login should not be empty.',
            LOGIN_IS_DIGIT_FIRST_LETTER_ERR_MSG = 'Login is not valid, first letter should not be digit.',
            LOGIN_IS_UPPERCASE_FIRST_LETTER_ERR_MSG = 'Login is not valid, it should be started with upper case letter.',
            PASSWORD_IS_EMPTY_ERR_MSG = 'User Password is empty.';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
         * @static
         * @private
         * Constants that define string representation of property
         * Used for getting value.
         */
        var VAL = 'value';

        //noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,JSValidateJSDoc
        return declare('cc.tests.main.cases.NavToSignInPageTestCase', self.TestCase, {

            commonCtx:null,
            signInCtx: null,
            presenter:null,
            validator:null,
            formValue:null,
            dojo:null,

            /**
             * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
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
             * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
             *
             * Setting main class properties to use them in tests
             */
            beforeFormProceed:function () {
                //noinspection JSUnresolvedVariable
                this.commonCtx = win.global.commonContext;
                //noinspection JSUnresolvedVariable
                this.signInCtx = win.global.signInContext;

                //noinspection JSUnresolvedFunction
                var presenter = this.signInCtx.provide(SIGN_IN_PRESENTER_ID);

                //noinspection JSUnresolvedFunction
                this.validator = this.signInCtx.provide(SIGN_IN_PRESENTER_ID).validator;

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction,JSCheckFunctionSignatures
                aop.before(presenter.authenticationProcess, STR_START, lang.hitch(this, function () {
                    //noinspection JSPotentiallyInvalidUsageOfThis,JSPotentiallyInvalidUsageOfThis,JSUnresolvedFunction
                    this.formValue = this.commonCtx.provide(SIGN_IN_FORM_ID).get(VAL);
                }));
            },

            /**
             * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
             *
             * Tests if presenter is manageable via context.
             */
            isSignInPresenterExist:function $Assert() {
                //noinspection JSUnresolvedFunction
                var presenter = this.signInCtx.provide(SIGN_IN_PRESENTER_ID);
                this.presenter = presenter;

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(presenter, PRESENTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
             *
             * Tests if Validation utils is injected into presenter.
             */
            isValidatorExist:function $Assert() {
                //noinspection JSUnresolvedFunction
                var validator = this.signInCtx.provide(SIGN_IN_PRESENTER_ID).validator;
                this.validator = validator;

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(validator, VALIDATION_UTILS_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
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
             * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
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
             * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
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
             * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
             *
             * Tests is Password empty
             */
            testPasswordIsEmpty:function $Assert() {
                var user = new User(this.formValue);
                var actual = this.validator.isEmpty(null, user.password);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, PASSWORD_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToSignInPageTestCase
             *
             * Destroying properties(cleaning)
             */
            tearDown:function () {
                this.commonCtx = null;
                this.signInCtx = null;
                this.presenter = null;
                this.validator = null;
                this.formValue = null;
                this.dojo = null;
            }
        });
    }
);