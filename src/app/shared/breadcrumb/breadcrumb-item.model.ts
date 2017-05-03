export interface BreadcrumbItem {
    label: String;
    link: String;
    params?: any;
    isCurrent?: Boolean;
}

export const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
