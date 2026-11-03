# REP · Tu progreso, a tu ritmo

Diario de entrenamiento mobile-first en español, hecho con HTML, CSS y JavaScript sin framework ni dependencias JavaScript.

## Funciones

- Rutinas editables por día y ejercicio.
- Registro de series, repeticiones y peso; borrador recuperable al recargar.
- Historial, gráficas por ejercicio y marcas por número de repeticiones.
- Conversión kg/lb; ejercicios asistidos sin falsos récords de carga.
- Celebración breve solo al superar una marca anterior comparable; respeta movimiento reducido.
- Exportación e importación JSON, con validación y confirmación antes de reemplazar.

## Ejecutar

Sirve `dist/` con un servidor estático. Por ejemplo, desde la raíz:

```sh
python3 -m http.server 8000 --directory dist
```

Abre `http://localhost:8000`. No hay compilación ni instalación npm.

## Comprobar

Con Node.js:

```sh
node --check dist/app.js
node --check dist/core.js
node test-core.cjs
```

Pruebas de lógica: primera marca, récord comparable, empate, carga inferior, aislamiento por ejercicio/repeticiones, asistencia, unidades y validación de copias.

## Privacidad y límites

Las rutinas y sesiones se guardan solo en `localStorage` del navegador y origen actual. No se sincronizan con GitHub ni con un servidor. Al borrar datos del navegador, cambiar de dispositivo u origen se puede perder el acceso a ellos. Usa las copias JSON y guárdalas de forma privada. No subas esas copias a este repositorio.

Las fuentes DM Sans y Manrope se solicitan a Google Fonts; hay fuentes del sistema de respaldo. No hay analítica ni bibliotecas JavaScript externas. REP es un diario, no asesoramiento médico o un plan de entrenamiento.

## Diseño

Diseño original con referencias funcionales de [Hevy](https://www.hevyapp.com/features/gym-performance/) y [Strong](https://help.strongapp.io/article/229-my-first-workout). Sin afiliación.

Esta copia de código no incluye datos de entrenamiento, secretos ni configuración privada de hosting. GitHub Pages no está habilitado.
