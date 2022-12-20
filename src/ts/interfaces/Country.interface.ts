export interface Country {
    name: TName;
    flags: TFlags;
};

type TName = {
    common: string;
}

type TFlags = {
    png: string;
    svg: string;
}