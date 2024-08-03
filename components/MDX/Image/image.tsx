import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react';

const MDXImage: FC<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = ({ width, height, alt, src, ...props }) => {
  if (src === undefined) {
    throw new Error('src in image is missing');
  }
  if (alt === undefined) {
    throw new Error('alt in image is missing');
  }

  if (!width || !height) {
    // Since `width` and `height` are not provided in the Markdown image format,
    // we provide the height and width automatically.
    // @see https://nextjs.org/docs/pages/building-your-application/optimizing/images
    return (
      <Image
        {...props}
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(min-width: 768px) 200vw, 500vw"
        className="h-auto w-auto"
      />
    );
  }

  return <Image {...props} alt={alt} width={width} height={height} />;
};

export { MDXImage };
