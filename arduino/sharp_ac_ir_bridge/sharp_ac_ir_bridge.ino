#include <Arduino.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>
#include <ir_Sharp.h>
#include <ArduinoJson.h>

const uint16_t kIrLed = 4;
IRSharpAc ac(kIrLed);

void setup() {
  Serial.begin(115200);
  ac.begin();
  
  Serial.println("Sharp AC IR Bridge Ready");
  Serial.println("Model: CV-P12LX");
}

void loop() {
  if (Serial.available() > 0) {
    String jsonString = Serial.readStringUntil('\n');
    
    StaticJsonDocument<256> doc;
    DeserializationError error = deserializeJson(doc, jsonString);
    
    if (error) {
      Serial.print("JSON parse error: ");
      Serial.println(error.c_str());
      return;
    }
    
    processCommand(doc);
  }
}

void processCommand(JsonDocument& doc) {
  const char* type = doc["type"];
  
  if (strcmp(type, "power") == 0) {
    bool powerOn = doc["value"];
    ac.setPower(powerOn);
    Serial.print("Power: ");
    Serial.println(powerOn ? "ON" : "OFF");
  }
  else if (strcmp(type, "mode") == 0) {
    const char* mode = doc["value"];
    int temp = doc["temperature"] | 72;
    const char* fan = doc["fanSpeed"] | "auto";
    
    setMode(mode);
    setTemperature(temp);
    setFanSpeed(fan);
    
    Serial.print("Mode: ");
    Serial.print(mode);
    Serial.print(", Temp: ");
    Serial.print(temp);
    Serial.print("°F, Fan: ");
    Serial.println(fan);
  }
  else if (strcmp(type, "temperature") == 0) {
    int temp = doc["value"];
    setTemperature(temp);
    Serial.print("Temperature: ");
    Serial.print(temp);
    Serial.println("°F");
  }
  else if (strcmp(type, "fan") == 0) {
    const char* fan = doc["value"];
    setFanSpeed(fan);
    Serial.print("Fan Speed: ");
    Serial.println(fan);
  }
  else if (strcmp(type, "special") == 0) {
    const char* feature = doc["value"];
    handleSpecialFeature(feature);
  }
  
  ac.send();
  Serial.println("IR signal sent");
}

void setMode(const char* mode) {
  if (strcmp(mode, "cool") == 0) {
    ac.setMode(kSharpAcCool);
  } else if (strcmp(mode, "heat") == 0) {
    ac.setMode(kSharpAcHeat);
  } else if (strcmp(mode, "dry") == 0) {
    ac.setMode(kSharpAcDry);
  } else if (strcmp(mode, "fan") == 0) {
    ac.setMode(kSharpAcFan);
  } else if (strcmp(mode, "auto") == 0) {
    ac.setMode(kSharpAcAuto);
  }
}

void setTemperature(int tempF) {
  int tempC = (tempF - 32) * 5 / 9;
  tempC = constrain(tempC, kSharpAcMinTemp, kSharpAcMaxTemp);
  ac.setTemp(tempC);
}

void setFanSpeed(const char* speed) {
  if (strcmp(speed, "auto") == 0) {
    ac.setFan(kSharpAcFanAuto);
  } else if (strcmp(speed, "low") == 0) {
    ac.setFan(kSharpAcFanMin);
  } else if (strcmp(speed, "med") == 0) {
    ac.setFan(kSharpAcFanMed);
  } else if (strcmp(speed, "high") == 0) {
    ac.setFan(kSharpAcFanHigh);
  } else if (strcmp(speed, "max") == 0) {
    ac.setFan(kSharpAcFanMax);
  }
}

void handleSpecialFeature(const char* feature) {
  if (strcmp(feature, "turbo") == 0) {
    ac.setSpecial(kSharpAcSpecialTurbo);
    Serial.println("Turbo mode activated");
  } else if (strcmp(feature, "plasmacluster") == 0) {
    ac.setIon(true);
    Serial.println("Plasmacluster Ion activated");
  } else if (strcmp(feature, "swing") == 0) {
    ac.setSwingToggle(true);
    Serial.println("Swing toggled");
  } else if (strcmp(feature, "lights") == 0) {
    Serial.println("Lights toggle (handled by remote)");
  }
}
