// Progressive enhancement: the educational app stays usable without external WebGL dependencies.
(async () => {
 try {
 const THREE=await import('three');
 const [{OrbitControls},{VRButton},{GLTFLoader}]=await Promise.all([
   import('three/addons/controls/OrbitControls.js'),
   import('three/addons/webxr/VRButton.js'),
   import('three/addons/loaders/GLTFLoader.js')
 ]);
 const host=document.getElementById('threeHost'),stage=document.getElementById('stage');
 if(!host || !stage)return;
 const scene=new THREE.Scene();scene.background=new THREE.Color(0xb5c8bc);scene.fog=new THREE.Fog(0xb5c8bc,13,24);
 const camera=new THREE.PerspectiveCamera(45,Math.max(1,host.clientWidth)/Math.max(1,host.clientHeight),.1,150);
 camera.position.set(6.2,3.5,6.8);
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(stage.clientWidth,stage.clientHeight);
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.65;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.xr.enabled=true;
 host.appendChild(renderer.domElement);
 const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,1.35,-.2);controls.minDistance=3;controls.maxDistance=11;controls.minPolarAngle=.48;controls.maxPolarAngle=1.46;controls.enableDamping=true;controls.dampingFactor=.075;controls.update();controls.saveState();
 scene.add(new THREE.HemisphereLight(0xf6fff7,0x355954,2.3));
 const sun=new THREE.DirectionalLight(0xffe7ba,2.0);sun.position.set(-4,8,6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-10;sun.shadow.camera.right=10;sun.shadow.camera.top=10;sun.shadow.camera.bottom=-10;scene.add(sun);
 const fill=new THREE.DirectionalLight(0xc0f2e3,1.3);fill.position.set(6,4,-4);scene.add(fill);
 const m={wall:new THREE.MeshStandardMaterial({color:0xd8e0d8,roughness:.92}),side:new THREE.MeshStandardMaterial({color:0xb5c9bf,roughness:.98}),wood:new THREE.MeshStandardMaterial({color:0x947052,roughness:.72}),wood2:new THREE.MeshStandardMaterial({color:0x694e39,roughness:.7}),dark:new THREE.MeshStandardMaterial({color:0x234d4d,roughness:.75}),white:new THREE.MeshStandardMaterial({color:0xf5f4e9,roughness:.8}),gold:new THREE.MeshStandardMaterial({color:0xc5a16b,metalness:.55,roughness:.35}),sage:new THREE.MeshStandardMaterial({color:0x6d9180,roughness:.9}),screen:new THREE.MeshStandardMaterial({color:0x132f36,roughness:.45}),glass:new THREE.MeshStandardMaterial({color:0x8bc7c1,transparent:true,opacity:.5,metalness:.2,roughness:.12,side:THREE.DoubleSide})};
 function box(w,h,d,x,y,z,mat,parent=scene){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 function cyl(top,bot,height,x,y,z,mat,segments=28){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(top,bot,height,segments),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);return mesh;}
 function sphere(r,x,y,z,mat){const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,20,13),mat);mesh.position.set(x,y,z);mesh.castShadow=true;scene.add(mesh);return mesh;}
 const floor=box(13,.16,10,0,-.12,0,new THREE.MeshStandardMaterial({color:0xb9c4b6,roughness:1})); floor.receiveShadow=true;
 box(13,4.65,.16,0,2.25,-5,m.wall);box(.16,4.65,10,-6.5,2.25,0,m.side);
 box(.16,4.65,10,6.5,2.25,0,m.wall);
 // Accent wall strips and warm lighting.
 for(let x=-5.9;x<6;x+=.82)box(.026,4.2,.03,x,2.24,-4.885,new THREE.MeshStandardMaterial({color:0xc4d3c5,roughness:1}));
 box(4,.08,.22,-3.15,3.75,-4.78,m.gold);box(4,.08,.22,-3.15,1.02,-4.78,m.gold);
 // Window showing a stylized North Sumatran landscape.
 box(4.15,2.4,.09,3.3,2.65,-4.75,m.white);
 box(3.88,2.16,.02,3.3,2.65,-4.67,new THREE.MeshBasicMaterial({color:0x97bfc2}));
 const mount=new THREE.Mesh(new THREE.ConeGeometry(1.3,1.25,4),new THREE.MeshStandardMaterial({color:0x6e9d89,roughness:1}));mount.rotation.y=Math.PI/4;mount.position.set(3.7,1.66,-4.6);scene.add(mount);
 box(3.86,.53,.036,3.3,1.72,-4.58,new THREE.MeshBasicMaterial({color:0x82a790}));
 box(.05,2.3,.16,3.3,2.65,-4.53,m.white);box(4.05,.06,.15,3.3,2.62,-4.53,m.white);
 // Signage canvas on left wall.
 function textTexture(lines,background='#143e42',ink='#f6e8cd'){
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=512;const ctx=canvas.getContext('2d');ctx.fillStyle=background;ctx.fillRect(0,0,1024,512);
  ctx.strokeStyle='#ba9b68';ctx.lineWidth=8;ctx.strokeRect(24,24,976,464);
  ctx.fillStyle=ink;ctx.textAlign='center';ctx.font='700 38px Arial';ctx.fillText(lines[0],512,171);
  ctx.font='bold 74px Arial';ctx.fillText(lines[1],512,270);ctx.fillStyle='#d0b687';ctx.font='500 28px Arial';ctx.fillText(lines[2],512,355);
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;return t;
 }
 const signage=new THREE.Mesh(new THREE.PlaneGeometry(3.8,1.94),new THREE.MeshBasicMaterial({map:textTexture(['NORTH SUMATRA','TRADE ROOM','BUSINESS ENGLISH LAB']),side:THREE.DoubleSide}));signage.position.set(-3.35,2.45,-4.79);scene.add(signage);
 // Wooden oval conference table.
 const table=new THREE.Mesh(new THREE.CylinderGeometry(1.8,1.75,.15,48),m.wood);table.scale.set(1.5,1,.81);table.position.set(0,1.18,.3);table.castShadow=true;table.receiveShadow=true;scene.add(table);
 cyl(.11,.15,1.12,-1.5,.55,.3,m.wood2);cyl(.11,.15,1.12,1.5,.55,.3,m.wood2);
 cyl(.48,.48,.09,-1.5,.09,.3,m.wood2);cyl(.48,.48,.09,1.5,.09,.3,m.wood2);
 // Seats: colleagues around table.
 function seat(x,z,rot){const gr=new THREE.Group();gr.position.set(x,0,z);gr.rotation.y=rot;scene.add(gr);
 const mat=m.dark, cushion=new THREE.MeshStandardMaterial({color:0x476d65,roughness:.94});
 const bottom=new THREE.Mesh(new THREE.BoxGeometry(.87,.16,.72),cushion);bottom.position.y=.65;gr.add(bottom);
 const back=new THREE.Mesh(new THREE.BoxGeometry(.85,.9,.15),mat);back.position.set(0,1.06,-.31);gr.add(back);
 for(const dx of [-.3,.3]){const leg=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,.58,9),m.wood2);leg.position.set(dx,.32,0);gr.add(leg);}
 }
 seat(-2.85,-.15,-Math.PI/2);seat(2.85,.7,Math.PI/2);seat(.4,2.35,0);
 // Product displayed on conference table from GLB. Fallback uses mesh if local asset fails.
 const productSpot=new THREE.Group();productSpot.position.set(.15,1.46,.15);productSpot.rotation.y=.12;scene.add(productSpot);
 new GLTFLoader().load('assets/toba_coffee.glb',glb=>{const p=glb.scene;p.scale.setScalar(.31);p.position.y=.30;productSpot.add(p);},undefined,()=>{const fallback=new THREE.Mesh(new THREE.BoxGeometry(.55,.8,.22),m.dark);fallback.position.y=.38;productSpot.add(fallback);});
 // Leaf-shaped presentation props + laptop.
 const notebook=box(.88,.04,.58,-1.1,1.32,-.25,m.screen);notebook.rotation.y=.25;
 const screen=box(.88,.60,.03,-1.1,1.60,-.55,m.screen);screen.rotation.x=-.14;screen.rotation.y=.25;
 const paper=box(.85,.012,.60,1.15,1.27,.4,m.white);paper.rotation.y=-.15;
 for(const x of [-.15,.6]){cyl(.19,.19,.07,x,1.28,-.4,m.white);cyl(.025,.025,.14,x,1.38,-.4,m.wood2);}
 // Ceiling pendants.
 for(const x of [-2.3,.05,2.4]){cyl(.018,.018,.36,x,4.32,.3,m.wood2);const lamp=new THREE.Mesh(new THREE.CylinderGeometry(.31,.56,.26,24),m.gold);lamp.position.set(x,4.02,.3);scene.add(lamp);const glow=new THREE.PointLight(0xffddb0,.54,3.2);glow.position.set(x,3.84,.3);scene.add(glow);}
 // Local fabric motif on a wall panel: geometric not a claim of traditional authenticity.
 const rug=box(2.3,.025,2.5,0,-.006,3.1,new THREE.MeshStandardMaterial({color:0x2d5957,roughness:1}));rug.receiveShadow=true;
 for(let i=0;i<7;i++){const x=-.92+i*.30; const line=box(.10,.03,2.23,x,.01,3.1,new THREE.MeshStandardMaterial({color:i%2===0?0xb59a6e:0x789d8a,roughness:1}));line.receiveShadow=true;}
 // Desk plant + foliage.
 cyl(.26,.2,.50,5.7,.28,-3.5,m.wood2);for(let i=0;i<11;i++){const a=i*2.4;const leaf=sphere(.23,5.7+Math.cos(a)*.30,.62+Math.sin(i*1.3)*.23,-3.5+Math.sin(a)*.33,new THREE.MeshStandardMaterial({color:i%2===0?0x467a5c:0x5f8c72,roughness:.95}));leaf.scale.set(.7,1.4,.8);}
 const vrButton=VRButton.createButton(renderer);vrButton.style.display='none';document.body.append(vrButton);
 const launchVR=()=>{
  if(!navigator.xr){document.getElementById('sceneStatus').textContent='VR headset/WebXR tidak tersedia; mode ruang 3D tetap aktif.';return;}
  navigator.xr.isSessionSupported('immersive-vr').then(ok=>{if(ok){vrButton.click();}else{document.getElementById('sceneStatus').textContent='Perangkat belum mendukung immersive VR. Gunakan 3D browser.';}}).catch(()=>{document.getElementById('sceneStatus').textContent='VR perlu HTTPS dan perangkat yang kompatibel.';});
 };
 function turn(dir){const o=camera.position.clone().sub(controls.target);o.applyAxisAngle(new THREE.Vector3(0,1,0),dir*.22);camera.position.copy(o.add(controls.target));controls.update();}
 function reset(){controls.reset();}
 renderer.xr.addEventListener('sessionstart',()=>controls.enabled=false);renderer.xr.addEventListener('sessionend',()=>controls.enabled=true);
 function resize(){const w=host.clientWidth,h=host.clientHeight;if(w<10||h<10)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);}
 window.addEventListener('resize',resize);new ResizeObserver(resize).observe(stage);
 renderer.setAnimationLoop(()=>{if(!renderer.xr.isPresenting){controls.update();}renderer.render(scene,camera);});
 resize();window.set3DLoaded?.(launchVR,turn,reset);
 }catch(err){console.warn('Online 3D modules unavailable; classroom practice remains functional.',err);window.set3DError?.();}
})();
