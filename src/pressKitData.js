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
    press: "entertainment@thelinestudio.com",
    social: [
      { label: "Steam", url: "https://store.steampowered.com/app/3174780/Deaths_Of_Peck" },
      { label: "Discord",     url: "https://discord.gg/buWpGrhQRh" },
      { label: "Instagram",   url: "https://www.instagram.com/deathsofpeck" },
      { label: "YouTube",     url: "https://www.youtube.com/THELINEanimation" },
      { label: "X", url: "https://x.com/thelinestudio" },
    
      
    ],
  },

  // Paths to ZIP archives for "Download All" buttons.
  // Replace the files at these paths when the real assets are ready.
  downloads: {
    videosZip: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/videos%2Fpress-kit-deaths-of-peck-videos.zip?alt=media&token=21a7b9b2-f0e5-40f0-a46a-58c088b8b6d9",
    screenshotsZip: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/screenshots%2Fpress-kit-deaths-of-peck-screenshots.zip?alt=media&token=52594365-735b-4243-a9f0-395f7099e32c",
    promoArtZip: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/promo%2Fpress-kit-deaths-of-peck-promo-art.zip?alt=media&token=bdd1b8a3-8bed-499d-9483-a8dda5ee5766",
  },

  // Each video needs: title, vimeoId, downloadUrl (optional), sizeMB (optional).
  videos: VIMEO_ID
    ? [
        {
          title: "Launch Trailer",
          vimeoId: "1208073003",
          // Each entry: { label, quality, sizeMB (optional), url }
          // Replace placeholder URLs with real paths on Firebase Storage / your CDN.
          // To use Vimeo-hosted files, replace urls with those returned by a server
          // function calling GET https://api.vimeo.com/videos/{id}?fields=download
          downloads: [
            { label: "Original", quality: "1920 × 1080", sizeMB: null, url: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/videos%2FDeaths%20Of%20Peck%20Launch%20Trailer.mp4?alt=media&token=c7f5aa60-db4f-499c-a0b5-b220be7ff1e6" }, 
            // { label: "1080p",    quality: "1920 × 1080", sizeMB: null, url: "/downloads/teaser-trailer-1080p.mp4"   },
            // { label: "720p",     quality: "1280 × 720",  sizeMB: null, url: "/downloads/teaser-trailer-720p.mp4"    },
            // { label: "540p",     quality: "960 × 540",   sizeMB: null, url: "/downloads/teaser-trailer-540p.mp4"    },
            // { label: "360p",     quality: "640 × 360",   sizeMB: null, url: "/downloads/teaser-trailer-360p.mp4"    },
          ],
        },
        {
          title: "Launch Trailer (Portrait)",
          vimeoId: "1208072988",
          // Each entry: { label, quality, sizeMB (optional), url }
          // Replace placeholder URLs with real paths on Firebase Storage / your CDN.
          // To use Vimeo-hosted files, replace urls with those returned by a server
          // function calling GET https://api.vimeo.com/videos/{id}?fields=download
          downloads: [
            { label: "Original", quality: "1080 × 1920", sizeMB: null, url: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/videos%2FDeaths%20Of%20Peck%20Launch%20Trailer%20Vertical.mp4?alt=media&token=e5dc11fe-668f-4d25-a720-bcc821e8f00e" },
            // { label: "1080p",    quality: "1920 × 1080", sizeMB: null, url: "/downloads/teaser-trailer-1080p.mp4"   },
            // { label: "720p",     quality: "1280 × 720",  sizeMB: null, url: "/downloads/teaser-trailer-720p.mp4"    },
            // { label: "540p",     quality: "960 × 540",   sizeMB: null, url: "/downloads/teaser-trailer-540p.mp4"    },
            // { label: "360p",     quality: "640 × 360",   sizeMB: null, url: "/downloads/teaser-trailer-360p.mp4"    },
          ],
        },
        //         {
        //   title: "Playthrough",
        //   vimeoId: "1208073023",
        //   // Each entry: { label, quality, sizeMB (optional), url }
        //   // Replace placeholder URLs with real paths on Firebase Storage / your CDN.
        //   // To use Vimeo-hosted files, replace urls with those returned by a server
        //   // function calling GET https://api.vimeo.com/videos/{id}?fields=download
        //   downloads: [
        //     { label: "Original", quality: "1920 × 1080", sizeMB: null, url: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/videos%2FDeaths_Of_Peck_Prototype_Playthrough.mp4?alt=media&token=bd1e02c7-143a-43e4-bb64-b5bd676bc409" },
        //     // { label: "1080p",    quality: "1920 × 1080", sizeMB: null, url: "/downloads/teaser-trailer-1080p.mp4"   },
        //     // { label: "720p",     quality: "1280 × 720",  sizeMB: null, url: "/downloads/teaser-trailer-720p.mp4"    },
        //     // { label: "540p",     quality: "960 × 540",   sizeMB: null, url: "/downloads/teaser-trailer-540p.mp4"    },
        //     // { label: "360p",     quality: "640 × 360",   sizeMB: null, url: "/downloads/teaser-trailer-360p.mp4"    },
        //   ],
        // },
      ]
    : [],

    promoArt: [
    {
      title: "Hero Peck",
      imageName: "DOP_peck_hero_alpha",
      downloadUrl: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/promo%2Fdeaths_of_peck_peck_hero_alpha.png?alt=media",
    },
            {
      title: "Peck Death",
      imageName: "DOP_peck_death_alpha",
      downloadUrl: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/promo%2Fdeaths_of_peck_peck_death_alpha.png?alt=media",
    },
    {
      title: "Text Logo",
      imageName: "DOP_Logo",
      downloadUrl: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/promo%2Fdeaths_of_peck_logo_alpha.png?alt=media",
    },
    {
      title: "Banner Logo",
      imageName: "DOP_logo_main",
      downloadUrl: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/promo%2Fdeaths_of_peck_logo_main.png?alt=media",
    },
    {
      title: "Header Logo",
      imageName: "DOP_header",
      downloadUrl: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/promo%2Fdeaths_of_peck_header.png?alt=media",
    },
        {
      title: "Peck Deaths Banner",
      imageName: "DOP_deaths_composition",
      downloadUrl: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/promo%2Fdeaths_of_peck_deaths_composition.png?alt=media",
    },



  ],

  // Each screenshot needs: title, imageName (filename without extension/size suffix),
  // downloadUrl (direct link to full-res file), sizeMB (optional label).
  // imageName must match a file set in public/images/ e.g. "WEB_BG" → WEB_BG-1920.avif
  screenshots: [
    {
      title: "Screenshot 01",
      imageName: "screenshot_01",
      downloadUrl: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/screenshots%2Fdeaths_of_peck_screenshot_01.png?alt=media",
    },
    {
      title: "Screenshot 02",
      imageName: "screenshot_02",
      downloadUrl: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/screenshots%2Fdeaths_of_peck_screenshot_02.png?alt=media",
    },
    {
      title: "Screenshot 03",
      imageName: "screenshot_03",
      downloadUrl: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/screenshots%2Fdeaths_of_peck_screenshot_03.png?alt=media",
    },
    {
      title: "Screenshot 04",
      imageName: "screenshot_04",
      downloadUrl: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/screenshots%2Fdeaths_of_peck_screenshot_04.png?alt=media",
    },
    {
      title: "Screenshot 05",
      imageName: "screenshot_05",
      downloadUrl: "https://firebasestorage.googleapis.com/v0/b/tls-bicho-peck-launch.firebasestorage.app/o/screenshots%2Fdeaths_of_peck_screenshot_05.png?alt=media",
    },
  ],
};

