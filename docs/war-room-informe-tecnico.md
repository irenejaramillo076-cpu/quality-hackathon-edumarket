# Informe técnico de defectos - Quality Hackathon War Room

## Resumen ejecutivo

El diagnóstico de EduMarket Panamá identificó 20 defectos distribuidos en funcionalidad, seguridad, performance, accesibilidad, UX y Design QA. Debido a que el lanzamiento está programado en 72 horas y la campaña tiene una inversión de USD 50,000, se priorizaron los defectos que podían afectar directamente ventas, confianza, disponibilidad operativa y exposición a ataques.

El equipo recomienda avanzar con el despliegue únicamente si se aplican las cinco correcciones críticas documentadas en la rama `war-room-fixes`, se ejecutan las pruebas automatizadas y se valida manualmente el flujo principal de catálogo, carrito y checkout.

## Hallazgos

| ID | Categoría | ISO/IEC 25010 | Severidad | Evidencia | Pasos para reproducir | Impacto de negocio |
|---|---|---|---|---|---|---|
| FUN-01 | Funcional | Adecuación funcional - exactitud | Alta | Cupón MEDUCA20 descuenta 10 % en lugar de 20 % | Agregar curso de USD 100, aplicar MEDUCA20, observar total USD 90 | Pérdida de confianza y reclamos por promoción engañosa |
| FUN-02 | Funcional | Fiabilidad - recuperabilidad | Alta | El carrito desaparece al refrescar | Agregar curso, presionar F5, revisar carrito vacío | Abandono de compra y pérdida de conversión |
| FUN-03 | Funcional | Seguridad funcional | Media | Admin puede eliminar su propia cuenta | DELETE /api/admin/users/1 con x-user-id=1 | Bloqueo administrativo durante campaña |
| SEC-01 | Seguridad | Seguridad - integridad | Crítica | Búsqueda acepta payload `' OR '1'='1` | GET /api/courses/search?q=' OR '1'='1 | Exposición y manipulación de datos por SQL Injection |
| SEC-02 | Seguridad | Seguridad - confidencialidad/integridad | Crítica | Reseñas guardan `<script>` sin sanitizar | POST reseña con script, cargar reseñas | Robo de sesión, reputación afectada y riesgo legal |
| SEC-03 | Seguridad | Seguridad - autenticidad | Alta | JWT no contiene `exp` | Iniciar sesión y decodificar token | Sesiones reutilizables indefinidamente |
| PERF-01 | Performance | Eficiencia de desempeño | Media | Banner usa imagen grande sin compresión | Revisar assets/Lighthouse | Mayor tiempo de carga y rebote |
| PERF-02 | Performance | Eficiencia de desempeño | Media | Endpoint de reportes simula N+1 | GET /api/courses/1/report | Lentitud bajo tráfico de campaña |
| PERF-03 | Performance | Eficiencia de desempeño | Media | Bundle sin separación de código | Revisar build de frontend | Carga inicial lenta |
| PERF-04 | Performance | Eficiencia de desempeño | Media | Sin lazy loading de módulos | Revisar rutas/componentes | Mayor consumo de red |
| ACC-01 | Accesibilidad | Usabilidad - accesibilidad | Media | Contraste bajo en hero | Revisar CSS `.hero` | Incumplimiento WCAG y exclusión de usuarios |
| ACC-02 | Accesibilidad | Usabilidad - accesibilidad | Media | Imágenes sin alt | Revisar etiquetas img | Lectores de pantalla no describen contenido |
| ACC-03 | Accesibilidad | Usabilidad - operabilidad | Media | Botón implementado con div | Tabular por catálogo | Usuarios con teclado no completan compra |
| ACC-04 | Accesibilidad | Usabilidad - accesibilidad | Media | Input de cupón sin label | Revisar panel carrito | Formularios poco comprensibles |
| ACC-05 | Accesibilidad | Usabilidad - accesibilidad | Baja | Panel carrito sin aria-label/role | Revisar aside | Navegación asistiva incompleta |
| UX-01 | UX | Usabilidad - capacidad de aprendizaje | Media | Checkout con fricción alta | Simular compra completa | Abandono por pasos innecesarios |
| UX-02 | UX | Usabilidad - protección ante errores | Media | Error de login dice solo “Error” | Login inválido | Frustración y tickets de soporte |
| UX-03 | UX | Usabilidad - satisfacción | Media | Confirmación poco visible | Finalizar compra | Usuario duda si pagó correctamente |
| DQA-01 | Design QA | Usabilidad - estética de interfaz | Baja | Grid usa gap 9px contra diseño de 24px | Revisar catálogo | Inconsistencia visual de marca |
| DQA-02 | Design QA | Usabilidad - estética de interfaz | Baja | Course card usa Georgia en vez de Arial | Revisar CSS | Pérdida de coherencia visual |

## Defectos corregidos antes del lanzamiento

Se corrigieron SEC-01, SEC-02, SEC-03, FUN-01 y FUN-02 porque tienen impacto directo en seguridad, ventas y continuidad del proceso de compra.

## Evidencia de pruebas automatizadas

En la rama `war-room-fixes` se agregaron pruebas unitarias e integración para validar que el descuento sea correcto, que el carrito persista, que la búsqueda rechace intentos de inyección, que las reseñas neutralicen scripts y que el JWT incluya expiración.

## Recomendación ejecutiva

El lanzamiento puede continuar solamente si la rama `war-room-fixes` se integra, si las pruebas automatizadas pasan y si se ejecuta una validación manual final con Chrome DevTools, Lighthouse y Axe DevTools. Los defectos restantes deben ingresar al sprint inmediato posterior al lanzamiento.
