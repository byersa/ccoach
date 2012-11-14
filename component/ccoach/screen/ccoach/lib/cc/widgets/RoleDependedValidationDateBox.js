// cc/widgets/RoleDependedValidationDateBox;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file for describing DateTextBox which editing is depended on user role
 */
define(
    [
        'dojo/_base/declare',
        'dijit/form/DateTextBox',
        'dojobiz/context/Container'

    ],

    function(declare, DateTextBox, Container){

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.widgets.RoleDependedValidationDateBox
         * @static
         * @private
         * Constant that define id of Common context
         * Used to get context with this id.
         */
        var COMMON_CTX_ID = 'commonContext';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.widgets.RoleDependedValidationDateBox
         * @static
         * @private
         * Constant that define id of user context object
         * Used to get context with this id.
         */
        var USERINFO_ID = 'userInfo';

        return declare('cc.widgets.RoleDependedValidationDateBox', DateTextBox, {

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