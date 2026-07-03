# Shopping List

Everything you need to build the Sharp AC IR Remote.

## Essential Components

### Option 1: Minimal Setup (~$5)

| Item | Quantity | Price | Where to Buy |
|------|----------|-------|--------------|
| NodeMCU ESP8266 CP2102 | 1 | $3-4 | Amazon, AliExpress, eBay |
| 940nm IR LED (5mm) | 1 | $0.50 | Amazon, Electronics store |
| 100Ω Resistor (1/4W) | 1 | $0.10 | Amazon, Electronics store |
| Micro USB Cable | 1 | $1-2 | Amazon, Dollar store |

**Total: ~$5-7**

### Option 2: Complete Kit (~$15)

| Item | Quantity | Price | Where to Buy |
|------|----------|-------|--------------|
| NodeMCU ESP8266 (3-pack) | 1 pack | $10 | Amazon |
| IR LED Kit (50pcs) | 1 kit | $3 | Amazon |
| Resistor Kit (500pcs) | 1 kit | $5 | Amazon |
| Breadboard + Jumper Wires | 1 set | $5 | Amazon |
| USB Cables (3-pack) | 1 pack | $5 | Amazon |

**Total: ~$28 (but you'll have spares for other projects)**

## Recommended Amazon Links

**ESP8266 Boards:**
- Search: "NodeMCU ESP8266 CP2102"
- Look for: CH340 or CP2102 USB chip
- Avoid: Very cheap boards with unknown USB chips

**IR LEDs:**
- Search: "940nm IR LED 5mm"
- Get: Clear lens (not tinted)
- Wavelength: 940nm (standard for remotes)

**Resistors:**
- Search: "1/4W resistor kit"
- You need: 100Ω (Brown-Black-Brown)
- Kit gives you all values for future projects

## Optional Upgrades

### For Better Range

| Item | Price | Purpose |
|------|-------|---------|
| 2N2222 NPN Transistor | $0.20 | Boost IR LED power |
| 1kΩ Resistor | $0.10 | Transistor base resistor |
| Multiple IR LEDs (3-5) | $1.50 | Wider coverage |

### For Professional Installation

| Item | Price | Purpose |
|------|-------|---------|
| Project Box (small) | $2-3 | Enclosure |
| 5V USB Power Adapter | $3-5 | Dedicated power |
| Double-sided tape | $2 | Mounting |
| Heat shrink tubing | $3 | Wire protection |

### For Advanced Users

| Item | Price | Purpose |
|------|-------|---------|
| ESP32 DevKit | $6-8 | More powerful, WiFi + Bluetooth |
| Temperature Sensor (DHT22) | $3-5 | Room temperature monitoring |
| OLED Display | $4-6 | Local status display |

## Where to Buy

### Fast Shipping (2-3 days)
- **Amazon** - Prime shipping, easy returns
- **Local Electronics Store** - Same day pickup

### Budget Option (2-4 weeks)
- **AliExpress** - Cheapest prices
- **Banggood** - Good selection
- **eBay** - Mix of local and overseas

### Specialty Stores
- **Adafruit** - Quality components, tutorials
- **SparkFun** - Educational focus
- **Digi-Key** - Professional grade
- **Mouser** - Large selection

## Specific Product Recommendations

### ESP8266 Board
**Best Value:**
- HiLetgo NodeMCU ESP8266 (Amazon)
- DOIT NodeMCU V3 (AliExpress)

**Premium:**
- Adafruit Feather HUZZAH ESP8266

### IR LED
**Recommended:**
- Vishay TSAL6200 (940nm, high power)
- Generic 940nm 5mm clear LED (budget)

**Avoid:**
- Tinted/colored LEDs
- 850nm LEDs (different wavelength)

## Tools You Might Already Have

- ✅ Computer with USB port
- ✅ Wire strippers (or scissors)
- ✅ Soldering iron (optional, can use breadboard)
- ✅ Multimeter (optional, for testing)

## What's NOT Needed

- ❌ Raspberry Pi (ESP8266 is cheaper and easier)
- ❌ Arduino Uno (ESP8266 has WiFi built-in)
- ❌ IR Receiver (we only transmit, not receive)
- ❌ Special cables or adapters

## Budget Breakdown

### Absolute Minimum
- ESP8266: $3
- IR LED: $0.50
- Resistor: $0.10
- USB cable: $1 (or use existing)
**Total: $4.60**

### Recommended Starter
- ESP8266: $4
- IR LED: $0.50
- Resistor: $0.10
- USB cable: $2
- Project box: $3
**Total: $9.60**

### Complete Professional Setup
- ESP8266 (3-pack): $10
- Component kit: $15
- Tools: $10
- Enclosure: $5
**Total: $40**

## Money-Saving Tips

1. **Buy in Bulk** - ESP8266 3-packs are cheaper per unit
2. **Component Kits** - Resistor/LED kits give you extras
3. **Check Locally** - Sometimes local stores have deals
4. **Use Existing** - Check if you have USB cables already
5. **Wait for Sales** - Amazon Prime Day, Black Friday

## Shipping Times

| Store | Shipping | Time |
|-------|----------|------|
| Amazon Prime | Free | 1-2 days |
| Amazon Standard | Free/$5 | 5-7 days |
| AliExpress | Free | 15-30 days |
| Local Store | Pickup | Same day |

## Quality Checklist

When buying ESP8266:
- ✅ CP2102 or CH340 USB chip (mentioned in listing)
- ✅ Good reviews (4+ stars)
- ✅ Clear product photos
- ✅ Seller has history
- ❌ Avoid "too cheap" listings
- ❌ Avoid unknown brands with no reviews

## Return Policy

- **Amazon**: 30-day returns, easy process
- **AliExpress**: Buyer protection, can be slow
- **Local Store**: Varies, ask before buying

## Next Steps After Ordering

While waiting for parts:
1. ✅ Set up your server
2. ✅ Configure Cloudflare Tunnel
3. ✅ Read the documentation
4. ✅ Install Arduino IDE
5. ✅ Download required libraries

## Questions?

**"Do I need to solder?"**
No! You can use a breadboard or twist wires together.

**"Can I use a different ESP board?"**
Yes! ESP32, Wemos D1 Mini, etc. all work.

**"What if I can't find 940nm LEDs?"**
850nm will work but with shorter range.

**"Do I need the exact resistor value?"**
47Ω to 220Ω will work. 100Ω is optimal.

---

**Happy Shopping! 🛒**

Once you have the parts, follow `QUICK_START.md` to build your remote!
