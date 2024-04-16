# { News } App

Hai, { News } App merupakan website berita yang terhubung dengan data dari RSS Media seperti CNN, CNBC, Tribun, OkeZone dll. dan juga website ini terhubung dengan Database sehingga pengguna dapat daftar dan masuk untuk mempublish, update, dan juga menghapus berita.

## Tech Stack

**Client:** Next.js 14, TailwindCSS, Shadcn UI, Acternity UI, Tanstack Query

**Server:** Drizzle ORM, Neon Database

## Todo

-   Add Feature auto save to local storage for Create News Page

-   Add Preview News for create News Page

-   Add CRUD Category

## Installation

Install news-app with npm

```bash
  git clone https://github.com/manikandareas/news-app.git
  cd news-app
  npm install
  npm run dev
```

Install news-app with bun

```bash
  git clone https://github.com/manikandareas/news-app.git
  cd news-app
  bun install
  bun dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DRIZZLE_DATABASE_URL`

`NEXT_PUBLIC_BASE_URL`

`NEXT_PUBLIC_TINYMCE_API_KEY`

`NEXT_PUBLIC_CLOUDINARY_API_KEY`

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_SECRET`

## Lessons Learned

Dari projek ini saya belajar beberapa hal baru seperti server action Next.js 14, integrasi dengan cloudinary, dan juga penggunaan library baru seperti tinymce editor.

## Screenshots

![News](https://res.cloudinary.com/dzfw66khj/image/upload/v1713282452/Screenshot_2024-04-16_at_23.44.38_oe5eju.png)
![News Api](https://res.cloudinary.com/dzfw66khj/image/upload/v1713282444/Screenshot_2024-04-16_at_23.44.21_kn6p7n.png)
![Editor Page](https://res.cloudinary.com/dzfw66khj/image/upload/v1713282448/Screenshot_2024-04-16_at_23.45.12_omxnnj.png)
![Create News Page](https://res.cloudinary.com/dzfw66khj/image/upload/v1713282445/Screenshot_2024-04-16_at_23.45.21_wxzgtt.png)
