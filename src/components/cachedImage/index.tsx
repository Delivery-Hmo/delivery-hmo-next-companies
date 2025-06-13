import { useEffect, FC, useState, useMemo, CSSProperties } from "react";
import { Card, Skeleton } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import ImageNext from "next/image";

interface Props {
  imageUrl: string;
  style?: CSSProperties;
  alt: string;
}

const CachedImage: FC<Props> = ({ imageUrl, style, alt }) => {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setLoading(false);
    };

    img.onerror = () => {
      setImageError(true);
    };
  }, [imageUrl]);

  const styleImage = useMemo(() => ({ borderRadius: 20, ...style }), [style]);

  if (imageError) {
    return (<Card>
      <FileImageOutlined />
    </Card>);
  }

  if (loading) {
    return (<Skeleton.Image style={styleImage} active />);
  }

  return (
    <ImageNext
      src={imageUrl}
      alt={alt}
      style={styleImage}
      height={(styleImage?.height as number) || 82} width={(styleImage.width as number) || 100}
    />
  );
};

export default CachedImage;