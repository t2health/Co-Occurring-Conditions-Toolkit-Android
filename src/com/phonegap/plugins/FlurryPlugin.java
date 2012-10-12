/**
 * 
 */

package com.phonegap.plugins;

import org.json.JSONArray;
import org.json.JSONException;
//import org.t2.adcompanion.Preferences;

//import android.content.Context;
import android.util.Log;

import com.flurry.android.FlurryAgent;
import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.apache.cordova.api.PluginResult.Status;

public class FlurryPlugin extends Plugin {

	/* (non-Javadoc)
	 * @see com.phonegap.api.Plugin#execute(java.lang.String, org.json.JSONArray, java.lang.String)
	 */
	@Override
	public PluginResult execute(String action, JSONArray callingData, String callbackId) {
		Log.d("FlurryPlugin", "FlurryPlugin:execute called with action: " + action + " and callingData: " + callingData);
		// TODO: here's where we do stuff, then return our status below.  (don't forget to nuke log.d when done.)
		// all actions get sent to .execute, and we'll need to determine which using a switch statement (or something).
		
		try
		{
			FlurryAgent.onEvent(callingData.getString(0));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return new PluginResult(Status.OK, (String)null);
	}

}
