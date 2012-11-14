// cc/extensions/mock/JsonRestMock;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview used to mock Rest services
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/aspect',
        'dojo/_base/Deferred',
        'dojo/store/JsonRest',
        'dojobiz/context/beans/ContextObject',
        'dojobiz/context/Container',
        'dojobiz/context/builders/BeanDefinitionBuilder'
    ],
    function (declare, lang, aspect, Deferred, JsonRest, ContextObject, Container, BeanDefinitionBuilder) {

        function Mocker() {
            this.mocks = [];
        }

        Mocker.prototype = {

            config:{
                delay:500
            },

            mocks:[],

            service:null,

            mocker:null,

            doMock:function () {
                for (var mock, i = 0; (mock = this.mocks[i]); i++) {
                    this.doInterception(mock);
                }
            },

            doInterception:function (mock) {
                var self = this;

                //noinspection JSUnresolvedFunction
                aspect.around(this.service, mock.method, function () {
                    return function () {
                        var args = Array.prototype.slice.call(arguments, 0);

                        //noinspection JSValidateTypes
                        var result = self.mocker[mock.method].apply(self.mocker, args);

                        if(mock.method == 'query'){
                            return result;
                        }

                        var def = new Deferred();

                        setTimeout(function () {
                            //noinspection JSUnresolvedVariable
                            if (result && result.then){
                                //noinspection JSUnresolvedFunction
                                result.then(
                                    function (inResult) {
                                        //noinspection JSUnresolvedFunction
                                        def.callback(inResult);
                                    },
                                    function (inError) {
                                        //noinspection JSUnresolvedFunction
                                        def.errback(inError);
                                    });
                            } else {
                                //noinspection JSUnresolvedFunction
                                def.callback(result);
                            }

                        }, self.config.delay);

                        return def;
                    }
                });
            }
        };

        var ID_TEMPL = 'Mocker';

        //noinspection JSUnusedGlobalSymbols
        return declare('cc.extensions.mock.JsonRestMock', ContextObject, {

            _id:'',

            builder:null,

            constructor:function () {
                this.builder = new BeanDefinitionBuilder();
            },

            postscript:function () {
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);

                //noinspection JSUnresolvedFunction
                this._id = Container.getUniqueId(ID_TEMPL);

                //noinspection JSUnresolvedFunction
                this.context = Container.getActiveContext();
                //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                this.context.on(GenericContext.READY, lang.hitch(this, this.handleContextReady));
                //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                this.context.on(GenericContext.CONTEXT_INITIALIZED, lang.hitch(this, this.handleContext));

                //noinspection JSUnresolvedFunction,JSUnusedGlobalSymbols,JSUnresolvedVariable
                this.builder.rootBeanDefinition({
                    id:this._id,
                    registry:this.context.beans,
                    type:Mocker,
                    scope:Scope.SINGLETON
                });

                //noinspection JSUnresolvedFunction
                this.context.registerBeanDefinition(this);
            },

            resolve:function () {
                //noinspection JSUnresolvedFunction
                return this.builder.getBeanDefinition();
            },

            handleContext:function () {
                //noinspection JSUnresolvedVariable
                if (this._isLeaf) {
                    if (!this._configured) {
                        this._configured = true;

                        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                        this.emit(BeanDefinition.BEAN_RESOLVED, this);
                    }
                } else {
                    //noinspection JSUnresolvedFunction
                    var resolvers = this.getChildren();

                    for (var resolver, i = 0; (resolver = resolvers[i]); i++) {
                        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                        resolver.on(BeanDefinition.BEAN_PART_RESOLVED, lang.partial(lang.hitch(this, this.cleanupChildren), resolver));
                    }
                }
            },

            cleanupChildren:function (resolver) {
                //noinspection JSUnresolvedFunction
                this.inherited(arguments);
                //noinspection JSUnresolvedVariable
                if (!!this._isLeaf && !!this._configured) {
                    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                    this.emit(BeanDefinition.BEAN_RESOLVED, this);
                }
            },

            onBeanResolved:function (bean) {
                //noinspection JSUnresolvedFunction
                this.context.registerBeanDefinition(bean);

                delete this.onBeanResolved;
            },

            handleContextReady:function () {
                //noinspection JSUnresolvedFunction
                var mocker = this.context.provide(this._id);

                mocker.doMock();

            }
        });
    }
);