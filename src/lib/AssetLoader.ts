// Static asset manifest — all assets known at build time
export const Assets = {
  bgm: {
    main: "/assets/bgm/bgm.mp3",
  },
  sfx: {
    hover: "/assets/sfx/hover.mp3",
    select: "/assets/sfx/Select.mp3",
    back: "/assets/sfx/back.mp3",
  },
  img: {
    aboutMe: "/assets/img/AboutMe.jpg",
    funFact: "/assets/img/FunFact.jpg",
    hobby: "/assets/img/Hobby.jpg",
    jokerDrop: "/assets/img/JokerDrop.jpg",
    skill: "/assets/img/Skill.jpg",
  },
  vid: {
    intro: "/assets/vid/Intro.webm",
    transitionIn: "/assets/vid/In.webm",
    transitionOut: "/assets/vid/Out.webm",
  },
  font: {
    personaMain: "/assets/font/Persona5main.ttf",
    personaMenu: "/assets/font/Persona5MenuFontPrototype-Regular.ttf",
    expose: "/assets/font/Expose-Regular.otf",
  },
} as const;

export type AssetCategory = keyof typeof Assets;
