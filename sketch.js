// -----------------------------------------------------------
// Loading Time;
// By Oliver N Blake
// -----------------------------------------------------------
// Each bar maps how far through each increment of time we are;
// 1. How far through each SECOND;
// 2. How far through each MINUTE;
// 3. How far through each HOUR;
// 4. How far through each DAY;
// 5. How far through each MONTH;
// 6. How far through each YEAR;
// -----------------------------------------------------------

// Time vars;
let sec, mnt, hr, dy, mon, yr;
let adjDay, adjMonth, adjYear;
let pSec, pMnt, pHr, pDy, pMon, pYr;
let secLoad, mntLoad, hrLoad, dyLoad, monLoad, yrLoad;
let secCount, mntCount, hrCount, dyCount, monCount, yrCount;
let fr;
let daysInYear, currentDay;
let leapYear;
let curveAmnt;
let textStartX, textStartY;
// Styling vars;
let barHeight;
let spacing;

function setup() {
  createCanvas(600, 300);
  
  fr = 60;
  
  frameRate(fr);
  
  // STYLING VARS;
  spacing = height/6;
  startY = spacing/3+5;
  textStartY = startY/1.5;
  textStartX = 5;
  barHeight = spacing/3;
  curveAmnt = 20;
  
  // TIME VARS;
  // set approx variables to begin;
  secCount = 0;
  mntCount = second() * fr; // seconds, times frames;
  hrCount = minute() * fr * 60; // minutes, times frames, times 60 seconds;
  dyCount = hour() * fr * 60 * 60; // hours, times frames, times 60 seconds, times 60 mintutes;
  
  // Account for differing months;
  adjDay = day();
  if (month() === 9 || month() === 4 || month() === 6 || month() === 11) {
    adjDay = day()/31*30;
  } else if (month() === 2) {
    adjDay = day()/31*28.25;
  } else {
    adjDay = day();   
  }
  
  monCount = adjDay * fr * 60 * 60 * 24; // days, times frames, times 60 seconds, times 60 minutes * 24 hours;
  
  // Account for leap years;
  if (year() / 4 % 1 === 0) {
    leapYear = true;
    daysInYear = 366;
  } else {
    leapYear = false;
    daysInYear = 365;
  }
  
  daysElapsed = month() * 31;
  // Pass through obstacle course of shorter months;
  if (month() > 2 && leapYear) {
    daysElapsed -= 3;
  } else if (month() > 2 && !leapYear) {
    daysElapsed -= 2;
  }
  if (month() > 3 && month() > 6) {
    daysElapsed -= 1;
  }
  if (month() > 7 && month() < 10) {
    daysElapsed -= 1;
  }
  if (month() == 12) {
    daysElapsed -= 1;
  }
  
  daysElapsed = (daysElapsed + (31 - adjDay))
    
  yrCount = daysElapsed * fr * 60 * 60 * 24; // days, times frames, times 60 seconds, times 60 minutes, times 24 hours, times adjusted Days value;
  

  // set Time vars;
  updateTime();
  saveTime();
}

function draw() {
  background(0);
  
  // Update Time variables;
  updateTime();

  // Map Second;
  secLoad = map(secCount, 0, fr, 0, width);
  let secPercent = round(map(secLoad, 0, width, 0, 100), 2);
  fill(240, 232, 17);
  rect(0, startY, secLoad, barHeight, curveAmnt);
  fill(255);
  text(secPercent + '%', textStartX, textStartY);
  
  // Map Minute;
  mntLoad = map(mntCount, 0, fr * 60, 0, width);
  let mntPercent = round(map(mntLoad, 0, width, 0, 100), 2);
  fill(36, 201, 53);
  rect(0, startY + spacing, mntLoad, barHeight, curveAmnt);
  fill(255);
  text(mntPercent + '%', textStartX, textStartY + spacing);
  
  // Map Hour;
  hrLoad = map(hrCount, 0, fr * 60 * 60, 0, width);
  let hrPercent = round(map(hrLoad, 0, width, 0, 100), 2);
  fill(9, 235, 220);
  rect(0, startY + spacing*2, hrLoad, barHeight, curveAmnt);
  fill(255);
  text(hrPercent + '%', textStartX, textStartY + spacing*2);
  
  // Map Day;
  dyLoad = map(dyCount, 0, fr * 60 * 60 * 24, 0, width);
  let dyPercent = round(map(dyLoad, 0, width, 0, 100), 2);
  fill(255, 174, 0);
  rect(0, startY + spacing*3, dyLoad, barHeight, curveAmnt);
  fill(255);
  text(dyPercent + '%', textStartX, textStartY + spacing*3);
  
  // Map Month;
  monLoad = map(monCount, 0, fr * 60 * 60 * 24 * 31, 0, width);
  let monPercent = round(map(monLoad, 0, width, 0, 100), 2);
  fill(219, 24, 18);
  rect(0, startY + spacing*4, monLoad, barHeight, curveAmnt);
  fill(255);
  text(monPercent + '%', textStartX, textStartY + spacing*4);
  
  // Map Year
  yrLoad = map(yrCount, 0, fr * 60 * 60 * 24 * daysInYear, 0, width);
  let yrPercent = round(map(yrLoad, 0, width, 0, 100), 2);
  fill(194, 24, 188);
  rect(0, startY + spacing*5, yrLoad, barHeight, curveAmnt);
  fill(255);
  text(yrPercent + '%', textStartX, textStartY + spacing*5);
    
  // Check how much time has elasped since last update;
  compareTime();
  
  // Save old time;
  saveTime();
}

function compareTime() {
  if (sec != pSec) {
    secCount = 0;
  } else {
    secCount++;
  }
  
  if (mnt != pMnt) {
    mntCount = 0;
  } else {
    mntCount++;
  }
  
  if (hr != pHr) {
    hrCount = 0;
  } else {
    hrCount++;
  }
  
  if (dy != pDy) {
    dyCount = 0;
  } else {
    dyCount++;
  }
  
  if (mon != pMon) {
    monCount = 0;
  } else {
    monCount++;
  }
  
  if (yr != pYr) {
    yrCount = 0;
  } else {
    yrCount++;
  }
}

function updateTime() {
  sec = second();
  mnt = minute();
  hr = hour();
  dy = day();
  mon = month();
  yr = year();
}

function saveTime() {
  pSec = sec;
  pMnt = mnt;
  pHr = hr;
  pDy = dy;
  pMon = mon;
  pYr = yr;
}