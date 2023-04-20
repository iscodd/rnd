const int b1 = 2;  // digital pin connected to button output

void setup() {
  // put your setup code here, to run once:
pinMode(b1, INPUT_PULLUP);  // set pin as input
}

void loop() {
  // put your main code here, to run repeatedly:
Serial.print(1);  // assign number 3 to Game 3
  Serial.print(",");
  int sensorValue = digitalRead(b1);
  // sensorValue = digitalRead(b1);  // read d3
  Serial.println(sensorValue);      //print the value of digital3 pin
}
