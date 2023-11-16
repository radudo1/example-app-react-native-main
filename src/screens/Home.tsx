import { Image, StyleSheet, View, Text, FlatList, ListRenderItemInfo } from 'react-native';

import React, { useCallback, useEffect, useState } from 'react';

interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  image: string; // Should be a URL string
}
interface CharacterResult {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}
const Item = ({ status, name, id, image, species }: Character) => (
  <View style={styles.wrapperItem}>
    <Image source={{uri: image}}  style={styles.imageWrapper} />
    <View style={styles.textWrapper}>
    <Text style={styles.text}>
     Name: {name}
    </Text>
    <Text style={styles.text}>Status: {status} </Text>
    <Text style={styles.text}>Species: {species} </Text>
    </View>
  </View>
);


const HomeScreen = () => {
  const [data, setData] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const fetchData = async (url: string | null = null) => {
    try {
      const apiUrl = url || 'https://rickandmortyapi.com/api/character';
      const resp = await fetch(apiUrl);
      const result: CharacterResult = await resp.json();

      setData((prevData) => [...prevData, ...result.results]);
      setNextPage(result.info.next);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreData = () => {
    if (nextPage) {
      fetchData(nextPage);
    }
  };

  const renderItem = useCallback(({ item }: { item: Character }) => (
    <Item status={item.status} name={item.name} id={item.id} species={item.species} image={item.image} />
  ), []);

  return (
    <View style={styles.container}>
      {data && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}_${item.name}`} 
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.7} // Adjust this threshold as needed
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperItem:{
    borderRadius: 18,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D6DAE4',
    margin: 19,
    flex: 1
  },
  imageWrapper:{
    height: 300,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  text: {
  color: '#000',

  lineHeight: 22,
  fontSize: 16,
  fontWeight: '400',
  padding: 8,
  },
  textWrapper:{
    marginHorizontal: 20,
    marginVertical: 8
  }
});

export default HomeScreen;
