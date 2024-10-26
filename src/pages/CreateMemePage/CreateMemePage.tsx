import { FC } from 'react';
import { Box, Flex, Heading, Text, Textarea, VStack } from '@chakra-ui/react';
import { MemeEditor } from '@/components/MemeEditor/MemeEditor.tsx';
import { useCreateMemePage } from '@/pages/CreateMemePage/CreateMemePage.hooks.ts';
import { CaptionsManager } from '@/pages/CreateMemePage/CaptionsManager/CaptionsManager.tsx';
import { FormProvider } from 'react-hook-form';

import './CreateMemePage.css';

export const CreateMemePage: FC = () => {
  const { handleCreateMeme, formContext, editorPictureRef } =
    useCreateMemePage();

  const {
    register,
    formState: { errors },
  } = formContext;

  return (
    <FormProvider {...formContext}>
      <form id="CreateMemeForm" onSubmit={handleCreateMeme}>
        <Flex width="full" height="full">
          <Box flexGrow={1} height="full" p={4} overflowY="auto">
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading as="h2" size="md" mb={2}>
                  Upload your picture
                </Heading>
                <MemeEditor ref={editorPictureRef} />
              </Box>
              <Box>
                <Heading as="h2" size="md" mb={2}>
                  Describe your meme *
                </Heading>

                <Textarea
                  placeholder="Type your description here..."
                  {...register('description')}
                />

                {errors.description && (
                  <Text color="red.500">{errors.description.message}</Text>
                )}
              </Box>
            </VStack>
          </Box>

          <CaptionsManager />
        </Flex>
      </form>
    </FormProvider>
  );
};
