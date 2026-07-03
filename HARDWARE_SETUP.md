# Hardware Setup Guide

## Required Components

### ESP8266 Setup (Recommended)

**Parts List:**
- 1x NodeMCU ESP8266 (CP2102 or CH340 version)
- 1x 940nm IR LED (5mm)
- 1x 100Ω resistor (1/4W)
- 1x Breadboard (optional, for prototyping)
- Jumper wires
- USB cable (Micro-USB for NodeMCU)

**Total Cost: ~$5-10**

### Wiring Instructions

#### Simple Circuit (Direct Connection)

```
NodeMCU ESP8266:
┌─────────────────┐
│                 │
│  D2 (GPIO4) ────┼──── [100Ω] ──── IR LED (+) Long Leg
│                 │                        │
│  GND ───────────┼────────────────────────┘ Short Leg
│                 │
│  USB (Power)    │
└─────────────────┘
```

#### Enhanced Circuit (with Transistor - Optional, for longer range)

```
NodeMCU ESP8266:
┌─────────────────┐
│                 │
│  D2 (GPIO4) ────┼──── [1kΩ] ──── 2N2222 Base
│                 │                    │
│  GND ───────────┼────────────────────┴─── Emitter
│                 │
│  3.3V ──────────┼──── [100Ω] ──── IR LED (+) ──── Collector
│                 │                        │
└─────────────────┘                        │
                                           GND
```

### Step-by-Step Assembly

1. **Identify IR LED Polarity**
   - Long leg = Anode (+)
   - Short leg = Cathode (-)
   - Flat side = Cathode (-)

2. **Connect Resistor to IR LED**
   - Solder or insert 100Ω resistor to IR LED anode (long leg)

3. **Connect to ESP8266**
   - Resistor → GPIO4 (D2 pin on NodeMCU)
   - IR LED cathode → GND

4. **Secure Connections**
   - Use heat shrink tubing or electrical tape
   - Ensure no short circuits

5. **Mount IR LED**
   - Point IR LED towards AC unit
   - Optimal distance: 1-7 meters
   - Clear line of sight recommended

### Testing the IR LED

**Visual Test:**
1. Use your phone camera
2. Point camera at IR LED
3. Power on ESP8266
4. You should see a purple/white glow on camera (IR is visible to cameras)

**Functional Test:**
1. Upload Arduino sketch
2. Open Serial Monitor (115200 baud)
3. Send test command from web interface
4. Check if AC responds

## ESP32 Alternative

If using ESP32 instead of ESP8266:

**Pin Mapping:**
- Use GPIO4 (same as ESP8266)
- Circuit is identical
- Upload speed: 921600 baud

## Raspberry Pi Setup

### Parts List:
- Raspberry Pi (any model)
- IR LED (940nm)
- 2N2222 NPN Transistor
- 1kΩ resistor
- 100Ω resistor

### Wiring:
```
Raspberry Pi GPIO:
┌─────────────────┐
│                 │
│  GPIO17 ────────┼──── [1kΩ] ──── 2N2222 Base
│                 │                    │
│  GND ───────────┼────────────────────┴─── Emitter
│                 │
│  3.3V ──────────┼──── [100Ω] ──── IR LED (+) ──── Collector
│                 │                        │
└─────────────────┘                        │
                                           GND
```

### Software Setup (Raspberry Pi):
```bash
# Install LIRC
sudo apt-get update
sudo apt-get install lirc

# Configure for Sharp AC
sudo nano /etc/lirc/lircd.conf
# Add Sharp AC codes

# Enable LIRC
sudo systemctl enable lircd
sudo systemctl start lircd
```

## Enclosure Ideas

### 3D Printed Case
- Design files available on Thingiverse
- Search: "ESP8266 IR blaster case"
- Include window for IR LED

### Simple DIY Enclosure
- Small plastic project box
- Drill hole for IR LED
- Drill hole for USB cable
- Mount with double-sided tape

### Wall Mount
- Position near AC unit
- Use Command strips
- Ensure IR LED points at AC receiver

## Positioning Tips

1. **AC IR Receiver Location**
   - Usually on the front panel
   - Look for small dark window
   - Often near display

2. **Optimal Placement**
   - Direct line of sight
   - 1-7 meters distance
   - Avoid bright sunlight on receiver
   - No obstructions (curtains, furniture)

3. **Testing Position**
   - Start close (1 meter)
   - Test commands
   - Gradually increase distance
   - Find maximum reliable range

## Power Options

### USB Power
- Most convenient
- Use phone charger (5V 1A minimum)
- Always-on recommended

### Battery Power (Portable)
- 3x AA batteries (4.5V)
- Use voltage regulator (to 3.3V)
- Not recommended for permanent installation

### Power Bank
- For temporary/portable use
- 5V output
- Ensure auto-shutoff is disabled

## Troubleshooting Hardware

### IR LED Not Working
- Check polarity (swap if needed)
- Verify resistor value (100Ω)
- Test with camera
- Try different GPIO pin

### Weak Signal
- Add transistor circuit
- Use multiple IR LEDs in parallel
- Increase LED current (use lower resistor, e.g., 47Ω)
- Ensure fresh power supply

### ESP8266 Not Powering On
- Check USB cable (data + power)
- Try different USB port/charger
- Verify no short circuits
- Check for damaged board

### Intermittent Connection
- Check solder joints
- Secure all connections
- Use shorter wires
- Add capacitor (100µF) across power pins

## Safety Notes

⚠️ **Important:**
- IR LEDs are safe for eyes at this power level
- Don't exceed 100mA through IR LED
- Use appropriate resistor values
- Don't connect directly to 5V without resistor
- Ensure proper polarity

## Next Steps

After hardware assembly:
1. Upload Arduino sketch
2. Test with serial monitor
3. Configure server connection
4. Test web interface
5. Mount in permanent location
