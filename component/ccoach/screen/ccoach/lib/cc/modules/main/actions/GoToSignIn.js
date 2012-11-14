// cc/modules/main/actions/GoToSignIn;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview action, is used to stay on SignIn page if SignIn process was not successful
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojobiz/context/actions/Action'
    ],
    function (declare, lang, Action) {
        'use strict';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.actions.GoToSignIn
         * @static
         * @private
         * Constant that define string values
         * Used for defining action.
         */
        var STR_START = 'Start',
            STR_COMPLETE = 'Complete';

        declare('cc.modules.main.actions.GoToSignIn', Action, {

            postscript:function () {
                //noinspection JSUnresolvedFunction
                this.on(STR_START, lang.hitch(this.handleStart));
                //noinspection JSUnresolvedFunction
                this.on(STR_COMPLETE, lang.hitch(this.handleComplete));
            },

            handleStart:function () {
                //noinspection JSUnresolvedFunction
                this.complete();
            }
        });

    }
);