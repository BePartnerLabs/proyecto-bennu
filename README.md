# Proyecto Bennu

Dossier técnico web del plan de recuperación del Litoral Central: confinamiento de escombros sísmicos y ganancia de 40 hectáreas de tierra firme en Cabo Blanco, Catia La Mar (La Guaira, Venezuela).

Propuesta de la Facultad de Ingeniería de la UCV, la Fundación UCV y la Agrupación Banco de Talentos, coordinada por el Ing. Jorge Yánez Caires.

## Stack

Sitio estático de una sola página (Vite + JS vanilla, sin framework) con soporte **PWA offline** vía `vite-plugin-pwa` — pensado para conexiones lentas o inestables: una vez visitado, el sitio carga completo sin red.

- `index.html` — contenido y estructura
- `src/style.css` — diseño (tema claro/oscuro automático)
- `src/main.js` — reveal-on-scroll, scrollspy del menú y registro del service worker
- `public/images/` — fotografías y diagramas (ver créditos abajo)

## Desarrollo

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción -> dist/
npm run preview   # sirve dist/ localmente
```

## Despliegue

Proyecto estático sin variables de entorno. En **Vercel** o **Cloudflare Pages**: framework "Vite", build command `npm run build`, output directory `dist`.

## Créditos de imágenes

- `hero-catia-la-mar.jpg`, `casa-colapsada-catia.jpg`, `edificio-derrumbado-catia.jpg` — © RatUnderground, [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:2026_earthquakes_in_Venezuela), CC BY-SA 4.0.
- `usar-rescate-venezuela.jpg` — U.S. Marines 24th MEU / Gunnery Sgt. Kevin Rivas, vía DVIDS. Dominio público.
- `diagrama-confinamiento.jpg`, `batimetria-comparativa.jpg` — material gráfico original del proyecto (presentación del Decanato de Ingeniería UCV).

## Contenido

El texto se basa en la propuesta técnica y la presentación oficial del proyecto (agosto 2026), suministradas por el coordinador.
