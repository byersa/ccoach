// cc/tests/main/cases/NavToWelcomePageTestCase;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file to test Welcome page functionality
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/window'
    ],

    function (declare, win) {

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToWelcomePageTestCase
         * @static
         * @private
         * Constant that define id of Welcome page presenter
         * Used to get context with this id.
         */
        var WELCOME_PRESENTER_ID = 'welcomePresenter';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.main.cases.NavToWelcomePageTestCase
         * @static
         * @private
         * Constant that define presenter manageable error message
         * Used as parameter of doh assert function.
         */
        var PRESENTER_ERR_MSG = 'Welcome presenter is not manageable object.';

        //noinspection JSUnresolvedVariable,JSValidateJSDoc
        return declare('cc.tests.main.cases.NavToWelcomePageTestCase', self.TestCase, {

            ctx:null,

            presenter:null,

            /**
             * @memberOf cc.tests.main.cases.NavToWelcomePageTestCase
             *
             * Setting main page context as class property to use it in tests
             */
            before:function $BeforeTest() {
                //noinspection JSUnresolvedVariable
                this.ctx = win.global.welcomeContext;
            },

            /**
             * @memberOf cc.tests.main.cases.NavToWelcomePageTestCase
             *
             * Tests if presenter is manageable via context.
             */
            isWelcomePresenterExist:function $Assert() {

                //noinspection JSUnresolvedFunction
                var presenter = this.ctx.provide(WELCOME_PRESENTER_ID);
                this.presenter = presenter;

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(presenter, PRESENTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.main.cases.NavToWelcomePageTestCase
             *
             * Destroying properties(cleaning)
             */
            tearDown:function () {
                this.ctx = null;
                this.presenter = null;
            }
        });
    }
);