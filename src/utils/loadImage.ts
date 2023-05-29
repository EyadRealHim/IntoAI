export interface Img extends HTMLImageElement {
  isLoaded: boolean;
}

export default function loadImage(source: string | URL): Img {
  const image = new Image() as Img;

  image.onload = () => {
    image.isLoaded = true;
  };

  image.isLoaded = false;
  image.src = typeof source == "string" ? source : source.href;

  return image;
}
