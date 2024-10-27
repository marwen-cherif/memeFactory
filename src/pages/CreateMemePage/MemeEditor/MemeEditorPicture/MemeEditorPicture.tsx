import { Box, useDimensions } from '@chakra-ui/react';
import React, { RefObject, useMemo } from 'react';
import { DraggableCaption } from '@/pages/CreateMemePage/MemeEditor/MemeEditorPicture/DraggableCaption.tsx';

export type MemePictureProps = {
  pictureUrl: string;
  texts: {
    content: string;
    x: number;
    y: number;
  }[];
  dataTestId?: string;
};

const REF_WIDTH = 800;
const REF_HEIGHT = 450;
const REF_FONT_SIZE = 36;

export const MemeEditorPicture = React.forwardRef<
  HTMLElement,
  MemePictureProps
>(({ pictureUrl, texts: rawTexts, dataTestId = '' }, editorPictureRef) => {
  const dimensions = useDimensions(
    editorPictureRef as unknown as RefObject<HTMLElement>,
    true
  );
  const boxWidth = dimensions?.borderBox.width;

  const { height, fontSize, texts } = useMemo(() => {
    if (!boxWidth) {
      return { height: 0, fontSize: 0, texts: rawTexts };
    }

    return {
      height: (boxWidth / REF_WIDTH) * REF_HEIGHT,
      fontSize: (boxWidth / REF_WIDTH) * REF_FONT_SIZE,
      texts: rawTexts.map((text) => ({
        ...text,
        x: (boxWidth / REF_WIDTH) * text.x,
        y: (boxWidth / REF_WIDTH) * text.y,
      })),
    };
  }, [boxWidth, rawTexts]);

  return (
    <Box
      width="full"
      height={height}
      ref={editorPictureRef as never}
      backgroundImage={pictureUrl}
      backgroundColor="gray.100"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      overflow="hidden"
      position="relative"
      borderRadius={8}
      data-testid={dataTestId}
    >
      {texts.map((text, index) => (
        <DraggableCaption
          key={index}
          text={text}
          index={index}
          fontSize={fontSize}
          dataTestId={dataTestId}
          editorPictureRef={editorPictureRef as RefObject<HTMLElement>}
        />
      ))}
    </Box>
  );
});
