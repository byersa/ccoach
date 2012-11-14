// cc/extensions/Module;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview base Module class, used in procces of attaching context objects to view
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/_base/array',
        'dojox/layout/ContentPane'
    ],

    function (declare, lang, array, ContentPane) {

        return declare('cc.extensions.Module', ContentPane, {

            closable:false,

            context:'',

            isContextLoaded:false,

            startup:function () {
                if (this.context && !this.isContextLoaded) {
                    this._loadContext();
                }
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);

                //noinspection JSUnresolvedVariable
                if (this._contentSetter) {
                    //noinspection JSCheckFunctionSignatures,JSUnresolvedVariable
                    array.forEach(this._contentSetter.parseResults, function (obj) {
                        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                        if (!obj._started && !obj._destroyed && dojo.isFunction(obj.startup)) {
                            obj.startup();
                            obj._started = true;
                        }
                        //noinspection JSUnresolvedVariable
                        if (obj.dojoAttachPoint) {
                            //noinspection JSUnresolvedVariable
                            var attachPoint = obj.dojoAttachPoint;
                            this[attachPoint] = obj;

                            //noinspection JSUnresolvedVariable
                            delete obj.dojoAttachPoint;
                        }
                    }, this);

                    //noinspection JSUnresolvedFunction
                    setTimeout(lang.hitch(this, this.postContent), 0);
                }
            },

            _loadContext:function () {
                //noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
                require(['dojobiz/context/AsyncContext!' + this.context], lang.hitch(this, this.postContext));
            },

            postContext:function () {
                this.isContextLoaded = true;
            },

            postContent:function () {
            }
        });
    }
);