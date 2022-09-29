# PiRoutine | Client ⏰💦🏃‍♂️
PiRoutine is a morning alarm system that uses a port forwarded raspberry pi, wired via relay switch to a water pump and interacted with, through a deployed front end. All of which aims to instill good habits in the user by waking up on time. This is done by leveraging a pavlovian fear of laying in bed too long after they've heard their external alarm go off, by soaking the user and/or their bed with water. In return, the user quickly learns to wake up alongside their external alarm, jumping out of bed, ready to start their day!


---
## Phase 1 - Disarming Alarm 1
After waking up by an external alarm, it's suggested to give yourself 5-10 minutues before PiRoutine's first alarm goes off. 
- (EX: External = 5:00AM, PiRoutine = 5:10AM)

Once awake, unlock and disarm the initial alarm, before the current time hits alarm 1. 
- Failure to do so, will result in the pump going off.
- Once unlocked, other secured functionalities include: 
- 1. The ability to change the desired alarm time
- 2. Skip the current or upcoming day. While this results in a recorded failure, it will not trigger the pump.

![](https://media.giphy.com/media/nf0ISX16TTOGgOZEtK/giphy.gif)
## Phase 2 - Beginning My Routine Run
After the initial alarm is disarmed, I begin my morning run / walk. Waking up the body and getting the blood pumping.
- Note that while traveling, the client remains responsive to the users distance traveled. 

![](https://media.giphy.com/media/bu7f1pVmXjfIxsCIvN/giphy.gif)
![](https://media.giphy.com/media/JpCnppJj1nx25lgt79/giphy.gif)
## Phase 3 - Disarming Alarm 2
After the distance is traveled (roughly 0.25mi-0.5mi), disarm the final alarm. 
- Failure to do so, will result in the pump going off. 
- Note that the metadata is updated on its own upon the current time reaching the final alarm time.

![](https://media.giphy.com/media/3ZEJjQsOq5FoqUi98H/giphy.gif)
## Phase # - Checking My Records
Keeping me consistant and inspired, in addition to the streak / max streak tracking I included, I can also check my previous records whenever I want.
- White data entry indicates, I successfully stuck to my routine that day.
- Red data entry indicates, I failed to stick to my routine that day.

![](https://media.giphy.com/media/Vx0uMBsm3K6pU9FqBT/giphy.gif)
## Raspberry Pi Installation
The raspberry pi is connected to a water pump in the 5 gallon bucket, and some tubing is feeding it to a piece of conduit with holes drilled into, attached to my headboard. 
- (While this gif is outdated, it gets the point across)

![](https://media.giphy.com/media/BOUoNFCUU2GLJcLk6I/giphy-downsized.gif)

## Set Up
- Clone client code to a deployed instance.
- run: 
``` sh
npm install
npm start   # Builds the client bundler
npm run server
```
- Clone, Install & Deploy the PiRoutine Server & [read it's README](https://github.com/daurham/PiRoutine-Pi-Server/main/README.md)

I understand that these instructions may be a bit vague. One day, I plan on making a video. Meanwhile, just ask if you'd like help setting up. 

-Jake Ernest Daurham
