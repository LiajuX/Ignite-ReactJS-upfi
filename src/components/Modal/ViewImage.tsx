import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay>
        <ModalContent
          w="auto"
          h="auto"
          maxW={['320px', '540px', '900px']}
          maxH={['360px', '440px', '600px']}
          bgColor="pGray.800"
        >
          <ModalBody px={0} py={0}>
            <Image
              maxW={['320px', '540px', '900px']}
              maxH={['360px', '440px', '600px']}
              objectFit="contain"
              src={imgUrl}
            />
          </ModalBody>

          <ModalFooter
            paddingY="8px"
            pl="14px"
            borderBottomRadius={6}
            bgColor="pGray.800"
          >
            <Link mr="auto" target="_blank" href={imgUrl}>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
