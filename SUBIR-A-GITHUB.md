# Cómo subir este proyecto a GitHub

Como la herramienta conectada no permite crear repositorios nuevos desde cero, primero crea un repositorio vacío en GitHub con este nombre sugerido:

`quality-hackathon-edumarket`

No marques README, .gitignore ni licencia, porque este proyecto ya los incluye.

## Subir ramas desde PowerShell

```powershell
cd ruta\donde\extrajiste\quality-hackathon-edumarket
git remote add origin https://github.com/irenejaramillo076-cpu/quality-hackathon-edumarket.git
git push -u origin main
git push -u origin war-room-fixes
```

## Crear Pull Request

Después de subir las ramas, abre un Pull Request:

- Base: `main`
- Compare: `war-room-fixes`
- Título: `fix: estabilizar defectos críticos del Quality Hackathon`

## Comandos para defensa

```bash
git checkout main
npm install
npm test

git checkout war-room-fixes
npm test
git diff main..war-room-fixes
```

En `main` la versión representa el sistema defectuoso inicial. En `war-room-fixes` están las cinco correcciones priorizadas con pruebas automatizadas.
