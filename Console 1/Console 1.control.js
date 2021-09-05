loadAPI(14);

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
// host.setShouldFailOnDeprecatedUse(true);

host.defineController("Softube", "Console 1", "0.1", "4ec39659-a42b-4b94-bdf1-07700d84b512", "_tngsk");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["Console 1"], ["Console 1"]);

var CC =
{
   INPUT_GAIN: 27,
   VOLUME: 65,
   TRACK_SELECT_LOW: 5,
   TRACK_SELECT_HIGH: 24
};

let current_track = 0;

function init() {

   const inputPort = host.getMidiInPort(0);
   inputPort.setMidiCallback(onMidi0);
   inputPort.setSysexCallback(onSysex0);

   transport = host.createTransport();
   application = host.createApplication();
   trackBank = host.createTrackBank(8, 0, 1);
   cursorTrack = host.createCursorTrack(2, 0);
   // cursorDevice = cursorTrack.createCursorDevice(1);
   masterTrack = host.createMasterTrack(0);

   host.showPopupNotification('Softube Console 1 Connected')
}

// Called when a short MIDI message is received on MIDI input port 0.
function onMidi0(status, data1, data2) {
   // TODO: Implement your MIDI input handling code here.
   printMidi(status, data1, data2);
}

// Called when a MIDI sysex message is received on MIDI input port 0.
function onSysex0(data) {

   printSysex(data);

   cc = data.hexByteAt(8)
   value = data.hexByteAt(9) ? 1 : -1

   if (CC.TRACK_SELECT_LOW <= cc && cc <= CC.TRACK_SELECT_HIGH) {
      current_track = cc - 5;
   }

   if (cc == CC.VOLUME) {
      track = trackBank.getTrack(current_track);
      track.getVolume().inc(value, 255);
      // println(track);
   }

}

function flush() {
   // TODO: Flush any output to your controller here.
   println('flush called.');
}

function exit() {
   println('exit called.')

}
