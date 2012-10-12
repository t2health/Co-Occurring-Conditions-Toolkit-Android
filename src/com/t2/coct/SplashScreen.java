package com.t2.coct;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import java.util.Timer;
import java.util.TimerTask;

import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.view.View.OnClickListener;


public class SplashScreen extends Activity implements OnClickListener {
	private Timer startTimer;
	private Handler startHandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			startMainActivity();
		}
	};
	
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		int nextTimeout = 2500;
		
		this.setContentView(R.layout.splash);
		this.findViewById(R.id.splashWrapper).setOnClickListener(this);
		
		
		// configure the auto-start
		startTimer = new Timer();
		startTimer.schedule(new TimerTask(){
			@Override
			public void run() {
				startHandler.sendEmptyMessage(0);
			}
		}, nextTimeout);
	}
	

	@Override
	public void onClick(View v) {
		switch(v.getId()) {
		case R.id.splashWrapper:
			startTimer.cancel();
			startMainActivity();
		}
	}

	private void startMainActivity() {
		Intent i = new Intent(this, T2CCTActivity.class);
		this.startActivity(i);
		this.finish();
	}
}