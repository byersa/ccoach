// cc/tests/dashboard/cases/AddOfferTestCase
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file to test Add Offer functionality
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
         * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
         * @static
         * @private
         * Constants that define contexts' objects IDs
         * Used to get object from contexts.
         */
        var OFFER_CONTROLLER_ID = 'offerController';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
         * @static
         * @private
         * Constant that define presenter property name
         * Used for getting form value.
         */
        var HANDLE_CONFIRM = 'handleAddOfferConfirmBtn';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
         * @static
         * @private
         * Constants that define test error messages
         * Used as parameter of doh assert function.
         */
        var VALIDATION_UTILS_ERR_MSG = 'Validation Utils is not injected to Offer presenter.',
            CREATIONDATE_IS_EMPTY_ERR_MSG = 'Creation Date is empty.',
            OFFERFROM_IS_EMPTY_ERR_MSG = 'Offer From is empty.',
            PROPDESC_IS_EMPTY_ERR_MSG = 'Property Description is empty.',
            PARCELNUM_IS_EMPTY_ERR_MSG = 'Parcel Number is empty.',
            SITUATEDCITY_IS_EMPTY_ERR_MSG = 'Situated City is empty.',
            SITUATEDCOUNTY_IS_EMPTY_ERR_MSG = 'Situated County is empty.',
            FORMDATE_IS_EMPTY_ERR_MSG = 'Form Date is empty.';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
         * @static
         * @private
         * Constants that define string representation of property
         * Used for getting value.
         */
        var VAL = 'value';

        //noinspection JSUnresolvedVariable,JSValidateJSDoc,JSUnusedGlobalSymbols
        return declare('cc.tests.dashboard.cases.AddOfferTestCase', self.TestCase, {

            formValue:null,
            validator:null,
            dashboardCtx:null,

            /**
             * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
             *
             * Running setters for setting main class properties to use them in tests
             */
            setUp:function () {
                //noinspection JSUnresolvedVariable
                this.dashboardCtx = win.global.dashboardContext;

                //noinspection JSUnresolvedFunction
                var presenter = this.dashboardCtx.provide(OFFER_CONTROLLER_ID);

                //noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
                aop.before(presenter, HANDLE_CONFIRM, lang.hitch(this, function () {
                    this.formValue = presenter.addOfferForm.get(VAL)
                }));
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
             *
             * Tests if Validation utils is injected into presenter.
             */
            isValidatorExist:function $Assert() {
                //noinspection JSUnresolvedFunction
                var validator = this.dashboardCtx.provide(OFFER_CONTROLLER_ID).validator;
                this.validator = validator;

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(validator, VALIDATION_UTILS_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
             *
             * Tests is Creation Date empty
             */
            testCreationDateIsEmpty:function $Assert() {
                //noinspection UnnecessaryLocalVariableJS,JSUnresolvedFunction
                var validator = this.dashboardCtx.provide(OFFER_CONTROLLER_ID).validator;
                this.validator = validator;
                var actual = this.validator.isEmpty(null, this.formValue.creationDate);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, CREATIONDATE_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
             *
             * Tests is Offer From empty
             */
            testOfferFromIsEmpty:function $Assert() {
                //noinspection UnnecessaryLocalVariableJS,JSUnresolvedFunction
                var validator = this.dashboardCtx.provide(OFFER_CONTROLLER_ID).validator;
                this.validator = validator;
                var actual = this.validator.isEmpty(null, this.formValue.offerFrom);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, OFFERFROM_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
             *
             * Tests is Property Description empty
             */
            testPropertyDescriptionIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.propertyDescription);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, PROPDESC_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
             *
             * Tests is Parcel Number empty
             */
            testParcelNumIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.parcelNum);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, PARCELNUM_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
             *
             * Tests is Situated City empty
             */
            testSituatedCityIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.situatedCity);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, SITUATEDCITY_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
             *
             * Tests is Situated County empty
             */
            testSituatedCountyIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.situatedCounty);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, SITUATEDCOUNTY_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
             *
             * Tests is From Date empty
             */
            testFromDateIsEmpty:function $Assert() {
                //noinspection UnnecessaryLocalVariableJS,JSUnresolvedFunction
                var validator = this.dashboardCtx.provide(OFFER_CONTROLLER_ID).validator;
                this.validator = validator;
                var actual = this.validator.isEmpty(null, this.formValue.fromDate);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, FORMDATE_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddOfferTestCase
             *
             * Destroying properties(cleaning)
             */
            tearDown:function () {
                this.formValue = null;
                this.validator = null;
                this.dashboardCtx = null;
            }
        });
    }
);