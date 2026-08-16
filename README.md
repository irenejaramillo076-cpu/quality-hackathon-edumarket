# Quality Hackathon - EduMarket Panamá

Repositorio creado para la dinámica **Quality Hackathon - War Room**, Semana 5.

## Contexto

EduMarket Panamá es una plataforma ficticia para la venta de cursos en línea. La empresa se prepara para lanzar una campaña nacional en 72 horas con una inversión de USD 50,000, pero durante las pruebas finales se detectaron incidentes de calidad, seguridad, accesibilidad, UX y rendimiento.

## Estructura

```txt
quality-hackathon-edumarket/
├── frontend/              React + TypeScript + Vite
├── backend/               Node.js + Express + TypeScript
├── database/              seed.sql
├── docs/                  requisitos, mockups, historias, informe y backlog
├── tests/                 estrategia y evidencia de pruebas
├── docker-compose.yml
└── README.md
```

## Ramas recomendadas para la defensa

- `main`: versión inicial con defectos sembrados para la exploración.
- `war-room-fixes`: rama con cinco defectos críticos corregidos y pruebas automatizadas.

## Ejecución local

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3001/api

## Pruebas

```bash
npm test
npm run test:backend
npm run test:frontend
```

## Credenciales de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@edumarket.pa | Admin123* |
| Estudiante | estudiante@edumarket.pa | Estudiante123* |

## Entregables incluidos

- Informe técnico de defectos: `docs/war-room-informe-tecnico.md`
- Backlog priorizado: `docs/backlog-priorizado.md`
- Estrategia de pruebas: `tests/estrategia-pruebas.md`
- Guion de defensa ejecutiva: `docs/guion-presentacion-ejecutiva.md`
- Presentación ejecutiva: `docs/presentacion-ejecutiva.pptx`
- Requisitos, mockups e historias de usuario en PDF dentro de `docs/`

## Cinco correcciones priorizadas en la rama `war-room-fixes`

1. Cálculo incorrecto del descuento del 20 %.
2. Pérdida del carrito al actualizar la página.
3. SQL Injection en búsqueda de cursos.
4. XSS persistente en reseñas.
5. JWT sin expiración.

## Nota académica

Este proyecto es un entorno controlado con defectos intencionales para fines de aprendizaje en QA. No debe usarse como base de producción sin completar la remediación total del backlog.
