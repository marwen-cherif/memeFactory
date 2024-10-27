import { FC } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Plus, Trash } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { CreateMemeFormValues } from '@/pages/CreateMemePage/CreateMemePage.types.ts';

export const CaptionsManager: FC = () => {
  const {
    control,
    register,
    formState: { isSubmitting },
  } = useFormContext<CreateMemeFormValues>();

  const memePicture = useWatch({
    name: 'picture',
    control,
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'texts',
  });

  const handleAddCaptionButtonClick = () => {
    append({
      content: `New caption ${fields.length + 1}`,
      x: Math.floor(Math.random() * 400),
      y: Math.floor(Math.random() * 225),
    });
  };

  return (
    <Flex flexDir="column" width="30%" minW="250" height="full" boxShadow="lg">
      <Heading as="h2" size="md" mb={2} p={4}>
        Add your captions
      </Heading>
      <Box p={4} flexGrow={1} height={0} overflowY="auto">
        <VStack>
          {fields.map((field, index) => (
            <Flex width="full" key={field.id}>
              <Input
                {...register(`texts.${index}.content`)}
                mr={1}
                data-testid={`captionContent-${index}`}
              />
              <IconButton
                onClick={() => remove(index)}
                aria-label="Delete caption"
                icon={<Icon as={Trash} />}
              />
            </Flex>
          ))}
          <Button
            type="button"
            colorScheme="cyan"
            leftIcon={<Icon as={Plus} />}
            variant="ghost"
            size="sm"
            width="full"
            onClick={handleAddCaptionButtonClick}
            isDisabled={memePicture === undefined}
            data-testid="add-caption"
          >
            Add a caption
          </Button>
        </VStack>
      </Box>
      <HStack p={4}>
        <Button
          type="button"
          as={Link}
          to="/"
          colorScheme="cyan"
          variant="outline"
          size="sm"
          width="full"
          data-testid="cancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          colorScheme="cyan"
          size="sm"
          width="full"
          color="white"
          isDisabled={memePicture === undefined}
          isLoading={isSubmitting}
          data-testid="submit"
        >
          Submit
        </Button>
      </HStack>
    </Flex>
  );
};
