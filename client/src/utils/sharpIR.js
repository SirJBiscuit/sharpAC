// Sharp AC IR Protocol Implementation
// Based on IRremoteESP8266 Sharp AC protocol

const SHARP_AC_HDR_MARK = 3800;
const SHARP_AC_HDR_SPACE = 1900;
const SHARP_AC_BIT_MARK = 470;
const SHARP_AC_ZERO_SPACE = 500;
const SHARP_AC_ONE_SPACE = 1400;
const SHARP_AC_GAP = 40000;
const SHARP_AC_FREQ = 38000; // 38kHz carrier frequency

// Mode constants
const MODES = {
  auto: 0b00,
  dry: 0b11,
  cool: 0b10,
  heat: 0b01,
  fan: 0b00
};

// Fan speed constants
const FAN_SPEEDS = {
  auto: 0b010,
  low: 0b100,
  med: 0b011,
  high: 0b101,
  max: 0b111
};

// Convert Fahrenheit to Celsius for Sharp AC
const fahrenheitToCelsius = (tempF) => {
  const tempC = Math.round((tempF - 32) * 5 / 9);
  return Math.max(15, Math.min(30, tempC)); // Clamp to 15-30°C
};

// Generate Sharp AC IR code
export const generateSharpIRCode = (command) => {
  const { type, value, temperature, mode, fanSpeed } = command;
  
  // Build the state array (13 bytes for Sharp AC)
  const state = new Uint8Array(13);
  
  // Header bytes
  state[0] = 0xAA;
  state[1] = 0x5A;
  state[2] = 0xCF;
  state[3] = 0x10;
  
  // Temperature (byte 4)
  let temp = temperature || 72;
  state[4] = (fahrenheitToCelsius(temp) - 15) << 4;
  
  // Mode and fan (byte 5-6)
  const modeValue = MODES[mode || 'cool'] || MODES.cool;
  const fanValue = FAN_SPEEDS[fanSpeed || 'auto'] || FAN_SPEEDS.auto;
  
  state[5] = (modeValue << 6) | (fanValue << 3);
  
  // Power state (byte 6)
  if (type === 'power') {
    state[6] = value ? 0x31 : 0x21;
  } else {
    state[6] = 0x31; // Power on
  }
  
  // Special features (byte 7-8)
  if (type === 'special') {
    switch (value) {
      case 'turbo':
        state[7] = 0x01;
        break;
      case 'plasmacluster':
        state[8] = 0x04;
        break;
      case 'swing':
        state[9] = 0x06;
        break;
    }
  }
  
  // Calculate checksum (byte 12)
  let checksum = 0;
  for (let i = 0; i < 12; i++) {
    checksum ^= state[i];
  }
  state[12] = checksum;
  
  return state;
};

// Convert state to pulse/space pattern for IR transmission
export const generateIRPattern = (state) => {
  const pattern = [];
  
  // Add header
  pattern.push(SHARP_AC_HDR_MARK, SHARP_AC_HDR_SPACE);
  
  // Add data bits
  for (let byte of state) {
    for (let bit = 0; bit < 8; bit++) {
      pattern.push(SHARP_AC_BIT_MARK);
      if (byte & (1 << bit)) {
        pattern.push(SHARP_AC_ONE_SPACE);
      } else {
        pattern.push(SHARP_AC_ZERO_SPACE);
      }
    }
  }
  
  // Add final mark and gap
  pattern.push(SHARP_AC_BIT_MARK, SHARP_AC_GAP);
  
  return pattern;
};

// Check if device supports IR transmission
export const checkIRSupport = () => {
  // Check for Android IR API
  if (typeof Android !== 'undefined' && Android.hasIrEmitter) {
    return {
      supported: true,
      method: 'android',
      message: 'Android IR Blaster detected'
    };
  }
  
  // Check for Web IR API (experimental)
  if ('infrared' in navigator) {
    return {
      supported: true,
      method: 'web',
      message: 'Web IR API available'
    };
  }
  
  return {
    supported: false,
    method: 'none',
    message: 'No IR hardware detected - using remote server mode'
  };
};

// Transmit IR signal using phone hardware
export const transmitIR = async (command) => {
  const irSupport = checkIRSupport();
  
  if (!irSupport.supported) {
    console.log('No phone IR support - command will be sent to server');
    return { success: false, useServer: true };
  }
  
  try {
    const state = generateSharpIRCode(command);
    const pattern = generateIRPattern(state);
    
    if (irSupport.method === 'android' && typeof Android !== 'undefined') {
      // Use Android IR API
      Android.transmitIR(SHARP_AC_FREQ, JSON.stringify(pattern));
      return { success: true, method: 'android' };
    }
    
    if (irSupport.method === 'web' && 'infrared' in navigator) {
      // Use Web IR API (experimental)
      await navigator.infrared.transmit({
        carrierFrequency: SHARP_AC_FREQ,
        pattern: pattern
      });
      return { success: true, method: 'web' };
    }
  } catch (error) {
    console.error('IR transmission error:', error);
    return { success: false, error: error.message, useServer: true };
  }
  
  return { success: false, useServer: true };
};

// Get human-readable IR code for display
export const getIRCodeDisplay = (command) => {
  const state = generateSharpIRCode(command);
  const hex = Array.from(state).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  const pattern = generateIRPattern(state);
  
  return {
    hex: hex,
    bytes: state.length,
    pulses: pattern.length,
    frequency: `${SHARP_AC_FREQ / 1000}kHz`,
    protocol: 'Sharp AC'
  };
};
