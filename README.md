
<div align="center">
  
# PiRoutine | Client ⏰💦

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  
###  PiRoutine is a morning alarm system that uses a port forwarded raspberry pi, that's wired via relay switch to a water pump, and interacted with through a deployed front end. 
 ### All of which aims to instill good habits in the user, starting by waking up on time. 

![](https://media.giphy.com/media/u6WXNK5Z5AObZ9eOaa/giphy.gif)
 
###  This is done by leveraging a pavlovian fear of laying in bed too long after they've heard their external alarm go off, by soaking the user and/or their bed with water. In return, the user quickly learns to wake up alongside their external alarm, jumping out of bed, ready to start their day with a light jog!
[Check It Out!](https://piroutine.com)
</div>

---
## Phase 1 - Disarming Alarm 1
  After waking up by an external alarm, it's suggested to give yourself 5-10 minutues before PiRoutine's first alarm goes off. 
- (EX: External = 5:00AM, PiRoutine = 5:10AM)

Once awake, unlock and disarm the initial alarm, before the current time hits alarm 1. 
- Failure to do so, will result in the pump going off.
<div align="center">

![](https://media.giphy.com/media/4T9FrMFKvVCOVPt3AD/giphy.gif)
</div>

- Once unlocked, other secured functionalities include: 
  - The ability to change PiRoutine's initial alarm.
  - The ability to skip the current or upcoming day. While this will be recorded as a failure, it will not trigger the pump.
<div align="center">

![](https://media.giphy.com/media/nf0ISX16TTOGgOZEtK/giphy.gif)
![](https://media.giphy.com/media/rTDwskhKtKKgtJgjgK/giphy.gif)
</div>

## Phase 2 - Beginning My Routine Run
  After the initial alarm is disarmed, I begin my morning run / walk. Waking up the body and getting the blood pumping.
- Note that while traveling, the client remains responsive to the users distance traveled. 
<div align="center">

![](https://media.giphy.com/media/bu7f1pVmXjfIxsCIvN/giphy.gif)
![](https://media.giphy.com/media/JpCnppJj1nx25lgt79/giphy.gif)
</div>
  
## Phase 3 - Disarming Alarm 2
  After the distance is traveled (roughly 0.25mi-0.5mi), disarm the final alarm. 
- Failure to do so, will result in the pump going off. 
<div align="center">

![](https://media.giphy.com/media/4T9FrMFKvVCOVPt3AD/giphy.gif)
</div>
  
- Note that the metadata is updated on its own upon the current time reaching the final alarm time.
<div align="center">

![](https://media.giphy.com/media/3ZEJjQsOq5FoqUi98H/giphy.gif)
![](https://media.giphy.com/media/7BiZOPkTaZxtDM28F4/giphy.gif)
</div>

## Checking My Records
  Keeping me consistant and inspired, in addition to the streak / max streak tracking I included, I can also check my previous records whenever I want.
- White data entry indicates, I successfully stuck to my routine that day.
- Red data entry indicates, I failed to stick to my routine that day.
<div align="center">

![](https://media.giphy.com/media/Vx0uMBsm3K6pU9FqBT/giphy.gif)
</div>
    
## Raspberry Pi Installation
  The raspberry pi is connected to a water pump, stored inside the 5 gallon bucket beside the bed. The pump has tubing connecting it to a piece of conduit with holes drilled into it, attached to my headboard. 


<div align="center">

![](https://media.giphy.com/media/BOUoNFCUU2GLJcLk6I/giphy-downsized.gif)

(While this gif is outdated, it gets the point across)
</div>

## Set Up
- Clone client code to a deployed instance.
- run: 
``` sh
npm install
npm start   # Builds the client bundle
npm run server
```
- Clone, Install & Deploy the PiRoutine Server on a raspberry pi & [read it's README](https://github.com/daurham/PiRoutine-Pi-Server)

<div align="center">

---
  
One day, I plan on making a video. Meanwhile, just ask if you'd like help setting up. 

![](https://media.giphy.com/media/4T9FrMFKvVCOVPt3AD/giphy.gif)

[Jake Ernest Daurham](https://daurham.com/)
</div>
