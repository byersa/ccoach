// cc/widgets/navigation/MainContainer;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file for describing Container and adding additional elements(links) in its top
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/Evented',
        'dijit/_TemplatedMixin',
        'dijit/_WidgetsInTemplateMixin',
        'dijit/layout/BorderContainer',
        'dojo/text!./templates/MainContainer.htm'
    ],

    function (declare, lang, Evented, _TemplatedMixin, _WidgetsInTemplateMixin, BorderContainer, template) {

        var SIGN_IN_MEVENT = 'sign-in',
            SIGN_OUT_MEVENT = 'sign-out',
            REGISTER_MEVENT = 'register',
            MYACCOUNT_MEVENT = 'my-account',
            HELP_MEVENT = 'help';

        //noinspection JSUnusedGlobalSymbols
        return declare('cc.widgets.navigation.MainContainer', [BorderContainer, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {

            templateString:template,

            //baseClass:'ccMainContainer',

            _onSignIn:function (e) {
                //noinspection JSUnresolvedFunction
                this.emit(SIGN_IN_MEVENT, e)
            },
            _onSignOut:function (e) {
                //noinspection JSUnresolvedFunction
                this.emit(SIGN_OUT_MEVENT, e)
            },
            _onRegister:function (e) {
                //noinspection JSUnresolvedFunction
                this.emit(REGISTER_MEVENT, e)
            },
            _onMyAccount:function (e) {
                //noinspection JSUnresolvedFunction
                this.emit(MYACCOUNT_MEVENT, e)
            },
            _onHelp:function (e) {
                //noinspection JSUnresolvedFunction
                this.emit(HELP_MEVENT, e)
            }
        });
    }
);
