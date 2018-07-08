import React from 'react';
import { Button, List, Image, Modal, Loader, Grid } from 'semantic-ui-react';

class YelpBusinessPage extends React.Component {
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
      phone: result.display_phone,
      address: result.display_address,
      photos: result.photos.slice(0, 4),
      hours: result.hours,
      price: result.price,
      rating: result.rating,
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
                Details
              </Button>
            }
          >
            <Loader active inline="centered" />
          </Modal>
        );
      } else {
        console.log(this.state);
        return (
          <Modal
            trigger={
              <Button basic floated="right" onClick={this.handleClick}>
                Details
              </Button>
            }
          >
            <Modal.Header>{this.state.name}</Modal.Header>
            <Modal.Content image>
              {this.state.photos
                .slice(0, 4)
                .map(photo => <Image wrapped size="medium" src={photo} />)}
              <Modal.Description>
                <Grid>
                  <List>
                    <List.Item>
                      <List.Icon name="users" />
                      <List.Content>Semantic UI</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="marker" />
                      <List.Content>New York, NY</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="mail" />
                      <List.Content>
                        <a href="mailto:jack@semantic-ui.com">jack@semantic-ui.com</a>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="linkify" />
                      <List.Content>
                        <a href="http://www.semantic-ui.com">semantic-ui.com</a>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        );
      }
    }
  }
}

export default YelpBusinessPage;
