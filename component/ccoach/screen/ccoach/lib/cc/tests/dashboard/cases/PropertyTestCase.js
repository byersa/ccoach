// cc/tests/dashboard/cases/PropertyTestCase;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file to test Property functionality
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/window'
    ],

    function(declare, win){

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.dashboard.cases.PropertyTestCase
         * @static
         * @private
         * Constants that define contexts' objects IDs
         * Used to get object from contexts.
         */
        var PROPERTY_PRESENTER_ID = 'propertyController';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.dashboard.cases.PropertyTestCase
         * @static
         * @private
         * Constants that define test error messages
         * Used as parameter of doh assert function.
         */
        var PRESENTER_ERR_MSG = 'Property presenter is not manageable object.',
            VALIDATION_UTILS_ERR_MSG = 'Validation Utils is not injected to Property presenter.',
            GRID_ERR_MSG = 'Property Grid does not exist.';

        //noinspection JSUnresolvedVariable,JSValidateJSDoc,JSUnusedGlobalSymbols
        return declare('cc.tests.dashboard.cases.PropertyTestCase', self.TestCase, {

            dashboardCtx:null,
            presenter:null,

            /**
             * @memberOf cc.tests.dashboard.cases.PropertyTestCase
             *
             * Running setters for setting main class properties to use them in tests
             */
            setUp:function () {
                //noinspection JSUnresolvedVariable
                this.dashboardCtx = win.global.dashboardContext;
            },

            /**
             * @memberOf cc.tests.dashboard.cases.PropertyTestCase
             *
             * Tests if presenter is manageable via context.
             */
            isPropertyPresenterExist:function $Assert() {
                //noinspection JSUnresolvedFunction
                var presenter = this.dashboardCtx.provide(PROPERTY_PRESENTER_ID);
                this.presenter = presenter;

                //noinspection JSUnresolvedVariable
                doh.t(presenter, PRESENTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.PropertyTestCase
             *
             * Tests if Validation utils is injected into presenter.
             */
            isValidatorExist:function $Assert() {
                //noinspection JSUnresolvedFunction
                var validator = this.dashboardCtx.provide(PROPERTY_PRESENTER_ID).validator;
                this.validator = validator;

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(validator, VALIDATION_UTILS_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.PropertyTestCase
             *
             * Tests if Property Grid exist.
             */
            isPropertyGridExist:function $Assert() {
                //noinspection JSUnresolvedFunction
                var grid = this.dashboardCtx.provide('propertyGrid');
                //noinspection JSUnresolvedVariable
                doh.t(grid, GRID_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.PropertyTestCase
             *
             * Destroying properties(cleaning)
             */
            tearDown:function () {
                this.dashboardCtx = null;
                this.presenter = null;
            }
        });
    }
);