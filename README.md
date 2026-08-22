# Lab 01 · Tu primera app en un contenedor

**Fundamentos de Cloud Computing**
Duración estimada: 45–60 min

[![Abrir en GitHub Codespaces](https://img.shields.io/badge/Abrir_en-Codespaces-24292e?logo=github)](https://codespaces.new/johanpina/CloudIntro?quickstart=1)
[![Abrir en Cloud Shell](https://img.shields.io/badge/Abrir_en-Google_Cloud_Shell-4285F4?logo=googlecloud&logoColor=white)](https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/johanpina/CloudIntro.git&cloudshell_workspace=.)

> 👆 **¿No tienes Docker instalado?** Haz clic en cualquiera de los dos botones
> y trabaja desde el navegador, sin instalar absolutamente nada.

---

## 🎯 Objetivo

Publicar una landing page usando un contenedor Docker, y entender **por qué**
eso es la base de todo lo que veremos después en la nube.

Al terminar vas a poder responder:
- ¿Qué diferencia hay entre una **imagen** y un **contenedor**?
- ¿Por qué "en mi máquina sí funciona" deja de ser un problema?
- ¿Qué significa realmente `-p 8080:80`?

---

## 📁 Qué hay en este proyecto

```
CloudIntro/
├── app/                  ← tu sitio web Y la teoría de la clase
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── nginx/
│   └── default.conf      ← configuración del servidor web
├── Dockerfile            ← LA RECETA para construir la imagen
├── .dockerignore         ← qué NO empaquetar
├── docker-compose.yml    ← cómo ejecutar el contenedor
├── .devcontainer/        ← entorno en la nube (Codespaces), sin instalar nada
├── ENTORNOS_ONLINE.md    ← correr el lab desde el navegador
└── README.md             ← estás aquí
```

---

## 💻 Antes de empezar: ¿tienes Docker instalado?

**Sí** → sigue a la Parte 1.

**No, o no estoy seguro** → no pierdas tiempo instalando. Abre este repo en
**GitHub Codespaces**: es VS Code en el navegador con Docker ya listo.

> Botón verde **`< > Code`** → pestaña **Codespaces** → **Create codespace on main**

Todas las alternativas en la nube (Codespaces, Google Cloud Shell, Killercoda),
con sus límites gratuitos y pasos exactos, están en
👉 **[ENTORNOS_ONLINE.md](ENTORNOS_ONLINE.md)**

---

## 🚀 Parte 1 — Levantar todo (la vía rápida)

```bash
docker compose up --build
```

Abre 👉 **http://localhost:8080**

> 📖 **Léela completa antes de seguir.** La página no es un "Hello World":
> contiene toda la teoría del lab —qué es Docker, contenedor vs máquina virtual,
> los 6 conceptos clave, el ciclo de vida y la tabla de comandos—.
> Los comandos de esa página se copian con un clic.

Para apagarlo: `Ctrl+C` y luego:

```bash
docker compose down
```

> ✅ **Checkpoint:** si ves la página con el reloj corriendo, tu app ya está
> contenerizada. Ese mismo contenedor corre idéntico en Windows, Linux, Mac
> o en un servidor de AWS.

---

## 🔍 Parte 2 — Lo mismo, pero a mano (aquí se aprende)

> Todos los comandos de esta sección están explicados en la sección
> **"Comandos básicos"** de la página. Tenla abierta al lado de la terminal.

Compose esconde dos comandos. Vamos a hacerlos uno por uno.

### Paso 1 — Construir la imagen

```bash
docker build -t cloudintro-landing:1.0 .
```

- `-t` le pone **nombre:versión** a la imagen
- el `.` final es el *build context*: la carpeta que Docker le manda al motor

Verifica que exista:

```bash
docker images | grep cloudintro
```

### Paso 2 — Correr el contenedor

```bash
docker run -d --name mi-landing -p 8080:80 cloudintro-landing:1.0
```

| Flag | Qué hace |
|---|---|
| `-d` | *detached*: corre en segundo plano |
| `--name` | nombre para no pelear con IDs random |
| `-p 8080:80` | **puerto de tu máquina : puerto del contenedor** |

### Paso 3 — Comprobar que vive

```bash
docker ps                        # ¿está corriendo?
docker logs mi-landing           # ¿qué está diciendo?
curl http://localhost:8080/health   # el endpoint de salud
```

### Paso 4 — Entrar al contenedor

```bash
docker exec -it mi-landing sh
```

Ya estás **dentro**. Prueba:

```sh
ls /usr/share/nginx/html    # ahí están tus archivos
cat /etc/os-release         # Alpine Linux, no tu macOS
exit
```

> 💡 **La idea clave:** ese contenedor es un Linux mínimo con tu app adentro.
> Tu computador solo le prestó el CPU.

### Paso 5 — Limpiar

```bash
docker stop mi-landing
docker rm mi-landing
```

---

## 🧪 Parte 3 — Experimentos (haz al menos 3)

**1. Cambia el puerto**
Corre con `-p 3000:80` y entra a `localhost:3000`.
👉 *¿Cambió algo dentro del contenedor?* No. Solo el puente.

**2. Dos contenedores a la vez**
```bash
docker run -d --name copia-1 -p 8081:80 cloudintro-landing:1.0
docker run -d --name copia-2 -p 8082:80 cloudintro-landing:1.0
```
👉 Misma imagen, dos instancias aisladas. **Así escala la nube.**

**3. Edita la página**
Cambia el `<h1>` en `app/index.html`, recarga el navegador.
👉 *No cambió nada.* La imagen ya está construida y es **inmutable**.
Tienes que reconstruir: `docker compose up --build`

**4. Rompe el contenedor a propósito**
```bash
docker exec -it mi-landing sh -c "rm /usr/share/nginx/html/index.html"
```
Recarga → error 404. Ahora:
```bash
docker restart mi-landing
```
👉 Vuelve intacto. **Los contenedores son desechables**, el estado está en la imagen.

**5. Mira el peso**
```bash
docker images cloudintro-landing:1.0
```
👉 ~75 MB **con servidor web incluido**. Una VM equivalente pesaría 1–2 GB
 y tardaría minutos en arrancar, no milisegundos.

---

## 🧠 Preguntas para responder

1. Si borro el contenedor, ¿pierdo la página? ¿Por qué?
2. ¿Por qué el Dockerfile copia los archivos en vez de "apuntar" a ellos?
3. ¿Qué pasaría si mando esta imagen a un compañero con Windows?
4. ¿En qué modelo cae esto: IaaS, PaaS o SaaS? ¿Y si lo despliego en Cloud Run?
5. ¿Para qué sirve el `/health`? ¿Quién lo consulta en producción?

---

## ☁️ Puente a la siguiente clase

La imagen que acabas de construir es **exactamente** la que se sube a la nube.
El flujo real solo agrega dos pasos:

```
docker build  →  docker push (a un registry)  →  desplegar
   ✅ ya lo hiciste        siguiente clase           siguiente clase
```

Destinos típicos para esta misma imagen, sin cambiar una línea:
**Google Cloud Run · AWS App Runner · Azure Container Apps · Render · Fly.io**

---

## 🆘 Si algo falla

| Error | Causa probable | Solución |
|---|---|---|
| `Cannot connect to the Docker daemon` | Docker Desktop apagado | Ábrelo y espera a que el ícono deje de animarse |
| `port is already allocated` | Algo usa el 8080 | Usa otro: `-p 8090:80` |
| La página no carga | Contenedor caído | `docker ps -a` y `docker logs <nombre>` |
| Los cambios no se ven | La imagen es vieja | `docker compose up --build` |
| `permission denied` (Linux) | Falta el grupo docker | `sudo usermod -aG docker $USER` y reinicia sesión |
| No logro instalar Docker | Entorno local complicado | Usa [Codespaces](ENTORNOS_ONLINE.md) — no instalas nada |

Comando de emergencia (borra TODOS los contenedores detenidos):
```bash
docker system prune
```
