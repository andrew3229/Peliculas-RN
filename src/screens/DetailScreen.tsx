import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Image, View, StyleSheet, Dimensions,ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';


interface Props extends StackScreenProps<RootStackParams,'DetailScreen'>{}

const screenHeigh = Dimensions.get('window').height;

export const DetailScreen = ({route, navigation}: Props) => {
    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
   
    const {isLoading,cast,movideFull}= useMovieDetails(movie.id);


    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <View style={ styles.imageBorder }>
                    <Image
                        source={{uri}}
                        style={styles.image }
                    />
                </View>

            </View>

            <View style={styles.margingContainer}>
                <Text style={styles.subTitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>
                {
                    isLoading 
                    ?
                    <ActivityIndicator
                            size={35}
                            color='grey'
                            style={{marginTop:20}}
                        />
                        :
                        <MovieDetails movieFull={movideFull!} cast = {cast}/>
                }
                {/* Boton para cerrar */}
                <View style={styles.backButton}>
                    <TouchableOpacity 
                        onPress = {()=>navigation.pop()}
                    >
                        <Icon
                            color='white'
                            name="arrow-back-outline"
                            size={60}
                            
                        />
                    </TouchableOpacity>
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image:{
        flex:1, 
        
    },
    imageContainer:{
        width:'100%',
        height:screenHeigh *0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 19,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18
    },
    imageBorder:{
        flex:1, 
        overflow:'hidden',
        borderBottomEndRadius:25,
        borderBottomStartRadius:25
    },
    margingContainer:{
        marginHorizontal:20,
        marginTop:20
    },
    subTitle:{
        fontSize:15,
        opacity:0.8
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
    backButton:{
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 30,
        left: 5
    }
    
});