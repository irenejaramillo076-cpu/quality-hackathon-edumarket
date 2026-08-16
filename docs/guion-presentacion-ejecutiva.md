# Guion de presentación ejecutiva - 10 minutos

## Minuto 0:00 - 1:00 | Contexto

Somos el equipo de Ingeniería de Calidad contratado para evaluar EduMarket Panamá antes de una campaña nacional de USD 50,000. El objetivo no fue reescribir el sistema, sino identificar los riesgos que podían afectar el lanzamiento en las próximas 72 horas.

## Minuto 1:00 - 2:30 | Diagnóstico

Encontramos 20 defectos distribuidos en seis categorías: tres funcionales, tres de seguridad, cuatro de performance, cinco de accesibilidad, tres de UX y dos de Design QA. Los más críticos están relacionados con SQL Injection, XSS persistente, JWT sin expiración, cálculo incorrecto de descuento y pérdida del carrito.

## Minuto 2:30 - 4:00 | Priorización

Aplicamos una matriz de impacto por esfuerzo. Priorizamos problemas de alto impacto y baja o media complejidad porque el tiempo disponible es limitado. Corregir estos cinco defectos reduce el riesgo de pérdida de ingresos, explotación de seguridad y abandono de compra.

## Minuto 4:00 - 7:00 | Demostración técnica

Primero mostramos que el cupón MEDUCA20 no descontaba correctamente y que el carrito se perdía al refrescar. Luego mostramos las pruebas automatizadas que protegen estas reglas. Después enseñamos los endpoints de seguridad y cómo la rama corregida neutraliza SQL Injection, XSS y agrega expiración al JWT.

## Minuto 7:00 - 8:30 | Resultado

La rama `war-room-fixes` contiene las cinco correcciones priorizadas y pruebas automatizadas. Esto no elimina todo el backlog, pero estabiliza el flujo más crítico del negocio: autenticación, catálogo, carrito, descuento y protección básica de la sesión.

## Minuto 8:30 - 10:00 | Cierre ejecutivo

Nuestra recomendación es lanzar solo si se integra la rama corregida, se ejecuta la suite completa de pruebas y se realiza una validación rápida con Lighthouse y Axe. Los defectos restantes deben pasar al sprint posterior con prioridad en accesibilidad, performance y UX.
