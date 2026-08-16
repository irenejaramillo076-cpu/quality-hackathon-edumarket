# Evidencia RED → GREEN

Esta rama `war-room-red-tests` contiene las cinco pruebas automatizadas críticas antes de aplicar las correcciones.

## Resultado esperado

Al ejecutar `npm test` deben fallar exactamente las pruebas que exponen los cinco riesgos priorizados:

1. FUN-01: MEDUCA20 no aplica el 20 % aprobado.
2. FUN-02: el carrito no se conserva en almacenamiento local.
3. SEC-01: un payload de SQL Injection obtiene resultados indebidos.
4. SEC-02: una reseña con script se almacena sin escapar.
5. SEC-03: el JWT se crea sin claim de expiración.

Después se cambia a `war-room-fixes` y se ejecuta `npm test` nuevamente; esas mismas expectativas pasan porque el código fue corregido.

```bash
git checkout war-room-red-tests
npm install
npm test

git checkout war-room-fixes
npm test
```

La rama roja es deliberadamente inestable y existe solo como evidencia académica del ciclo de pruebas.
