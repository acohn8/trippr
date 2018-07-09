import React from 'react';
import { Button, Modal, Loader, Card } from 'semantic-ui-react';

class YelpPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  handleClick = () => {
    this.getInfo(this.props.id);
  };

  getInfo = id => {
    fetch(`https://cryptic-headland-94862.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`, {
      headers: {
        authorization:
          'Bearer B0_o-WOtonclsraT47gpBMjFd_jGrcgkYkl6O74pf4ETwW_GBcfXgSdCbXjffWEsF2gYeFA54QnyG3sKi48covsP2qsu5wrBivNEHNqdUaS1rGcScv0Es8a8OXY_W3Yx',
      },
    })
      .then(res => res.json())
      .then(json => this.setInfo(json));
  };

  setInfo = result => {
    this.setState({
      name: result.name,
      photos: result.photos,
      loaded: true,
    });
  };

  render() {
    {
      if (this.state.loaded === false) {
        return (
          <Modal
            trigger={
              <Button basic floated="right" onClick={this.handleClick}>
                Photos
              </Button>
            }
          >
            <Loader active inline="centered" />
          </Modal>
        );
      } else {
        return (
          <Modal
            trigger={
              <Button basic floated="right" onClick={this.handleClick}>
                Photos
              </Button>
            }
          >
            <Modal.Header>{this.state.name}</Modal.Header>
            <Modal.Content>
              <Card.Group centered itemsPerRow={3}>
                {this.state.photos.map(photo => <Card image={photo} verticalAlign="middle" />)}
              </Card.Group>
            </Modal.Content>
          </Modal>
        );
      }
    }
  }
}

export default YelpPhotos;
