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

### Para que funcione, el repo debe estar en GitHub

```bash
git init
git add .
git commit -m "Lab 01: landing dockerizada"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/CloudIntro.git
git push -u origin main
```

Luego, en GitHub: **Settings → General → Template repository** ✅
Así cada estudiante hace **Use this template** y trabaja en su propia copia.

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
   git clone https://github.com/TU-USUARIO/CloudIntro.git && cd CloudIntro
   ```
3. Levantar el lab:
   ```bash
   docker compose up --build
   ```
4. Botón **Web Preview** (ícono 👁️ arriba a la derecha) → **Change port** → `8080`

### Enlace de un solo clic

Reemplaza `TU-USUARIO` y compárteles este link: clona el repo y abre el editor solo.

```
https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/TU-USUARIO/CloudIntro.git&cloudshell_workspace=.
```

### Límites

- **50 horas por semana**, gratis.
- El directorio `$HOME` (5 GB) **sí persiste** entre sesiones; el resto del
  sistema de archivos **no**. Si guardan algo fuera de `~`, lo pierden.
- Se desconecta tras ~20 min de inactividad, pero reanuda rápido.

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
