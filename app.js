(() => {
'use strict';
const $ = id => document.getElementById(id);
const scenarios = [
 {title:'Opening a meeting',objective:'Greet and introduce your company',buyer:'Good morning. Thank you for arranging this meeting. Could you introduce your company and the product you offer?',options:[
 'We sell coffee. You can read the catalogue later.',
 'Good morning, Sarah. Thank you for meeting us. We represent a North Sumatran coffee business, and today we would like to introduce our packaged Arabica product.',
 'Our product is definitely the best in the world, so you should buy it today.' ],correct:1, rationale:'Pernyataan profesional menyebut salam, identitas perusahaan, tujuan, dan produk tanpa klaim berlebihan.', tip:'Thank you for meeting us. We would like to introduce...'},
 {title:'Clarifying requirements',objective:'Ask for clarification politely',buyer:'We may need a regular monthly order. Can you deliver 200 packages within three weeks?',options:[
 'Yes, we promise anything, so there is no need to check.',
 'That is impossible. Please choose another supplier.',
 'Thank you for the details. May I confirm the package size and delivery destination before checking our production schedule?' ],correct:2, rationale:'Klarifikasi ukuran kemasan dan lokasi pengiriman diperlukan sebelum menyanggupi tenggat dan kapasitas.',tip:'May I confirm...? Could you clarify...? '},
 {title:'Fair negotiation',objective:'Offer a practical alternative',buyer:'Your quoted price is a little higher than our target. Is there any flexibility?',options:[
 'I understand your budget concern. We could review the unit price for a larger order or discuss a phased delivery. Which option would work better for you?',
 'Our price is final. There is nothing to discuss.',
 'We will cut the price in half, even if we cannot cover our costs.' ],correct:0, rationale:'Negosiasi yang baik mengakui kebutuhan pembeli, menawarkan alternatif yang realistis, dan mengundang kesepakatan bersama.',tip:'I understand your concern. We could consider...'},
 {title:'Closing and follow-up',objective:'Summarize agreements accurately',buyer:'Thank you for the discussion. Could you confirm what happens next?',options:[
 'We are done. Please check the website yourself.',
 'Certainly. I will send a written summary of the proposed quantity, price options, delivery conditions, and the points we still need to confirm by tomorrow.',
 'Everything is already agreed, including items we have not discussed.' ],correct:1,rationale:'Penutup profesional merangkum hal yang disepakati, membedakan yang belum pasti, dan menentukan tindak lanjut tertulis.',tip:'I will send a written summary...'}
];
const info = {
 product:{tag:'HOTSPOT 01 · PRODUCT',title:'The local product',body:'Produk latihan ini adalah kemasan kopi Arabica Danau Toba fiktif. Mahasiswa menjelaskan fitur yang dapat diamati dan tidak boleh mengarang sertifikasi, asal bahan, harga, atau klaim kualitas.',phrases:['Our product is packaged in 250-gram bags.','Could you tell us your packaging requirements?']},
 meeting:{tag:'HOTSPOT 02 · COMMUNICATION',title:'The virtual meeting room',body:'Pertemuan internasional menuntut pembukaan yang jelas, pertanyaan klarifikasi, tanggapan sopan, dan tindak lanjut profesional.',phrases:['Thank you for joining this meeting.','Let me clarify our proposal.']},
 culture:{tag:'HOTSPOT 03 · LOCAL VALUES',title:'Respect and collaboration',body:'Konteks kerja sama usaha lokal dimasukkan ke alur negosiasi: dengarkan kebutuhan mitra, diskusikan alternatif, dan buat keputusan yang adil. Nilai saling menghormati dan musyawarah dipraktikkan lewat pilihan dialog.',phrases:['I understand your concern.','Let us find an option that works for both sides.']}
};
let step=0;
let choices=Array(4).fill(null);
let completed=Array(4).fill(false);
let use3D=false;
let fallbackAngle=-5;
let lastAIFeedback='';
const safeText=t=>String(t||'').replace(/[\u0000-\u001f]/g,' ').trim();
function show(view){
 document.querySelectorAll('.view').forEach(e=>e.classList.toggle('active',e.id===`view-${view}`));
 document.querySelectorAll('.nav-btn').forEach(e=>e.classList.toggle('active',e.dataset.view===view));
 const names={experience:'Virtual business room',ar:'AR product exploration',practice:'Role-play and GenAI',summary:'Learning outcomes'};
 $('crumb').textContent=names[view]||'Learning';
 window.scrollTo({top:0,behavior:'smooth'});
 if(view==='summary')renderSummary();
 if(view==='experience')setTimeout(()=>window.dispatchEvent(new Event('resize')),120);
}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.view)));
$('startPractice').onclick=()=>show('practice');$('arToPractice').onclick=()=>show('practice');
$('helpBtn').onclick=()=> $('helpDialog').showModal();$('closeHelp').onclick=()=> $('helpDialog').close();
$('closeDialog').onclick=()=> $('detailDialog').close();
document.querySelectorAll('.hotspot').forEach(b=>b.addEventListener('click',()=>{
 const i=info[b.dataset.hotspot];$('detailTag').textContent=i.tag;$('detailTitle').textContent=i.title;$('detailBody').textContent=i.body;
 $('detailPhrase').replaceChildren(...i.phrases.map(t=>{const x=document.createElement('div');x.textContent=`“${t}”`;return x;}));$('detailDialog').showModal();
}));
function set3DMessage(message){$('sceneStatus').textContent=message;}
window.set3DLoaded=function(launch,rotate,reset){use3D=true;window.launchVR=launch;window.turnRoom=rotate;window.resetRoom=reset;$('roomFallback').style.display='none';set3DMessage('Ruang 3D aktif · drag untuk melihat ruang');};
window.set3DError=function(){set3DMessage('Pratinjau ruang tetap tersedia · 3D online membutuhkan internet');};
function rotateRoom(dir){if(use3D&&window.turnRoom)window.turnRoom(dir);else{fallbackAngle+=dir*10;$('roomFallback').style.transform=`perspective(950px) rotateY(${fallbackAngle}deg)`;}}
$('rotateLeft').onclick=()=>rotateRoom(-1);$('rotateRight').onclick=()=>rotateRoom(1);
$('resetCamera').onclick=()=>{if(use3D&&window.resetRoom)window.resetRoom();else{fallbackAngle=-5;$('roomFallback').style.transform='perspective(950px) rotateY(-5deg)';}};
$('vrLaunch').onclick=()=>{if(window.launchVR)window.launchVR();else{ $('helpDialog').showModal(); }};
function speech(text){
 if(!('speechSynthesis' in window)){alert('Fitur audio tidak tersedia pada browser ini.');return;}
 speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(text);utter.lang='en-US';utter.rate=.9;utter.pitch=1;speechSynthesis.speak(utter);
}
$('arSpeak').onclick=()=>speech('Good morning. We would like to introduce our fictional Danau Toba Arabica coffee product. It is packaged in 250 gram bags. Could you share your purchasing requirements?');
$('speakLine').onclick=()=>speech(scenarios[step].buyer);
function renderStep(){
 const s=scenarios[step];$('stageTitle').textContent=s.title;$('buyerLine').textContent=`“${s.buyer}”`;
 $('stepIndex').textContent=`STEP ${String(step+1).padStart(2,'0')} / 04`;
 document.querySelectorAll('#segments i').forEach((e,i)=>{e.className=(completed[i]?'done':i===step?'current':'')});
 $('optionFeedback').hidden=true;$('optionFeedback').className='option-feedback';
 $('nextStep').disabled=!completed[step];$('nextStep').innerHTML=step===3?'View results <span>→</span>':'Next stage <span>→</span>';
 $('options').replaceChildren();
 s.options.forEach((t,i)=>{const b=document.createElement('button');b.type='button';b.className='option-button';
 const letter=document.createElement('span');letter.className='letter';letter.textContent='ABC'[i];const txt=document.createElement('span');txt.textContent=t;
 b.append(letter,txt);b.addEventListener('click',()=>selectOption(i));$('options').appendChild(b)});
 if(completed[step])showSelected();
 $('freeAnswer').value='';$('coachResponse').textContent='Respons latihan dan umpan balik Anda akan ditampilkan di sini.';
}
function showSelected(){const s=scenarios[step],sel=choices[step];$('optionFeedback').hidden=false;const good=sel===s.correct;
 $('optionFeedback').classList.toggle('negative',!good);$('optionFeedback').textContent=(good?'✓ Pilihan tepat. ':'↗ Coba perhatikan respons yang paling profesional. ')+s.rationale;
 [...$('options').children].forEach((b,i)=>{b.classList.toggle('selected',i===s.correct);b.classList.toggle('wrong',i===sel && !good);b.disabled=true;});
 $('nextStep').disabled=false;
}
function selectOption(i){if(completed[step])return;choices[step]=i;completed[step]=true;showSelected();updateProgress();}
function updateProgress(){const done=completed.filter(Boolean).length;const pct=Math.round(done/4*100);$('sideProg').style.width=`${pct}%`;$('sideStep').textContent=done;$('heroPct').innerHTML=`${pct}<span>%</span>`;$('heroBar').style.width=`${pct}%`;}
$('nextStep').onclick=()=>{if(!completed[step])return;if(step<3){step++;renderStep();}else show('summary');};
$('retryStep').onclick=()=>{choices[step]=null;completed[step]=false;updateProgress();renderStep();};
function gradeOffline(ans){
 let notes=[];
 if(ans.split(/\s+/).length<10)notes.push('Tambahkan detail: gunakan sedikitnya dua kalimat yang jelas.');
 if(!/thank|good morning|appreciate|understand|certainly|pleas/i.test(ans))notes.push('Awali dengan ungkapan yang sopan dan menghargai mitra.');
 if(!/could|would|may i|let us|i will|we can|we could|confirm|clarify|offer|proposal/i.test(ans))notes.push('Tambahkan tindakan komunikasi yang konkret, seperti klarifikasi, alternatif, atau tindak lanjut.');
 if(/best in the world|guarantee anything|impossible|whatever|shut up/i.test(ans))notes.push('Hindari klaim berlebihan dan ungkapan yang terlalu keras.');
 if(notes.length===0)notes.push('Respons cukup jelas dan sopan. Periksa kembali fakta serta kesesuaiannya dengan konteks dialog.');
 return notes.join('\n• ');
}
function outputCoach(kind,content){const box=$('coachResponse');box.replaceChildren();const label=document.createElement('span');label.className='ai-kind';label.textContent=kind;const p=document.createElement('div');p.textContent=content;box.append(label,p);}
$('localCheck').onclick=()=>{const ans=safeText($('freeAnswer').value);if(!ans){outputCoach('OFFLINE CHECK','Tulis jawaban dalam bahasa Inggris terlebih dahulu.');return;}
 outputCoach('OFFLINE CHECK · RULE-BASED (NOT GENAI)','• '+gradeOffline(ans)+'\n\nUseful expression: “'+scenarios[step].tip+'”');};
function aiPrompt(){const s=scenarios[step],ans=safeText($('freeAnswer').value);return `You are a supportive Business English coach for Indonesian vocational university learners (approx. CEFR B1-B2). Scenario: a fictional North Sumatran coffee cooperative negotiating with an international buyer. Skill: ${s.objective}. Buyer said: "${s.buyer}". Student replied: "${ans||'[STUDENT WILL WRITE THEIR RESPONSE HERE]'}". Provide concise, accurate, culturally respectful formative feedback in Indonesian with: (1) one strength, (2) one improvement about politeness/clarity/accuracy, (3) one improved English sentence the learner can say. Do not invent product certifications, quality claims, contracts, or fixed prices. Focus on mutual respect and fair negotiation. No more than 90 words total.`;}
$('copyAiPrompt').onclick=async()=>{
 const prompt=aiPrompt(); try{await navigator.clipboard.writeText(prompt);$('copyAiPrompt').textContent='✓ Prompt copied · paste into ChatGPT';}catch{const tmp=document.createElement('textarea');tmp.value=prompt;document.body.append(tmp);tmp.select();document.execCommand('copy');tmp.remove();$('copyAiPrompt').textContent='Prompt siap ditempel';}
};
$('applyPasted').onclick=()=>{const ans=safeText($('pastedAI').value);if(!ans){outputCoach('GENAI · PASTE BRIDGE','Tempel respons yang Anda peroleh dari ChatGPT terlebih dahulu.');return;}lastAIFeedback=ans;outputCoach('GENAI · PASTED FEEDBACK',ans);};
$('aiFeedback').onclick=async()=>{
 const ans=safeText($('freeAnswer').value);if(ans.length<10){outputCoach('GENAI','Tulis jawaban bahasa Inggris sedikitnya 10 karakter terlebih dahulu.');return;}
 const key=$('apiKey').value.trim();if(!key){$('genaiSettings').open=true;outputCoach('GENAI CONNECTION REQUIRED','Masukkan kunci Gemini API khusus uji coba pada panel di bawah, atau pilih “Copy ChatGPT prompt instead” dan tempel hasil AI ke kotak respons. Fitur Check offline tetap tersedia tanpa kunci.');return;}
 const model=$('aiModel').value.trim();if(!/^[a-zA-Z0-9_.-]{3,70}$/.test(model)){outputCoach('GENAI','Nama model tidak valid.');return;}
 const btn=$('aiFeedback');btn.disabled=true;btn.textContent='Generating...';outputCoach('GENAI','Meminta umpan balik dari layanan AI.');
 try{
   const ctrl=new AbortController();const t=setTimeout(()=>ctrl.abort(),18000);
   let result;
   try{result=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,{
    method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify({contents:[{parts:[{text:aiPrompt()}]}],generationConfig:{temperature:0.3,maxOutputTokens:480}}),signal:ctrl.signal});}
   finally{clearTimeout(t);}
   const data=await result.json();if(!result.ok)throw Error(data?.error?.message||`HTTP ${result.status}`);
   const feedback=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('\n').trim();if(!feedback)throw Error('Model tidak mengembalikan teks.');
   lastAIFeedback=feedback;outputCoach('GENAI · LIVE MODEL FEEDBACK',feedback);
 }catch(err){outputCoach('GENAI · CONNECTION ISSUE','Permintaan AI tidak berhasil: '+(err?.message||'unknown error')+'\n\nGunakan Check offline atau Copy ChatGPT prompt. Respons AI langsung membutuhkan internet, akun API, izin akses API, serta browser kompatibel.');}
 finally{btn.disabled=false;btn.textContent='✧ Ask GenAI';}
};
function renderSummary(){
 const done=completed.filter(Boolean).length;const best=choices.filter((c,i)=>completed[i]&&c===scenarios[i].correct).length;
 const points=choices.reduce((sum,c,i)=>sum+(completed[i]?(c===scenarios[i].correct?25:8):0),0);
 $('summaryScore').textContent=points;$('summaryBar').style.width=`${points}%`;$('completedCount').textContent=`${done}/4`;$('correctCount').textContent=`${best}/4`;
 $('summaryStatus').textContent=done===4?(best===4?'Excellent! You selected professional responses in all four stages.':'Good practice. Review the feedback and try improving the weaker stages.'):'Selesaikan empat tahap role-play untuk mendapatkan skor akhir.';
 $('completedList').replaceChildren();scenarios.forEach((s,i)=>{const row=document.createElement('div');row.className='review-item';const badge=document.createElement('span');badge.className='badge-check';badge.textContent=completed[i]?(choices[i]===s.correct?'✓':'↗'):'○';const detail=document.createElement('div');const name=document.createElement('strong');name.textContent=s.title;const note=document.createElement('small');note.textContent=completed[i]?s.rationale:'Belum dikerjakan';detail.append(name,note);row.append(badge,detail);$('completedList').append(row);});
}
$('restartAll').onclick=()=>{choices=Array(4).fill(null);completed=Array(4).fill(false);step=0;lastAIFeedback='';renderStep();updateProgress();show('practice');};
$('exportResults').onclick=()=>{
 const lines=['MEDAN BUSINESS XR — LEARNING RECORD','Fictional International Buyer Meeting',`Date: ${new Date().toLocaleString('id-ID')}`,'',...scenarios.flatMap((s,i)=>[`${i+1}. ${s.title}`,'Buyer: '+s.buyer,'Your selected answer: '+(choices[i]===null?'Not attempted':s.options[choices[i]]),'Best answer: '+s.options[s.correct],s.rationale,'']),lastAIFeedback?'AI feedback (formative):\n'+lastAIFeedback:'No AI feedback saved.','', 'Note: Practice feedback is formative; the offline checker is rule-based and is not generative AI.'];
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}));a.download='medan-business-xr-learning-record.txt';document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);
};
renderStep();updateProgress();
})();
