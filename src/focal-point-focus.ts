import { FocalPoints, styleAssign, CONTAINER_STYLES, IMAGE_STYLES, ABSOLUTE_STYLES } from './types/focal-point.types';

export class FocalPointFocus {
    img: HTMLImageElement;
    container: HTMLElement;

    constructor(img: HTMLImageElement, focal: FocalPoints) {
        this.img = img;
        this.container = img.parentElement as HTMLElement;
        this.setFocus(focal);
    }

    setFocus(focal: FocalPoints) {
        styleAssign(this.container.style, CONTAINER_STYLES);
        styleAssign(this.img.style, IMAGE_STYLES, ABSOLUTE_STYLES);

        if (this.img.complete && this.img.naturalWidth > 0) {
            this.processImage(focal);
        } else {
            this.waitOnImageToLoad(this.img).then(() => {
                this.processImage(focal);
            });
        }
    }

    private processImage(focal: FocalPoints): void {
        const { naturalWidth: imageW, naturalHeight: imageH } = this.img;
        const { width: containerW, height: containerH } = this.container.getBoundingClientRect();

        let hShift = '0';
        let vShift = '0';

        if (!(containerW > 0 && containerH > 0 && imageW > 0 && imageH > 0)) {
            return;
        }

        const wR = imageW / containerW;
        const hR = imageH / containerH;

        this.img.style.maxHeight = '';
        this.img.style.maxWidth = '';

        if (imageW > containerW && imageH > containerH) {
            this.img.style[wR > hR ? 'maxHeight' : 'maxWidth'] = '100%';
        }

        if (wR > hR) {
            hShift = `${this.calculateShift(hR, containerW, imageW, focal.x)}%`;
        } else if (wR < hR) {
            vShift = `${this.calculateShift(wR, containerH, imageH, focal.y, true)}%`;
        }

        this.img.style.top = vShift;
        this.img.style.left = hShift;
    }

    // calculate the new left/top percentage shift of an image
    private calculateShift(
        conToImageRatio: number,
        containerSize: number,
        imageSize: number,
        focusSize: number,
        toMinus?: boolean,
    ) {
        const containerCenter = Math.floor(containerSize / 2);
        const focusFactor = (focusSize + 1) / 2; // focal point of resize image in px
        const scaledImage = Math.floor(imageSize / conToImageRatio);
        let focus = Math.floor(focusFactor * scaledImage);
        if (toMinus) {
            focus = scaledImage - focus;
        }
        let focusOffset = focus - containerCenter; // calculate difference between focus point and center
        const remainder = scaledImage - focus; // reduce offset if necessary so image remains filled
        const containerRemainder = containerSize - containerCenter;
        if (remainder < containerRemainder) {
            focusOffset -= containerRemainder - remainder;
        }
        if (focusOffset < 0) {
            focusOffset = 0;
        }

        return (focusOffset * -100) / containerSize;
    }

    private waitOnImageToLoad(img: HTMLImageElement) {
        return new Promise((resolve) => (img.onload = resolve));
    }
}
