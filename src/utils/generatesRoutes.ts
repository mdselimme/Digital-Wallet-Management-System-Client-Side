import type { ComponentType } from "react";


export interface ISideBarItem {
    title: string,
    items: {
        title: string,
        url: string,
        component: ComponentType
    }[];
}



export const generateRoutes = (sidebarItems: ISideBarItem[]) => {
    return sidebarItems.flatMap((section) =>
        section.items.map((route) => ({
            path: route.url,
            Component: route.component,
        }))
    );
};
