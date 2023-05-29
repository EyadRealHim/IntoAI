export default function loadImage(source) {
    const image = new Image();
    image.onload = () => {
        image.isLoaded = true;
    };
    image.isLoaded = false;
    image.src = typeof source == "string" ? source : source.href;
    return image;
}
