// cc/internal/User;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview used in tests also to test if user if authenticated
 */
define(
    [
        'dojo/_base/lang',
        'dojo/_base/declare',
        'dojo/Stateful'
    ],
    function(lang, declare, Stateful){

        //noinspection JSUnusedGlobalSymbols
        var User = declare('cc.internal.User', Stateful, {
            userLoginId: '',
            partyId: '',
            password: '',
            name: '',
            lastName: '',
            agencyName: '',
            role: '',

            isAuthenticatedUser: function(){
                return !isNaN(this.id) && this.login.length > 0 && this.login.length > 0;
            },

            constructor: function User(raw){
                if(raw){
                    //noinspection JSUnresolvedFunction
                    lang.mixin(this, raw);
                }
            }
        });

        User.update = function(consumer, provider){
            consumer.set(provider);
        };

        return User;
    }
);