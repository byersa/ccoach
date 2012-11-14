// cc/modules/dashboard/actions/GoToDashboardScreen;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview action which opens dashboard screen
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojobiz/context/Container',
        'dojobiz/context/actions/Action'
    ],
    function (declare, lang, Container, Action) {
        'use strict';

        var context = null;

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.actions.GoToDashboardScreen
         * @static
         * @private
         * Constant that define context and context's objects IDs
         * Used to it from dom.
         */
        var WELCOME_CTX_ID = 'welcomeContext',
            MAIN_CONTAINER_ID = 'welcomeScreenContainer',
            DASHBOARD_STATE_ID = 'dashboardScreenState';

        declare('cc.modules.dashboard.actions.GoToDashboardScreen', Action, {

            postscript:function () {
                //noinspection JSUnresolvedFunction
                this.on('Start', lang.hitch(this.handleStart));
                //noinspection JSUnresolvedFunction
                this.on('Complete', lang.hitch(this.handleComplete));
                context = Container.getContext(WELCOME_CTX_ID);
            },

            handleStart:function () {
                //noinspection JSUnresolvedFunction
                var container = context.provide(MAIN_CONTAINER_ID);
                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                FlowUtils.setState(container, DASHBOARD_STATE_ID);
                //noinspection JSUnresolvedFunction
                this.complete();
            },

            handleComplete:function () {
            }
        });

    }
);