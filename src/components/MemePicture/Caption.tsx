import { FC } from 'react';
import { Text } from '@chakra-ui/react';

interface CaptionProps {
  text: {
    content: string;
    x: number;
    y: number;
  };
  dataTestId?: string;
  index: number;
  fontSize: number;
}

export const Caption: FC<CaptionProps> = ({
  text,
  index,
  dataTestId,
  fontSize,
}) => {
  return (
    <Text
      key={index}
      position="absolute"
      left={text.x}
      top={text.y}
      fontSize={fontSize}
      color="white"
      fontFamily="Impact"
      fontWeight="bold"
      userSelect="none"
      textTransform="uppercase"
      data-testid={`${dataTestId}-text-${index}`}
      style={{
        WebkitTextStroke: '1px black',
      }}
    >
      {text.content}
    </Text>
  );
};
