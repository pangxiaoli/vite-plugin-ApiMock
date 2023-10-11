export default function pathToRegex(path: string) {
    if (path === '') {
        return /^\/?$/;
    }
    return new RegExp('^' + path
        .split('/')
        .map(segment => {
            if (segment.startsWith(':')) {
                return '([^/]+)';
            } else if (segment === '*') {
                return '.*';
            } else {
                return segment;
            }
        })
        .join('/') + '$'
    );
}