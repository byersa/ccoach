// cc/tests/dashboard/cases/OfferTestCase;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file to test Offer functionality
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/window',
        'dijit/registry'
    ],

    function(declare, win, registry){

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.dashboard.cases.OfferTestCase
         * @static
         * @private
         * Constants that define contexts' objects IDs
         * Used to get object from contexts.
         */
        var OFFER_PRESENTER_ID = 'offerController';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.dashboard.cases.OfferTestCase
         * @static
         * @private
         * Constants that define test error messages
         * Used as parameter of doh assert function.
         */
        var PRESENTER_ERR_MSG = 'Offer presenter is not manageable object.',
            VALIDATION_UTILS_ERR_MSG = 'Validation Utils is not injected to Offer presenter.';

        //noinspection JSUnresolvedVariable,JSValidateJSDoc,JSUnusedGlobalSymbols
        return declare('cc.tests.dashboard.cases.OfferTestCase', self.TestCase, {

            dashboardCtx:null,
            presenter:null,

            /**
             * @memberOf cc.tests.dashboard.cases.OfferTestCase
             *
             * Running setters for setting main class properties to use them in tests
             */
            setUp:function () {
                //noinspection JSUnresolvedVariable
                this.dashboardCtx = win.global.dashboardContext;
            },

            /**
             * @memberOf cc.tests.dashboard.cases.OfferTestCase
             *
             * Tests if presenter is manageable via context.
             */
            isOfferPresenterExist:function $Assert() {
                //noinspection JSUnresolvedFunction
                var presenter = this.dashboardCtx.provide(OFFER_PRESENTER_ID);
                this.presenter = presenter;

                //noinspection JSUnresolvedVariable
                doh.t(presenter, PRESENTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.OfferTestCase
             *
             * Tests if Validation utils is injected into presenter.
             */
            isValidatorExist:function $Assert() {
                //noinspection JSUnresolvedFunction
                var validator = this.dashboardCtx.provide(OFFER_PRESENTER_ID).validator;
                this.validator = validator;

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(validator, VALIDATION_UTILS_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.OfferTestCase
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