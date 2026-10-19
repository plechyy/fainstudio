import type { CSSProperties, ReactNode } from 'react';

/** Signature: tmavý výřez s rohovými značkami a popiskem jako ve výkresu. */
export default function Plate({
  fig,
  caption,
  className,
  style,
  children,
}: {
  fig?: string;
  caption?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <figure className={`plate${className ? ' ' + className : ''}`} style={style}>
      {children}
      <span className="plate__corner plate__corner--tl" aria-hidden="true" />
      <span className="plate__corner plate__corner--tr" aria-hidden="true" />
      <span className="plate__corner plate__corner--bl" aria-hidden="true" />
      <span className="plate__corner plate__corner--br" aria-hidden="true" />
      {(fig || caption) && (
        <figcaption className="plate__cap">
          <span>{fig}</span>
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
