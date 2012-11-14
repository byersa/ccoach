// cc/modules/main/utils/ValidationUtils
//noinspection JSUnresolvedFunction
/**
 * @fileOverview Validator file, contains methods for validation values
 */
define(
    [
        'dojo/_base/declare',
        'dojo/string'
    ],

    function (declare, str) {

        var EMPTY_MESS = '${0} should not be empty',
            UPP_MESS = '${0} frist letter should be in uppercase',
            DIGIT_MESS = '${0} frist letter should not be digit',
            EMAIL_MESS = '${0} email is not valid',
            ZIP_MESS = '${0} should be 5 digits value',
            PARCEL_NUM_MESS = '${0} should be in the following format 12-3456-78 or 12345678',
            PHONE_MESS = '${0} should be in the following format 123-456-7890 or 1234567890',
            ALPHA_NUM_MESS = '${0} should be alphanumeric value',
            ONLY_DIGITS_MESS = '${0} should contain only digits',
            YEAR_MESS = '${0} should contain only 4 digits',
            FLOAT_NUMBER_MESS = '${0} should be in the following format 12 or 12.23',
            EQUAL_PASS_MESS = 'Passwords are not equal.';

        var DEF_RPOP = 'value',
            INVLD_PROP = 'invalidMessage';

        //noinspection JSUnusedGlobalSymbols,JSValidateJSDoc
        return declare('cc.modules.main.utils.ValidationUtils', null, {

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if value is empty
             */
            isEmpty:function (widget, value) {
                if (value == String()) {
                    //noinspection JSUnresolvedFunction
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(EMPTY_MESS, [widget.label || DEF_RPOP]));
                    }
                    return true;
                } else {
                    return false;
                }
            },

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if first letter of value is uppercase
             */
            isUppercaseFirstLetter:function (widget, value) {
                if (/[a-z]/.test(value.charAt(0))) {
                    //noinspection JSUnresolvedFunction
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(UPP_MESS, [widget.label || DEF_RPOP]));
                    }
                    return false;
                } else {
                    return true;
                }
            },

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if first letter of value is digit
             */
            isDigitFirstLetter:function (widget, value) {
                if (/[\d]/.test(value.charAt(0))) {
                    //noinspection JSUnresolvedFunction
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(DIGIT_MESS, [widget.label || DEF_RPOP]));
                    }
                    return true;
                } else {
                    return false;
                }
            },

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if value is valid email
             */
            isValidEmail:function (widget, value) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(value)) {
                    return true;
                } else {
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(EMAIL_MESS, [widget.label || DEF_RPOP]));
                    }
                    return false;
                }
            },

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if value is valid Zip, should contain 5 digits
             */
            isZip:function (widget, value) {
                if (/^\d{5}$/.test(value)) {
                    return true;
                } else {
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(ZIP_MESS, [widget.label || DEF_RPOP]));
                    }
                    return false;
                }
            },

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if value is valid Parcel Number, should contain 8 digits, or 8 digits in format 12-3456-78
             */
            isParcelNumber:function (widget, value) {
                if (/^\d{2}-\d{4}-\d{2}$|^\d{8}$/.test(value)) {
                    return true;
                } else {
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(PARCEL_NUM_MESS, [widget.label || DEF_RPOP]));
                    }
                    return false;
                }
            },

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if value is valid Phone, should contain 10 digits, or 10 digits in format 123-456-7890
             */
            isPhone:function (widget, value) {
                if (/^\d{3}-\d{3}-\d{4}$|^\d{10}$/.test(value)) {
                    return true;
                } else {
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(PHONE_MESS, [widget.label || DEF_RPOP]));
                    }
                    return false;
                }
            },

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if value contain only letters and digits
             */
            isAlphaNumeric:function (widget, value) {
                if (/[^a-zA-Z0-9]/.test(value)) {
                    return true;
                } else {
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(ALPHA_NUM_MESS, [widget.label || DEF_RPOP]));
                    }
                    return false;
                }
            },

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if value is digit
             */
            isOnlyDigits:function (widget, value) {
                if (/^\d+$/.test(value)) {
                    return true;
                } else {
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(ONLY_DIGITS_MESS, [widget.label || DEF_RPOP]));
                    }
                    return false;
                }
            },

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if value is valid Year, should contain 4 digits
             */
            isYear:function (widget, value) {
                if (/^\d{4}$/.test(value)) {
                    return true;
                } else {
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(YEAR_MESS, [widget.label || DEF_RPOP]));
                    }
                    return false;
                }
            },

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if value is valid floating number
             */
            isFloatingNumber:function (widget, value) {
                if(/^-?\d*(\.\d+)?$/.test(value)){
                    return true;
                } else {
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(FLOAT_NUMBER_MESS, [widget.label || DEF_RPOP]));
                    }
                    return false;
                }
            },

            /**
             * @memberOf cc.modules.main.utils.ValidationUtils
             *
             * Tests if passwords values equal
             */
            isPasswordsEqual:function(widget, value1, value2){
                if(value1 === value2){
                    return true;
                } else {
                    if (!!widget) {
                        //noinspection JSUnresolvedFunction
                        widget.set(INVLD_PROP, str.substitute(EQUAL_PASS_MESS, [widget.label || DEF_RPOP]));
                    }
                    return false;
                }
            }
        });
    }
);