import { UrlSegment } from '@angular/router';

export function createURLSegment (path: string, label: string): UrlSegment {
    return new UrlSegment(path, { name: label});
}
