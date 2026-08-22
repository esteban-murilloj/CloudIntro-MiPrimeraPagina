# ─────────────────────────────────────────────────────────────
#  Dockerfile = la RECETA para construir la imagen.
#  Cada instrucción crea una "capa" que Docker cachea.
# ─────────────────────────────────────────────────────────────

# 1) FROM: imagen base. Partimos de Nginx (servidor web) sobre
#    Alpine Linux (~8 MB). No instalamos un SO completo: heredamos uno.
FROM nginx:1.27-alpine

# 2) LABEL: metadatos. Puramente informativo, útil en registries.
LABEL org.opencontainers.image.title="CloudIntro Landing"
LABEL org.opencontainers.image.description="Lab 01 - Fundamentos de Cloud Computing"

# 3) COPY: metemos NUESTROS archivos dentro de la imagen.
#    A partir de aquí, la página vive dentro del contenedor.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY app/ /usr/share/nginx/html/

# 4) EXPOSE: documenta que el contenedor escucha en el puerto 80.
#    OJO: no publica nada por sí solo. Eso lo hace -p / ports:
EXPOSE 80

# 5) HEALTHCHECK: cómo sabe Docker si el contenedor está sano.
#    En la nube, este chequeo decide si te mandan tráfico o te reinician.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health || exit 1

# 6) CMD: el proceso principal. Si muere, el contenedor muere.
#    "daemon off" mantiene Nginx en primer plano (regla de oro en contenedores).
CMD ["nginx", "-g", "daemon off;"]
