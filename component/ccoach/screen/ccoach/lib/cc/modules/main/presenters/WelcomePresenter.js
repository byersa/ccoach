// cc/modules/main/WelcomePresenter
//noinspection JSUnresolvedFunction
/**
 * @fileOverview welcome page controller(presenter)
 */
define(
    [
        'dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-style',
        'dojobiz/context/Container'
    ],

    function (declare, dom, style, Container) {

        //noinspection SpellCheckingInspection,JSValidateJSDoc,JSUnresolvedVariable
        /**
         * @namespace flow Holds functionality related to changes states in flow.
         * @link {dojobiz.context.flow.Flow}
         */
        var flow = self.FlowUtils;

        /*
         * region: constants that holds context bean's ids;
         */
        var WELCOME_CTX_ID = 'welcomeContext',
            WELCOME_CONTAINER_ID = 'welcomeScreenContainer',
            DASHBOARD_CONTAINER_ID = 'dashboardScreenContainer';
        /*
         * end region;
         */

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.WelcomePresenter
         * @static
         * @private
         * Constant that define url on which user will be redirected after clicking on SignOut button
         * Used as parameter of doh assert function.
         */
        var SIGN_OUT_URL = '/ccoach/control/main';

        /*
         * region: constants that holds flow state's ids;
         */
        var MY_ACCOUNT_STATE_ID = 'myAccountState',
            SING_IN_STATE_ID = 'signInState',
            FORGOT_PASS_STATE_ID = 'forgotPassState',
            REGISTER_STATE_ID = 'registerState',
            HELP_STATE_ID = 'helpState',
            DASHBOARD_STATE_ID = 'dashboardScreenState';
        /*
         * end region;
         */

        //noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
        return declare('cc.modules.main.presenters.WelcomePresenter', null, {

            /*
             * region: micro-event handlers;
             */

            /**
             * Signals about change of container state from * to sign-out.
             * @param container the sender  object
             * @param event {MouseEvent} [event] the raw event passed through given event
             */
            handleSignIn:function (container, event) {
                //noinspection JSUnresolvedFunction
                //flow.setState(container, SING_IN_STATE_ID);
                flow.setState(dijit.byId('main-container-center'), SING_IN_STATE_ID);
            },

            handleSignOut:function (container, event) {
                window.location = SIGN_OUT_URL;
            },

            handleRegister:function (container, event) {
                //noinspection JSUnresolvedFunction
                //flow.setState(container, REGISTER_STATE_ID);
                flow.setState(dijit.byId('main-container-center'), REGISTER_STATE_ID);
            },

            handleMyAccount:function (container, event) {
                //noinspection JSUnresolvedFunction
                flow.setState(dijit.byId('main-container-center'), DASHBOARD_STATE_ID);
                //noinspection JSUnresolvedFunction
                flow.setState(dijit.byId('main-container-center').getContext(WELCOME_CTX_ID).provide(DASHBOARD_CONTAINER_ID), MY_ACCOUNT_STATE_ID);
            },

            handleHelp:function (container, event) {
                //noinspection JSUnresolvedFunction
                flow.setState(dijit.byId('main-container-center'), HELP_STATE_ID);
            },

            handleForgotPassword:function (container, event) {
                //noinspection JSUnresolvedFunction
                flow.setState(Container.getContext(WELCOME_CTX_ID).provide(WELCOME_CONTAINER_ID), FORGOT_PASS_STATE_ID);
            }

            /*
             * end region;
             */
        });
    }
);