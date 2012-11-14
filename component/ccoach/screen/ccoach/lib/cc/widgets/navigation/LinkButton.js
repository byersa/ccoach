// cc/widgets/navigation/LinkButton;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file for describing Link with mEvent
 */
define(
    [
        'dojo/_base/declare',
        'dojo/Evented',
        'dijit/form/_FormWidget',
        'dijit/form/_ButtonMixin',
        'dojo/text!./templates/LinkButton.htm'
    ],
    function (declare, Evented, _FormWidget, _ButtonMixin, template) {

        //noinspection JSUnusedGlobalSymbols
        return declare('cc.widgets.navigation.LinkButton', [_FormWidget, _ButtonMixin, Evented], {

            baseClass:'ccLinkButton',

            emitedEvent: '',

            templateString:template,
            /**
             *
             * @param {MouseEvent} e the event dispatched from original DOM source.
             */
            _onClick:function (e) {
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);
                if(this.emitedEvent){
                    //noinspection JSUnresolvedFunction
                    this.emit(this.emitedEvent, e);
                }
            }
        });


    });

