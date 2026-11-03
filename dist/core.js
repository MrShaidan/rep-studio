(function(root){
'use strict';
const FACTOR=2.2046226218;
const key=(name,mode='weight')=>name.trim().normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ')+'|'+mode;
const toKg=(value,unit)=>unit==='lb'?value/FACTOR:value;
const fromKg=(value,unit)=>unit==='lb'?value*FACTOR:value;
const fresh=()=>({version:1,unit:'kg',routines:[],workouts:[],draft:null});
const records=(workouts,k,reps)=>workouts.flatMap(w=>w.exercises).filter(e=>e.key===k&&e.mode==='weight').flatMap(e=>e.sets).filter(s=>s.reps===reps).map(s=>s.weightKg);
function personalRecords(workouts,exercises){return exercises.flatMap(e=>{if(e.mode!=='weight')return[];const byRep=new Map();e.sets.forEach(s=>byRep.set(s.reps,Math.max(byRep.get(s.reps)||0,s.weightKg)));return [...byRep].flatMap(([reps,kg])=>{const old=records(workouts,e.key,reps);if(!old.length)return[];const previous=Math.max(...old);return kg>previous+0.001?[{name:e.name,reps,kg,previous}]:[];});});}
function validate(data){
const fail=()=>{throw Error('La copia no es un archivo REP válido. No se ha cambiado nada.');};
const str=(v,n=120)=>typeof v==='string'&&v.trim().length>0&&v.length<=n;
const num=(v,min,max)=>typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max;
const integer=(v,min,max)=>num(v,min,max)&&Number.isInteger(v);
const arr=(v,max)=>Array.isArray(v)&&v.length<=max;
if(!data||data.version!==1||!['kg','lb'].includes(data.unit)||!arr(data.routines,100)||!arr(data.workouts,10000))fail();
const exercise=e=>e&&str(e.name)&&['weight','assisted'].includes(e.mode)&&e.key===key(e.name,e.mode);
const date=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v+'T12:00:00'))&&new Date(v+'T12:00:00Z').toISOString().slice(0,10)===v;
for(const r of data.routines){if(!r||!str(r.id)||!str(r.name)||!integer(r.day,0,6)||!arr(r.exercises,50)||!r.exercises.length)fail();for(const e of r.exercises)if(!exercise(e)||!integer(e.targetSets,1,20))fail();}
for(const w of data.workouts){if(!w||!str(w.id)||!str(w.title)||!date(w.date)||!arr(w.exercises,50)||!w.exercises.length)fail();for(const e of w.exercises){if(!exercise(e)||!arr(e.sets,100)||!e.sets.length)fail();for(const s of e.sets)if(!s||!num(s.weightKg,0,1500)||!integer(s.reps,1,999))fail();}}
if(new Set(data.routines.map(r=>r.id)).size!==data.routines.length||new Set(data.workouts.map(w=>w.id)).size!==data.workouts.length)fail();
// Reconstruct instead of retaining unknown keys or untrusted objects.
return {version:1,unit:data.unit,routines:data.routines.map(r=>({id:r.id,name:r.name.trim(),day:r.day,exercises:r.exercises.map(e=>({key:e.key,name:e.name.trim(),mode:e.mode,targetSets:e.targetSets}))})),workouts:data.workouts.map(w=>({id:w.id,title:w.title.trim(),date:w.date,exercises:w.exercises.map(e=>({key:e.key,name:e.name.trim(),mode:e.mode,sets:e.sets.map(s=>({weightKg:s.weightKg,reps:s.reps}))}))})),draft:null};
}
const api={key,toKg,fromKg,fresh,records,personalRecords,validate};if(typeof module!=='undefined')module.exports=api;else root.RepCore=api;
})(typeof window!=='undefined'?window:globalThis);
