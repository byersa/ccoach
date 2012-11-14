// cc/modules/dashboard/presenters/BasePresenter;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview base(dashboard screen) controller(presenter) class
 */
define(
    [
        'dojo/_base/declare',
        'dojo/dom-construct',
        'dojo/date/locale'
    ],

    function (declare, domConstruct, locale) {

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.BasePresenter
         * @static
         * @private
         * Constants that define Error box class
         * Used to set this class for error box when message is addded.
         */
        var ERR_MSG_BOX_CLASS = 'formErrorMsg',
            ERR_MSG_BOX_STYLE = 'overflow:auto; height:200px';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.BasePresenter
         * @static
         * @private
         * Constants that define string values
         * Used as to make code easier.
         */
        var STR_DATE = 'date',
            STR_ZERO = '0',
            STR_DIV = 'div',
            STR_STRING = 'string',
            STR_SLASH = '/';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.BasePresenter
         * @static
         * @private
         * Constants that define current date
         * Used for creating string formatted values of time.
         */
        var CURRENT_DATE_OBJ = new Date();

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.BasePresenter
         * @static
         * @private
         * Constants that define date formatting
         * Used for creating string formatted values of time.
         */
        var MM_DD_YYYY_SLASH = 'MM/dd/yyyy';

        return declare('cc.modules.dashboard.presenters.BasePresenter', null, {

            validator:null,
            validationErrors:null,
            notRequiredFields:{},

            constructor:function () {
                this.validationErrors = {};
            },

            getErrors:function () {
                for (var key in this.validationErrors) {
                    if (this.validationErrors.hasOwnProperty(key) && !this.validationErrors[key].value) {
                        return false;
                    }
                }
                return true;
            },

            fromObjectDate:function (value) {

                var month = '';
                var day = '';

                if (value) {
                    if (typeof value === STR_STRING) {
                        return value;
                    } else {
                        //noinspection JSUnresolvedVariable
                        var dateMonth = value._value.month;
                        //noinspection JSUnresolvedVariable
                        var dateDay = value._value.day;
                        //noinspection JSUnresolvedVariable
                        var dateYear = value._value.year;
                        if (1 + Math.floor(Math.log(dateMonth + 1) / Math.log(10)) === 1) {
                            month = STR_ZERO + (dateMonth + 1).toString();
                        } else {
                            month = (dateMonth + 1).toString();
                        }

                        if (1 + Math.floor(Math.log(dateDay) / Math.log(10)) === 1) {
                            day = STR_ZERO + dateDay.toString();
                        } else {
                            day = dateDay.toString();
                        }

                        return month + STR_SLASH + day + STR_SLASH + dateYear;
                    }
                } else {
                    return this.dateToString(CURRENT_DATE_OBJ, MM_DD_YYYY_SLASH);
                }
            },

            dateToString:function (value, format) {
                //noinspection JSUnresolvedFunction
                return locale.format(
                    value,
                    {
                        datePattern:format,
                        selector:STR_DATE
                    }
                );
            },

            showErrorBox:function (msg) {
                //noinspection JSCheckFunctionSignatures
                domConstruct.empty(this.messBox);

                //noinspection JSCheckFunctionSignatures,JSUnusedGlobalSymbols
                domConstruct.create(STR_DIV, {
                    innerHTML:msg,
                    className:ERR_MSG_BOX_CLASS,
                    style:ERR_MSG_BOX_STYLE
                }, this.messBox);
            }
        });
    }
);