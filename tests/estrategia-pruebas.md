# Estrategia de pruebas - Quality Hackathon

## Objetivo

Validar que EduMarket Panamá sea suficientemente estable para una campaña nacional con inversión de USD 50,000, priorizando los riesgos que pueden afectar ingresos, seguridad, confianza institucional y experiencia del usuario.

## Tipos de prueba

| Tipo | Herramienta | Propósito |
|---|---|---|
| Unitarias | Vitest | Validar reglas de negocio como descuento y persistencia de carrito |
| Integración | Supertest + Vitest | Validar endpoints críticos de autenticación, búsqueda y reseñas |
| E2E | Playwright o Cypress | Validar flujo de compra desde catálogo hasta checkout |
| Seguridad | Revisión manual + pruebas API | SQL Injection, XSS y JWT |
| Accesibilidad | Axe DevTools + revisión manual | Contraste, navegación por teclado, etiquetas y ARIA |
| Performance | Lighthouse + DevTools | Carga de imágenes, bundle, lazy loading y consultas N+1 |

## Flujo de evidencia recomendado

1. Ejecutar pruebas en `main` para demostrar los defectos.
2. Cambiar a `war-room-fixes`.
3. Ejecutar pruebas nuevamente.
4. Capturar consola con pruebas pasando.
5. Mostrar diferencias del código con `git diff main..war-room-fixes`.
