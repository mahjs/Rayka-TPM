declare module "dom-to-image" {
  interface DomToImageOptions {
    filter?: (node: Node) => boolean;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: {};
    quality?: number;
    imagePlaceholder?: string;
    cacheBust?: boolean;
  }

  export function toPng(
    node: Node,
    options?: DomToImageOptions
  ): Promise<string>;
}
