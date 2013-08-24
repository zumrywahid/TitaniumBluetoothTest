var btzumry = require('com.bleutooth.zumry');

var win = Ti.UI.createWindow({
	backgroundColor : 'blue',
	title : 'Bluetooth Test',
	navBarHidden : true,
});
var parentView = Ti.UI.createScrollView({
	layout : 'vertical',
});
win.add(parentView);
// Create a Button.
var btn1 = Ti.UI.createButton({
	title : ' Check Is  Bluetooth  ',
	height : 60,
	width : Ti.UI.SIZE,
	top : 10,
});

btn1.addEventListener('click', function() {

	var isBtAvailable = btzumry.checkisBluetoothAvailableForDevice();

	if (isBtAvailable) {
		alert("Bluetooth is Enabled already");
	} else {
		alert("Bluetooth is Not Enabled already");
	}
});

parentView.add(btn1);

// Create a Button.
var btn2 = Ti.UI.createButton({
	title : ' Enable  Bluetooth  ',
	height : 60,
	width : Ti.UI.SIZE,
	top : 10,

});

btn2.addEventListener('click', function() {

	var isBtAvailable = btzumry.checkisBluetoothAvailableForDevice();

	if (isBtAvailable) {
		alert("Bluetooth is Enabled already");
	} else {

		btzumry.promptForBluetoothEnable();

	}

});

parentView.add(btn2);

// Create a Button.
var btn3 = Ti.UI.createButton({
	title : ' Get List Of Paired Devices  ',
	height : 60,
	width : Ti.UI.SIZE,
	top : 10,

});

btn3.addEventListener('click', function() {

	var isEnabled = btzumry.checkisBluetoothAvailableForDevice();

	if (isEnabled) {

		var devices = btzumry.getPairedDevices();
		var dv = [];
		for (var key in devices) {

			dv.push(key + "\n" + devices[key]);

		}

		var opts = {
			cancel : 2,
			options : dv,
			selectedIndex : 0,
			destructive : 0,
			title : 'Select an obd Device.'
		};

		var dialog = Ti.UI.createOptionDialog(opts)

		dialog.addEventListener('click', function(e) {

			var selectedName = dv[dialog.selectedIndex];

			if (selectedName != '') {

				alert(selectedName + ' Has been selected');

			}

		});

		dialog.show();

		//change image of the button

	} else {

		Titanium.UI.createNotification({
			duration : 1000,
			message : "Please Enable Bluetooth"
		}).show();

	}

});

parentView.add(btn3);

// Create a Button.
var btn4 = Ti.UI.createButton({
	title : ' Discover Devices  ',
	height : 60,
	width : Ti.UI.SIZE,
	top : 10,

});

btn4.addEventListener('click', function() {
	Ti.UI.createNotification({
		message : 'started to discover',
		duration : 2000
	}).show();

	btzumry.discoverDevices();

	btzumry.addEventListener('new_device_found', function(e) {

	 
		if (e) {
	 			alert('New Device is '+e.device);
	 	}

	});

});

parentView.add(btn4);

// Create a Button.
var btn5 = Ti.UI.createButton({
	title : ' Discover Devices  ',
	height : 60,
	width : Ti.UI.SIZE,
	top : 10,

});

btn5.addEventListener('click', function() {

	btzumry.makeDeviceDiscoverable();

});

parentView.add(btn5);

win.open();

