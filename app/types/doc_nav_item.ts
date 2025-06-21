export interface DocNavItem {
    title: string;
    slug: string;                   // The relative slug for the link (e.g., 'tutorial/introduction')
    path: string;                   // The full file system path (internal use)
    type: 'file' | 'directory';
    children?: DocNavItem[];         // For nested directories
}