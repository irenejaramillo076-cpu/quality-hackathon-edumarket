# Quality Hackathon - War Room

## Resumen

Este PR estabiliza cinco defectos críticos detectados durante el diagnóstico de EduMarket Panamá antes del lanzamiento de la campaña nacional.

## Defectos corregidos

- [x] FUN-01 - Descuento MEDUCA20 calculado incorrectamente.
- [x] FUN-02 - Carrito se pierde al actualizar la página.
- [x] SEC-01 - SQL Injection en búsqueda de cursos.
- [x] SEC-02 - XSS persistente en reseñas.
- [x] SEC-03 - JWT sin expiración.

## Pruebas agregadas

- [x] `frontend/src/domain/checkout.test.ts`
- [x] `frontend/src/domain/cartStorage.test.ts`
- [x] `backend/tests/search.test.ts`
- [x] `backend/tests/reviews.test.ts`
- [x] `backend/tests/auth.test.ts`

## Evidencia esperada

```bash
npm test
git diff main..war-room-fixes
```

## Riesgo reducido

Las correcciones reducen el riesgo de pérdida de ingresos, abandono de compra, ejecución de código malicioso, reutilización indefinida de tokens y exposición a consultas inseguras.
