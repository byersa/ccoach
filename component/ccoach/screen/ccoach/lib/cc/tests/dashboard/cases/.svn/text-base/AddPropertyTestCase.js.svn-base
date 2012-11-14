// cc/tests/dashboard/cases/AddPropertyTestCase;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file to test Add Property functionality
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
         * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
         * @static
         * @private
         * Constants that define contexts' objects IDs
         * Used to get object from contexts.
         */
        var CONFIRM_BTN_ID = 'addPropertyConfirmBtn',
            ADD_PROPERTY_FORM_ID = 'addPropertyForm',
            PROPERTY_PRESENTER_ID = 'propertyController';

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
         * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
         * @static
         * @private
         * Constants that define test error messages
         * Used as parameter of doh assert function.
         */
        var VALIDATION_UTILS_ERR_MSG = 'Validation Utils is not injected to SignIn presenter.',
            STREET_IS_EMPTY_ERR_MSG = 'Street is empty.',
            STREET_IS_UPPERCASE_FIRST_LETTER_ERR_MSG = 'Street is not valid, it should be started with upper case letter.',
            ZIP_IS_EMPTY_ERR_MSG = 'Zip is empty.',
            ZIP_IS_ZIP_ERR_MSG = 'Zip is not correct value, should be 5 digit, for example 12345.',
            PARCELNUM_IS_EMPTY_ERR_MSG = 'Parcel Number is empty.',
            ZIP_IS_PARCELNUM_ERR_MSG = 'Parcel Number is not correct value, should be 8 digit, for example 12345678 or 12-3456-78.',
            CITY_IS_EMPTY_ERR_MSG = 'City is empty.',
            CITY_IS_UPPERCASE_FIRST_LETTER_ERR_MSG = 'City is not valid, it should be started with upper case letter.',
            CITY_IS_DIGIT_FIRST_LETTER_ERR_MSG = 'City is not valid, first letter should not be digit.',
            COUNTY_IS_EMPTY_ERR_MSG = 'County is empty.',
            COUNTY_IS_UPPERCASE_FIRST_LETTER_ERR_MSG = 'County is not valid, it should be started with upper case letter.',
            COUNTY_IS_DIGIT_FIRST_LETTER_ERR_MSG = 'County is not valid, first letter should not be digit.',
            CLIENTID_IS_EMPTY_ERR_MSG = 'Client Id is empty.',
            CLIENTID_IS_UPPERCASE_FIRST_LETTER_ERR_MSG = 'Client Id is not valid, it should be started with upper case letter.',
            CLIENTID_IS_DIGIT_FIRST_LETTER_ERR_MSG = 'Client Id is not valid, first letter should not be digit.',
            CLIENTNAMES_IS_EMPTY_ERR_MSG = 'Client Names is empty.',
            CLIENTNAMES_IS_UPPERCASE_FIRST_LETTER_ERR_MSG = 'Client Names is not valid, it should be started with upper case letter.',
            CLIENTNAMES_IS_DIGIT_FIRST_LETTER_ERR_MSG = 'Client Names is not valid, first letter should not be digit.',
            CLIENTNOTES_IS_EMPTY_ERR_MSG = 'Client Notes is empty.',
            CLIENTNOTES_IS_UPPERCASE_FIRST_LETTER_ERR_MSG = 'Client Notes is not valid, it should be started with upper case letter.',
            CLIENTNOTES_IS_DIGIT_FIRST_LETTER_ERR_MSG = 'Client Notes is not valid, first letter should not be digit.',
            MLSNUM_IS_EMPTY_ERR_MSG = 'MLS Number is empty.',
            MLSNUM_IS_ALPHANUMERIC_ERR_MSG = 'MLS Number should be alphanumeric value.',
            PROPSQFT_IS_EMPTY_ERR_MSG = 'Property Square Feet is empty.',
            PROPSQFT_IS_DIGIT_ERR_MSG = 'Property Square Feet should be digit value.',
            PROPYEARBUILT_IS_EMPTY_ERR_MSG = 'Property Year Built is empty.',
            PROPYEARBUILT_IS_YEAR_ERR_MSG = 'Property Year Built is not valid value, should be 4 digits.',
            STYLE_IS_EMPTY_ERR_MSG = 'Style is empty.',
            STYLE_IS_UPPERCASE_FIRST_LETTER_ERR_MSG = 'Style is not valid, it should be started with upper case letter.',
            TOTALCOMM_IS_EMPTY_ERR_MSG = 'Total Commission is empty.',
            TOTALCOMM_IS_DIGIT_ERR_MSG = 'Total Commission should be digit value.',
            LISTPERCENTAGE_IS_EMPTY_ERR_MSG = 'List Percentage is empty.',
            LISTPERCENTAGE_IS_DIGIT_ERR_MSG = 'List Percentage should be digit value.',
            SELLPERCENTAGE_IS_EMPTY_ERR_MSG = 'Sell Percentage is empty.',
            SELLPERCENTAGE_IS_DIGIT_ERR_MSG = 'Sell Percentage should be digit value.',
            ORIGINALLP_IS_EMPTY_ERR_MSG = 'Original Listing Price is empty.',
            ORIGINALLP_IS_FLOATNUMBER_ERR_MSG = 'Original Listing Price should be in following format 12 or 12.23';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
         * @static
         * @private
         * Constants that define string representation of property
         * Used for getting value.
         */
        var VAL = 'value';

        //noinspection JSUnresolvedVariable,JSValidateJSDoc,JSUnusedGlobalSymbols
        return declare('cc.tests.dashboard.cases.AddPropertyTestCase', self.TestCase, {

            formValue:null,
            validator:null,
            dashboardCtx:null,

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Running setters for setting main class properties to use them in tests
             */
            setUp:function () {

                //noinspection JSUnresolvedVariable
                this.dashboardCtx = win.global.dashboardContext;

                //noinspection JSUnresolvedFunction
                var confirmBtn = this.dashboardCtx.provide(CONFIRM_BTN_ID);

                //noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
                aop.before(confirmBtn, STR_ONCLICK, lang.hitch(this, function () {
                    //noinspection JSPotentiallyInvalidUsageOfThis,JSUnresolvedFunction
                    this.formValue = this.dashboardCtx.provide(ADD_PROPERTY_FORM_ID).get(VAL);
                }));
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
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
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Street empty
             */
            testStreetIsEmpty:function $Assert() {
                //noinspection UnnecessaryLocalVariableJS,JSUnresolvedFunction
                var validator = this.dashboardCtx.provide(PROPERTY_PRESENTER_ID).validator;
                this.validator = validator;
                var actual = this.validator.isEmpty(null, this.formValue.situatedStreet1);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, STREET_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is upppercase first Street letter
             */
            testStreetIsUppercaseFirstLetter:function $Assert() {
                var actual = this.validator.isUppercaseFirstLetter(null, this.formValue.situatedStreet1);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, STREET_IS_UPPERCASE_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Zip empty
             */
            testZipIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.situatedZip);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, ZIP_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Zip correct value
             */
            testZipIsZip:function $Assert() {
                var actual = this.validator.isZip(null, this.formValue.situatedZip);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, ZIP_IS_ZIP_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Parcel Number empty
             */
            testParcelNumIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.parcelNum);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, PARCELNUM_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Parcel Number correct value
             */
            testParcelNumIsParcelNum:function $Assert() {
                var actual = this.validator.isParcelNumber(null, this.formValue.parcelNum);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, ZIP_IS_PARCELNUM_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is City empty
             */
            testCityIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.situatedCity);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, CITY_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is upppercase first City letter
             */
            testCityIsUppercaseFirstLetter:function $Assert() {
                var actual = this.validator.isUppercaseFirstLetter(null, this.formValue.situatedCity);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, CITY_IS_UPPERCASE_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is digit first City letter
             */
            testCityIsDigitFirstLetter:function $Assert() {
                var actual = this.validator.isDigitFirstLetter(null, this.formValue.situatedCity);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, CITY_IS_DIGIT_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is County empty
             */
            testCountyIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.situatedCounty);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, COUNTY_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is upppercase first County letter
             */
            testCountyIsUppercaseFirstLetter:function $Assert() {
                var actual = this.validator.isUppercaseFirstLetter(null, this.formValue.situatedCounty);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, COUNTY_IS_UPPERCASE_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is digit first County letter
             */
            testCountyIsDigitFirstLetter:function $Assert() {
                var actual = this.validator.isDigitFirstLetter(null, this.formValue.situatedCounty);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, COUNTY_IS_DIGIT_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Client Id empty
             */
            testClientIdIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.clientId);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, CLIENTID_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is upppercase first Client Id letter
             */
            testClientIdIsUppercaseFirstLetter:function $Assert() {
                var actual = this.validator.isUppercaseFirstLetter(null, this.formValue.clientId);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, CLIENTID_IS_UPPERCASE_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is digit first Client Id letter
             */
            testClientIdIsDigitFirstLetter:function $Assert() {
                var actual = this.validator.isDigitFirstLetter(null, this.formValue.clientId);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, CLIENTID_IS_DIGIT_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Client Names empty
             */
            testClientNamesIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.clientNames);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, CLIENTNAMES_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is upppercase first Client Names letter
             */
            testClientNamesIsUppercaseFirstLetter:function $Assert() {
                var actual = this.validator.isUppercaseFirstLetter(null, this.formValue.clientNames);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, CLIENTNAMES_IS_UPPERCASE_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is digit first Client Names letter
             */
            testClientNamesIsDigitFirstLetter:function $Assert() {
                var actual = this.validator.isDigitFirstLetter(null, this.formValue.clientNames);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, CLIENTNAMES_IS_DIGIT_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Client Notes empty
             */
            testClientNotesIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.clientNotes);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, CLIENTNOTES_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is upppercase first Client Notes letter
             */
            testClientNotesIsUppercaseFirstLetter:function $Assert() {
                var actual = this.validator.isUppercaseFirstLetter(null, this.formValue.clientNotes);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, CLIENTNOTES_IS_UPPERCASE_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is digit first Client Notes letter
             */
            testClientNotesIsDigitFirstLetter:function $Assert() {
                var actual = this.validator.isDigitFirstLetter(null, this.formValue.clientNotes);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, CLIENTNOTES_IS_DIGIT_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is MLS Number empty
             */
            testMlsNumIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.mlsNum);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, MLSNUM_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is MLS Number alphanumeric
             */
            testMlsNumIsAlphanumeric:function $Assert() {
                var actual = this.validator.isAlphaNumeric(null, this.formValue.mlsNum);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, MLSNUM_IS_ALPHANUMERIC_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Property Square Feet empty
             */
            testPropSqFtIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.propSqFt);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, PROPSQFT_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Property Square Feet digit
             */
            testPropSqFtIsDigit:function $Assert() {
                var actual = this.validator.isOnlyDigits(null, this.formValue.propSqFt);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, PROPSQFT_IS_DIGIT_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Property Year Built empty
             */
            testPropYearBuiltIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.propYearBuilt);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, PROPYEARBUILT_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Property Year Built year
             */
            testPropYearBuiltIsYear:function $Assert() {
                var actual = this.validator.isYear(null, this.formValue.propYearBuilt);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, PROPYEARBUILT_IS_YEAR_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Style empty
             */
            testStyleIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.propStyle);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, STYLE_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is upppercase first Style letter
             */
            testStyleIsUppercaseFirstLetter:function $Assert() {
                var actual = this.validator.isUppercaseFirstLetter(null, this.formValue.propStyle);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, STYLE_IS_UPPERCASE_FIRST_LETTER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Total Commission empty
             */
            testTotalCommissionIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.totalCommission);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, TOTALCOMM_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Total Commission digit
             */
            testTotalCommissionIsDigit:function $Assert() {
                var actual = this.validator.isOnlyDigits(null, this.formValue.totalCommission);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, TOTALCOMM_IS_DIGIT_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is List Percentage empty
             */
            testListPercentageIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.listPercentage);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, LISTPERCENTAGE_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is List Percentage digit
             */
            testListPercentageIsDigit:function $Assert() {
                var actual = this.validator.isOnlyDigits(null, this.formValue.listPercentage);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, LISTPERCENTAGE_IS_DIGIT_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Sell Percentage empty
             */
            testSellPercentageIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.sellPercentage);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, SELLPERCENTAGE_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Sell Percentage digit
             */
            testSellPercentageIsDigit:function $Assert() {
                var actual = this.validator.isOnlyDigits(null, this.formValue.sellPercentage);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, SELLPERCENTAGE_IS_DIGIT_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Original Listing Price empty
             */
            testOriginalLPIsEmpty:function $Assert() {
                var actual = this.validator.isEmpty(null, this.formValue.originalLP);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(!actual, ORIGINALLP_IS_EMPTY_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
             *
             * Tests is Original Listing Price empty
             */
            testOriginalLPIsFloatingNumber:function $Assert() {
                //noinspection UnnecessaryLocalVariableJS,JSUnresolvedFunction
                var validator = this.dashboardCtx.provide(PROPERTY_PRESENTER_ID).validator;
                this.validator = validator;
                var actual = this.validator.isFloatingNumber(null, this.formValue.originalLP);

                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                doh.t(actual, ORIGINALLP_IS_FLOATNUMBER_ERR_MSG);
            },

            /**
             * @memberOf cc.tests.dashboard.cases.AddPropertyTestCase
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