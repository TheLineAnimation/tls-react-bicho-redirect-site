// Press kit data — update this file to change all press kit content.
// Add new screenshots by appending objects to the screenshots array.
// Add new videos by appending objects to the videos array.

const VIMEO_ID = import.meta.env.VITE_VIMEO_ID || "";

export const pressKitData = {
  meta: {
    title: "Deaths of Peck",
    description:
      "Deaths of Peck is a fast-paced 2D platformer where the only way to WIN is to DIE!",
    subtitle:  "Play as Peck, a tiny goblin cursed with immortality. Orcs took your friends. No matter how many deaths it takes to save them, you always bounce back stronger - in this charmingly gory, hand-drawn adventure.", 
    },


  contact: {
    press: "press@deathsofpeck.com",
    business: "hello@deathsofpeck.com",
    social: [
      { label: "Twitter / X", url: "https://x.com/" },
      { label: "Instagram",   url: "https://www.instagram.com/deathsofpeck/" },
      { label: "YouTube",     url: "https://www.youtube.com/watch?v=1oxWiBAhT0U/" },
      { label: "Discord",     url: "https://discord.gg/buWpGrhQRh/" },
    ],
  },

  // Paths to ZIP archives for "Download All" buttons.
  // Replace the files at these paths when the real assets are ready.
  downloads: {
    videosZip: "/downloads/press-kit-deaths-of-peck-videos.zip",
    imagesZip: "/downloads/press-kit-deaths-of-peck-images.zip",
  },

  // Each video needs: title, vimeoId, downloadUrl (optional), sizeMB (optional).
  videos: VIMEO_ID
    ? [
        {
          title: "Deaths of Peck — Teaser Trailer",
          vimeoId: VIMEO_ID,
          // Each entry: { label, quality, sizeMB (optional), url }
          // Replace placeholder URLs with real paths on Firebase Storage / your CDN.
          // To use Vimeo-hosted files, replace urls with those returned by a server
          // function calling GET https://api.vimeo.com/videos/{id}?fields=download
          downloads: [
            { label: "Original", quality: "1920 × 1080", sizeMB: null, url: "/downloads/teaser-trailer-original.mp4" },
            { label: "1080p",    quality: "1920 × 1080", sizeMB: null, url: "/downloads/teaser-trailer-1080p.mp4"   },
            { label: "720p",     quality: "1280 × 720",  sizeMB: null, url: "/downloads/teaser-trailer-720p.mp4"    },
            { label: "540p",     quality: "960 × 540",   sizeMB: null, url: "/downloads/teaser-trailer-540p.mp4"    },
            { label: "360p",     quality: "640 × 360",   sizeMB: null, url: "/downloads/teaser-trailer-360p.mp4"    },
          ],
        },
      ]
    : [],

  // Each screenshot needs: title, imageName (filename without extension/size suffix),
  // downloadUrl (direct link to full-res file), sizeMB (optional label).
  // imageName must match a file set in public/images/ e.g. "WEB_BG" → WEB_BG-1920.avif
  screenshots: [
    {
      title: "Key Art",
      imageName: "WEB_BG",
      downloadUrl: "/images/WEB_BG-1920.avif",
    },
    {
      title: "Character — Peck",
      imageName: "WEB_Peck",
      downloadUrl: "/images/WEB_Peck-1920.avif",
    },
    {
      title: "Logo",
      imageName: "WEB_logo",
      downloadUrl: "/images/WEB_logo-1920.avif",
    },
    {
      title: "Header Capsule",
      imageName: "Header_Capsule",
      downloadUrl: "/images/Header_Capsule-1920.avif",
    },
    {
      title: "Environment 01",
      imageName: "PX01_LAYER",
      downloadUrl: "/images/PX01_LAYER-1920.avif",
    },
    {
      title: "Environment 02",
      imageName: "PX02_LAYER",
      downloadUrl: "/images/PX02_LAYER-1920.avif",
    },
    {
      title: "Environment 03",
      imageName: "PX03_LAYER",
      downloadUrl: "/images/PX03_LAYER-1920.avif",
    },
    {
      title: "Environment 04",
      imageName: "PX04_LAYER",
      downloadUrl: "/images/PX04_LAYER-1920.avif",
    },
    {
      title: "Environment 05",
      imageName: "PX05_LAYER",
      downloadUrl: "/images/PX05_LAYER-1920.avif",
    },
  ],
};
