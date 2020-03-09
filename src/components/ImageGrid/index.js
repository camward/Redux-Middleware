import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import Stats from '../Stats';
import { loadImages } from '../../actions/images';
import './style.css';

class ImageGrid extends Component {

  componentDidMount() {
    this.handleLoadImages();
  }

  handleLoadImages = () => {
    const { isLoading, loadImages } = this.props;
    if (!isLoading) {
      loadImages();
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
              <Stats stats={imageStats[image.id]} />
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

const mapStateToProps = ({ isLoading, images, error, imageStats }) => ({
  isLoading,
  images,
  error,
  imageStats,
});

const mapDispatchToProps = dispatch => ({
  loadImages: () => dispatch(loadImages()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageGrid);
