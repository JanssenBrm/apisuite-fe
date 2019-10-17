export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: React.ReactNodeArray,
  autoplay?: boolean,
  interval?: number,
}

export type RendererProps = {
  index: number,
  key: string,
}
