var APP_DATA = {
  scenes: [
    {
      id: "0-1920px-befreiungshalle_kelheim_panorama",
      name: "1920px-Befreiungshalle_Kelheim_Panorama",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
      ],
      faceSize: 480,
      initialViewParameters: {
        yaw: -0.29659664182829815,
        pitch: 0.3183189686742196,
        fov: 1.5568770204620477,
      },
      linkHotspots: [
        {
          yaw: -1.3535173858801102,
          pitch: 0.35974154482642895,
          rotation: 1.5707963267948966,
          target: "0-1920px-befreiungshalle_kelheim_panorama",
        },
        {
          yaw: 2.9001092005781377,
          pitch: 0.36530404828625507,
          rotation: 1.5707963267948966,
          target: "0-1920px-befreiungshalle_kelheim_panorama",
        },
      ],
      infoHotspots: [
        {
          pitch: 0.2757,
          yaw: 2.733,
          title: "ajmer",
          text: "This is a special point of interest in Ajmer.",
          customIconSrc: "img/ajmer.png",
          elevated: true,
        },
        {
          yaw: -0.2577,
          pitch: 0.2041,
          title: "lotus temple",
          text: "This is a special point of interest in Ajmer.",
          customIconSrc: "img/lotus.png",
          elevated: true,
        },
      ],
    },
  ],
  name: "manish",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: true,
    fullscreenButton: true,
    viewControlButtons: true,
  },
};
