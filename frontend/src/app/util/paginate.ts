export function paginateArray<T>(arr: T[], pageSize: number): T[][] {
    const numPages = Math.ceil(arr.length / pageSize);
    const pageArray = new Array<T[]>(numPages);
    for (let i = 0; i < numPages; i++) {
        const start = i * pageSize;
        const end = start + pageSize;
        pageArray[i] = arr.slice(start, end);
    }
    return pageArray;
}
