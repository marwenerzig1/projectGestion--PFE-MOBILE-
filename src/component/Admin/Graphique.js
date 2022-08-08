import React from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

//import React Native chart Kit for different kind of Chart
import {
  PieChart,
  BarChart
} from 'react-native-chart-kit';



const MyPieChartConges = ({items}) => {
  return (
    <>
      <Text style={styles.header}>Conges</Text>
      <PieChart
        data={[
          {
            name: 'Conges en cours ',
            population: items.Conges_encours ,
            color: 'rgb(255, 205, 86)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 14,
          },
          {
            name: 'Congés acceptés',
            population: items.Conges_accepter ,
            color: 'rgb(255, 99, 132)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 14 ,
          },
          {
            name: 'Congés refusés',
            population: items.Conges_refuser ,
            color: 'rgb(54, 162, 235)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 14,
          },
        ]}
        width={Dimensions.get('window').width  }
        height={180}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="0"
        absolute //for the absolute number remove if you want percentage
      />
    </>
  );
};

const MyPieChartRessources = ({items}) => {
  return (
    <>
      <Text style={styles.header}>Ressources Humaines</Text>
      <PieChart
        data={[
          {
            name: 'Employés ',
            population: items.employe ,
            color: '#194568',
            legendFontColor: '#7F7F7F',
            legendFontSize: 14,
          },
          {
            name: 'Responsables RH',
            population: items.responsable_RH ,
            color: '#546CBC',
            legendFontColor: '#7F7F7F',
            legendFontSize: 14 ,
          },
          {
            name: 'Responsables des groupes',
            population: items.responsable ,
            color: '#8895B1',
            legendFontColor: '#7F7F7F',
            legendFontSize: 14,
          },
        ]}
        width={Dimensions.get('window').width  }
        height={180}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="0"
        absolute //for the absolute number remove if you want percentage
      />
    </>
  );
};

const MyBarChart = ({items}) => {
  return (
    <>
      <Text style={styles.header}>Pointage</Text>
      <BarChart
        data={{
          labels: items.labels ,
          datasets: [
            {
              data: items.data ,
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
};

const Graphique = ({item}) => {
  return (
          <View>
            <MyPieChartConges items={item} />
            <MyPieChartRessources items={item} />
            <MyBarChart items={item} />
          </View>
  );
};

export default Graphique;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 12 
  },
});