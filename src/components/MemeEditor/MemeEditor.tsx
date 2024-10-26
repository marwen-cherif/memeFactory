import { useDropzone } from 'react-dropzone';
import { AspectRatio, Box, Button, Icon } from '@chakra-ui/react';
import { Pencil } from '@phosphor-icons/react';
import { NoPictureDisplay } from '@/components/MemeEditor/NoPictureDisplay.tsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { MemeEditorFormValue } from '@/components/MemeEditor/MemeEditor.types.ts';
import React, { RefObject } from 'react';
import { MemeEditorPicture } from '@/components/MemeEditor/MemeEditorPicture/MemeEditorPicture.tsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MemeEditor = React.forwardRef<HTMLElement, any>(
  (_, editorPictureRef) => {
    const { control, setValue } = useFormContext<MemeEditorFormValue>();

    const picture = useWatch({
      control,
      name: 'picture',
      defaultValue: undefined,
    });
    const texts = useWatch({
      control,
      name: 'texts',
      defaultValue: [],
    });

    const { getRootProps, getInputProps, open } = useDropzone({
      onDrop: (files: File[]) => {
        if (files.length === 0) {
          return undefined;
        }

        setValue('picture', files[0]);
      },
      noClick: picture !== undefined,
      accept: { 'image/png': ['.png'], 'image/jpg': ['.jpg'] },
    });

    return (
      <AspectRatio ratio={16 / 9}>
        <Box
          {...getRootProps()}
          width="full"
          position="relative"
          border={!picture ? '1px dashed' : undefined}
          borderColor="gray.300"
          borderRadius={9}
          px={1}
        >
          <input {...getInputProps()} />

          {picture && (
            <Box
              width="full"
              height="full"
              position="relative"
              __css={{
                '&:hover .change-picture-button': {
                  display: 'inline-block',
                },
                '& .change-picture-button': {
                  display: 'none',
                },
              }}
            >
              <MemeEditorPicture
                pictureUrl={URL.createObjectURL(picture)}
                texts={texts}
                dataTestId={`memeEditor_memePicture`}
                ref={editorPictureRef as RefObject<HTMLElement>}
              />

              <Button
                className="change-picture-button"
                leftIcon={<Icon as={Pencil} boxSize={4} />}
                colorScheme="cyan"
                color="white"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                position="absolute"
                onClick={open}
              >
                Change picture
              </Button>
            </Box>
          )}

          {!picture && <NoPictureDisplay />}
        </Box>
      </AspectRatio>
    );
  }
);
