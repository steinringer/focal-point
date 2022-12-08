export const CONTAINER_STYLES = {
    position: 'relative',
    overflow: 'hidden',
};

export const ABSOLUTE_STYLES = {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
};

export const IMAGE_STYLES = {
    minHeight: '100%',
    minWidth: '100%',
};

export interface FocalPoints {
    x: number;
    y: number;
}

export function styleAssign(target: any, ...sources: any[]) {
    sources.forEach((source) => Object.keys(source).forEach((key) => (target[key] = source[key])));
    return target;
}
