// cc/tests/dashboard/cases/DeactivatePropertyTestCase
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file to test SignIn page functionality
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/window'
    ],

    function (declare, win) {

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.dashboard.cases.DeactivatePropertyTestCase
         * @static
         * @private
         * Constants that define context objects' IDs
         * Used to get object from contexts.
         */
        var PROPERTY_GRID_ID = 'propertyGrid';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.dashboard.cases.DeactivatePropertyTestCase
         * @static
         * @private
         * Constants that define test error messages
         * Used as parameter of doh assert function.
         */
        var DEACTIVATION_ERR_MSG = 'Property was not deactivated.';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.dashboard.cases.DeactivatePropertyTestCase
         * @static
         * @private
         * Constants that define string representation of statusId value
         * Used for comparing changed value.
         */
        var DEACTIVATED_VALUE = 'Not active';

        //noinspection JSUnresolvedVariable,JSValidateJSDoc
        return declare('cc.tests.dashboard.cases.DeactivatePropertyTestCase', self.TestCase, {

            /**
             * @memberOf cc.tests.dashboard.cases.DeactivatePropertyTestCase
             *
             * Tests if property was activated
             */
            isItemDeactivated:function $Assert() {

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                var grid = win.global.dashboardContext.provide(PROPERTY_GRID_ID);

                //noinspection RedundantConditionalExpressionJS,JSUnresolvedFunction
                var actual = grid.selection.getSelected()[0].statusId === DEACTIVATED_VALUE ? true : false;

                //noinspection JSUnresolvedVariable
                doh.t(actual, DEACTIVATION_ERR_MSG);
            }
        });
    }
);