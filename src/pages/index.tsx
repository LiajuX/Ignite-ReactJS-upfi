import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { Card, CardList } from '../components/CardList';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

import { api } from '../services/api';

interface ImagesResponse {
  data: Card[];
  after: string | null;
}

export default function Home(): JSX.Element {
  async function fetchImages({ pageParam = null }): Promise<ImagesResponse> {
    const { data: images } = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

    return images;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.after || null,
  });

  const formattedData = useMemo(() => {
    return data?.pages.map(page => page.data).flat();
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            mt="40px"
            isLoading={isFetchingNextPage}
            loadingText="Carregando..."
            onClick={() => fetchNextPage()}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
