package com.t2.coct;

//import org.apache.cordova.DroidGap;
import org.apache.cordova.*;
import android.os.Bundle;
import com.flurry.android.FlurryAgent;

public class T2CCTActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //super.init();
       // Eula.show(this);
        super.loadUrl("file:///android_asset/www/index.html");
    }
    
    
    @Override
    public void onStart()
    {
       super.onStart();
       FlurryAgent.onStartSession(this, "67JZ94MEPKNGWQWJVEJK");
    }
    
    @Override
    public void onStop()
    {
       super.onStop();
       FlurryAgent.onEndSession(this);
    }
}

