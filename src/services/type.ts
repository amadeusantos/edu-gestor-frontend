export interface PaginationSchema<T> {
    page: number;
    size: number;
    total_page: number;
    total_items: number;
    results: T[]
}