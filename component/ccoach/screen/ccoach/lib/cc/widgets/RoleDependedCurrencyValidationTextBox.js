// cc/widgets/RoleDependedCurrencyValidationTextBox;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file for describing CurrencyTextBox which editing is depended on user role
 */
define(
    [
        'dojo/_base/declare',
        'dijit/form/CurrencyTextBox',
        'dojobiz/context/Container'

    ],

    function(declare, CurrencyTextBox, Container){

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.widgets.RoleDependedCurrencyValidationTextBox
         * @static
         * @private
         * Constant that define id of Common context
         * Used to get context with this id.
         */
        var COMMON_CTX_ID = 'commonContext';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.widgets.RoleDependedCurrencyValidationTextBox
         * @static
         * @private
         * Constant that define id of user context object
         * Used to get context with this id.
         */
        var USERINFO_ID = 'userInfo';

        return declare('cc.widgets.RoleDependedCurrencyValidationTextBox', CurrencyTextBox, {

            accessRoles: '',

            disabled: true,

            postMixInProperties: function(){
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);

                if(this.accessRoles){

                    //noinspection JSUnresolvedFunction
                    var userRole = Container.getContext(COMMON_CTX_ID).provide(USERINFO_ID).role;

                    if(this.accessRoles.indexOf(userRole) != -1){
                        this.disabled = false;
                    }
                }
            }
        });
    }
);