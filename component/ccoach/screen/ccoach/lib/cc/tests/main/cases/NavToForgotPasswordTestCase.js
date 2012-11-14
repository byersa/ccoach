// cc/tests/main/cases/NavToForgotPasswordTestCase
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file to test Forgot Password page functionality
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/window',
        'dojo/_base/lang',
        'dojo/aspect',
        'dojo/on'
    ],

    function (declare, win, lang, aop, on) {

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToForgotPasswordTestCase
         * @static
         * @private
         * Constants that define presenter and form ID
         * Used to get object from contexts.
         */
        var FORGOT_PASS_PRESENTER_ID = 'forgotPassPresenter',
            FORGOT_PASS_FORM_ID = 'forgorPassForm',
            PERFORM_RENEW_BTN_ID = 'performRenewPassBtn';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToRegisterPageTestCase
         * @static
         * @private
         * Constant that define button event name
         * Used for getting form value.
         */
        var STR_ONCLICK = 'onClick';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToForgotPasswordTestCase
         * @static
         * @private
         * Constants that define test error messages
         * Used as parameter of doh assert function.
         */
        var PRESENTER_ERR_MSG = 'Forgot Password presenter is not manageable object.',
            VALIDATION_UTILS_ERR_MSG = 'Validation Utils is not injected to SignIn presenter.',
            EMAIL_IS_EMAIL_ERR_MSG = 'Not valid email.';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToForgotPasswordTestCase
         * @static
         * @private
         * Constants that define string representation of property
         * Used for getting value.
         */
        var VAL = 'value';

        //noinspection JSUnresolvedVariable,JSValidateJSDoc,JSUnusedGlobalSymbols
        return declare('cc.tests.main.cases.NavToForgotPasswordTestCase', self.TestCase, {

            forgotPassCtx:null,
            presenter:null,
            formValue:null,

            /**
             * @memberOf cc.tests.main.cases.NavToForgotPasswordTestCase
             *
             * Running setters for setting main class properties to use them in tests
             */
            setUp:function () {
                //noinspection JSUnresolvedVariable
                this.forgotPassCtx = win.global.forgotPasswordContext;

                //noinspection JSUnresolvedFunction
                var btn = this.forgotPassCtx.provide(PERFORM_RENEW_BTN_ID);

                //noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
                aop.before(btn, STR_ONCLICK, lang.hitch(this, function () {
                    //noinspection JSPotentiallyInvalidUsageOfThis,JSUnresolvedFunction
                    this.formValue = this.forgotPassCtx.provide(FORGOT_PASS_FORM_ID).get(VAL);
                }));
            },

            /**
             * @memberOf cc.tests.main.cases.NavToForgotPasswordTestCase
             *
             * Tests if presenter is manageable via context.
             */
            isForgotPassPresenterExist:function $Assert() {
                //noinspection JSUnresolvedFunction
                var presenter = this.forgotPassCtx.provide(FORGOT_PASS_PRESENTER_ID);
                this.presenter = presenter;

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(presenter, PRESENTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToForgotPasswordTestCase
             *
             * Tests if Validation utils is injected into presenter.
             */
            isValidatorExist:function $Assert() {
                //noinspection JSUnresolvedFunction
                var validator = this.forgotPassCtx.provide(FORGOT_PASS_PRESENTER_ID).validator;
                this.validator = validator;

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(validator, VALIDATION_UTILS_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToForgotPasswordTestCase
             *
             * Tests is valid email
             */
            testEmailIsEmail:function $Assert() {
                //noinspection JSUnresolvedFunction
                var validator = this.forgotPassCtx.provide(FORGOT_PASS_PRESENTER_ID).validator;
                var actual = validator.isValidEmail(null, this.formValue.clientEmail);
                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, EMAIL_IS_EMAIL_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToForgotPasswordTestCase
             *
             * Destroying properties(cleaning)
             */
            tearDown:function () {
                this.forgotPassCtx = null;
                this.presenter = null;
                this.formValue = null;
            }
        });
    }
);