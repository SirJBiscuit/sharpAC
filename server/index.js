const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

let deviceConnected = false;
let serialPort = null;

const initSerialPort = async () => {
  // Only initialize serial port if SERIAL_PORT is configured
  if (!process.env.SERIAL_PORT) {
    console.log('No SERIAL_PORT configured - running in phone IR mode');
    console.log('Commands will be sent to phone for IR transmission');
    return;
  }

  try {
    const { SerialPort } = require('serialport');
    const { ReadlineParser } = require('@serialport/parser-readline');
    
    const portPath = process.env.SERIAL_PORT;
    
    serialPort = new SerialPort({
      path: portPath,
      baudRate: 115200
    });

    const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

    serialPort.on('open', () => {
      console.log('Serial port opened successfully');
      deviceConnected = true;
    });

    serialPort.on('error', (err) => {
      console.error('Serial port error:', err.message);
      deviceConnected = false;
    });

    parser.on('data', (data) => {
      console.log('Received from device:', data);
    });

  } catch (error) {
    console.error('Failed to initialize serial port:', error.message);
    console.log('Falling back to phone IR mode');
  }
};

const sendIRCommand = (command) => {
  return new Promise((resolve, reject) => {
    console.log('IR command received:', command);
    
    if (serialPort && serialPort.isOpen) {
      const commandStr = JSON.stringify(command) + '\n';
      serialPort.write(commandStr, (err) => {
        if (err) {
          console.error('Error writing to serial port:', err);
          reject(err);
        } else {
          console.log('Command sent to ESP8266/ESP32 device');
          resolve();
        }
      });
    } else {
      console.log('Command ready for phone IR transmission');
      setTimeout(resolve, 100);
    }
  });
};

app.get('/api/status', (req, res) => {
  res.json({
    connected: deviceConnected,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/command', async (req, res) => {
  try {
    const command = req.body;
    console.log('Received command:', command);

    await sendIRCommand(command);

    res.json({
      success: true,
      message: 'Command sent successfully',
      command: command
    });
  } catch (error) {
    console.error('Error processing command:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send command',
      error: error.message
    });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

initSerialPort();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
