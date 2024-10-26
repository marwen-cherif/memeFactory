import { FC, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { MemeEditorFormValue } from '@/components/MemeEditor/MemeEditor.types.ts';

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

export const DraggableCaption: FC<CaptionProps> = ({
  text,
  index,
  dataTestId,
  fontSize,
}) => {
  const formContext = useFormContext<MemeEditorFormValue>();
  const { setValue, getValues } = formContext;
  const [currentX, setCurrentX] = useState(text.x);
  const [currentY, setCurrentY] = useState(text.y);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  return (
    <Text
      key={index}
      position="absolute"
      left={currentX}
      top={currentY}
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
      draggable={true}
      onDragStart={(e) => {
        const element = e.target as HTMLElement;
        const rect = element.getBoundingClientRect();

        setOffsetX(e.clientX - rect.left);
        setOffsetY(e.clientY - rect.top);
      }}
      onDrag={(e) => {
        const newX = e.clientX - offsetX - 22;
        const newY = e.clientY - offsetY - 100;

        if (newX <= 400 && newY <= 255 && newX >= 0 && newY >= 0) {
          setCurrentX(newX);
          setCurrentY(newY);
        }
      }}
      onDragEnd={() => {
        setValue(
          'texts',
          getValues('texts').map((t, i) => {
            if (i === index) {
              return {
                ...t,
                x: Math.floor(currentX),
                y: Math.floor(currentY),
              };
            }

            return t;
          })
        );
      }}
    >
      {text.content}
    </Text>
  );
};
