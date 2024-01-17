declare module "dom-to-image" {
  interface DomToImageOptions {
    filter?: (node: Node) => boolean;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: { [key in string]: string };
    quality?: number;
    imagePlaceholder?: string;
    cacheBust?: boolean;
  }

  export function toPng(
    node: Node,
    options?: DomToImageOptions
  ): Promise<string>;
}
