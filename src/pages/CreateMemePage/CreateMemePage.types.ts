export type Picture = {
  url: string;
  file: File;
};

export interface CreateMemeFormValues {
  picture: File;
  description: string;
  texts: {
    content: string;
    x: number;
    y: number;
  }[];
}
