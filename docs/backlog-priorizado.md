# Backlog priorizado - Impacto x Esfuerzo

| Prioridad | ID | Defecto | Impacto | Esfuerzo | Decisión |
|---:|---|---|---|---|---|
| 1 | SEC-01 | SQL Injection en búsqueda de cursos | Alto | Medio | Corregir antes del lanzamiento |
| 2 | SEC-02 | XSS persistente en reseñas | Alto | Medio | Corregir antes del lanzamiento |
| 3 | SEC-03 | JWT sin expiración | Alto | Bajo | Corregir antes del lanzamiento |
| 4 | FUN-01 | Descuento del 20 % calculado incorrectamente | Alto | Bajo | Corregir antes del lanzamiento |
| 5 | FUN-02 | Carrito se pierde al actualizar | Alto | Bajo | Corregir antes del lanzamiento |
| 6 | FUN-03 | Administrador puede eliminar su propia cuenta | Medio | Bajo | Programar hotfix posterior |
| 7 | PERF-02 | API con patrón N+1 | Medio | Medio | Optimizar después del go-live |
| 8 | ACC-03 | Curso agregado con div no navegable por teclado | Medio | Bajo | Corregir por accesibilidad |
| 9 | ACC-01 | Contraste insuficiente en banner | Medio | Bajo | Corregir por WCAG |
| 10 | UX-02 | Mensajes de error ambiguos | Medio | Bajo | Mejorar comunicación |
| 11 | PERF-01 | Imágenes sin compresión | Medio | Medio | Optimizar assets |
| 12 | PERF-03 | Bundle JavaScript excesivo | Medio | Medio | Dividir código |
| 13 | PERF-04 | Sin lazy loading | Medio | Medio | Carga diferida |
| 14 | ACC-02 | Imágenes sin texto alternativo | Medio | Bajo | Corregir accesibilidad |
| 15 | ACC-04 | Formularios sin etiquetas | Medio | Bajo | Corregir accesibilidad |
| 16 | ACC-05 | Falta de ARIA en panel de carrito | Bajo | Bajo | Corregir accesibilidad |
| 17 | UX-01 | Checkout con demasiados pasos | Medio | Alto | Rediseño posterior |
| 18 | UX-03 | Confirmación de compra poco visible | Medio | Bajo | Mejorar UX |
| 19 | DQA-01 | Espaciados inconsistentes | Bajo | Bajo | Ajustar diseño |
| 20 | DQA-02 | Tipografía inconsistente | Bajo | Bajo | Ajustar diseño |

## Justificación

La priorización se basó en riesgo de negocio, impacto en ingresos, exposición de seguridad, probabilidad de ocurrencia y esfuerzo de corrección. Los cinco defectos seleccionados afectan directamente la confianza del usuario, la seguridad de la plataforma y la conversión de compra durante una campaña pública de alto costo.
