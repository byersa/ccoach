// cc/modules/dashboard/utils/PorpertyMemoryStore
//noinspection JSUnresolvedFunction
/**
 * @fileOverview Memory store which is used to fill Properyt and Offer stores with data recieved from service url
 */
define(
    [
        'dojo/_base/declare',
        'dojo/_base/xhr',
        'dojo/store/Memory',
        'dojo/string',
        'dojobiz/context/Container'
    ],

    function(declare, xhr, Memory, str, Container){

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.utils.PorpertyMemoryStore
         * @static
         * @private
         * Constants that define contexts'/contexts' objects IDs
         * Used to get object from contexts.
         */
        var COMMON_CTX_ID = 'commonContext',
            USER_INFO_ID = 'userInfo';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.utils.PorpertyMemoryStore
         * @static
         * @private
         * Constants that define string values
         * Used as to make managing of code easier.
         */
        var STR_JSON = 'json';

        return declare('cc.modules.dashboard.utils.PorpertyMemoryStore', Memory, {

            url: '',

            constructor:function(options){
                this.getData(options);
            },

            getData: function(options){
                //noinspection JSUnresolvedFunction
                var userInfo = Container.getContext(COMMON_CTX_ID).provide(USER_INFO_ID);
                //noinspection JSUnresolvedFunction
                var serviceUrl = str.substitute(this.url, {partyId:userInfo.partyId });
                var memory = this;

                xhr.get({
                    url:serviceUrl,
                    handleAs:STR_JSON,
                    sync: true,
                    load:function (data) {

                        for(var i in options){
                            //noinspection JSUnfilteredForInLoop
                            memory[i] = options[i];
                        }

                        //noinspection JSCheckFunctionSignatures
                        memory.setData(data || []);
                    },
                    error: function(){
                        //noinspection JSCheckFunctionSignatures
                        memory.setData([]);
                    }
                });
            }
        });
    }
);