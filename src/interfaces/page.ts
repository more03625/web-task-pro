interface IPage {
    id: string,
    siteUrl: string,
    name: string,
    description: string,
    isActive: boolean,
    createdAt: number, // Unix Timestamp
    updatedAt: number, // Unix Timestamp
}

export {
    IPage
}