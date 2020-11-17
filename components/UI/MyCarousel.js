import React,{Component} from 'react'
import { StyleSheet, Text, View , Button, Platform, ScrollView ,Image , Dimensions} from 'react-native'
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export class MyCarousel extends Component {

    

    render () {
        return (
            <Carousel
              layout={'default'}
              firstItem={this.props.entries.length /2}
              ref={(c) => { this._carousel = c; }}
              data={this.props.entries}
              renderItem={this.props.renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />
        );
    }
}

const styles = StyleSheet.create({
    slide : {
        width: '100%',
        height : '100%'
    }
})