const pptxgen = require('pptxgenjs');
const { warnIfSlideHasOverlaps, warnIfSlideElementsOutOfBounds } = require('/home/oai/skills/slides/pptxgenjs_helpers/layout');
const pptx = new pptxgen();
pptx.defineLayout({ name: 'CUSTOM_WIDE', width: 13.333, height: 7.5 });
pptx.layout = 'CUSTOM_WIDE';
pptx.author = 'Quality Hackathon War Room';
pptx.title = 'Presentación ejecutiva - Quality Hackathon';
pptx.theme = { headFontFace: 'Arial', bodyFontFace: 'Arial', lang: 'es-PA' };
const teal='0F766E', orange='EA580C', green='15803D', dark='1F2937', gray='475569', light='F8FAFC';
function title(slide,t,sub){ slide.addText(t,{x:.65,y:.35,w:12,h:.45,fontSize:28,bold:true,color:teal,margin:0}); if(sub) slide.addText(sub,{x:.68,y:.92,w:11.8,h:.3,fontSize:12.5,color:gray,margin:0}); }
function footer(slide,n){ slide.addText(`Quality Hackathon War Room · EduMarket Panamá · ${n}`,{x:.65,y:7.07,w:12,h:.18,fontSize:8,color:'64748B',margin:0}); }
function check(slide){ warnIfSlideHasOverlaps(slide,pptx,{muteContainment:true,ignoreDecorativeShapes:true}); warnIfSlideElementsOutOfBounds(slide,pptx); }
function pill(slide,text,x,y,w,color){ slide.addText(text,{x,y,w,h:.38,fontSize:14,bold:true,color:'FFFFFF',align:'center',fill:{color},margin:.04}); }
function line(slide,text,x,y,w,size=16,color=dark,bold=false){ slide.addText(text,{x,y,w,h:.33,fontSize:size,color,bold,fit:'shrink',margin:0}); }
function bullet(slide,items,x,y,w){ items.forEach((it,i)=>line(slide,`• ${it}`,x,y+i*.48,w,16,dark,false)); }
let s=pptx.addSlide(); s.background={color:light};
s.addText('Quality Hackathon\nWar Room',{x:.85,y:1.1,w:5.8,h:1.25,fontSize:38,bold:true,color:teal,fit:'shrink'});
line(s,'EduMarket Panamá',.88,2.55,4.6,20,orange,true);
s.addText('Diagnóstico, priorización, corrección y defensa técnica antes del lanzamiento.',{x:.88,y:3.05,w:5.6,h:.72,fontSize:18,color:dark,fit:'shrink'});
line(s,'72 horas · USD 50,000 · 20 defectos · 5 correcciones críticas',.88,4.34,5.9,15,gray,false);
pill(s,'QA',8.1,1.3,3.8,teal); pill(s,'WAR ROOM',8.1,2.15,3.8,orange); pill(s,'Riesgo → Prueba → Fix → Evidencia',8.1,3.0,3.8,green);
footer(s,1); check(s);

s=pptx.addSlide(); title(s,'Diagnóstico general','20 defectos distribuidos por impacto en calidad y negocio.');
line(s,'Categoría',.9,1.55,2.7,17,teal,true); line(s,'Cantidad',4.0,1.55,1.6,17,teal,true); line(s,'Riesgo principal',6.0,1.55,5.8,17,teal,true);
const rows=[['Funcionales','3','Errores en compra, carrito y administración'],['Seguridad','3','SQL Injection, XSS y JWT sin expiración'],['Performance','4','Carga lenta, N+1, bundle excesivo'],['Accesibilidad','5','Contraste, teclado, labels y ARIA'],['UX / Usabilidad','3','Fricción y mensajes poco claros'],['Design QA','2','Espaciado y tipografía inconsistentes']];
rows.forEach((r,i)=>{const y=2.05+i*.57; line(s,r[0],.9,y,2.8,15,dark,true); line(s,r[1],4.15,y,1,15,orange,true); line(s,r[2],6.0,y,6,15,dark,false);});
s.addText('Conclusión: los defectos no tienen el mismo peso; se debe priorizar seguridad, ventas y continuidad del checkout.',{x:.9,y:6.1,w:11.4,h:.5,fontSize:17,bold:true,color:teal,fit:'shrink'});
footer(s,2); check(s);

s=pptx.addSlide(); title(s,'Priorización basada en riesgo','Matriz Impacto × Esfuerzo aplicada por restricción de 72 horas.');
line(s,'Top 5 antes del lanzamiento',.9,1.55,5,22,orange,true);
const top=[['1','SEC-01','SQL Injection en búsqueda','Alto','Medio'],['2','SEC-02','XSS persistente en reseñas','Alto','Medio'],['3','SEC-03','JWT sin expiración','Alto','Bajo'],['4','FUN-01','Descuento 20 % mal calculado','Alto','Bajo'],['5','FUN-02','Carrito se pierde al refrescar','Alto','Bajo']];
line(s,'#',.9,2.15,.4,14,teal,true); line(s,'ID',1.6,2.15,1.2,14,teal,true); line(s,'Defecto',3.0,2.15,5,14,teal,true); line(s,'Impacto',8.55,2.15,1.4,14,teal,true); line(s,'Esfuerzo',10.2,2.15,1.5,14,teal,true);
top.forEach((r,i)=>{const y=2.63+i*.55; line(s,r[0],.9,y,.4,15,orange,true); line(s,r[1],1.6,y,1.2,15,dark,true); line(s,r[2],3.0,y,5.4,15,dark,false); line(s,r[3],8.65,y,1.2,15,green,true); line(s,r[4],10.35,y,1.2,15,gray,false);});
line(s,'Criterio ejecutivo',.9,5.7,3,18,teal,true);
s.addText('Se corrigieron problemas con alto impacto y esfuerzo controlado para reducir riesgo de seguridad, pérdida de ingresos y abandono de compra.',{x:.9,y:6.12,w:11.3,h:.5,fontSize:17,color:dark,fit:'shrink'});
footer(s,3); check(s);

s=pptx.addSlide(); title(s,'Correcciones y pruebas automatizadas','Cada fix queda cubierto con prueba unitaria o de integración.');
const fixes=[['FUN-01','checkout.test.ts','Valida MEDUCA20 = 20 %'],['FUN-02','cartStorage.test.ts','Valida persistencia del carrito'],['SEC-01','search.test.ts','Neutraliza payload de inyección'],['SEC-02','reviews.test.ts','Sanitiza reseñas con script'],['SEC-03','auth.test.ts','Verifica claim exp en JWT']];
fixes.forEach((r,i)=>{const y=1.65+i*.72; pill(s,r[0],.9,y,1.25,i<2?orange:teal); line(s,r[1],2.45,y+.02,3.1,16,dark,true); line(s,r[2],5.95,y+.02,5.9,16,gray,false);});
s.addText('Resultado esperado: el test falla en la versión defectuosa, se implementa el fix y la suite pasa en `war-room-fixes`.',{x:.9,y:6.0,w:11.4,h:.55,fontSize:17,bold:true,color:green,fit:'shrink'});
footer(s,4); check(s);

s=pptx.addSlide(); title(s,'Evidencia para la defensa','Qué mostrar durante los cinco minutos de demostración.');
bullet(s,['Cupón MEDUCA20 antes/después','Carrito persistente tras refrescar','Payload SQL Injection neutralizado','Reseña XSS sanitizada','JWT con expiración','Consola con pruebas pasando'],.95,1.65,5.65);
line(s,'Herramientas sugeridas',7.1,1.7,4.5,22,teal,true);
bullet(s,['Chrome DevTools','Vitest + Supertest','Lighthouse','Axe DevTools','Git diff main..war-room-fixes'],7.1,2.35,4.9);
s.addText('La evidencia demuestra que el riesgo quedó protegido por pruebas repetibles, no solo corregido de forma manual.',{x:.95,y:6.05,w:11.35,h:.55,fontSize:17,bold:true,color:orange,fit:'shrink'});
footer(s,5); check(s);

s=pptx.addSlide(); title(s,'Recomendación ejecutiva','Decisión propuesta para el comité antes del lanzamiento.');
line(s,'Lanzar con condición',.95,1.55,4.3,30,green,true);
s.addText('Integrar `war-room-fixes`, ejecutar la suite completa y validar manualmente accesibilidad/performance antes de activar la campaña.',{x:.95,y:2.3,w:5.35,h:1.2,fontSize:20,color:dark,fit:'shrink'});
line(s,'Pendiente posterior',7.15,1.55,4.4,30,orange,true);
s.addText('Completar backlog restante: accesibilidad, performance, UX, Design QA y protección del panel administrativo.',{x:7.15,y:2.3,w:5.0,h:1.2,fontSize:20,color:dark,fit:'shrink'});
s.addText('No se reescribió el sistema; se estabilizó el flujo crítico con máxima reducción de riesgo en el tiempo disponible.',{x:1.2,y:5.35,w:10.9,h:.75,fontSize:23,bold:true,color:teal,align:'center',fit:'shrink'});
footer(s,6); check(s);

pptx.writeFile({ fileName: '/mnt/data/quality-hackathon-edumarket/docs/presentacion-ejecutiva.pptx' });
