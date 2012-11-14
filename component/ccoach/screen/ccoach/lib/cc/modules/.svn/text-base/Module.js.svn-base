//noinspection JSCheckFunctionSignatures
/**
 * @fileOverview main Module which loads welcome page
 */
require(
    [
        // requirements;
        'dojo/ready',
        'dojobiz/context/Container',
        'dojobiz/context/ViewAdapter',
        'dojo/aspect',
        'dojobiz/context/GenericContext',
        'dojo/dom',

        // dependencies;
        'dojobiz/context/flow/Flow',

        // welcomePage;
        'cc/modules/main/presenters/WelcomePresenter',
        'cc/widgets/navigation/MainContainer',

        // commonContext;
        'dijit/form/Form',
        'dijit/form/ValidationTextBox',
        'cc/widgets/RoleDependedValidationTextBox',
        'cc/widgets/RoleDependedCurrencyValidationTextBox',
        'cc/widgets/RoleDependedValidationDateBox',
        'cc/widgets/navigation/LinkButton',
        'dojox/grid/EnhancedGrid',
        'cc/modules/main/utils/ValidationUtils',
        'cc/internal/User',

        // other;
        'cc/modules/main/presenters/BasePresenter',
        'dijit/Dialog'
    ],

    function (ready, Container, ViewAdapter, aspect, GenericContext, dom) {

        ready(function () {

            /**
             * @static
             * @private
             * Constant that define welcome flow context ID
             * Used to get context.
             */
            var WELCOME_FLOW_ID = 'welcomeFlow';

            /**
             * @static
             * @private
             * Constant that define loading screen ID
             * Used to it from dom.
             */
            var START_SCREEN_ID = 'startScreen';

            /**
             * @static
             * @private
             * Constants that define string representation of items
             * Used to get context.
             */
            var STR_EMIT = 'emit',
                STR_ZERO = '0',
                STR_HIDDEN = 'hidden';

            /*
             * Hiding loading screen when context is initialized, doing this for all browsers except IE
             * because it has no loading screen
             */
            //noinspection JSCheckFunctionSignatures
            aspect.before(GenericContext.prototype, STR_EMIT, function (mEvent) {

                var isMSIE = /*@cc_on!@*/0;
                //noinspection JSUnresolvedFunction
                var startScreen = dom.byId(START_SCREEN_ID);

                var showPage = function (startScreen) {
                    startScreen.style.borderWidth = STR_ZERO;
                    startScreen.style.visibility = STR_HIDDEN;
                };

                if (!isMSIE) {
                    //noinspection JSUnresolvedVariable
                    if (mEvent == GenericContext.CONTEXT_INITIALIZED) {

                    }
                    //noinspection JSUnresolvedVariable
                    if (mEvent == GenericContext.READY) {
                        setTimeout(function () {
                            showPage(startScreen)
                        }, 500);
                    }
                }
            });


            //noinspection JSCheckFunctionSignatures
            require(['dojobiz/context/AsyncContext!cc/flows/main/welcomeFlow.xml'], function () {

                var context = Container.getContext(WELCOME_FLOW_ID);

                if (context) {

                    //noinspection JSUnresolvedFunction
                    new ViewAdapter(context).doQuery().doWire();
                }
            });
        });
    }
);