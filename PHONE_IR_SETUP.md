# Using Your Phone's Built-in IR Blaster

Many Android phones have built-in IR blasters that can control your Sharp AC directly!

## Phones with IR Blasters

### Popular Models with IR Support

**Xiaomi:**
- Redmi Note series (8, 9, 10, 11)
- Mi series (Mi 10, Mi 11)
- Poco F3, F4

**Huawei:**
- P30, P40 series
- Mate 20, 30, 40 series

**Samsung:**
- Galaxy S6, S7 (older models)
- Note 4, Note 5

**LG:**
- G5, G6
- V20, V30

**Honor:**
- Honor 20, 30 series
- Honor View series

## How It Works

### Option 1: Direct Phone IR (Best)

If your phone has an IR blaster, the web app will:
1. Detect your phone's IR hardware automatically
2. Send IR signals directly from your phone to the AC
3. No external hardware needed!

**Status Indicator:**
- 🟢 "Phone IR Ready" = Your phone can send IR directly
- 🟡 "Ready" = Using server mode (no phone IR detected)

### Option 2: Server Mode (Fallback)

If your phone doesn't have IR:
- Commands are sent to your server
- Server needs ESP8266/ESP32 with IR LED
- Works from any device (iPhone, tablet, computer)

## Setup Instructions

### For Phones WITH IR Blaster

1. **Access the Web App**
   ```
   https://remote.cloudmc.online
   ```

2. **Grant Permissions (if prompted)**
   - Allow IR hardware access
   - May require enabling in Android settings

3. **Test It**
   - Press the Power button
   - Point phone at AC unit
   - AC should respond immediately!

4. **Positioning**
   - Point phone's IR blaster at AC
   - Usually located at top of phone
   - Distance: up to 10 meters
   - Clear line of sight works best

### For Phones WITHOUT IR Blaster

You'll need to set up the ESP8266/ESP32 hardware:
- See `HARDWARE_SETUP.md` for wiring instructions
- See `DEPLOYMENT.md` for server setup

## Finding Your Phone's IR Blaster

**Location:**
- Usually at the **top edge** of the phone
- Small black or red window
- Near headphone jack or power button

**How to Check:**
1. Look for a small dark window on top edge
2. Check phone specs online
3. Try the web app - it will auto-detect

## Advantages of Phone IR

✅ **No External Hardware**
- No ESP8266/ESP32 needed
- No wiring or soldering
- Works immediately

✅ **Portable**
- Control AC from anywhere in room
- No fixed installation
- Take it with you

✅ **Reliable**
- Direct IR transmission
- No network latency
- Works offline

## Testing Your Phone's IR

### Method 1: Camera Test
1. Open phone camera app
2. Point camera at phone's IR blaster
3. Press a button in the web app
4. You should see a purple/white flash on camera

### Method 2: AC Test
1. Stand 1-2 meters from AC
2. Point phone at AC unit
3. Press Power button in web app
4. AC should beep and respond

## Troubleshooting

### "Phone IR Ready" but AC Not Responding

**Check Distance:**
- Move closer to AC (1-3 meters)
- Ensure clear line of sight
- No obstructions between phone and AC

**Check Aim:**
- Point IR blaster directly at AC receiver
- AC receiver is usually on front panel
- Try different angles

**Check Permissions:**
- Android Settings → Apps → Browser
- Allow IR hardware access
- May need to enable "Special permissions"

### "Ready" Instead of "Phone IR Ready"

Your phone likely doesn't have an IR blaster:
- Check phone specs online
- Try different browser (Chrome recommended)
- Set up ESP8266/ESP32 hardware instead

### IR Works But AC Does Wrong Thing

The app uses Sharp AC protocol:
- Verify your AC model is CV-P12LX
- Some Sharp models use different codes
- Check AC manual for compatibility

## Browser Compatibility

**Best Support:**
- Chrome for Android
- Samsung Internet
- Mi Browser (Xiaomi phones)

**Limited Support:**
- Firefox (may need permissions)
- Edge

**Not Supported:**
- iOS Safari (iPhones don't have IR)
- Desktop browsers

## Tips for Best Results

1. **Keep Phone Charged**
   - IR transmission uses battery
   - Keep phone above 20%

2. **Clear Line of Sight**
   - Remove obstacles
   - Point directly at AC
   - Avoid bright sunlight on AC receiver

3. **Optimal Distance**
   - 1-5 meters works best
   - Closer is more reliable
   - Maximum: ~10 meters

4. **Add to Home Screen**
   - Chrome → Menu → "Add to Home Screen"
   - Quick access like a native app
   - Works offline (if previously loaded)

## Privacy & Security

**Local Processing:**
- IR codes generated on your phone
- No data sent to external servers
- Works completely offline

**Server Mode:**
- Only used if phone has no IR
- Commands sent via HTTPS (encrypted)
- No personal data collected

## Comparison: Phone IR vs ESP8266

| Feature | Phone IR | ESP8266 |
|---------|----------|---------|
| **Cost** | Free | ~$5 |
| **Setup Time** | Instant | 30 minutes |
| **Portability** | Mobile | Fixed |
| **Range** | 1-10m | 1-7m |
| **Reliability** | Excellent | Excellent |
| **Always On** | No | Yes |
| **Remote Access** | Via server | Via server |

## Recommended Setup

**If you have IR phone:**
1. Use phone IR for direct control
2. Optionally add ESP8266 for automation
3. Best of both worlds!

**If no IR phone:**
1. Set up ESP8266/ESP32
2. Control from any device
3. Works with iPhone, iPad, etc.

## Advanced: Automation

Even with phone IR, you can:
- Set up ESP8266 for scheduled commands
- Use phone when home, ESP8266 for automation
- Create scenes and routines

## Next Steps

1. ✅ Open https://remote.cloudmc.online
2. ✅ Check for "Phone IR Ready" status
3. ✅ Test Power button
4. ✅ Add to home screen
5. ✅ Enjoy your smart AC!

---

**Questions?**

- Check if your phone has IR: Google "[your phone model] IR blaster"
- Test with the web app - it auto-detects
- If no IR, see `HARDWARE_SETUP.md` for ESP8266 option
