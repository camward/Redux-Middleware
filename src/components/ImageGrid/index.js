import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import Stats from '../Stats';
import { handleImagesLoad } from '../../actions/images';
import './style.css';

class ImageGrid extends Component {

  componentDidMount() {
    const { nextPage } = this.props;
    this.handleLoadImages(nextPage);
  }

  handleLoadImages = () => {
    const { isLoading, loadImages, nextPage } = this.props;
    if (!isLoading) {
      loadImages(nextPage);
    }
  };

  render() {
    const { isLoading, images, error, imageStats } = this.props;

    return (
      <div className="content">
        <section className="grid">
          {images.map(image => (
            <div
              key={image.id}
              className={`item item-${Math.ceil(
                image.height / image.width,
              )}`}
            >
              <span className="stats">
                {image.likes}
              </span>
              <img
                src={image.urls.small}
                alt={image.user.username}
              />
            </div>
          ))}
        </section>

        {error && (
          <div className="error">{JSON.stringify(error)}</div>
        )}

        <Button onClick={this.handleLoadImages} loading={isLoading}>
          Загрузить еще
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ isLoading, images, error, imageStats, nextPage }) => ({
  isLoading,
  images,
  error,
  imageStats,
  nextPage,
});

const mapDispatchToProps = dispatch => ({
  loadImages: (page) => dispatch(handleImagesLoad(page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageGrid);
