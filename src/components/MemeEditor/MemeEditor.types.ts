export interface MemeEditorFormValue {
  picture: File;
  texts: {
    content: string;
    x: number;
    y: number;
  }[];
}
