import React from 'react';
import range from 'lodash/range';
import frameDebounce from 'frame-debounce';
import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { Button, Icon } from 'semantic-ui-react';

import Text from '../../components/Text';
import chevronSrc from './chevron.svg';

const ITEM_HEIGHT = 220;
const ITEM_WIDTH = 180;
const ITEM_MARGIN_H = 5;
const ITEM_SIZE_H = ITEM_WIDTH + (ITEM_MARGIN_H * 2);

const ARROW_SIZE = 53;

const StyledCarouselItem = styled('section')`
  height: ${ITEM_HEIGHT}px;
  border-radius: 5px;
  width: ${ITEM_WIDTH}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 0px transparent;
  cursor: pointer;

  position: absolute;
  transition: transform .75s, border-color 0.2s ease-out, box-shadow 0.2s ease-out;
  left: 8px;
  top: 8px;

  &:hover {
    border-color: ${themeGet('colors.light-blue')}
    box-shadow: 0px 0px 0px 2px ${themeGet('colors.light-blue')}, ${themeGet('shadows.menu-small')};
    .percent {
      background-color: ${props => props.theme.colors.green};
      color: ${props => props.theme.colors.white};
    }
  }

  .image {
    height: 114px;
    width: 114px;
    background-size: cover;
    display: block;
    border-radius: 72px;
  }
  .name {
    margin-top: 17px;
  }
  .store {
    margin-top: 5px;
  }
  .name, .store {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80%;
  }
  .percent {
    margin-top: 8px;
    background: ${themeGet('colors.light-gray')};
    transition: color 0.2s ease-out, background-color 0.2s ease-out;
  }
`;

const StyledCarouselContainer = styled('div')`
  position: relative;
  display: flex;
  transition: transform 1s;
  height: ${ITEM_HEIGHT}px;
  width: 100%;

  > .content {
    position: absolute; left: 0; top: 0;
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    overflow-x: hidden;
    padding: 8px;
  }

  .arrow-container {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.left {
      left: -${ARROW_SIZE / 2}px;
    }
    &.right {
      right: -${(ARROW_SIZE / 2) + 12}px;
    }
    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${ARROW_SIZE}px;
      height: ${ARROW_SIZE}px;
      border-radius: 50%;
      cursor: pointer;
      background-color: ${themeGet('colors.gray')};
      img {
        height: 20px;
      }
    }
  }
`;

function CarouselItem({ item, itemDelete, ...rest }) {
  return (
    <div>
      <StyledCarouselItem {...rest}>
        <Button icon floated="right" onClick={() => itemDelete(item.id)}>
          <Icon name="x" />
        </Button>
        <img className="image" src={item.image} alt="" />
        <Text fontSize={2} className="name">{item.name}</Text>
      </StyledCarouselItem>
    </div>
  );
}

export default class HorizontalCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCount: 6,
      offset: 0
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    frameDebounce(this.calculateSize);
  }

  calculateSize() {
    if (!this.node) return;
    const displayCount = Math.floor(this.node.parentNode.offsetWidth / ITEM_SIZE_H);
    if (displayCount === this.state.displayCount) return;

    this.setState({ displayCount });
  }

  handleRef(node) {
    if (node && !this.node) {
      this.node = node;
      this.calculateSize();
    }
  }

  hasPrevious() {
    return this.state.offset > 0;
  }

  hasNext() {
    return this.state.offset + this.state.displayCount < this.props.items.length - 1;
  }

  handlePrevious() {
    this.setState({
      offset: Math.max(
        this.state.offset - this.state.displayCount,
        0
      )
    });
  }

  handleNext() {
    this.setState({
      offset: Math.min(
        this.state.offset + this.state.displayCount,
        this.props.items.length - this.state.displayCount - 1
      )
    });
  }

  render() {
    const { itemDelete } = this.props;
    return (
      <StyledCarouselContainer innerRef={node => this.handleRef(node)}>
        <div className="content">
          {
            range(-this.state.displayCount - 1, (this.state.displayCount * 2) + 1)
              .map(displayIndex => {
                const item = this.props.items[this.state.offset + displayIndex];
                if (!item) return null;
                return (
                  <CarouselItem
                    item={item}
                    key={item.id || displayIndex}
                    style={{ transform: `translateX(${displayIndex * ITEM_SIZE_H}px)` }}
                    itemDelete={itemDelete}
                  />
                );
              })
          }
        </div>
        {
          this.hasPrevious() &&
            <div className="arrow-container left">
              <div className="arrow" role="button" aria-label="View Previous" onClick={() => this.handlePrevious()}>
                <img src={chevronSrc} style={{ transform: 'rotate(180deg)' }} alt="" />
              </div>
            </div>
        }
        {
          this.hasNext() &&
            <div className="arrow-container right">
              <div className="arrow" role="button" aria-label="View Next" onClick={() => this.handleNext()}>
                <img src={chevronSrc} alt="" />
              </div>
            </div>
        }
      </StyledCarouselContainer>
    );
  }
}
