# 🌐 Correr el lab sin instalar nada

Guía para cuando no puedes garantizar que los 30 estudiantes tengan Docker
funcionando. Todas las opciones corren **en el navegador**.

> ⚠️ **Play with Docker ya no existe.** El clásico `labs.play-with-docker.com`
> cerró el **1 de marzo de 2026**. Si tienes material viejo que lo menciona,
> actualízalo. Las opciones de abajo son las vigentes.

---

## 📊 Comparación rápida

| Opción | IDE real | Docker | Gratis | Necesita cuenta | Mejor para |
|---|:---:|:---:|---|---|---|
| **GitHub Codespaces** | ✅ VS Code completo | ✅ | 60 h/mes reales · 180 core-h si es estudiante verificado | GitHub | **La opción principal** |
| **Google Cloud Shell** | ✅ Editor web | ✅ preinstalado | 50 h/semana | Google | Plan B · clase de nube |
| **Killercoda** | ⚠️ editor básico | ✅ | 60 min por sesión | GitHub/Google | Demo rápida sin repo |

**Mi recomendación:** Codespaces como vía principal, Cloud Shell como respaldo.
Anuncia **ambas** el primer día: siempre hay alguien a quien le falla una.

Para llegar al repo, los estudiantes pueden hacer **fork** o **Use this template**.
Ambas sirven con Codespaces — la comparación está [más abajo](#-fork-o-use-this-template).

---

## 🥇 Opción 1 — GitHub Codespaces (recomendada)

Un VS Code completo en el navegador, con Docker ya configurado. El archivo
[`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json) de este
repo hace todo el trabajo: define el entorno, instala Docker y abre el puerto 8080.

### Pasos para el estudiante

1. Entrar al repositorio en GitHub
2. Botón verde **`< > Code`** → pestaña **Codespaces** → **Create codespace on main**
3. Esperar 1–2 minutos (la primera vez construye el entorno)
4. En la terminal que aparece abajo:
   ```bash
   docker compose up --build
   ```
5. Salta un aviso **"Your application running on port 8080 is available"** →
   clic en **Open in Browser**

Listo. Están editando, construyendo y corriendo contenedores sin instalar nada.

### Lo que tienes que saber como docente

- **Cuota gratuita:** 120 core-horas/mes. En una máquina de 2 núcleos son
  **~60 horas reales** — de sobra para un semestre de labs.
- **Estudiantes verificados** ([GitHub Student Pack](https://education.github.com/pack))
  suben a **180 core-horas/mes** y más almacenamiento. Vale la pena que se
  registren la primera semana.
- ⚠️ **El almacenamiento se consume aunque el Codespace esté apagado.** Enséñales
  a borrarlo al terminar: github.com/codespaces → `...` → **Delete**.
- **Se suspende solo** a los 30 min de inactividad, así que un olvido no les
  vacía la cuota.

### El repositorio ya está listo

👉 **https://github.com/johanpina/CloudIntro**

Está publicado como **repository template**, así que cada estudiante hace clic en
**Use this template → Create a new repository** y trabaja en su propia copia,
sin permisos ni invitaciones de por medio.

**Enlace directo para compartir en clase:**

```
https://github.com/johanpina/CloudIntro/generate
```

---

## 🍴 ¿Fork o "Use this template"?

Las dos funcionan y en ambas el estudiante usa **su propia cuota** de Codespaces
(este es un repo personal, así que el consumo se factura a su cuenta, no a la tuya).
La diferencia está en otra parte:

| | Fork | Use this template |
|---|:---:|:---:|
| Codespaces con su propia cuota | ✅ | ✅ |
| Reciben tus correcciones al lab | ✅ botón **Sync fork** | ❌ copia sin vínculo |
| Ves quién hizo el lab | ✅ lista de forks | ❌ no hay rastro |
| Pueden entregarte por Pull Request | ✅ | ❌ |
| Puede ser privado | ❌ **nunca** | ✅ |
| Empezar de cero otra vez | ❌ 1 fork por cuenta | ✅ ilimitado |

### 👉 Para este lab: usa **fork**

Tres razones concretas:

1. **Lista de asistencia gratis.** En `.../CloudIntro/forks` ves quién lo hizo.
2. **Corriges una vez y les llega a todos.** Si arreglas un typo o mejoras el
   Dockerfile, ellos hacen clic en **Sync fork** y lo tienen. Con template
   tendrías que pedirles copiar cambios a mano.
3. **Entregas por Pull Request**, si quieres enseñarles ese flujo más adelante.

**Enlace directo:** `https://github.com/johanpina/CloudIntro/fork`

### ⚠️ Los dos gotchas del fork

- **El fork de un repo público es público, siempre.** GitHub no permite
  cambiarle la visibilidad porque comparte la red del repositorio original.
  Si el trabajo es **calificable** y no quieres que se copien, usa
  **Use this template** con visibilidad privada.
- **Solo se puede forkear una vez por cuenta.** Si un estudiante destroza su
  copia y quiere empezar limpio, primero tiene que **borrar el fork**
  (Settings → Delete this repository) y volver a forkear.

---

## 🥈 Opción 2 — Google Cloud Shell (plan B)

Terminal + editor web de Google, con **Docker ya preinstalado**. No hay que
configurar nada y **no pide tarjeta de crédito**: basta una cuenta de Google,
que en la práctica todos tienen.

Ventaja pedagógica extra: es literalmente una consola de nube, así que
encaja perfecto con el tema del curso y con el Lab 04 (desplegar en Cloud Run).

### Pasos

1. Abrir 👉 **https://shell.cloud.google.com**
2. Clonar el repo y entrar:
   ```bash
   git clone https://github.com/johanpina/CloudIntro.git && cd CloudIntro
   ```
3. Levantar el lab:
   ```bash
   docker compose up --build
   ```
4. Botón **Web Preview** (ícono 👁️ arriba a la derecha) → **Change port** → `8080`

### Enlace de un solo clic

Compárteles este link: clona el repo y abre el editor automáticamente.

```
https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/johanpina/CloudIntro.git&cloudshell_workspace=.
```

### Límites

- **50 horas por semana**, gratis.
- El directorio `$HOME` (5 GB) **sí persiste** entre sesiones; el resto del
  sistema de archivos **no**. Si guardan algo fuera de `~`, lo pierden.
- Se desconecta tras ~20 min de inactividad, pero reanuda rápido.

---

## 🔌 ¿80 u 8080? La confusión clásica

El contenedor de este lab **siempre escucha en el puerto 80** por dentro
(así está configurado Nginx). Lo que cambia según dónde lo corras es
**quién pregunta y qué puerto le importa**.

| Dónde | Qué configuras | Valor |
|---|---|---|
| Local / Codespaces | Mapeo `-p afuera:adentro` | `8080:80` |
| Cloud Shell → Web Preview | El puerto de **la máquina** | **8080** |
| **Cloud Run** | El puerto **del contenedor** | **80** |

### La regla mental

> Con `-p` mapeas **afuera : adentro**.
> En Cloud Run **no mapeas nada**: solo declaras el de **adentro**.

Por eso `8080:80` en local y `--port 80` en la nube apuntan al mismo puerto real.

### ⚠️ El error que van a encontrar en Cloud Run

Cloud Run envía el tráfico al puerto **8080 por defecto**. Como este contenedor
escucha en el 80, un despliegue sin la bandera falla así:

```
The user-provided container failed to start and listen on
the port defined by the PORT environment variable
```

La solución es una bandera:

```bash
gcloud run deploy cloudintro --source . --port 80 --allow-unauthenticated
```

### La versión "profesional" (para el Lab 04)

En producción no se fija el puerto a mano: se lee la variable de entorno
**`PORT`** que la plataforma inyecta. Es la convención de todos los PaaS
(Cloud Run, App Runner, Heroku, Render), y hace que la imagen funcione
en cualquier lado sin banderas.

Para este lab introductorio dejamos el 80 fijo a propósito: **el mapeo
`8080:80` se entiende mejor cuando los dos números son distintos.**

---

## 🥉 Opción 3 — Killercoda (para demos sueltas)

Un entorno Linux con Docker, listo en segundos, sin repositorio ni configuración.

👉 **https://killercoda.com/playgrounds** → elegir el playground de Ubuntu/Docker

- **Sesiones de 60 minutos** en el plan gratuito, luego se destruye todo.
- No hay IDE de verdad, solo un editor básico junto a la terminal.
- Sirve para *"prueben este comando ya mismo"*, **no** para el lab completo.

---

## 🧯 Plan de contingencia para el día de clase

1. **Manda el link del repo con 48 h de anticipación** y pide que abran el
   Codespace *antes* de la sesión. Así el primer build (lento) ya pasó.
2. **Ten el tuyo abierto y proyectado.** Si alguien se queda atascado, sigue
   la clase mirando tu pantalla y practica después.
3. **Regla de los 5 minutos:** si a alguien no le arranca el entorno en 5
   minutos, que se pase a Cloud Shell sin discutir. No detengas la clase por
   un problema de setup individual.
4. **Emparejamiento:** quien no logró entrar, trabaja con un compañero. Dos
   personas en un contenedor aprenden más que una peleando con la instalación.

---

## 📎 Fuentes

- [Cuotas de GitHub Codespaces](https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-codespaces/about-billing-for-github-codespaces)
- [Cuotas y límites de Cloud Shell](https://docs.cloud.google.com/shell/docs/quotas-limits)
- [Open in Cloud Shell](https://docs.cloud.google.com/shell/docs/open-in-cloud-shell)
- [Aviso de cierre de Play with Docker](https://labs.play-with-docker.com/)
- [Playgrounds de Killercoda](https://killercoda.com/playgrounds)
