// cc/modules/main/BasePresenter
//noinspection JSUnresolvedFunction
/**
 * @fileOverview base(main screen) controller(presenter) class
 */
define(
    [
        'dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dojobiz/context/Container'
    ],

    function(declare, dom, domConstruct, Container){

        /**
         * @memberOf cc.modules.main.BasePresenter
         * @static
         * @private
         * Constant that define context id.
         * Used to get context.
         */
        var COMMON_CTX_ID = 'commonContext';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.BasePresenter
         * @static
         * @private
         * Constants that define Error box class
         * Used to set this class for error box when message is addded.
         */
        var ERR_MSG_BOX_CLASS = 'formErrorMsg';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.main.presenters.BasePresenter
         * @static
         * @private
         * Constants that define string values
         * Used as to make code easier.
         */
        var STR_DIV = 'div';

        /**
         * @class cc.modules.main.BasePresenter The class incapsulate logic to work with views which contain forms
         * @augments cc.modules.main.BasePresenter
         */
        //noinspection JSUnusedGlobalSymbols
        return declare('cc.modules.main.presenters.BasePresenter', null, {

            validationErrors: {},

            ctx: null,

            form: null,

            formId: 'defFormId',

            messBox: undefined,

            messBoxId: 'defMessBoxId',

            notValidValuesErrMsg: 'Incorrect form data.',

            validator: null,

            /**
             * @constructor Creates an instance of cc.modules.main.BasePresenter class
             */
            constructor: function(){
                this.ctx = Container.getContext(COMMON_CTX_ID);
            },

            getErrors: function(){
                for (var prop in this.validationErrors) {
                    //noinspection JSUnfilteredForInLoop
                    if (!this.validationErrors[prop]) {
                        return false;
                    }
                }
                return true;
            },

            obtainErrorBox: function(){
                if (this.messBox === undefined) {
                    //noinspection JSUnresolvedFunction
                    this.messBox = dom.byId(this.messBoxId);
                }
            },

            showErrorBox: function(msg){
                //noinspection JSCheckFunctionSignatures
                domConstruct.empty(this.messBox);

                //noinspection JSCheckFunctionSignatures,JSUnusedGlobalSymbols
                domConstruct.create(STR_DIV, {
                    innerHTML:msg,
                    className:ERR_MSG_BOX_CLASS
                }, this.messBox);
            },

            handleBtnClick: function(){
                //noinspection JSUnresolvedFunction
                this.form = this.ctx.provide(this.formId);
            },

            /**
             * @memberOf cc.modules.main.BasePresenter.prototype
             * @param container
             * @param event
             */
            enterEventHandler: function(container, event){
                if(event.keyCode == 13){
                    this.handleBtnClick();
                }
            }
        });
    }
);