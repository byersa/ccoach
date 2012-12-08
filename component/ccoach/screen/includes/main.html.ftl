<!DOCTYPE HTML>
<html>
    <head>
	<title>Contract Coach</title>
	
	<link href="/themes/ccoach.less" type="text/css" rel="stylesheet/less"/>
    <script src="/js/less-1.3.1.js" type="text/javascript"></script>
    
    <script src="/dojo/dojo/dojo.js" type="text/javascript"
            data-dojo-config="locale: 'en', parseOnLoad: true, async: true"></script>
			
	<!-- dojo nihilo theme -->
    <link href="/dojo/dijit/themes/dijit.css" type="text/css" rel="stylesheet"/>
	
	<link href="/dojo/dijit/themes/claro/claro.css" type="text/css" rel="stylesheet"/>

    <!-- default theme - ->
    <link href="/dojo/dojox/grid/enhanced/resources/claro/EnhancedGrid.css" type="text/css" rel="stylesheet"/>
    <!-- -->
    <link href="/themes/default.css" type="text/css" rel="stylesheet"/>

    <!--[if !IE]> -->
    <style type="text/css">
        #startScreen {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;

            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-origin: border-box;

            border-radius: 100%;
            -moz-border-radius: 100%;
            -webkit-border-radius: 100%;

            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            -webkit-transition: 0.5s ease;
            -moz-transition: 0.5s ease;
            -ms-transition: 0.5s ease;
            -o-transition: 0.5s ease;
            transition: 0.5s ease;


            border-radius: 0;
            -moz-border-radius: 0;
            -webkit-border-radius: 0;

            border: 500px solid rgba(0, 0, 0, 0.8);
        }

        #loaderImg {
            background-image: url("/themes/images/loading.gif");
            z-index: 1;
            position: absolute;
            width: 31px;
            height: 31px;
            top: -480px;
            left: -480px;
        }
    </style>
    
    <!-- application main file -->
         <script type="text/javascript">
                require({
                        packages:[
                                {
                                        location:'/lib/cc',
                                        name:'cc'
                                }
                        ]
                },
                [

                ]);
        </script>
    <script  type="text/javascript">
         require([
         'cc/modules/Module', 
         'cc/modules/main/WelcomeLogin',
        'cc/modules/main/presenters/MainPresenter',
        'cc/modules/main/presenters/WelcomePresenter',
        'cc/modules/main/presenters/WelcomeLoginPresenter',
        'dijit/form/Form',
        'dijit/form/ValidationTextBox',
        'cc/widgets/RoleDependedValidationTextBox',
        'cc/widgets/RoleDependedCurrencyValidationTextBox',
        'cc/widgets/RoleDependedValidationDateBox',
        'cc/widgets/navigation/LinkButton',
        'dojox/grid/EnhancedGrid'],
        function(AsyncContext) {
         require(['dojobiz/context/AsyncContext!cc/contexts/main/welcomeLoginContext.xml']);
         });
    </script>

    </head>
    <body class="claro ccoach">
        <div id="startScreen">
            <div id="loaderImg"></div>
        </div>
        <div
            data-context-wire="$main-container->mainContainerProto"
            id="main-container"
            data-dojo-type="cc.widgets.navigation.MainContainer">
                <div data-dojo-type="dijit.layout.ContentPane" region="center">

