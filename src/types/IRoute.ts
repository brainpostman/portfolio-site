export interface IRoute {
    path: string;
    href: string;
    name: string;
    children: IRoute[];
}
