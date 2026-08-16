# Quality Hackathon EduMarket en GitHub

Repositorio publicado en:

`https://github.com/irenejaramillo076-cpu/quality-hackathon-edumarket`

## Ramas

- `main`: versión inicial del sistema con los defectos intencionales para la fase de exploración.
- `war-room-fixes`: versión con cinco correcciones prioritarias y sus pruebas automatizadas.

## Clonar el repositorio

```powershell
git clone https://github.com/irenejaramillo076-cpu/quality-hackathon-edumarket.git
cd quality-hackathon-edumarket
```

## Comandos para la defensa

```bash
git checkout main
npm install
npm test

git checkout war-room-fixes
npm test

git diff main..war-room-fixes
```

## Pull Request

Para evidenciar el proceso del War Room, el Pull Request debe comparar:

- Base: `main`
- Compare: `war-room-fixes`
- Título sugerido: `fix: estabilizar defectos críticos del Quality Hackathon`

La rama `main` conserva el escenario inicial; la rama `war-room-fixes` permite demostrar la corrección y las pruebas asociadas a los riesgos priorizados.
