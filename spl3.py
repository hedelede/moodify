#! /usr/bin/env python3
import serial
import csv
import sys
import io
import binascii
import datetime

locations=['/dev/ttyACM0', '/dev/ttyACM1','/dev/ttyACM2', '/dev/ttyACM3','/dev/ttyACM4', '/dev/ttyACM5','/dev/ttyUSB0','/dev/ttyUSB1','/dev/ttyUSB2','/dev/ttyUSB3', '/dev/ttyUSB4', '/dev/ttyUSB5', '/dev/ttyUSB6', '/dev/ttyUSB7', '/dev/ttyUSB8', '/dev/ttyUSB9', '/dev/ttyUSB10','/dev/ttyS0', '/dev/ttyS1', '/dev/ttyS2', 'com2', 'com3', 'com4', 'com5', 'com6', 'com7', 'com8', 'com9', 'com10', 'com11', 'com12', 'com13', 'com14', 'com15', 'com16', 'com17', 'com18', 'com19', 'com20', 'com21', 'com1', 'end']

for device in locations:
    try:
        ser = serial.Serial(device, 9600, timeout = 1)
        break
    except:
        if device == 'end':
            print ("Unable to find Serial Port, Please plug in cable or check cable connections.")

print("Port", device, "has been successfully opened for serial communication.")
count = 0

while True:

	line = binascii.hexlify(ser.read(1))
	while line != b'0a':
			line = binascii.hexlify(ser.read(1))
	linea = binascii.hexlify(ser.read(1))
	lineb = binascii.hexlify(ser.read(1))
	linec = binascii.hexlify(ser.read(1))
	current = (int(linea)%10)/10 + (int(lineb)%10)/100 + (int(linec)%10)/1000

	line = binascii.hexlify(ser.read(1))
	while line != b'0b':
			line = binascii.hexlify(ser.read(1))
	linea = binascii.hexlify(ser.read(1))
	lineb = binascii.hexlify(ser.read(1))
	linec = binascii.hexlify(ser.read(1))
	voltage = (int(linea)%10)*10 + (int(lineb)%10) + (int(linec)%10)/10

	line = binascii.hexlify(ser.read(1))
	while line != b'0c':
			line = binascii.hexlify(ser.read(1))
	linea = binascii.hexlify(ser.read(1))
	lineb = binascii.hexlify(ser.read(1))
	linec = binascii.hexlify(ser.read(1))
	power = (int(linea)%10) + (int(lineb)%10)/10 + (int(linec)%10)/100
	count = count + 1
	with open('data.csv', 'a') as csvfile:
		spamwriter = csv.writer(csvfile, delimiter=',')
		spamwriter.writerow([count, str(current), str(voltage), str(power)])
		csvfile.close()
	print(datetime.datetime.now(), current, voltage, power)
ser.close()
