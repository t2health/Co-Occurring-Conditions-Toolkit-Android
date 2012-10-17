/*
 * 
 * Co-Occurring Conditions Toolkit
 * 
 * Copyright © 2009-2012 United States Government as represented by 
 * the Chief Information Officer of the National Center for Telehealth 
 * and Technology. All Rights Reserved.
 * 
 * Copyright © 2009-2012 Contributors. All Rights Reserved. 
 * 
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE, 
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN 
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT 
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY"). 
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN 
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR 
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES, 
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED 
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE 
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 * 
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: CCT001
 * Government Agency Original Software Title: Co-Occurring Conditions Toolkit
 * User Registration Requested. Please send email 
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 * 
 */
var historyCount = 0;
var devicePlatform = '';

jQuery(document).bind("mobileinit", function() {
   jQuery.mobile.pushStateEnabled = false;
   jQuery.mobile.selectmenu.prototype.options.nativeMenu = false;
   jQuery.mobile.page.prototype.options.domCache = false;
});

function onDeviceReady () {
    devicePlatform = device.platform;
}

var preventBehavior = function(e) {
    e.preventDefault();
};

function fail(msg) {
    alert(msg);
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
   // console.log("onLoad called");
    document.addEventListener("backbutton", onBackKeyDown, false); 
}

jQuery('div').live('pageshow',function(event,ui){
    onPageChange();
    adjustHistory();
   // console.log('main page show called');
});

function onPageChange() {
    logAnalytics( 'Page: ' + getCurrentPage());
//changes header margin for the back button
}

function getCurrentPage() {
   var base = 'www';//Cut off in Path,
   var result = '';
   if(location.hash) //Parse Hash
       result = location.hash.substring(1);
   else
       result = location.pathname;
   var path = jQuery.mobile.path.parseUrl(result).pathname;
   var indexPosition = path.indexOf(base);
   if(indexPosition > -1)
       path = path.substring(path.indexOf(base)+base.length+1);
   indexPosition = path.indexOf('&');
   if(indexPosition > -1) { //Parse Query String to sub Page
       var bar = jQuery('.ui-header', jQuery.mobile.activePage);
       var subPage = 'Nested-List ' + jQuery('.ui-title', bar).html();
       path = path.substring(0,indexPosition) + ' ' + subPage;
   }

   return path;
}

function clearChecked() {
    //jQuery("input[type='checkbox']:first").attr("checked",true).checkboxradio("refresh");
    jQuery('input[type="checkbox"]:checked').prop('checked', false).checkboxradio("refresh");
}

function onBackKeyDown() {
   // console.log('backbutton called');
    if (historyCount == 0){
        navigator.app.exitApp() 
    } else {
        window.history.back();
    }
}

function adjustHistory() {
    historyCount--;
    console.log("historyCount = " + historyCount);
}

jQuery('#home').live('pageshow',function(event, ui)    {
    historyCount = 0;
    clearChecked()
});
