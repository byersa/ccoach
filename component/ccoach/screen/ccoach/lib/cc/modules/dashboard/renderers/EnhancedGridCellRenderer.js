// cc/modules/dashboard/renderers/EnhancedGridCellRenderer;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview Offer, Property and Contacts grid renderer
 */
define(
    [
        'dojo/_base/lang',
        'dojo/string',
        'dojo/query',
        'dojo/has',
        'dojo/has!host-browser?dojo/_base/xhr',
        'dojo/date/locale'
    ],
    function (lang, string, query, has, xhr, locale) {

        var _ = {};

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.renderers.EnhancedGridCellRenderer
         * @static
         * @private
         * Constants that define string values
         * Used as to make code easier.
         */
        var STR_ZERO = '0',
            STR_SLASH = '/',
            STR_STRING = 'string',
            STR_DATE = 'date',
            STR_OBJECT = 'object',
            STR_EMPTY_VALUE = 'EMPTY VALUE',
            STR_FUNCTION = 'function',
            STR_GET = 'GET';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.renderers.EnhancedGridCellRenderer
         * @static
         * @private
         * Constants that define date formatting
         * Used for creating string formatted values of time.
         */
        var MM_DD_YYYY_SLASH = 'MM/dd/yyyy';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.renderers.EnhancedGridCellRenderer
         * @static
         * @private
         * Constants that define templates
         * Used for replacing values in string substitute
         */
        var EMPTY_CELL_VALUE_TMPL = '<div><span><!--suppress HtmlPresentationalElement --><small style="color:#FFA500;">${0}</small></span></div>';

        function getText(url) {

            if (!_.hasOwnProperty(url)) {
                xhr(STR_GET, {url:url, sync:true, load:function (_text) {
                    _[url] = _text;
                }});
            }
            return _[url];
        }

        function ColumnRenderer(template) {
            //noinspection JSUnresolvedFunction
            var url = require.toUrl(template);

            this.template = getText(url);
        }

        //noinspection JSUnusedGlobalSymbols
        ColumnRenderer.prototype = {

            field:'',
            name:'',
            styles:'',
            width:'',
            changeValueView:'',

            newEditor:function () {
                var self = this;

                //noinspection JSUnusedGlobalSymbols
                return {

                    field:self.field,
                    name:self.name,
                    styles:self.styles,
                    width:self.width,
                    changeValueView: self.changeValueView === undefined ? '' : self.changeValueView,

                    _defaultFormat:function (inValue, callArgs) {

                        var res ='';

                        if(inValue !== null && inValue !== '...' && inValue !== STR_EMPTY_VALUE){

                            if(self.changeValueView !== ''){
                                if(this.hasOwnProperty(self.changeValueView) && typeof this[self.changeValueView] === STR_FUNCTION){
                                    inValue = this[self.changeValueView](inValue);
                                }
                            }

                            //noinspection JSUnresolvedFunction
                            res = string.substitute(self.template,
                                {
                                    value: inValue,
                                    index: callArgs[1]
                                }
                            );

                        } else {
                            //noinspection JSUnresolvedFunction
                            res = string.substitute(EMPTY_CELL_VALUE_TMPL, [STR_EMPTY_VALUE]);
                        }

                        return res;
                    },

                    fromStringDate: function(value){
                        if(typeof value === STR_OBJECT){
                            return this.dateToString(value, MM_DD_YYYY_SLASH);
                        } else {
                            return value;
                        }
                    },

                    dateToString: function(value, format){
                        //noinspection JSUnresolvedFunction
                        return locale.format(
                            value,
                            {
                                datePattern:format,
                                selector: STR_DATE
                            }
                        );
                    },

                    fromObjectDate: function(value){

                        //if we are creating new property using "Add Property form" we do not loading saved property form database to add in grid
                        //instead we are adding new property in grid directly from form fileds
                        //after saving in database we are getting from there only new created ID and adding it in grid row with form values
                        //in this case date will be passed as string
                        if(typeof value === STR_STRING){
                            return value;
                        } else {
                            //and here when we are loading whole grid from database date are passed as object but not as javascript date
                            var month = '';
                            var day = '';

                            //noinspection JSUnresolvedVariable
                            if(1 + Math.floor(Math.log(value._value.month + 1)/Math.log(10)) === 1){
                                //noinspection JSUnresolvedVariable
                                month = STR_ZERO + (value._value.month + 1).toString();
                            } else {
                                //noinspection JSUnresolvedVariable
                                month = (value._value.month + 1).toString();
                            }

                            //noinspection JSUnresolvedVariable
                            if( 1 + Math.floor(Math.log(value._value.day)/Math.log(10)) === 1 ){
                                //noinspection JSUnresolvedVariable
                                day = STR_ZERO + value._value.day.toString();
                            } else {
                                //noinspection JSUnresolvedVariable
                                day = value._value.day.toString();
                            }

                            //noinspection JSUnresolvedVariable
                            return month + STR_SLASH + day + STR_SLASH + value._value.year;
                        }
                    }
                };
            }
        };

        //noinspection JSUnresolvedFunction
        lang.setObject('cc.modules.dashboard.renderers.EnhancedGridCellRenderer', ColumnRenderer);

        return ColumnRenderer;
    }
);
