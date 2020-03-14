#include <Adafruit_NeoTrellisM4.h>

Adafruit_NeoTrellisM4 trellis = Adafruit_NeoTrellisM4();
String serialBuffer;

void setup() {
  Serial.begin(115200);
  trellis.begin();
}

void loop() {
  trellis.tick();

  processKeyboardEvents();
  processSerialCommands();

  delay(10);
}

void processSerialCommands() {
  serialBuffer = "";
  while (Serial.available()) {
    delay(2);
    char c = Serial.read();
    serialBuffer += c;
  }

  if (serialBuffer.length() > 0) {
    if (serialBuffer.startsWith("DP#")) {
      executeDrawPixel(serialBuffer.substring(3));
    } else if (serialBuffer.startsWith("CLS#")) {
      trellis.fill(0x0);
    } else {
      trellis.setPixelColor(19, 0x00FF00);
    }
    serialBuffer="";
  }
}

void processKeyboardEvents() {
  while (trellis.available()) {
    keypadEvent e = trellis.read();
    uint8_t i = e.bit.KEY;
    if (e.bit.EVENT == KEY_JUST_PRESSED) {
      Serial.print('#');Serial.print((int)i);
      trellis.setPixelColor(e.bit.KEY, 0xFFFFFF);
    } else if (e.bit.EVENT == KEY_JUST_RELEASED) {
      // Serial.println(" released");
      trellis.setPixelColor(e.bit.KEY, 0x0);
    }
  }
}

void executeDrawPixel(String commandArguments) {
  String pixels = commandArguments;
  while (pixels.length() > 0) {
      int pixel = pixels.substring(0, 2).toInt();
      String hexColor = pixels.substring(2, 8);
      int colorR = strToHex(pixels.substring(2, 4));
      int colorG = strToHex(pixels.substring(4, 6));
      int colorB = strToHex(pixels.substring(6, 8));
      trellis.setPixelColor(pixel, trellis.Color(colorR, colorG, colorB));
      pixels = pixels.substring(8);
  }
}

int strToHex(String str) {
  char input[2];
  str.toCharArray(input, 2);
  return (int) strtol(input, 0, 16);
}
