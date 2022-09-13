import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

import Widget from '../components/Widget';

const HomeScreen: React.FC<PropsWithChildren<{}>> = () => {
  const sentences = [
    {
      sentence:
        "Today's going to rain, A LOT! \nMake sure to take your umbrella.",
      icon: null,
    },
    {
      sentence:
        'The sun is going to be strong at noon. Sunscreen is recommended.',
      icon: null,
    },
  ];
  return (
    <View className="flex-1 px-5">
      <Text className="font-bold text-xl">Inbox</Text>
      {sentences.map((sentence, index) => {
        return (
          <View className="my-1" key={index}>
            <Widget>
              <View>
                <Text className="text-center">{sentence.sentence}</Text>
                {sentence.icon ? <Text>Icon</Text> : null}
              </View>
            </Widget>
          </View>
        );
      })}
    </View>
  );
};

export default HomeScreen;
