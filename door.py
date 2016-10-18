import time
import RPi.GPIO as io
io.setmode(io.BCM)

door_pin = 23
io.setup(door_pin, io.IN, pull_up_down=io.PUD_UP)
door=0

while True:
    if io.input(door_pin):
        print("Open...")
        door=0 # set door to its initial value
        time.sleep(1) # wait 1 second before the next action
    if (io.input(door_pin)==False and door!=1):
        print("Closed...")
        door=1
